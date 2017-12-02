from django.conf.urls import url

from .views import (
    EnumationList,
)

urlpatterns = [
    url(r'^storestatus/(?P<type>[0-9]+)$', EnumationList.as_view(), name='options'),
]
