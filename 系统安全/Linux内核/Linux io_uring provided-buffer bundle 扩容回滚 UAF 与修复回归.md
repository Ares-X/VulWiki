---
schema_version: "1"
id: "VW-20261102-LINUX-BUNDLE-GROW"
title: "Linux io_uring provided-buffer bundle 扩容回滚 UAF 与修复回归"
product: "Linux kernel io_uring"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "active"
version: "原论文及本轮源码对照为 Linux v7.2-rc1；引入提交46800585ae04863c623b1563b03d12e9381089f1；不据此推定所有旧版本"
fixed_version: "原错误路径修复cd053d788c3f13b3eaf16672d427ee828fda16ed；其引入的回归另需f1596ba3e6b390aa0fef8466afce44efecf39d8d；发行版版本另核"
prerequisites: "本地进程可用 io_uring provided-buffer bundle、user keyring、SysV消息队列及/tmp文件扩展属性；公开提权链依赖固定x86-64内核偏移、分配器布局和配置"
side_effects: "内核UAF/双重释放、内存泄露、凭据破坏、系统崩溃；代码清理进程keyring、写/tmp/xa扩展属性、成功时启动交互root shell并永久暂停父进程"
source: "Hao-Yu Yang、Yu-Ting Lin；Jens Axboe；Jaeyeong Lee；Breno Leitao"
source_status: "recorded"
source_url: "https://arxiv.org/abs/2609.37608v1"
archive_commit: "f1596ba3e6b390aa0fef8466afce44efecf39d8d"
---

# Linux io_uring provided-buffer bundle 扩容回滚 UAF 与修复回归

本条整理《Harvest Season for SLUB》论文的第二个漏洞与公开利用代码，并补充论文没有完整交代的后续修复回归。它不是 CVE-2026-23275 的 ring resize 竞态，不将两个漏洞套用同一编号。本轮未取得可准确对应本问题的 CNA/CVE 编号，故按产品、固定源码和补丁链记录，不猜编号。

## 版本和根因核对

论文原文第 3 节引用 **Linux v7.2-rc1** 的 `io_uring/net.c`、`io_uring/kbuf.c`；本轮下载该 tag 的 `kbuf.c` 并核对完整相关函数，与首次修复前固定父提交 `58481c749c976e81bef9a540e2225ddb021daaa6` 的对应内容一致。中文转载把这一节若干引用改成 v6.19.3，不能据此宣称该版本已获验证。引入点依据上游修复的 `Fixes`，为 `46800585ae04863c623b1563b03d12e9381089f1`；完整历史分支和发行版回移范围没有在本条扩张。

当 `IORING_OP_SEND` 使用 provided-buffer selection 与 bundle 模式，已有缓存 iovec 数组可能需要扩容。旧实现先释放缓存数组，再逐个 `access_ok()` 检查新缓冲地址。一旦遇到非法地址返回错误，上层 `kmsg` 没有获得新指针，仍持有已释放的旧 iovec；后续使用或清理形成 UAF / 双重释放。

## 公开 EXP 与具体前提

[原作者完整源码页](https://hackmd.io/epHcDaB_Tr6RZWmLobJY0g?view#vulnerability-2-exploit)的 `vulnerability 2 exploit` 是完整 C 程序，不只是伪代码。关键触发顺序是先用有效的 provided buffers 建立缓存 iovec，再发布更多 buffers 迫使扩容，同时安排一个无法通过 `access_ok()` 的地址。源码随后利用 user-key payload、io_uring context、扩展属性暂存和 SysV 消息对象构造泄露与凭据写入。

这份代码的网络对象是本地 `AF_UNIX` socketpair，不是远程网络入侵；本地普通用户是否可达仍受 io_uring、keyring、扩展属性及 IPC 策略约束。程序把执行绑定到 CPU 0，并使用固定的内核符号偏移、`task_struct` 凭据偏移和 x86-64 地址区间。这些条件不能被省略为“所有 Linux 一键 root”。作者论文列出的 KASLR、KPTI、SMAP、SMEP 和 SLAB freelist 防护是其测试环境描述，不是对任意发行版配置的普遍绕过认证。

本条只审阅这个普通 bundle EXP，未把页面另外的 `vulnerability 2 exploit via technique 3` 当成同一份完成审阅的材料；后者涉及不同的 RCU-sheaf 路线，需独立核查。

## 关键纠正：第一个补丁并不是完整修复终点

1. [引入地址验证的提交](https://github.com/torvalds/linux/commit/46800585ae04863c623b1563b03d12e9381089f1)新增错误返回路径，却未正确协调旧缓存 iovec 的所有权。
2. [首次修复 `cd053d788c3f13b3eaf16672d427ee828fda16ed`](https://github.com/torvalds/linux/commit/cd053d788c3f13b3eaf16672d427ee828fda16ed)将释放延后到验证循环之后，避免原错误路径提前释放旧数组；但实际释放参数仍是 `arg->iovs`。扩容后它已指向新数组，不扩容时它也可能是仍需使用的缓存数组。
3. [后续修复 `f1596ba3e6b390aa0fef8466afce44efecf39d8d`](https://github.com/torvalds/linux/commit/f1596ba3e6b390aa0fef8466afce44efecf39d8d)明确指出上述回归，改为只在实际替换数组且具有释放所有权时释放保存的旧指针 `org_iovs`。提交作者为 Jaeyeong Lee，提交者 Jens Axboe，于 2026-07-14 合入其树。

Breno Leitao 的[独立补丁报告](https://lore.gnuweeb.org/io-uring/20260713-io_uring_dangling-v1-1-b9bdc0f0e776%40debian.org/)也记载了新数组被释放后由 `io_recv` 使用的 KASAN 错误，指出 liburing `recv-bundle-short-ooo` 测试能触发该回归。这是与原错误输入链不同的后续问题，不能把原 EXP 的提权结果自动赋给回归。

论文写“2026-07-12 修复合入并发布”，但只链接首次修复。单凭存在 `cd053d788` 不能宣称完整问题已解决；应核对后续修复和发行版回移。本条没有将任何未核对的发行版版本写成已修复。

## 静态反投毒与副作用

完整人工读取了 `vulnerability 2 exploit` 的所有 C 源码，以及引入、首次修复和回归修复的差异、相关函数；只读下载，未编译、执行或安装。该代码为独立 C 程序，仅使用 libc / Linux 系统接口，没有配套依赖清单、安装脚本、下载器或工作流。未见远程外传、扫描其他主机或隐蔽下载行为，但以下危险行为是源码明确包含的利用步骤，不能描述为无害检测：

- 清理当前进程 keyring、批量分配内核对象，并使用固定用户映射；失败重试会通过 `/proc/self/exe` 重新启动，另有 `/tmp/e` 回退。
- 创建 `/tmp/xa` 并设置 `user.a` 扩展属性，操控消息队列和内核凭据；资源清理并不全面。
- 成功判断为有效 UID 为 0 后，启动 `/bin/sh -i`。父进程永久 `pause()`；源码注释明确说明让父进程继续退出会导致 panic。这是严重的内核状态破坏风险，不是稳定或生产可用的提权保证。

没有对来源程序进行参数优化、移植或改造。其他 sheaf 演示、测试内核驱动、视频及完整内核供应链不在此份代码审阅范围内，静态检查不是安全认证。

## 日期、许可与来源

作者报告发现于 2026-07-03、7 月向上游报告；原始邮件实际显示 v1 于 7 月 5 日 UTC 发出、v2 于 7 月 6 日 UTC 发出。论文 v1 于 2026-09-29 上传，PDF 首页日期 8 月 13 日；本轮通过 10 月 28 日中文转载发现并于 11 月 2 日整理。这是有后续纠错的历史研究补档，不是 10 月新披露零日。

原论文作者 Hao-Yu Yang、Yu-Ting Lin，arXiv 明示 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)。本条为原创中文综述而非逐句翻译。独立 HackMD 代码许可未明，仅链接不复制整份源码；原始字节校验身份如下。页面不是固定 Git 提交，变更后需重审。

- [论文固定 v1](https://arxiv.org/abs/2609.37608v1)
- [原始 v1 修复邮件](https://lists.openwall.net/linux-kernel/2026/07/05/743)
- [原始 v2 接受回执](https://lists.openwall.net/linux-kernel/2026/07/07/56)
- [完整公开 EXP](https://hackmd.io/epHcDaB_Tr6RZWmLobJY0g?view#vulnerability-2-exploit)

完整页面 SHA-256：`5b3328a03b97aa134b85aa5fd83fdc4f0dc388852f575de231b25eb4fb08cef9`；本节 C 代码块 SHA-256：`7c0f8f9d2e4fb7a9f8a861ee9bef1614bafdbf832266431aba5219add432cc69`。
