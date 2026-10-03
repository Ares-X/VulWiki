# 第四轮全库静态审阅证据

本目录记录固定提交、真实覆盖范围、精确局部修改、原文/预览/产物保真、撤回建议及未核项。`summary.json` 可直接读取；`manifest.json` 记录每份完整诊断的原始字节数和 SHA-256。其余文件只经过 gzip 压缩，没有裁剪或脱敏。可用 `gzip -dc 文件.gz` 读取原值。

`corpus-01-rejected-original.json.gz` 与 `corpus-06-rejected-original.json.gz` 是已撤回的建议，未应用到文章；`residual-root-decisions.json.gz` 记录了未采纳的声明行缩进和其他建议。机器扫描、上下文阅读及全文阅读不能相互替代；具体范围见 coverage 和各分片报告。`restored-resource.json.gz` 绑定新增附件的官方固定提交。

本目录的报告在隔离构建之后保存，不在该构建输入快照中；全部技术文章、生成索引和实际资源另有产物字节验收。维护不执行文章代码、PoC、HTML、附件、扫描器或载荷，不访问示例目标。
