---
source: "MrWQ/vulnerability-paper"
title: "JeeWMS 动态数据源JDBC反序列化链"
product: "JeeWMS"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "驱动5.1.27声明；可控URL/JDK/gadget/出网"
prerequisites: "依85权限绕过"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_url: "https://mp.weixin.qq.com/s/xVIXGxMACM-n9iBu42KbMg"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/JEEWMS/jeewms%20%E5%AD%98%E5%9C%A8%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
id: "vw-f96bc14e05e28a0e9333117b"
entity_id: "ve-f96bc14e05e28a0e9333117b"
schema_version: "1"
previous_fofa_unverified: "语句：body="
fofa: "body=\"plug-in/lhgDialog/lhgdialog.min.js?skin=metro\" && body=\" 仓 \""
---

# JeeWMS 动态数据源JDBC反序列化链

> 指纹字段校订（2026-10-04）：按原归档正文的明确平台标签及完整表达式恢复当前查询，旧误填或截取字段逐字保存在 `previous_*`；后文对此旧字段的诊断按当前字段阅读。仅经过本库保守语法与原字面核对，未在线运行查询，不把指纹命中视为漏洞存在。

## 条目说明

- 对象与具体问题：JeeWMS；动态数据源JDBC反序列化链
- 版本、配置及部署条件：驱动5.1.27声明；可控URL/JDK/gadget/出网
- 认证与权限前提：依85权限绕过
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- mysql.version5.1.27更可能是Connector/J依赖而非数据库服务器版本，须核pom
- 仅收到DNS不能证明命令执行；可控JDBC URL本身不足证明反序列化RCE
- 实际请求/生成参数全部图，不能称无害已验证；全版本无证
- 章节误标题权限绕过且推广尾段过多，缺固定版本

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/xVIXGxMACM-n9iBu42KbMg)

**1、描述**

  

jeewms 是由灵鹿谷科技主导的开源项目，WMS 在经过多家公司上线运行后，为了降低物流仓储企业的信息化成本，决定全面开源，是基于 JAVA 的 web 后台。经过代码审计又发现了命令执行漏洞。

  

  

  

  

  

**2、影响范围**

  

JEEWMS 全版本  

  

  

  

  

  

**3、漏洞复现**

  

fofa 语句：body="plug-in/lhgDialog/lhgdialog.min.js?skin=metro" && body=" 仓 "

  

  

  

  

  

  

演示一下

一、权限绕过漏洞

1、漏洞代码位置

```
src/main/java/org/jeecgframework/web/system/pojo/base/DynamicDataSourceEntity.java
```

![](../../.resource/remote/6861d124715b682b9364f5608faecaad02c1e012a2c6db818d9f940103f2657e.png)

mysql 版本 <mysql.version>5.1.27</mysql.version>，可进行 jdbc 反序列化

![](../../.resource/remote/bbac9a55e403910dbe64301364c78143add58c9b3d0083cb17376ed9f8bd5801.png)

1.  漏洞代码分析
    

src/main/java/org/jeecgframework/web/system/controller/core/DynamicDataSourceController.java

此控制器可传入数据库 jdbc url、用户名、密码，因此存在 jdbc 反序列化漏洞

![](../../.resource/remote/d3242f34344d9bfe680acf61c91396e6b1d5c9bc28552e9bbea48415daedfc4c.png)

DynamicDataSourceEntity 内容：

```
src/main/java/org/jeecgframework/web/system/pojo/base/DynamicDataSourceEntity.java
```

![](../../.resource/remote/38dc83d1bcf6810c2cc26332fafe3cb2edbb2f409425191a2cfd4e9f407e3340.png)

已知 jdbc url 可控，存在 jdbc 反序列化漏洞，无害验证如下

启动虚假 mysql 服务器

![](../../.resource/remote/8bf94a06950ad6f97f3e5a1e39c726a57d67df260595ffe3753f03b83ce088d0.png)

发送 payload：使用了前篇文章的未授权绕过漏洞

![](../../.resource/remote/404a15bee798a8c98ca948abc7e96caa54eb7bfd3fc58c7447345e21b6ab0017.png)

![](../../.resource/remote/c98fbbc1b3d5fb1b97b0e87dee5e22a86f366ae878b85ac890f8921b3eefe8b3.png)

收到 dnslog 请求

![](../../.resource/remote/0b7554b1b925327dc503986f084c2ffdac0ebdea3efae04fbef21b87a0c024c3.png)

公众号

最后再给大家介绍一下漏洞库，地址：wiki.xypbk.com  

![](../../.resource/remote/0ce0fc3f0c89c4cd9b6728b143cc0355198508f9fa8c6eb453ed5c255593b872.png)

![](../../.resource/remote/379fd6bf8f0a7e1187b264a408baa8d195e66ad9f5536a623f74fd829079ebc2.png)

![](../../.resource/remote/84ab43b06699d9ed289fb3e9c9bb714a3e9b9a78b7390e9b43cc3a883c106414.png)

漏洞库内容来源于互联网 && 零组文库 &&peiqi 文库 && 自挖漏洞 && 乐于分享的师傅，供大家方便检索，绝无任何利益。

由于传播、利用此文所提供的信息而造成的任何直接或者间接的后果及损失，均由使用者本人负责，文章作者不为此承担任何责任。

若有愿意分享自挖漏洞的佬师傅请公众号后台留言，本站将把您供上，并在此署名，天天烧香那种！

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
