from django.conf.urls import url

from .views import (
    UserListApiView,
    UserRegisterApiView,
    ProfileApiView,
    ChangePwdApiView,
    StoreListApiView)

urlpatterns = [
    url(r'^(?P<username>[\w]*)$', UserListApiView.as_view(), name='list'),
    url(r'^profile/(?P<username>[\w]+)$', ProfileApiView.as_view(), name='retrieve'),
    url(r'^changepwd/$', ChangePwdApiView.as_view(), name='chngpwd'),
    url(r'^register/$', UserRegisterApiView.as_view(), name='register'),
    url(r'^store/(?P<username>[\w]*)$', StoreListApiView.as_view(), name='storelst'),
]
