import json

from django.db.models import Q
from django.http import HttpResponse
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
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class ProfileApiView(APIView):
    permission_classes = [AllowAny]
    serializer_class = ProfileSerializer

    def get(self, request, username):
        try:
            user = User.objects.get(username=username)
        except:
            user = Profile.objects.get(cellphone=username).user
        # rec_flag = 0
        #
        # if user.profile.hasRecommAuth != 1:
        #     if rec_flag < 2:
        #         for store in Store.objects.filter(sales=user):
        #             if store.order.count() >= 2:
        #                 rec_flag += 1
        #     else:
        #         Profile.objects.filter(user=user).update(hasRecommAuth=1)

        serializer = ProfileSerializer(user.profile)
        return Response(serializer.data, status=HTTP_200_OK)

    def put(self, request, *args, **kwargs):
        profile = request.user.profile

        serializer = ProfileSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)


class ChangePwdApiView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PasswordSerializer

    def put(self, request, *args, **kwargs):
        try:
            pk = request.data.get('pk')
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            user = request.user
        serializer = PasswordSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)


class StoreViewSet(ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = StoreSerializer
    lookup_field = 'id'

    def get_queryset(self):
        queryset = Store.objects.filter(sales=self.request.user)
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


class DashHomeApiView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = DashHomeSerializer

    def get(self, request):
        user = self.request.user
        # store_cnt = user.store.all().count()  # Store.objects.filter(agent=user).count()
        store_cnt = Store.objects.filter(sales=user).count()
        # ordered_cnt = 0
        # for store in user.store.all():
        #     # ordered_cnt = ordered_cnt + store.order.filter(status='1').count()
        #     ordered_cnt = ordered_cnt + store.order.filter(Q(status='2')|Q(status='3')).count()
        ordered_cnt = 0
        for i in Store.objects.filter(sales=user):
            if i.order.count() == 1:
                ordered_cnt += 1

        # Store.objects.filter(user=self.request.user, status='1').count()
        myteam_cnt = Profile.objects.filter(Q(parent_agent=user) | Q(grand_agent=user)).count() or 0
        response = {}
        response['store_cnt'] = store_cnt
        response['ordered_cnt'] = ordered_cnt
        response['myteam_cnt'] = myteam_cnt
        response['commission'] = self.__commission__()

        return Response(response, status=HTTP_200_OK)

    def __commission__(self):
        user = self.request.user

        # myStore_cnt = user.store.filter(status='2').count()
        if user.profile.isEmployee:
            # this agent is employee, so his/her stores should not be involved in commission.
            myStore_cnt = 0
        else:
            # myStore_cnt = user.store.filter(status='2').count()
            myStore_cnt = Store.objects.filter(sales=user).filter(status='2').count()
            if myStore_cnt >= 2:
                if user.profile.hasRecommAuth != 1:
                    Profile.objects.filter(user=user).update(hasRecommAuth=1)

        subStore_cnt = 0
        queryset2 = Profile.objects.filter(parent_agent=user)
        for i in queryset2:
            user2 = i.user
            # print(Store.objects.filter(sales=user2).filter(status='2').count())
            subStore_cnt = Store.objects.filter(sales=user2).filter(status='2').count() + subStore_cnt

        subsubStore_cnt = 0
        queryset3 = Profile.objects.filter(grand_agent=user)
        for i in queryset3:
            user3 = i.user
            subsubStore_cnt = Store.objects.filter(sales=user3).filter(status='2').count() + subsubStore_cnt


        commissions = Commission.objects.all()
        commission = commissions[0]
        myComm = commission.base * (
            myStore_cnt
            + subStore_cnt * commission.parent_percent/100
            + subsubStore_cnt * commission.grand_percent/100
        )
        return myComm


class TeamListApiView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = TeamListSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = []
        # for agentP in user.son_agent.all():
        #     team = {}
        #     agent = agentP.user
        #     team['agent'] = agent.username
        #     team['double_cnt'] = agent.store.filter(status='2').count()
        #     team['ordered_cnt'] = agent.store.filter(status='1').count()
        #     team['pending_cnt'] = agent.store.filter(status='-1').count()
        #     subdouble_cnt = 0
        #     for sonAgentProfile in agent.son_agent.all():
        #         subdouble_cnt = subdouble_cnt + sonAgentProfile.user.store.filter(status='2').count()
        #     team['subdouble_cnt'] = subdouble_cnt
        #
        #     queryset.append(team)

        for agentP in Profile.objects.filter(parent_agent=user).all():
            team = {}
            agent = agentP.user
            team['agent'] = agent.username
            # team['double_cnt'] = agent.store.filter(status='2').count()
            team['double_cnt'] = Store.objects.filter(sales=agent).filter(status=2).count()
            team['ordered_cnt'] = Store.objects.filter(sales=agent).filter(status=1).count()
            team['pending_cnt'] = Store.objects.filter(sales=agent).filter(status=-1).count()
            subdouble_cnt = 0
            for sonAgentProfile in Profile.objects.filter(parent_agent=agent).all():
                sonuser = sonAgentProfile.user
                subdouble_cnt = subdouble_cnt + Store.objects.filter(sales=sonuser).filter(status=2).count()
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

def pccheck(request):

    pcphone = request.GET.get('pcphone', None)

    if Profile.objects.filter(cellphone=pcphone).count() == 1:
        return HttpResponse(json.dumps({'cellinfo': 'OK'}), content_type='application/json')
    else:
        return HttpResponse(json.dumps({'cellinfo': 'Faild'}), content_type='application/json')


