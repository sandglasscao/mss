import base64
import json

import os
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
    CheckCellSerializer, Save_photoSerializer)


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
        queryset = Store.objects.filter(agent=self.request.user)
        return queryset


    # 获取照片
    # 为照片命名
    # 将照片和名字保存
    # 将地址和名字写入数据库


    def update(self, request, *args, **kwargs):
        photo1 = request.data.get('license_pic', None)
        photo2 = request.data.get('store_pic', None)
        a,b = 0,0
        if photo1 != 'undefined':
            photo11 = photo1.split(',')[1]
            photo111 = base64.b64decode(photo11)
            picName = self.kwargs.get('id')+'mentou'+'.jpeg'

            destiantion = open(r'static/store_images/'+picName, 'wb+')
            # for chunk in photo111.chunks:
            destiantion.write(photo111)
            destiantion.close()
            photopath = r'static/store_images/'+picName
            x = Store.objects.get(id=self.kwargs.get('id'))
            x.license_pic = photopath
            x.save()
            a = 1

        if photo2 != 'undefined':
            photo21 = photo2.split(',')[1]
            photo211 = base64.b64decode(photo21)
            picName = self.kwargs.get('id')+'lience'+'.jpeg'

            destiantion = open(r'static/store_images/'+picName, 'wb+')
            destiantion.write(photo211)
            destiantion.close()
            photopath = r'static/store_images/' + picName
            x = Store.objects.get(id=self.kwargs.get('id'))
            x.outdoor_pic = photopath
            x.save()
            b = 1
        return Response(data={'license_pic':a,'store_pic':b},status=200)
        # licpic = ('license_pic' in data.keys()) and data.pop('license_pic')[0]
        #
        # if licpic:
        #     store['license_pic'] = licpic
        # elif 'license_pic' in store.keys():
        #     store.pop('license_pic')
        # return super(StoreViewSet,self).update(request, *args, **kwargs)
        #

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
        #myStore_cnt = user.store.filter(status='2').count()
        if user.profile.isEmployee:
            # this agent is employee, so his/her stores should not be involved in commission.
            myStore_cnt =0
        else:
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

