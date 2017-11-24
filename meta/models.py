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
