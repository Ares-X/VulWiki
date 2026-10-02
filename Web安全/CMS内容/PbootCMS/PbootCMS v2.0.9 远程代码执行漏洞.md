---
source: "hatch 补库批 20260928"
product: "PbootCMS2.0.9"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "PbootCMS v2.0.9 远程代码执行漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：后台编辑站点信息；getallheaders可用、头顺序满足数组取值；PHPassert字符串执行"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-1340ea6571261c9ab81f6fad"
entity_id: "ve-1340ea6571261c9ab81f6fad"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：后台编辑站点信息；getallheaders可用、头顺序满足数组取值；PHPassert字符串执行

- **适用与权限边界（1）**：标题RCE未列后台，作者正常后台植模板后前台触发不能称无认证。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **凭据与会话边界（2）**：最终模板payload只图片，无getallheaders/数组完整表达式；Cookieassert/Proxy-Connection载荷依头排序/代理行为。抓包中的会话不能视为未认证访问证明；可识别的真实会话值按中段星号遮罩处理，默认演示值和攻击语法保留。需重新取得授权测试会话，不能复用文中值。

- **事实待核（3）**：多图复用3.0.1及LFI资源，缺原样请求；控制字符绕过需限定PHP解析版本。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# PbootCMS v2.0.9 远程代码执行漏洞

一、漏洞简介
------------

二、漏洞影响
------------

PbootCMS v2.0.9

三、复现过程
------------

### 漏洞分析

漏洞可以利用的原因在于apps\\home\\controller\\ParserController.php中parserIfLabel函数对if标签解析时安全检验做的不够全面，函数主要存在两处安全校验，如图![1.png](./.resource/PbootCMSv3.0.1远程代码执行漏洞/media/rId25.png)

对于第一处if判断，我们可以在函数名和括号之间插入控制字符，如\\x01，这样即可绕过该处正则校验，并且可以正常执行php代码，该trick来源于KCon2019的一个议题

![2.png](./.resource/PbootCMSv3.0.1远程代码执行漏洞/media/rId26.png)

完整的ppt可以参见文末链接

对于第二处对于敏感函数的过滤，完整的校验如下

    if (preg_match('/(\$_GET\[)|(\$_POST\[)|(\$_REQUEST\[)|(\$_COOKIE\[)|(\$_SESSION\[)|(file_put_contents)|(file_get_contents)|(fwrite)|(phpinfo)|(base64)|(`)|(shell_exec)|(eval)|(assert)|(system)|(exec)|(passthru)|(print_r)|(urldecode)|(chr)|(include)|(request)|(__FILE__)|(__DIR__)|(copy)/i', $matches[1][$i])) {
                        $danger = true;
                    }

在这里其实做的过滤并不全面，我们可以扩展思路，结合一些其他函数，例如call\_user\_func函数来进行利用，同时可以参考PHP无参数RCE的考点，将可控输入点转移到请求包的header头中，直接绕过cms中存在的一些过滤项，上面的利用方式中，使用了getallheaders()同时配合一些数组操作函数来达到执行任意代码的目的

### 漏洞复现

在github上下载源码

https://github.com/hnaoyun/PbootCMS

![3.png](./.resource/PbootCMSv3.0.1远程代码执行漏洞/media/rId28.png)

安装后去https://www.pbootcms.com/freesn/获取授权码，登录后台添加授权码即可

正常登录后台，在站点信息中插入如下代码并且保存

![4.png](./.resource/PbootCMSv2.0.7前台任意文件包含漏洞/media/rId29.png)

![5.png](./.resource/PbootCMSv3.0.1远程代码执行漏洞/media/rId30.png)

保存后我们来到前台首页，使用burpsuite进行抓包，将数据包中的cookie头设为assert，Proxy-Connection头设置为想要执行的php代码，测试图片中使用的代码为system(\'whoami\')
如图

![6.png](./.resource/PbootCMSv3.0.1远程代码执行漏洞/media/rId31.png)

可以看到成功的执行了php代码

参考链接
--------

> https://xz.aliyun.com/t/7918
>
> https://github.com/knownsec/KCon/blob/master/2019/25%E6%97%A5/PHP%E5%8A%A8%E6%80%81%E7%89%B9%E6%80%A7%E7%9A%84%E6%8D%95%E6%8D%89%E4%B8%8E%E9%80%83%E9%80%B8.pdf
