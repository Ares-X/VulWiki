---
source: "gelusus/wxvl 公众号漏洞文库"
product: "WordPress Avada Fusion Builder"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2026-8713"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "WordPress关键插件漏洞或致100万个网站遭文件删除攻击"
prerequisites: "来源所述条件，未列明部分仍待核：<=3.15.3 fixed3.15.4 claimed; public form configured to store DB entries; manipulated expiry/action and shutdown cleanup"
side_effects: "未执行；本文需注意的操作影响：明确存储型清理触发和无需管理员交互条件有价值，应结构化保留；删除wp-config后RCE仍依安装可访问/DB可用/编辑权限，不是自动任意环境完成"
source_status: "unknown"
id: "vw-a8fb1a625f32b1584e61c332"
entity_id: "ve-a8fb1a625f32b1584e61c332"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：&lt;=3.15.3 fixed3.15.4 claimed; public form configured to store DB entries; manipulated expiry/action and shutdown cleanup

- **适用与权限边界（1）**：正文CVE遗漏元数据；100万安装不等于100万均满足DB表单前提。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **适用与权限边界（2）**：明确存储型清理触发和无需管理员交互条件有价值，应结构化保留。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **操作与副作用边界（3）**：删除wp-config后RCE仍依安装可访问/DB可用/编辑权限，不是自动任意环境完成。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **证据待核（4）**：缺原始Wordfence公告链接，文末承认转载来源找不到；无请求/代码证据。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  WordPress关键插件漏洞或致100万个网站遭文件删除攻击  
 网安百色   2026-06-20 10:22  
  
![](https://mmbiz.qpic.cn/mmbiz_png/WibvcdjxgJnuh7U5fYk3fU8anmFvzK8iaXOkredoUcB6CRLrzeLtfO135hPBJNTIjSNicRUV0WFibGWPwQgEOicSL6G0NpUUWTIaGhtFAzhTib2bI/640?wx_fmt=png&from=appmsg "")  
  
广泛使用的 Avada (Fusion) Builder WordPress 插件中发现了一个严重的安全漏洞。该缺陷可能使未经身份验证的攻击者能够删除任意文件，并可能危及超过一百万个安装站点上的整个网站。  
  
该漏洞被标识为 CVE-2026-8713，CVSS 评分为 9.1，影响该插件的所有版本（最高至 3.15.3）。该问题已在 3.15.4 版本中得到解决。安全研究员“daroo”发现了此问题，并通过 Wordfence 漏洞赏金计划进行了报告，获得了 3,600 美元的奖励。  
  
严重的 WordPress 插件漏洞  
  
该漏洞源于插件的 Fusion_Form_DB_Entries 类中 maybe_delete_files() 函数内的文件路径验证不足。Avada Builder 包含一个表单功能，该功能将用户提交的内容存储在数据库中，随后使用隐私清理机制对其进行处理。  
  
此清理例程旨在在定义的过期时间段后删除或匿名化存储的条目。然而，由于不正确的清理和缺乏路径规范化，该函数无法验证文件路径是否保留在预期的上传目录内。  
  
攻击者可以利用此弱点，通过提交包含路径遍历序列的特制表单输入。由于插件没有使用像 realpath() 这样的函数来强制目录边界，恶意路径（例如对上传目录外敏感文件的引用）会被保留下来。  
  
当清理过程执行时，它会将攻击者控制的 URL 转换为文件系统路径，并将其传递给 WordPress 的 wp_delete_file() 函数，该函数会删除服务器上的任意文件。  
  
利用该漏洞需要一个配置为将条目存储在数据库中的、公开可访问的 Avada 表单。未经身份验证的攻击者可以向 wp_ajax_nopriv_fusion_form_submit_ajax 端点发送请求，将恶意负载注入表单数据中，同时操纵 fusion_privacy_expiration_interval 和 privacy_expiration_action 等参数以触发立即删除。然后，清理例程会通过关闭钩子（shutdown hook）自动处理该条目，无需管理员交互。  
  
一个特别危险的结果是攻击者删除关键文件，如 wp-config.php。删除此文件会迫使 WordPress 进入其安装状态，允许攻击者使用恶意数据库重新配置站点，并最终通过插件或主题部署任意 PHP 代码。这可能导致完全的远程代码执行和整个站点被接管。  
  
Wordfence 证实，其防火墙通过检测并阻止提交的表单数据中的路径遍历尝试，从而针对该漏洞利用提供保护。  
  
本公众号所载文章为本公众号原创或根据网络搜索下载编辑整理，文章版权归原作者所有，仅供读者学习、参考，禁止用于商业用途。因转载众多，无法找到真正来源，如标错来源，或对于文中所使用的图片、文字、链接中所包含的软件/资料等，如有侵权，请跟我们联系删除，谢谢！  
  
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/1QIbxKfhZo5lNbibXUkeIxDGJmD2Md5vKicbNtIkdNvibicL87FjAOqGicuxcgBuRjjolLcGDOnfhMdykXibWuH6DV1g/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&randomid=p6hk1x4r&tp=webp#imgIndex=1 "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
