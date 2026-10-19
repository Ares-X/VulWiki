---
schema_version: "1"
id: "vw-mrxn-20261019-112"
title: "Wavlink NU516U1 两代固件的注入与溢出记录"
product: "Wavlink WL-NU516U1 USB 打印服务器"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "needs-review"
version: "V251208：2615/3704；V240425：3612/3613"
prerequisites: "2615/3704/3612 需有效 Session Cookie；3613 需管理员密码 MD5，研究文本另列有效 Cookie"
side_effects: "防火墙删除/配置修改、写文件、OTA 升级及 CGI 崩溃；来源模拟准备包含删除目录，不应运行"
source: "本库原创中文整理；研究作者及原文见正文"
source_status: "recorded"
source_url: "https://www.iotsec-zone.com/article/532"
review_date: "2026-10-19"
archive_commit: "f33600e512f2ff654ec335102daf23b8a5218d24"
archive_url: "https://github.com/Mr-xn/Penetration_Testing_POC/blob/f33600e512f2ff654ec335102daf23b8a5218d24/iot/WAVLINK-NU516-V251208%26V240425%E6%BC%8F%E6%B4%9E%E6%8C%96%E6%8E%98.md"
primary_identifiers: "CVE-2026-2615; CVE-2026-3704; CVE-2026-3612; CVE-2026-3613"
---

# Wavlink NU516U1 两代固件的注入与溢出记录

CNA 与研究者 Wlz1112 的四份公开报告已逐项核对。V251208 的 singlePortForwardDelete/del_flag 和 DMZ/dmz_flag 位于 firewall.cgi，分别为 CVE-2026-2615、CVE-2026-3704。新版增加 sub_405B2C 黑名单，但报告称分号未被拒绝，随后输入进入 uci 命令。研究公开了含分号及 touch 文件动作的表单请求，前提是有效会话。

这两项不是简单重复旧版 CVE-2025-10963、CVE-2025-10959：研究者明确给出了新增过滤层的绕过关系，3704 的 CNA 也明确标为不完整修复。CNA 为 3704 提供 2026-02-27 固件补丁链接；不能据此宣称其他三个编号、所有分支均由该文件修复。

V240425 的 adm.cgi 通过 page=ota_new_upgrade 接收 firmware_url；报告说明双引号包裹仍允许命令替换，分配 CVE-2026-3612。login.cgi 的 page=sys_login1、ipaddr 对应 CVE-2026-3613：管理员密码 MD5 校验通过后，输入被 sprintf 放入 128 字节缓冲区。公开长字符串请求及伪代码支持研究主题，HTTP 500 本身不能证明栈布局破坏、返回地址控制或代码执行。

原稿的固定 Content-Length、略写伪代码和仿真准备步骤不是维护脚本。全文检索未发现同一产品/参数实体主文；其他 CVE 数字或图片哈希命中无关。四项分开保留版本和认证条件，不用“登录接口”推出匿名。


## 逐项静态审计

- 四个请求分别有构建与页面分发字段，不能把 V251208 与 V240425 混为单一版本。
- login.cgi 的 password 必须通过管理员密码 MD5 比较，Cookie 条件也在原研究中列出；HTTP500不能证明返回地址已控制。
- Content-Length 是原样硬编码而非重新计算；略写的伪代码不能当完整源函数；未补齐或运行。
- CNA 3704 的 patch 链接只支持该编号，不扩展为全部四项已修复。

## 核验、风险与来源

防火墙删除/配置修改、写文件、OTA 升级及 CGI 崩溃；来源模拟准备包含删除目录，不应运行。本次仅进行公开资料与既有文库的静态文字核对，未执行请求、载荷、固件、依赖安装或扫描，也未访问示例目标。来源中的成功或失败是作者记录；截图像素本轮未审，不将其升级为本库复现。

本文为新写中文分析，不整篇复制原文章或图片。汇编库的 Apache-2.0 声明不能证明原作者文章及图片已按该许可授权。原始资料不作遮盖、替换或删除；本文没有转录为可运行脚本，也不补全来源省略的参数。

- 研究来源：WLZ，https://www.iotsec-zone.com/article/532；发布时间线索：图片URL2026-03-10。本次仓库收录时间不等于新漏洞披露时间
- 核对依据：https://github.com/CVEProject/cvelistV5/blob/main/cves/2026/2xxx/CVE-2026-2615.json
- 核对依据：https://github.com/CVEProject/cvelistV5/blob/main/cves/2026/3xxx/CVE-2026-3704.json
- 核对依据：https://github.com/CVEProject/cvelistV5/blob/main/cves/2026/3xxx/CVE-2026-3612.json
- 核对依据：https://github.com/CVEProject/cvelistV5/blob/main/cves/2026/3xxx/CVE-2026-3613.json
- 核对依据：https://github.com/Wlz1112/Wavlink-NU516U1-V251208-/blob/main/singlePortForwardDelete.md
- 核对依据：https://github.com/Wlz1112/Wavlink-NU516U1-V251208-/blob/main/wavlink_DMZ.md
- 核对依据：https://github.com/Wlz1112/WAVLINK-NU516-V240425/blob/main/firmware_url.md
- 核对依据：https://github.com/Wlz1112/WAVLINK-NU516-V240425/blob/main/ipaddr_Stack%20Buffer%20Overflow.md

- 固定汇编来源（仅固定所读版本，不代替原作者出处）：https://github.com/Mr-xn/Penetration_Testing_POC/blob/f33600e512f2ff654ec335102daf23b8a5218d24/iot/WAVLINK-NU516-V251208%26V240425%E6%BC%8F%E6%B4%9E%E6%8C%96%E6%8E%98.md
