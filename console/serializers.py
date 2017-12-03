import os
from rest_framework.serializers import (
    ModelSerializer,
    DateTimeField,
)

from .models import (
    Commission)


class CommissionSerializer(ModelSerializer):

    class Meta:
        model = Commission
        read_only_fields = ('created',)
        fields = (
            'id',
            'base',
            'parent_percent',
            'grand_percent',
            'modified_dt',
        )
