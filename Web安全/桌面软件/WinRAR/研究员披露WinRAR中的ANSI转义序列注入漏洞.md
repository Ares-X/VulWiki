---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2024-33899;CVE-2024-36052"
identifier_role: "primary"
primary_identifiers: "CVE-2024-33899;CVE-2024-36052"
referenced_identifiers: ""
identifier_status: "unknown"
title: "研究员披露WinRAR中的ANSI转义序列注入漏洞"
product: "RAR/WinRAR终端输出"
record_type: "advisory"
document_type: "技术混写的新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "文中Windows与Linux/Unix两编号，7.00前；用户处理恶意归档"
side_effects: "终端不可用或应用拒绝服务不能升级为系统崩溃"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/WinRAR/%E7%A0%94%E7%A9%B6%E5%91%98%E6%8A%AB%E9%9C%B2WinRAR%E4%B8%AD%E7%9A%84ANSI%E8%BD%AC%E4%B9%89%E5%BA%8F%E5%88%97%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-b300511efe4e5756e0e6fb21"
entity_id: "ve-b300511efe4e5756e0e6fb21"
schema_version: "1"
---

# 研究员披露WinRAR中的ANSI转义序列注入漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：RAR/WinRAR终端输出
- 文献类型：技术混写的新闻
- 版本、权限及部署边界：文中Windows与Linux/Unix两编号，7.00前；用户处理恶意归档
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 缺两个CVE元数据，需按平台/可执行程序建实体
2. 同166混入ShellExecute错误扩展名执行脚本，与ANSI控制终端内容不构成所述直接因果
3. 终端不可用或应用拒绝服务不能升级为系统崩溃
4. sdushantha.github.io与cybersecuritynews只是站名无文章链接；与166重复，保留额外平台映射但先核验

### 操作风险

终端不可用或应用拒绝服务不能升级为系统崩溃

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

看雪学苑  看雪学苑   2024-05-28 17:59  
  
近日，安全研究员Siddharth Dushantha发现WinRAR这款流行文件压缩软件中存在ANSI转义序列注入漏洞，可能被利用来欺骗用户或是导致系统崩溃。  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/1UG7KPNHN8Gia7p0Adib7Vc2ajS825U9iaquhJDfDL3Q0TVb2gtxOAodRUjXhOCQXJDj2GeVRYZZ06wrUCF6o807w/640?wx_fmt=png&from=appmsg "")  
  
  
该漏洞（Linux、Unix系统：CVE-2024-33899；Windows系统：CVE-2024-36052）影响早于WinRAR 7.00的版本，允许攻击者使用ANSI转义序列伪造屏幕输出。问题源于WinRAR在ZIP存档中未对文件名进行适当验证和清理。当使用WinRAR提取特制ZIP存档时，该应用程序无法正确处理转义序列。相反，它会将其解释为控制字符，允许攻击者操纵显示的文件名，并有可能欺骗用户运行恶意文件。除此之外，特定的ANSI序列也可以在系统上触发本地拒绝服务，使终端无法使用。  
> ANSI转义序列是一种用于控制终端文本格式和外观的特殊代码。大多数序列以ASCII转义符（ESC，\x1B）开头，后跟方括号（[），并嵌入到文本中，通常是用于创建引人注目的命令行界面。  
  
  
  
  
由于文件扩展名的处理不当，当用户尝试从WinRAR内部打开看似无害的文件时，便会触发这一漏洞。WinRAR的ShellExecute函数接收到不正确的参数并执行隐藏的恶意脚本，如批处理文件（.bat）或命令脚本（.cmd）。然后，该脚本便可以在受害者设备上安装恶意软件，同时显示虚假文件以避免引起怀疑。  
  
  
此漏洞已在7.00及更高版本的WinRAR中得到了修复，建议用户及时进行更新以保护自己免受潜在的攻击。  
  
  
  
编辑：左右里  
  
资讯来源：sdushantha.github.io、cybersecuritynews  
  
转载请注明出处和本文链接  
  
  
  
﹀  
  
﹀  
  
﹀  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/Uia4617poZXP96fGaMPXib13V1bJ52yHq9ycD9Zv3WhiaRb2rKV6wghrNa4VyFR2wibBVNfZt3M5IuUiauQGHvxhQrA/640?wx_fmt=jpeg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8E9S6vNnUMRCOictT4PicNGMgHmsIkOvEno4oPVWrhwQCWNRTquZGs2ZLYic8IJTJBjxhWVoCa47V9Rw/640?wx_fmt=gif "")  
  
**球分享**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8E9S6vNnUMRCOictT4PicNGMgHmsIkOvEno4oPVWrhwQCWNRTquZGs2ZLYic8IJTJBjxhWVoCa47V9Rw/640?wx_fmt=gif "")  
  
**球点赞**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8E9S6vNnUMRCOictT4PicNGMgHmsIkOvEno4oPVWrhwQCWNRTquZGs2ZLYic8IJTJBjxhWVoCa47V9Rw/640?wx_fmt=gif "")  
  
**球在看**  
  
****  
****  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/1UG7KPNHN8FxuBNT7e2ZEfQZgBuH2GkFjvK4tzErD5Q56kwaEL0N099icLfx1ZvVvqzcRG3oMtIXqUz5T9HYKicA/640?wx_fmt=gif "")  
  
戳  
“阅读原文  
”  
一起来充电吧！  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
