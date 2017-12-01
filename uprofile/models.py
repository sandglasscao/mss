from django.contrib.auth.models import User
from django.db import models

from meta.models import AddressCode


# User.profile = property(lambda u: Profile.objects.get_or_create(user=u)[0])


class Profile(models.Model):
    # https://docs.djangoproject.com/en/1.9/ref/models/fields/

    # extend default user model
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    cellphone = models.CharField(max_length=11, unique=True, null=True)
    full_name = models.CharField(max_length=50, null=True)
    isEmployee = models.BooleanField(default=False)
    hasRecommAuth = models.BooleanField(default=False)
    address = models.ForeignKey('Address', null=True, blank=True)
    parent_agent = models.ForeignKey(User, related_name='parent_agent', null=True, blank=True)
    grand_agent = models.ForeignKey(User, related_name='grand_agent', null=True, blank=True)
    created_dt = models.DateTimeField(auto_now_add=True)


class Address(models.Model):
    province = models.ForeignKey(
        AddressCode,
        related_name='province', )
    city = models.ForeignKey(
        AddressCode,
        related_name='city', )
    district = models.ForeignKey(
        AddressCode,
        related_name='district', )
    owner = models.ForeignKey(User)


class Store(models.Model):
    name = models.CharField(max_length=50, null=True)
    address = models.CharField(max_length=100, null=True)
    latitude = models.DecimalField(max_digits=10, decimal_places=6, null=True)
    longitude = models.DecimalField(max_digits=10, decimal_places=6, null=True)
    owner = models.CharField(max_length=50, null=True)
    cellphone = models.CharField(max_length=11, null=True)
    agent = models.ForeignKey(User)
    status = models.CharField(max_length=2,
                              choices=(
                                  ('-2', '审核未通过'),
                                  ('-1', '待审核'),
                                  ('0', '已注册'),
                                  ('1', '已下单'),
                                  ('2', '有效'),
                              ),
                              default='-1'
                              )
    license = models.CharField(max_length=20, null=True)
    license_pic = models.FileField(upload_to='store/%Y/%m/%d', null=True)
    indoor_pic = models.FileField(upload_to='store/%Y/%m/%d', null=True)
    outdoor_pic = models.FileField(upload_to='store/%Y/%m/%d', null=True)
    b2b_id = models.IntegerField(null=True)
    created_dt = models.DateTimeField(null=True)
