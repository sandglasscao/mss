from django.conf.urls import url

from .views import (
    UserListApiView,
    ProfileApiView,
)

urlpatterns = [
    url(r'^$', UserListApiView.as_view(), name='list'),
    url(r'^(?P<username>[0-9]+)$', ProfileApiView.as_view(), name='retrieve'),

]
