from django.db.models import Count, Sum
from django.http import HttpResponse
from django.shortcuts import render
from b2b.models import b2b_ordertable
import json
import operator

from investment.models import sale_upload


def home(request):
    context = {}
    return render(request, 'index.html', context)

def score(request, year, month):
    '''
        业务员数据API  hzyg备份数据库  和 excel读取汇总
    '''
    queryset = b2b_ordertable.objects.using('b2b').filter(createDate__year=year,createDate__month=month)
    queryset_investment = sale_upload.objects.using('investment').filter(createdate__year=year, createdate__month=month)
    mysqldata = queryset.values('realName').annotate(c=Count('amount'),s=Sum('amount')).values_list('realName','c','s').order_by('-s')
    mysqldata_investment = queryset_investment.values('salesname').annotate(c=Count('amount'), s=Sum('amount')).values_list('salesname','c', 's')
    datalist = []
    # datalist_investment = []


    for data in mysqldata:
        datalist.append({'name': data[0],'count': data[1], 'sum': data[2]})

    for dt in mysqldata_investment:
        # print(data)
        tmp_dic = {'name': dt[0],'count': dt[1], 'sum': dt[2]}
        datalist.append(tmp_dic)

    keyforname = []
    dataend = []
    try:
        for datanum in range(len(datalist)):

            if str(datalist[datanum]['name']) not in keyforname:
                keyforname.append(datalist[datanum]['name'])
                dataend.append(datalist[datanum])

            else:
                for index in range(len(datalist)):
                    if index < datanum and datalist[index]['name'] == datalist[datanum]['name']:
                        dataend[index]['count'] = datalist[index]['count']+datalist[datanum]['count']
                        dataend[index]['sum'] = datalist[index]['sum']+datalist[datanum]['sum']
                        break
        dataend_sort = sorted(dataend, key=operator.itemgetter('sum'), reverse=True)


        for x in datalist:
            x['sum'] = str(x['sum'])

        return HttpResponse(json.dumps(dataend_sort), content_type='application/json')
    except:
        HttpResponse(json.dumps({'result': 'faild lianxiguanliyuan'}), content_type='application/json')




#
# def score(request, year, month):
#     '''
#         业务员数据API  hzyg备份数据库  和 excel读取汇总
#     '''
#     queryset = b2b_ordertable.objects.using('b2b').filter(createDate__year=year,createDate__month=month)
#     queryset_investment = sale_upload.objects.using('investment').filter(createdate__year=year,createdate__month=month)
#
#     mysqldata = [queryset.values('realName').annotate(c=Count('amount'),s=Sum('amount')).values_list('realName','c','s')]
#     mysqldata_investment = [queryset_investment.values('salesname').annotate(c=Count('amount'),s=Sum('amount')).values_list('salesname','c','s')]
#
#
#     datalist = []
#     dtkeys = []
#     for dt in mysqldata:
#         dtkeys.append(dt[0])
#
#     chonghe = []
#     for i in range(len(mysqldata_investment)):
#         dt_invest = mysqldata_investment.pop(0)
#         if dt_invest[0] not in dtkeys:
#             tmp_dic = {}
#             tmp_dic[dt_invest[0]] = {'count': dt_invest[1], 'sum': str(dt_invest[2])}
#             datalist.append(tmp_dic)
#             i = 0
#         else:
#             chonghe.append(dt_invest)
#             i = 0
#
#     xkeys = []
#     for x in chonghe:
#         xkeys.append(x[0])
#
#     chonghe1 = []
#     for j in range(len(mysqldata)):
#         tmp_dic = {}
#         dt = mysqldata_investment.pop(0)
#         if dt[0] not in xkeys:
#
#             tmp_dic[dt[0]] = {'count': dt[1], 'sum': str(dt[2])}
#             datalist.append(tmp_dic)
#             j=0
#
#         else:
#             chonghe.append(dt)
#             j = 0
#
#     for chh in chonghe:
#         for chh1 in chonghe1:
#             if chh[0] == chh1[0]:
#                 tmp_dic = {}
#                 tmp_dic[chh[0]] = {'count': chh[1] + chh1[1], 'sum': str(chh[2] + chh1[2])}
#
#     return HttpResponse(json.dumps(datalist), content_type='application/json')

