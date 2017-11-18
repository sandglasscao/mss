import os
from rest_framework.serializers import (
    Serializer,
    ModelSerializer,
    CharField,
    IntegerField,
    DateTimeField,
    HyperlinkedModelSerializer,
)

from rest_framework_jwt.settings import api_settings
from rest_framework.exceptions import ValidationError
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.db import IntegrityError
from django.db.models import Q

from .models import (
    Profile,
)

class UserSerializer(ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('username', 'first_name', 'last_name', 'email')


class ProfileSerializer(ModelSerializer):
    user = UserSerializer(required=False, read_only=True)

    class Meta:
        model = Profile
        fields = (
            'user',
            'usertype',
            'cell',
            'email',
            'first_name',
            'last_name',)
        read_only_fields = (
            'usertype',
            'cell',

        )

    def update(self, instance, validated_data):

        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)

        # update nick name to user account
        usr = instance.user
        usr.first_name = instance.first_name
        usr.email = instance.email
        usr.save()

        instance.save()
        return instance

