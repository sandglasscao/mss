import datetime

from django.contrib.auth.models import User
from rest_framework.response import Response

from b2b.models import StoreB2B, AgentB2B, OrderB2B
from uprofile.models import Profile, Store, Order
from uprofile.serializers import StoreSerializer, RegisterSerializer, OrderSerializer


class SyncRecord(object):
    @classmethod
    def sync_records_from_b2b(cls):
        flag = True
        try:
            cls.sync_agents()
            cls.sync_stores()
            cls.sync_orders()
        except:
            flag = False
        return flag

    @classmethod
    def sync_agents(cls):
        agentb2bs = AgentB2B.objects.all()
        for agent2 in agentb2bs:
            try:
                User.objects.get(username=agent2.num)
            except User.DoesNotExist:
                cls.__create_agent__(agent2)

    @classmethod
    def sync_stores(cls):
        try:
            last = Store.objects.latest('b2b_id')
            latest_store_id = last.b2b_id
        except Store.DoesNotExist:
            latest_store_id = 0

        storeb2bs = StoreB2B.objects.filter(id__gt=latest_store_id)
        stores = []
        for storeb2b in storeb2bs:
            if (storeb2b.agent_id):
                store = {}

                store['name'] = storeb2b.name or None
                store['address'] = storeb2b.address or None
                store['owner'] = storeb2b.owner or None
                store['cellphone'] = storeb2b.cellphone or None
                store['status'] = storeb2b.status or '-1'
                store['b2b_id'] = storeb2b.id or None
                store['created_dt'] = storeb2b.created_dt or datetime.datetime.now()
                agent_num = storeb2b.agent_num.strip()

                # find user id for agent. If there is no account for this agent, it will be generated.
                try:
                    usr = User.objects.get(username=agent_num)
                except User.DoesNotExist:
                    agentb2b = AgentB2B.objects.get(id=storeb2b.agent_id)
                    cls.__create_agent__(agentb2b)
                    usr = User.objects.get(username=agent_num)

                store['agent'] = usr.id
                stores.append(store)

        serializer = StoreSerializer(data=stores, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    @classmethod
    def __create_agent__(cls, agentb2b):
        user = User.objects.create(username=agentb2b.num)
        user.set_password(agentb2b.cellphone)
        user.save()

        cellphone = agentb2b.cellphone or None
        full_name = agentb2b.full_name or None
        profile = Profile.objects.create(
            user=user,
            cellphone=cellphone,
            full_name=full_name,
            isEmployee=True,
            hasRecommAuth=True,
        )

        serializer = RegisterSerializer(data=profile)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    @classmethod
    def sync_orders(cls):
        try:
            last = Order.objects.latest('b2b_id')
            latest_order_id = last.b2b_id
        except Order.DoesNotExist:
            latest_order_id = 0

        orderb2bs = OrderB2B.objects.filter(id__gt=latest_order_id)
        orders = []
        for orderb2b in orderb2bs:
            if orderb2b.store_id:
                order = {}
                order['order_sn'] = orderb2b.order_sn
                order['status'] = orderb2b.order_status
                order['amount'] = orderb2b.amount
                order['discount'] = orderb2b.discount
                order['b2b_id'] = orderb2b.id
                order['created_dt'] = orderb2b.created_dt

                # find store id for order.
                try:
                    store = Store.objects.get(b2b_id=orderb2b.store_id)
                    order['store'] = store.id
                    orders.append(order)
                except Store.DoesNotExist:
                    pass

        serializer = OrderSerializer(data=orders, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
