from django.db import models
from django.contrib.auth.models import User


User.profile = property(lambda u: Profile.objects.get_or_create(user=u)[0])

class Profile(models.Model):
    # extend default user model
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    # https://docs.djangoproject.com/en/1.9/ref/models/fields/
    isStaff = models.BooleanField(default=False)
    cellphone = models.CharField(max_length=11, unique=True)
    #district = models.ForeignKey('Address', null=True)  # default address
    full_name = models.CharField(max_length=50, null=True)
    rank = models.IntegerField(default=0)
