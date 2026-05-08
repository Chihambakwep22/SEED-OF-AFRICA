from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import JsonResponse
from django.core.mail import send_mail
from django.conf import settings
from .models import (
    ContactMessage, Service, CaseStudy, BlogPost, 
    Resource, TeamMember, Testimonial, ChatbotMessage
)
from .serializers import (
    ContactMessageSerializer, ServiceSerializer, CaseStudySerializer,
    BlogPostSerializer, ResourceSerializer, TeamMemberSerializer,
    TestimonialSerializer, ChatbotMessageSerializer
)


def health_check(request):
    return JsonResponse({"status": "ok"})


class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def perform_create(self, serializer):
        contact = serializer.save()
        # Send confirmation email
        try:
            send_mail(
                subject='We received your inquiry - Thale-Quants',
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


class ChatbotViewSet(viewsets.ViewSet):
    """Chatbot endpoint for handling customer inquiries"""

    def create(self, request):
        """Handle incoming chatbot messages"""
        message = request.data.get('message', '').strip()
        session_id = request.data.get('session_id', 'unknown')
        
        if not message:
            return Response(
                {'error': 'Message cannot be empty'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Simple response logic - can be enhanced with AI
        bot_response = self.generate_response(message)
        
        # Save the conversation
        chat_message = ChatbotMessage.objects.create(
            session_id=session_id,
            user_message=message,
            bot_response=bot_response
        )

        # Send email notification to admin
        try:
            send_mail(
                subject=f'New Chatbot Message - Session {session_id}',
                message=f'User: {message}\n\nBot Response: {bot_response}',
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=['info.thalequants@gmail.com'],
                fail_silently=True,
            )
        except:
            pass

        return Response({
            'response': bot_response,
            'session_id': session_id
        })

    def generate_response(self, user_message):
        """Generate response based on keywords in user message"""
        message_lower = user_message.lower()
        
        # Keyword-based responses
        if any(word in message_lower for word in ['enterprise', 'esd', 'supplier', 'compliance']):
            return "Great question! Our Enterprise Solutions help you transform ESD from a compliance burden into a competitive advantage. Would you like to schedule a strategy session?"
        
        elif any(word in message_lower for word in ['entrepreneur', 'business', 'acceleration', 'mentorship']):
            return "Excellent! We offer AI-driven acceleration programs, strategic mentorship, and NQF-aligned certifications for ambitious business owners. Would you like more information?"
        
        elif any(word in message_lower for word in ['price', 'cost', 'budget', 'fee']):
            return "Our pricing varies based on your specific needs. Please share more details about your requirements, and we can provide a custom quote."
        
        elif any(word in message_lower for word in ['contact', 'call', 'meeting', 'demo']):
            return "I'd love to help! You can reach our team at info.thalequants@gmail.com or use our contact form. What time works best for you?"
        
        elif any(word in message_lower for word in ['help', 'support', 'issue', 'problem']):
            return "Sorry to hear you're having an issue. Our support team will be notified and will get back to you shortly. Can you provide more details?"
        
        else:
            return "Thank you for your inquiry! Our team will review your message and get back to you within 24 hours. In the meantime, feel free to explore our website or contact us directly at info.thalequants@gmail.com."
