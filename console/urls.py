from django.conf.urls import url

from .views import (
    CommissionViewSet, InitSystemApiView)

commission_list = CommissionViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
commission_detail = CommissionViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})

urlpatterns = [
    url(r'^cmmssn/$', commission_list, name='commission-list'),
    url(r'^cmmssn/(?P<pk>[0-9]+)$', commission_detail, name='commission-detail'),
    url(r'^sync$', InitSystemApiView.as_view(), name='syncdata'),

]
