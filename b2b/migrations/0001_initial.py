# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-01-31 11:26
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AgentB2B',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=20)),
                ('full_name', models.CharField(max_length=50)),
                ('cellphone', models.CharField(max_length=11)),
                ('level_code', models.CharField(max_length=3)),
                ('level_name', models.CharField(max_length=20)),
                ('create_date', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='OrderB2B',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('orderno', models.CharField(max_length=20)),
                ('ownerPin', models.CharField(max_length=20)),
                ('order_status', models.CharField(max_length=3)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('origNo', models.CharField(max_length=20)),
                ('origStatus', models.CharField(max_length=3)),
                ('created_dt', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='StoreB2B',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ownerno', models.CharField(max_length=15)),
                ('ownerPin', models.CharField(max_length=20)),
                ('ownerName', models.CharField(max_length=50)),
                ('cellphone', models.CharField(max_length=11)),
                ('areaCode', models.CharField(max_length=10)),
                ('areaName', models.CharField(max_length=20)),
                ('levelCode', models.CharField(max_length=10)),
                ('levelName', models.CharField(max_length=20)),
                ('shopName', models.CharField(max_length=50)),
                ('address', models.CharField(max_length=100)),
                ('status', models.CharField(max_length=2)),
                ('recomm_username', models.CharField(max_length=20)),
                ('sales_username', models.CharField(max_length=20)),
                ('sales_cell', models.CharField(max_length=11)),
                ('created_dt', models.DateTimeField()),
            ],
        ),
    ]
