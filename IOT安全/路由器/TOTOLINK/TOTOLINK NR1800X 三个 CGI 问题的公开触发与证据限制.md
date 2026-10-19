---
schema_version: "1"
id: "vw-mrxn-20261019-110"
title: "TOTOLINK NR1800X 三个 CGI 问题的公开触发与证据限制"
product: "TOTOLINK NR1800X"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "needs-review"
version: "9.1.0u.6279_B20210910"
prerequisites: "管理 CGI 可达；三项 CNA 均为有权限场景；来源额外 authCode 会话绕过单独记录"
side_effects: "配置变更、写 /tmp 文件、出网与 CGI 崩溃风险；HTTP 状态不能充当执行证明"
source: "本库原创中文整理；研究作者及原文见正文"
source_status: "recorded"
source_url: "https://www.iotsec-zone.com/article/530"
review_date: "2026-10-19"
archive_commit: "f33600e512f2ff654ec335102daf23b8a5218d24"
archive_url: "https://github.com/Mr-xn/Penetration_Testing_POC/blob/f33600e512f2ff654ec335102daf23b8a5218d24/iot/Totolink%20NR1800X%E6%BC%8F%E6%B4%9E%E5%A4%8D%E7%8E%B0.md"
primary_identifiers: "CVE-2026-1326; CVE-2026-1327; CVE-2026-1328"
---

# TOTOLINK NR1800X 三个 CGI 问题的公开触发与证据限制

CNA 分别将 CVE-2026-1326 对应 setWanCfg 的 Hostname，1327 对应 setTracerouteCfg 的 command，1328 对应 setWizardCfg 的 ssid；产品和构建与来源一致。三个入口均经 /cgi-bin/cstecgi.cgi，由 topicurl 分发，应保留三实体，不合并成单个“未认证 RCE”。

来源的第一段公开请求使用 topicurl=setWanCfg、proto=2 与 hostName，表示 DHCP 分支，并用单引号闭合和分号分隔的主机名构造说明命令注入。源码字段 hostName 与 CNA 描述 Hostname 的大小写差异应按各自原文保留。

第二段将 echo 内容直接放入 traceroute 的 command 参数，但其给出的拼接命令中，重定向和注释不会自动把 echo 变为独立命令，故该样例不能证明所称任意命令已执行；本文不修理它。第三段 ssid 为 0x1000 个 a，HTTP 500 只能说明异常响应，不能独自证明返回地址受控或 RCE。CNA 的漏洞分类与来源实验结果分别归因。

来源另给 formLoginAuth.htm?authCode=1&action=login 的会话建立链，与同批 #94 属相同认证流程线索；它不是上述三个 CVE 的认证前提可自动消失的证明。既有 X5000R 同名 handler 文档是不同型号/构建。未发现经核定的固定版本；不把资料的 2026 年 1 月公开日期写成本周新披露。


## 逐项静态审计

- hostName 与 CNA Hostname 大小写分别记录，不改来源 JSON。
- traceroute 样例未用命令分隔或替换将 echo 从参数中分离，重定向/注释本身不证明 echo 被执行；不补写更有效载荷。
- setWizardCfg 的 500 不是内存破坏证明，authCode 的伪引用标记也不是独立佐证。

## 核验、风险与来源

配置变更、写 /tmp 文件、出网与 CGI 崩溃风险；HTTP 状态不能充当执行证明。本次仅进行公开资料与既有文库的静态文字核对，未执行请求、载荷、固件、依赖安装或扫描，也未访问示例目标。来源中的成功或失败是作者记录；截图像素本轮未审，不将其升级为本库复现。

本文为新写中文分析，不整篇复制原文章或图片。汇编库的 Apache-2.0 声明不能证明原作者文章及图片已按该许可授权。原始资料不作遮盖、替换或删除；本文没有转录为可运行脚本，也不补全来源省略的参数。

- 研究来源：WLZ，https://www.iotsec-zone.com/article/530；发布时间线索：图片URL2026-01-29/30。本次仓库收录时间不等于新漏洞披露时间
- 核对依据：https://github.com/CVEProject/cvelistV5/blob/main/cves/2026/1xxx/CVE-2026-1326.json
- 核对依据：https://github.com/CVEProject/cvelistV5/blob/main/cves/2026/1xxx/CVE-2026-1327.json
- 核对依据：https://github.com/CVEProject/cvelistV5/blob/main/cves/2026/1xxx/CVE-2026-1328.json

- 固定汇编来源（仅固定所读版本，不代替原作者出处）：https://github.com/Mr-xn/Penetration_Testing_POC/blob/f33600e512f2ff654ec335102daf23b8a5218d24/iot/Totolink%20NR1800X%E6%BC%8F%E6%B4%9E%E5%A4%8D%E7%8E%B0.md
