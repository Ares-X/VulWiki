---
source: "wy876 漏洞文库"
id: "vw-a4c6c1ca5500d7e67fa820e3"
entity_id: "ve-a4c6c1ca5500d7e67fa820e3"
schema_version: "1"
fofa_unverified: "app.name="
title: "锐捷 Smartweb管理系统密码信息泄漏漏洞"
product: "Ruijie Smartweb"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "guest/guest登录；版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/Ruijie/%E9%94%90%E6%8D%B7Smartweb%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%E5%AF%86%E7%A0%81%E4%BF%A1%E6%81%AF%E6%B3%84%E6%BC%8F%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要且已脱敏的响应，不能由接口可达推定敏感内容已泄露"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/elegkbnby3vipdi9"
source_status: "recorded"
---

# 锐捷 Smartweb管理系统密码信息泄漏漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Ruijie Smartweb
- 本文讨论：webuser-auth.xml管理员凭据读取
- 版本、权限与配置前提：guest/guest登录；版本未知
- 资料类型：低权限凭据泄露PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 无XML样本/会话请求，base64对象不清
- 这是已有低权限账户读取敏感配置，不应称无需认证；版本/修复缺失
- 已落实的文本修订：残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要且已脱敏的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- 具体XML内容/固件/编码待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞描述
锐捷网络股份有限公司无线smartweb管理系统存在逻辑缺陷漏洞，攻击者可从漏洞获取到管理员账号密码，从而以管理员权限登录。

# 二、影响版本
+ 锐捷网络股份有限公司 无线smartweb管理系统

# 三、资产测绘
+ hunter`app.name="Ruijie 锐捷 Smartweb"`
+ 登录页面


# 四、漏洞复现
1. 使用默认口令`guest/guest`登录系统


2. 使用poc获取管理员`admin`账号密码

```plain
http://xx.xx.xx.xx/web/xml/webuser-auth.xml
```


3. base64解码后获取账号密码


4. 使用获取的管理账号admin登录系统


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/elegkbnby3vipdi9>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
