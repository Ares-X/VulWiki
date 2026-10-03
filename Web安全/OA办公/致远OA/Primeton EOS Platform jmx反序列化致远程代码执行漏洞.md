---
source: "gelusus/wxvl 公众号漏洞文库"
title: "Primeton EOS Platform JMX over HTTP反序列化远程代码执行通告"
product: "Primeton EOS Platform"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "EOS<=7.6；列三个安全补丁名称；JMX HTTP handler启用"
prerequisites: "未说明精确认证条件"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态；命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E8%87%B4%E8%BF%9COA/Primeton%20EOS%20Platform%20jmx%E5%8F%8D%E5%BA%8F%E5%88%97%E5%8C%96%E8%87%B4%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
id: "vw-965998c6fa319394ea767006"
entity_id: "ve-965998c6fa319394ea767006"
schema_version: "1"
---

# Primeton EOS Platform JMX over HTTP反序列化远程代码执行通告

## 条目说明

- 对象与具体问题：Primeton EOS Platform；JMX over HTTP反序列化RCE通告
- 版本、配置及部署条件：EOS<=7.6；列三个安全补丁名称；JMX HTTP handler启用
- 认证与权限前提：未说明精确认证条件
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 错分致远OA，应普元EOS；无主CVE，不可因RCE同名合并
- 成因/范围/修复/复现/产品支持全部粘连，handler XML需代码围栏否则可能被渲染吞掉
- 删除JMX HTTP配置须先确认业务不用，不能仅凭HTTP用得少断言可安全删除
- 在野去年利用为长亭声明无独立证据；复现标题无内容，属通告

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态；命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

长亭应急  黑伞安全   2024-04-25 08:30  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/FOh11C4BDicR8MyPCDib6oamTNyIg7iaxAeZXLC894lvZia17dJ4q7X6PB8WTrG0BT0ldJqCGQVAT8CAHRIzmicEAibg/640?wx_fmt=other&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
Primeton EOS Platform（以下简称普元EOS）是一个由普元科技开发的企业级应用软件平台，旨在提供数字化转型、数据管理和流程优化的解决方案。2024年4月，互联网披露普元EOS远程代码执行漏洞情报，经分析，确认该漏洞由反序列化缺陷引起，且该漏洞在去年已存在在野利用。该漏洞利用简单，建议受影响的客户尽快修复漏洞。  
**漏洞描述**  
  
   
Description   
  
  
  
**0****1**  
  
漏洞成因普元EOS某接口开启了JMX over HTTP功能，且未对反序列化数据进行充分的安全检查和限制。漏洞影响这一漏洞的成功利用将会导致严重的安全后果。攻击者通过利用反序列化漏洞，可以在服务器上执行任意代码，从而获得服务器的进一步控制权。最严重的情况下，这可能导致服务器的完全接管，敏感数据泄露，甚至将服务器转化为发起其他攻击的跳板。影响范围 Affects 02普元EOS ≤ 7.6解决方案 Solution 03临时缓解方案该方案是官方推荐的修复方法。与仅仅应用补丁相比，直接关闭相关功能可以更彻底地解决问题。建议在确认不需要使用该功能的情况下，屏蔽JMX的请求。操作步骤：1. 打开配置文件路径：apps_config/default/config/eos/handler-processor.xml2. 在该文件中查找并删除以下配置项：<handler id="JmxServiceProcessor" suffix=".jmx" sortIdx="0" class="com.primeton.access.client.impl.processor.JmxServiceProcessor" />这个配置项原本是用于支持通过HTTP方式访问JMX的。由于平时使用JMX over RMI的频率较高，而通过HTTP的方式较少使用，所以可以安全地删除此配置项。3. 此外，对于所有使用EOS的应用（如governor、workspace等），也需要检查并删除各自配置文件中的相同配置项。升级修复方案应用与反序列化相关的安全补丁3RD_SECURITY_20240125_C1、PLATFORM_V7_SERVER_20230725_P1、3RD__COMMONS_COLLECTIONS_3.2_20151223_P1，以增强对反序列化漏洞的防护。此类补丁通过维护一个黑名单，拦截那些已知存在反序列化漏洞的第三方开源类，阻止这些类被成功反序列化，从而有效遏制攻击。值得注意的是，黑名单需要定期手动更新，以纳入新发现的有漏洞的类，以确保系统的防护有效。请定期关注官方的补丁公告，以便及时获取最新的漏洞补丁。漏洞复现 Reproduction 04  
**产品支持**  
  
   
Support   
  
  
  
**0****5**  
云图：默认支持该产品的指纹识别，同时支持该漏洞的PoC原理检测。洞鉴：已支持该漏洞的原理检测。雷池：默认支持检测该漏洞的利用行为。全悉：默认支持检测该漏洞的利用行为。  
  
  
**时间线**  
  
   
Timeline   
  
  
  
**0****6**  
4月24月 长亭科技监测到漏洞情报4月24日 长亭安全应急响应中心发布通告  
参考资料：  
  
[1].https://www.primeton.com/products/ep/  
  
[2].https://doc.primeton.com:29091/pages/viewpage.action?pageId=118129732  
  
  
**长亭应急响应服务**  
  
  
  
  
全力进行产品升级  
  
及时将风险提示预案发送给客户  
  
检测业务是否收到此次漏洞影响  
  
请联系长亭应急团队  
  
7*24小时，守护您的安全  
  
  
第一时间找到我们：  
  
邮箱：support@chaitin.com  
  
应急响应热线：4000-327-707  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
