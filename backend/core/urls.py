from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ContactMessageViewSet, ServiceViewSet, CaseStudyViewSet,
    BlogPostViewSet, ResourceViewSet, TeamMemberViewSet,
    TestimonialViewSet
)

router = DefaultRouter()
router.register(r'contact', ContactMessageViewSet, basename='contact')
router.register(r'services', ServiceViewSet, basename='services')
router.register(r'case-studies', CaseStudyViewSet, basename='case-studies')
router.register(r'blog-posts', BlogPostViewSet, basename='blog-posts')
router.register(r'resources', ResourceViewSet, basename='resources')
router.register(r'team-members', TeamMemberViewSet, basename='team-members')
router.register(r'testimonials', TestimonialViewSet, basename='testimonials')

urlpatterns = [
    path('', include(router.urls)),
]
