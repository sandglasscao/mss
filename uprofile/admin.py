from django.contrib import admin

# Register your models here.
from .models import (
    Profile,
    Store)


# Register your models here.
class ProfileAdmin(admin.ModelAdmin):
    readonly_fields = ('created_dt',)
    list_display = (
        'full_name',
        'cellphone',
        'isEmployee',
        'hasRecommAuth',
        'parent_agent',
        'grand_agent',
        'isDeleted',
        'created_dt')
    search_fields = (
        'full_name',
        'cellphone',
        'isEmployee',
        'hasRecommAuth',
        'isDeleted',
    )


class StoreAdmin(admin.ModelAdmin):
    readonly_fields = ('created_dt',)
    list_display = (
        'name',
        'latitude',
        'longitude',
        'owner',
        'cellphone',
        'agent',
        'status',
        'license',
        'created_dt',
    )
    search_fields = (
        'name',
        'owner',
        'cellphone',
        'agent',
        'status',
        'license',
    )

admin.site.register(Profile, ProfileAdmin)
admin.site.register(Store, StoreAdmin)
