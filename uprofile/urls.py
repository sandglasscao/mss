from django.conf.urls import url

from .views import (
    ProfileViewSet,
    UserListApiView)


profile_list = ProfileViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
profile_detail = ProfileViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = [
    url(r'^(?P<username>[\w]*)$', UserListApiView.as_view(), name='list'),
    url(r'^profile/$', profile_list, name='profile-list'),
    url(r'^profile/(?P<pk>[0-9]+)$', profile_detail, name='profile-detail'),
]
