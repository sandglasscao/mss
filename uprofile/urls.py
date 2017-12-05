from django.conf.urls import url

from .views import (
    UserListApiView,
    UserRegisterApiView,
    ProfileApiView,
    ChangePwdApiView,
    StoreViewSet,
    OrderViewSet)

store_list = StoreViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
store_detail = StoreViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})

order_list = OrderViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
order_detail = OrderViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})

urlpatterns = [
    url(r'^(?P<username>[\w]*)$', UserListApiView.as_view(), name='list'),
    url(r'^profile/(?P<username>[\w]+)$', ProfileApiView.as_view(), name='retrieve'),
    url(r'^changepwd/$', ChangePwdApiView.as_view(), name='chngpwd'),
    url(r'^register/$', UserRegisterApiView.as_view(), name='register'),
    url(r'^store/$', store_list, name='store-list'),
    url(r'^store/(?P<id>[0-9]+)$', order_detail, name='store-detail'),
    url(r'^order/$', store_list, name='order-list'),
    url(r'^order/(?P<id>[0-9]+)$', order_detail, name='order-detail'),
]
