import json

from django.contrib.auth.models import User

# Create your views here.
from django.http import HttpResponse
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

    def create(self, request, *args, **kwargs):
        tmp_udata = {}
        # 业务眼编号是否存在
        username = request.data.get('username')
        if User.objects.filter(username=username).count() >= 1:
            return HttpResponse(json.dumps({'result': 'username_exist'}), content_type='application/json')

        full_name = request.data.get('full_name')

        # 手机号是否存在
        cellphone = request.data.get('cellphone')

        if Profile.objects.filter(cellphone=cellphone).count() >= 1:
            return HttpResponse(json.dumps({'result': 'cellphone_exist'}), content_type='application/json')

        password = request.data.get('password')

        # 可以为空，推荐人手机号是否存在，是否有推荐资格
        parent_cellphone = request.data.get('parent_cellphone')
        if parent_cellphone:
            try:
                pProfile = Profile.objects.get(cellphone=parent_cellphone)
            except:
                return HttpResponse(json.dumps({'result': 'rec_notexist'}), content_type='application/json')

            if pProfile.hasRecommAuth == 0:
                return HttpResponse(json.dumps({'result': 'rec_nopowerrec'}), content_type='application/json')
            else:
                parent_agent = pProfile.user
                grand_agent = parent_agent.profile.parent_agent

        else:
            parent_agent = None  # /////////////////////////////////////////////////
            grand_agent = None  # /////////////////////////////////////////////////
        try:
            if request.data.get('hasRecommAuth') == 1:
                hasRecommAuth = 1
            else:
                hasRecommAuth = 0
        except:
            pass

        try:
            if request.data.get('isEmployee') == 1:
                isEmployee = 1
            else:
                isEmployee = 0
        except:
            pass
        try:
            user = User.objects.create(username= username)
            user.set_password(password)
            user.save()
            Profile.objects.create(user=User.objects.get(username=username),
                                   cellphone=cellphone,
                                   full_name=full_name,
                                   status=0,
                                   isEmployee=isEmployee,
                                   hasRecommAuth=hasRecommAuth,
                                   parent_agent=parent_agent,
                                   grand_agent=grand_agent,
                                   )
        except:
            return HttpResponse(json.dumps({'result': 'faild'}), content_type='application/json')

        return HttpResponse(json.dumps({'result': 'successful'}), content_type='application/json')


    def get_queryset(self):
        users = User.objects.filter(id__gt=1)
        return Profile.objects.filter(user__in=users, isDeleted=False)


class CommissionViewSet(ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Commission.objects.all()
    serializer_class = CommissionSerializer

