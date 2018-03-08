from django.contrib import admin

# Register your models here.
from .models import (
    Profile,
    Store)


# Register your models here.
class ProfileAdmin(admin.ModelAdmin):
    readonly_fields = (
        'level_code',
        'level_name',
        'created_dt',
    )
    list_display = (
        'full_name',
        'status',
        'cellphone',
        'isEmployee',
        'hasRecommAuth',
        'parent_agent',
        'grand_agent',
        'isDeleted',
        'level_code',
        'level_name',
        'created_dt')
    search_fields = (
        'full_name',
        'cellphone',
        'isEmployee',
        'hasRecommAuth',
        'isDeleted',
        'level_code',
        'level_name',
    )


class StoreAdmin(admin.ModelAdmin):
    readonly_fields = ('created_dt',)
    list_display = (
        'ownerno',
        'ownerPin',
        'ownerName',
        'cellphone',
        'areaCode',
        'areaName',
        'levelCode',
        'levelName',
        'shopName',
        'address',
        'latitude',
        'longitude',
        'recomm',
        'sales',
        'status',
        'license',
        'created_dt',
    )
    search_fields = (
        'ownerPin',
        'ownerName',
        'cellphone',
        'areaCode',
        'areaName',
        'levelCode',
        'levelName',
        'shopName',
        'levelCode',
        'recomm',
        'sales',
        'status',
        'license',
    )


admin.site.register(Profile, ProfileAdmin)
admin.site.register(Store, StoreAdmin)
