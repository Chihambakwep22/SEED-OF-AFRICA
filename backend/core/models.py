from django.db import models
from django.utils import timezone


# ---------------- CONTACT ----------------
class ContactMessage(models.Model):
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

    def __str__(self):
        return f"{self.name} - {self.company}"


# ---------------- SERVICES ----------------
class Service(models.Model):
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

    def __str__(self):
        return self.title


# ---------------- CASE STUDIES ----------------
class CaseStudy(models.Model):
    company_name = models.CharField(max_length=255)
    challenge = models.TextField()
    solution = models.TextField()
    result = models.CharField(max_length=500)
    roi = models.CharField(max_length=200)
    image = models.ImageField(upload_to='case_studies/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    featured = models.BooleanField(default=False)

    def __str__(self):
        return self.company_name


# ---------------- BLOG ----------------
class BlogPost(models.Model):
    title = models.CharField(max_length=500)
    excerpt = models.CharField(max_length=500)
    content = models.TextField()
    author = models.CharField(max_length=255, default='Thale-Quants Team')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    featured = models.BooleanField(default=False)
    published = models.BooleanField(default=True)

    def __str__(self):
        return self.title


# ---------------- RESOURCES ----------------
class Resource(models.Model):
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
    downloads = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


# ---------------- TEAM ----------------
class TeamMember(models.Model):
    name = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    bio = models.TextField()
    email = models.EmailField()
    linkedin = models.URLField(blank=True)
    image = models.ImageField(upload_to='team/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


# ---------------- TESTIMONIALS ----------------
class Testimonial(models.Model):
    client_name = models.CharField(max_length=255)
    client_company = models.CharField(max_length=255)
    client_role = models.CharField(max_length=255)
    testimonial = models.TextField()
    rating = models.IntegerField(default=5)
    image = models.ImageField(upload_to='testimonials/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.client_name


# ---------------- 📊 KPI / METRICS (FIXED - THIS WAS YOUR ERROR) ----------------
class Metric(models.Model):
    METRIC_TYPES = [
        ('revenue_growth', 'Revenue Growth'),
        ('jobs_created', 'Jobs Created'),
        ('supplier_score', 'Supplier Score'),
        ('digital_adoption', 'Digital Adoption'),
        ('esd_impact', 'ESD Impact'),
    ]

    metric_type = models.CharField(max_length=50, choices=METRIC_TYPES)
    display_value = models.CharField(max_length=50)
    unit = models.CharField(max_length=20, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    icon = models.CharField(max_length=10, default='📊')

    progress_percentage = models.FloatField(default=0)
    target_value = models.FloatField(default=0)

    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.metric_type


# ---------------- SUPPLIER AI SCORING ----------------
class Supplier(models.Model):
    supplier_name = models.CharField(max_length=255)
    registration_number = models.CharField(max_length=100)
    industry_sector = models.CharField(max_length=255)

    financial_health_score = models.FloatField(default=0)
    operational_excellence_score = models.FloatField(default=0)
    digital_readiness_score = models.FloatField(default=0)
    compliance_score = models.FloatField(default=0)
    growth_potential_score = models.FloatField(default=0)

    predicted_revenue_growth = models.FloatField(default=0)
    predicted_job_creation = models.IntegerField(default=0)

    risk_level = models.IntegerField(default=2)  # 1=low, 2=medium, 3=high, 4=critical
    ai_confidence_score = models.FloatField(default=0)
    overall_score = models.FloatField(default=0)

    performance_category = models.CharField(max_length=50, blank=True)
    last_assessed = models.DateTimeField(null=True, blank=True)
    next_review_date = models.DateTimeField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.supplier_name


# ---------------- AI INSIGHTS ----------------
class AIInsight(models.Model):
    INSIGHT_TYPES = [
        ('risk', 'Risk Alert'),
        ('growth', 'Growth Opportunity'),
        ('compliance', 'Compliance Issue'),
        ('performance', 'Performance Insight'),
    ]

    title = models.CharField(max_length=255)
    insight_type = models.CharField(max_length=50, choices=INSIGHT_TYPES)
    description = models.TextField()

    related_supplier = models.ForeignKey(
        Supplier,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    confidence_level = models.FloatField(default=50)
    is_actionable = models.BooleanField(default=False)
    is_resolved = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.title


# ---------------- REPORTS ----------------
class Report(models.Model):
    REPORT_TYPES = [
        ('esd', 'ESD Report'),
        ('supplier', 'Supplier Report'),
        ('financial', 'Financial Report'),
        ('impact', 'Impact Report'),
    ]

    title = models.CharField(max_length=255)
    report_type = models.CharField(max_length=50, choices=REPORT_TYPES)
    generated_for = models.CharField(max_length=255)
    generated_by = models.CharField(max_length=255)

    start_date = models.DateField()
    end_date = models.DateField()

    pdf_file = models.FileField(upload_to='reports/', null=True, blank=True)
    summary = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    downloaded_at = models.DateTimeField(null=True, blank=True)

    is_public = models.BooleanField(default=False)

    def __str__(self):
        return self.title