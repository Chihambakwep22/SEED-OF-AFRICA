from rest_framework import serializers

from .models import MentorFeedback, Mentorship


class AssignedEntrepreneurSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(source='entrepreneur.entrepreneur_profile.full_name', read_only=True)
    business_name = serializers.CharField(source='entrepreneur.entrepreneur_profile.business_name', read_only=True)
    industry = serializers.CharField(source='entrepreneur.entrepreneur_profile.industry', read_only=True)
    email = serializers.EmailField(source='entrepreneur.email', read_only=True)
    phone_number = serializers.CharField(source='entrepreneur.phone_number', read_only=True)

    class Meta:
        model = Mentorship
        fields = [
            'id', 'full_name', 'business_name', 'industry', 'email', 'phone_number',
            'status', 'assigned_at', 'notes',
        ]


class MentorFeedbackSerializer(serializers.ModelSerializer):
    entrepreneur_name = serializers.SerializerMethodField()
    mentor_name = serializers.SerializerMethodField()

    class Meta:
        model = MentorFeedback
        fields = [
            'id', 'mentorship', 'entrepreneur_name', 'mentor_name',
            'progress_rating', 'notes', 'created_at',
        ]
        read_only_fields = ['id', 'created_at']

    def get_entrepreneur_name(self, obj):
        return getattr(getattr(obj.mentorship.entrepreneur, 'entrepreneur_profile', None), 'full_name', '')

    def get_mentor_name(self, obj):
        return getattr(getattr(obj.mentorship.mentor, 'mentor_profile', None), 'full_name', '')

    def validate_mentorship(self, value):
        request = self.context['request']
        if value.mentor_id != request.user.id:
            raise serializers.ValidationError('This mentorship does not belong to you.')
        return value
