from rest_framework.serializers import (
    ModelSerializer,
)

from .models import *


class AddressCodeSerializer(ModelSerializer):
    class Meta:
        model = AddressCode

