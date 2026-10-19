---
schema_version: "1"
id: "VW-20261019-MRXN-054"
title: "DrayTek Vigor3910 配置导出与 GetCGI 溢出分析"
product: "DrayTek Vigor3910"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "active"
primary_identifiers: "CVE-2024-23721;CVE-2024-41592"
identifier_status: "active"
version: "来源目标4.3.2.5；41592 CNA范围至4.3.2.6；3.9.7.1只作固件解密研究"
prerequisites: "23721厂商确认未认证特制POST；41592需可达CGI，CNA描述未充分明确认证条件"
side_effects: "导出敏感配置；大量参数可能令服务崩溃或重启；解密和IDA辅助脚本写本地文件或数据库"
source: "朝阳"
source_status: "recorded"
source_url: "https://www.iotsec-zone.com/article/524"
archive_commit: "f33600e512f2ff654ec335102daf23b8a5218d24"
archive_title: "DrayTek Vigor3910 工业路由器固件解密与逆向分析：CVE-2024-41592-23721漏洞复现"
review_date: "2026-10-19"
fixed_version: "23721：4.3.2.6；41592：4.3.2.8或4.4.3.1对应分支"
---

# DrayTek Vigor3910 配置导出与 GetCGI 溢出分析

## 两项漏洞分别核对

Sakura 与朝阳的文章均研究 CVE-2024-23721：`.exp` 路由导出、`/images/` 访问判断、空 `sFormAuthStr` 与配置输出参数组合。来源在 `192.168.1.1` 上先得到不可读输出，再以 `chk_encryptcfg=170` 请求明文配置并称成功。原始路径为 `/Draytek.exp/images/?sFormAuthStr=`；原报文 `Content-Length: 65` 与所示17字节表单不相符，应在报文外说明，不能静默修正。厂商确认这是未认证信息泄露；CNA 的 process_post、产品及4.3.2.5均对应。

朝阳另分析 CVE-2024-41592：GetCGI 处理查询串时按分隔符累加参数表项，没有相应容量检查，可能越界写入。CNA 对应至4.3.2.6的栈溢出，并提到多余 `&` 与长键值对。来源示例向 `/cgi-bin/wlogin.cgi` 查询串添加1500个 `&`，作者称溢出。程序把任意请求异常当成功，无法排除断网或超时；缺少 NX 也不直接证明已实现 RCE，POST 某分支有检查不等于整个 POST 安全。

## 固件辅助材料的边界

3.9.7.1 的解密链仅是研究准备，不是两项漏洞的实验影响版本。两篇含固件提取、ChaCha20、LZ4及反汇编辅助方法；LZ4是压缩，malloc分配不应描述为栈分配。文字中的 Jason 与脚本 Eason 不一致，密钥长度和脚本缩进不能凭意图修复。辅助脚本会输出本地文件，IDA脚本会重命名函数和修改分析数据库，不能当作纯只读操作；未执行或安装依赖。已有《记一次 Vigor3910 路由器敏感溢出分析》正文止于固件解密，未覆盖这里两条漏洞链，属于互补材料。

## 厂商修复

核对日期2026-10-19：[DSA-2024-001](https://www.draytek.com/about/security-advisory/information-disclosure-vulnerability-(cve-2024-23721)/)列 Vigor3910 的23721修复为4.3.2.6；[DSA-2024-003](https://www.draytek.com/about/security-advisory/cross-site-scripting%2C-denial-of-service-and-remote-code-execution-vulnerabilities/)列41583至41596系列修复分支为4.3.2.8、4.4.3.1。不能将4.3.2.6解释为同时修复41592。

## 来源与收录范围

- 原作者：朝阳；[原文](https://www.iotsec-zone.com/article/524)
- 汇编：Mr-xn/Penetration_Testing_POC，固定提交 `f33600e512f2ff654ec335102daf23b8a5218d24`，路径 `iot/DrayTek Vigor3910 工业路由器固件解密与逆向分析：CVE-2024-41592-23721漏洞复现.md`
- 原文授权范围未明确，本篇为独立中文综合分析，保留技术标识与公开实验值，未整篇转载代码或图片。源码截图本次未逐图核验；作者结果与本库文字审阅分别记录。完整实验材料见原文，未执行PoC、安装依赖或请求示例目标。
- 本次属于2026-10-12至2026-10-19汇编新增的历史资料，不是本周首次披露。
- [CNA CVE-2024-23721](https://www.cve.org/CVERecord?id=CVE-2024-23721)
- [CNA CVE-2024-41592](https://www.cve.org/CVERecord?id=CVE-2024-41592)
- 互补原文：Sakura，[Draytek3910 固件解密及漏洞分析](https://www.iotsec-zone.com/article/479)；同一23721导出链已合并说明，不重复计算实体。
