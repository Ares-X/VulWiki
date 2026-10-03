---
source: "MrWQ/vulnerability-paper"
id: "vw-52192607eff2e8ebcdb952a7"
entity_id: "ve-52192607eff2e8ebcdb952a7"
schema_version: "1"
fofa_unverified: "title="
title: "锐捷 云课堂主机 pool 目录遍历漏洞   孤桜懶契"
product: "Ruijie云课堂主机软件"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "无登录请求，Tomcat6.0.24响应；产品版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E9%94%90%E6%8D%B7/%E9%94%90%E6%8D%B7%20%E4%BA%91%E8%AF%BE%E5%A0%82%E4%B8%BB%E6%9C%BA%20pool%20%E7%9B%AE%E5%BD%95%E9%81%8D%E5%8E%86%E6%BC%8F%E6%B4%9E%20%20%20%E5%AD%A4%E6%A1%9C%E6%87%B6%E5%A5%91.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://gylq.gitee.io/time/posts/17.html"
source_status: "recorded"
---

# 锐捷 云课堂主机 pool 目录遍历漏洞   孤桜懶契

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Ruijie云课堂主机软件
- 本文讨论：pool目录列表，非证明路径穿越
- 版本、权限与配置前提：无登录请求，Tomcat6.0.24响应；产品版本未知
- 资料类型：目录索引暴露转载；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 标题目录遍历但实际只是Packages.gz/extra/main软件仓库索引，敏感性未证
- FOFA残缺；非网络路由设备；摘要和正文重复网页页脚多
- 已落实的文本修订：残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 暴露内容敏感性、目录索引设计及实际云课堂版本待确认
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [gylq.gitee.io](https://gylq.gitee.io/time/posts/17.html)

> 漏洞描述 i ⭐锐捷云课堂主机存在目录遍历漏洞，通过访问 get 请求 / pool/，即可读取目录. 导致敏感信息泄露. 漏洞影响 s ✅锐捷云课堂 空间测绘 d ⭕FOFA：title="Ruijie" ......

锐捷 云课堂主机 pool 目录遍历漏洞
--------------------

2022-04-09 | [漏洞复现](https://gylq.gitee.io/time/categories/%E6%BC%8F%E6%B4%9E%E5%A4%8D%E7%8E%B0/) | [0](https://gylq.gitee.io/time/posts/17.html#comments) |

| 147

> i ⭐`锐捷云课堂主机存在目录遍历漏洞，通过访问get请求/pool/，即可读取目录.导致敏感信息泄露.`

> s ✅`锐捷云课堂`

> d ⭕`FOFA：title="Ruijie" && "云课堂主机"`

*   ✅访问 `http://1.1.1.1/pool`目录遍历

```
Directory Listing For /

Filename	Size	Last Modified
   Packages.gz	490.8 kb	Fri, 26 May 2017 00:22:32 GMT
   extra/	 	Fri, 26 May 2017 00:22:33 GMT
   main/	 	Fri, 26 May 2017 00:22:33 GMT
   
Apache Tomcat/6.0.24
```

[![](https://gitee.com/gylq/linkimage/raw/master/img1/image-20220409082939453.png)](https://gitee.com/gylq/linkimage/raw/master/img1/image-20220409082939453.png)

> [](#孤桜懶契：https-gylq-gitee-io-time "孤桜懶契：https://gylq.gitee.io/time")孤桜懶契：[https://gylq.gitee.io/time](https://gylq.gitee.io/time)
> ---------------------------------------------------------------------------------------------------------------------------------

本文标题: [锐捷 云课堂主机 pool 目录遍历漏洞](https://gylq.gitee.io/time/posts/17.html)

文章作者: [孤桜懶契](https://gylq.gitee.io/ "访问 孤桜懶契 的个人博客")

发布时间:2022 年 04 月 09 日 - 08:26:57

最后更新:2022 年 04 月 10 日 - 15:09:18

原始链接:[http://gylq.gitee.io/time/posts/17.html](https://gylq.gitee.io/time/posts/17.html "锐捷 云课堂主机 pool 目录遍历漏洞")

许可协议: [署名 - 非商业性使用 - 禁止演绎 4.0 国际](https://creativecommons.org/licenses/by-nc-nd/4.0/ "Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)") 转载请保留原文链接及作者。

------------------- 本文结束 感谢您的阅读 -------------------

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
