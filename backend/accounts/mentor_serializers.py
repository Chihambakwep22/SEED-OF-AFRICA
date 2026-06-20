from rest_framework import serializers

from .models import Mentorship


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
