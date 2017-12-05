import datetime

from django.db.models import Q
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
from console.models import Commission
from uprofile.models import Profile, Store, Order
from utility.views import SyncRecord
from .serializers import (
    ProfileSerializer, RegisterSerializer, UserSerializer, PasswordSerializer, StoreSerializer, OrderSerializer,
    DashHomeSerializer)


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


class StoreViewSet(ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = StoreSerializer
    lookup_field = 'id'

    def get_queryset(self):
        queryset = Store.objects.filter(agent=self.request.user)
        return queryset


class OrderViewSet(ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = OrderSerializer
    lookup_field = 'id'

    def get_queryset(self):
        store = self.kwargs['store']
        if store:
            queryset = Order.objects.filter(store=store)
        else:
            queryset = []
        return queryset


class DashHomeListApiView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = DashHomeSerializer

    def get_queryset(self):
        user = self.request.user
        store_cnt = user.store.all().count()  # Store.objects.filter(agent=user).count()
        ordered_cnt = 0
        for store in user.store.all():
            ordered_cnt = store.order.filter(status='1').count()
        # Store.objects.filter(user=self.request.user, status='1').count()
        myteam_cnt = Profile.objects.filter(Q(parent_agent=user) | Q(grand_agent=user)).count()
        response = {}
        response['store_cnt'] = store_cnt
        response['ordered_cnt'] = ordered_cnt
        response['myteam_cnt'] = myteam_cnt
        response['commission'] = self.__commission__()

        queryset = [response]
        return queryset

    def __commission__(self):
        user = self.request.user
        myStore_cnt = user.store.filter(status='2').count()
        subStore_cnt = 0
        if user.son_agent:
            for subAgentProfile in user.son_agent.all():
                subStore_cnt = subAgentProfile.user.store.filter(status='2').count()
        subsubStore_cnt = 0
        if user.grand_agent:
            for grandAgentProfile in user.grand_agent.all():
                subsubStore_cnt = grandAgentProfile.user.store.filter(status='2').count()
        commissions = Commission.objects.all()
        commission = commissions[0]
        myComm = commission.base * (
            myStore_cnt
            + subStore_cnt * commission.parent_percent
            + subsubStore_cnt * commission.grand_percent
        )
        return myComm
