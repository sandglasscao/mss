import json
import uuid
import random
from datetime import datetime, timedelta

from aliyunsdkdysmsapi.request.v20170525 import SendSmsRequest, QuerySendDetailsRequest
from aliyunsdkcore.client import AcsClient
from django.http import HttpResponse

from django.contrib.auth.models import User
from rest_framework.response import Response

from b2b.models import StoreB2B, AgentB2B, OrderB2B
from uprofile.models import Profile, Store, Order
from uprofile.serializers import StoreSerializer, OrderSerializer
from utility.models import SMSCode


class SyncRecord(object):
    @classmethod
    def sync_records_from_b2b(cls):
        cls.sync_agents()
        cls.sync_stores()
        cls.sync_orders()

    @classmethod
    def sync_agents(cls):
        agentb2bs = AgentB2B.objects.all()
        for agent in agentb2bs:
            try:
                Profile.objects.get(cellphone=agent.cellphone)
            except Profile.DoesNotExist:
                cls.__create_agent__(agent)

    @classmethod
    def sync_stores(cls):
        try:
            last = Store.objects.latest('created_dt')
            latest_sync_time = last.created_dt
        except Store.DoesNotExist:
            latest_sync_time = datetime.now() + timedelta(days=-200)

        storeb2bs = StoreB2B.objects.filter(created_dt__gt=latest_sync_time)
        stores = []
        for storeb2b in storeb2bs:
            store = {}

            store['ownerno'] = storeb2b.ownerno or None
            store['ownerPin'] = storeb2b.ownerPin or None
            store['ownerName'] = storeb2b.ownerName or None
            store['cellphone'] = storeb2b.cellphone or None
            store['areaCode'] = storeb2b.areaCode or None
            store['areaName'] = storeb2b.areaName or None
            store['levelCode'] = storeb2b.levelCode or None
            store['levelName'] = storeb2b.levelName or None
            store['shopName'] = storeb2b.shopName or None
            store['address'] = storeb2b.address or None
            store['status'] = storeb2b.status
            store['created_dt'] = storeb2b.created_dt
            cls.__recomm_sales__(storeb2b.recomm_username, storeb2b.sales_username,
                                 storeb2b.sales_cell, store
                                 )

            stores.append(store)

        serializer = StoreSerializer(data=stores, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    @classmethod
    def __recomm_sales__(cls, recomm_username, sales_username, cell, store):
        recomm_name = recomm_username.strip() if recomm_username else sales_username.strip()
        sales_name = sales_username.strip() if sales_username else recomm_name

        # find user id for agent. If there is no account for this agent, it will be generated.
        try:
            usr = User.objects.get(username=recomm_name)
        except User.DoesNotExist:
            agentb2b = AgentB2B.objects.get(username=recomm_name)
            cls.__create_agent__(agentb2b)
            usr = User.objects.get(username=recomm_name)
        store['recomm'] = usr.id
        store['sales'] = usr.id if sales_name == recomm_name else Profile.objects.get(cellphone=cell).user.id

    @classmethod
    def __create_agent__(cls, agentb2b):
        user = User.objects.create(username=agentb2b.username)
        user.set_password(agentb2b.cellphone)
        user.save()

        Profile.objects.create(
            user=user,
            cellphone=agentb2b.cellphone,
            full_name=agentb2b.full_name,
            isEmployee=True,
            hasRecommAuth=True,
            level_code=agentb2b.level_code,
            level_name=agentb2b.level_name,
            created_dt=agentb2b.create_date,
        )

    @classmethod
    def sync_orders(cls):
        try:
            last = Order.objects.latest('created_dt')
            latest_sync_time = last.created_dt
        except Order.DoesNotExist:
            latest_sync_time = datetime.now() + timedelta(days=-200)

        orderb2bs = OrderB2B.objects.filter(created_dt__gt=latest_sync_time)
        orders = []
        for orderb2b in orderb2bs:
            if orderb2b.ownerPin:
                order = {}
                order['orderno'] = orderb2b.orderno
                order['status'] = orderb2b.order_status
                order['amount'] = orderb2b.amount
                order['origNo'] = orderb2b.origNo
                order['origStatus'] = orderb2b.origStatus
                order['created_dt'] = orderb2b.created_dt

                # find store id for order.
                try:
                    store = Store.objects.get(ownerPin=orderb2b.ownerPin)
                    order['store'] = store.id
                    orders.append(order)
                except Store.DoesNotExist:
                    pass

        serializer = OrderSerializer(data=orders, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class SMSClient(object):
    REGION = "cn-hangzhou"  # 暂时不支持多region
    ACCESS_KEY_ID = "LTAIYgwU4bAOm6gs"
    ACCESS_KEY_SECRET = "b02Nu9tXhdNZjAYBn61QYnZRonIIFL"
    SIGN_NAME = "禾中优供"
    TEMPLATE_CODE = "SMS_109745433"
    PRODUCT = "禾中产品销售有限公司"
    ACS_CLIENT = AcsClient(ACCESS_KEY_ID, ACCESS_KEY_SECRET, REGION)

    @classmethod
    def send_sms(cls, request, phone_number):
        business_id = uuid.uuid1()
        code = str(random.random() * pow(10, 10))[0:6]
        template_param = {'code': code, 'product': cls.PRODUCT}
        template_param = json.dumps(template_param)

        smsRequest = SendSmsRequest.SendSmsRequest()

        # 申请的短信模板编码,必填
        smsRequest.set_TemplateCode(cls.TEMPLATE_CODE)

        # 短信模板变量参数,友情提示:如果JSON中需要带换行符,请参照标准的JSON协议对换行符的要求,比如短信内容中包含
        # 的情况在JSON中需要表示成,否则会导致JSON在服务端解析失败
        if template_param is not None:
            smsRequest.set_TemplateParam(template_param)

        # 设置业务请求流水号，必填。
        smsRequest.set_OutId(business_id)

        # 短信签名
        smsRequest.set_SignName(cls.SIGN_NAME)

        # 短信发送的号码，必填。支持以逗号分隔的形式进行批量调用，批量上限为1000个手机号码,批量调用相对于单条调用及时性稍有延迟,
        # 验证码类型的短信推荐使用单条调用的方式
        smsRequest.set_PhoneNumbers(phone_number)

        # 发送请求
        smsResponse = cls.ACS_CLIENT.do_action_with_exception(smsRequest)
        resp = json.loads(smsResponse)
        if 'OK' == resp.get('Code'):
            SMSCode.objects.update_or_create(phone_number=phone_number, code=code)
        return HttpResponse(json.dumps(resp))

    @classmethod
    def query_send_detail(cls, request, biz_id, phone_number):
        queryRequest = QuerySendDetailsRequest.QuerySendDetailsRequest()

        # 查询的手机号码
        queryRequest.set_PhoneNumber(phone_number)

        # 可选 - 流水号
        queryRequest.set_BizId(biz_id)

        # 必填 - 发送日期 支持30天内记录查询，格式yyyyMMdd
        send_date = datetime.strftime(datetime.today(), '%Y%m%d')
        queryRequest.set_SendDate(send_date)

        # 必填-当前页码从1开始计数
        queryRequest.set_CurrentPage(1)

        # 必填-页大小
        queryRequest.set_PageSize(10)

        queryResponse = cls.ACS_CLIENT.do_action_with_exception(queryRequest)
        resp = json.loads(queryResponse)
        return HttpResponse(json.dumps(resp))

    @classmethod
    def verify_code(cls, request):
        phone_number = request.GET.get('phone_number')
        code = request.GET.get('code')
        resp = {}
        try:
            SMSCode.objects.get(phone_number=phone_number, code=code)
            resp['Code'] = 'OK'
        except SMSCode.DoesNotExist:
            resp['Code'] = 'ErrCode'
        return HttpResponse(json.dumps(resp))
