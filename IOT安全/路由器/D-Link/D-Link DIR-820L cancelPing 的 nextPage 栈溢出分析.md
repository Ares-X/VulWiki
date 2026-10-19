---
schema_version: "1"
id: "VW-20261019-MRXN-136"
title: "D-Link DIR-820L cancelPing 的 nextPage 栈溢出分析"
product: "D-Link DIR-820L A1"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "needs-review"
identifier_candidates: "CVE-2022-34973"
identifier_role: "unknown"
identifier_status: "unknown"
version: "DIR820LA1_FW106B02（来源实验）"
prerequisites: "ping.ccp 管理接口可达；来源先进入管理页面，请求带 xxid 和 hasLogin Cookie；无认证条件未证实"
side_effects: "超长输入可能导致管理服务崩溃、拒绝服务；原实验使用 FirmAE 仿真"
source: "庄周恋蝶蝶恋花；Mr-xn/Penetration_Testing_POC 固定提交转载"
source_status: "recorded"
source_url: "https://www.iotsec-zone.com/article/190"
archive_commit: "f33600e512f2ff654ec335102daf23b8a5218d24"
review_date: "2026-10-19"
---

# D-Link DIR-820L cancelPing 的 nextPage 栈溢出分析

本文为公开研究的原创摘要，仅作文字和请求结构核对，未发送请求或运行仿真。来源属于历史研究，收录增量不代表新漏洞披露。

编号待核：CVE-2022-34973 的公开描述与本文型号、固件、ping.ccp 和 nextPage 对应，但原文没有标注编号，原始报告对应尚未核实。因此目前只登记候选编号，不作为已确认主 CVE。

## 触发条件和根因

作者从 DIR820LA1_FW105b02 的既有命令注入分析转向 FW106B02。原文明确说明没有找到新版 `hasInjectionString` 的命令注入绕过，后续发现的是另一种内存破坏，不能合并为补丁绕过成功。

正文将问题定位到 `sub_49F280`：通过 `get_entry_value_by_name` 获取 `nextPage`，再由 `strcpy` 复制到栈变量，未展示长度边界检查。`ccp_act=cancelPing` 选择该处理分支，对应管理页面为 `tools_vct.asp`。

原文提供的完整 HTTP 示例满足以下结构：

- POST `/ping.ccp`
- 表单类型 `application/x-www-form-urlencoded`
- 表单内容为 `ccp_act=cancelPing&nextPage=` 后接 17028 个小写 `a`
- 本次按归档文本核对表单总长为17056字节，与原 Content-Length 相符
- 请求包含 `xxid` 和 `hasLogin=1` Cookie；正文叙述先进入管理页面，不能仅凭漏洞名称推导未认证触发

[固定归档保留完整请求及原始示例值](https://github.com/Mr-xn/Penetration_Testing_POC/blob/f33600e512f2ff654ec335102daf23b8a5218d24/iot/从看%3C漏洞复现到简单0day漏洞挖%3E后的简单0day挖掘.md)。原文在各请求头之间插入空白行，这种展示形式不能直接视为规范线上报文；本页给出字段对应，不声称原样复制即可重放。

## 证据限制

作者称发送后路由器崩溃，不能继续处理请求，并称已报告厂商。其正文没有提供稳定代码执行链、修复公告或完整认证状态对照。对应图片尚未查看像素；本次不将截图描述升级为独立验证。

现有 VulWiki 的 DIR-619L/605L `nextPage` 文章属于不同型号及函数路径，不能仅凭同名参数将本篇合并。DIR-820L 其他固件的 ping_addr 命令注入也不是本篇 cancelPing 内存溢出。

## 来源

- [庄周恋蝶蝶恋花的技术正文](https://www.iotsec-zone.com/article/190)：完整请求、版本和失败的命令注入绕过尝试；原稿授权未明确，本页采用原创归纳
- [CVE-2022-34973 记录](https://nvd.nist.gov/vuln/detail/CVE-2022-34973)：匹配型号、固件、入口与参数的候选线索；引用的历史原始报告标记为失效链接，本次未确认作者或具体分支完全相同

配套文本和文中完整请求/代码的限定静态审阅见 [来源配套审计](../../../docs/reviews/20261019-weekly/mrxn-ancillary-static-review.md)。外链固件、仿真器与工具二进制未审计；本页不分发或推荐直接运行这些组件。
