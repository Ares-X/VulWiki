---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Primeton EOS Platform jmx反序列化致远程代码执行漏洞   
长亭应急  黑伞安全   2024-04-25 08:30  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/FOh11C4BDicR8MyPCDib6oamTNyIg7iaxAeZXLC894lvZia17dJ4q7X6PB8WTrG0BT0ldJqCGQVAT8CAHRIzmicEAibg/640?wx_fmt=other&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
Primeton EOS Platform（以下简称普元EOS）是一个由普元科技开发的企业级应用软件平台，旨在提供数字化转型、数据管理和流程优化的解决方案。2024年4月，互联网披露普元EOS远程代码执行漏洞情报，经分析，确认该漏洞由反序列化缺陷引起，且该漏洞在去年已存在在野利用。该漏洞利用简单，建议受影响的客户尽快修复漏洞。  
**漏洞描述**  
  
   
Description   
  
  
  
**0****1**  
  
漏洞成因普元EOS某接口开启了JMX over HTTP功能，且未对反序列化数据进行充分的安全检查和限制。漏洞影响这一漏洞的成功利用将会导致严重的安全后果。攻击者通过利用反序列化漏洞，可以在服务器上执行任意代码，从而获得服务器的进一步控制权。最严重的情况下，这可能导致服务器的完全接管，敏感数据泄露，甚至将服务器转化为发起其他攻击的跳板。影响范围 Affects 02普元EOS ≤ 7.6解决方案 Solution 03临时缓解方案该方案是官方推荐的修复方法。与仅仅应用补丁相比，直接关闭相关功能可以更彻底地解决问题。建议在确认不需要使用该功能的情况下，屏蔽JMX的请求。操作步骤：1. 打开配置文件路径：apps_config/default/config/eos/handler-processor.xml2. 在该文件中查找并删除以下配置项：<handler id="JmxServiceProcessor" suffix=".jmx" sortIdx="0" class="com.primeton.access.client.impl.processor.JmxServiceProcessor" />这个配置项原本是用于支持通过HTTP方式访问JMX的。由于平时使用JMX over RMI的频率较高，而通过HTTP的方式较少使用，所以可以安全地删除此配置项。3. 此外，对于所有使用EOS的应用（如governor、workspace等），也需要检查并删除各自配置文件中的相同配置项。升级修复方案应用与反序列化相关的安全补丁3RD_SECURITY_20240125_C1、PLATFORM_V7_SERVER_20230725_P1、3RD__COMMONS_COLLECTIONS_3.2_20151223_P1，以增强对反序列化漏洞的防护。此类补丁通过维护一个黑名单，拦截那些已知存在反序列化漏洞的第三方开源类，阻止这些类被成功反序列化，从而有效遏制攻击。值得注意的是，黑名单需要定期手动更新，以纳入新发现的有漏洞的类，以确保系统的防护有效。请定期关注官方的补丁公告，以便及时获取最新的漏洞补丁。漏洞复现 Reproduction 04  
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
