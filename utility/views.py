import datetime

from registration.forms import User

from b2b.models import StoreB2B, AgentB2B
from uprofile.models import Profile
from uprofile.serializers import StoreSerializer, RegisterSerializer


class SyncRecord(object):
    latest_store_id = 0

    @classmethod
    def initSystem(cls):
        cls.__init_agents__()

    @classmethod
    def __sync_stores_from_b2b__(cls):
        storeb2bs = StoreB2B.objects.filter(id__gt=cls.latest_store_id)
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
                    pass

        serializer = StoreSerializer(data=stores, many=True)
        if serializer.is_valid():
            serializer.save()
            cls.latest_store_id = storeb2bs.latest().id

    @classmethod
    def __init_agents__(cls):
        agentb2bs = AgentB2B.objects.all()
        for agent2 in agentb2bs:
            try:
                agent = User.objects.get(username=agent2.num)
            except User.DoesNotExist:
                # create agent
                user = User.objects.create(username=agent2.num)
                user.set_password(agent2.cellphone)
                user.save()

                cellphone = agent2.cellphone or None
                full_name = agent2.full_name or None
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
