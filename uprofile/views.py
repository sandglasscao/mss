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
    ProfileSerializer, RegisterSerializer)


class StandardPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 1000


class UserListApiView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ProfileSerializer

    def get_queryset(self):
        username = self.kwargs.get('username', None)
        users = User.objects.filter(username__icontains=username)
        queryset = []
        for user in users:
            profile = Profile.objects.get(user=user)
            queryset.append(profile)
        return queryset


class UserRegisterApiView(APIView):
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = RegisterSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class ProfileViewSet(ModelViewSet):
    permission_classes = (AllowAny,)
    serializer_class = ProfileSerializer
    pagination_class = StandardPagination

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
