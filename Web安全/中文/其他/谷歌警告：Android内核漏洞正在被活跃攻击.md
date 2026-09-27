---
cve: "CVE-2024-36971"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  谷歌警告：Android内核漏洞正在被活跃攻击   
鹏鹏同学  黑猫安全   2024-08-07 10:04  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/8dBEfDPEceibXXic2V7XWPF80libk2UCibQ8e3ibDCO8YfFd3GegYMzq7TsTNoETtCbvZkaBpH3kPklNDDAQqPFcstA/640?wx_fmt=png&from=appmsg "")  
  
谷歌修复了 Android 内核中的高危漏洞，编号为 CVE-2024-36971。该漏洞是一个远程代码执行漏洞，攻击者可以使用它来执行任意代码和获取root权限。谷歌知道这个漏洞已经被活跃攻击，但没有分享相关攻击的细节。  
  
谷歌的安全公告中写道：“有迹象表明，CVE-2024-36971可能正在受到有限的、目标化的攻击。”该漏洞于 2024 年 6 月由 Google 威胁分析团队（TAG）成员克莱门特·勒辛格（Clement Lecigne）发现。TAG 团队负责调查由国家级攻击者和商业间谍软件供应商实施的攻击。  
  
2024 年 8 月的 Android 安全公告中总共解决了 47 个漏洞，其中包括 Framework（13）、System（1）、Kernel（1）、Arm 组件（2）、Imagination Technologies（1）、MediaTek 组件（1）、Qualcomm 组件（21）和 Qualcomm closed-source 组件（7）。  
这些漏洞包括 Elevate of Privileges、DoS、Remote Code Execution 和 Information disclosure。  
  
公告中写道：  
“这些问题中最严重的是 Framework 组件中的高安全漏洞，可能会导致本地权限 escalation，但不需要任何额外的执行权限。  
”。  
  
2024 年 6 月，谷歌发现了 Pixel 固件中的 elevate of privilege 漏洞，编号为 CVE-2024-32896，该漏洞已经在野外被攻击作为 zero-day。  
公告中写道：  
“有迹象表明，CVE-2024-32896可能正在受到有限的、目标化的攻击。  
”。  
  
谷歌没有提供攻击该漏洞的技术细节。  
Pixel 更新公告提供了安全漏洞和功能改进的详细信息，对于支持的 Google Pixel 设备。  
公司已将所有详细在公告中列出的漏洞解决了，通过 2024-06-05 或更高版本的安全补丁和 2024 年 6 月的 Android 安全公告。  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
