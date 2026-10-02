---
fofa: ""
source: "wy876 漏洞文库"
product: "Laravel/生产调试配置风险"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
fofa_unverified: "app.name=="
title: "laravel开启debug模式信息泄露漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：仅产品名，需debug开启、请求触发异常及错误页实际暴露环境信息"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-255df2c9368c7d50d22a5d81"
entity_id: "ve-255df2c9368c7d50d22a5d81"
schema_version: "1"
---

## 核对与使用边界

- 测绘字段处置：原 fofa 字段为残缺表达式、错误平台语法或当前解析器不支持的形式，原值完整保留到 fofa_unverified，不把它当作已校验查询或受影响资产证据。正文检索方法保留；具体问题见下列原审阅项。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：仅产品名，需debug开启、请求触发异常及错误页实际暴露环境信息

代码与实验材料：PUT /index.php空body，没有响应、字段或配置对照；请求本身不能证明泄露

来源证据范围：wy876/语雀原文

- **代码与转录边界（1）**：检索元数据截断并错标平台；依据：frontmatter fofa=app.name==，正文实际Hunter app.name=="Laravel Default Page"。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

- **操作与副作用边界（2）**：影响陈述泛化；依据：列十一种数据库/邮件/APP_KEY不意味着每个应用都配置并泄露全部；进一步RCE/横向需其他权限与条件，缺整改方法。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# laravel开启debug模式信息泄露漏洞

# 一、漏洞简介
<font style="color:rgba(0, 0, 0, 0.9);">laravel因配置不当会泄露MySQL，Redis，Elastic，Mongodb，neo4j，postgresql，SQLServer，Oracle，Firebird，sqlite，mail账号密码和APP</font><font style="color:rgb(215, 186, 125);">\_</font><font style="color:rgba(0, 0, 0, 0.9);">KEY等敏感信息。黑客可以利用这些信息进行脱库，或者在服务器植入后门，也可以利用数据库服务器进行跳板入侵内网其他重要服务器。</font>

# <font style="color:rgba(0, 0, 0, 0.9);">二、影响版本</font>
+ <font style="color:rgba(0, 0, 0, 0.9);">laravel</font>

# <font style="color:rgba(0, 0, 0, 0.9);">三、资产测绘</font>
+ hunter`app.name=="Laravel Default Page"`
+ 特征


# 四、漏洞复现
```plain
PUT /index.php HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2226.0 Safari/537.36
Connection: close
Accept-Encoding: gzip, deflate
Content-Length: 0
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/tgvd9mmhbtzgbv2k>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
