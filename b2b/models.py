# Create your models here.
from django.db import models

class StoreB2B(models.Model):
    owner = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    cellphone = models.CharField(max_length=11)
    address = models.CharField(max_length=100)
    status = models.CharField(max_length=2)
    agent_id = models.IntegerField()
    agent_num = models.CharField(max_length=11)
    created_dt = models.DateTimeField()

class AgentB2B(models.Model):
    num = models.CharField(max_length=11)
    full_name = models.CharField(max_length=50)
    cellphone = models.CharField(max_length=11)


class OrderB2B(models.Model):
    order_sn = models.CharField(max_length=20)
    store_id = models.IntegerField()
    order_status = models.CharField(max_length=3)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.DecimalField(max_digits=10, decimal_places=2)
    created_dt = models.DateTimeField()
