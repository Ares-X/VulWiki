---
cve: "CVE-2023-33008"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】Apache Johnzon 反序列化漏洞CVE-2023-33008   
深瞳漏洞实验室  深信服千里目安全技术中心   2023-07-13 21:24  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5wNia6zA8DGibbSLHtQGjuWibQpoLicbxoWbvqYIXeg2ib77eiaiaRADjFIJzFMmrib79trHGsG9DOG1n3FHA/640?wx_fmt=gif "")  
  
**漏洞名称：**  
  
Apache Johnzon 反序列化漏洞(CVE-2023-33008)  
  
**组件名称：**  
  
Apache Johnzon  
  
**影响范围：**  
  
Apache Johnzon < 1.2.21  
  
**漏洞类型：**  
  
反序列化  
  
**利用条件：**  
  
1、用户认证：未知  
  
2、前置条件：未知  
  
3、触发方式：远程  
  
**综合评价：**  
  
<综合评定利用难度>：未知。  
  
<综合评定威胁等级>：中危，能造成拒绝服务。  
  
**官方解决方案：**  
  
已发布  
  
  
  
  
  
**漏洞分析**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5wNia6zA8DGibbSLHtQGjuWibQtibSoaTaW5IQzyTQUXKV8kfDO81G9VzkR2X9fP1YTRy6XlyR8xicf9vg/640?wx_fmt=gif "")  
  
**组件介绍**  
  
Apache Johnzon 是用于解析和创建 JSONP 的 Java 库。  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5wNia6zA8DGibbSLHtQGjuWibQtibSoaTaW5IQzyTQUXKV8kfDO81G9VzkR2X9fP1YTRy6XlyR8xicf9vg/640?wx_fmt=gif "")  
  
**漏洞简介**  
  
2023年7月13日，深信服安全团队监测到一则Apache Johnzon 组件存在反序列化漏洞的信息，漏洞编号：(CVE-2023-33008)，漏洞威胁等级：中危。  
  
  
该漏洞是由于反序列化时内容的缺少检查，**攻击者可利用该漏洞，构造包含超大数值的JSON数据，执行拒绝服务攻击，最终导致服务处理速度缓慢，甚至崩溃。**  
  
  
**影响范围**  
  
目前受影响的Apache Johnzon版本：  
  
Apache Johnzon < 1.2.21  
  
  
**解决方案**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5wNia6zA8DGibbSLHtQGjuWibQtibSoaTaW5IQzyTQUXKV8kfDO81G9VzkR2X9fP1YTRy6XlyR8xicf9vg/640?wx_fmt=gif "")  
  
**官方修复建议**  
  
  
当前官方已发布最新版本，建议受影响的用户及时更新升级到最新版本。链接如下：  
  
https://johnzon.apache.org/download.html  
  
  
**参考链接**  
  
  
https://issues.apache.org/jira/browse/JOHNZON-397  
  
  
**时间轴**  
  
  
  
**2023/7/13**  
  
深信服监测到Apache Johnzon 反序列化漏洞(CVE-2023-33008)漏洞信息。  
  
  
**2023/7/13**  
  
深信服千里目安全技术中心发布漏洞通告。  
  
  
点击**阅读原文**，及时关注并登录深信服**智安全平台**，可轻松查询漏洞相关解决方案。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/w8NHw6tcQ5wNia6zA8DGibbSLHtQGjuWibQoFSZTc4m47mcRIrOxibpcYySlNiacFDhxQwibTDlyaHEwib19eNVtTNrew/640?wx_fmt=png "")  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/w8NHw6tcQ5wNia6zA8DGibbSLHtQGjuWibQpbklBUfB7Wx3vvFvOcmBhLFe8HvAxEPPkAuyCJaE9rdl3WNUua8rhQ/640?wx_fmt=jpeg "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
