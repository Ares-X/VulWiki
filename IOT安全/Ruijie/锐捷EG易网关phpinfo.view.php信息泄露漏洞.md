---
source: "wy876 漏洞文库"
id: "vw-037d9fc7161f5b574cec79bf"
entity_id: "ve-037d9fc7161f5b574cec79bf"
schema_version: "1"
title: "锐捷 EG易网关phpinfo.view.php 信息泄露漏洞"
product: "Ruijie EG易网关"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "宣称无认证，未给版本"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/Ruijie/%E9%94%90%E6%8D%B7EG%E6%98%93%E7%BD%91%E5%85%B3phpinfo.view.php%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/kehikp7lablbdsec"
source_status: "recorded"
---

# 锐捷 EG易网关phpinfo.view.php 信息泄露漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Ruijie EG易网关
- 本文讨论：tool/view/phpinfo.view.php环境信息暴露
- 版本、权限与配置前提：宣称无认证，未给版本
- 资料类型：信息接口线索；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 单一路径无响应/截图，缺具体泄露字段与匿名对照
- 大量font标签影响索引；无修复信息

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 页面实际内容、认证和版本待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


**<font style="color:rgb(38, 38, 38);">一、漏洞简介</font>**

<font style="color:rgb(38, 38, 38);">锐捷 EG易网关</font><font style="color:rgba(0, 0, 0, 0.9);">存在未经身份验证获取敏感信息</font>

**<font style="color:rgb(38, 38, 38);">二、影响版本</font>**<font style="color:rgb(38, 38, 38);">  
</font><font style="color:rgb(38, 38, 38);background-color:rgb(250, 250, 250);">锐捷EG易网关</font>

**<font style="color:rgb(38, 38, 38);">三、资产测绘</font>**<font style="color:rgb(38, 38, 38);">  
</font><font style="color:rgb(35, 41, 48);background-color:rgb(250, 250, 250);">app</font><font style="color:rgb(225, 0, 35);background-color:rgb(250, 250, 250);">=</font><font style="color:rgb(102, 153, 0);background-color:rgb(250, 250, 250);">"Ruijie-EG易网关"</font>

<font style="color:rgb(38, 38, 38);">●登录页面</font><font style="color:rgb(38, 38, 38);">  
</font>


<font style="color:rgb(38, 38, 38);">  
</font>**<font style="color:rgb(38, 38, 38);">四、漏洞复现</font>**<font style="color:rgb(38, 38, 38);"></font>

```plain
/tool/view/phpinfo.view.php
```

<font style="color:rgb(38, 38, 38);">  
</font>


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/kehikp7lablbdsec>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
