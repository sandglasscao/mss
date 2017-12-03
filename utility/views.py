import datetime

from registration.forms import User

from b2b.models import StoreB2B, AgentB2B
from uprofile.models import Profile, Store
from uprofile.serializers import StoreSerializer, RegisterSerializer


class SyncRecord(object):

    @classmethod
    def initSystem(cls):
        cls.__init_agents__()
        cls.sync_stores_from_b2b()

    @classmethod
    def sync_stores_from_b2b(cls):
        flag = False
        try:
            last = Store.objects.latest('id')
            latest_store_id = last.id
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

                try:
                    usr = User.objects.get(username=agent_num)
                    store['agent'] = usr.id
                    stores.append(store)
                except User.DoesNotExist:
                    agentb2b = AgentB2B.objects.get(id=storeb2b.agent_id)
                    cls.create_agent(agentb2b)
                    usr = User.objects.get(username=agent_num)
                store['agent'] = usr.id

                stores.append(store)

        serializer = StoreSerializer(data=stores, many=True)
        if serializer.is_valid():
            serializer.save()
            flag = True
        return flag

    @classmethod
    def __init_agents__(cls):
        agentb2bs = AgentB2B.objects.all()
        for agent2 in agentb2bs:
            try:
                User.objects.get(username=agent2.num)
            except User.DoesNotExist:
                # create agent
                cls.create_agent(agent2)

    @classmethod
    def create_agent(cls, agentb2b):
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