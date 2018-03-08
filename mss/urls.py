"""mss URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import include, url
from django.contrib import admin

from rest_framework_jwt.views import obtain_jwt_token

from .views import home
from utility.views import SMSClient

from apscheduler.schedulers.background import BackgroundScheduler
from utility.views import SyncRecord

urlpatterns = [
    url(r'^$', home, name='home'),
    url(r'^sms/send/(?P<phone_number>\d{11})$', SMSClient.send_sms, name='sendsms'),
    url(r'^sms/verify/$', SMSClient.verify_code, name='verifysms'),
    url(r'^api/users/', include('uprofile.urls')),
    url(r'^api/console/', include('console.urls')),
    url(r'^api/meta/', include('meta.urls')),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    # url(r'^api-token-auth/', views.obtain_auth_token),
    url(r'^login/', obtain_jwt_token),
    url(r'^admin/', admin.site.urls),

]

sched = BackgroundScheduler(daemonic=False)
sched.start()

sched.add_job(SyncRecord.sync_records_from_b2b, 'interval', seconds=3600)

