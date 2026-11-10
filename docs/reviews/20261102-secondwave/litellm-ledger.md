# 第二波 LiteLLM 专项来源与门槛记录

## 准入
- CVE-2026-114612：nomi-details.json 的新增 Hunt-Benito 仓库线索追到两文件完整源码；官方 GHSA/CNA、五个回补 commit 元信息与完整 diff 已获取，其中1.100.x补丁六文件全部差异全文审阅；v1.100.4 release 时间已核。
- 成稿：litellm-114612-draft-20261102.md；完整证据：litellm-114612-evidence-20261102.json。
- 仓库当前本地正文 grep 未发现114612/两GHSA，远端最终去重由集成者负责。

## Hold：GHSA-w4c7-34wj-hqm8
- 原厂：https://github.com/BerriAI/litellm/security/advisories/GHSA-w4c7-34wj-hqm8 ，Oct27公开，No known CVE，Enterprise license加载路径；无license OSS不受此条影响。修复1.103.10/1.104.8/1.105.6/1.106.5。
- 原厂日期补充：https://docs.litellm.ai/blog/litellm-private-registry ，Oct6私有补丁分发、Oct27公开；不得把Oct27当修复第一次存在。
- 原厂内容列了字段名、读取/POST至token endpoint的机制与缓解，但未给完整触发请求/代码；不能仅据字段列表自行重构并称公开PoC。
- 发现者Karmasec主页 https://karmasec.io/ web open报不可访问；site搜索无原作者技术文结果。
- 共同发现者Compass主页 https://blog.compass-security.com/ 可访问；首页截至Oct2文，site搜索未发现对应详细触发。搜索无结果不等于全站穷尽。
- 决定：严格门槛未满足，保留待查，不入正文、不编造payload。

## 覆盖边界
- 从既有nomi增量的2026新增full_name字段筛选两LiteLLM主题，不宣称1550变化路径全部内容审完；网页搜索只是追索线索而非代替逐上游检查。
- Hunt-Benito外链文章 https://www.hunt-benito.com/blog/one-salt-to-forge-them-all-cve-2026-114612-forged-admin-sessions-in-litellm/ web工具不可访问；其GitHub完整README+代码可读，因此不妨碍具体源码准入。
- 114612官方GHSA本身只有摘要、不是完整请求；具体触发来源是独立PoC，发现者应仍归Hoa X. Nguyen/OPSWAT Unit515，不误归第三方复现作者。
- 没有执行外部代码、下载并安装依赖、扫描或对代理发送实验请求，没有仓库写操作。
