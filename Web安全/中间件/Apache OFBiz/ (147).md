---
cve: "CVE-2022-47501"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】Apache OFBiz任意文件读取漏洞CVE-2022-47501   
深瞳漏洞实验室  深信服千里目安全技术中心   2023-04-11 20:43  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5yPzmWfwyOicianaJnNHg7dI0Am3ziafKIHdbFGYXibqo3mXWicJicSb0Wa5Cc3lC2jIHF0ribIGqsvxuAicA/640?wx_fmt=gif "")  
  
**漏洞名称：**  
  
Apache OFBiz任意文件读取漏洞  
  
**组件名称：**  
  
Apache OFBiz  
  
**影响范围：**  
  
Apache OFBiz < 18.12.07  
  
**漏洞类型：**  
  
任意文件读取  
  
**利用条件：**  
  
1、用户认证：未知  
  
2、前置条件：安装并启用Solr扩展  
  
3、触发方式：远程  
  
**综合评价：**  
  
<综合评定利用难度>：未知。  
  
<综合评定威胁等级>：高危，能造成任意文件读取。  
  
**官方解决方案：**  
  
已发布  
  
  
  
  
**漏洞分析**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5yPzmWfwyOicianaJnNHg7dI0zjpfoWr8L0kOUTs8zGEcgxkIgI2UwFeWKLtUU62YKQOlFYPGic6U5Kw/640?wx_fmt=gif "")  
  
**组件介绍**  
  
Apache OFBiz是一套足够灵活的业务应用程序，可以在任何行业中使用。通用架构允许开发人员轻松扩展或增强它以创建自定义功能。  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5yPzmWfwyOicianaJnNHg7dI0zjpfoWr8L0kOUTs8zGEcgxkIgI2UwFeWKLtUU62YKQOlFYPGic6U5Kw/640?wx_fmt=gif "")  
  
**漏洞简介**  
  
2023年4月11日，深信服安全团队监测到一则Apache OFBiz组件存在任意文件读取漏洞的信息，漏洞编号：CVE-2022-47501，漏洞威胁等级：高危。  
  
**攻击者可利用该漏洞在未授权的情况下，构造恶意数据执行任意文件读取攻击，最终造成服务器敏感性信息泄露。**  
  
  
**影响范围**  
  
目前受影响的版本：  
  
Apache OFBiz < 18.12.07  
  
  
**解决方案**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5yPzmWfwyOicianaJnNHg7dI0zjpfoWr8L0kOUTs8zGEcgxkIgI2UwFeWKLtUU62YKQOlFYPGic6U5Kw/640?wx_fmt=gif "")  
  
**官方修复建议**  
  
  
当前官方  
已发布最新版本，建议受影响的用户及时更新升级到最新版本。链接如下：  
  
https://ofbiz.apache.org/download.html  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5yPzmWfwyOicianaJnNHg7dI0zjpfoWr8L0kOUTs8zGEcgxkIgI2UwFeWKLtUU62YKQOlFYPGic6U5Kw/640?wx_fmt=gif "")  
  
**深信服解决方案**  
  
  
**1.风险资产发现**  
  
****  
支持对Apache OFBiz的主动检测，可**批量检****出**业务场景中该事件的**受影响资产**情况，相关产品如下：  
  
**【深信服云镜YJ】**已发布资产检测方案。  
  
  
**参考链接**  
  
https://issues.apache.org/jira/browse/OFBIZ-12792  
  
  
**时间轴**  
  
  
  
**2023/4/11**  
  
深信服监测到Apache OFBiz任意文件读取漏洞的攻击信息。  
  
  
**2023/4/11**  
  
深信服千里目安全技术中心发布漏洞通告。  
  
  
点击**阅读原文**，及时关注并登录深信服**智安全平台**，可轻松查询漏洞相关解决方案。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/w8NHw6tcQ5yPzmWfwyOicianaJnNHg7dI0E1Bc51jp0VO9dBqIrWEIIay59r6yyrUco2wtESluSsEFNYQ9j20X7g/640?wx_fmt=png "")  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/w8NHw6tcQ5yPzmWfwyOicianaJnNHg7dI0jWFjYbpduTRde3bxSYicteao636aWyu8T4uxUGxAiclhG0XibPPznkLvw/640?wx_fmt=jpeg "")  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
