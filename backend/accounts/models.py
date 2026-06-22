from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.core.validators import FileExtensionValidator, MaxValueValidator, MinValueValidator
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

    COMPLETION_FIELDS = [
        'full_name', 'country', 'business_name', 'industry',
        'location', 'business_stage', 'business_size', 'certifications',
    ]

    def __str__(self):
        return self.full_name

    @property
    def completion_percentage(self):
        filled = sum(1 for field in self.COMPLETION_FIELDS if getattr(self, field))
        filled += 1 if self.user.phone_number else 0
        total = len(self.COMPLETION_FIELDS) + 1
        return round(filled / total * 100)


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


class EntrepreneurDocument(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='documents')
    name = models.CharField(max_length=255)
    file = models.FileField(
        upload_to='entrepreneur_documents/',
        validators=[FileExtensionValidator(['pdf', 'doc', 'docx', 'png', 'jpg', 'jpeg'])],
    )
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-uploaded_at']

    def __str__(self):
        return f'{self.name} ({self.user.email})'


class Program(models.Model):
    class Status(models.TextChoices):
        DRAFT = 'draft', 'Draft'
        OPEN = 'open', 'Open'
        CLOSED = 'closed', 'Closed'

    enterprise = models.ForeignKey(User, on_delete=models.CASCADE, related_name='programs')
    title = models.CharField(max_length=255)
    description = models.TextField()
    industry_focus = models.CharField(max_length=100, blank=True)
    application_deadline = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.DRAFT)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class ProgramApplication(models.Model):
    class Status(models.TextChoices):
        PENDING = 'pending', 'Pending'
        ACCEPTED = 'accepted', 'Accepted'
        REJECTED = 'rejected', 'Rejected'

    program = models.ForeignKey(Program, on_delete=models.CASCADE, related_name='applications')
    entrepreneur = models.ForeignKey(User, on_delete=models.CASCADE, related_name='program_applications')
    message = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    applied_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('program', 'entrepreneur')
        ordering = ['-applied_at']

    def __str__(self):
        return f'{self.entrepreneur.email} -> {self.program.title}'


class MentorFeedback(models.Model):
    mentorship = models.ForeignKey(Mentorship, on_delete=models.CASCADE, related_name='feedback_entries')
    progress_rating = models.PositiveSmallIntegerField(
        null=True, blank=True, validators=[MinValueValidator(1), MaxValueValidator(5)],
    )
    notes = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'Feedback for {self.mentorship} @ {self.created_at}'


class LoginHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='login_history')
    timestamp = models.DateTimeField(auto_now_add=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return f'{self.user.email} @ {self.timestamp}'
