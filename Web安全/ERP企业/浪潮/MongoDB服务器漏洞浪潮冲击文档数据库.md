---
source: "gelusus/wxvl 公众号漏洞文库"
title: "MongoDB Server 四缺陷UAF/递归DoS/元数据/聚合崩溃公告"
product: "MongoDB Server"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2026-11933;CVE-2026-9740;CVE-2026-9750;CVE-2026-9743"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "7/8各分支；8.0.26/8.2.11/8.3.4修复声明逐CVE待核"
prerequisites: "11933需认证读权限JS，9740未认证，其他认证条件不同"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
identifier_role: "primary"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E6%B5%AA%E6%BD%AE/MongoDB%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%BC%8F%E6%B4%9E%E6%B5%AA%E6%BD%AE%E5%86%B2%E5%87%BB%E6%96%87%E6%A1%A3%E6%95%B0%E6%8D%AE%E5%BA%93.md"
category_recommendation: "数据库 / MongoDB"
id: "vw-16ac431ce83ce7b7505ef4a8"
entity_id: "ve-16ac431ce83ce7b7505ef4a8"
schema_version: "1"
---

# MongoDB Server 四缺陷UAF/递归DoS/元数据/聚合崩溃公告

## 条目说明

- 对象与具体问题：MongoDB Server；四缺陷UAF/递归DoS/元数据/聚合崩溃公告
- 版本、配置及部署条件：7/8各分支；8.0.26/8.2.11/8.3.4修复声明逐CVE待核
- 认证与权限前提：11933需认证读权限JS，9740未认证，其他认证条件不同
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 一个SERVER链接未涵盖所有缺陷版本，需逐项官方公告
- 无复现属新闻，别将一漏洞未认证扩展四项

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

sec随谈
                    sec随谈  sec随谈   2026-06-17 00:26  
  
一批新的MongoDB服务器漏洞集群已浮出水面，对广泛使用的文档数据库构成真实风险。厂商已修补四个独立缺陷，涵盖范围从远程崩溃到内存信息泄露不等。  
  
**内存漏洞居首**  
  
两个最严重的漏洞CVSS评分均为8.7。CVE-2026-11933是服务器端JavaScript引擎中的一个释放后使用（use-after-free）漏洞，拥有读取权限的已认证用户可通过 $where  
 或 $function  
 调用触发该漏洞，导致服务器泄露进程内存或直接崩溃。  
  
CVE-2026-9740的利用门槛则更低。由于该漏洞存在于BSON验证逻辑中，未经认证的攻击者只需发送一条精心构造的消息即可使mongod进程崩溃。该缺陷源于不受控制的递归调用，会悄然重置内部深度追踪机制。  
  
**已认证崩溃漏洞亦不容忽视**  
  
另外两个评分为7.1的漏洞同样值得关注。CVE-2026-9750允许已认证用户破坏内部元数据，导致服务器崩溃或查询结果错误。CVE-2026-9743则利用聚合操作中的空子管道缺陷，通过构造特定的getMore请求即可使服务器下线。  
  
此次MongoDB服务器漏洞集群影响范围跨越多个版本，受影响分支包括7.0、8.0、8.2及8.3等。  
  
**立即打补丁**  
  
由于其中一个漏洞无需任何登录凭证即可利用，管理员应尽快升级。可直接从MongoDB社区下载页面获取最新版本并迁移至已修复的发行版。  
  
已修复版本包括8.0.26、8.2.11和8.3.4，以及若干旧版本的维护更新。建议在正式部署前仍进行补丁测试，但鉴于存在无需认证的崩溃漏洞，速度应作为首要考量。  
  
参考链接：  
  
https://jira.mongodb.org/browse/SERVER-128125  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
