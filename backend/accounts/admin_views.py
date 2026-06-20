import csv

from django.http import HttpResponse
from django.utils import timezone
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView

from .admin_permissions import IsSuperAdmin
from .admin_serializers import (
    AdminSetAdminRoleSerializer,
    AdminUserCreateSerializer,
    AdminUserListSerializer,
    AdminUserUpdateSerializer,
    LoginHistorySerializer,
    ResetPasswordSerializer,
)
from .models import LoginHistory, User


class AdminUserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsSuperAdmin]
    queryset = User.objects.all().order_by('-date_joined')

    def get_serializer_class(self):
        if self.action == 'create':
            return AdminUserCreateSerializer
        if self.action in ('update', 'partial_update'):
            return AdminUserUpdateSerializer
        return AdminUserListSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        params = self.request.query_params
        role = params.get('role')
        if role:
            queryset = queryset.filter(role=role)
        is_active = params.get('is_active')
        if is_active is not None:
            queryset = queryset.filter(is_active=is_active.lower() == 'true')
        is_approved = params.get('is_approved')
        if is_approved is not None:
            queryset = queryset.filter(is_approved=is_approved.lower() == 'true')
        search = params.get('search')
        if search:
            queryset = queryset.filter(email__icontains=search)
        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(AdminUserListSerializer(user).data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(AdminUserListSerializer(user).data)

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        user = self.get_object()
        user.is_approved = True
        user.save()
        return Response(AdminUserListSerializer(user).data)

    @action(detail=True, methods=['post'])
    def suspend(self, request, pk=None):
        user = self.get_object()
        user.is_active = False
        user.save()
        return Response(AdminUserListSerializer(user).data)

    @action(detail=True, methods=['post'])
    def activate(self, request, pk=None):
        user = self.get_object()
        user.is_active = True
        user.save()
        return Response(AdminUserListSerializer(user).data)

    @action(detail=True, methods=['post'], url_path='set-admin')
    def set_admin(self, request, pk=None):
        user = self.get_object()
        serializer = AdminSetAdminRoleSerializer(user, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(AdminUserListSerializer(user).data)

    @action(detail=True, methods=['post'], url_path='reset-password')
    def reset_password(self, request, pk=None):
        user = self.get_object()
        serializer = ResetPasswordSerializer(user, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'detail': 'Password reset.'})

    @action(detail=True, methods=['get'], url_path='login-history')
    def login_history(self, request, pk=None):
        user = self.get_object()
        history = user.login_history.all()[:20]
        return Response(LoginHistorySerializer(history, many=True).data)

    @action(detail=False, methods=['get'])
    def export(self, request):
        queryset = self.get_queryset()
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="users.csv"'
        writer = csv.writer(response)
        writer.writerow(['id', 'email', 'role', 'phone_number', 'is_active', 'is_approved', 'is_verified', 'date_joined', 'last_login'])
        for user in queryset:
            writer.writerow([
                user.id, user.email, user.role, user.phone_number,
                user.is_active, user.is_approved, user.is_verified,
                user.date_joined, user.last_login,
            ])
        return response


class AdminStatsView(APIView):
    permission_classes = [IsSuperAdmin]

    def get(self, request):
        now = timezone.now()
        month_start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)

        registrations = list(
            User.objects.order_by('-date_joined')[:10].values('id', 'email', 'role', 'date_joined')
        )
        logins = list(
            LoginHistory.objects.select_related('user').order_by('-timestamp')[:10]
            .values('user__email', 'timestamp')
        )

        feed = [
            {'type': 'registration', 'email': r['email'], 'role': r['role'], 'timestamp': r['date_joined']}
            for r in registrations
        ] + [
            {'type': 'login', 'email': l['user__email'], 'timestamp': l['timestamp']}
            for l in logins
        ]
        feed.sort(key=lambda item: item['timestamp'], reverse=True)

        return Response({
            'total_users': User.objects.count(),
            'total_entrepreneurs': User.objects.filter(role=User.Role.ENTREPRENEUR).count(),
            'total_enterprises': User.objects.filter(role=User.Role.ENTERPRISE).count(),
            'pending_approvals': User.objects.filter(is_approved=False).count(),
            'monthly_registrations': User.objects.filter(date_joined__gte=month_start).count(),
            'activity_feed': feed[:10],
        })
