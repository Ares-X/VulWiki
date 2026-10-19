# Langflow 9205 补充核对

wxvl64 完整正文后追至固定 Rubby2001/CVE-POCS ec1a366c933904f5573d93f68afc5d1521bd1020，读取唯一候选脚本与根 README，递归树未截断，无安装/依赖/工作流文件。全库三正文根 git grep 编号未命中。

原始脚本无网络/外传/执行/写入，依赖 cryptography 未锁版本。long-key 重复 Base64 编码与官方补填充不一致；self-test、PATCHED、UNKNOWN 不能代表整个实例状态。保留公开链接，不修补或运行原脚本。

官方 fixed 094694d3f20c1da499f4d8dbac15c510609e3026 的完整 utils.py 与两文件差异阅读。GHSA ≤1.10.0/1.10.1 与 IBM CNA 1.0.0–1.10.3/1.11.0 冲突已如实写入正文 needs-review；产品、编号、具体旧派生代码和触发关系成立。IBM支持页7282648读取失败。无强行统一版本、无移植本文未审链条、无依赖安装。
