from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db import models


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', User.Role.SUPER_ADMIN)
        return self._create_user(email, password, **extra_fields)


class User(AbstractUser):
    class Role(models.TextChoices):
        SUPER_ADMIN = 'super_admin', 'Super Admin'
        ENTREPRENEUR = 'entrepreneur', 'Entrepreneur'
        ENTERPRISE = 'enterprise', 'Enterprise'
        MENTOR = 'mentor', 'Mentor'

    username = None
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=Role.choices)
    phone_number = models.CharField(max_length=20, blank=True)
    is_verified = models.BooleanField(default=True)
    is_approved = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email

    @property
    def dashboard_path(self):
        return {
            User.Role.SUPER_ADMIN: '/admin/dashboard',
            User.Role.ENTREPRENEUR: '/entrepreneur/dashboard',
            User.Role.ENTERPRISE: '/enterprise/dashboard',
            User.Role.MENTOR: '/mentor/dashboard',
        }[self.role]


class EntrepreneurProfile(models.Model):
    class BusinessStage(models.TextChoices):
        IDEA = 'idea', 'Idea'
        STARTUP = 'startup', 'Startup'
        GROWTH = 'growth', 'Growth'
        ESTABLISHED = 'established', 'Established'

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='entrepreneur_profile')
    full_name = models.CharField(max_length=255)
    country = models.CharField(max_length=100)
    business_name = models.CharField(max_length=255)
    industry = models.CharField(max_length=100)
    location = models.CharField(max_length=255, blank=True)
    business_stage = models.CharField(max_length=20, choices=BusinessStage.choices, blank=True)
    business_size = models.CharField(max_length=50, blank=True)
    certifications = models.TextField(blank=True, help_text='Comma-separated list of certifications')
    performance_score = models.FloatField(default=0)

    def __str__(self):
        return self.full_name


class EnterpriseProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='enterprise_profile')
    company_name = models.CharField(max_length=255)
    contact_person = models.CharField(max_length=255)
    industry = models.CharField(max_length=100)
    company_size = models.CharField(max_length=50)

    def __str__(self):
        return self.company_name


class MentorProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='mentor_profile')
    full_name = models.CharField(max_length=255)
    expertise = models.CharField(max_length=255, blank=True)
    bio = models.TextField(blank=True)

    def __str__(self):
        return self.full_name


class Mentorship(models.Model):
    class Status(models.TextChoices):
        ACTIVE = 'active', 'Active'
        COMPLETED = 'completed', 'Completed'

    mentor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='mentorships_as_mentor')
    entrepreneur = models.ForeignKey(User, on_delete=models.CASCADE, related_name='mentorships_as_entrepreneur')
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.ACTIVE)
    assigned_at = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(blank=True)

    class Meta:
        unique_together = ('mentor', 'entrepreneur')

    def __str__(self):
        return f'{self.mentor.email} -> {self.entrepreneur.email}'


class LoginHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='login_history')
    timestamp = models.DateTimeField(auto_now_add=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return f'{self.user.email} @ {self.timestamp}'
