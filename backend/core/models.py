from django.db import models
from django.core.validators import URLValidator
from django.utils import timezone

class ContactMessage(models.Model):
    """Contact form submissions"""
    SERVICE_CHOICES = [
        ('enterprise', 'Enterprise Solutions'),
        ('entrepreneur', 'Entrepreneur Program'),
        ('both', 'Both'),
    ]

    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    company = models.CharField(max_length=255)
    service_type = models.CharField(max_length=20, choices=SERVICE_CHOICES)
    message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Contact Message'
        verbose_name_plural = 'Contact Messages'

    def __str__(self):
        return f"{self.name} - {self.company}"


class Service(models.Model):
    """Services offered by Seed of Africa"""
    SERVICE_CATEGORIES = [
        ('enterprise_esd', 'Enterprise ESD'),
        ('enterprise_scouting', 'Enterprise Scouting'),
        ('enterprise_reporting', 'Enterprise Reporting'),
        ('entrepreneur_incubation', 'Entrepreneur Incubation'),
        ('entrepreneur_mentorship', 'Entrepreneur Mentorship'),
        ('entrepreneur_masterclass', 'Entrepreneur Masterclass'),
    ]

    title = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=SERVICE_CATEGORIES)
    description = models.TextField()
    short_description = models.CharField(max_length=500)
    icon = models.CharField(max_length=10, default='📊')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['category', 'title']

    def __str__(self):
        return self.title


class CaseStudy(models.Model):
    """Success stories and case studies"""
    company_name = models.CharField(max_length=255)
    challenge = models.TextField()
    solution = models.TextField()
    result = models.CharField(max_length=500)
    roi = models.CharField(max_length=200)
    image = models.ImageField(upload_to='case_studies/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    featured = models.BooleanField(default=False)

    class Meta:
        ordering = ['-featured', '-created_at']
        verbose_name = 'Case Study'
        verbose_name_plural = 'Case Studies'

    def __str__(self):
        return self.company_name


class BlogPost(models.Model):
    """Blog posts for the knowledge hub"""
    title = models.CharField(max_length=500)
    excerpt = models.CharField(max_length=500)
    content = models.TextField()
    author = models.CharField(max_length=255, default='Seed of Africa Team')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    featured = models.BooleanField(default=False)
    published = models.BooleanField(default=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Blog Post'
        verbose_name_plural = 'Blog Posts'

    def __str__(self):
        return self.title


class Resource(models.Model):
    """Downloadable resources (templates, guides)"""
    RESOURCE_TYPES = [
        ('template', 'Template'),
        ('guide', 'Guide'),
        ('workbook', 'Workbook'),
        ('spreadsheet', 'Spreadsheet'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    resource_type = models.CharField(max_length=20, choices=RESOURCE_TYPES)
    file_format = models.CharField(max_length=50)
    file = models.FileField(upload_to='resources/')
    created_at = models.DateTimeField(auto_now_add=True)
    downloads = models.IntegerField(default=0)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class TeamMember(models.Model):
    """Team members"""
    name = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    bio = models.TextField()
    email = models.EmailField()
    linkedin = models.URLField(blank=True)
    image = models.ImageField(upload_to='team/')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class Testimonial(models.Model):
    """Client testimonials"""
    client_name = models.CharField(max_length=255)
    client_company = models.CharField(max_length=255)
    client_role = models.CharField(max_length=255)
    testimonial = models.TextField()
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)], default=5)
    image = models.ImageField(upload_to='testimonials/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.client_name
