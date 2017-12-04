import datetime
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

from b2b.models import StoreB2B, AgentB2B
from uprofile.models import Profile, Store
from utility.views import SyncRecord
from .serializers import (
    ProfileSerializer, RegisterSerializer, UserSerializer, PasswordSerializer, StoreSerializer)


class StandardPagination(PageNumberPagination):
    page_size = 20
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
            try:
                profile = Profile.objects.get(user=user)
                queryset.append(profile)
            except Profile.DoesNotExist:
                pass
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


class ProfileApiView(APIView):
    permission_classes = [AllowAny]
    serializer_class = ProfileSerializer

    def get(self, request, username):
        user = User.objects.get(username=username)
        serializer = ProfileSerializer(user.profile)
        return Response(serializer.data, status=HTTP_200_OK)

    def put(self, request, *args, **kwargs):
        profile = request.user.profile
        # print(request.data)

        serializer = ProfileSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)


class ChangePwdApiView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PasswordSerializer

    def put(self, request, *args, **kwargs):
        serializer = PasswordSerializer(request.user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class StoreListApiView(ListAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = StoreSerializer

    # pagination_class = StandardPagination

    def get_queryset(self):
        # SyncRecord.sync_stores_from_b2b()

        # retrieve the agent's account
        agentname = self.kwargs['username']
        if agentname:
            try:
                agent = User.objects.get(username=agentname)
            except User.DoesNotExist:
                agent = self.request.user
        else:
            agent = self.request.user

        # list agent's stores
        try:
            queryset = Store.objects.filter(agent=agent)
        except Store.DoesNotExist:
            queryset = []
        return queryset
