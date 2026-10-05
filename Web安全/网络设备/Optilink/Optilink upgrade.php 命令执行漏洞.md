---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-71cb4a46af017542fbcac71c"
entity_id: "ve-71cb4a46af017542fbcac71c"
schema_version: "1"
title: "Optilink upgrade.php 命令执行漏洞"
product: "Optilink设备，具体型号不明"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "未给型号、固件、鉴权条件"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Optilink/Optilink%20upgrade.php%20%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_status: "unknown"
---

#  Optilink upgrade.php 命令执行漏洞  

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Optilink设备，具体型号不明
- 本文讨论：upgrade.php命令执行
- 版本、权限与配置前提：未给型号、固件、鉴权条件
- 资料类型：截图型PoC摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 写文件、读文件及三工具验证均仅图片，正文无请求或输出
- 无原始来源和具体修复版本，大段推广影响正文边界

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 截图未查看，无法凭文字判定命令注入参数及认证边界
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

Superhero  Nday Poc   2025-07-03 02:44  
  
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
  
  
Optilink upgrade.php 接口存在远程命令执行漏洞。攻击者可以通过漏洞执行任意命令从而获取服务器权限，可能导致内网进一步被攻击。  
  
**02******  
  
**搜索引擎**  
  
  
FOFA:  
```
body="/html/css/dxtdata.css"
```  
  
![](../../.resource/remote/e1e473c3dbe4a2d744e8c2ed5da75f374bf0542a92784e15109042f2cf7e61c6.png "")  
  
  
**03******  
  
**漏洞复现**  
  
写文件  
  
![](../../.resource/remote/f83ed8d7a84b96cb05aa977a29beda58a515251babe91aea26861d666af74c3f.png "")  
  
读文件  
  
![](../../.resource/remote/e98b1cf0554eb06eef84712e85c14484945a4934f1378ad79d19cad52231e448.png "")  
  
  
**04**  
  
**自查工具**  
  
  
nuclei  
  
![](../../.resource/remote/166b20f09e737a0e59e41a2b88ab0de5aee7d907d2209abd9ae7408365fcb1b1.png "")  
  
afrog  
  
![](../../.resource/remote/dc5e90664ac4e408022ab5466eb0bb53c1c5fbd7dce630de9bbde1f6b3daddd9.png "")  
  
xray  
  
![](../../.resource/remote/e2a37e2a7bef6e70722ab06ca75deec08a32d77c4a8015fbe167f52c1ee5967e.png "")  
  
  
**05******  
  
**修复建议**  
  
  
1、关闭互联网暴露面或接口设置访问权限  
  
2、升级至安全版本  
  
  
**06******  
  
**内部圈子介绍**  
  
  
【Nday漏洞实战圈】🛠️   
  
专注公开1day/Nday漏洞复现  
 · 工具链适配支持  
  
 ✧━━━━━━━━━━━━━━━━✧   
  
🔍 资源内容  
  
 ▫️ 整合全网公开  
1day/Nday  
漏洞POC详情  
  
 ▫️ 适配Xray/Afrog/Nuclei检测脚本  
  
 ▫️ 支持内置与自定义POC目录混合扫描   
  
🔄 更新计划   
  
▫️ 每周新增7-10个实用POC（来源公开平台）   
  
▫️ 所有脚本经过基础测试，降低调试成本   
  
🎯 适用场景   
  
▫️ 企业漏洞自查 ▫️ 渗透测试 ▫️ 红蓝对抗   
▫️ 安全运维  
  
✧━━━━━━━━━━━━━━━━✧   
  
⚠️ 声明：仅限合法授权测试，严禁违规使用！  
  
![图片](../../.resource/remote/7949ef457ff8d7833c0a84a353f86732591a27b77cc7537f220e01eeac2a9091.png "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
