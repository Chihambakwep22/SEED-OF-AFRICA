from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from .models import (
    ContactMessage, Service, CaseStudy, BlogPost, 
    Resource, TeamMember, Testimonial
)
from .serializers import (
    ContactMessageSerializer, ServiceSerializer, CaseStudySerializer,
    BlogPostSerializer, ResourceSerializer, TeamMemberSerializer,
    TestimonialSerializer
)


class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def perform_create(self, serializer):
        contact = serializer.save()
        # Send confirmation email
        try:
            send_mail(
                subject='We received your inquiry - Seed of Africa',
                message=f'Thank you {contact.name}, we will get back to you soon.',
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[contact.email],
                fail_silently=True,
            )
        except:
            pass


class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

    @action(detail=False, methods=['get'])
    def by_category(self, request):
        category = request.query_params.get('category')
        if category:
            services = Service.objects.filter(category=category)
            serializer = self.get_serializer(services, many=True)
            return Response(serializer.data)
        return Response({'error': 'Category parameter required'}, status=status.HTTP_400_BAD_REQUEST)


class CaseStudyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CaseStudy.objects.all()
    serializer_class = CaseStudySerializer

    @action(detail=False, methods=['get'])
    def featured(self, request):
        featured_cases = CaseStudy.objects.filter(featured=True)
        serializer = self.get_serializer(featured_cases, many=True)
        return Response(serializer.data)


class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BlogPost.objects.filter(published=True)
    serializer_class = BlogPostSerializer

    @action(detail=False, methods=['get'])
    def featured(self, request):
        featured_posts = BlogPost.objects.filter(featured=True, published=True)
        serializer = self.get_serializer(featured_posts, many=True)
        return Response(serializer.data)


class ResourceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer

    @action(detail=False, methods=['get'])
    def by_type(self, request):
        resource_type = request.query_params.get('type')
        if resource_type:
            resources = Resource.objects.filter(resource_type=resource_type)
            serializer = self.get_serializer(resources, many=True)
            return Response(serializer.data)
        return Response({'error': 'Type parameter required'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def download(self, request, pk=None):
        resource = self.get_object()
        resource.downloads += 1
        resource.save()
        return Response({'downloads': resource.downloads})


class TeamMemberViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer


class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
