from rest_framework.serializers import (
    ModelSerializer,
)

from .models import *


class AddressCodeSerializer(ModelSerializer):
    class Meta:
        model = AddressCode
        fields = (
            'id',
            'code',
            'description',
            'superCode',
        )


class EnumerationSerializer(ModelSerializer):
    class Meta:
        model = Enumeration
        fields = (
            'id',
            'type',
            'code',
            'value',
        )
