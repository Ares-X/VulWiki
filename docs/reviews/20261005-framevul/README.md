# FrameVul 核对与补录：阶段进度记录

这是正在进行的核对任务的阶段记录，不是全部来源审阅完成的声明。

## 固定输入与范围

- FrameVul：`b28dd1a309d21bb90c4ffc8e39b0469c52f228eb`
- VulWiki 基线：`927ec4a91f507197aeb3ab1aec67343495480d44`；保留已合并的图片离线化工作
- 发布前已知 master 更新为 `25e2037091036e848c6f141e52a21f405f198c20`，但该新提交的详细差异/当前规则读取被取消。本分支仍基于已核验的 `927ec4a9`，未重试或换路读取；不修改 master，不包含 README/SVG 回退，不声称已对齐最新基线或可直接合并
- 500 个外链项（498 个唯一 URL）、16 段内嵌笔记、1 个 JAR；共 517 个逐项处置记录
- [逐项台账](inventory.json) 同时保留旧覆盖分类、本轮处置、阅读深度、准入缺口和进行中状态

## 已完成独立复核并纳入本批的文章

11 篇新增、8 篇补充。对已有文章的补充保持原正文逐字不变；必要元数据新增/纠正另有精确记录。

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

其中 372 仅覆盖 CVE-2006-1953 的 Windows 盘符路径穿越。原汇编的弱口令、`%20`、`jndi-appconfig`、`viewfile` 分支未因此被认定全部覆盖。

## 暂缓与仍在推进的工作

- 1–125、126–250、376–516及工具资产三个范围，共392项的本轮技术审阅被平台中止；未提供具体触发项。该范围全部未发表材料暂缓，未重试或改派，不推断每个CVE都单独触发限制
- 此外，251–375范围中与早前暂停候选重叠的部分继续保持暂停；具体版本/材料不足的条目也单独记录，不能以 `needs-review` 绕过准入
- 其余允许工作仍在进行，包括未读来源的正常恢复、已有草稿独立复核与完整台账收尾。不能把未读、一次读取失败或同CVE标题当成最终缺失/重复结论
- 这些暂停不删除既有文章，也不撤销此前已有覆盖证据；台账中的本轮暂缓和旧覆盖状态是两个维度

当前517项处置计数：deferred=442；non_article=14；duplicate=18；unread=23；update=9；new=11。`pending-review` 尚未发表，仍有允许范围的逐项核对在进行。

## 本批验收与限制

- 94项Python单元测试通过；内容检查无新增质量债，仍有4095项历史警告，未修改质量基线
- 自动生成索引已重建并进行一致性检查；纳入本批的文章均进入正常目录/检索
- 现有环境为Marked17.0.5；39项Node测试37通过、2项既有兼容性失败（制表符/CRLF定位及预期模块文件名）。没有安装新依赖，不能声称该组全过
- 本批Markdown以字符串解析器审查，没有加载或执行HTML/PoC；原正文、代码、URL、测试值及图片原字节保持。新增MeterSphere和Jenkins图片已查看实际像素，使用库内相对引用
- 本次没有运行PoC、扫描器、安装器、依赖安装、目标请求或凭据有效性测试；静态审查不等于漏洞或修复已复现
- 本地针对累计19篇及其21份图片资源的离线检查通过：无缺失/空文件/HTML错误页/远程依赖；新图片原字节及相对引用核对通过。全库图片检查由远端CI再确认，不将选择性检查说成全库检查

持续更新本记录与同一草稿PR，直到允许范围内的工作结束或遇到明确阻碍。
