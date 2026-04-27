from rest_framework import serializers
from .models import (
    ContactMessage, Service, CaseStudy, BlogPost, 
    Resource, TeamMember, Testimonial
)


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'phone', 'company', 'service_type', 'message', 'created_at']
        read_only_fields = ['created_at']


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'title', 'category', 'description', 'short_description', 'icon']


class CaseStudySerializer(serializers.ModelSerializer):
    class Meta:
        model = CaseStudy
        fields = ['id', 'company_name', 'challenge', 'solution', 'result', 'roi', 'image', 'featured']


class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'excerpt', 'content', 'author', 'created_at', 'featured', 'published']
        read_only_fields = ['created_at']


class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = ['id', 'title', 'description', 'resource_type', 'file_format', 'file', 'downloads']


class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ['id', 'name', 'title', 'bio', 'email', 'linkedin', 'image']


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ['id', 'client_name', 'client_company', 'client_role', 'testimonial', 'rating', 'image']
