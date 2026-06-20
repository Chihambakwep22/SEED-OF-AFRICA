from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from .admin_views import AdminStatsView, AdminUserViewSet
from .views import (
    CustomTokenObtainPairView,
    MeView,
    RegisterEnterpriseView,
    RegisterEntrepreneurView,
)

admin_router = DefaultRouter()
admin_router.register(r'admin/users', AdminUserViewSet, basename='admin-users')

urlpatterns = [
    path('register/entrepreneur/', RegisterEntrepreneurView.as_view(), name='register-entrepreneur'),
    path('register/enterprise/', RegisterEnterpriseView.as_view(), name='register-enterprise'),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('login/refresh/', TokenRefreshView.as_view(), name='login-refresh'),
    path('me/', MeView.as_view(), name='me'),
    path('admin/stats/', AdminStatsView.as_view(), name='admin-stats'),
    path('', include(admin_router.urls)),
]
