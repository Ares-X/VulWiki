---
cve: "CVE-2026-30957"
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-1350252f849d99a029a2368a"
entity_id: "ve-1350252f849d99a029a2368a"
schema_version: "1"
title: "严重告警：OneUptime 监控平台曝出 RCE 漏洞，低权限用户可接管整个集群"
product: "OneUptime可观测平台及Probe"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2026-30957"
referenced_identifiers: ""
prerequisites: "低于10.0.21，具Synthetic Monitor创建权限的项目成员；10.0.21声称修复"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%99%BA%E8%83%BD%E8%AE%BE%E5%A4%87/%E4%B8%A5%E9%87%8D%E5%91%8A%E8%AD%A6/%E4%B8%A5%E9%87%8D%E5%91%8A%E8%AD%A6%EF%BC%9AOneUptime%20%E7%9B%91%E6%8E%A7%E5%B9%B3%E5%8F%B0%E6%9B%9D%E5%87%BA%20RCE%20%E6%BC%8F%E6%B4%9E%EF%BC%8C%E4%BD%8E%E6%9D%83%E9%99%90%E7%94%A8%E6%88%B7%E5%8F%AF%E6%8E%A5%E7%AE%A1%E6%95%B4%E4%B8%AA%E9%9B%86%E7%BE%A4.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  严重告警：OneUptime 监控平台曝出 RCE 漏洞，低权限用户可接管整个集群  

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：OneUptime可观测平台及Probe
- 本文讨论：CVE-2026-30957；30956可选账户链；27574/27728/30887/30921为历史参考
- 版本、权限与配置前提：低于10.0.21，具Synthetic Monitor创建权限的项目成员；10.0.21声称修复
- 资料类型：漏洞分析/公告；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 误归智能设备/严重告警，应按OneUptime服务端平台分类，Playwright是被暴露宿主能力而非受影响主产品
- 开放注册不自动等于可创建合成监控，需项目与权限条件
- Probe代码执行被泛化为所有集群/凭证全面控制，实际取决环境与网络
- 历史补丁全部被绕过的概括未逐个证明

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- GHSA-jw8q-gjvg-8w4q、修复提交及可选30956链待逐源验证
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

原创 CVE-SEC
                    CVE-SEC  CVE-SEC   2026-03-12 03:00  
  
# 严重告警：OneUptime 监控平台曝出 RCE 漏洞，低权限用户可接管整个集群  
  
近日，开源可观测性平台 OneUptime 被披露存在一个 CVSS 评分达 9.9 的严重远程代码执行漏洞（CVE-2026-30957）。攻击者仅凭一个普通成员账号，即可在监控探针服务器上执行任意系统命令，并借此读取数据库密码、接管整个后端集群。  
## 漏洞背景  
  
OneUptime 是一款定位为"全家桶"的开源统一监控平台，旨在以单一产品替代 Pingdom、PagerDuty、New Relic、Datadog、Sentry 等多个商业工具的组合。其核心功能之一是 Synthetic Monitors（合成监控）——用户可以编写任意 Playwright 脚本，由部署在全球各地的 Probe（探针）节点自动执行，模拟真实用户对 Web 服务进行测试。  
  
该平台在 GitHub 上拥有超过 6,600 个 Star，支持 Docker Compose 和 Kubernetes 两种自托管部署方式，声称用户规模超过百万次下载，服务客户从初创公司延伸至 Fortune 500 企业。  
## 漏洞的本质：把车钥匙直接插进了沙盒里  
  
要理解这个漏洞，需要先了解 OneUptime 是如何执行用户提交的 Playwright 脚本的。  
  
系统将用户脚本放在 Node.js 的 vm  
 模块构建的沙箱中运行，本意是隔离不可信代码。然而，系统在执行时把宿主进程真实的 Playwright browser  
 和 page  
 对象直接注入到了这个沙箱的上下文里。  
  
问题在于，Playwright 的 browser.browserType().launch()  
 方法接受一个 executablePath  
 参数，允许指定任意可执行文件路径作为"浏览器"来启动。攻击者只需在脚本里写：  
```
browser.browserType().launch({
    executablePath: "/bin/sh",
    ignoreDefaultArgs: true,
    args: ["-c", "你的任意命令"]
});

```  
  
系统就会把 /bin/sh  
 当作一个浏览器去调用，而攻击者的命令已经在 Probe 服务器的操作系统上执行完毕。  
  
这里不需要任何沙箱逃逸技巧。vm  
 模块本就不是安全边界——Node.js 官方文档明确说明这一点——而向沙箱注入具备宿主权限的 Playwright 对象，相当于把车钥匙直接插进了理论上应该被隔离的沙盒里。  
  
漏洞类型归属于 CWE-749（暴露危险方法或函数）。  
## 攻击者需要什么条件  
  
这个漏洞的门槛之低令人警惕：  
- 目标实例版本低于 10.0.21  
  
- 攻击者只需拥有目标项目中的普通成员账号（ProjectMember，这是 OneUptime 中权限最低的角色）  
  
- 无需管理员权限，无需任何用户交互  
  
更值得注意的是：如果目标实例开启了默认的开放注册功能，攻击者甚至不需要已有账号，自行注册即可完成全部前置条件，利用门槛实质降为零。  
## 得手之后能做什么  
  
Probe 服务通常以 network_mode: host  
 模式运行（与宿主机共享网络），同时在环境变量中存储有整个集群的凭证：  
```
ONEUPTIME_SECRET
DATABASE_PASSWORD
REDIS_PASSWORD
CLICKHOUSE_PASSWORD

```  
  
这意味着攻击者一旦在 Probe 上执行代码，就自动拿到了访问 PostgreSQL 数据库、Redis 缓存、ClickHouse 分析库的全部钥匙，并可借助 host 网络模式直接连接到这些内部服务，实现从单个 Probe 容器到整个后端基础设施的横向移动。  
## 组合利用：与另一个 9.9 分漏洞配合使用  
  
同批披露的 CVE-2026-30956（CVSS 9.9）是一个授权绕过漏洞。攻击者可以通过伪造 HTTP 请求头中的 is-multi-tenant-query  
 和 projectid  
 字段，绕过 OneUptime 的全部鉴权检查，读取任意用户的账号重置 Token，进而接管任意账号。  
  
将两个漏洞组合使用时，即便目标实例关闭了开放注册，攻击者也可以先通过 CVE-2026-30956 接管一个已有项目成员账号，再利用 CVE-2026-30957 实施 RCE，整条攻击链无需任何社会工程学手段。  
## 这不是第一次，也不是最后一次  
  
CVE-2026-30957 并非孤立事件。翻看 OneUptime 近年的安全公告，可以看到一条清晰的漏洞脉络：  
<table><thead><tr style="border: 0;border-top: 1px solid #ccc;background-color: white;"><th style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;font-weight: bold;background-color: #f0f0f0;"><section><span leaf="">时间</span></section></th><th style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;font-weight: bold;background-color: #f0f0f0;"><section><span leaf="">CVE 编号</span></section></th><th style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;font-weight: bold;background-color: #f0f0f0;"><section><span leaf="">漏洞类型</span></section></th><th style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;font-weight: bold;background-color: #f0f0f0;"><section><span leaf="">修复版本</span></section></th></tr></thead><tbody><tr style="border: 0;border-top: 1px solid #ccc;background-color: white;"><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">2026年初</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">CVE-2026-27574</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">Node.js vm 原型链沙箱逃逸</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">10.0.5</span></section></td></tr><tr style="border: 0;border-top: 1px solid #ccc;background-color: #F8F8F8;"><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">2026年初</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">CVE-2026-27728</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">traceroute 参数 OS 命令注入</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">10.0.7</span></section></td></tr><tr style="border: 0;border-top: 1px solid #ccc;background-color: white;"><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">2026年2月</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">CVE-2026-30887</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">无沙箱代码执行</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">10.0.18</span></section></td></tr><tr style="border: 0;border-top: 1px solid #ccc;background-color: #F8F8F8;"><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">2026年3月</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">CVE-2026-30921</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">Playwright 对象注入</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">10.0.20</span></section></td></tr><tr style="border: 0;border-top: 1px solid #ccc;background-color: white;"><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">2026年3月</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">CVE-2026-30957</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">Playwright 宿主对象暴露（本漏洞）</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">10.0.21</span></section></td></tr></tbody></table>  


每一个漏洞都是在上一个补丁之后又出现的新绕过，根因始终如一：系统将用户提交的不可信代码放在一个实质上不安全的环境中执行，每次修复都只是针对当前已知的攻击路径打补丁，而非从架构层面解决用户代码隔离问题。  
## 时间线  
<table><thead><tr style="border: 0;border-top: 1px solid #ccc;background-color: white;"><th style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;font-weight: bold;background-color: #f0f0f0;"><section><span leaf="">时间</span></section></th><th style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;font-weight: bold;background-color: #f0f0f0;"><section><span leaf="">事件</span></section></th></tr></thead><tbody><tr style="border: 0;border-top: 1px solid #ccc;background-color: white;"><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">未知</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">安全研究员 @maru1009 发现漏洞并私下报告</span></section></td></tr><tr style="border: 0;border-top: 1px solid #ccc;background-color: #F8F8F8;"><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">2026-03-08</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">OneUptime 官方发布修复版本 v10.0.21</span></section></td></tr><tr style="border: 0;border-top: 1px solid #ccc;background-color: white;"><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">2026-03-10</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">NVD 收录，CVE-2026-30957 正式公开披露</span></section></td></tr><tr style="border: 0;border-top: 1px solid #ccc;background-color: #F8F8F8;"><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">2026-03-11</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">TheHackerWire 等媒体跟进报道</span></section></td></tr></tbody></table>

## 如何应对  
  
**立即行动：**  
  
OneUptime 官方已于 2026 年 3 月 8 日发布 10.0.21 版本修复此漏洞，升级是最根本的解决方案。  
  
Docker Compose 部署的实例可执行以下操作：  
```
cd /path/to/oneuptime
git pull
git checkout 10.0.21
docker compose pull
docker compose up -d

```  
  
**暂时无法升级时的缓解措施：**  
- 关闭开放注册功能，防止匿名攻击者自行获取账号  
  
- 严格审查项目成员权限，移除不必要的 Synthetic Monitor 创建和编辑权限  
  
- 将 Probe 容器从 network_mode: host  
 改为独立网络，限制其访问内部服务的范围  
  
- 为 Probe 单独配置最小权限数据库账号，不使用集群管理员凭证  
  
**检测是否已遭利用：**  
  
检查 Monitor 配置中是否存在包含 executablePath  
、ignoreDefaultArgs  
、/bin/sh  
、/bin/bash  
 等字符串的 Synthetic Monitor 脚本；检查 Probe 宿主机的进程历史，是否存在由 Node.js 进程产生的非正常 shell 子进程记录。  
## 给开发者的思考  
  
这一系列漏洞揭示了一个在工程实践中被反复低估的问题：Node.js 的 vm  
 模块从来都不是安全沙箱。官方文档在第一行就写明了这一点，但仍有大量项目将其用于执行不可信代码。  
  
真正的用户代码隔离需要在更低的层次上实现，例如使用基于 V8 Isolate 的 isolated-vm  
 库（提供独立的内存隔离），或在独立的容器中运行用户脚本并通过 IPC 交换数据。向沙箱注入具备宿主权限的对象，无论代理包装做得多么精细，本质上都是在用一个带漏洞的栅栏守护城堡大门。  
## 参考资料  
- 官方安全公告（GHSA-jw8q-gjvg-8w4q）：https://github.com/OneUptime/oneuptime/security/advisories/GHSA-jw8q-gjvg-8w4q  
  
- NVD 漏洞详情：https://nvd.nist.gov/vuln/detail/CVE-2026-30957  
  
- 修复版本发布说明：https://github.com/OneUptime/oneuptime/releases/tag/10.0.21  
  
- TheHackerWire 报道：https://www.thehackerwire.com/oneuptime-critical-rce-in-synthetic-monitors-cve-2026-30957/  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
