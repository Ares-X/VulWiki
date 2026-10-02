---
source: "wy876 漏洞文库"
id: "vw-dc65e943ce66e44d7a104378"
entity_id: "ve-dc65e943ce66e44d7a104378"
schema_version: "1"
title: "锐捷EG易网关login.php敏感信息泄露"
product: "Ruijie EG易网关"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "无认证证据，版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/Ruijie/%E9%94%90%E6%8D%B7EG%E6%98%93%E7%BD%91%E5%85%B3login.php%E6%95%8F%E6%84%9F%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/iml6w4zwphpk4t97"
source_status: "recorded"
---

# 锐捷EG易网关login.php敏感信息泄露

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Ruijie EG易网关
- 本文讨论：login.php a=version版本信息暴露
- 版本、权限与配置前提：无认证证据，版本未知
- 资料类型：信息接口线索；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 仅一个version路径无响应，无法评估是否只是公开版本指纹或真正敏感泄露
- 不同于login.php密码参数注入泄露，不可按文件名合并

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 匿名响应实际字段和必要保密边界待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


**<font style="color:rgb(38, 38, 38);">一、漏洞简介</font>**

<font style="color:rgb(38, 38, 38);">锐捷EG易网关login.php敏感信息泄露</font>

<font style="color:rgb(38, 38, 38);"> </font>**<font style="color:rgb(38, 38, 38);">二、影响版本</font>**

`锐捷EG易网关`  
**<font style="color:rgb(38, 38, 38);">三、资产测绘</font>**

`app="Ruijie-EG易网关"`  
<font style="color:rgb(38, 38, 38);">●登录页面</font>  


  
**<font style="color:rgb(38, 38, 38);">四、漏洞复现</font>**

```plain
/login.php?a=version
```


  
 


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/iml6w4zwphpk4t97>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
