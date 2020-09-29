# -*- coding: utf-8 -*-
"""
@Projcet :  hottrade
@File : mail
@Descriptioin : 
@DateTime : 2020/9/28 13:08
@Author : fangqing.fan#hotmail.com
"""
from django.core.mail import send_mail
from .settings import *

def send_email(url):
    send_mail(
        subject='hottrade-接口同步失败',
        message=url,
        from_email=EMAIL_HOST_USER,
        recipient_list=EMAIL_TO_USER_LIST,
        fail_silently=False
    )

