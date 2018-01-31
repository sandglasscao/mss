# Create your models here.
from django.db import models


class StoreB2B(models.Model):
    ownerno = models.CharField(max_length=15)
    ownerPin = models.CharField(max_length=20)
    ownerName = models.CharField(max_length=50)
    cellphone = models.CharField(max_length=11)
    areaCode = models.CharField(max_length=10)
    areaName = models.CharField(max_length=20)
    levelCode = models.CharField(max_length=10)
    levelName = models.CharField(max_length=20)
    shopName = models.CharField(max_length=50)
    address = models.CharField(max_length=100)
    status = models.CharField(max_length=2)
    recomm_username = models.CharField(max_length=20)
    sales_username = models.CharField(max_length=20)
    sales_cell = models.CharField(max_length=11)
    created_dt = models.DateTimeField()


class AgentB2B(models.Model):
    username = models.CharField(max_length=20)
    full_name = models.CharField(max_length=50)
    cellphone = models.CharField(max_length=11)
    level_code = models.CharField(max_length=3)
    level_name = models.CharField(max_length=20)
    create_date = models.DateTimeField()


class OrderB2B(models.Model):
    orderno = models.CharField(max_length=20)
    ownerPin = models.CharField(max_length=20)
    order_status = models.CharField(max_length=3)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    origNo = models.CharField(max_length=20)
    origStatus = models.CharField(max_length=3)
    created_dt = models.DateTimeField()
