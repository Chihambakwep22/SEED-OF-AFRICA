from rest_framework import serializers

from .models import Program, ProgramApplication


class ProgramSerializer(serializers.ModelSerializer):
    applicant_count = serializers.SerializerMethodField()

    class Meta:
        model = Program
        fields = [
            'id', 'title', 'description', 'industry_focus', 'application_deadline',
            'status', 'created_at', 'applicant_count',
        ]
        read_only_fields = ['id', 'created_at']

    def get_applicant_count(self, obj):
        return obj.applications.count()


class ProgramApplicationSerializer(serializers.ModelSerializer):
    program_title = serializers.CharField(source='program.title', read_only=True)
    entrepreneur_name = serializers.SerializerMethodField()
    entrepreneur_email = serializers.EmailField(source='entrepreneur.email', read_only=True)
    business_name = serializers.SerializerMethodField()

    class Meta:
        model = ProgramApplication
        fields = [
            'id', 'program', 'program_title', 'entrepreneur', 'entrepreneur_name',
            'entrepreneur_email', 'business_name', 'message', 'status', 'applied_at',
        ]
        read_only_fields = [
            'id', 'program', 'program_title', 'entrepreneur', 'entrepreneur_name',
            'entrepreneur_email', 'business_name', 'message', 'applied_at',
        ]

    def get_entrepreneur_name(self, obj):
        return getattr(getattr(obj.entrepreneur, 'entrepreneur_profile', None), 'full_name', '')

    def get_business_name(self, obj):
        return getattr(getattr(obj.entrepreneur, 'entrepreneur_profile', None), 'business_name', '')
