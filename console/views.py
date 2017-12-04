from django.shortcuts import render

# Create your views here.
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from console.models import Commission
from console.serializers import CommissionSerializer
from uprofile.serializers import StoreSerializer
from utility.views import SyncRecord


class CommissionViewSet(ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Commission.objects.all()
    serializer_class = CommissionSerializer


class InitSystemApiView(APIView):
    permission_classes = (AllowAny,)
    serializer_class = StoreSerializer

    def get(self, request):
        if SyncRecord.initSystem():
            return Response(status=200)
        else:
            return Response(status=500)
