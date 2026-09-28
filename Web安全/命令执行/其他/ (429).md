---
cve: "CVE-2026-40466"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】Apache ActiveMQ 远程代码执行漏洞(CVE-2026-40466)  
深瞳漏洞实验室
                    深瞳漏洞实验室  深信服千里目安全技术中心   2026-04-24 12:29  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/APc6NwjLsxQ2QrvYftegyQickBtSBL5cPPDR8HuWOnzIUsGd9IpJicblDuedyqtd0hicz8ol6jxWtc8RGia8F2yhj39LotGrNZsKpbHe1xvcAFc/640?wx_fmt=gif&from=appmsg "")  
  
**漏洞名称：**  
  
Apache ActiveMQ 远程代码执行漏洞(CVE-2026-40466)  
  
**组件名称：**  
  
Apache ActiveMQ  
  
**影响范围：**  
  
Apache ActiveMQ < 5.19.6  
  
6.0.0 ≤ Apache ActiveMQ< 6.2.5  
  
Apache ActiveMQ Broker < 5.19.6  
  
6.0.0 ≤ Apache ActiveMQ Broker < 6.2.5  
  
Apache ActiveMQ All < 5.19.6  
  
6.0.0 ≤ Apache ActiveMQ All < 6.2.5  
  
**漏洞类型：**  
  
代码执行  
  
**利用条件：**  
  
1、用户认证：需要用户认证  
  
2、前置条件：默认配置  
  
3、触发方式：远程  
  
**综合评价：**  
  
<综合评定利用难度>：困难，需要认证。  
  
<综合评定威胁等级>：高危，能造成远程代码执行。  
  
**官方解决方案：**  
  
已发布  
  
  
  
  
**漏洞分析**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/APc6NwjLsxSQe1zrUVlqbfvgIs15bKkNwMmfwmklroiaqxgdBNtcicNmoxelqD5DEKI0tiaOYYo51SXAoicYjp0AEADSnRRc6HBKKzNoYFChwSo/640?wx_fmt=gif&from=appmsg "")  
  
组件介绍  
  
Apache ActiveMQ 是最流行的开源、多协议、基于 Java 的消息代理。它支持行业标准协议，因此用户可以从多种语言和平台的客户端选择中受益。从使用 JavaScript、C、C++、Python、.Net 等编写的客户端进行连接。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/APc6NwjLsxTx4waGibEAW4qpbOJlJZaD3Jea9kX4YicyKP3EIYoicgHjiaibMicibL99YynlvWiafZ6q5WS9Qm69pfYz6E6icyVFJsdGRbY0iaUuWeaDY/640?wx_fmt=gif&from=appmsg "")  
  
**漏洞简介**  
  
  
2026年4月24日，深瞳漏洞实验室监测到一则Apache ActiveMQ组件存在代码执行漏洞的信息，漏洞编号：CVE-2026-40466，漏洞威胁等级：高危。  
  
  
Apache ActiveMQ Broker、Apache Active MQ All和Apache ActiveMQ中的输入验证不正确、代码生成控制不正确代码注入漏洞。**如果ActiveMQ HTTP模块在类路径上，则经过身份验证的攻击者可以通过BrokerView.addNetworkConnector或BrokerView.addConnector通过Jolokia使用HTTP Discovery传输添加连接器，从而绕过CVE-2026-34197中的修复。恶意HTTP端点可以通过HTTP URI返回VM传输，这将绕过CVE-2026-34197中添加的验证。然后，攻击者可以使用VM传输的BrokerConfig参数来使用ResourceXmlApplicationContext加载远程Spring XML应用程序上下文。**  
  
  
  
  
**影响范围**  
  
目前受影响的Apache ActiveMQ版本：  
  
Apache ActiveMQ < 5.19.6  
  
6.0.0 ≤ Apache ActiveMQ < 6.2.5  
  
Apache ActiveMQ Broker < 5.19.6  
  
6.0.0 ≤ Apache ActiveMQ Broker < 6.2.5  
  
Apache ActiveMQ All < 5.19.6  
  
6.0.0 ≤ Apache ActiveMQ All < 6.2.5  
  
  
  
**解决方案**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/APc6NwjLsxQiaGJzYUWXbWUesuAUbYHAG8VDBLibjKibIQcVSyKA7L5Gb6Amn7MzGgpGCMhmP2SAH9x3NaHVPdibIcqNH4E0wxtYG3hNYib3kMXw/640?wx_fmt=gif&from=appmsg "")  
  
**官方修复建议**  
  
  
官方已发布最新版本修复该漏洞，建议受影响用户将Apache ActiveMQ升级到最新版本。  
  
下载链接：https://activemq.apache.org/download.html  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/APc6NwjLsxQNHlQeJFFltuCiaSKYR5lAIqFy6nMab8lvU6qttul1iaa6crffXGx8oCXh3O3RiaemDBDFOzI9esyhmuOLbhBFlAvfNNWBg1RXLk/640?wx_fmt=gif&from=appmsg "")  
  
**临时修复建议**  
  
- 关闭未使用的功能模块，减少潜在攻击入口。  
  
- 遵循最小权限原则，严控各类敏感操作权限范围。  
  
- 非必要不暴露服务到公网，限制访问源为可信范围。  
  
- 定期更新系统及各类组件至安全版本，及时修补已知隐患。  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/APc6NwjLsxTsS0eVuF69sBUqU1ibY35UciaPiahqiaKspFI1AV1FPn6ibKK7KjWNypPblfic080k0SRiaVOZNHDBeNYwCQ9KmtJDg5tIUvjDs6m6kU/640?wx_fmt=gif&from=appmsg "")  
  
**深信服解决方案**  
  
  
**1、风险资产发现**  
  
支持对Apache ActiveMQ的主动检测，**可批量检出业务场景中该事件的受影响资产情况，**  
相关产品如下：  
  
**【深信服云镜YJ】**  
 已发布资产检测方案，指纹ID:0007260。  
  
**【深信服漏洞评估工具TSS】**  
已发布资产检测方案，指纹ID:0007260。  
  
  
**2、漏洞主动检测**  
  
支持对Apache ActiveMQ 远程代码执行漏洞(CVE-2026-40466)的主动检测，**可批量快速检出业务场景中是否存在漏洞风险，**  
相关产品如下：  
  
**【深信服云镜YJ】**  
预计2026年04月26日发布检测方案，规则ID:SF-2026-00904。  
  
**【深信服漏洞评估工具TSS】**  
预计2026年05月30日发布检测方案，规则ID:SF-2026-01015。  
  
**【深信服安全托管服务MSS】**  
预计2026年05月30日发布检测方案（需要具备TSS组件能力），规则ID:SF-2026-01015。  
  
**【深信服可拓展检测响应平台XDR】**  
预计2026年04月26日发布检测方案（需要具备云镜组件能力），规则ID:SF-2026-00904。  
  
  
**3、漏洞安全监测**  
  
支持对Apache ActiveMQ 远程代码执行漏洞(CVE-2026-40466)的监测，**可依据流量收集实时监控业务场景中的受影响资产情况，快速检查受影响范围，**  
相关产品及服务如下：  
  
**【深信服安全感知管理平台SIP】**  
预计2026年05月08日发布监测方案，规则ID:11220422。  
  
**【深信服安全托管服务MSS】**  
预计2026年05月08日发布监测方案（需要具备SIP组件能力），规则ID:11220422。  
  
**【深信服可拓展检测响应平台XDR】**  
预计2026年05月08日发布监测方案，规则ID:11220422。  
  
  
**4、漏洞安全防护**  
  
支持对Apache ActiveMQ 远程代码执行漏洞(CVE-2026-40466)的防御，**可阻断攻击者针对该事件的入侵行为，**  
相关产品及服务如下：  
  
**【深信服下一代防火墙AF】**  
预计2026年05月08日发布防护方案，规则ID:11220422。  
  
**【深信服Web应用防火墙WAF】**  
预计2026年05月08日发布防护方案，规则ID:11220422。  
  
**【深信服安全托管服务MSS】**  
预计2026年05月08日发布防护方案（需要具备AF组件能力），规则ID:11220422。  
  
**【深信服可拓展检测响应平台XDR】**  
预计2026年05月08日发布防护方案（需要具备AF组件能力），规则ID:11220422。  
  
  
  
参考链接  
  
  
https://seclists.org/oss-sec/2026/q2/207  
  
  
  
时间轴  
  
  
  
**2026/04/24**  
  
深瞳漏洞实验室监测到Apache ActiveMQ 远程代码执行漏洞信息。  
  
  
**2026/04/24**  
  
深瞳漏洞实验室发布漏洞通告。  
  
  
点击**阅读原文**  
，及时关注并登录深信服**智安全平台**  
，可轻松查询漏洞相关解决方案。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/APc6NwjLsxS7Q83Yvz2B1pf0x2xnOLJcaiaxm5kFQEUysLPGuVuU2xzgRRDehu3pQJw3ib7Y3MAruf4CCLibu5LCtxT2VlGsia6lj432kEIeuPU/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/w8NHw6tcQ5zvcIHbwGGYKbqDVYsVKzNNia1jYtHf49C7133AlDXAgex2W4lFvpia56tjQQDkiauNBrl08YbxqG01A/640?wx_fmt=jpeg&from=appmsg "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
