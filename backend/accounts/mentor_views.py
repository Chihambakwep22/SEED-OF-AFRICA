from rest_framework import generics

from .mentor_permissions import IsMentor
from .mentor_serializers import AssignedEntrepreneurSerializer
from .models import Mentorship


class AssignedEntrepreneursView(generics.ListAPIView):
    serializer_class = AssignedEntrepreneurSerializer
    permission_classes = [IsMentor]

    def get_queryset(self):
        return Mentorship.objects.filter(
            mentor=self.request.user, status=Mentorship.Status.ACTIVE
        ).select_related('entrepreneur__entrepreneur_profile')
