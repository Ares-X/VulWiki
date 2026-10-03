---
schema_version: "1"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "active"
identifier_status: "unknown"
source_status: "recorded"
id: "VW-20261003-lean-raw-extract"
title: "Lean超大字符串切片的语义错配与引用计数缺陷"
product: "Lean 4"
version: "研究者声明稳定版截至4.33.1受影响；原始报告列4.32.2与4.33.0-rc2；按固定提交区分两次修复"
fixed_version: "4.34.0-rc1包含两项修复；UAF单独修复4c29de6f，语义修复f7f5b4cd"
prerequisites: "执行调用String.Pos.Raw.extract并使用超大Nat位置的Lean程序；证明场景还需native_decide把原生求值加入可信边界"
side_effects: "逻辑定义与原生求值结果不一致；借用对象引用计数错误可产生use-after-free及数据误别名；不据此推定远程代码执行"
source: "Marc Ilunga / Trail of Bits；Lean原始issue、维护者修补与验证文档"
source_url: "https://blog.trailofbits.com/2026/09/09/a-proof-of-fermats-last-theorem-that-fits-the-margin/"
verification_source: "https://github.com/leanprover/lean4/issues/14684; https://github.com/leanprover/lean4/commit/4c29de6f2cb93ffdabd2838c1eed6f55061bb605; https://github.com/leanprover/lean4/commit/f7f5b4cda9b33387b512b84ea179461881b12500"
---

# Lean 超大字符串切片的语义错配与引用计数缺陷

`String.Pos.Raw.extract` 的一个早退分支同时违反了两种契约：结果应符合字符串切片语义，返回对象也应具有正确所有权。修复引用计数不自动修复逻辑错配，反过来也一样。本篇依据原始 issue 与两次维护者补丁作中文分析，不把研究中的“费马证明”演示解释成 Lean 核心逻辑已被推翻。

## 影响范围与输入条件

Marc Ilunga 的 [issue #14684](https://github.com/leanprover/lean4/issues/14684)发表于 2026-08-05，列出的观察版本包括 Lean `4.32.2`（`f3b06c705e6c85f5314019d5d3baab0fec5b580c`）和 `4.33.0-rc2`。9 月 9 日 Trail of Bits 文章进一步称稳定版截至 `4.33.1` 受影响，修补进入 `4.34.0-rc1`。这些范围各有来源，不能由一次源码比较推成逐版本实验结果。

入口是处理超大 `Nat` 切片位置的 Lean 程序，而非一个天然暴露到网络的服务。普通切片、仅类型检查的证明，以及使用原生求值的证明，应分别考虑。本轮未核到对应 CVE，不伪造编号。

## 原始实现为何给出两个不同答案

[固定 Lean 定义](https://github.com/leanprover/lean4/blob/f3b06c705e6c85f5314019d5d3baab0fec5b580c/src/Init/Data/String/Basic.lean#L3012-L3022)与[原生实现](https://github.com/leanprover/lean4/blob/f3b06c705e6c85f5314019d5d3baab0fec5b580c/src/runtime/object.cpp#L2373-L2394)对超大位置的处理不同。

Lean 的逻辑定义按切片边界得到结果：起点在串尾之后应为空串；起点有效、终点极大时应只取余下部分。C++ 的 `lean_string_utf8_extract` 却在 `b0` 或 `e0` 不是 scalar 时直接返回整个 `s`，绕过正常边界处理。超大整数的表示形式在这里被错误地当成“返回原串”的语义条件。

原始报告的 `marginStart` 和 `marginEnd` 为 `⟨2^63⟩`、`⟨2^63 + 1⟩`；逻辑化简得到空串，原生求值得到原串。`native_decide` 让这个不一致进入额外公理，从而构造矛盾。需要保留的界限是：该示例依赖 `_native` 公理及原生求值可信边界，不是一个只依靠普通内核证明规则的健全性反例。

## 同一分支中的独立所有权问题

`lean_string_utf8_extract` 的 `s` 是借用参数（`b_obj_arg`），返回值是拥有所有权的对象（`obj_res`）。直接返回同一指针时如果没有 `lean_inc(s)`，调用者后续释放计数可能使另一个仍在使用的引用失效。

维护者在 2026-08-05 的[第一份补丁](https://github.com/leanprover/lean4/commit/4c29de6f2cb93ffdabd2838c1eed6f55061bb605)中只增加 `lean_inc(s)`；提交说明明确语义错配仍保留。其测试构造字符串、保留切片结果，再分配替代字符串，观察是否发生误别名。加入引用计数后不会因此自动得到正确子串，因为早退仍返回整个原字符串。

2026-08-10 的[第二份补丁](https://github.com/leanprover/lean4/commit/f7f5b4cda9b33387b512b84ea179461881b12500)把非 scalar 位置映射为 `SIZE_MAX`，随后使用与边界语义一致的处理。同时为携带有效位置类型的 `String.extract` 单设 `lean_string_utf8_extract_fast`；快路径的前提与低层 Raw API 不应混为一谈。

回归文件的预期输出从第一补丁的 `0-heap-padding|A-heap-padding` 变为第二补丁的 `0-heap-padding|-heap-padding`。这一差异直观对应“已经不悬空”和“同时正确切掉首字节”两个阶段，不能把第一版输出当作最终正确语义。

## 版本与证明验证

[4.34.0-rc1](https://github.com/leanprover/lean4/releases/tag/v4.34.0-rc1)发布于 2026-08-10，固定提交为 `3447a668783dbce1a8fdb97101dd067687b2b418`；[该版本 runtime](https://github.com/leanprover/lean4/blob/3447a668783dbce1a8fdb97101dd067687b2b418/src/runtime/object.cpp#L2383-L2415)含第二阶段修补。此处保留 `rc1` 身份，不将候选发行冒称同日稳定版。

[Lean 官方验证说明](https://lean-lang.org/doc/reference/latest/ValidatingProofs/)强调核查依赖的公理以及合适的独立验证路径。修复切片实现与审阅一份外部证明所信任的原生求值，是不同的保证；仅看到编辑器蓝色勾选不能替代后者。

## 来源与静态审查

- [Marc Ilunga / Trail of Bits，2026-09-09](https://blog.trailofbits.com/2026/09/09/a-proof-of-fermats-last-theorem-that-fits-the-margin/)：研究背景、披露概述与范围声明
- [原始 issue #14684](https://github.com/leanprover/lean4/issues/14684)：两种问题、原作者观察环境、示例与实际结果
- [UAF 修补](https://github.com/leanprover/lean4/commit/4c29de6f2cb93ffdabd2838c1eed6f55061bb605)、[语义修补](https://github.com/leanprover/lean4/commit/f7f5b4cda9b33387b512b84ea179461881b12500)：最终控制流、引用计数及测试差异
- [固定 Apache-2.0 LICENSE](https://github.com/leanprover/lean4/blob/f7f5b4cda9b33387b512b84ea179461881b12500/LICENSE)：产品源码许可，不代表 Trail of Bits 博客许可

静态阅读了两份完整补丁、`extract_uaf.lean`、其 `init.sh`、预期结果和新增字符串测试。所选测试仅构造字符串/数组并输出，`init.sh` 只有 `TEST_ARGS=( A )`；未见无关出网、下载执行或持久化。这些提交没有新增工作流或依赖清单；整个 Lean 构建系统不在本次审查范围。核对日期：2026-10-03。本篇为多来源原创归纳，没有整篇翻译或复制截图。
