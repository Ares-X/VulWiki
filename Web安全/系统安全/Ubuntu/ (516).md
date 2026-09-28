---
cve: "CVE-2024-48990"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】Ubuntu needrestart权限提升漏洞CVE-2024-48990   
cexlife  飓风网络安全   2024-11-21 13:54  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu01BvDDicicWzdejPGWCL3uJZpxN0NCZ2FJ4rtMBcmraOGddUE5KQ4hMkN5Qw3lbMB0UUGyEUnh3pM3Q/640?wx_fmt=png&from=appmsg "")  
  
**漏洞描述:**  
needrestart是Ubuntu和其他基于Debian的Linux发行版中常用的一个工具,主要用于检测系统中是否有需要重启的服务或内核模块,它在软件包更新后运行，帮助管理员识别哪些服务或进程需要重新启动以使更新生效,Ubuntu needrestart包中存在多个本地权限提升漏洞,对目标系统具有本地访问权限的攻击者可利用这些漏洞在无需用户交互的情况下将权限提升到root,目前这些漏洞的技术细节已公开,详情如下:**CVE-2024-48990:**Needrestart使用从正在运行的进程中提取的PYTHONPATH环境变量执行Python解释器,如果本地攻击者控制该变量,可以通过植入恶意共享库在Python 初始化期间以root身份执行任意代码。**CVE-2024-48992:**needrestart使用的Ruby解释器在处理攻击者控制的RUBYLIB环境变量时存在漏洞,允许本地攻击者通过向进程注入恶意库以root 身份执行任意Ruby代码。**CVE-2024-48991:**needrestart中的竞争条件漏洞允许本地攻击者用恶意可执行文件替换正在验证的Python解释器二进制文件,诱骗needrestart运行其伪Python 解释器,从而以root身份执行任意代码。**CVE-2024-10224/CVE-2024-11003:**Module::ScanDeps Perl模块用于分析依赖关系,它允许用户通过open()调用外部文件或执行命令,由于它对输入缺乏严格验证,攻击者可以提供恶意输入:使用管道符号（例如将“commands|”作为文件名传递）,或将任意字符串传递给来运行任意shell命令或Perl代码,在CVE-2024-11003中,needrestart使用 Module::ScanDeps来分析依赖文件,如果needrestart在以root权限运行时,错误地将用户可控的输入（例如文件名）传递给Module::ScanDeps,就会以 root特权触发CVE-2024-10224漏洞。  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu01BvDDicicWzdejPGWCL3uJZpVeDmTGwWNwQKhTn7TsL9nKbME6Kzr3CO2mOvZRyM8gDj7XXsSKRj4g/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu01BvDDicicWzdejPGWCL3uJZpSbPOSibMUfPJ9GwahV3u9ID6hcVUSEgcoVTdd8M06wq3yzTHicRVRgWw/640?wx_fmt=png&from=appmsg "")  
  
**影响范围:**  
受影响包版本  
0.8 <= needrestart < 3.8  
  
受影响Ubuntu发行版  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu01BvDDicicWzdejPGWCL3uJZpDsqrqYuWpw3ml0U47picOV8zCzRntX72WLsqmD6eHhJ9soaXpsFoVJw/640?wx_fmt=png&from=appmsg "")  
  
**注**:Jammy、Noble 和Oracular版本中needrestart 包是默认安装的,因此这些版本的服务器安装会受到影响,只有手动安装了needrestart后，Jammy之前的桌面安装和默认Ubuntu Server安装才会受到影响。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu01BvDDicicWzdejPGWCL3uJZpdia38GsjDkFIAC4q92hxrPu2YoY9Ud0v26up9PoOngPfS2T5z9IicFRQ/640?wx_fmt=png&from=appmsg "")  
  
**临时措施:****1.Ubuntu系统上检查是否受到这些漏洞影响。**在系统上运行以下命令并将列出的版本与上表进行比较:apt list --installed | grep "^\(needrestart\|libmodule-scandeps-perl\)"**2.修复措施**建议升级所有软件包:sudo apt update && sudo apt upgrade如果不能执行此操作,可以针对受影响的组件进行以下操作:sudo apt update && sudo apt install --only-upgrade needrestart libmodule-scandeps-perlunattended-upgrades功能在Ubuntu 16.04 LTS及更高版本中默认启用,如果启用此功能,上述补丁将在可用后24小时内自动应用。**3.缓解措施**修改/etc/needrestart/needrestart.conf 文件以禁用解释器扫描功能，从而防止漏洞被利用：# Disable interpreter scanners.$nrconf{interpscan} = 0;  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
