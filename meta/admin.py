from django.contrib import admin
from .models import *

# Register your models here.
class AddressCodeAdmin(admin.ModelAdmin):
    list_display = ('code', 'superCode', 'description')
    search_fields = ('code', 'superCode')


admin.site.register(AddressCode, AddressCodeAdmin)