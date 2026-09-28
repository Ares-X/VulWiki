---
cve: "CVE-2024-27309"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】Apache Kafka访问控制漏洞CVE-2024-27309   
深瞳漏洞实验室  深信服千里目安全技术中心   2024-05-08 18:00  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5z3lJIZAcZxSG2eCU70PHaOGUPbJGFfV8BVick30jtY08xiaIquQ51PDM8yl7f4Xo9PZZgtT5CfluMQ/640?wx_fmt=gif&from=appmsg "")  
  
**漏洞名称：**  
  
Apache Kafka访问控制漏洞  
  
(CVE-2024-27309)  
  
**组件名称：**  
  
Apache-Kafka  
  
**影响范围：**  
  
3.5.0 ≤ Kafka ≤ 3.5.23.6.0 ≤ Kafka ≤ 3.6.1  
  
**漏洞类型：**  
  
访问控制错误  
  
**利用条件：**  
  
1、用户认证：需要管理员权限  
  
2、前置条件：集群从 ZooKeeper 模式迁移到 KRaft模式  
  
3、触发方式：远程  
  
**综合评价：**  
  
<综合评定利用难度>：未知。  
  
<综合评定威胁等级>：高危，能造成拒绝服务。  
  
**官方解决方案：**  
  
已发布  
  
  
  
  
**漏洞分析**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5z3lJIZAcZxSG2eCU70PHaOxPPiboca1GU3lN8dRA6VicjQ12tj073icTfkh92ib5Rib26zHEhqDCzARjw/640?wx_fmt=gif&from=appmsg "")  
  
**组件介绍**  
  
Apache Kafka 是一个开源分布式事件流平台，被数千家公司用于高性能数据管道、流分析、数据集成和任务关键型应用程序。  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5z3lJIZAcZxSG2eCU70PHaOxPPiboca1GU3lN8dRA6VicjQ12tj073icTfkh92ib5Rib26zHEhqDCzARjw/640?wx_fmt=gif&from=appmsg "")  
  
**漏洞简介**  
  
2024年5月8日，深瞳漏洞实验室监测到一则Apache-Kafka组件存在访问控制错误漏洞的信息，漏洞编号：CVE-2024-27309，漏洞威胁等级：高危。  
  
Apache Kafka中存在一个访问控制漏洞，**当Apache Kafka集群从 ZooKeeper 模式迁移到 KRaft模式时，如果管理员删除ACL（访问控制列表），并且与删除的ACL相关联的资源在删除后仍有两个以上其他ACL关联时，将导致ACL可能无法正确执行，该漏洞可能导致未授权访问和拒绝服务攻击。**  
  
  
**影响范围**  
  
目前受影响的Apache Kafka版本：  
  
3.5.0 ≤ Kafka ≤ 3.5.2  
  
3.6.0 ≤ Kafka ≤ 3.6.1  
  
  
**解决方案**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5z3lJIZAcZxSG2eCU70PHaOxPPiboca1GU3lN8dRA6VicjQ12tj073icTfkh92ib5Rib26zHEhqDCzARjw/640?wx_fmt=gif&from=appmsg "")  
  
**如何检测组件系统版本**  
  
  
进入kafka的bin目录下，执行“./kafka-topics.sh --version”即可查看当前kafka版本。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/w8NHw6tcQ5z3lJIZAcZxSG2eCU70PHaOK0v4W7kOibfIKPKHLocrPqf9UT9JFQ69u5PZTVGvfHKl0NlE2aQibp7Q/640?wx_fmt=png&from=appmsg "")  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5z3lJIZAcZxSG2eCU70PHaOxPPiboca1GU3lN8dRA6VicjQ12tj073icTfkh92ib5Rib26zHEhqDCzARjw/640?wx_fmt=gif&from=appmsg "")  
  
**官方修复建议**  
  
  
目前官方已发布最新版本，建议受影响的用户及时更新升级到最新版本。链接如下：  
  
https://lists.apache.org/thread/6536rmzyg076lzzdw2xdktvnz163mjpy  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5z3lJIZAcZxSG2eCU70PHaOxPPiboca1GU3lN8dRA6VicjQ12tj073icTfkh92ib5Rib26zHEhqDCzARjw/640?wx_fmt=gif&from=appmsg "")  
  
**深信服解决方案**  
  
  
**1.风险资产发现**  
  
支持对 Apache Kafka的主动检测，可**批量检出**业务场景中该事件的**受影响资产**情况，相关产品如下：  
  
**【深信服主机安全检测响应平台CWPP】**已发布资产检测方案。  
  
**【深信服云镜YJ】**已发布资产检测方案。  
  
**【深信服漏洞评估工具TSS】**已发布资产检测方案。  
  
**2.漏洞主动扫描**  
  
支持对Apache Kafka访问控制漏洞的主动扫描，可**批量快速检出**业务场景中是否存在**漏洞风险**，相关产品如下：  
  
**【深信服漏洞评估工具TSS】**预计2024年5月9日发布扫描方案。  
  
**【深信服安全托管服务MSS】**预计2024年5月9日发布扫描方案。（需要具备**TSS**组件能力）  
  
  
  
**参考链接**  
  
  
https://lists.apache.org/thread/6536rmzyg076lzzdw2xdktvnz163mjpy  
  
  
  
**时间轴**  
  
  
  
**2024/5/8**  
  
深瞳漏洞实验室监测到Apache Kafka访问控制漏洞信息。  
  
  
**2024/5/8**  
  
深瞳漏洞实验室发布漏洞通告。  
  
  
点击**阅读原文**，及时关注并登录深信服**智安全平台**，可轻松查询漏洞相关解决方案。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/w8NHw6tcQ5z3lJIZAcZxSG2eCU70PHaOGpaeJtFLbcOV5ibgn8PlacVGZGSp0ictZic2MQFfKcEOPYV9JoXIqx0Mg/640?wx_fmt=png&from=appmsg "")  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/w8NHw6tcQ5z3lJIZAcZxSG2eCU70PHaOKlCM7Rs1icriadvmXtpCsFjZTVS4MTRzQ9g2B3scxjrbfx88gdCKN20w/640?wx_fmt=jpeg&from=appmsg "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
