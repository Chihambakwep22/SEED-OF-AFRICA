from rest_framework import serializers

from .models import EntrepreneurProfile


class EntrepreneurProfileSerializer(serializers.ModelSerializer):
    phone_number = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = EntrepreneurProfile
        fields = [
            'full_name', 'country', 'business_name', 'industry',
            'location', 'business_stage', 'business_size', 'certifications',
            'phone_number',
        ]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['phone_number'] = instance.user.phone_number
        return data

    def update(self, instance, validated_data):
        phone_number = validated_data.pop('phone_number', None)
        if phone_number is not None:
            instance.user.phone_number = phone_number
            instance.user.save()
        return super().update(instance, validated_data)
