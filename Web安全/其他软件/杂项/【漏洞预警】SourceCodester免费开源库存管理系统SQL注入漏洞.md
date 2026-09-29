---
cve: "CVE-2023-6306"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】SourceCodester免费开源库存管理系统SQL注入漏洞   
原创 ZJyang  蚁剑安全实验室   2023-11-28 17:03  
  
**免责声明：该文章仅用于技术讨论与学习。请勿利用文章所提供的相关技术从事非法测试，若利用此文所提供的信息或者工具而造成的任何直接或者间接的后果及损失，均由使用者本人负责，所产生的一切不良后果均与文章作者及本账号无关。**  
  
漏洞名称  
  
SourceCodester  
免费开源库存管理系统  
member_data.phpSQL注入  
(CVE-2023-6306)  
  
漏洞评分  
  
6.3  
（中危）  
  
CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:L/I:L/A:L  
  
漏洞详情  
  
在  
SourceCodester免费和开源库存管理系统  
1.0中发现了一个被归类为严重的漏洞。受影响的是文件  
/ample/app/ajax/member_data.php的未知功能。参数列的操作导致  
SQL注入。可以远程发起攻击。该漏洞利用已向公众披露并可能被使用。该漏洞的标识符为  
VDB-246132。  
<table><tbody><tr><td width="124" valign="top" style="word-break: break-all;"><span style="font-size:10.5pt;font-family:宋体;mso-bidi-font-family:宋体;mso-font-kerning:0pt;mso-ansi-language:EN-US;mso-fareast-language:ZH-CN;mso-bidi-language:AR-SA;">漏洞编号</span><br/></td><td width="124" valign="top" style="word-break: break-all;"><span style="font-size:12.0pt;mso-bidi-font-size:10.5pt;font-family:仿宋;mso-bidi-font-family:
宋体;mso-font-kerning:18.0pt;mso-bidi-font-weight:bold;"><span lang="EN-US">CVE-2023-6306</span></span></td><td width="124" valign="top" style="word-break: break-all;"><span style="font-size:10.5pt;font-family:宋体;mso-bidi-font-family:宋体;mso-font-kerning:0pt;mso-ansi-language:EN-US;mso-fareast-language:ZH-CN;mso-bidi-language:AR-SA;">漏洞类型</span><br/></td><td width="124" valign="top" style="word-break: break-all;"><span lang="EN-US" style="font-size:10.5pt;font-family:
宋体;mso-bidi-font-family:宋体;mso-font-kerning:0pt;mso-ansi-language:EN-US;mso-fareast-language:ZH-CN;mso-bidi-language:AR-SA;">SQL注入</span><br/></td></tr><tr><td width="124" valign="top" style="word-break: break-all;"><span lang="EN-US" style="font-size:10.5pt;font-family:
宋体;mso-bidi-font-family:宋体;mso-font-kerning:0pt;mso-ansi-language:EN-US;mso-fareast-language:ZH-CN;mso-bidi-language:AR-SA;">POC</span><span style="font-size:10.5pt;font-family:宋体;mso-bidi-font-family:宋体;mso-font-kerning:
0pt;mso-ansi-language:EN-US;mso-fareast-language:ZH-CN;mso-bidi-language:AR-SA;">状态</span><br/></td><td width="124" valign="top" style="word-break: break-all;"><span lang="EN-US" style="font-size:10.5pt;font-family:
宋体;mso-bidi-font-family:宋体;mso-font-kerning:0pt;mso-ansi-language:EN-US;mso-fareast-language:ZH-CN;mso-bidi-language:AR-SA;">未知</span><br/></td><td width="124" valign="top" style="word-break: break-all;"><span style="font-size:10.5pt;font-family:宋体;mso-bidi-font-family:宋体;mso-font-kerning:0pt;mso-ansi-language:EN-US;mso-fareast-language:ZH-CN;mso-bidi-language:AR-SA;">漏洞细节</span><br/></td><td width="124" valign="top" style="word-break: break-all;"><span lang="EN-US" style="font-size:10.5pt;font-family:
宋体;mso-bidi-font-family:宋体;mso-font-kerning:0pt;mso-ansi-language:EN-US;mso-fareast-language:ZH-CN;mso-bidi-language:AR-SA;">未知</span><br/></td></tr><tr><td width="124" valign="top" style="word-break: break-all;"><span lang="EN-US" style="font-size:10.5pt;font-family:
宋体;mso-bidi-font-family:宋体;mso-font-kerning:0pt;mso-ansi-language:EN-US;mso-fareast-language:ZH-CN;mso-bidi-language:AR-SA;">EXP</span><span style="font-size:10.5pt;font-family:宋体;mso-bidi-font-family:宋体;mso-font-kerning:
0pt;mso-ansi-language:EN-US;mso-fareast-language:ZH-CN;mso-bidi-language:AR-SA;">状态</span></td><td width="124" valign="top" style="word-break: break-all;"><span lang="EN-US" style="font-size:10.5pt;font-family:
宋体;mso-bidi-font-family:宋体;mso-font-kerning:0pt;mso-ansi-language:EN-US;mso-fareast-language:ZH-CN;mso-bidi-language:AR-SA;">未知</span></td><td width="124" valign="top" style="word-break: break-all;"><span style="font-size:10.5pt;font-family:宋体;mso-bidi-font-family:宋体;mso-font-kerning:0pt;mso-ansi-language:EN-US;mso-fareast-language:ZH-CN;mso-bidi-language:AR-SA;">在野利用</span><br/></td><td width="124" valign="top" style="word-break: break-all;"><span lang="EN-US" style="font-size:10.5pt;font-family:
宋体;mso-bidi-font-family:宋体;mso-font-kerning:0pt;mso-ansi-language:EN-US;mso-fareast-language:ZH-CN;mso-bidi-language:AR-SA;">未知</span></td></tr></tbody></table>  
影响版本  
  
Free and Open Source
Inventory Management System==1.0  
  
修复建议  
  
暂无  
  
参考链接  
  
https://github.com/BigTiger2020/2023/blob/main/Free%20and%20Open%20Source%20inventory%20management%20system/Free%20and%20Open%20Source%20inventory%20management%20system2.md  
  
https://vuldb.com/?id_246132=  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
