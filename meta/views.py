from django.shortcuts import render

# Create your views here.
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny

from meta.models import AddressCode
from meta.serializers import AddressCodeSerializer


class AddressCodeListApiView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = AddressCodeSerializer

    def get_queryset(self):
        return AddressCode.objects.filter(superCode=self.kwargs['superCode'])
