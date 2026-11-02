# 本地文档检查收据

基线 master b07631dfdfd6a36b2985cf6a45fbe8e2c19e1c65，2026-11-02。运行前检查 scripts、tests、质量基线、工作流与已审可信版本没有差异。检查均只处理文档/测试夹具，不执行正文或任何新来源代码。

- `python -m unittest discover -s tests -v`：96 通过。
- `node --test tests/*.test.cjs`：44 通过。
- `python scripts/wiki.py check --baseline docs/quality-baseline.json`：6060 文档，0 error/fatal，0 新增债务；4093 历史警告仍在。
- `python scripts/wiki.py build --check`：different_files 为空。
- `node scripts/render-audit.cjs`，预装 Marked 17.0.5：0 结构失败；扫描 6061 个 Markdown 文件（扫描范围与内容解析计数不同），33 条历史候选，11 篇新增/更新均无候选。
- 离线 Markdown 词法/HTML 字符串渲染后逐块比较复制文本：11 篇全部相等，4 个 fenced code 块原值一致。不在浏览器打开活动 SVG，不执行嵌入脚本或外链请求。
- 6050 原正文逐项 SHA-256：6049 完全不变；Brotli 原始字节完整保留为前缀，仅末尾追加。10 篇新稿，README只更新现统计，未修改准入规则。
- `resource-audit.py --require-local`：本地 sparse checkout 缺 20369 张历史图片，因此本地资源检查**不通过**；零字节/HTML错误/远程图片/新增外部图片均 0。本次无新增图片依赖。不能把 sparse 缺图写成远端资源检查成功；最终须看完整 checkout 的 CI。

最终远端提交与 CI 结果登记于草稿 PR；本收据不预测尚未运行的远端结果。未修改默认分支、未自动合并。
