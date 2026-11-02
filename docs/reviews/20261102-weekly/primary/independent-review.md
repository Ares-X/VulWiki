# 独立只读复核记录

2026-11-02，未改仓库、未运行任何第三方代码或PoC。

## pypdf 新稿

判定：本轮所读证据支持准入和当前表述，无必要阻断修订。

- 原官方GHSA https://github.com/py-pdf/pypdf/security/advisories/GHSA-cggf-277g-3q54 确认Oct28发布、CVE-2026-119204、<6.21.4受影响、>=6.21.4修复、报告者smaeljaish771、发布者stefan6419846。
- GHSA链接的官方PR4290直接查询显示merged，merge_commit_sha恰为ea4ac663133f1b3de1d7a8f2e6fa239802fde79e，避免同产品其他补丁串配。
- 完整三文件patch已读；另固定读取tests/test_doc_common.py1950–1992。四对象PDF、200×200叶子引用、每叶200额外键、BytesIO/PdfReader/len(reader.pages)、LimitReachedError预期均与稿一致。2,000,000为页面字典条目复制预算，不是页数或输入字节数。
- 复制前扣减与继承缺失属性计数、list_only/间接对象路径均准确；可选精确措辞为“单次页面树展开期间共享预算”，不是必须改动。
- 独立读tests/__init__.py、tests/conftest.py、pyproject.toml、LICENSE：下载助手关闭TLS校验、缓存文件写入、标准测试依赖、BSD-3-Clause版权对应有据。
- 本独立复核没有重新阅读所有CI工作流或依赖源码；稿中主维护者已完成的更广审阅不能归到本复核名下。没有运行该回归用例，未将pytest超时视为安全保障。

## 其他集成文件肉眼格式检查

The Grid、sanitize-svg、FreeSWITCH全文及GitLab11月2日追加段已读。未见未闭合代码围栏、明显Markdown链接括号不平衡或活动SVG泄漏到正文；sanitize-svg的onload例置于xml围栏，TheGrid原HTTP块完整。固定链接的版本及SHA表现形式一致。此次仅肉眼语法/表述复核，不称渲染验收、外链全量健康检查或替代仓库可信离线检查。
