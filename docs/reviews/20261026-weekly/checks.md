# 本地文档检查与提交验收

基线 master：dcf0607b87f46653d43aa0420de577f440d5aaae。新增5篇、更新2篇，精确路径/最终正文SHA-256见 changed-articles.json；旧文只追加，原字节前缀核对见 append-fidelity.json。没有改变 baseline、脚本、测试或默认分支。

## 实际通过

- Python 3.12.14：96 项单测通过。
- Node 24.22.1：44 项渲染/图片清单单测通过。
- wiki.py build 和 build --check：索引一致，无 different_files。
- 基线质量检查：6043文档，errors 0、fatal 0、new_issues 0；仍有4093条历史警告，不称全库质量无问题。
- Marked 17.0.5 离线解析：6044份Markdown（包含资源出处Markdown），33个全库历史候选，structural_failures 0；本轮七篇正文均无候选。没有启动浏览器、执行嵌入脚本或载荷。
- 本轮七篇中三个代码块，HTMLParser提取渲染后的pre/code文本与Markdown token文本一致，仅标准渲染末尾换行，见 copy-fidelity.json。外部Divi原始两行请求另与固定blob逐字核对。没有修改代码值。
- 新增请求图片保留原字节，PNG570×340、15435bytes；SHA-256369e47acf17da21cd509d03654aaf498e0bb4137149cbcc6d6e707a8e85feaed。已实际查看像素，与原作者请求对应。原URL/许可见资源SOURCE.md。
- git diff --check通过；全部新JSON记录可解析；旧文原始内容前缀与基线git对象一致。

## 资源检查的准确边界

本地工作树沿用稀疏检出（Markdown、文档工具与索引，未检出历史图片）。resource-audit.py --require-local实际运行退出1，报告20368个历史图片引用在此工作树缺少实体；新增图片recognized_container=1，remote_images=0，zero_byte=0，html_error_page=0，unusable_image_tags=0。这不是新删除图片，也不能当成本地完整资源通过。完整检出资源验收由PR对应head的远端Content quality执行，并在PR报告中核对终态，不以旧提交成功代替。

## 审阅与收尾

独立文字复核覆盖本轮五篇新稿、两篇旧文及追加内容；选择性复核原厂公告、固定源码、原始请求，未冒充再次全审所有外部依赖。Langflow与33017共有端点的输入区别已写入正文。

所有检查工具先审阅，scripts/tests相对164065de无差异；只使用预装Python/Node/Marked，未安装PoC依赖。单测的隔离临时fixture由可信测试自身清理。没有新建完整临时源码/图片/网站构建副本；复用既有检出目录，未删除历史共享工作树或其他任务材料，也未声称释放其磁盘空间。小型输入、日志与审阅记录保留，供后续恢复及审阅。

本文件记录本地验收；最终远端提交、草稿PR和同一head的CI结果在PR正文更新。无需为写入自身最终SHA制造额外提交。未合并或部署。
