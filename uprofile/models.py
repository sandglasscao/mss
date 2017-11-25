from django.contrib.auth.models import User
from django.db import models

from meta.models import AddressCode

User.profile = property(lambda u: Profile.objects.get_or_create(user=u)[0])


class Profile(models.Model):
    # https://docs.djangoproject.com/en/1.9/ref/models/fields/

    # extend default user model
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    cellphone = models.CharField(max_length=11, unique=True)
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
