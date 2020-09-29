# -*- coding: utf-8 -*-
"""
@Projcet :  hottrade
@File : db
@Descriptioin :  https://www.runoob.com/django/django-model.html
@DateTime : 2020/9/27 17:13
@Author : fangqing.fan#hotmail.com
"""
import time

from django.http import HttpResponse, JsonResponse

from hottrade.models import Test,Country,History
import requests, json
from . import mail

# 数据库操作 插入
from .settings import *



def db_sync():
    url = API_URL

    r = requests.get(url)
    json_ = json.loads(r.text)

    test1 = History(result=json_.get('result'),
                    documentation=json_.get('documentation'),
                    terms_of_use=json_.get('terms_of_use'),
                    time_last_update_unix=json_.get('time_last_update_unix'),
                    time_last_update_utc=json_.get('time_last_update_utc'),
                    time_next_update_unix=json_.get('time_next_update_unix'),
                    time_next_update_utc=json_.get('time_next_update_utc'),
                    base_code=json_.get('base_code'),
                    conversion_rates=json_.get('conversion_rates'))
    test1.save()

    if json_.get('result') == 'success':
        countrys = json_.get('conversion_rates')
        list_ = Country.objects.filter(delete=False)
        for l in list_:
            val_ = countrys.get(l.name)
            if float(l.value) < float(val_):
                l.trend = 1
            elif float(l.value) > float(val_):
                l.trend = -1
            else:
                l.trend = 0
            l.value = val_
            l.save()
    else:
        #邮件通知
        mail.send_email(url)
    return HttpResponse("<p>数据添加成功！</p>")

def db_all(request):
    print(EMAIL_HOST)

    res = History.objects.filter(result='success').order_by('-id')
    en = res[0]

    #时间戳转日期时间
    timestamp = en.time_last_update_unix
    # 转换成localtime
    time_local = time.localtime(timestamp)
    # 转换成新的时间格式(2016-05-05 20:28:54)
    dt = time.strftime("%Y-%m-%d %H:%M:%S", time_local)
    print(dt)

    list_ = Country.objects.filter(delete=False).values()
    ls = list(list_)
    #print(ls)
    for i in range(0,len(ls)):
        #print(ls[i])
        #print(ls[i]['name'])
        if ls[i]['name'] == 'USD':
            ls[i]['base'] = True
        else:
            ls[i]['base'] = False
        if ls[i]['name'] == 'CNY' or ls[i]['name'] == 'HKD' or ls[i]['name'] == 'EUR':
            ls[i]['favorite'] = True
        else:
            ls[i]['favorite'] = False
        ls[i]['display'] = float(ls[i]['value'])
        ls[i].pop('id')
        ls[i].pop('delete')
        ls[i].pop('created_at')
        ls[i].pop('updated_at')
    res_ = {"code": 200, "msg": dt, "countrys": ls}
    return JsonResponse(res_)