from django.contrib.auth.models import User

# Create your views here.
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from console.models import Commission
from console.serializers import CommissionSerializer
from uprofile.models import Profile
from uprofile.serializers import StoreSerializer, ProfileSerializer
from utility.views import SyncRecord


class StandardPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 1000


class AgentViewSet(ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = ProfileSerializer
    pagination_class = StandardPagination

    def get_queryset(self):
        users = User.objects.filter(id__gt=1)
        return Profile.objects.filter(user__in=users, isDeleted=False)


class CommissionViewSet(ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Commission.objects.all()
    serializer_class = CommissionSerializer


class InitSystemApiView(APIView):
    permission_classes = (AllowAny,)
    serializer_class = StoreSerializer

    def get(self, request):
        if SyncRecord.sync_records_from_b2b():
            return Response(status=200)
        else:
            return Response(status=500)
