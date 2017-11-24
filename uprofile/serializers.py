from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from rest_framework.serializers import (
    ModelSerializer,
    Serializer)
from rest_framework_jwt.settings import api_settings

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

    def update(self, instance, validated_data):
        instance.full_name = validated_data.get('full_name', instance.full_name)
        instance.cellphone = validated_data.get('cellphone', instance.cellphone)
        instance.isStaff = validated_data.get('isStaff', instance.isStaff)
        instance.rank = validated_data.get('rank', instance.rank)

        # update user
        usr = instance.user
        usr.username = validated_data.get('username', instance.username)
        usr.first_name = validated_data.get('first_name', instance.first_name)
        usr.last_name = validated_data.get('last_name', instance.last_name)
        usr.email = validated_data.get('email', instance.email)
        usr.save()

        instance.save()
        return instance


class RegisterSerializer(Serializer):
    class Meta:
        model = Profile

    def create(self, validated_data):
        cellphone = validated_data["cellphone"]
        username = cellphone
        user = User.objects.create(username=username)
        user.set_password(validated_data['password'])
        user.save()

        profile = user.profile
        profile.cellphone = cellphone
        #profile.usertype = usertype

        profile.name = validated_data.get("name", None)
        profile.idtype = validated_data.get("idtype", None)
        profile.idname = validated_data.get("idname", None)
        profile.idno = validated_data.get("idno", None)

        # try:
        profile.save()

        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(user)
        validated_data["token"] = jwt_encode_handler(payload)
        validated_data['username'] = user.username
        return validated_data

