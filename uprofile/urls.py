from django.conf.urls import url

from .views import (
    UserListApiView,
    ProfileApiView,
    RegisterApiView)

urlpatterns = [
    #url(r'$', UserListApiView.as_view(), name='list'),
    url(r'^(?P<username>[0-11]+)$', ProfileApiView.as_view(), name='retrieve'),
    url(r'^register/(?P<cellphone>[0-9]{11})$', RegisterApiView.as_view(), name='register'),
]
