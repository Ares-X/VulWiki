---
source: "gelusus/wxvl 公众号漏洞文库"
title: "致远OA / sursenServlet Fastjson反序列化疑似远程代码执行"
product: "致远OA / sursenServlet"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未给产品/Fastjson/JDK版本，出网配置未列"
prerequisites: "未知"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E8%87%B4%E8%BF%9COA/%E6%BC%8F%E6%B4%9E%E5%A4%8D%E7%8E%B0%20%20%E8%87%B4%E8%BF%9COA%20-seeyon-sursenServlet%20%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
id: "vw-edf005d79c69b3263dd31cfa"
entity_id: "ve-edf005d79c69b3263dd31cfa"
schema_version: "1"
---

# 致远OA / sursenServlet Fastjson反序列化疑似远程代码执行

## 条目说明

- 对象与具体问题：致远OA / sursenServlet；Fastjson反序列化疑似RCE
- 版本、配置及部署条件：未给产品/Fastjson/JDK版本，出网配置未列
- 认证与权限前提：未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 全文复现只有DNSlog和截图，未给HTTP参数/载荷/返回文本，DNS回连不能证明RCE
- 可定位/seeyon/sursenServlet，但与既有Fastjson利用链需完整对照
- 大部分广告，缺原文实际链接/补丁版本，应标证据不完整

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

 实战安全研究   2026-01-13 02:00  
  
**免责声明**  
<table><tbody><tr style="-webkit-tap-highlight-color: transparent;outline: 0px;visibility: visible;"><td valign="top" style="-webkit-tap-highlight-color: transparent;outline: 0px;word-break: break-all;hyphens: auto;visibility: visible;"><strong style="-webkit-tap-highlight-color: transparent;outline: 0px;letter-spacing: 0.544px;color: rgb(255, 0, 0);font-size: 14px;visibility: visible;"><strong style="-webkit-tap-highlight-color: transparent;outline: 0px;color: rgb(62, 62, 62);letter-spacing: 0.544px;orphans: 4;text-align: left;visibility: visible;"><span style="-webkit-tap-highlight-color: transparent;outline: 0px;color: rgb(255, 0, 0);letter-spacing: 0.544px;visibility: visible;"><span leaf="" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);outline: 0px;visibility: visible;">本文仅用于技术学习和安全研究，请勿使用本文所提供的内容及相关技术从事非法活动，由于传播和利用此文所提供的内容或工具而造成任何直接或间接的</span><strong style="-webkit-tap-highlight-color: transparent;outline: 0px;letter-spacing: 0.544px;visibility: visible;"><strong style="-webkit-tap-highlight-color: transparent;outline: 0px;color: rgb(62, 62, 62);letter-spacing: 0.544px;visibility: visible;"><span style="-webkit-tap-highlight-color: transparent;outline: 0px;color: rgb(255, 0, 0);letter-spacing: 0.544px;visibility: visible;"><span leaf="" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);outline: 0px;visibility: visible;">损失</span></span></strong></strong><span leaf="" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);outline: 0px;visibility: visible;">后果，均由使用者本人承担，所产生一切不良后果与文章作者及本账号无关。如内容有争议或侵权，请私信我们！我们会立即删除并致歉。谢谢！</span></span></strong></strong></td></tr></tbody></table>  
1  
  
**漏洞描述**  
  
  
  
北京致远互联软件股份有限公司成立于2002年，总部设立在北京，是一家始终专注于协同管理软件领域的高新技术企业，为客户提供专业的协同管理软件产品、解决方案、平台及云服务，是中国协同管理软件领域的开创者，致远OA/seeyon/sursenServlet存在fastjson反序列化漏洞，攻击者可通过该漏洞获取系统权限。  
  
2  
  
**影响版本**  
  
  
  
致远互联OA  
  
3  
  
**fofa语法**  
  
  
  
fofa语法  
```
app="致远互联-OA"
```  
  
![](https://mmbiz.qpic.cn/mmbiz_png/zBdps5HcBF1XwUKtPWLwCPmyPE8vLHy3UWW2shjRtFKnbxaPXUeiciaaQmPfUaAxjzPVcpLicSjQOC3lIWcRiccUsw/640?wx_fmt=png&from=appmsg "")  
  
  
4  
  
**漏洞复现**  
  
  
  
dnslog  
  
![](https://mmbiz.qpic.cn/mmbiz_png/zBdps5HcBF1XwUKtPWLwCPmyPE8vLHy3ibLXKlF3jtDHiaBG6uCmYzb7r4oWlbIWxuP7GGYp33JakZRV3icNleUpA/640?wx_fmt=png&from=appmsg "")  
  
收到信息  
  
![](https://mmbiz.qpic.cn/mmbiz_png/zBdps5HcBF1XwUKtPWLwCPmyPE8vLHy3EbLhqWXcXxIDdYfeMbQ6oTIRqcordNjQxdxuDToBib6KCKTjvJYdE8A/640?wx_fmt=png&from=appmsg "")  
  
  
5  
  
**检测POC**  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/zBdps5HcBF1XwUKtPWLwCPmyPE8vLHy3icB5j5Yql5nV8iaTcXNELcKpPzRTgBb4LWqhUlZVtRsby4AfzibdBLybg/640?wx_fmt=png&from=appmsg "")  
  
  
6  
  
**漏洞修复**  
  
  
1、建议联系厂商打补丁或升级版本。  
  
2、增加Web应用防火墙防护。  
  
3、关闭互联网暴露面或接口设置访问权限。  
  
7  
  
**内部圈子**  
  
  
**现在已更新POC数量 1600+（中危以上）**  
  
  
🔥 **1day/Nday 漏洞实战圈上线**  
 🔥  
  
还在到处找公开漏洞 POC？  
  
这里专注整合全网1day/Nday漏洞复现，一站式解决你的痛点！  
  
🔍   
圈子福利  
  
✅ 整合全网 1day/Nday 漏洞POC，附带复现步骤，新手也能快速上手  
  
✅ 每周更新 10-15 个POC测试脚本，经过实测验证，到手就能用  
  
✅ 完美适配 Nuclei 主流扫描工具，脚本无需额外修改，即拿即用  
  
✅ 重磅福利：免登录免费 FOFA 查询，无需账号也能高效资产测绘  
  
✅ 专属权益：提供指纹识别库，指纹库持续更新  
  
💡   
适合对象  
  
渗透测试🔹攻防演练🔹安全运维🔹企业自查  
  
👉 不管你是企业安全自查的运维人员，或者是参加攻防演练的战队成员（红队/蓝队），还是做渗透测试的工程师等职业，这里的资源都能适合你  
  
⚠️   
重要提醒  
  
仅限授权范围内的合法安全测试，严禁用于未授权攻击行为！  
  
本服务为虚拟资源服务，一经购买概不退款，请按需谨慎购买！  
  
现在加入圈子价格是59.9元（  
交个朋友啦  
），后面将调整涨价啦。  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/zBdps5HcBF3oJ7iaibTn5lqn7gNWQtO0Areia3jT8E5TBnUFp0u3Y7hXzbtHyicWAzv9RafOVa4YOby4l5ZGsLTRfw/640?wx_fmt=jpeg&from=appmsg "")  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
