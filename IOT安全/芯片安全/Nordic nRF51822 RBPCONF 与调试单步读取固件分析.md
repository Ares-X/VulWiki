---
schema_version: "1"
id: "VW-20261019-MRXN-165"
title: "Nordic nRF51822 RBPCONF 与调试单步读取固件分析"
product: "Nordic nRF51822-QFAA"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "needs-review"
version: "nRF51822-QFAA build H0；256KB Flash、16KB RAM；应用固件版本未知"
prerequisites: "物理SWD访问；仍能halt、改寄存器和单步；原固件内存在适用LDR指令"
side_effects: "reset halt中断业务；改PC和寄存器并执行原固件指令；本地firmware.bin被创建或覆盖"
source: "Question；Mr-xn固定提交转载"
source_status: "recorded"
source_url: "https://www.iotsec-zone.com/article/156"
archive_commit: "f33600e512f2ff654ec335102daf23b8a5218d24"
review_date: "2026-10-19"
---

# Nordic nRF51822 RBPCONF 与调试单步读取固件分析

## 样本与证据

原题为“提取共享单车固件”，但品牌、整车型号和应用版本没有可靠标识。本页只以OpenOCD日志明确识别出的nRF51822-QFAA build H0为对象，不宣称某共享单车品牌普遍受影响。

日志记录`RBPCONF`地址`0x10001004`的值为`0xffff00ff`，并能通过SWD停止CPU及查看寄存器。Nordic nRF51参考手册区分调试器直接读回保护和CPU自身取指/访问规则，支持解释“直接读内存受限”不等于所有内部执行途径均被封锁；不能把nRF51的RBPCONF与nRF52的APPROTECT当成同一机制。

## 指令复用及失败边界

来源逐步日志定位到样本固件`0x000006dc`处的加载行为，单步后R3由地址变成该地址的内容，再把PC和R3设回所需状态逐字读取。脚本从0到`0x40000`按4字节递增，写出256KiB文件，与日志容量对应。此地址是该固件的gadget，不能直接套到其他固件；仅从芯片名称无法保证指令位置、调试权限和可读区域相同。

内嵌Python使用pwntools和re，连接本机OpenOCD的`127.0.0.1:4444`，发送reset halt、寄存器修改与step命令，并将解析结果写入firmware.bin。这里的本地telnet控制端口不是远程路由器后门。代码没有额外上传或下载，但对提示符、返回值和正则匹配的假设较强，未实现充分错误校验；不能据脚本存在断言每字正确。OpenOCD日志版本为0.11.0开发构建，J-Link、GDB与pwntools的完整依赖链未审计或执行。

手动调试会停止设备业务，并非“只读且无副作用”。未确认厂商修复版本；保护能力应结合具体芯片修订、代码分区和调试策略核对。本页保留方法参考价值，不将未知品牌或未知修复情况填成“全版本”。

## 来源

- [Question原文](https://www.iotsec-zone.com/article/156)：日志、固件特定地址及提取脚本
- [Nordic nRF51参考手册](https://docs-be.nordicsemi.com/bundle/nRF51-Series/raw/resource/enus/nRF51_RM_v3.0.pdf)：UICR及MPU读回保护语义

## 审阅与使用边界

本页为原创中文资料摘要，记录历史研究，不是2026年新披露。来源中的完整请求、脚本、公开测试值和图片仍保留在固定提交的原文中，本页没有改写或脱敏原始文件。仅作静态文字审阅；未运行PoC、扫描器、安装器或固件，未访问示例目标，未独立复现，未查看原文图片像素。原作者授权未确认，不把汇编仓库的Apache-2.0许可证当作转载正文或外部工具的授权。

固定来源的iot目录为Markdown资料，未附本文专用安装器、依赖清单或工作流。汇编仓库的RSS更新工作流和脚本已有独立静态审阅：使用未锁定版本的Python依赖、可写仓库权限及外部RSS输入，不能因此宣称整个仓库或外链供应链安全。本摘要不导入可执行组件。

[本次固定提交原文](https://github.com/Mr-xn/Penetration_Testing_POC/blob/f33600e512f2ff654ec335102daf23b8a5218d24/iot/提取共享单车固件.md)
