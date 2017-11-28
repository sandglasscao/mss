from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from rest_framework.fields import (
    DateTimeField,
    BooleanField, CharField, IntegerField)
from rest_framework.serializers import (
    ModelSerializer, Serializer)
from rest_framework_jwt.settings import api_settings

from .models import (
    Profile,
    Address)


class RegisterSerializer(Serializer):
    username = CharField(max_length=6, required=False)
    token = CharField(allow_blank=True, read_only=True)
    password = CharField(max_length=15)
    cellphone = CharField(max_length=11)
    full_name = CharField(max_length=50, required=False)
    parent_code = CharField(max_length=6)

    def create(self, validated_data):
        cellphone = validated_data["cellphone"]
        username = cellphone
        user = User.objects.create(username=username)
        user.set_password(validated_data['password'])
        user.save()

        full_name = validated_data.get("full_name", None)
        parent_code = validated_data.get("parent_code", None)
        try:
            parent = User.objects.get(username=parent_code)
            grand_agent = parent.profile.parent_agent
        except User.DoesNotExist:
            parent = None
            grand_agent = None

        profile = Profile.objects.create(
            user=user,
            cellphone=cellphone,
            full_name=full_name,
            parent_agent=parent,
            grand_agent=grand_agent
        )
        # profile.save()

        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(user)
        validated_data["token"] = jwt_encode_handler(payload)
        validated_data['username'] = user.username
        return validated_data
