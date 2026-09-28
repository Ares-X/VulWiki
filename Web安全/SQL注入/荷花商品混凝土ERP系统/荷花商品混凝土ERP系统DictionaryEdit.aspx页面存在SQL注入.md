---
fofa: "app.name=="
source: "wy876 漏洞文库"
---

# 荷花商品混凝土ERP系统DictionaryEdit.aspx 页面存在SQL注入

# 一、漏洞简介
杭州荷花软件有限公司开发的商混ERP系统。这套系统主要是处理建筑公司或者各项工程的搅拌站管理，内部含有销售模块、生产管理模块、实验室模块、人员管理等，该公司的商品混凝土ERP系统/Sys/DictionaryEdit.aspx处dict_key参数存在SQL报错注入漏洞，攻击者可通过该漏洞获取数据库权限。

# 二、影响版本
+ 荷花商品混凝土ERP系统

# 三、资产测绘
+ hunter`app.name=="荷花商品混凝土ERP系统"`
+ 特征


# 四、漏洞复现
```plain
/Sys/DictionaryEdit.aspx?dict_key=1
```

出现如下页面大概率存在该漏洞


sqlmap


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/zf12hiwuxxr5b0hp>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
