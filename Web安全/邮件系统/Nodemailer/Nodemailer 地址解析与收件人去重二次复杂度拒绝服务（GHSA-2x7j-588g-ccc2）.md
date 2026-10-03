---
schema_version: "1"
id: "VW-20261003-nodemailer-address-complexity"
title: "Nodemailer 地址解析与收件人去重二次复杂度拒绝服务（GHSA-2x7j-588g-ccc2）"
product: "Nodemailer"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "active"
primary_identifiers: "GHSA-2x7j-588g-ccc2"
referenced_identifiers: "CVE-2025-14874"
identifier_status: "active"
version: "<9.1.0；不可信内容须能到达地址解析或收件人转换路径"
fixed_version: "9.1.0"
prerequisites: "应用把不可信地址列表传给 addressparser 或 MimeNode 的结构化地址处理；应用级认证和长度限制取决于集成；直接解析无需 SMTP 服务或接收者配合"
side_effects: "同步 CPU 与临时数组分配消耗可阻塞 Node.js 事件循环；真实 SMTP 发送路径还可能发信，不能将整个 sendMail 流程称作只读；本轮未运行任何 PoC"
source: "e1abrador；Nodemailer 官方安全公告、修复与回归测试；先知社区为本轮发现线索"
source_status: "recorded"
source_url: "https://github.com/nodemailer/nodemailer/security/advisories/GHSA-2x7j-588g-ccc2"
verification_source: "https://github.com/nodemailer/nodemailer/commit/34da64282dcdc9b0581c721a27ab2fa226673150"
---

# Nodemailer 地址解析与收件人去重二次复杂度拒绝服务

本篇是历史补缺。`9.1.0` 于 **2026-08-31** 发布，仓库 GHSA 于 **2026-09-01** 发布，GitHub Advisory Database 于 **2026-09-08** 收录；本轮通过 9 月 20 日的中文分析线索发现缺口，于 **2026-10-03** 回溯核对。没有将转载日期当成漏洞首次披露日期。

已核对官方公告、固定补丁和回归测试文本；未安装依赖、未运行压力输入、未发送邮件。公告中的时间测量属于原作者结果。

## 影响与前提

官方影响范围为 `nodemailer <9.1.0`。需要应用让不可信值到达以下路径之一：直接导出的 `nodemailer/lib/addressparser`，或者 `MimeNode` 对 `To`、`Cc`、`Bcc`、`From`、`Reply-To` 等结构化地址的处理。发送、邀请、联系人导入、地址校验等功能是否可被匿名访问，应按应用自己的权限和输入边界判断。

问题发生在本地同步解析阶段，不依赖 SMTP 对端响应。没有接收者配合，也不代表任意安装了 Nodemailer 的主机都能从网络直接触发。本篇不把它与 **CVE-2025-14874** 的递归深度问题合并：这里的原始触发输入可以是平坦地址列表，根因和修复点不同。

## 根因：不能只修一处 concat

### 1. 地址结果累加

在 `lib/addressparser/index.js` 中，逐个地址处理后反复用 `concat` 创建累加结果。每次都复制已积累内容，因此地址数增加时出现 `1 + 2 + … + n` 的累计复制工作。官方提交 `9116da9528c6524cefaed75185602a7e85d20434` 改为原地追加；同一提交还处理显示名片段合并循环里的逐项 `splice`。

### 2. 唯一收件人去重

`MimeNode#_convertAddresses` 曾对每个地址线性查重。**重复同一地址的 PoC 不能充分覆盖这条路径**：它最终只保留一个信封收件人，而许多不同收件人才会放大唯一列表中的重复扫描。修复提交 `7cc38af418ffa6fc7e86085195ca5ca681694b3e` 使用集合改善这一点。

随后提交 `34da64282dcdc9b0581c721a27ab2fa226673150` 又把集合生命周期移至调用者，跨多个地址头共享。若每次处理头部都从已积累列表重建集合，很多单收件人头仍会形成“头数 × 收件人数”的成本。该提交分别调整 `setEnvelope`、`getAddresses`、`getEnvelope`，并增加跨大量头部的回归测试。只挑第一块地址解析修复回移，不能等价于完整 `9.1.0` 修复。

### 3. 参数数量限制与显式边界

官方公告另列 `83b8c48cbdb8b3116f2e1ba84af755b2c5661c0f` 对 `[].concat.apply` 大量参数导致 `RangeError` 的修正，以及 `7279ac8dee4f66c032981e6e51e3e7210ad0dcbf` 引入的 `maxRecipients`。首修复版本默认限制去重后的总收件人为 `100000`，超过时返回 `EMAXRECIPIENTS`，**不是静默截断**。这项检查发生在信封构造后、连接前，并非对原始输入的前置长度检查，不能单独替代复杂度修复。应用升级后应处理这个错误，避免把修复后的拒绝行为误判为数据丢失或新漏洞。

## 公开复现资料的证据范围

完整 `poc-dos.js` 和公开 API 示例见官方 GHSA，代码保留在原始出处，不在此重写。原作者使用 Node.js ≥18 与 `nodemailer@9.0.6`，对递增数量的相同地址列表进行同步计时。公告报告 200,000 个地址约 1.53 MB、耗时约 25–30 秒，而修复后约 80 毫秒；这些值依赖硬件、运行时及输入形态，不是本库的保证。

判断修复需要分开保留的对照：

1. 同地址重复列表，观察累加器的时间增长
2. 带显示名片段的列表，覆盖显示名合并路径
3. 大量不同地址，覆盖收件人查重
4. 收件人分散到大量地址头，覆盖集合是否跨调用复用
5. 触达和超过 `maxRecipients` 的边界，确认错误被应用正确处理

只证明“没有栈溢出”不能推出二次复杂度已消除；只证明“重复地址解析快了”也不能推出不同收件人的信封构造已修复。受影响版本与修复版本应在相同隔离资源预算下作对照，记录超时、峰值内存、失败与实际输出。

## 副作用、反投毒与验证状态

CPU 和内存分配消耗会阻塞同一 Node.js 进程内其他工作，不应对生产接口作性能实验。GHSA 的直接解析示例不需要网络，其 `jsonTransport` 示例也不能被替换成真实 SMTP 传输后仍叫“无发信副作用”。如果另行授权实验，应选择单独进程并限制运行时间和资源，结束后移除临时工作目录及测试输入；本轮没有做这些实验。

静态审阅覆盖官方 GHSA 的 PoC、上述修复差异与对应回归测试，未在已审文本中看到无关凭据搜集、外传、持久化、远程下载或混淆。该结论不覆盖整个历史仓库或任意安装包。未执行 npm 安装或候选代码，不能据此声称 npm 生命周期及所有传递依赖已经验证。

## 修复与来源

升级至 `9.1.0` 或包含全部修复的后续受支持版本。长度与收件人数量限制可降低暴露面，但只做 API 限流不能消除一次同步解析造成的长时间阻塞。

- [官方 GHSA](https://github.com/nodemailer/nodemailer/security/advisories/GHSA-2x7j-588g-ccc2)：报告人 e1abrador；仓库公告 2026-09-01 发布，支持原始复现、影响及后来补充的修复范围；[数据库记录](https://github.com/advisories/GHSA-2x7j-588g-ccc2)于 2026-09-08 收录
- [地址解析补丁](https://github.com/nodemailer/nodemailer/commit/9116da9528c6524cefaed75185602a7e85d20434)、[唯一地址去重补丁](https://github.com/nodemailer/nodemailer/commit/7cc38af418ffa6fc7e86085195ca5ca681694b3e)、[跨头复用集合补丁](https://github.com/nodemailer/nodemailer/commit/34da64282dcdc9b0581c721a27ab2fa226673150)：分别支持上述不同复杂度路径
- [避免参数展开补丁](https://github.com/nodemailer/nodemailer/commit/83b8c48cbdb8b3116f2e1ba84af755b2c5661c0f)、[收件人上限补丁](https://github.com/nodemailer/nodemailer/commit/7279ac8dee4f66c032981e6e51e3e7210ad0dcbf)：支持参数上限异常和连接前检查的区别；后者集成测试会监听本地 SMTP 服务，本轮只审文本、未执行
- [v9.1.0 发布](https://github.com/nodemailer/nodemailer/releases/tag/v9.1.0)与[固定发布源码](https://github.com/nodemailer/nodemailer/tree/efd6e29c10c6e0c25c57bd2f2a71302838235a4f)：支持首修复版本与实际发布内容
- [先知社区线索](https://xz.aliyun.com/news/92860)：北斗，2026-09-20 03:08:10；本轮只获取官方 feed 的标题、日期与摘要，文章正文返回挑战页，没有将摘要当作全文审阅
- 许可：固定源码的 `LICENSE` 与发布版 `package.json` 为 MIT-0；GitHub 元数据的 `NOASSERTION` 不代表没有许可。本文为原创归纳，没有搬运第三方教程全文
- 核对日期：2026-10-03；未本地复现；本库未找到相同产品和上述根因的既有主文
