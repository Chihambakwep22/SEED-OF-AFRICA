from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin

from .models import (
    EnterpriseProfile,
    EntrepreneurProfile,
    LoginHistory,
    MentorProfile,
    Mentorship,
    User,
)


@admin.register(User)
class UserAdmin(DjangoUserAdmin):
    ordering = ('email',)
    list_display = ('email', 'role', 'is_verified', 'is_approved', 'is_staff', 'is_active')
    list_filter = ('role', 'is_verified', 'is_approved', 'is_staff', 'is_active')
    search_fields = ('email', 'phone_number')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Role & status', {'fields': ('role', 'phone_number', 'is_verified', 'is_approved')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {'fields': ('email', 'role', 'password1', 'password2')}),
    )


@admin.register(EntrepreneurProfile)
class EntrepreneurProfileAdmin(admin.ModelAdmin):
    list_display = (
        'full_name', 'business_name', 'industry', 'country', 'location',
        'business_stage', 'business_size', 'performance_score',
    )
    list_filter = ('business_stage', 'industry')
    search_fields = ('full_name', 'business_name', 'user__email', 'certifications')


@admin.register(EnterpriseProfile)
class EnterpriseProfileAdmin(admin.ModelAdmin):
    list_display = ('company_name', 'contact_person', 'industry', 'company_size')
    search_fields = ('company_name', 'contact_person', 'user__email')


@admin.register(LoginHistory)
class LoginHistoryAdmin(admin.ModelAdmin):
    list_display = ('user', 'timestamp', 'ip_address')
    list_filter = ('timestamp',)
    search_fields = ('user__email',)


@admin.register(MentorProfile)
class MentorProfileAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'expertise', 'user')
    search_fields = ('full_name', 'expertise', 'user__email')


@admin.register(Mentorship)
class MentorshipAdmin(admin.ModelAdmin):
    list_display = ('mentor', 'entrepreneur', 'status', 'assigned_at')
    list_filter = ('status',)
    search_fields = ('mentor__email', 'entrepreneur__email')
