---
cve: "CVE-2023-47039"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  漏洞预警 | Perl for Windows代码执行漏洞   
浅安  浅安安全   2024-01-06 08:04  
  
**0x00 漏洞编号**  
- # CVE-2023-47039  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
Perl是一种功能丰富的计算机程序语言，可以运行在多种计算机平台上，适用广泛，可被用于各种任务，包括系统管理、Web开发、网络编程、GUI开发等。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SVf4l3mQ5GChVwbuHwZJvIOF3odCq3AP3OlHoTz1JAAe2343nib9kk4knajuibAJY5LTAdJ8qp98iamg/640?wx_fmt=png&from=appmsg "")  
  
**0x03 漏洞详情**  
###   
###   
  
**CVE-2023-47039**  
  
**漏洞类型：**  
代码执行****  
  
**影响：**  
  
执行任意代码  
  
****  
  
**简述：**  
Perl for Windows中存在代码执行漏洞，其受影响版本中依赖系统路径环境变量来查找shell(`cmd.exe`)时存在安全问题。当运行使用Windows Perl解释器的可执行文件时，Perl会尝试在操作系统中查找并执行`cmd.exe`，由于路径搜索顺序问题，Perl最初是在当前工作目录中查找cmd.exe。低权限威胁者可将`cmd.exe`放在权限较弱的位置（如`C:\ProgramData`）来利用该漏洞，当管理员尝试从这些受影响的位置使用该可执行文件时，可以执行任意代码。  
###   
  
**0x04 影响版本**  
- Perl < 5.32.1  
  
**0x05****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://www.perl.org/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
