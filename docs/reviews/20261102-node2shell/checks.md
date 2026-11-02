# 检查收据

基线09fb76eca271fb9419cbbc92c527616f8bc2d6a3；本轮不改脚本、测试、依赖、工作流或质量基线。独立复核确认别名/编号、四worker与单worker范围、PoC/EXP/检测分层及全部原文保留；既有prerequisites字段限定为原dimasma profile的说明置于追加段，不改原值。

- Python文档单测96、Node44全部通过。
- 6060正文质量errors/fatal/new=0，4093历史warnings保留。
- 索引build --check的different_files为空；`wiki.py search Node2Shell`已命中原文章ID VW-20261025-NODE-111497，无新重复实体。
- 预装Marked17.0.5离线字符串解析6061文件，0结构失败，33既有候选，改动文章无候选；两个原代码块解码后复制内容一致。不打开活动HTML，不执行文中代码。
- 磁盘6061 Markdown（含一份资源出处README）哈希对照：6060不变，唯一文章仅title加Node2Shell前缀、末尾追加；完整原正文和代码字节保留。见checks.json。
- 本地sparse checkout资源检查缺20369历史图片，不能当完整资源通过；无新增图片或外部图片依赖。最终须核对PR完整checkout CI。

远端最终head/tree、CI结果另记草稿PR；本地结果不冒充远端成功。没有执行任何PoC、安装其依赖、扫描、合并或发布。
