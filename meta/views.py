from django.shortcuts import render

# Create your views here.
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly

from meta.models import AddressCode, Enumeration
from meta.serializers import AddressCodeSerializer, EnumerationSerializer


class AddressCodeListApiView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = AddressCodeSerializer

    def get_queryset(self):
        return AddressCode.objects.filter(superCode=self.kwargs['superCode'])


class EnumationList(ListAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = EnumerationSerializer
    queryset = Enumeration.objects.all()
    lookup_field = 'type'

