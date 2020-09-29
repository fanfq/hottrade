#!/bin/bash
#这里可替换为你自己的执行程序，其他代码无需更改
APP_NAME=hottreade
APP_PORT=8080

#使用说明，用来提示输入参数
usage() {
    echo "Usage: sh 执行脚本.sh [start|stop|restart|status]"
    exit 1
}

#检查程序是否在运行
is_exist(){
  #根据端口号查询对应的pid
  lsof -i :$APP_PORT | awk '{print $2}'> tmp
  pid=$(awk 'NR==2{print}' tmp);
  #如果不存在返回1，存在返回0
  if [ -z "${pid}" ]; then
    return 1
  else
    return 0
  fi
}

#启动方法
start(){
  is_exist
  if [ $? -eq "0" ]; then
    echo "${APP_NAME} is already running. pid=${pid}"
  else
    nohup python3 manage.py runserver 0.0.0.0:$APP_PORT > ${APP_NAME}.log 2>&1 &
  fi
}

#停止方法
stop(){
  is_exist
  if [ $? -eq "0" ]; then
    kill -9 $pid
  else
    echo "${APP_NAME} port:{APP_PORT} is not running"
  fi
}

#输出运行状态
status(){
  is_exist
  if [ $? -eq "0" ]; then
    echo "${APP_NAME} port:${APP_PORT} is running. Pid is ${pid}"
  else
    echo "${APP_NAME} port:${APP_PORT} is not running."
  fi
}

#重启
restart(){
  stop
  start
}

#根据输入参数，选择执行对应方法，不输入则执行使用说明
case "$1" in
  "start")
    start
    ;;
  "stop")
    stop
    ;;
  "status")
    status
    ;;
  "restart")
    restart
    ;;
  *)
    usage
    ;;
esac