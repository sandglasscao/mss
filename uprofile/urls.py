from django.conf.urls import url

from .views import (
    UserListApiView,
    UserRegisterApiView,
    ProfileApiView)


urlpatterns = [
    url(r'^(?P<username>[\w]*)$', UserListApiView.as_view(), name='list'),
    url(r'^profile/(?P<username>[\w]*)$', ProfileApiView.as_view(), name='retrieve'),
    url(r'^register/$', UserRegisterApiView.as_view(), name='register'),
]
