---
schema_version: "1"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "active"
source_status: "recorded"
id: "VW-20261003-BREADTH-02"
title: "Provenance marker陈旧供应量授权绕过与两阶段回归验证"
product: "Provenance Blockchain marker module"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
version: "v1.28.0 前存在零供应量路径；v1.28.0 的缓解未消除非零陈旧供应量问题"
fixed_version: "v1.28.0 缓解零值路径；v1.29.0 改为 bank 实时供应量"
prerequisites: "可提交 marker 消息的普通链账户；目标 marker 的配置状态、权限及 bank/marker 供应量关系满足缺陷条件；不应据此泛化所有 Cosmos 链"
side_effects: "公开回归用例创建测试账户与 marker、铸造和分配代币、修改 ACL；若提交真实链交易可造成不可逆权限或资产变更，本文未执行"
source: "Paweł Płatek、Denys Pakizh / Trail of Bits；provenance-io 维护者补丁与回归用例"
source_url: "https://blog.trailofbits.com/2026/08/25/state-divergence-enables-unauthorized-access/"
---

# Provenance marker陈旧供应量授权绕过与两阶段回归验证

本篇使用维护者公开回归用例作为具体验证资料，不依赖主网交易或未公开 EXP。2026-10-03 仅完成源码与差异阅读，没有编译、启动链、广播交易、访问钱包或执行测试。

## 缺陷与版本分层

Trail of Bits 于 2026-08-25 披露：marker 的授权判断将调用者余额与 marker 内保存的供应量比较，而 non-fixed marker 的实时数量由 bank 模块维护。两处状态可能分离，零余额与陈旧零供应量相等，会把无权限调用者误认作持有全部供应量者。[研究原文](https://blog.trailofbits.com/2026/08/25/state-divergence-enables-unauthorized-access/)

维护者的两个代码变化说明修复为何要分开描述：

- [c81fd65f8ad48de42d5a6d68e761a0851c7e72c4](https://github.com/provenance-io/provenance/commit/c81fd65f8ad48de42d5a6d68e761a0851c7e72c4) 在 `accountControlsAllSupply` 加入 nil/zero 拒绝条件，但仍调用 `m.GetSupply()`。同时在 `TestMsgAddAccessRequest` 增加零供应量 `papaya` marker 的拒绝用例
- [PR #2734](https://github.com/provenance-io/provenance/pull/2734/files)，合并提交 [171686801b52f46dcb07f4bbdf0fd0921b7ab8b3](https://github.com/provenance-io/provenance/commit/171686801b52f46dcb07f4bbdf0fd0921b7ab8b3)，改为 `k.bankKeeper.GetSupply(ctx, m.GetDenom())`，保留零值拒绝条件。这才让比较双方都取自实时 bank 状态

对应发行说明分别为 [v1.28.0，2026-05-01](https://github.com/provenance-io/provenance/releases/tag/v1.28.0) 与 [v1.29.0，2026-06-08](https://github.com/provenance-io/provenance/releases/tag/v1.29.0)。不要把第一阶段的零值缓解写成所有供应量状态均已正确。

## 公开可用验证材料

[固定回归文件 keeper_test.go](https://github.com/provenance-io/provenance/blob/171686801b52f46dcb07f4bbdf0fd0921b7ab8b3/x/marker/keeper/keeper_test.go) 提供三个具体测试，使用 `simapp.Setup(t)`、测试地址和本地消息服务器，可逐个检查预期；它们不是独立下载即运行的单文件 EXP，需完整对应项目环境。

### 非零陈旧供应量对照

`TestAccountControlsAllSupplyUsesLiveBankSupply` 用 `testcoin1` 创建初始数量 100 的 non-fixed marker。管理者把 100 交给 partialHolder，再向 otherHolder 增发 100，于是：

- marker 内保留 100
- bank 实时供应量为 200
- partialHolder 只有 100，即一半实时供应量

此时 partialHolder 请求给自己 ADMIN/MINT/WITHDRAW。补丁后的预期是拒绝，且失败后权限仍不存在；无 MINT 权限的增发也应失败、供应量维持 200。该场景比单独检查 `0 == 0` 更有价值：它专门覆盖第一阶段补丁未解决的非零状态分离。

### 合法行为对照

`TestAccountControlsAllSupplyNonFixedFullHolderGetsAccess` 保留 non-fixed marker 的真实全量持有人获得事实管理权限的行为；`TestAccountControlsAllSupplyFixedMarkerBehaviorUnchanged` 检查 fixed-supply 情况的全量与零余额差异。拒绝攻击请求的同时，还需保留设计允许的合法路径。

上述结果是源代码中的断言，不是本库实测结果。若后续在授权隔离环境复核，应记录所用提交、依赖、每项断言的实际结果，并保留初始状态、消息序列及失败后的 ACL，不能只记录“返回 error”。

## 静态安全与副作用

审查覆盖两次补丁的 marker 生产代码差异、相关回归测试差异，以及固定版本 `go.mod` 的直接依赖与工具链声明。回归用例主要操作模拟应用状态，未在这些用例中看到主网 RPC、钱包读取、第三方回连或下载执行代码；该结论不等于审计了 `simapp.Setup` 的所有实现或整个依赖树。

[go.mod](https://github.com/provenance-io/provenance/blob/171686801b52f46dcb07f4bbdf0fd0921b7ab8b3/go.mod) 指定 Go `1.25.8`，依赖 Cosmos SDK、CometBFT、wasmd/wasmvm 等，并有大量间接依赖。没有安装它们、执行 Makefile、工作流、网络脚本或现成二进制；不能把项目规模较大的测试环境当成无依赖验证。

真实链上的同类消息会修改权限、铸币或提取托管资产，不能把研究样例当只读检查。验证必须与真实钱包、真实资产和生产 RPC 分离；本篇不提供或代为执行主网操作。源码中的 `testcoin1`、`papaya` 等测试值保持原样，未脱敏、替换或补造编号。
