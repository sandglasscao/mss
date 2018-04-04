import json
import os

from django.contrib.auth.models import User
from django.http import HttpResponse
from rest_framework.fields import (
    DateTimeField,
    BooleanField, CharField, IntegerField, DecimalField)
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
        model = User
        fields = ('pk', 'username', 'is_staff', 'password',)
        read_only_fields = ('pk', 'username', 'is_staff',)

    def update(self, instance, validated_data):
        instance.set_password(validated_data.get('password', instance.password))
        instance.save()
        return instance


class ProfileSerializer(ModelSerializer):
    user = UserSerializer(required=False)
    isEmployee = BooleanField(required=False)
    status = BooleanField(required=True)
    hasRecommAuth = BooleanField(required=False)
    address = AddressSerializer(required=False)
    parent_agent = UserSerializer(required=False)
    grand_agent = UserSerializer(required=False)
    isDeleted = BooleanField(required=False)
    level_code = CharField(required=False)
    level_name = CharField(required=False)
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
            'status',
            'address',
            'parent_agent',
            'grand_agent',
            'isDeleted',
            'level_code',
            'level_name',
            'created_dt',
        )

        read_only_fields = (
            'user',
            'level_code',
            'level_name',
            'created_dt')

    def update(self, instance, validated_data):
        instance.full_name = validated_data.get('full_name', instance.full_name)
        instance.cellphone = validated_data.get('cellphone', instance.cellphone)
        instance.isEmployee = validated_data.get('isEmployee', instance.isEmployee)
        instance.status = validated_data.get('status', instance.status)
        instance.address = validated_data.get('address', instance.address)
        instance.hasRecommAuth = validated_data.get('hasRecommAuth', instance.hasRecommAuth)
        instance.parent_agent = validated_data.get('parent_agent', instance.parent_agent)
        if instance.parent_agent is not None:
            instance.grand_agent = validated_data.get('grand_agent', instance.parent_agent.parent_agent)
        instance.isDeleted = validated_data.get('isDeleted', instance.isDeleted)

        # update user
        usr = instance.user
        usr.username = validated_data.get('username', usr.username)
        password = validated_data.get('password')
        if password:
            usr.set_password(password)
        usr.save()

        instance.save()
        return instance

    def create(self, validated_data):
        cellphone = validated_data.get('cellphone')
        username = self.initial_data.get('username')
        password = self.initial_data.get('password', cellphone)
        user = User.objects.create(username=username)
        user.set_password(password)
        user.save()

        full_name = validated_data.get('full_name')
        isEmployee = validated_data.get('isEmployee', False)
        hasRecommAuth = validated_data.get('hasRecommAuth', False)

        Profile.objects.create(
            user=user,
            cellphone=cellphone,
            full_name=full_name,
            isEmployee=isEmployee,
            hasRecommAuth=hasRecommAuth,
        )
        validated_data['username'] = user.username
        return validated_data


# class RegisterSerializer(Serializer):
#     username = CharField(max_length=20, required=False)
#     token = CharField(allow_blank=True, read_only=True)
#     password = CharField(max_length=15)
#     cellphone = CharField(max_length=11)
#     full_name = CharField(max_length=50, required=False)
#     parent_code = CharField(max_length=20)
#
#     def create(self, validated_data):
#         cellphone = validated_data["cellphone"]
#         username = cellphone
#         user = User.objects.create(username=username)
#         user.set_password(validated_data['password'])
#         user.save()
#
#         full_name = validated_data.get("full_name", None)
#         parent_code = validated_data.get("parent_code", None)
#         try:
#             parent = User.objects.get(username=parent_code)
#             grand_agent = parent.profile.parent_agent
#         except User.DoesNotExist:
#             parent = None
#             grand_agent = None
#
#         Profile.objects.create(
#             user=user,
#             cellphone=cellphone,
#             full_name=full_name,
#             parent_agent=parent,
#             grand_agent=grand_agent
#         )
#
#         jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
#         jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
#
#         payload = jwt_payload_handler(user)
#         validated_data["token"] = jwt_encode_handler(payload)
#         validated_data['username'] = user.username
#         return validated_data


class RegisterSerializer(Serializer):
    username = CharField(max_length=20, required=False)
    token = CharField(allow_blank=True, read_only=True)
    password = CharField(max_length=15)
    cellphone = CharField(max_length=11)
    full_name = CharField(max_length=50, required=False)
    parent_cellphone = CharField(max_length=20)

    def create(self, validated_data):
        try:
            cellphone = validated_data["cellphone"]
            username = cellphone
            # user = User.objects.create(username=username)
            user = User.objects.get(username=username)
            full_name = validated_data.get("full_name", None)

            reccellphone = validated_data.get('parent_cellphone', None)

            if reccellphone:
                try:
                    parent = Profile.objects.get(cellphone=reccellphone).user

                    # return HttpResponse(json.dumps({'cellinfo': 'OK'}), content_type='application/json')
                    try:
                        grand_agent = parent.profile.parent_agent
                    except:
                        grand_agent = None


                except:
                    parent = None
                    grand_agent = None
            # try:
            #     parent_code = Profile.objects.get(cellphone=validated_data.get("parent_cellphone", None))
            #     parent = parent_code.user
            #     grand_agent = parent.profile.parent_agent
            # except User.DoesNotExist:
            #     parent = None
            #     grand_agent = None

            Profile.objects.create(
                user=user,
                cellphone=cellphone,
                full_name=full_name,
                parent_agent=parent,
                grand_agent=grand_agent
            )

            jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
            jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

            payload = jwt_payload_handler(user)
            validated_data["token"] = jwt_encode_handler(payload)
            validated_data['username'] = user.username
            # print(validated_data)
            # print(type(validated_data))
            return validated_data
        except:
            return HttpResponse(json.dumps({'result': 'faild'}), content_type='application/json')



class StoreSerializer(ModelSerializer):
    class Meta:
        model = Store
        fields = (
            'id',
            'ownerno',
            'ownerPin',
            'ownerName',
            'cellphone',
            'areaCode',
            'areaName',
            'levelCode',
            'levelName',
            'shopName',
            'address',
            'latitude',
            'longitude',
            'recomm',
            'sales',
            'status',
            'license',
            'license_pic',
            'indoor_pic',
            'outdoor_pic',
            'created_dt',
        )

    def update(self, instance, validated_data):
        oldFile = instance.license_pic
        if validated_data.get('license_pic') and oldFile:
            os.remove(oldFile.path)
        oldFile = instance.indoor_pic
        if validated_data.get('indoor_pic') and oldFile:
            os.remove(oldFile.path)
        oldFile = instance.outdoor_pic
        if validated_data.get('outdoor_pic') and oldFile:
            os.remove(oldFile.path)

        return super(StoreSerializer, self).update(instance, validated_data)


class OrderSerializer(ModelSerializer):
    class Meta:
        model = Order
        fields = (
            'id',
            'orderno',
            'status',
            'amount',
            'store',
            'origNo',
            'origStatus',
            'created_dt',
        )

    def create(self, validated_data):
        order = Order.objects.create(
            orderno=validated_data.get("orderno", None),
            status=validated_data.get("status", None),
            amount=validated_data.get("amount", None),
            store=validated_data.get("store", None),
            origNo=validated_data.get("origNo", None),
            origStatus=validated_data.get("origStatus", None),
            created_dt=validated_data.get("created_dt", None)
        )

        store = Store.objects.get(id=order.store.id)
        if -1 == order.orderno.find('TBRT'):
            if store.status == '0':
                store.status = '1'
            elif store.status == '1':
                store.status = '2'
            store.save()
        else:
            try:
                orgi_order = Order.objects.get(orderno=order.origNo)
                if 0 == (orgi_order.amount + order.amount):
                    if store.status == '1':
                        store.status = '0'
                    elif store.status == '2':
                        store.status = '1'
                    store.save()
            except Order.DoesNotExist:
                pass

        return validated_data


class DashHomeSerializer(Serializer):
    store_cnt = IntegerField(read_only=False)
    ordered_cnt = IntegerField(read_only=False)
    myteam_cnt = IntegerField(read_only=False)
    commission = DecimalField(max_digits=10, decimal_places=2, read_only=False)


class TeamListSerializer(Serializer):
    agent = CharField(read_only=False)
    double_cnt = IntegerField(read_only=False)
    subdouble_cnt = IntegerField(read_only=False)
    ordered_cnt = IntegerField(read_only=False)
    pending_cnt = IntegerField(read_only=False)


class CheckCellSerializer(Serializer):
    username = CharField(max_length=11, required=True)
    token = CharField(max_length=200, required=True)

