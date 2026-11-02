# 十个 GitHub 优先来源：2026-11-02 覆盖与静态审阅

## 范围与分页

逐源读取默认分支最新提交，并查询 2026-10-24T00:00:00Z 至 2026-11-02T00:00:00Z 的 commits（每页100）。9个可访问来源的日期结果分别为0或1条，均低于页容量。再对照10月26日 primary/secondary台账的固定head：8源head逐字相同；SourByte从7d513a3462c0c65a6dfeba21ce40702dcf275119前进一提交到240643cbeb4c1d793e7decff2fadd2ac0d0ab5b5，compare为ahead/1提交/13文件。不是只依赖日期。wy876/POC两次只读commits读取均404，不能断言删除、私有或无更新。

SourByte完整树4947项且truncated=false；13变更包括5篇新增Markdown、1篇更新Markdown、7张PNG，无删除或重命名。6篇完整固定blob均读取，初次工具展示截断后按文件重读/单独提取补齐。无API截断遗留。除TheGrid截图外，6张新图仅枚举未视检。未重新阅读全文不变仓库的历史全文，外链静默修改不受Git head相同保证；以前的覆盖缺口仍保留。

## 六篇处置

1. **TheGrid / CVE-2026-94169：准入原创中文综述。** Patchstack CNA与原始公告均对应Theme-one The Grid至2.8.1、无认证、2.8.2修复，厂商CodeCanyon变更日志同编号与版本。具体公开请求含the_grid_load_more及grid_skins路径，响应截图已观察，支持本地文件内容进入响应；不是命令执行截图。第三方源码归档自报2.8.0，只支持该副本的静态调用链，不冒充官方2.8.1。当前master104c9204全文与索引搜索94169无命中。
2. **Go-fastdfs reload：重复候选排除。** 当前主库已有`Web安全/中间件/Go FastDFS/Go-fastdfs-GetClientIp-未授权访问漏洞.md`，同group1/reload?action=get与X-Forwarded-For控制逻辑，旧文还保留AdminIps和代理前提。新稿未提供具体版本、修复或更完整链条，不另收重复摘要，不删除旧文。
3. **拇指达人 fileupload.php：待查。** 请求将常量Test1234上传为.php，具有具体上传材料，但缺版本、来源链、鉴权和PHP解释执行的对应证据；不能沿用开头“任意命令执行”主张。写文件及残留风险明确。
4. **朗速ERP ModuleAjaxApi：待查。** 有GetFlowChartOption/billType的WAITFOR DELAY请求；它具有数据库延时副作用，不是没有PoC。但版本、环境、鉴权及修复映射未确立，未视检图片不能补证。
5. **玉帛仓库 DownloadFile：待查。** 有filePath=appsettings.json&delete=0具体输入，但产品版本/部署前提及厂商映射不足。delete参数语义不可由名字猜测泛化，本文没有实际删除请求。
6. **大华 login_updateUserAdmOnlineStat：纠错已登记，暂不扩收。** 仅产品显示名称dahua改为大华、Host空格及替换截图；请求主体不变。没有新的版本/鉴权/修复证据；新图未视检，不能说已确认实质利用变化。

后三篇不是因为缺官方公告单独拒收，也不是要求本项目执行验证；是当前尚不能准确建立产品/版本/前提与材料对应。原文原值均未修改。

## 反投毒审阅

SourByte候选固定提交只新增md/png，没有候选附属安装脚本、依赖清单、工作流、独立可执行脚本或二进制检测器；根完整树未见工作流。根README说明互联网及个人记录来源，但没有本篇统一许可证。6篇具体请求与Snort规则全读，未见操作者本地文件窃取、固定第三方外传、持久化、混淆下载执行器或无关破坏。上传、SQL延时、配置/文件读取属于所述漏洞副作用，不能据此宣称安全。

TheGrid额外核对的kize7仓库固定提交780f709eea364bce8a591cc97d7db326c8efd5ce，完整树仅the-grid.zip一个blob，SHA be2c3875b49feb3e9a4eb45dc4b544f8a02e39e4。常规fetch_blob误按UTF-8解码失败后，使用工具正式支持的fetch_file encoding=base64成功读取，不是权限绕过。ZIP1018843字节，SHA256 4368b6e076878f3cdb4d7d97e21bdde1b0f3d9f3c33c4b65998cca2012aaf965；使用标准库只读内存解压和哈希，未执行/导入其中PHP或JS，也没有安装到WordPress。

ZIP279条目、展开4677421字节，全部路径/大小/哈希见zip-manifest.json。类别：161 PHP、42 CSS、22 JS、29 PNG、6 JPG、4 SVG、3 PO、3 MO、2 JSON、2 TXT、各1 EOT/WOFF/TTF/GIF/POT。没有独立安装shell、composer/package/requirements清单或.github工作流。字体、图片、MO等二进制资源及压缩JS没有做逐项语义审计，不能宣称整个包可信。

对全部PHP/JS/JSON/TXT作离线危险调用/URL枚举，完整观察保存在static-pattern-observations.txt（240行，不以模式筛查代替全文审阅）。重点人工读AJAX入口、normalize_data默认值与覆盖流程、皮肤选择及include、插件版本头、Envato API全类和更新调用点。已读内容显示正常产品能力中的远程更新下载、字体及社交源HTTP访问；Envato类带用户配置Bearer token请求api.envato.com，不能把它当无网络依赖检测器。该归档没有厂商签名/字节对应证明，不推荐下载安装它，不称上传者恶意。

准入对象是固定SourByte请求的原创综述，不是第三方ZIP的安全背书或分发。源码链可以解释文件包含，但代码执行影响仍区分CNA主张、第三方源码观察与截图实际支持范围。

## 图像与许可

TheGrid图片固定blob04bf7a588898e32477174434e7bf9a23b48c2658，来源路径`2026/10/TheGrid admin-ajax存在代码执行漏洞(CVE-2026-94169)/assets/image-20261027172953779.png`。下载原字节134508，SHA256170159b4fcb09fee6b3df180d40968f59c6df3454e8cb85f76a095370b74fb4e，已用view_image观察1266×600画面。HTTP200/JSON success:true/content passwd格式可见；主机栏为上游自带隐藏模式，未猜补或另行改图。原图在工作证据gridshot.png；本轮原创稿不复制图片，因许可未明确；无图片引用自然无外链图片加载。若主代理需要公开图像，必须另行确认许可依据，不能将工作副本当已获再版许可。

原文保存仅供本轮研究，source-*.md不自动作为公开归档发布；SourByte无明确全文转载许可。文稿仅必要请求引用，无整篇翻译。ZIP带LICENSE_GPL.txt不自动覆盖SourByte或厂商商标/图片，亦不证明第三方包来源。

## 事实来源与冲突

CNA固定d5bbc9458b76235ca26cebac6947c9c1c342a0b7/cves/2026/94xxx/CVE-2026-94169.json，datePublic10月14日、datePublished10月16日、dateUpdated10月16日18:38UTC；SourByte提交10月27日，本轮发现11月2日。厂商2.8.2日志为9月21日。

Patchstack当前KEV标签及CNA known-exploited标签，与CISA ADP较早时间戳的SSVC Exploitation:none并存；保留时间差异，不写成CISA KEV已收录。本轮没有独立声称读取CISA KEV全量。

官方入口：https://patchstack.com/database/wordpress/plugin/the-grid/vulnerability/wordpress-the-grid-plugin-2-8-1-remote-code-execution-rce-vulnerability?_s_id=cve

厂商日志：https://codecanyon.net/item/the-grid-responsive-wordpress-grid-plugin/13306812?ref=Theme-one

无PoC运行、目标请求、依赖安装、动态复现、公开扫描或远端仓库修改。
