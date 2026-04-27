from django.contrib import admin
from .models import (
    ContactMessage, Service, CaseStudy, BlogPost, 
    Resource, TeamMember, Testimonial
)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'company', 'service_type', 'created_at', 'read')
    list_filter = ('service_type', 'created_at', 'read')
    search_fields = ('name', 'email', 'company')
    readonly_fields = ('created_at',)


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'category')
    list_filter = ('category',)
    search_fields = ('title', 'description')


@admin.register(CaseStudy)
class CaseStudyAdmin(admin.ModelAdmin):
    list_display = ('company_name', 'featured', 'created_at')
    list_filter = ('featured', 'created_at')
    search_fields = ('company_name', 'challenge')


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'featured', 'published', 'created_at')
    list_filter = ('featured', 'published', 'created_at')
    search_fields = ('title', 'content')


@admin.register(Resource)
class ResourceAdmin(admin.ModelAdmin):
    list_display = ('title', 'resource_type', 'downloads', 'created_at')
    list_filter = ('resource_type', 'created_at')
    search_fields = ('title', 'description')


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'title', 'email')
    search_fields = ('name', 'title', 'email')


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('client_name', 'client_company', 'rating', 'created_at')
    list_filter = ('rating', 'created_at')
    search_fields = ('client_name', 'client_company', 'testimonial')
