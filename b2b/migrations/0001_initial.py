# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-03-28 09:30
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
            name='b2b_ordertable',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('createDate', models.DateField(verbose_name='创建日期')),
                ('organName', models.CharField(max_length=64, verbose_name='机构名称')),
                ('orderStoreName', models.CharField(max_length=64, verbose_name='订单归属门店名称')),
                ('orderNo1', models.CharField(max_length=32, verbose_name='单据编号1')),
                ('orderNo2', models.CharField(max_length=32, verbose_name='单据编号2')),
                ('orderNo3', models.CharField(max_length=32, verbose_name='单据编号3')),
                ('realPayAmount', models.DecimalField(decimal_places=5, max_digits=16, verbose_name='客户实际支付的金额')),
                ('amount', models.DecimalField(decimal_places=5, max_digits=22, verbose_name='数量')),
                ('memberPin', models.CharField(max_length=64, verbose_name='会员用户名')),
                ('regionName', models.CharField(default='', max_length=254, verbose_name='地区名称')),
                ('realName', models.CharField(max_length=32, verbose_name='用户姓名')),
            ],
            options={
                'db_table': 'b2b_ordertable',
            },
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
