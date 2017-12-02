from django.contrib import admin
from .models import *

# Register your models here.
class AddressCodeAdmin(admin.ModelAdmin):
    list_display = ('code', 'superCode', 'description')
    search_fields = ('code', 'superCode')

class EnumerationAdmin(admin.ModelAdmin):
    list_display = ('type', 'code', 'value')
    search_fields = ('type', 'code', 'value')


admin.site.register(AddressCode, AddressCodeAdmin)
admin.site.register(Enumeration, EnumerationAdmin)