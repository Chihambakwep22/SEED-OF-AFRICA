from rest_framework import serializers

from .models import EntrepreneurProfile


class SupplierSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)
    phone_number = serializers.CharField(source='user.phone_number', read_only=True)

    class Meta:
        model = EntrepreneurProfile
        fields = [
            'id', 'full_name', 'business_name', 'industry', 'location', 'country',
            'business_stage', 'business_size', 'certifications', 'performance_score',
            'email', 'phone_number',
        ]
