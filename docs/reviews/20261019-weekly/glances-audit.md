# Glances CVE-2026-32596 补充核对

2026-10-19：wxvl compare 索引 96 的正文完整审阅后，追至官方 GHSA 与 CNA、固定提交 208d876118fea5758970f33fd7474908bd403d25。原请求 GET /api/4/system、/all、/processlist 与 REST 路由一致。全库 Markdown 正文与派生索引编号去重未见既有专篇。

准入：具体公开触发、产品及编号对应成立；版本公告与补丁行为并列呈现，避免把 4.5.2 声称为强制认证修复。仅新增原创中文分析，没有改写历史文章。

完整阅读文件：glances/main.py、glances/outputs/glances_restful_api.py、docs/install.rst、uninstall.sh、pyproject.toml、requirements.txt、all-requirements.txt、dev-requirements.txt、docker-requirements.txt、docker-files/alpine.Dockerfile、docker-files/ubuntu.Dockerfile、docker-bin.sh；.github/workflows 下 build.yml、build_docker.yml、ci.yml、cyber.yml、inactive_issues.yml、needs_contributor.yml、quality.yml、test.yml、webui.yml。补丁两文件 diff 完整阅读。递归树未截断。

发现：默认无认证是保留设计，补丁增加警告/文档；Docker 默认 root、依赖下载及正常发布工作流有真实副作用，卸载脚本会删安装清单文件。未见公开 GET 触发隐藏窃密回传、混淆或持久化行为；未审所有依赖内部、插件和产物。不安装、不运行上述代码，不访问目标。
