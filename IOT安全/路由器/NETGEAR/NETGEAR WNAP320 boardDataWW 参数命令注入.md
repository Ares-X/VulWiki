---
schema_version: "1"
id: "VW-20261019-MRXN-079"
title: "NETGEAR WNAP320 boardDataWW 参数命令注入"
product: "NETGEAR WNAP320"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "active"
version: "来源未列固件版号；CNA及厂商范围为3.5.5.0之前"
prerequisites: "管理Web可达；厂商确认相关页面免认证，归档精确请求主要在截图"
side_effects: "执行设备命令、写文件、读取/tmp/unique中账号配置，可能修改制造/区域参数"
source: "chan"
source_status: "recorded"
source_url: "https://www.iotsec-zone.com/article/449"
archive_commit: "f33600e512f2ff654ec335102daf23b8a5218d24"
archive_title: "Netgear WNAP320 漏洞挖掘分析"
review_date: "2026-10-19"
primary_identifiers: "CVE-2016-1555"
identifier_status: "active"
fixed_version: "3.5.5.0"
---

# NETGEAR WNAP320 boardDataWW 参数命令注入

## 根因与编号对应

chan 从lighttpd启动及PHP配置追踪至`boardDataWW.php`。输入`macAddress`、`reginfo`进入exec；正文给出的`ereg("[0-9a-fA-F]{12,12}",...)`缺少起止锚定，匹配12个十六进制字符并不意味着整个输入只有12字符。前端checkMAC的长度控制不能替代后端验证。作者构造POST后称注入成功，并通过命令读取`/tmp/unique`中的账号配置。

CNA CVE-2016-1555明确包含WNAP320与boardDataWW.php等页面；[NETGEAR公告](https://kb.netgear.com/30480/CVE-2016-1555-Notification?cid=wmt_netgear_organic)确认未认证页面将输入送入命令行，建议WNAP320升级3.5.5.0或以上。产品、页面与根因对应，但不据此反填本文未写的实验固件号。

## 证据范围

chan归档的完整HTTP请求与结果主要在截图，本次未逐图读取，不补造该实验请求。作为独立触发证据，已完整静态读取Bryan Leong署名的[EDB-50069原始PoC](https://www.exploit-db.com/exploits/50069)：它明确以WNAP320 2.0.3为目标，通过requests.post向`/boardDataWW.php`提交三个表单字段，`macAddress`为`112233445566;`加用户命令及` > ./output #`，`reginfo`为`0`，`writeData`为`Submit`；没有登录或Cookie步骤。随后GET `/output`读取结果，并另发请求执行`rm ./output`。这证实精确方法、路径、字段及命令串拼接形态，与原文未锚定MAC校验分析对应。EDB没有登记CVE，编号对应来自另行核对的CNA及厂商，而非将EDB的N/A改写为已分配；2.0.3也不反填成chan实验版本。源文另写`boarDataNA.php`，CNA是`boardDataNA.php`，差异保留，不能默改截图未知内容。来源的正则修补是研究建议，不等同厂商补丁；reginfo的校验也应单独核查，不能由macAddress缺陷推断所有参数任意可控。可见文本与修复片段未见隐蔽下载、外传或混淆；请求截图和外部FirmAE/firmwalker未继承完整代码审计结论。补充PoC的完整可见程序仅含目标POST、输出GET与显式清理，无隐藏第三方下载/外传/持久化；目标写入及删除output会覆盖或移除既有同名文件，不能视为无副作用检测。

## 来源与审阅

- 作者：chan；[完整原文](https://www.iotsec-zone.com/article/449)
- 汇编来源Mr-xn/Penetration_Testing_POC，固定提交`f33600e512f2ff654ec335102daf23b8a5218d24`，路径`iot/Netgear WNAP320 漏洞挖掘分析.md`
- 原文授权范围未明确，本篇独立中文综合，不整篇转载代码图片；来源实验结果不升级为本库复现。未执行PoC、安装依赖、请求示例目标或修改设备。
- 属本周汇编新增的历史研究，不是本周新披露；未知构建/认证及具体缺口已明确记录。
- [CNA CVE-2016-1555](https://www.cve.org/CVERecord?id=CVE-2016-1555)
