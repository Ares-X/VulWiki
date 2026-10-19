# 四组公开研究候选跟进（2026-10-19）

本轮只进行资料与源码静态阅读，不执行 PoC、扫描器、漏洞载荷、项目安装或依赖安装，不访问示例目标。未重启暂停批次。结论是六篇可供整合的新稿、两组保留待核；不把待核冒称收录，不将源码审阅当成复现。

## 1. Zimbra：五篇可整合

固定研究仓库：<https://github.com/jburgess-r7/zimbra-vulnerability-tracker/tree/08dca02ee7ef166191e24270d6bda0c6265cf8da>。CHANGELOG 标明首次公开 2026-10-14；73571 自身 CVE 日期 2026-08-13，不能混称为本周新 CVE。

静态阅读覆盖完整递归树、README、CHANGELOG、resources、PoC README、requirements、.gitignore、全部五份漏洞全文、全部六份 Python PoC。树中六张 PNG 没有逐像素查看，本轮稿件没有复制或嵌入这些图片。没有 LICENSE、workflow、安装脚本、二进制；没有隐藏下载后执行机制。Python 脚本依赖 requests、cryptography>=41，额外使用 urllib3；没有完整锁版本或哈希。不能因此保证依赖供应链安全。

逐项结果：

- CVE-2026-73571：公开 SaveDraft SOAP 触发、实现与 10.1.17 补丁 diff 相符；测试 10.1.16，10.1.0 无该路径，精确引入版本未知。普通认证账号可冒发；修复对照仍写目标 Sent，但署名改回认证账号。CNA 的广泛起点 0 不覆盖这个已知排除条件
- CVE-2026-10631：FindItem 复合文件夹 ID 触发；EWS 必须在攻击账号或 COS 启用，目标无需 EWS。完整 MIME 和附件可读。原作者撤回旧演讲中 GetItem/send/move/delete 的泛化结论。10.1.0—10.1.19→10.1.20，局部/远程操作上下文补丁相符
- CVE-2026-50055：notify 规则绕过禁转发策略；仅选定文本正文与头，不是附件或完整 MIME。10.1.16—10.1.19→10.1.20；初始引入未知。脚本保留已有规则，默认安装持久过滤器，同名拒绝除非显式替换，提供移除动作。补丁不等于清除已安装规则
- CVE-2026-93635：外部 LDAP 模板、lazy provisioning/唯一目录匹配是认证 oracle 前提；S/MIME 是独立认证路径。正确 bind 仍需正确密码；不能误写无密码认证。10.1.0—10.1.21 来自作者及 CNA 正文；截至核对日无公开修复
- CVE-2026-93637：GraphQL 跳过 auth.failed 计数，不依赖批量才成立；账号锁定仍可能生效，MFA 不被绕过，成功仍需正确密码。批量有资源消耗。10.1.0—10.1.21 来自作者及 CNA 正文；截至核对日无公开修复

[官方公告](https://wiki.zimbra.com/wiki/Zimbra_Security_Advisories) 已独立核对：73571→10.1.17，10631/50055→10.1.20；没有查到 93635/93637 修复条目。每份稿件列出固定源码/PoC 与对应 CNA 链接。五份 CNA 均为 PUBLISHED，但结构化 versions 的 0 起点不能替代研究者确认范围。源码补丁引用来自研究者反编译对照，未取得厂商二进制自行重做 diff。

授权依据：研究仓库没有 LICENSE，六篇稿件采用原创中文整理及必要技术标识符，链接完整公开请求，不复制整篇分析、全部 PoC 或截图。源材料原有占位符未补全或修改。未发现本轮拟引用内容含需验证的活动真实凭据；不会用脱敏修改代替发布判断。

## 2. Flowise：一篇可整合，发行版与编号待核

[Sonar 原文](https://www.sonarsource.com/blog/sonars-new-js-ts-engine/)，Samuele Buro，2026-10-14。公开 callback GET 示例、数据流和修复均存在，不是只剩营销标题。直接影响是反射 HTML 链接/钓鱼，global sanitize-html 阻止脚本类内容，不能写成 RCE 或宣称绕过 sanitizer。

独立核对[官方修复提交](https://github.com/FlowiseAI/Flowise/commit/917e02eb36736fcbfaa4bef9342e217c5d4a9840)：2026-02-24；父提交 c22f2d3d25077f065001e07b79870aee2c37d70c。全文读取回调与模板、XSS.ts、路由挂载和白名单相关代码；补丁五个文件 diff 完整阅读。回调默认白名单允许访问，DENYLIST_URLS 可收紧。旧模板错误消息承接 state/error_description；补丁在模板内转义五字段。

依赖与工作流：根/服务器 package.json 全文读过，sanitize-html ^2.11.0、Express ^4.17.3，根含 husky postinstall、第三方 tarball override，CI 五份 workflow 均全文阅读，包含 pnpm 安装、Cypress 下载、构建与 DockerHub/ECR 发布。未运行这些流程。审查不是 Flowise 全库依赖递归安全审计，五个 workflow 的外部 action 实现和所有锁文件依赖未全部阅读。

LICENSE.md 明确部分企业路径/指定文件商业许可，其余 Apache-2.0；相关 callback/template 不在商业目录。本稿不分发完整源文件。修复提交的 package version 3.0.13 不足以证明正式发行包含补丁；首修复发行版及独立 CVE 仍未知，content_status 为 needs-review。

## 3. AEM：准确保留待核，不强行新增合格漏洞条目

[Searchlight 原文](https://www.slcyber.io/research/more-critical-bugs-in-adobe-experience-manager-pre-auth-rce)，Dylan Pindur，2026-10-15。全文已读。四个 VULN 是研究内部编号，不是 CVE；文章只称云端链已修复，未给逐项固定版和 CVE 映射。公开请求充分，缺口不是 PoC。

[Adobe APSB26-74](https://www.adobe.com/trust/security/products/experience-manager/apsb26-74.html) 确实感谢相同研究团队，提供 2026.6.0 等修复产品边界，但没有给这四个 VULN 的一对一映射；仅凭作者与漏洞类型相似不能填上 CVE 或补丁版本。

需保留的边界：整条预认证 RCE 是 Cloud 链；本地 author 演示早期带登录 token。导入需要相应 blob/configuration；XXE 读取文件后取得云端服务凭据，最后 Groovy 端点本身需认证。VULN-34975 的源码示例设置 CSP sandbox，而展示的 HTTP 响应未包含该头，与后文脚本执行叙述之间缺解释，不能当作独立验证。副作用涉及 JCR 写入/删除、外部存储导入、文件/凭据读取、令牌交换和命令执行。没有执行请求、安装文中 npm 库或访问回连域名。

补齐条件：作者/厂商公开逐项 CVE 与受影响、修复版本映射，或可确定版本的补丁证据；解释 inline 响应与 CSP 的对应。不能把 VULN-34977 改写成 CVE-2026-34977（后者是其他产品）。原文未确认开放转载许可，当前仅保存原创审计摘要和来源。

## 4. WebAlliance：编号确认，但端点材料冲突和版本缺口保留待核

[Rapid7 原文](https://www.rapid7.com/blog/post/ve-unauthenticated-sql-injection-in-channel-software-weballiance-ecommerce/)，Marcus Chang，2026-10-14；[Rapid7 CNA](https://github.com/CVEProject/cvelistV5/blob/main/cves/2026/108xxx/CVE-2026-108065.json) 已完整读取，CVE-2026-108065 为 PUBLISHED。

技术正文与 CNA 均指 /preapproval.asmx 的 GetUser/sUserID；博客 curl 却是 GetCustomer/sCustID，错误响应也属于 GetCustomer。不能替作者改参数后声称完整一致。CNA affected 声明 0≤1.*，同时描述残留“[VERSION — missing]”，不能据此判定可靠版本范围。

作者无源码根因（黑盒研究），截至披露未收到厂商回复；未找到可核对修复。公开建议阻断端点是缓解，不是补丁。SQL 注入无需认证，命令执行另需数据库高权限及相应条件，ASPX 路径另需数据库与 Web 服务同机。保留待核，补齐作者端点对应及厂商版本/修复材料后再判断，不生成虚构版本稿。没有独立 PoC 仓库/依赖/workflow 可审计；文章请求已阅读，截图未逐像素核验。

## 去重与交付边界

在共享工作树全部三个正文根目录、INDEX、INDEX-CVE、docs/generated 中搜索五个 Zimbra CVE、108065、oauth2-credential/callback、四个 AEM VULN、bulkimportConfig、XmlSchemaReader、/bin/asynccommand，均无命中。另检索 Flowise 产品已有条目，现存为文件写入、RCE、JWT 绕过等，与回调 HTML 注入不同实体。

交付六份正文草稿，由整合者分配分类路径、生成目录并运行验收。本审计没有修改索引、基线或远程仓库，也没有声称已完成合并/CI。
