from django.db import models


# Create your models here.
class AddressCode(models.Model):
    class Meta:
        ordering = ['superCode', 'code']

    code = models.CharField(max_length=15)
    description = models.CharField(max_length=100)
    superCode = models.CharField(max_length=15)

    def __str__(self):
        return '%s - %s' % (self.code, self.description)


# meta enumerations only created/modified by the system administrator
class Enumeration(models.Model):
    class Meta:
        unique_together = (('type', 'code'))
        ordering = ['type', 'code']

    type = models.CharField(max_length=4)
    code = models.CharField(max_length=3)
    value = models.CharField(max_length=50)

    def __str__(self):
        return '%s-%s-%s' % (self.type, self.code, self.value)
