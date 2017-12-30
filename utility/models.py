from django.db import models

# Create your models here.

class SMSCode(models.Model):
    phone_number = models.CharField(max_length=11)
    code = models.CharField(max_length=6)
    timestamp = models.DateTimeField(auto_now=True)

