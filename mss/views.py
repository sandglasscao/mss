from django.db.models import Count, Sum
from django.http import HttpResponse
from django.shortcuts import render
from b2b.models import b2b_ordertable
import json


def home(request):
    context = {}
    return render(request, 'index.html', context)

def score(request, year, month):
    '''
        业务员数据API  hzyg备份数据库  和 excel读取汇总
    '''
    queryset = b2b_ordertable.objects.using('b2b').filter(createDate__year=year,createDate__month=month)
    mysqldata = queryset.values('realName').annotate(c=Count('amount'),s=Sum('amount')).values_list('realName','c','s').order_by('-s')
    datalist = []
    for data in mysqldata:
        tmp_dic = {}
        tmp_dic[data[0]] = {'count': data[1], 'sum': str(data[2])}
        datalist.append(tmp_dic)

    return HttpResponse(json.dumps(datalist), content_type='application/json')
