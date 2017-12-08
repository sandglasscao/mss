from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from rest_framework.serializers import (
    ModelSerializer,
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
