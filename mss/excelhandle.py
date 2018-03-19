import xlrd

import time, json, os

from hz_BI.settings import MEDIA_ROOT


def handle_upload_file(file, filename):
    basepath = 'media/yoback/excelData/'  # 上传文件的保存路径，可以自己指定任意的路径
    today = time.localtime()
    year = str(today.tm_year)
    mon = str(today.tm_mon)
    # day = str(today.tm_mday)
    path = basepath+year+'/'+mon+'/'
    if not os.path.exists(path):
        try:
            os.makedirs(path)
        except:
            pass
    with open(path + filename, 'wb+') as destination:
        for chunk in file.chunks():
            destination.write(chunk)


class ExcelToJson(object):
    # def __init__(self, host="localhost", user="root", passwd="2531", db="hz_BI"):
    #     # 连接数据库
    #     database = pymysql.connect(host=host, user=user, passwd=passwd, db="hz_BI")
    #     cursor = database.cursor()
    def __init__(self, filename):
        self.datadictotal = {}
        # self.datalist = []
        self.filename = filename
        today = time.localtime()
        year = str(today.tm_year)
        mon = str(today.tm_mon)
        self.path = os.path.join(MEDIA_ROOT+'/yoback/excelData/' + year+'/'+mon, self.filename)

    def readExcel(self):
        # 获取excelData文件夹中上传了的excel文件
        try:
            excelFile = xlrd.open_workbook(self.path)

            for sheet in excelFile.sheets():
                datalist = []
                for i in range(sheet.nrows):
                    tmp_dic = {}
                    for j in range(sheet.ncols):
                        if sheet.cell(i, j).ctype==3:

                            dttime = xlrd.xldate_as_datetime(sheet.cell(i, j).value, 0)
                            if int(sheet.cell(i, j).value) > 0:

                                tmp_dic[sheet.cell(0, j).value] = dttime.strftime('%Y-%d-%m')
                            else:
                                tmp_dic[sheet.cell(0, j).value] = dttime.strftime('%H:%M:%S')
                        else:
                            tmp_dic[sheet.cell(0, j).value] = sheet.cell(i, j).value
                    datalist.append(tmp_dic)
                self.datadictotal[sheet.name] = datalist
            return self.datadictotal
        except:
            print('excel读取过程中有问题')

    def jsonhandle(self):
        if self.datadictotal:
            jsonstr = json.dumps(self.datadictotal)
            return jsonstr
        else:
            print('json化失败！！')
            return None

