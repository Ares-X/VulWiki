---
schema_version: "1"
id: "vw-mrxn-20261019-108"
title: "Tenda AC15 addressNat page 溢出的仿真记录与编号边界"
product: "Tenda AC15 httpd"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "needs-review"
version: "来源样本 US_AC15V1.0BR_V15.03.05.19_multi_TD01；CNA 所列 AC15 V15.03.05.19_CN 单列"
prerequisites: "Web 可达且请求携带 password Cookie；来源仿真基址固定；真实硬件认证及 ASLR 条件未验证"
side_effects: "长 page 输入可能中断 httpd；ROP 示例涉及命令执行与文件修改"
source: "本库原创中文整理；研究作者及原文见正文"
source_status: "recorded"
source_url: "https://www.iotsec-zone.com/article/252"
review_date: "2026-10-19"
archive_commit: "f33600e512f2ff654ec335102daf23b8a5218d24"
archive_url: "https://github.com/Mr-xn/Penetration_Testing_POC/blob/f33600e512f2ff654ec335102daf23b8a5218d24/iot/Tenda%20CVE-2018-18708%20%E6%BC%8F%E6%B4%9E%E5%A4%8D%E7%8E%B0.md"
primary_identifiers: "CVE-2018-18708"
---

# Tenda AC15 addressNat page 溢出的仿真记录与编号边界

原文提供 POST /goform/addressNat 请求的完整构造，page 使用 cyclic(0x300)，并记录返回地址相关偏移 244+4。作者将根因定位于 fromAddressNat 对 page 的栈上格式化处理。CNA 的 CVE-2018-18708 同样指向 fromAddressNat/page/sprintf，支持编号与机制对应；CNA 的 CN 构建和来源 multi_TD01 样本仍须分开记录。

既有同 CVE 题名文章的实际技术正文分析 setMacFilterCfg/deviceList，并包含不同的 MIPS 栈布局；这不是本篇 addressNat/page 分析的全文重复，不能按题名吞并。另一个 F453 候选只是型号/处理名称交集，不建立同实体关系。

作者明确说没有真实路由器，不知道硬件是否启用 ASLR。模拟器中 Cookie 任意值可行是局部观察，不能推出真实设备无认证。后续固定 libc/gadget 仅用于理解来源实验，不构造稳定通用 RCE 结论。原始 CNA 链接的研究文件本轮返回 404；可用证据为已读取 CNA 与本篇公开全文，固定修复版本未知。


## 逐项静态审计

- HTTP 构造中明确 page= 和 /goform/addressNat；既有同编号题名正文的 setMacFilterCfg/deviceList 不同。
- 源码使用固定 libc/gadget；原作者明确真实硬件 ASLR 未知，不能泛化模拟 Cookie 观察。
- 来源包含完整报文生成步骤；本轮未执行，也未修理或拼接新 ROP。

## 核验、风险与来源

长 page 输入可能中断 httpd；ROP 示例涉及命令执行与文件修改。本次仅进行公开资料与既有文库的静态文字核对，未执行请求、载荷、固件、依赖安装或扫描，也未访问示例目标。来源中的成功或失败是作者记录；截图像素本轮未审，不将其升级为本库复现。

本文为新写中文分析，不整篇复制原文章或图片。汇编库的 Apache-2.0 声明不能证明原作者文章及图片已按该许可授权。原始资料不作遮盖、替换或删除；本文没有转录为可运行脚本，也不补全来源省略的参数。

- 研究来源：z1r0，https://www.iotsec-zone.com/article/252；发布时间线索：历史2018 CVE，文章日期unknown。本次仓库收录时间不等于新漏洞披露时间
- 核对依据：https://github.com/CVEProject/cvelistV5/blob/main/cves/2018/18xxx/CVE-2018-18708.json

- 固定汇编来源（仅固定所读版本，不代替原作者出处）：https://github.com/Mr-xn/Penetration_Testing_POC/blob/f33600e512f2ff654ec335102daf23b8a5218d24/iot/Tenda%20CVE-2018-18708%20%E6%BC%8F%E6%B4%9E%E5%A4%8D%E7%8E%B0.md
