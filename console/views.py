from django.shortcuts import render

# Create your views here.
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.viewsets import ModelViewSet

from console.models import Commission
from console.serializers import CommissionSerializer


class CommissionViewSet(ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Commission.objects.all()
    serializer_class = CommissionSerializer

