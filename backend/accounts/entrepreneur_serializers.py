from rest_framework import serializers

from .models import EntrepreneurDocument, EntrepreneurProfile


class EntrepreneurProfileSerializer(serializers.ModelSerializer):
    phone_number = serializers.CharField(required=False, allow_blank=True)
    completion_percentage = serializers.ReadOnlyField()

    class Meta:
        model = EntrepreneurProfile
        fields = [
            'full_name', 'country', 'business_name', 'industry',
            'location', 'business_stage', 'business_size', 'certifications',
            'phone_number', 'completion_percentage',
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


class EntrepreneurDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = EntrepreneurDocument
        fields = ['id', 'name', 'file', 'uploaded_at']
        read_only_fields = ['id', 'uploaded_at']
