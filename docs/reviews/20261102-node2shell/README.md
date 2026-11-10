# Node2Shell 专项补漏与材料分层（2026-11-02）

基线 master `09fb76eca271fb9419cbbc92c527616f8bc2d6a3`，开放PR读取为空；重读AGENTS、CONTRIBUTING、CONTENT-SCHEMA。既有本文没有Node2Shell别名，全文搜索只按产品/CVE可见：本次补显示标题别名，保持文件名/ID和全部既有正文，不创建同CVE重复条目。仅文档分支/草稿PR，不自动合并或发布。

## 已有、实际遗漏及计数

- 已有 dimasma0305 的完整 `poc.py` / `profiles.json` 固定原链接与 Express 结果，不能回答“没有PoC”。其原文明确此前未全审核心代码；本轮补核。
- 已有 caveeroo WordPress响应解码链，前轮9文件/1102行静态审阅不重复计为新实现。
- 本次新增Rabbitbong、TeamN4C两条含执行链的互补实现，以及lesterlam的C API触发/修复对照。共同根因只有CVE-2026-111497，不按仓库或环境数计新漏洞。
- Assetnote→Nuclei为1来源链的2份差分探测实现、0新增RCE EXP。检查代码含真实协议探测，但不将它单独作为新漏洞正文或RCE证明。
- 原厂Node.js与ELLIO研究支持Node2Shell/HTTP2Shell/Broccoli2Shell映射；React官方55182是另一RSC漏洞。Datadog原文有研究观察而未给完整载荷，不额外计为公开EXP。Imperva直链本轮网页读取timeout，其他原作者明确其payload未公开；没有伪称本轮全文读完或收到了ARM64 EXP。
- googlesky/CVE-2026-111497、mnk-works/cve-2026-111497-rce-checker为新发现未完成审阅线索，后者自称包装现有exact-profile，需先去重。nomi此前75新增full_name仍只是线索，不是75个已验EXP。

## 固定审阅范围

|来源|固定提交|审阅与范围限制|
|---|---|---|
|Rabbitbong/node2shell|ea80cd5a94dd4722dda12aceb1e476f5059e3190|完整执行路径poc/profile/构建/compose/应用与HTML脚本；两PNG和styles.css未逐项看，不依赖图片证明效果；无独立LICENSE或workflow|
|TeamN4C/SG-2026-0035|456c258e0db8dc6ec722de1af48f37a97c9976a0|全部8文件，包括EXP/PoC、JS、Dockerfile/run、manifest/lock/README；主维护者另独立全文读EXP、服务与构建入口；依赖归档与镜像内部未全审|
|lesterlam/node2shell|e8ec10435e1fd2e27cb5b6f218082b27315c2030|生成器、两C工具、setup/build/A-B、README/REPORT/MANIFEST、A-B日志和图片生成脚本全文；NOTES、交互index.html与图片像素未逐项审，不推荐其网页作可信检测器|
|Assetnote/node2shell-scanner|bf2dc38797f262d11e8c630b3fcc6a013a70da97|六文件非截断树全部读取，无workflow/二进制；未锁定h11/tqdm及浮动基础镜像，依赖源码未全审|
|Nuclei111497模板|ef32be9fa6158b4c7cd28c5517c2008ccd0c55f6|完整JavaScript模板；工作流审阅沿用此前ca848f19固定tests/template-sign范围，不冒称引擎及全部Actions已审|

三新增仓库递归树均truncated=false；所有文本取回不等于每个非执行说明均逐行人工读，实际范围如表。固定许可证不明/All rights reserved/UNLICENSED不整套搬运；原创中文整理和完整源码链接保留来源。不执行任何生成器、ELF辅助程序、PoC、扫描器、安装器、容器、图片脚本或公网请求。没有发现足以指认作者投毒的证据，也不作运行安全认证。

## 应保持的风险与证据冲突

- Rabbitbong声称not weakened但明确单worker；成功判断仅非HTTP非空响应，定义的ID_OUTPUT正则未使用，RCE CONFIRMED打印不等于命令证明。autoprofile会执行选定node --version，npm install无lock、pwntools宽版本；固定名称容器强删与worker终止需说明。
- TeamN4C使用默认四worker，回连listener0.0.0.0:4453、host网络、默认root、restart always；run-docker无所有权检查强删同名容器。其随机token回连验证不同于Rabbit的简单响应判据；20次5成功仅作者记录，不是本项目验收或普适成功率。
- lesterlam记录24字节写入八字节缓存及邻接状态；没有Node层RCE不意味着其他链不可能。setup已有文件跳过checksum、可选下载node -v、A/B管线未pipefail均明确记录。
- Assetnote NO SIGNAL设False而打印NOT VULNERABLE，不代表已修复；Nuclei仅发Expect头不等待Continue，262144字节截取范围的exact-response不能证明完整响应相同。23MB上传/解压是主动资源压力，不是无副作用扫描。
- 保留上游工具已有输出处理代码，未引入、调用或修改为本库处理工具；没有对原文、URL、参数、测试值脱敏。

## 文档保真与检查

原文件显示title仅增加`Node2Shell：`前缀；原有正文和全部代码字节保留，追加材料标明日期与作者边界。当前目录资源出处README不属于6060正文口径，原始磁盘Markdown哈希基线包含6061文件。最终逐文件保真、代码复制、质量/索引、远端head和CI分别记录；未将本地sparse缺图误写为完整资源通过。


## 原有 dimasma0305 审阅补强

最新head仍为`452151d4945c3f5d9b58d9d25792d0d8aef4ab16`，与原文相同，并非新代码。完整树269项/206blob，非截断。全文人工阅读80文件，包含poc.py/scan.py、全部19profiles、19Dockerfile、22JS、11package.json、LICENSE、说明与三类RCE日志；另11锁文件结构化全条目检查451依赖记录（跨锁重复），均有registry.npmjs.org解析地址和integrity，没有hasInstallScript标记。这不等于依赖tarball、native二进制、镜像或动态媒体全审。GIF/MP4/PCAP/EVE/replay等逐项标为未读，不作为新动态证据。

明确3个RCE profile（worker-record、worker-fetch、Express）与16个DoS，固定端口/目标loopback限制、worker-fetch origin监听0.0.0.0、可调重试和主动崩溃均保持。授权All rights reserved，不复制公开源码进本库。caveeroo本轮复查最新head仍44bf548b43b966b259dc584f85d527cb099818a9，与前轮审阅一致。

最终条目分层：4条含RCE实现来源，1条C API实际触发对照来源，1条探测来源链2实现；不按重复profile/fork数量扩张“独立EXP”统计。完整源码均是原作者固定链接，库内未冒称包含全套可执行源码包。
