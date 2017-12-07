from django.db.models import Q
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.generics import (
    ListAPIView,
)
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
)
from django.contrib.auth.models import User
from rest_framework_jwt.settings import api_settings

from console.models import Commission
from uprofile.models import (
    Profile,
    Store,
    Order
)
from .serializers import (
    ProfileSerializer,
    RegisterSerializer,
    PasswordSerializer,
    StoreSerializer,
    OrderSerializer,
    DashHomeSerializer,
    TeamListSerializer,
    CheckCellSerializer)


class StandardPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 1000


class UserListApiView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ProfileSerializer

    def get_queryset(self):
        username = self.kwargs.get('username', None)
        users = User.objects.filter(username__icontains=username, id__gt=1)
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
            ordered_cnt = ordered_cnt + store.order.filter(status='1').count()
        # Store.objects.filter(user=self.request.user, status='1').count()
        myteam_cnt = Profile.objects.filter(Q(parent_agent=user) | Q(grand_agent=user)).count() or 0
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
        for subAgentProfile in user.son_agent.all():
            subStore_cnt = subAgentProfile.user.store.filter(status='2').count()
        subsubStore_cnt = 0
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


class TeamListApiView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = TeamListSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = []
        for agentP in user.son_agent.all():
            team = {}
            agent = agentP.user
            team['agent'] = agent.username
            team['double_cnt'] = agent.store.filter(status='2').count()
            team['ordered_cnt'] = agent.store.filter(status='1').count()
            team['pending_cnt'] = agent.store.filter(status='-1').count()
            subdouble_cnt = 0
            for sonAgentProfile in agent.son_agent.all():
                subdouble_cnt = subdouble_cnt + sonAgentProfile.user.store.filter(status='2').count()
            team['subdouble_cnt'] = subdouble_cnt

            queryset.append(team)

        return queryset


class CellCheckAPIView(APIView):
    permission_classes = [AllowAny]
    serializer_class = CheckCellSerializer

    def post(self, request, *args, **kwargs):
        try:
            profile = Profile.objects.get(cellphone=request.data['cellphone'])
            jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
            jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
            payload = jwt_payload_handler(profile.user)
            token = jwt_encode_handler(payload)
            data = request.data
            data['token'] = token
            data['username'] = profile.user.username
            serializer = CheckCellSerializer(data=data)
            if serializer.is_valid():
                return Response(serializer.data, status=200)
            Response(status=400)
        except Profile.DoesNotExist:
            Response(status=400)
