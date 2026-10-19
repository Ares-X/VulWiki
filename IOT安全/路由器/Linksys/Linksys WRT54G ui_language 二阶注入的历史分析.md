---
schema_version: "1"
id: "vw-mrxn-20261019-125"
title: "Linksys WRT54G ui_language 二阶注入的历史分析"
product: "Linksys WRT54G httpd"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "needs-review"
version: "原作者未给出确切硬件修订和固件构建"
prerequisites: "有效 HTTP Basic 管理账号；可修改语言并进入固件升级流程"
side_effects: "写 NVRAM 会损坏管理界面显示；升级可能重启或损坏设备；源码另有下载并运行文件、出网反连与写日志"
source: "本库原创中文整理；研究作者及原文见正文"
source_status: "recorded"
source_url: "https://www.iotsec-zone.com/article/133"
review_date: "2026-10-19"
archive_commit: "f33600e512f2ff654ec335102daf23b8a5218d24"
archive_url: "https://github.com/Mr-xn/Penetration_Testing_POC/blob/f33600e512f2ff654ec335102daf23b8a5218d24/iot/linksys%20WRT54G%E5%91%BD%E4%BB%A4%E6%B3%A8%E5%85%A5.md"
---

# Linksys WRT54G ui_language 二阶注入的历史分析

splash 的研究把两个动作连起来：apply.cgi 保存 ui_language，之后 upgrade.cgi 的固件升级路径读取 NVRAM 中该值并拼入 system 命令。它是认证后的二阶注入主张，不能写成一次匿名请求直接命令执行。公开方法是先将带分号的命令值提交为语言，再触发升级；作者称观察到来自模拟设备的 ICMP，并在另一段展示反连程序。

版本无法从通用厂商下载页面推断，本文不登记全版本受影响或新 CVE。完整文库按 WRT54G、ui_language 检索无相同实体命中，也不据此声称首次发现。

源码中的升级函数以 requests 的 data 表单提交，而手工步骤使用上传 bin 文件并改请求的流程；普通表单不等于 multipart 文件上传。两者是否均能到达同一升级分支，本轮材料没有证明。因此文中源码是来源证据，不标为经过验证的即用脚本，也不为作者补写 multipart 实现。没有已核定固定版本。


## 逐项静态审计

- requests.post(..., data=req_query) 是普通表单；手工固件文件上传不因此得到相同编码，脚本与手工步骤的等价性未证。
- _set_ui_language 写配置且 _upgrade_firmware 调用升级；末尾恢复语言不代表回滚固件或清除下载文件。
- 无精确固件构建；仅以历史二阶处理路径分析收录，不设主编号/全版本范围。

## 核验、风险与来源

写 NVRAM 会损坏管理界面显示；升级可能重启或损坏设备；源码另有下载并运行文件、出网反连与写日志。本次仅进行公开资料与既有文库的静态文字核对，未执行请求、载荷、固件、依赖安装或扫描，也未访问示例目标。来源中的成功或失败是作者记录；截图像素本轮未审，不将其升级为本库复现。

本文为新写中文分析，不整篇复制原文章或图片。汇编库的 Apache-2.0 声明不能证明原作者文章及图片已按该许可授权。原始资料不作遮盖、替换或删除；本文没有转录为可运行脚本，也不补全来源省略的参数。

- 研究来源：splash，https://www.iotsec-zone.com/article/133；发布时间线索：unknown。本次仓库收录时间不等于新漏洞披露时间

- 固定汇编来源（仅固定所读版本，不代替原作者出处）：https://github.com/Mr-xn/Penetration_Testing_POC/blob/f33600e512f2ff654ec335102daf23b8a5218d24/iot/linksys%20WRT54G%E5%91%BD%E4%BB%A4%E6%B3%A8%E5%85%A5.md
