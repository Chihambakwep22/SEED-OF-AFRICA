from rest_framework import generics, viewsets

from .entrepreneur_permissions import IsEntrepreneur
from .entrepreneur_serializers import EntrepreneurDocumentSerializer, EntrepreneurProfileSerializer
from .mentor_serializers import MentorFeedbackSerializer
from .models import EntrepreneurDocument, MentorFeedback


class EntrepreneurProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = EntrepreneurProfileSerializer
    permission_classes = [IsEntrepreneur]

    def get_object(self):
        return self.request.user.entrepreneur_profile


class EntrepreneurDocumentViewSet(viewsets.ModelViewSet):
    serializer_class = EntrepreneurDocumentSerializer
    permission_classes = [IsEntrepreneur]
    http_method_names = ['get', 'post', 'delete']

    def get_queryset(self):
        return EntrepreneurDocument.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class MyFeedbackView(generics.ListAPIView):
    serializer_class = MentorFeedbackSerializer
    permission_classes = [IsEntrepreneur]

    def get_queryset(self):
        return MentorFeedback.objects.filter(
            mentorship__entrepreneur=self.request.user
        ).select_related('mentorship__entrepreneur__entrepreneur_profile', 'mentorship__mentor__mentor_profile')
