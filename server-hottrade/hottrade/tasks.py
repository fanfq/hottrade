# -*- coding: utf-8 -*-
"""
@Projcet :  hottrade
@File : tasks
@Descriptioin : 
@DateTime : 2020/9/27 17:25
@Author : fangqing.fan#hotmail.com
"""

import time
from apscheduler.schedulers.background import BackgroundScheduler
from django_apscheduler.jobstores import DjangoJobStore, register_events, register_job
from hottrade.db import db_sync

from hottrade.models import Test,Country

scheduler = BackgroundScheduler()
#scheduler.add_jobstore(DjangoJobStore(), "default")

# @register_job(scheduler, "interval", seconds=3)
# def test_job():
#     time.sleep(4)
#     print("I'm a test job!")
#     # raise ValueError("Olala!")

# 每天8点半执行这个任务,,,这里要注意时区
@register_job(scheduler, 'cron', hour=8, minute=59)
def country_sync():
    # 具体要执行的代码
    print("country_sync")
    db_sync()

#register_events(scheduler)
scheduler.start()
print("Scheduler started!")
