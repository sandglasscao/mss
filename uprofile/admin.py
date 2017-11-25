from django.contrib import admin

# Register your models here.
from .models import (
    Profile,
)


# Register your models here.
class ProfileAdmin(admin.ModelAdmin):
    readonly_fields = ('created_dt',)
    list_display = ('full_name', 'cellphone', 'isEmployee', 'hasRecommAuth', 'created_dt')
    search_fields = ('cellphone', 'full_name', 'created_dt', 'hasRecommAuth')


admin.site.register(Profile, ProfileAdmin)
