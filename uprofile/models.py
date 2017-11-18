from django.db import models
from django.contrib.auth.models import User


User.profile = property(lambda u: Profile.objects.get_or_create(user=u)[0])

# common user profile data model
class Profile(models.Model):
    # extend default user model
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    # https://docs.djangoproject.com/en/1.9/ref/models/fields/
    usertype = models.IntegerField(default=1)  # 1,5,9
    cell = models.CharField(max_length=11, unique=True)
    email = models.EmailField(null=True)
    #district = models.ForeignKey('Address', null=True)  # default address
    first_name = models.CharField(max_length=50, null=True)
    last_name = models.CharField(max_length=50, null=True)  # nickname or shortname

    def save(self, *args, **kwargs):
        try:
            this = Profile.objects.get(id=self.id)
        except:
            pass
        super(Profile, self).save(*args, **kwargs)

    def __str__(self):
        return self.user.username
