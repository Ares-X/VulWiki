XXL-JOB 任务调度中心 后台反弹shell
==================================

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

弱口令登录 账号：admin 密码：123456（XXL-JOB的默认账号、密码）

![1.png](/Users/aresx/Documents/VulWiki/.resource/XXL-JOB任务调度中心反弹shell/media/rId24.png)

点击任务管理、新增一个执行任务，配置如下（运行模式选择shell，cron是linux定时任务，如下0时0分0秒执行一次）：

![2.png](/Users/aresx/Documents/VulWiki/.resource/XXL-JOB任务调度中心反弹shell/media/rId25.png)

![3.png](/Users/aresx/Documents/VulWiki/.resource/XXL-JOB任务调度中心反弹shell/media/rId26.png)

进入GLUE面板，写入执行的脚本命令。随意命名备注名称，保存并关闭

![4.png](/Users/aresx/Documents/VulWiki/.resource/XXL-JOB任务调度中心反弹shell/media/rId27.png)

服务器监听shell，受害机执行任务

![5.png](/Users/aresx/Documents/VulWiki/.resource/XXL-JOB任务调度中心反弹shell/media/rId28.png)

返回shell到服务器

![6.png](/Users/aresx/Documents/VulWiki/.resource/XXL-JOB任务调度中心反弹shell/media/rId29.png)

参考链接
--------

> https://www.cnblogs.com/kbhome/p/13210394.html
