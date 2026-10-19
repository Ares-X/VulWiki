# Metasploit 两个候选的配套静态检查

固定提交：`b22ce1fbae63e8caeb3a773366a6d3336bd66fb8`，检查日期 2026-10-19。用于本次 4gaBoards 与 OpenCTI notifier 两篇文章；模块和配套文档全文审阅、官方对应及具体副作用见 supplementary-candidate-admissions-20261019.json。本检查补充框架构建与启动面，不代表完整 Metasploit、全部模块或依赖二进制安全审计。

## 完整读取范围

Gemfile、Gemfile.lock、metasploit-framework.gemspec、msfconsole、config/boot.rb、lib/msfenv.rb、Dockerfile、docker-compose.yml、docker/entrypoint.sh、docker/msfconsole.rc、docker/database.yml、tools/dev/pre-commit-hook.rb，以及 .github/workflows/verify.yml、shared_gem_verify.yml、lint.yml。工作流目录清单有 20 项，仅上述三个相关通用工作流正文纳入本检查，其余未宣称全文审阅。源链接均可由 https://github.com/rapid7/metasploit-framework/blob/b22ce1fbae63e8caeb3a773366a6d3336bd66fb8/ 后接精确路径访问。

## 安装、依赖及执行面

- Gemfile 使用 rubygems.org；LicenseFinder 为固定 Git revision。Gemfile.lock 记录具体解析版本，gemspec 中仍有较宽范围依赖，不能把锁文件视作上游依赖内容认证。包含网络协议库、原生扩展、payloads 与 mettle 等框架正常能力，未审阅这些 gem 内部或预编译载荷。
- gemspec 通过 git ls-files 构建打包清单；控制 MSF_ROOT 会影响根目录。启动加载 Bundler、Rails 和模块自动加载器，config/boot.rb 会写缓存元数据，版本不符时递归删除本地 bootsnap_cache。lib/msfenv.rb 覆盖 OPENSSL_CONF 以启用旧算法，并清空 KRB5CCNAME；这些是可见框架行为，不是候选模块私藏的凭据采集代码。
- Dockerfile 经 apk/gem/bundle 安装与编译依赖，还从 dl.google.com 下载 Go 1.24.0 源码并 make.bash，未见该下载的摘要校验。Ruby/Nmap 被赋予网络 capability。镜像 tag、系统包和 gem update 不提供完全可复现供应链保证。
- Compose 暴露 4444、挂载宿主 $HOME/.msf4 并配置 PostgreSQL trust 认证；entrypoint 通常创建映射 UID 的用户，但 MSF_UID=0 或既有 UID 回退分支会直接运行命令。不能笼统称容器始终非 root。资源脚本设置 LHOST/LPORT 并按 DATABASE_URL 连接数据库。
- verify 工作流会安装系统包、启动数据库、构建容器并执行测试矩阵；shared_gem_verify 接受并执行调用方测试命令；lint 会建立本地 Git hook 并执行 msftidy。pre-commit-hook 通过 Open3 运行 Git 和本地工具。这些不是单纯文本解析工作流，本次没有运行它们。

## 结论与边界

在已列出的候选模块、文档及配套构建/启动文件中，未发现相对其声明用途之外的固定窃密接收方或隐藏下载执行链。4gaBoards 注册账户、越权读取并保存资料，以及 OpenCTI JavaScript 模板执行、回连及目标状态变化属于其公开利用逻辑，不能因此描述为只读检测器。框架本身具备网络攻击、文件及载荷能力，依赖、容器镜像和其余工作流仍有未审计部分；静态检查不是可信执行认证。全部工作为读取分析，没有安装、运行、启用钩子、启动容器或发起目标请求。
