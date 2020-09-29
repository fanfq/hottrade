东拼西凑的终于把功能都完成了，关于异常处理和数据校验这块基本没有做，不过没什么关系这个项目的重点是为了快速上手python django的开发流程。作为只学习一周的我来说我对自己很满意，经历过这样的过程后我逐渐喜爱上python开发了，其开发效率很高特别适合这种微服务了。

因为这里用到了一个三方的接口获取汇率数据，由于这个接口免费版本是有限制的，所以我仅仅每日在服务器端同步一次。如果同步失败则邮件通知。

在下个版本中需要完善的地方

同时提供一个接口供客户端获取数据，这里没有用到缓存所以每次需要读取数据库。

btw，这样的部署方式我不知道对不对，都是依照自己的经验来做的。可能后续学习的深入后会逐步完善吧，这个以后再说。


#setup


#features

mail

django_apscheduler

mysql

json

http req

#release

#ubuntu 环境配置
sudo apt update
sudo apt -y upgrade
sudo apt install -y python3-pip

#项目依赖
pip3 freeze > requirements.txt
pip3 install -U -r requirements.txt 

#数据库初始化
python3 manage.py migrate
python3 manage.py makemigrations hottrade

#启动服务
source venv/bin/activate
python3 manage.py runserver 0.0.0.0:8080

