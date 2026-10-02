---
source: "hatch 补库批 20260928"
id: "vw-e7f89fe65d28cf9fc6df5180"
entity_id: "ve-e7f89fe65d28cf9fc6df5180"
schema_version: "1"
title: "深信服 终端检测相应平台（EDR） 任意命令执行漏洞（二）"
product: "Sangfor EDR管理平台"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "3.2.16/17/19；Nginx路由可达、弱类型比较"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E6%B7%B1%E4%BF%A1%E6%9C%8D/%E6%B7%B1%E4%BF%A1%E6%9C%8D%20%E7%BB%88%E7%AB%AF%E6%A3%80%E6%B5%8B%E7%9B%B8%E5%BA%94%E5%B9%B3%E5%8F%B0%EF%BC%88EDR%EF%BC%89%20%E4%BB%BB%E6%84%8F%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E%EF%BC%88%E4%BA%8C%EF%BC%89.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_status: "unknown"
---

# 深信服 终端检测相应平台（EDR） 任意命令执行漏洞（二）

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Sangfor EDR管理平台
- 本文讨论：sangforinter v2 cssp/slog_client token绕过+命令注入
- 版本、权限与配置前提：3.2.16/17/19；Nginx路由可达、弱类型比较
- 资料类型：EDR绕鉴权到命令执行分析残片；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 所有关键截图只残路径不成图片链接，源码证据丢失
- 文字称md5:true绕过，示例token实际random1/md5字符串，不是所述JSON；params使用弯引号
- 对escapeshellarg说毫无作用缺完整调用上下文，不能认定通用绕过

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 弱比较有效类型、URL重写、shell引号上下文待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


一、漏洞简介
------------

二、漏洞影响
------------

深信服EDR 3.2.16

深信服EDR 3.2.17

深信服EDR 3.2.19

三、复现过程
------------任意命令执行漏洞(二)/media/rId24.jpg)

dev\_linkage\_launch.php
为设备联动的新入口点主要是将联动的接口构造成业务统一处理的接口

主要调用任意命令执行漏洞(二)/media/rId25.jpg)

跟进任意命令执行漏洞(二)/media/rId26.jpg)

可以看到 第一个检查为 \$req\_url = \$\_SERVER\['PHP\_SELF'\];

绕过第一个检查:

在他们系统nginx配置文件里面:任意命令执行漏洞(二)/media/rId27.jpg)

**通过nginx规则可以得知**\*\*,**他们没有设置禁止外网访问**.\*\***从而可以直接访问**

/api/edr/sangforinter/v2/xxx 绕过 第一个检查

**第二检查**\*\*:\*\* **权限检查**任意命令执行漏洞(二)/media/rId28.jpg)

跟进check\_access\_token任意命令执行漏洞(二)/media/rId29.jpg)

**这里\*\*\*\*if(\$md5\_str == \$json\_token\["md5"\])**
**引发第二个漏洞**\*\*: php\*\*\*\*弱类型导致的漏洞\*\*

**绕过只需要传入一个base64编码的json内容为**
\*\*{"md5":true}\*\***即可**

**至此** **权限检查绕过完毕**

**来到** process\_cssp.php 文件任意命令执行漏洞(二)/media/rId30.jpg)

存在任意指令执行漏洞.作者试图使用escapeshellarg函数去给单引号打反斜杠实际上是毫无作用的.`https://www.0-sec.org:8443//api/edr/sangforinter/v2/cssp/slog_client?token=eyJyYW5kb20iOiIxIiwgIm1kNSI6ImM0Y2E0MjM4YTBiOTIzODIwZGNjNTA5YTZmNzU4NDliIn0=`

绕过:`{“params”:”|命令”}`

结果如下:任意命令执行漏洞(二)/media/rId31.jpg)
