from rest_framework import generics

from .enterprise_permissions import IsEnterprise
from .enterprise_serializers import SupplierSerializer
from .models import EntrepreneurProfile


class SupplierDiscoveryView(generics.ListAPIView):
    serializer_class = SupplierSerializer
    permission_classes = [IsEnterprise]

    def get_queryset(self):
        queryset = EntrepreneurProfile.objects.select_related('user').filter(
            user__is_active=True
        ).order_by('-performance_score')

        params = self.request.query_params
        industry = params.get('industry')
        if industry:
            queryset = queryset.filter(industry__icontains=industry)
        location = params.get('location')
        if location:
            queryset = queryset.filter(location__icontains=location)
        business_stage = params.get('business_stage')
        if business_stage:
            queryset = queryset.filter(business_stage=business_stage)
        business_size = params.get('business_size')
        if business_size:
            queryset = queryset.filter(business_size__icontains=business_size)
        certifications = params.get('certifications')
        if certifications:
            queryset = queryset.filter(certifications__icontains=certifications)
        min_score = params.get('min_score')
        if min_score:
            try:
                queryset = queryset.filter(performance_score__gte=float(min_score))
            except ValueError:
                pass
        return queryset
