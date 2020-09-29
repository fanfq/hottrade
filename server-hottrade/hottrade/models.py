# -*- coding: utf-8 -*-
"""
@Projcet :  hottrade
@File : models
@Descriptioin : 
@DateTime : 2020/9/27 17:02
@Author : fangqing.fan#hotmail.com
"""
from django.db import models


class Test(models.Model):
    name = models.CharField(max_length=20)


class Country(models.Model):
    name = models.CharField(max_length=20)
    value = models.DecimalField(decimal_places=4, max_digits=20, default=1)
    img_url = models.CharField(max_length=255)
    zh_cn = models.CharField(max_length=50)
    us_en = models.CharField(max_length=50)
    delete = models.BooleanField(default=False)
    trend = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, help_text='test')


class History(models.Model):
    result = models.CharField(max_length=255)
    documentation = models.CharField(max_length=255, null=True)
    terms_of_use = models.CharField(max_length=255, null=True)
    time_last_update_unix = models.BigIntegerField(default=0, null=True)
    time_last_update_utc = models.CharField(max_length=255, null=True)
    time_next_update_unix = models.BigIntegerField(default=0, null=True)
    time_next_update_utc = models.CharField(max_length=255, null=True)
    base_code = models.CharField(max_length=255, null=True)
    conversion_rates = models.CharField(max_length=1024, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
