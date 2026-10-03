---
source: "gelusus/wxvl 公众号漏洞文库"
title: "泛微e-office dept.wsdl.php SQL注入"
product: "泛微e-office"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "<=9.5声称，无补丁细节"
prerequisites: "声称未认证"
side_effects: "延迟探测可能占用数据库连接或影响服务"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%BC%8F%E6%B4%9E%E5%A4%8D%E7%8E%B0%20%20%E6%B3%9B%E5%BE%AEe-office%20dept.wsdl.php%20%E6%8E%A5%E5%8F%A3%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
id: "vw-38533bfa1c49fc4dec0768d9"
entity_id: "ve-38533bfa1c49fc4dec0768d9"
schema_version: "1"
---

# 泛微e-office dept.wsdl.php SQL注入

## 条目说明

- 对象与具体问题：泛微e-office；dept.wsdl.php SQL注入
- 版本、配置及部署条件：<=9.5声称，无补丁细节
- 认证与权限前提：声称未认证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 全文仅漏洞简介/延迟8秒说明，真实请求和nuclei/afrog检测全部截图，文字无端点完整路径/参数
- 占大篇幅付费圈子广告不构成资料；未包含所谓1600+POC工具
- 应标截图依赖/待转录证据，不能当完整可用POC

## 操作风险

延迟探测可能占用数据库连接或影响服务。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

 实战安全研究   2026-01-19 02:00  
  
**免责声明**  
<table><tbody><tr style="-webkit-tap-highlight-color: transparent;outline: 0px;visibility: visible;"><td valign="top" style="-webkit-tap-highlight-color: transparent;outline: 0px;word-break: break-all;hyphens: auto;visibility: visible;"><strong style="-webkit-tap-highlight-color: transparent;outline: 0px;letter-spacing: 0.544px;color: rgb(255, 0, 0);font-size: 14px;visibility: visible;"><strong style="-webkit-tap-highlight-color: transparent;outline: 0px;color: rgb(62, 62, 62);letter-spacing: 0.544px;orphans: 4;text-align: left;visibility: visible;"><span style="-webkit-tap-highlight-color: transparent;outline: 0px;color: rgb(255, 0, 0);letter-spacing: 0.544px;visibility: visible;"><span leaf="" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);outline: 0px;visibility: visible;">本文仅用于技术学习和安全研究，请勿使用本文所提供的内容及相关技术从事非法活动，由于传播和利用此文所提供的内容或工具而造成任何直接或间接的</span><strong style="-webkit-tap-highlight-color: transparent;outline: 0px;letter-spacing: 0.544px;visibility: visible;"><strong style="-webkit-tap-highlight-color: transparent;outline: 0px;color: rgb(62, 62, 62);letter-spacing: 0.544px;visibility: visible;"><span style="-webkit-tap-highlight-color: transparent;outline: 0px;color: rgb(255, 0, 0);letter-spacing: 0.544px;visibility: visible;"><span leaf="" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);outline: 0px;visibility: visible;">损失</span></span></strong></strong><span leaf="" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);outline: 0px;visibility: visible;">后果，均由使用者本人承担，所产生一切不良后果与文章作者及本账号无关。如内容有争议或侵权，请私信我们！我们会立即删除并致歉。谢谢！</span></span></strong></strong></td></tr></tbody></table>  


1  
  
**漏洞描述**  
  
  
  
泛微e-office dept.wsdl.php 接口处存在SQL注入漏洞，未经身份验证的恶意攻击者利用 SQL 注入漏洞获取数据库中的信息  
，攻击者甚至可以在高权限下向服务器写入命令，进一步获取服务器系统权限。  
  
2  
  
**影响版本**  
  
  
  
e-office <=9.5  
  
3  
  
**fofa语法**  
  
  
  
fofa语法  
```
app="泛微-EOffice"
```  
  
![](https://mmbiz.qpic.cn/mmbiz_png/zBdps5HcBF2HxnTRnrTpdh2ODia7nLFhMS7GYNdfFmPxZ9tH2Kc4eHFS499pFdDSdicLGuuF5iaeZvKFrvmibc12AQ/640?wx_fmt=png&from=appmsg "")  
  
  
4  
  
**漏洞复现**  
  
  
  
延迟8秒  
  
![](https://mmbiz.qpic.cn/mmbiz_png/zBdps5HcBF2HxnTRnrTpdh2ODia7nLFhMUeiaj7s2mbXf5B76uqTOvEGEibnsQqoCe3YCkAXheuoXJJ6jIiaAcCszg/640?wx_fmt=png&from=appmsg "")  
  
  
5  
  
**检测POC**  
  
  
  
nuclei  
  
![](https://mmbiz.qpic.cn/mmbiz_png/zBdps5HcBF2HxnTRnrTpdh2ODia7nLFhMCeh45qMxcUxTaN57EqkrjHNgQPicch7Mfoq2dYTw4AMsIIuic5u9nZfA/640?wx_fmt=png&from=appmsg "")  
  
afrog  
  
![](https://mmbiz.qpic.cn/mmbiz_png/zBdps5HcBF2HxnTRnrTpdh2ODia7nLFhMbmvDs4RxtcIBpgqb4PHL5nmoFcPtK3EVtCQbMibf3tmk4ibJ8BwBO7JA/640?wx_fmt=png&from=appmsg "")  
  
  
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
🔹SRC漏洞挖掘  
  
👉 不管你是参加攻防演练的战队成员（红队/蓝队），或者是做渗透测试的工程师，还是做src漏洞挖掘和企业安全自查的运维人员等职业，这里的资源都能适合你  
  
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
