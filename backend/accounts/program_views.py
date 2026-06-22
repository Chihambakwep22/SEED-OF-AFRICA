from django.shortcuts import get_object_or_404
from rest_framework import generics, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView

from .entrepreneur_permissions import IsEntrepreneur
from .enterprise_permissions import IsEnterprise
from .models import Program, ProgramApplication
from .program_serializers import ProgramApplicationSerializer, ProgramSerializer


class ProgramViewSet(viewsets.ModelViewSet):
    serializer_class = ProgramSerializer
    permission_classes = [IsEnterprise]

    def get_queryset(self):
        return Program.objects.filter(enterprise=self.request.user)

    def perform_create(self, serializer):
        serializer.save(enterprise=self.request.user)

    @action(detail=True, methods=['get'])
    def applicants(self, request, pk=None):
        program = self.get_object()
        applications = program.applications.select_related('entrepreneur__entrepreneur_profile')
        return Response(ProgramApplicationSerializer(applications, many=True).data)


class ProgramApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = ProgramApplicationSerializer
    permission_classes = [IsEnterprise]
    http_method_names = ['get', 'patch']

    def get_queryset(self):
        return ProgramApplication.objects.filter(
            program__enterprise=self.request.user
        ).select_related('entrepreneur__entrepreneur_profile', 'program')


class AvailableProgramsView(generics.ListAPIView):
    serializer_class = ProgramSerializer
    permission_classes = [IsEntrepreneur]
    queryset = Program.objects.filter(status=Program.Status.OPEN)


class MyApplicationsView(generics.ListAPIView):
    serializer_class = ProgramApplicationSerializer
    permission_classes = [IsEntrepreneur]

    def get_queryset(self):
        return ProgramApplication.objects.filter(
            entrepreneur=self.request.user
        ).select_related('program')


class ApplyToProgramView(APIView):
    permission_classes = [IsEntrepreneur]

    def post(self, request, pk):
        program = get_object_or_404(Program, pk=pk, status=Program.Status.OPEN)
        if ProgramApplication.objects.filter(program=program, entrepreneur=request.user).exists():
            return Response({'detail': 'You have already applied to this program.'}, status=status.HTTP_400_BAD_REQUEST)
        application = ProgramApplication.objects.create(
            program=program, entrepreneur=request.user, message=request.data.get('message', ''),
        )
        return Response(ProgramApplicationSerializer(application).data, status=status.HTTP_201_CREATED)
