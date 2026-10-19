---
schema_version: "1"
id: "VW-20261019-MRXN-139"
title: "Nordic nRF52840 APPROTECT 启动窗口电压故障研究"
product: "Nordic nRF52840"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "needs-review"
version: "来源样本nRF52840；硅修订和固件版本未知"
prerequisites: "物理连接核心电压、供电、复位和SWD；ChipWhisperer及J-Link/OpenOCD环境"
side_effects: "电压短路可能烧毁芯片、复位或锁死；dump写本地文件；后续擦除和重刷会破坏原有内容"
source: "Question；Mr-xn固定提交转载"
source_status: "recorded"
source_url: "https://www.iotsec-zone.com/article/49"
archive_commit: "f33600e512f2ff654ec335102daf23b8a5218d24"
review_date: "2026-10-19"
---

# Nordic nRF52840 APPROTECT 启动窗口电压故障研究

## 范围与保护版本

Question的文章记录在启动窗口扰动核心电压后，经SWD读取受APPROTECT保护的样本。来源没有硬件build code，不能从型号推出全部nRF52840均适用，也不能推定为最新修订。

Nordic官方资料明确区分Dxx及以前的硬件保护与Fxx及以后的硬件、软件联合保护；2022-02-05厂商说明列出nRF52840 revision 3、Fx0，要求配合MDK 8.45.0及以后版本正确设置。它证明保护机制发生变化，不是本文实验已覆盖新修订的证据。厂商正常解除保护的ERASEALL会清除flash、UICR和RAM，不能当作保留原固件的读取方法。

## 来源触发与静态判断

文章以UICR地址`0x10001208`的`0xFFFFFF00`说明启用保护，使用示波器观察启动窗口，ChipWhisperer扫描延迟和脉冲持续时间，随后调用OpenOCD观察调试访问并dump。文中的约1.699ms只是该测试板的观察，不是可迁移的固定窗口。

内嵌Python导入chipwhisperer、serial、os、time；实际通过`os.system`启动本地OpenOCD，使用J-Link、SWD和nrf52.cfg。成功分支仅依据进程返回码停止，不能单独验证镜像真实性、完整性或每个受保护区均可读。尤其示例dump长度为`0x80000`，即512KiB，不能因为标题是nRF52840就把该文件称作整个芯片的全部flash。文章还声称保护寄存器未变化但调试可用；该截图没有独立像素核验。

来源明确提醒长期对地短路可能烧毁芯片，后续“擦除再重刷以便调试”是破坏性状态变更。代码没有额外远程下载或回连，但依赖版本、USB设备权限和OpenOCD安装路径没有锁定，未安装或审计外部工具实现。原文前言“不会永久损坏”不能覆盖其后明确写出的烧毁风险。

## 来源

- [Question原文](https://www.iotsec-zone.com/article/49)：样本接线、扫描脚本和实验声明
- [Nordic调试与保护规格](https://docs.nordicsemi.com/r/bundle/ps_nrf52840/page/dif.html)：修订差异和擦除副作用
- [Nordic改进APPROTECT说明](https://devzone.nordicsemi.com/nordic/nordic-blog/b/blog/posts/working-with-the-nrf52-series-improved-approtect)：revision 3、Fx0及MDK条件

## 审阅与使用边界

本页为原创中文资料摘要，记录历史研究，不是2026年新披露。来源中的完整请求、脚本、公开测试值和图片仍保留在固定提交的原文中，本页没有改写或脱敏原始文件。仅作静态文字审阅；未运行PoC、扫描器、安装器或固件，未访问示例目标，未独立复现，未查看原文图片像素。原作者授权未确认，不把汇编仓库的Apache-2.0许可证当作转载正文或外部工具的授权。

固定来源的iot目录为Markdown资料，未附本文专用安装器、依赖清单或工作流。汇编仓库的RSS更新工作流和脚本已有独立静态审阅：使用未锁定版本的Python依赖、可写仓库权限及外部RSS输入，不能因此宣称整个仓库或外链供应链安全。本摘要不导入可执行组件。

[本次固定提交原文](https://github.com/Mr-xn/Penetration_Testing_POC/blob/f33600e512f2ff654ec335102daf23b8a5218d24/iot/侧信道电压故障注入提取nrf52840固件.md)
