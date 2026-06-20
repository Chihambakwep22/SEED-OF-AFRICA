from rest_framework import generics

from .entrepreneur_permissions import IsEntrepreneur
from .entrepreneur_serializers import EntrepreneurProfileSerializer


class EntrepreneurProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = EntrepreneurProfileSerializer
    permission_classes = [IsEntrepreneur]

    def get_object(self):
        return self.request.user.entrepreneur_profile
