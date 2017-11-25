import base64
import json
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.generics import (
    ListAPIView,
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
)
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from rest_framework.viewsets import ReadOnlyModelViewSet, ModelViewSet
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
)
from django.contrib.auth.models import User

from uprofile.models import Profile
from .serializers import (
    ProfileSerializer)


class StandardPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 1000


class UserListApiView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ProfileSerializer
    pagination_class = StandardPagination
    queryset = Profile.objects.all()

    def get(self, request, *args, **kwargs):
        serializer = ProfileSerializer(self.queryset)
        return Response(serializer.data, status=HTTP_200_OK)

class ProfileViewSet(ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = ProfileSerializer
    pagination_class = StandardPagination

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
