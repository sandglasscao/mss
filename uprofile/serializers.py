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
    Address, Store, Order)


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('pk', 'username', 'is_staff')


class AddressSerializer(ModelSerializer):
    owner = UserSerializer(required=False, read_only=True)

    class Meta:
        model = Address
        fields = ('id', 'owner', 'province', 'city', 'district')

    def create(self, validated_data):
        return Address.objects.create(**validated_data)


class PasswordSerializer(ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('password',)

    def update(self, instance, validated_data):
        instance.set_password(validated_data.get('password', instance.password))
        instance.save()
        return instance


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
            'address',
            'parent_agent',
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


class StoreSerializer(ModelSerializer):
    class Meta:
        model = Store
        fields = (
            'id',
            'name',
            'address',
            'latitude',
            'longitude',
            'owner',
            'cellphone',
            'agent',
            'status',
            'license',
            'license_pic',
            'indoor_pic',
            'outdoor_pic',
            'b2b_id',
            'created_dt',
        )


class OrderSerializer(ModelSerializer):
    class Meta:
        model = Order
        fields = (
            'id',
            'order_sn',
            'status',
            'amount',
            'discount',
            'store',
            'b2b_id',
            'created_dt',
        )

    def create(self, validated_data):
        order = Order.objects.create(
            order_sn=validated_data.get("order_sn", None),
            status=validated_data.get("status", None),
            amount=validated_data.get("amount", None),
            discount=validated_data.get("discount", None),
            store=validated_data.get("store", None),
            b2b_id=validated_data.get("b2b_id", None),
            created_dt=validated_data.get("created_dt", None)
        )

        store = order.store
        if store.status == '0':
            store.status = '1'
        elif store.status == '1':
            store.status = '2'
        store.save()

        return validated_data

# class cellresetSerializer(ModelSerializer):
#     class Meta:
#         model = User
#         fields = ('username',)

class cellresetSerializer(Serializer):
    class Meta:
        model = User
        fields = ('username',)