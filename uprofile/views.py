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
from .serializers import (
    ProfileSerializer, RegisterSerializer, UserSerializer, PasswordSerializer, StoreSerializer)


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
    pagination_class = StandardPagination

    def get_queryset(self):
        try:
            last = Store.objects.latest('b2b_id')
            latest_store_id = last.b2b_id
        except Store.DoesNotExist:
            latest_store_id = 0
        self.__sync_stores_from_b2b__(latest_store_id)
        username = self.kwargs['username']
        try:
            usr = User.objects.get(username=username)
            queryset = Store.objects.filter(agent=usr)
        except User.DoesNotExist:
            queryset = []
        return queryset

    def __sync_stores_from_b2b__(self, lastId):
        storeb2bs = StoreB2B.objects.filter(id__gt=lastId)
        stores = []
        for storeb2b in storeb2bs:
            if (storeb2b.agent_id):
                store = {}

                store['name'] = storeb2b.name or None
                store['address'] = storeb2b.address or None
                store['owner'] = storeb2b.owner or None
                store['cellphone'] = storeb2b.cellphone or None
                store['status'] = storeb2b.status or '-1'
                store['b2b_id'] = storeb2b.id or None
                store['created_dt'] = storeb2b.created_dt or datetime.datetime.now()
                agent_num = storeb2b.agent_num.strip()

                try:
                    usr = User.objects.get(username=agent_num)
                except User.DoesNotExist:
                    agentb2b = AgentB2B.objects.get(id=storeb2b.agent_id)
                    self.__create_agent__(agentb2b)
                    usr = User.objects.get(username=agent_num)
                store['agent'] = usr.id

                stores.append(store)

        serializer = StoreSerializer(data=stores, many=True)
        if serializer.is_valid():
            serializer.save()

    def __create_agent__(self, agentb2b):
        user = User.objects.create(username=agentb2b.num)
        user.set_password(agentb2b.num)
        user.save()

        cellphone = agentb2b.cellphone or None
        full_name = agentb2b.full_name or None
        profile = Profile.objects.create(
            user=user,
            cellphone=cellphone,
            full_name=full_name,
            isEmployee=True,
            hasRecommAuth=True,
        )

        serializer = RegisterSerializer(data=profile)
        if serializer.is_valid():
            serializer.save()