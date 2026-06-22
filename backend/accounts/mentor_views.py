from rest_framework import generics, viewsets

from .mentor_permissions import IsMentor
from .mentor_serializers import AssignedEntrepreneurSerializer, MentorFeedbackSerializer
from .models import MentorFeedback, Mentorship


class AssignedEntrepreneursView(generics.ListAPIView):
    serializer_class = AssignedEntrepreneurSerializer
    permission_classes = [IsMentor]

    def get_queryset(self):
        return Mentorship.objects.filter(
            mentor=self.request.user, status=Mentorship.Status.ACTIVE
        ).select_related('entrepreneur__entrepreneur_profile')


class MentorFeedbackViewSet(viewsets.ModelViewSet):
    serializer_class = MentorFeedbackSerializer
    permission_classes = [IsMentor]
    http_method_names = ['get', 'post']

    def get_queryset(self):
        return MentorFeedback.objects.filter(
            mentorship__mentor=self.request.user
        ).select_related('mentorship__entrepreneur__entrepreneur_profile', 'mentorship__mentor__mentor_profile')
