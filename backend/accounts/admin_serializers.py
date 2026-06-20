from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

from .models import (
    EnterpriseProfile,
    EntrepreneurProfile,
    LoginHistory,
    MentorProfile,
    User,
)
from .serializers import UserSerializer

ENTREPRENEUR_REQUIRED = ['full_name', 'country', 'business_name', 'industry']
ENTERPRISE_REQUIRED = ['company_name', 'contact_person', 'industry', 'company_size']
MENTOR_REQUIRED = ['full_name']


class AdminUserListSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        fields = UserSerializer.Meta.fields + [
            'is_active', 'is_approved', 'is_verified', 'date_joined', 'last_login',
        ]


class AdminUserCreateSerializer(serializers.Serializer):
    role = serializers.ChoiceField(choices=User.Role.choices)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, validators=[validate_password])
    phone_number = serializers.CharField(max_length=20, required=False, allow_blank=True)
    full_name = serializers.CharField(max_length=255, required=False, allow_blank=True)
    country = serializers.CharField(max_length=100, required=False, allow_blank=True)
    business_name = serializers.CharField(max_length=255, required=False, allow_blank=True)
    industry = serializers.CharField(max_length=100, required=False, allow_blank=True)
    company_name = serializers.CharField(max_length=255, required=False, allow_blank=True)
    contact_person = serializers.CharField(max_length=255, required=False, allow_blank=True)
    company_size = serializers.CharField(max_length=50, required=False, allow_blank=True)
    expertise = serializers.CharField(max_length=255, required=False, allow_blank=True)

    def validate_email(self, value):
        value = value.lower()
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('An account with this email already exists.')
        return value

    def validate(self, attrs):
        role = attrs['role']
        if role == User.Role.ENTREPRENEUR:
            missing = [f for f in ENTREPRENEUR_REQUIRED if not attrs.get(f)]
        elif role == User.Role.ENTERPRISE:
            missing = [f for f in ENTERPRISE_REQUIRED if not attrs.get(f)]
        elif role == User.Role.MENTOR:
            missing = [f for f in MENTOR_REQUIRED if not attrs.get(f)]
        else:
            missing = []
        if missing:
            raise serializers.ValidationError({f: 'This field is required.' for f in missing})
        return attrs

    def create(self, validated_data):
        role = validated_data['role']
        is_staff = role == User.Role.SUPER_ADMIN
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            phone_number=validated_data.get('phone_number', ''),
            role=role,
            is_staff=is_staff,
            is_superuser=is_staff,
        )
        if role == User.Role.ENTREPRENEUR:
            EntrepreneurProfile.objects.create(
                user=user,
                full_name=validated_data['full_name'],
                country=validated_data['country'],
                business_name=validated_data['business_name'],
                industry=validated_data['industry'],
            )
        elif role == User.Role.ENTERPRISE:
            EnterpriseProfile.objects.create(
                user=user,
                company_name=validated_data['company_name'],
                contact_person=validated_data['contact_person'],
                industry=validated_data['industry'],
                company_size=validated_data['company_size'],
            )
        elif role == User.Role.MENTOR:
            MentorProfile.objects.create(
                user=user,
                full_name=validated_data['full_name'],
                expertise=validated_data.get('expertise', ''),
            )
        return user


class AdminUserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['phone_number', 'is_active', 'is_approved', 'is_verified']


class AdminSetAdminRoleSerializer(serializers.Serializer):
    is_admin = serializers.BooleanField()

    def save(self, **kwargs):
        user = self.instance
        if self.validated_data['is_admin']:
            user.role = User.Role.SUPER_ADMIN
            user.is_staff = True
            user.is_superuser = True
        else:
            if hasattr(user, 'entrepreneur_profile'):
                user.role = User.Role.ENTREPRENEUR
            elif hasattr(user, 'enterprise_profile'):
                user.role = User.Role.ENTERPRISE
            elif hasattr(user, 'mentor_profile'):
                user.role = User.Role.MENTOR
            else:
                raise serializers.ValidationError(
                    'Cannot remove admin: this user has no entrepreneur, enterprise, or mentor profile to fall back to.'
                )
            user.is_staff = False
            user.is_superuser = False
        user.save()
        return user


class ResetPasswordSerializer(serializers.Serializer):
    new_password = serializers.CharField(write_only=True, validators=[validate_password])

    def save(self, **kwargs):
        user = self.instance
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user


class LoginHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = LoginHistory
        fields = ['id', 'timestamp', 'ip_address']
