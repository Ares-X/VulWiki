---
cve: "CVE-2024-36052"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  发现WinRAR严重漏洞！利用ANSI 转义序列欺骗用户触发   
安全客  安全客   2024-05-24 18:55  
  
Windows 上流行的文件压缩和归档实用程序 WinRAR 中发现了一个严重漏洞。  
  
该漏洞编号为 CVE-2024-36052，影响 WinRAR 7.00 之前的版本，允许攻击者使用 ANSI 转义序列欺骗屏幕输出。  
  
问题源于 WinRAR 缺乏对 ZIP 档案中文件名的正确验证和清理。Siddharth Dushantha 发现了这个漏洞。  
  
当使用 WinRAR 提取包含名称中带有ANSI 转义序列的文件的特制 ZIP 档案时，该应用程序无法正确处理转义序列。  
  
相反，它将它们解释为控制字符，允许攻击者操纵显示的文件名并可能诱骗用户运行恶意文件。  
  
ANSI 转义序列是用于控制命令行界面和终端中文本格式和外观的特殊代码。大多数序列以 ASCII 转义字符 (ESC、\x1B) 开头，后跟括号字符 ([)，并嵌入到文本中。  
  
通过制作包含这些序列的恶意档案，攻击者可以操纵显示的输出并欺骗用户相信他们正在打开无害的文件，例如 PDF 或图像。  
  
当用户尝试在WinRAR中打开看似无害的文件时，由于对文件扩展名处理不当，漏洞就会被触发。  
  
Dushantha表示，WinRAR 的 ShellExecute 函数没有启动预期的文件，而是收到了错误的参数并执行了隐藏的恶意脚本，例如批处理文件 (.bat) 或命令脚本 (.cmd) 。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/Ok4fxxCpBb7tUnqMrZqAVneiajSxlibcxskn4cW9PGjDIZ5iaSSam0JKOs5huMvZtFEX5xHzsRicibXlZNPXMLrmmzg/640?wx_fmt=gif&from=appmsg "")  
  
然后，该脚本可以在受害者的设备上安装恶意软件，同时显示诱饵文档以避免引起怀疑。  
  
值得注意的是，此漏洞特定于 Windows 上的 WinRAR，与影响 Linux 和 UNIX 平台上的 WinRAR 的 CVE-2024-33899 不同。  
  
WinRAR 的 Linux 和 UNIX 版本也容易受到通过 ANSI 转义序列的屏幕输出欺骗和拒绝服务攻击。  
  
为了减轻此漏洞带来的风险，建议用户更新到 WinRAR 7.00 或更高版本，其中包含针对该问题的修复。  
  
此外，打开来自不受信任来源的档案时要小心谨慎，并在 Windows 中启用文件扩展名可见性，可以帮助防止此类攻击。  
  
该漏洞于 2024 年 5 月 23 日公开披露，WinRAR 用户必须立即采取行动，保护他们的系统免受恶意行为者的潜在利用。  
  
文章来源：https://cybersecuritynews.com/winrar-flaw-deceive-users/  
  
  
**来**  
  
**领**  
  
**资**  
  
**料**  
  
**【免费领】**  
**网络安全专业入门与进阶学习资料，轻松掌握网络安全技能！**  
  
****![](https://mmbiz.qpic.cn/sz_mmbiz_png/Ok4fxxCpBb4N2VUg5icoU6eUKJ14GUznZiaB5GRRWfKMn3k9mc03BRO6zB0LoPzN4UFb1vIKXwibvsEkPLy6ozj8Q/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
