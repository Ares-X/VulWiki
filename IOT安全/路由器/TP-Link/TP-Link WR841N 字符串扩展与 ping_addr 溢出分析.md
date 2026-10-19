---
schema_version: "1"
prerequisites: "管理界面可达且有效认证会话；ROOT 路径变量与来源固件对应"
side_effects: "服务崩溃与控制流破坏；仿真准备修改环境并关闭部分安全检查"
id: "VW-20261019-MRXN-099"
title: "TP-Link WR841N 字符串扩展与 ping_addr 溢出分析"
product: "TP-Link TL-WR841N"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "needs-review"
primary_identifiers: "CVE-2020-8423"
referenced_identifiers: "CVE-2022-30024; CVE-2022-24355"
identifier_status: "active"
version: "3.16.9 Build150310 v10"
source: "大中午啊"
source_status: "recorded"
source_url: "https://www.iotsec-zone.com/article/221"
review_date: "2026-10-19"
---

# TP-Link WR841N 字符串扩展与 ping_addr 溢出分析

## 两条可对应的历史问题

来源研究 TL-WR841N V10、3.16.9 Build150310。第一条是 Wi-Fi 配置 ssid 到 writepageParamSet/stringModify：转义和换行转换会扩展输出，但目标缓冲区没有按扩展后长度校验。[CNA8423](https://www.cve.org/CVERecord?id=CVE-2020-8423)确认该型号、版本及已认证攻击条件。

第二条为 /userRpm/PingIframeRpm.htm 的 ping_addr 经 isAddrDispose 复制到52字节局部缓冲区，循环上限取输入长度，未约束目标容量。[CNA30024](https://www.cve.org/CVERecord?id=CVE-2022-30024)明确包含V10_150310及指定V11/V12版本，同样要求认证。本篇只将来源实际分析的V10作为实验范围。原文结尾写CVE-2022-3024是与主体不一致的错号，不建立新映射。

## 不可混并的第三条与疑似点

原文还把 loginFs/httpRpmFs 文件扩展名向低地址扫描的问题标为CVE-2022-24355；但[ZDI CNA](https://www.cve.org/CVERecord?id=CVE-2022-24355)明确对象为 TL-WR940N 3.20.1 Build200316 Rel.34392n(5553)，不是本篇WR841N。相似代码不足以证明CVE范围相同，此处仅记为来源比较对象。作者另提ssid strncpy疑似问题，未验证，不能计为第四个已确认漏洞。

## 可核验的公开触发材料

已完整阅读 CNA 链接的[原发现者 Gianluca Pacchiella 研究](https://ktln2.org/2020/03/29/exploiting-mips-router/)（2020-03-29，页面680行）。其 PoC 段有完整 curl 请求结构，带 Cookie Authorization 与 ROOT 路径变量，访问 /userRpm/popupSiteSurveyRpm_AP.htm；mode=1000、curRegion=1000、chanWidth=100、channel=1000，ssid 由公开 Python 表达式生成重复转义序列及完整模式串。原文给出模式串、崩溃寄存器及后续 ROP 分析，本文不复制或改进该载荷。ROOT 与 BASE 仍须来自合法实验会话。

该原研究所有可见代码已静态读取：QEMU 自编内核、端口转发、chroot和/proc挂载，LD_PRELOAD hook 拦截 system/fork，SSH示例关闭主机密钥检查，ROP依赖固定映射及可执行栈。这些是实验条件及风险，并非真实设备默认状态的一致性证明；未取得或运行其外部二进制。其反连 shellcode 尝试失败也保留为失败事实。

CVE-2022-30024 的 CNA 引用 Pastebin 正文已完整阅读，只是摘要，没有补足请求。故其编号作为相关分析线索保留，不列本篇主编号；本次独立收录的具体触发材料门槛由8423的公开原始PoC满足。

## 公开证据边界

来源有具体函数、参数、路径和输入扩展过程，关键反编译与请求细节主要在图片中，未核验像素；不提供自行拼造的成品PoC。上述请求可能使服务崩溃或控制流被改变，不能当作只读检查。来源引用的 Viettel 外链本轮返回空正文；另行读取的 ktln2 原发现者正文和CNA记录如上，不混称为同一页面。

## 来源与审阅范围

作者：大中午啊；[原文](https://www.iotsec-zone.com/article/221)。固定归档：[Mr-xn/Penetration_Testing_POC](https://github.com/Mr-xn/Penetration_Testing_POC/blob/f33600e512f2ff654ec335102daf23b8a5218d24/iot/TP-Link%20WR841n%20%E8%B7%AF%E7%94%B1%E5%99%A8%E5%A4%9A%E4%B8%AA%E7%BC%93%E5%86%B2%E5%8C%BA%E6%BA%A2%E5%87%BA%E6%BC%8F%E6%B4%9E%E5%A4%8D%E7%8E%B0.md)。来源日期：unknown。本次属于2026-10-12至19日新增汇编材料，不代表本周首次披露。原文授权未明确，本文为独立中文技术摘要，完整样例保留在固定来源，未改写或脱敏原文。

已全文审阅固定 Markdown 及其中代码、命令、请求；图片未逐图检查。未执行、安装、下载固件或访问示例目标。源目录只有 Markdown，无该文章配套安装清单；汇编工作流及 README 更新程序的静态范围见本轮审计，外部工具、固件及依赖没有获得执行安全背书。
