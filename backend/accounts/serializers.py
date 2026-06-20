from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

from .models import EnterpriseProfile, EntrepreneurProfile, User


class UserSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()
    dashboard_path = serializers.ReadOnlyField()

    class Meta:
        model = User
        fields = ['id', 'email', 'role', 'phone_number', 'dashboard_path', 'profile']

    def get_profile(self, obj):
        if obj.role == User.Role.ENTREPRENEUR and hasattr(obj, 'entrepreneur_profile'):
            profile = obj.entrepreneur_profile
            return {
                'full_name': profile.full_name,
                'country': profile.country,
                'business_name': profile.business_name,
                'industry': profile.industry,
            }
        if obj.role == User.Role.ENTERPRISE and hasattr(obj, 'enterprise_profile'):
            profile = obj.enterprise_profile
            return {
                'company_name': profile.company_name,
                'contact_person': profile.contact_person,
                'industry': profile.industry,
                'company_size': profile.company_size,
            }
        return None


class EntrepreneurRegisterSerializer(serializers.Serializer):
    full_name = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    phone_number = serializers.CharField(max_length=20, required=False, allow_blank=True)
    country = serializers.CharField(max_length=100)
    business_name = serializers.CharField(max_length=255)
    industry = serializers.CharField(max_length=100)
    password = serializers.CharField(write_only=True, validators=[validate_password])

    def validate_email(self, value):
        value = value.lower()
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('An account with this email already exists.')
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            phone_number=validated_data.get('phone_number', ''),
            role=User.Role.ENTREPRENEUR,
        )
        EntrepreneurProfile.objects.create(
            user=user,
            full_name=validated_data['full_name'],
            country=validated_data['country'],
            business_name=validated_data['business_name'],
            industry=validated_data['industry'],
        )
        return user


class EnterpriseRegisterSerializer(serializers.Serializer):
    company_name = serializers.CharField(max_length=255)
    contact_person = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    phone_number = serializers.CharField(max_length=20, required=False, allow_blank=True)
    industry = serializers.CharField(max_length=100)
    company_size = serializers.CharField(max_length=50)
    password = serializers.CharField(write_only=True, validators=[validate_password])

    def validate_email(self, value):
        value = value.lower()
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('An account with this email already exists.')
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            phone_number=validated_data.get('phone_number', ''),
            role=User.Role.ENTERPRISE,
        )
        EnterpriseProfile.objects.create(
            user=user,
            company_name=validated_data['company_name'],
            contact_person=validated_data['contact_person'],
            industry=validated_data['industry'],
            company_size=validated_data['company_size'],
        )
        return user
