---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-ed06a5d4de8e0896e79c5511"
entity_id: "ve-ed06a5d4de8e0896e79c5511"
schema_version: "1"
title: "Ilevia EVE X1 Server login.php 远程命令执行漏洞"
product: "Ilevia EVE X1 Server"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "称未认证，未给软件版本"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%99%BA%E8%83%BD%E8%AE%BE%E5%A4%87/Ilevia%20EVE/Ilevia%20EVE%20X1%20Server%20login.php%20%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_status: "unknown"
---

#  Ilevia EVE X1 Server login.php 远程命令执行漏洞  

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Ilevia EVE X1 Server
- 本文讨论：login.php命令执行候选
- 版本、权限与配置前提：称未认证，未给软件版本
- 资料类型：截图型RCE预警；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 请求/执行输出/检测均仅图片，无注入参数和原始来源
- 修复无安全版本；简介断字未经身份

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 具体入口参数、编号、认证及补丁待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

Superhero
                    Superhero  Nday Poc   2026-02-03 03:47  
  
![图片](../../.resource/remote/a186c4f5d9d52347540c4cbb93e8961b5ba9c0dd7f4fd061d48211661876676f.webp "")  
  
![图片](../../.resource/remote/77be41dad9935140a4007bdfffbddf41fc1a986a3fecd8c99e21852085b04197.webp "")  
  
![图片](../../.resource/remote/44ad08ffbb51946186bc46c860da341a77d976872c15eb51f56d078afe49905c.webp "")  
  
内容仅用于学习交流自查使用，由于传播、利用本公众号所提供的  
POC  
信息及  
POC对应脚本  
而造成的任何直接或者间接的后果及损失，均由使用者本人负责，公众号Nday Poc及作者不为此承担任何责任，一旦造成后果请自行承担！  
  
  
**01**  
  
**漏洞概述**  
  
  
Ilevia EVE X1 Server login.php接口存在远程命令执行漏洞,未经身份攻击者可通过该漏洞在服务器端任意执行代码,写入后门,获取服务器权限,进而控制整个 web 服务器。该漏洞利用难度较低，建议受影响的用户尽快修复。  
**02******  
  
**搜索引擎**  
  
  
fofa:  
```
app="ilevia-EVE-X1-Server"
```  
  
![](../../.resource/remote/d8fd93b1b918efec8e4df2d688d6dcdfedd98015b4dc8f6cd8e62bc8a1169afe.png "")  
  
  
**03******  
  
**漏洞复现**  
  
![](../../.resource/remote/b769b93c9ff3be58c28506f76a2f2f20f341446b4e993a2815afc6578f4894ea.png "")  
  
  
**04**  
  
**自查工具**  
  
  
nuclei  
  
![](../../.resource/remote/d346c28d2a01c7b97e28516e1111db147143fcbc46b84fd44493cee21e66dfd9.png "")  
  
afrog  
  
![](../../.resource/remote/8541f9e7ef93f84a17d643ea337d69d743ec9721f9e08c04d4dc60d4dfa24f87.png "")  
  
  
**05******  
  
**修复建议**  
  
  
1、关闭互联网暴露面或接口设置访问权限  
  
2、升级至安全版本  
  
  
**06******  
  
**内部圈子介绍**  
  
### 【Nday漏洞实战圈】🛠️  
  
专注公开1day/Nday漏洞复现 · 工具链适配支持  
  
✧━━━━━━━━━━━━━━━━✧  
  
🔍 **资源内容**  
  
▫️ 整合全网公开1day/Nday漏洞POC详情  
  
▫️ 适配Afrog/Nuclei检测脚本  
  
▫️ 支持内置与自定义POC目录混合扫描  
  
🔄 **更新计划**  
  
▫️ 每周新增7-10个实用POC（来源公开平台）  
  
▫️ 所有脚本经过基础测试，降低调试成本  
  
🎯 **适用场景**  
  
▫️ 企业漏洞自查 ▫️ 渗透测试 ▫️ 红蓝对抗 ▫️ 安全运维  
  
✧━━━━━━━━━━━━━━━━✧  
  
⚠️ **重要声明**  
  
▫️  
仅限合法授权测试，严禁违规使用  
  
**▫️虚拟资源服务，购买后不接受任何形式退款**  
  
▫️  
付款  
前请评估需求，慎重考虑  
  
![图片](../../.resource/remote/4428dc76d2c013f78f0daa13fca8f149630fb39b622693a7a86d07d5a844544d.png "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
