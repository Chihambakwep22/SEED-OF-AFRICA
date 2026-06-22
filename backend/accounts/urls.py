from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from .admin_views import AdminMentorshipViewSet, AdminStatsView, AdminUserViewSet
from .enterprise_views import SupplierDiscoveryView
from .entrepreneur_views import EntrepreneurDocumentViewSet, EntrepreneurProfileView, MyFeedbackView
from .mentor_views import AssignedEntrepreneursView, MentorFeedbackViewSet
from .program_views import (
    ApplyToProgramView,
    AvailableProgramsView,
    MyApplicationsView,
    ProgramApplicationViewSet,
    ProgramViewSet,
)
from .views import (
    CustomTokenObtainPairView,
    MeView,
    RegisterEnterpriseView,
    RegisterEntrepreneurView,
)

admin_router = DefaultRouter()
admin_router.register(r'admin/users', AdminUserViewSet, basename='admin-users')
admin_router.register(r'admin/mentorships', AdminMentorshipViewSet, basename='admin-mentorships')

entrepreneur_router = DefaultRouter()
entrepreneur_router.register(r'entrepreneur/documents', EntrepreneurDocumentViewSet, basename='entrepreneur-documents')

program_router = DefaultRouter()
program_router.register(r'enterprise/programs', ProgramViewSet, basename='enterprise-programs')
program_router.register(r'enterprise/program-applications', ProgramApplicationViewSet, basename='enterprise-program-applications')

mentor_router = DefaultRouter()
mentor_router.register(r'mentor/feedback', MentorFeedbackViewSet, basename='mentor-feedback')

urlpatterns = [
    path('register/entrepreneur/', RegisterEntrepreneurView.as_view(), name='register-entrepreneur'),
    path('register/enterprise/', RegisterEnterpriseView.as_view(), name='register-enterprise'),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('login/refresh/', TokenRefreshView.as_view(), name='login-refresh'),
    path('me/', MeView.as_view(), name='me'),
    path('admin/stats/', AdminStatsView.as_view(), name='admin-stats'),
    path('enterprise/suppliers/', SupplierDiscoveryView.as_view(), name='supplier-discovery'),
    path('entrepreneur/profile/', EntrepreneurProfileView.as_view(), name='entrepreneur-profile'),
    path('mentor/assigned-entrepreneurs/', AssignedEntrepreneursView.as_view(), name='mentor-assigned-entrepreneurs'),
    path('entrepreneur/programs/', AvailableProgramsView.as_view(), name='available-programs'),
    path('entrepreneur/programs/<int:pk>/apply/', ApplyToProgramView.as_view(), name='apply-to-program'),
    path('entrepreneur/my-applications/', MyApplicationsView.as_view(), name='my-applications'),
    path('entrepreneur/feedback/', MyFeedbackView.as_view(), name='my-feedback'),
    path('', include(admin_router.urls)),
    path('', include(entrepreneur_router.urls)),
    path('', include(program_router.urls)),
    path('', include(mentor_router.urls)),
]
