# PR #29 修正与合并验收（2026-10-19）

审阅基线 `34eea13f87b846498780ebc83b350d32800506a7`，原始 PR 输入 `164065de6be3412ce52ce37719eba46f6174549f`。7 个独立分片完整阅读原始 83 篇文章，主审检查相近旧文、官方 CNA 与生成索引，并对修正安排两组独立验收。最终为 65 篇新增、19 篇既有更新；未发现应丢弃的确认重复新增稿。

## 修订依据

1. Huawei HG532：新补充段的 `requests.HTTPDigestAuth` 叙述属于补充来源后续内容，不属于旧正文的固定 Digest 请求头，修正指代。
2. AhsayCBS：官方 [CVE-2026-105134](https://www.cve.org/CVERecord?id=CVE-2026-105134) 已将 `/rps/api/json/UpdateReceivers.do` 与 `random` 参数对应。不能再泛称编号关联未确认；同时，Horizon3 的另一条认证绕过/上传链不验证旧归档的具体请求体、载荷或执行结果，两条边界分别说明。
3. D-Link DI-7400G+：CNA 容器未给认证前提或 CVSS，PR:N 出自 CISA ADP；来源实验使用 `admin/admin`。保留两个观察，不据向量把已登录实验变成实际匿名利用，也不凭这个差异将文章整体降级。
4. ipTIME C200：`ius_get.cgi` 与 `iux_get.cgi` 的“拼写错误”说法来自研究来源；增加归属说明，本库没有独立证实两路径对应同一处理函数。原字符串、候选关系与 needs-review 保留。
5. Zyxel：VMG4325-B10A 是机型；[CVE-2025-0890](https://www.cve.org/CVERecord?id=CVE-2025-0890) 与 [CVE-2024-40891](https://www.cve.org/CVERecord?id=CVE-2024-40891) 的 CNA 受影响字段均为 `<= 1.00(AAFR.4)C0_20170615`，并标记 `unsupported-when-assigned`。补充这些值，不将另一机型 VMG3312-B10A 的来源实验构建泛化。
6. 额外旧 Tenda 文章：原题《CVE-2018-18708 TENDA缓冲区溢出漏洞》的正文分析 AC9 的 `/goform/setMacFilterCfg`、`deviceList`、`parse_macfilter_rule`；[CNA](https://www.cve.org/CVERecord?id=CVE-2018-18708) 描述 `fromAddressNat`、`page` 与 `sprintf` 栈溢出。保留原题、`cve`、全文与测试值，将 `identifier_role` 从 primary 改为 unknown，清空主编号并放入 `identifier_candidates`，追加日期化说明。它与本批新增 AC15 addressNat/page 文章技术主体不同，不设重复/归并关系。普通产品目录仍保留旧文，主 CVE 索引通过正确的新稿提供入口。
7. 主 README 漏计最后新增的 Linux 文章，修正总数和系统分类数；生成器统一重建受影响索引及记录。

## 保真与检查

- [pr29-fidelity.json](pr29-fidelity.json)：原始 18 篇补充的基线全文件前缀保持；额外 Tenda 的基线正文前缀保持。全部 84 篇的原有代码块原始字节、代码值与 URL 保持；没有删除、脱敏或重新填充历史占位符。
- [render-copy-final.json](render-copy-final.json)：最终 84 篇、151 个代码块静态渲染/文本提取通过；没有执行文章代码或 HTML，没有请求示例目标。Marked 默认末尾换行规则单列，原代码字节是否改变由独立严格比较判断。
- 108 份官方 CNA JSON 的完整数据已核对；代码、认证、版本与厂商状态按各篇证据边界陈述，未把相同 CVE 当作重复正文，也未把公开作者的成功主张改成本库复现结论。
- Python 单测 96 项通过；质量 0 errors / 0 fatal / 0 new issues；4093 个历史警告原样保留，未改基线。`build --check` 无差异。
- 正式完整检出扫描缺失资源、空文件、HTML 错误页、远程图片和外部图片依赖均为 0；并非逐图像素检查。新增资料不引入图片或执行依赖。
- 修正后的 Huawei、Ahsay、Tenda 与 D-Link、ipTIME、Zyxel 分别由两组独立复核，结论均为 PASS。原始 83 篇路径覆盖不重叠、不遗漏。

## 实际限制

本文不是全库技术正确性证明。65 篇新稿仍有 35 篇 needs-review，按文章保留具体版本、来源或编号的未决项，仍提供检索。原始上游逐源台账中的图片未逐像素审读、23 个外链未完整读取、访问失败及 Nuclei API 截断等缺口没有被本次文章验收抹除。旧 Pandoc 报告只对应原始头；最终报告未宣称浏览器视觉验收。未安装/运行/编译 PoC，未实际复现漏洞。

未创建工作树或完整源码/图片/网站副本，未运行本地 Hexo 全量构建。审阅共享正式源目录，体积小的文本、哈希与日志单独保留；不改其他任务的脏文件。合并与部署必须另以最终提交的远端检查和发布结果确认。
