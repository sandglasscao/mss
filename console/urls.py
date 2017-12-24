from django.conf.urls import url

from uprofile.views import ChangePwdApiView
from .views import (
    CommissionViewSet,
    InitSystemApiView,
    AgentViewSet
)

commission_list = CommissionViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
commission_detail = CommissionViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})

agent_list = AgentViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
agent_detail = AgentViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
})

urlpatterns = [
    url(r'^cmmssn/$', commission_list, name='commission-list'),
    url(r'^cmmssn/(?P<pk>[0-9]+)$', commission_detail, name='commission-detail'),
    url(r'^agent/$', agent_list, name='agent-list'),
    url(r'^agent/(?P<pk>[0-9]+)$', agent_detail, name='agent-detail'),
    url(r'^sync$', InitSystemApiView.as_view(), name='syncdata'),
    url(r'^resetpwd/', ChangePwdApiView.as_view(), name='resetpwd'),

]
