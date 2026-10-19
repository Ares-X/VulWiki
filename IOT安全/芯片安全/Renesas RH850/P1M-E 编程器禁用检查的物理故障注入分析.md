---
schema_version: "1"
id: "VW-20261019-MRXN-138"
title: "Renesas RH850/P1M-E 编程器禁用检查的物理故障注入分析"
product: "Renesas R7F701381 RH850/P1M-E"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "needs-review"
version: "芯片为R7F701381；2021 Toyota RAV4 Prime EPS样本；硅修订未知"
prerequisites: "物理持有离车研究模块，访问UART、复位及VCL引脚；样本未配置额外ID代码或密码"
side_effects: "拆除去耦电容、焊接和短时电源故障可能损坏芯片；外部看门狗干预、锁死及完全复位；固件内容被读取"
source: "heiyu；Mr-xn固定提交转载"
source_status: "recorded"
source_url: "https://www.iotsec-zone.com/article/466"
archive_commit: "f33600e512f2ff654ec335102daf23b8a5218d24"
review_date: "2026-10-19"
---

# Renesas RH850/P1M-E 编程器禁用检查的物理故障注入分析

## 样本、机制与对照

原始研究作者为Willem Melching，发表于2022-11-08，次日补充单引脚对照；heiyu为本次中文转载署名。对象是R7F701381（RH850/P1M-E），不能扩展为全部RH850或所有丰田车型。作者以拆出的EPS模块研究编程接口，本文不是远程汽车攻击结论，也没有证明SecOC被绕过。

来源显示，串行接口仍允许协商时钟与波特率，但同步阶段返回`0xDC`；跳过必要流程则返回`0xC3`。作者把故障窗口放在同步命令后的权限判断，以RP2040产生VCL电压毛刺，再通过协议按8KB/32KB块读取。价值在于区分“连接被禁用的检查”与物理接口完全失效，并保留失败对照。

作者报告首次找到参数约耗时一天，随后尝试约5至30分钟；这些不是成功率保证。2022-11-09补充指出，只扰动pin 11可以成功；只扰动pin 66可过同步但读取仍失败。因此不能把“同步返回成功”直接当成完整保护绕过，也不能把双核关系推测当成确定根因。样本没有额外ID保护，读取其他受保护区及boot ROM只是后续设想。

## 状态变化与依赖

来源电路涉及移除VCL电容、N-FET、Pico、5V USB-TTL及复位线的100欧姆上拉；这些是样本改装记录，不能作为量产板通用接线规范。强制压过看门狗会干预安全机制，电源短路、焊接和反复复位有损坏风险；绝不能把资料研究表述为在运行车辆上操作。

公开内嵌RP2040片段为UART字节匹配、延迟及GPIO脉冲，没有网络回连；完整外部Python/Pico工程及依赖未整体审计。GitHub项目根目录可见pyproject.toml和poetry.lock，但本次pyproject页面未返回正文，不据此声称安装链已审计。未确认厂商修复版本或普遍芯片范围。

## 来源

- [原始研究](https://icanhack.nl/blog/rh850-glitch/)：作者、日期、实验及单引脚对照
- [配套工程](https://github.com/I-CAN-hack/rh850-glitch)：仅核对关联关系和目录；未执行

## 审阅与使用边界

本页为原创中文资料摘要，记录历史研究，不是2026年新披露。来源中的完整请求、脚本、公开测试值和图片仍保留在固定提交的原文中，本页没有改写或脱敏原始文件。仅作静态文字审阅；未运行PoC、扫描器、安装器或固件，未访问示例目标，未独立复现，未查看原文图片像素。原作者授权未确认，不把汇编仓库的Apache-2.0许可证当作转载正文或外部工具的授权。

固定来源的iot目录为Markdown资料，未附本文专用安装器、依赖清单或工作流。汇编仓库的RSS更新工作流和脚本已有独立静态审阅：使用未锁定版本的Python依赖、可写仓库权限及外部RSS输入，不能因此宣称整个仓库或外链供应链安全。本摘要不导入可执行组件。

[本次固定提交原文](https://github.com/Mr-xn/Penetration_Testing_POC/blob/f33600e512f2ff654ec335102daf23b8a5218d24/iot/使用故障注入绕过瑞萨 RH850的读保护.md)
