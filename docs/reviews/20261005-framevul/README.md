# FrameVul 核对与补录：有界核对结果

## 2026-10-07 PR #25 合并前复核

复核输入为 `d54cad53c6abad45e4c31027347e1d3c1308e99e`，对齐主分支 `da4516c309fa1e6c02e6255b69fc2b3760e5726a`。本批实际为 **28 个文章文件：14 篇新增、14 篇更新，对应 29 项来源**；其中 KindEditor、MetInfo 两篇仅补事实注记，不计作新方法。6 个低强度子 agent 分别只读审查文章、工具和台账，主维护者核对具体证据并整合。

- 解决生成统计文件冲突并重建索引；保留主分支后来恢复的图片、离线徽章和原有修订。
- 核对并修正 GeoServer、Nacos 已过时的待核清单，保留版本范围、附件身份与实际运行状态等仍未知的限制。
- 根据 phpMyAdmin 官方 4.9.1 发行说明确认 CVE-2019-12922 修复版本；根据官方 4.8.5 发行说明补记 CVE-2019-6799 可能造成文件删除，未声称所读服务实现具备该效果。
- 将 CVE-2018-12613 的显示标题改为本地文件包含，并同步认证例外；保留原标题、原前提值、文件名、资源路径和样例。KindEditor 追加 CNA 描述与结构化版本字段存在差异的说明，不猜测其他 handler 的对应关系。
- 补齐两篇事实注记的最终全文哈希，更新 6 篇校订后的绑定；来源 URL、517 项处置和原有来源审阅记录保持。
- 96 项 Python、44 项 Node 测试通过。本次 Node 实际加载 Marked 4.3.0；另用 Docsify 5.0.0 内置解析器核对文章显示与代码内容。此前 17.0.5 环境记录属于历史验证，不能替代本次加载版本。
- 全库 5,862 篇质量检查 0 新增问题、0 错误、0 fatal，保留 4,093 项历史警告且不修改基线。全库本地资源检查缺失、空文件、HTML 错误页、活动远程图片、不可用图片标签、外部图像依赖均为 0；历史 32 个未识别容器及 32 个扩展名不一致项仍保留，不能称全库资料无任何问题。

验收检查资料保真、对应关系、排版、资源、目录及检索；没有执行文章代码、PoC、目标请求或安装依赖。最终远端头的 CI 与合并结果以 PR 检查页为准。下文保留 2026-10-05 的原批次过程记录，包括当时的草稿、旧基线及来源缺口；这些历史状态不代表当前仍存在合并冲突。

## 原批次记录（2026-10-05）

本轮当时可推进的核对已收尾；以下明确保留暂停、未读与准入缺口，不声称全部原始来源全文已恢复。

## 固定输入与范围

- FrameVul：`b28dd1a309d21bb90c4ffc8e39b0469c52f228eb`
- VulWiki 基线：`927ec4a91f507197aeb3ab1aec67343495480d44`；保留已合并的图片离线化工作
- 发布前已知 master 更新为 `25e2037091036e848c6f141e52a21f405f198c20`，但该新提交的详细差异/当前规则读取被取消。本分支仍基于已核验的 `927ec4a9`，未重试或换路读取；不修改 master，不包含 README/SVG 回退，不声称已对齐最新基线或可直接合并
- 500 个外链项（498 个唯一 URL）、16 段内嵌笔记、1 个 JAR；共 517 个逐项处置记录
- [逐项台账](inventory.json) 同时保留旧覆盖分类、本轮处置、阅读深度、准入缺口和具体工作状态

## 已完成独立复核并纳入本批的文章

14 篇新增、14 篇补充，共28个文章文件；29个来源项形成发表处置，其中本次新增的2项仅为事实注记，不新增技术方法准入。对已有文章的补充保持原正文逐字不变；必要元数据新增/纠正另有精确记录。

- 新增，FrameVul 267：[Gitea 仓库迁移 Git 参数注入漏洞 CVE-2022-30781](../../../Web%E5%AE%89%E5%85%A8/%E5%BC%80%E5%8F%91%E6%A1%86%E6%9E%B6/Gitea/Gitea%20%E4%BB%93%E5%BA%93%E8%BF%81%E7%A7%BB%20Git%20%E5%8F%82%E6%95%B0%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E%20CVE-2022-30781.md)
- 补充，FrameVul 259：[GeoServer-OGC-Filter-SQL注入漏洞-CVE-2023-25157](../../../Web%E5%AE%89%E5%85%A8/%E4%B8%AD%E9%97%B4%E4%BB%B6/GeoServer/GeoServer-OGC-Filter-SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E-CVE-2023-25157.md)
- 新增，FrameVul 372：[Resin Windows 盘符路径穿越漏洞 CVE-2006-1953](../../../Web%E5%AE%89%E5%85%A8/%E4%B8%AD%E9%97%B4%E4%BB%B6/Resin/Resin%20Windows%20%E7%9B%98%E7%AC%A6%E8%B7%AF%E5%BE%84%E7%A9%BF%E8%B6%8A%E6%BC%8F%E6%B4%9E%20CVE-2006-1953.md)
- 补充，FrameVul 266：[【风险提示】天融信关于GitLab存在CVE-2022-2992 RCE漏洞的风险提示](../../../Web%E5%AE%89%E5%85%A8/%E5%BC%80%E5%8F%91%E6%A1%86%E6%9E%B6/GitLab/%E3%80%90%E9%A3%8E%E9%99%A9%E6%8F%90%E7%A4%BA%E3%80%91%E5%A4%A9%E8%9E%8D%E4%BF%A1%E5%85%B3%E4%BA%8EGitLab%E5%AD%98%E5%9C%A8CVE-2022-2992%20RCE%E6%BC%8F%E6%B4%9E%E7%9A%84%E9%A3%8E%E9%99%A9%E6%8F%90%E7%A4%BA.md)
- 补充，FrameVul 303,304：[Joomla 3.7.0 SQL注入漏洞 CVE-2017-8917](../../../Web%E5%AE%89%E5%85%A8/CMS%E5%86%85%E5%AE%B9/Joomla/Joomla%203.7.0%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E%20CVE-2017-8917.md)
- 新增，FrameVul 340：[MeterSphere v1.15.4 resource-md-upload 未授权任意文件写入](../../../Web%E5%AE%89%E5%85%A8/%E8%BF%90%E7%BB%B4%E9%9D%A2%E6%9D%BF/MeterSphere/MeterSphere%20v1.15.4%20resource-md-upload%20%E6%9C%AA%E6%8E%88%E6%9D%83%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E5%86%99%E5%85%A5.md)
- 新增，FrameVul 261：[GitLab Bulk Imports UploadsPipeline 符号链接文件读取 CVE-2022-0244](../../../Web%E5%AE%89%E5%85%A8/%E5%BC%80%E5%8F%91%E6%A1%86%E6%9E%B6/GitLab/GitLab%20Bulk%20Imports%20UploadsPipeline%20%E7%AC%A6%E5%8F%B7%E9%93%BE%E6%8E%A5%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%20CVE-2022-0244.md)
- 新增，FrameVul 300：[Jenkins 插件资源 Accept-Language 文件读取 CVE-2018-1999002](../../../Web%E5%AE%89%E5%85%A8/%E5%BC%80%E5%8F%91%E6%A1%86%E6%9E%B6/Jenkins/Jenkins%20%E6%8F%92%E4%BB%B6%E8%B5%84%E6%BA%90%20Accept-Language%20%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%20CVE-2018-1999002.md)
- 新增，FrameVul 302：[Jenkins Git client Plugin 仓库 URL 参数注入 CVE-2019-10392](../../../Web%E5%AE%89%E5%85%A8/%E5%BC%80%E5%8F%91%E6%A1%86%E6%9E%B6/Jenkins/Jenkins%20Git%20client%20Plugin%20%E4%BB%93%E5%BA%93%20URL%20%E5%8F%82%E6%95%B0%E6%B3%A8%E5%85%A5%20CVE-2019-10392.md)
- 补充，FrameVul 265：[Gitlab 任意文件读取漏洞](../../../Web%E5%AE%89%E5%85%A8/%E5%BC%80%E5%8F%91%E6%A1%86%E6%9E%B6/GitLab/Gitlab%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md)
- 补充，FrameVul 359：[（CVE-2017-5223）PHPMailer <= 5.2.21 任意文件读取漏洞](../../../Web%E5%AE%89%E5%85%A8/%E5%BC%80%E5%8F%91%E6%A1%86%E6%9E%B6/PHPMailer/%EF%BC%88CVE-2017-5223%EF%BC%89PHPMailer%20%3C%3D%205.2.21%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md)
- 补充，FrameVul 363：[（CVE-2018-12613）Phpmyadmin 远程文件包含漏洞](../../../Web%E5%AE%89%E5%85%A8/%E6%95%B0%E6%8D%AE%E5%BA%93/Phpmyadmin/%EF%BC%88CVE-2018-12613%EF%BC%89Phpmyadmin%20%E8%BF%9C%E7%A8%8B%E6%96%87%E4%BB%B6%E5%8C%85%E5%90%AB%E6%BC%8F%E6%B4%9E.md)
- 新增，FrameVul 351：[Nexus Repository Pro SAML 元数据 XXE CVE-2020-29436](../../../Web%E5%AE%89%E5%85%A8/%E5%BC%80%E5%8F%91%E6%A1%86%E6%9E%B6/Sonatype%20Nexus/Nexus%20Repository%20Pro%20SAML%20%E5%85%83%E6%95%B0%E6%8D%AE%20XXE%20CVE-2020-29436.md)
- 新增，FrameVul 366：[phpMyAdmin Setup 服务器配置删除 CSRF CVE-2019-12922](../../../Web%E5%AE%89%E5%85%A8/%E6%95%B0%E6%8D%AE%E5%BA%93/Phpmyadmin/phpMyAdmin%20Setup%20%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%85%8D%E7%BD%AE%E5%88%A0%E9%99%A4%20CSRF%20CVE-2019-12922.md)
- 新增，FrameVul 367：[phpMyAdmin Setup 跨站脚本 CVE-2022-23808](../../../Web%E5%AE%89%E5%85%A8/%E6%95%B0%E6%8D%AE%E5%BA%93/Phpmyadmin/phpMyAdmin%20Setup%20%E8%B7%A8%E7%AB%99%E8%84%9A%E6%9C%AC%20CVE-2022-23808.md)
- 补充，FrameVul 339：[Metabase-未授权-JDBC-远程代码执行漏洞-CVE-2023-38646](../../../Web%E5%AE%89%E5%85%A8/%E6%95%B0%E6%8D%AE%E5%BA%93/Metabase/Metabase-%E6%9C%AA%E6%8E%88%E6%9D%83-JDBC-%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E-CVE-2023-38646.md)
- 新增，FrameVul 362：[phpMyAdmin GET SQL 请求 CSRF CVE-2017-1000499](../../../Web%E5%AE%89%E5%85%A8/%E6%95%B0%E6%8D%AE%E5%BA%93/Phpmyadmin/phpMyAdmin%20GET%20SQL%20%E8%AF%B7%E6%B1%82%20CSRF%20CVE-2017-1000499.md)
- 新增，FrameVul 288：[JBoss EAP JMXInvokerServlet 反序列化资源耗尽 CVE-2016-7065](../../../Web%E5%AE%89%E5%85%A8/%E4%B8%AD%E9%97%B4%E4%BB%B6/JBoss/JBoss%20EAP%20JMXInvokerServlet%20%E5%8F%8D%E5%BA%8F%E5%88%97%E5%8C%96%E8%B5%84%E6%BA%90%E8%80%97%E5%B0%BD%20CVE-2016-7065.md)
- 补充，FrameVul 352：[npsauth_key未授权访问漏洞](../../../Web%E5%AE%89%E5%85%A8/%E4%B8%AD%E9%97%B4%E4%BB%B6/NPS%E5%86%85%E7%BD%91%E7%A9%BF%E9%80%8F/npsauth_key%E6%9C%AA%E6%8E%88%E6%9D%83%E8%AE%BF%E9%97%AE%E6%BC%8F%E6%B4%9E.md)
- 新增，FrameVul 374：[Resin 4.0.65 非严格映射下的 JSP 目录解析分析](../../../Web%E5%AE%89%E5%85%A8/%E4%B8%AD%E9%97%B4%E4%BB%B6/Resin/Resin%204.0.65%20%E9%9D%9E%E4%B8%A5%E6%A0%BC%E6%98%A0%E5%B0%84%E4%B8%8B%E7%9A%84%20JSP%20%E7%9B%AE%E5%BD%95%E8%A7%A3%E6%9E%90%E5%88%86%E6%9E%90.md)
- 补充，FrameVul 307：[JumpServer 未授权接口 远程命令执行漏洞](../../../Web%E5%AE%89%E5%85%A8/%E8%BF%90%E7%BB%B4%E9%9D%A2%E6%9D%BF/Jumpserver/JumpServer%20%E6%9C%AA%E6%8E%88%E6%9D%83%E6%8E%A5%E5%8F%A3%20%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md)
- 补充，FrameVul 344：[Nacos存在Hessian反序列化漏洞](../../../Web%E5%AE%89%E5%85%A8/%E4%B8%AD%E9%97%B4%E4%BB%B6/Alibaba%20Nacos/Nacos%E5%AD%98%E5%9C%A8Hessian%E5%8F%8D%E5%BA%8F%E5%88%97%E5%8C%96%E6%BC%8F%E6%B4%9E.md)
- 新增，FrameVul 365：[phpMyAdmin AllowArbitraryServer 文件读取 CVE-2019-6799](../../../Web%E5%AE%89%E5%85%A8/%E6%95%B0%E6%8D%AE%E5%BA%93/Phpmyadmin/phpMyAdmin%20AllowArbitraryServer%20%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%20CVE-2019-6799.md)
- 补充，FrameVul 311：[JumpServer-随机数种子泄露导致账户劫持漏洞-CVE-2023-42820](../../../Web%E5%AE%89%E5%85%A8/%E8%BF%90%E7%BB%B4%E9%9D%A2%E6%9D%BF/Jumpserver/JumpServer-%E9%9A%8F%E6%9C%BA%E6%95%B0%E7%A7%8D%E5%AD%90%E6%B3%84%E9%9C%B2%E5%AF%BC%E8%87%B4%E8%B4%A6%E6%88%B7%E5%8A%AB%E6%8C%81%E6%BC%8F%E6%B4%9E-CVE-2023-42820.md)
- 补充，FrameVul 312：[Jumpserver安全一窥：Sep系列漏洞深度解析](../../../Web%E5%AE%89%E5%85%A8/%E8%BF%90%E7%BB%B4%E9%9D%A2%E6%9D%BF/Jumpserver/Jumpserver%E5%AE%89%E5%85%A8%E4%B8%80%E7%AA%A5%EF%BC%9ASep%E7%B3%BB%E5%88%97%E6%BC%8F%E6%B4%9E%E6%B7%B1%E5%BA%A6%E8%A7%A3%E6%9E%90.md)
- 新增，FrameVul 369：[PHPMyWind 5.3 Beta 前台会员 SQL 输入与后台目录文件读取](../../../Web%E5%AE%89%E5%85%A8/CMS%E5%86%85%E5%AE%B9/PHPMyWind/PHPMyWind%205.3%20Beta%20%E5%89%8D%E5%8F%B0%E4%BC%9A%E5%91%98%20SQL%20%E8%BE%93%E5%85%A5%E4%B8%8E%E5%90%8E%E5%8F%B0%E7%9B%AE%E5%BD%95%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96.md)

- 仅事实补注，FrameVul 314：[（CVE-2017-1002024）Kindeditor <=4.1.11 上传漏洞](../../../Web%E5%AE%89%E5%85%A8/%E5%BC%80%E5%8F%91%E6%A1%86%E6%9E%B6/KindEditor/%EF%BC%88CVE-2017-1002024%EF%BC%89Kindeditor%20%3C%3D4.1.11%20%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md)
- 仅事实补注，FrameVul 331：[MetInfoCMS 5.X版本GETSHELL漏洞合集2](../../../Web%E5%AE%89%E5%85%A8/CMS%E5%86%85%E5%AE%B9/MetInfo/MetInfoCMS%205.X%E7%89%88%E6%9C%ACGETSHELL%E6%BC%8F%E6%B4%9E%E5%90%88%E9%9B%862.md)

其中 372 仅覆盖 CVE-2006-1953 的 Windows 盘符路径穿越。原汇编的弱口令、`%20`、`jndi-appconfig`、`viewfile` 分支未因此被认定全部覆盖。

## 暂缓与未完成覆盖

- 1–125、126–250、376–516及工具资产三个范围，共392项的本轮技术审阅被平台中止；未提供具体触发项。该范围全部未发表材料暂缓，未重试或改派，不推断每个CVE都单独触发限制
- 此外，251–375范围中与早前暂停候选重叠的部分继续保持暂停；具体版本/材料不足的条目也单独记录，不能以 `needs-review` 绕过准入
- 251–375的125项中：29项形成28个文章文件，其中2项仅追加事实注记；34项与既有暂停范围重合，另252范围待厘清、368因历史真实凭据语境暂停发表；18项核心方法重复，15项工具/合集；其余27项尚无发表处置。这27项加上2项事实注记仍保留原29项中的具体完整来源/准入缺口，不能把短补注计为新技术方法准入。
- 这些暂停不删除既有文章，也不撤销此前已有覆盖证据；台账中的本轮暂缓和旧覆盖状态是两个维度
- 2026-10-05 08:22 UTC后续正常退避恢复检查：排除301/342并核对既有暂停交集后，314的原有archive.org availability API仍返回HTTP429，无Retry-After；队列立即停止，331/332/333/335/336/338/370/373未请求。恢复0项，29项来源阻碍及517项处置计数保持；429是服务限流，不能证明无存档，也不等同文章被安全审阅拒绝

当前517项处置计数：deferred=441；non_article=15；duplicate=18；unread=14；update=15；new=14。new/update表示本次补录处置，不代表原URL或原文全部恢复；deferred包含暂停或准入不足，不能据此推断已读。

## 本批验收与限制

- 96项Python单元测试通过；内容检查无新增质量债，仍有4093项历史警告，未修改质量基线
- 自动生成索引已重建并进行一致性检查；纳入本批的文章均进入正常目录/检索
- 内容交付时的Marked17.0.5环境中，39项Node测试37通过、2项既有兼容性失败（制表符/CRLF定位及预期模块文件名）。2026-10-05后续工具修复增加保留tab与旧版展开tab两种源偏移映射，以完整顶层token界定匹配范围，避免重复块或HTML中的围栏字面量错配；模块信息改为核验实际加载的包。现有39项及5项新增合成回归测试共44项通过，96项Python测试通过；没有安装新依赖。旧版tab行为仅以合成token模拟，未安装或声称实测Marked4；该工具修复阶段未改文章、图片、来源台账与生成索引字节。后续事实补注的变化另列；新基线和合并限制仍然适用
- 本批Markdown以字符串解析器审查，没有加载或执行HTML/PoC；原正文、代码、URL、测试值及图片原字节保持。新增MeterSphere、Jenkins和Resin图片已查看实际像素，使用库内相对引用
- 本次没有运行PoC、扫描器、安装器、依赖安装、目标请求或凭据有效性测试；静态审查不等于漏洞或修复已复现
- 此前本地针对26篇及其73份图片资源的离线检查通过：无缺失/空文件/HTML错误页/远程依赖；新图片原字节及相对引用核对通过。全库图片检查由远端CI再确认，不将选择性检查说成全库检查

本轮没有仍在进行的来源抓取或技术审阅；29项阻碍逐项保留。new/update是补录处置，不等于原URL或全文已恢复，369的原CSDN仍未读，372/374也保留明确子范围限制。

截至已观察的bb34a68e提交，PR显示mergeable_state=dirty，只有同头push检查通过，未观察到同头pull_request检查。未重读被取消的新基线内容或尝试解决冲突，仍是草稿；最新提交/CI事实以PR描述和检查页为准。

历史WooYun报告编号仍在正确的引用/主编号/候选角色中，原始拼写和数字不变。本批仅在校验器补充该命名空间的ASCII数字语法识别，三文件变更经独立静态审阅与回归测试；不据格式证明编号真实性，也不把它投影为CVE。

## 2026-10-05 后续来源恢复与事实补注

正常退避后的同服务检查返回200后，314、331、336、338、370的五份固定归档正文已恢复。此前08:22的429记录属于历史失败，不再将这五项写作仍未恢复。已查看6/74张相关图片；其中314/331的3张来自精确原图地址当前返回的字节，未证明与历史归档字节一致。本次发布不新增或转载任何图片。

- 314只补来源版本范围差异和明确失败的Windows curl记录，不把理论响应改成成功结果
- 331只补0x01安装分支的5.3.19界面标注、0554针对install.lock及片段代码顺序观察，不推断匿名访问、实际文件权限或删除失败
- 336保留stable/beta程序包身份与最小角色缺口；338排除old_thumb精确映射，仅记录有区别的相关helper，完整鉴权/转换效果仍待核且后续分支未扩展；370保留固定程序包、完整入口和鉴权缺口

两段补注均为独立复核通过的原创短事实概述，保留原文与固定归档链接。没有获得或主张全文、代码或图片转载许可；不提供完整翻译，不重构缺失载荷。两篇目标的原有字节作为完整前缀保留，所有代码块及元数据不改。新方法准入为0；这不是全部来源、图片、分支或剩余问题已完成的声明。
