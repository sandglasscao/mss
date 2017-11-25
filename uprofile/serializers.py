from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from rest_framework.fields import (
    DateTimeField,
    BooleanField)
from rest_framework.serializers import (
    ModelSerializer, )
from rest_framework_jwt.settings import api_settings

from .models import (
    Profile,
    Address)


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('pk', 'username')


class AddressSerializer(ModelSerializer):
    owner = UserSerializer(required=False, read_only=True)

    class Meta:
        model = Address
        fields = ('id', 'owner', 'province', 'city', 'district')

    def create(self, validated_data):
        return Address.objects.create(**validated_data)


class ProfileSerializer(ModelSerializer):
    user = UserSerializer(required=False)
    isEmployee = BooleanField(required=False)
    hasRecommAuth = BooleanField(required=False)
    address = AddressSerializer(required=False)
    parent_agent = UserSerializer(required=False)
    grand_agent = UserSerializer(required=False)
    created_dt = DateTimeField(required=False)

    class Meta:
        model = Profile
        fields = (
            'id',
            'user',
            'cellphone',
            'full_name',
            'isEmployee',
            'hasRecommAuth',
            'address',
            'parent_agent',
            'grand_agent',
            'created_dt',
        )
        read_only_fields = (
            'user',
            'grand_agent',
            'created_dt')

    def update(self, instance, validated_data):
        instance.full_name = validated_data.get('full_name', instance.full_name)
        instance.cellphone = validated_data.get('cellphone', instance.cellphone)
        instance.isEmployee = validated_data.get('isEmployee', instance.isEmployee)
        instance.address = validated_data.get('address', instance.address)
        instance.hasRecommAuth = validated_data.get('hasRecommAuth', instance.hasRecommAuth)
        instance.parent_agent = validated_data.get('parent_agent', instance.parent_agent)
        instance.grand_agent = instance.parent_agent.parent_agent

        # update user
        usr = instance.user
        usr.username = validated_data.get('username', instance.username)
        password = validated_data.get('username', None)
        if password:
            usr.set_password(password)
        usr.save()

        instance.save()
        return instance

    def create(self, validated_data):
        cellphone = validated_data["cellphone"]
        username = cellphone
        user = User.objects.create(username=username)
        user.set_password(validated_data['password'])
        user.save()

        profile = user.profile
        profile.cellphone = cellphone

        profile.full_name = validated_data.get("full_name", None)
        profile.cellphone = cellphone
        profile.address = validated_data.get("address", None)
        profile.parent_agent = validated_data.get("parent_agent", None)
        profile.grand_agent = profile.parent_agent.parent_agent

        # try:
        profile.save()

        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(user)
        validated_data["token"] = jwt_encode_handler(payload)
        validated_data['username'] = user.username
        return validated_data
