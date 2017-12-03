from django.db import models


class Commission(models.Model):
    base = models.IntegerField(default=100)
    parent_percent = models.IntegerField()
    grand_percent = models.IntegerField()
    modified_dt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '%s' % self.base