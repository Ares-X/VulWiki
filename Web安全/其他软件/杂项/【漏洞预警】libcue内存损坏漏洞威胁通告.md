---
cve: "CVE-2023-43641"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】libcue内存损坏漏洞威胁通告   
安识科技  SecPulse安全脉搏   2023-10-12 17:39  
  
1. **通告信息**  
  
  
##   
  
近日，安识科技  
A-Team团队监测到libcue 库中存在内存损坏漏洞（CVE-2023-43641），其CVSSv3评分为8.8，目前该漏洞的细节及PoC已公开。  
  
对此，安识科技建议广大用户及时升级到安全版本，并做好资产自查以及预防工作，以免遭受黑客攻击。  
##   
  
2. **漏洞概述**  
  
  
##   
  
简述：  
Libcue（Cue sheet parser library）是一个用于解析CUE文件（Cuesheet，光盘映/镜像辅助文件）的开源库，它集成到Tracker Miners文件元数据索引器中，默认情况下该索引器包含在GNOME中。  
  
GNOME 是一种在各种 Linux 发行版（例如 Debian、Ubuntu、Fedora、Red Hat Enterprise 和 SUSE Linux Enterprise）中广泛使用的桌面环境。  
  
漏洞名称：  
libcue内存损坏漏洞  
  
CVE编号：  
CVE-2023-43641  
  
Libcue 2.2.1及之前版本中存在内存损坏漏洞，可通过诱导GNOME桌面环境的用户下载恶意制作的.cue文件来利用该漏洞，由于该文件保存到“~/Downloads”，因此tracker-miners会自动扫描该文件，且由于该文件的扩展名为.cue，tracker-miners会使用libcue解析该文件，  
可能导致利用  
libcue 中的漏洞触发越界数组访问，从而导致进程崩溃或代码执行。  
##   
  
3. **漏洞危害**  
  
  
##    
  
通过诱导  
GNOME桌面环境的用户下载恶意制作的.cue文件来利用该漏洞，可能导致利用libcue 中的漏洞触发越界数组访问，从而导致进程崩溃或代码执行。  
##   
  
4. **影响版本**  
  
  
##   
  
受影响的  
Libcue 版本：  
  
Libcue 版本<=2.2.1  
  
注：该漏洞可能会影响运行  
GNOME 桌面环境的某些 Linux 发行版，包括 Debian、Fedora 和 Ubuntu等，已知影响Ubuntu 23.04 和 Fedora 38。  
  
  
5. **解决方案**  
  
  
##   
  
受影响的  
GNOME 桌面环境用户可升级到以下版本，并注意防范下载可疑文件（如包含.cue扩展名的可疑文件）。  
  
Libcue 版本> 2.2.1  
  
下载链接：  
  
https://github.com/lipnitsk/libcue/releases  
##   
  
6. **时间轴**  
  
  
##    
  
【  
-】2023年  
10  
月  
09  
日   
安识科技  
A-Team团队监测到漏洞公布信息  
  
【  
-】2023年  
10  
月  
10  
日   
安识科技  
A-Team团队根据漏洞信息分析  
  
【  
-】2023年  
10  
月  
11  
日   
安识科技  
A-Team团队发布安全通告  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
