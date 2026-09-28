---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  施耐德EcoStruxure™ IT DataCenter Expert漏洞分析  
启明星辰  ADLab   2025-07-15 09:51  
  
更多安全资讯和分析文章请关注启明星辰ADLab微信公众号及官方网站（adlab.venustech.com.cn）  
  
  
  
  
EcoStruxure  
™  
 IT DataCenter Expert  
是施耐德电气推出的本地化数据中心集中监控解决方案，专为供电、制冷、安防及环境系统而设计。它以可视化报告、动态图表和即时告警为核心，帮助运维团队在第一时间发现、定位并处置故障，持续守护关键基础设施的高可用性。  
  
近日，启明星辰  
ADLab  
跟踪到该系统披露存在高危漏洞（  
CVE-2025-50122  
和  
CVE-2025-50123  
）。  
ADLab  
对漏洞进行了技术分析和实验复现，验证了组合使用上述漏洞可实现未授权的远程代码执行，具有现实的危害性。  
- **影响版本**  
  
**<= EcoStruxure™ IT Data Center Expert Versions 8.3**  
- 漏洞  
成因  
  
CVE-2025-50122  
（  
CVSS v3.1 Base Score 8.3 | High  
）  
  
该漏洞是DataCenter Expert的认证算法存在缺陷，攻击者可直接绕过认证。  
  
CVE-2025-50123  
（  
CVSS v3.1 Base Score 7.2 | High  
）  
  
该漏洞是DataCenter Expert的处理逻辑存在操作系统命令注入缺陷，攻击者在认证后可通过特定接口实现任意命令执行。  
- 漏洞复现  
  
代码执行（使用反弹shell为例）的效果如下：  
  
![](https://mmbiz.qpic.cn/mmbiz_png/VuRGkncX57Pekpnybu4qLmvFpVt35rHUWSm2UbYXSA4ezbI8CaBy5LZBaTV0voR19IANkMzicFbGFEfQJnibbiaPQ/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/VuRGkncX57Pekpnybu4qLmvFpVt35rHUSze2Lt7Ceicmje87I8Wia3HgEqUiaulqfJDbdjjn0mJQDWqvnesjcK9Iw/640?wx_fmt=png&from=appmsg "")  
- 解决方案  
  
施耐德在EcoStruxure  
™  
 IT Data Center Expert 9.0  
版本中对该漏洞进行了修复，受影响的厂商应及时更新到该版本以防止相关的漏洞利用。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/VuRGkncX57Pekpnybu4qLmvFpVt35rHUaEa9Pv9o0A399Ll18viaJB5q9K5nqSvMLq92WMxJeBoUcdg0YGic9zicQ/640?wx_fmt=png&from=appmsg "")  
  
  
  
**参考链接：**  
  
[1]  
https://download.schneider-electric.com/files?p_Doc_Ref=SEVD-2025-189-01&p_enDocType=Security+and+Safety+Notice&p_File_Name=SEVD-2025-189-01.pdf  
  
  
  
  
  
启明星辰积极防御实验室（ADLab）  
  
  
  
  
ADLab成立于1999年，是中国安全行业最早成立的攻防技术研究实验室之一，微软MAPP计划核心成员，  
“黑雀攻击”概  
念首推者。截至目前，ADLab已通过 CNVD/CNNVD/NVDB/CVE累计发布安全漏洞6500余个，持续保持国际网络安全领域一流水准。实验室研究方向涵盖基础安全研究、数据安全研究、5G安全研究、AI+安全研究、卫星安全研究、运营商基础设施安全研究、移动安全研究、物联网安全研究、车联网安全研究、工控安全研究、信创安全研究、云安全研究、无线安全研究、高级威胁研究、攻防对抗技术研究。研究成果应用于产品核心技术研究、国家重点科技项目攻关、专业安全服务等  
。  
  
  
  
![图片](https://mmbiz.qpic.cn/mmbiz_png/VuRGkncX57ONOtW3DSPMEXiaLPqrs8a20KxsFg78IaJzyEf51AIjLGNkDG5tsCH76Qo7PoVz74JGQqKJbCh5PdQ/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
