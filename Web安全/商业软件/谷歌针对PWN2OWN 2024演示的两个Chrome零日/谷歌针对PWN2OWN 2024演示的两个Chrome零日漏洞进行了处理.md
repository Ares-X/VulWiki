---
source: "gelusus/wxvl 公众号漏洞文库"
title: "Google Chrome及Mozilla Firefox 2024 Pwn2Own相关多漏洞修复新闻"
product: "Google Chrome及Mozilla Firefox"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2024-2886;CVE-2024-2887;CVE-2024-2883;CVE-2024-2885"
referenced_identifiers: "CVE-2024-29943;CVE-2024-29944"
identifier_status: "unknown"
affected_scope: "Chrome123.0.6312.86/.87；Firefox124.0.1/ESR115.9.1为文章所称修复"
prerequisites: "浏览器内容触发条件，非服务端未授权漏洞"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态"
review_date: "2026-10-02"
identifier_role: "primary"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E8%B0%B7%E6%AD%8C%E9%92%88%E5%AF%B9PWN2OWN%202024%E6%BC%94%E7%A4%BA%E7%9A%84%E4%B8%A4%E4%B8%AAChrome%E9%9B%B6%E6%97%A5/%E8%B0%B7%E6%AD%8C%E9%92%88%E5%AF%B9PWN2OWN%202024%E6%BC%94%E7%A4%BA%E7%9A%84%E4%B8%A4%E4%B8%AAChrome%E9%9B%B6%E6%97%A5%E6%BC%8F%E6%B4%9E%E8%BF%9B%E8%A1%8C%E4%BA%86%E5%A4%84%E7%90%86.md"
category_recommendation: "桌面软件 / 浏览器"
id: "vw-47d3bba1cf0372a9d1b3d74d"
entity_id: "ve-47d3bba1cf0372a9d1b3d74d"
schema_version: "1"
---

# Google Chrome及Mozilla Firefox 2024 Pwn2Own相关多漏洞修复新闻

## 条目说明

- 对象与具体问题：Google Chrome及Mozilla Firefox；2024 Pwn2Own相关多漏洞修复新闻
- 版本、配置及部署条件：Chrome123.0.6312.86/.87；Firefox124.0.1/ESR115.9.1为文章所称修复
- 认证与权限前提：浏览器内容触发条件，非服务端未授权漏洞
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 多漏洞新闻FM只收2886造成其他主CVE遗漏，Chrome另2887/2883/2885；Firefox29943/29944作为相关报道
- 竞赛演示≠已知在野利用，正文明确Google未说明应保留不确定性
- 修复版本、组件根因、MozillaESR覆盖与平台差异应逐CVE查官方公告，不能整文套版本
- 没有公告原链接和PoC，宜新闻/公告库及浏览器分类而非商业软件单漏洞条目

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

鹏鹏同学  黑猫安全   2024-03-28 11:47  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/8dBEfDPEce9NbceqboWIA5UJzWZ6jYlTgs76WTre043ibDXQq1yDavLom27qOZiasMndX3tcKOr7RGslelFk1FHQ/640?wx_fmt=png&from=appmsg "")  
  
本周，谷歌解决了Chrome浏览器中的几个漏洞，包括两个零日漏洞，分别被跟踪为CVE-2024-2886和CVE-2024-2887，在Pwn2Own Vancouver 2024黑客竞赛期间展示。  
  
高危漏洞CVE-2024-2886是一个位于WebCodecs中的使用后释放问题。该漏洞由KAIST Hacking Lab的Seunghyun Lee(@0x10n)在Pwn2Own 2024期间展示。  
  
高危漏洞CVE-2024-2887是一个位于WebAssembly中的类型混淆问题。Manfred Paul在Pwn2Own 2024期间展示了这个漏洞。谷歌还解决了以下漏洞：  
  
[$10000][327807820] 严重 CVE-2024-2883：ANGLE中的使用后释放问题。由Cassidy Kim(@cassidy6564)于2024年03月03日报告 [TBD][328958020] 高危 CVE-2024-2885：Dawn中的使用后释放问题。由wgslfuzz于2024年03月11日报告。“稳定通道已更新至123.0.6312.86/.87适用于Windows和Mac，123.0.6312.86适用于Linux，将在未来几天/几周内推出。  
  
此版本中的所有更改列表可在日志中找到。”根据该IT巨头发布的公告。该IT巨头并未透露这些漏洞是否在野外被积极利用。上周，Mozilla解决了Firefox浏览器中在最近的Pwn2Own Vancouver 2024黑客竞赛期间被利用的两个零日漏洞。研究人员Manfred Paul(@_manfp)赢得了比赛，分别利用了CVE-2024-29944和CVE-2024-29943跟踪的两个漏洞。  
  
第二天，Paul利用OOB Write进行了Mozilla Firefox的沙盒逃逸以及一个暴露的危险函数漏洞。他因此攻击赢得了10万美元和10个Master of Pwn积分。以下是两个问题的描述，根据公告，漏洞CVE-2024-29944只影响桌面版Firefox，不影响Firefox的移动版本：  
  
CVE-2024-29943：通过欺骗基于范围的边界检查消除，攻击者能够对JavaScript对象执行越界读取或写入。  
  
CVE-2024-29944：攻击者能够向特权对象中注入事件处理程序，从而允许在父进程中执行任意JavaScript代码。Mozilla发布了Firefox 124.0.1和Firefox ESR 115.9.1来解决这两个问题。  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
