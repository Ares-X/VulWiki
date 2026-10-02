---
source: "hatch 补库批 20260928"
product: "EyouCMS1.3.9"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Eyoucms 1.3.9 前台sql注入"
prerequisites: "来源所述条件，未列明部分仍待核：文内称需注册用户；产品模型有对应筛选字段、设置Referer和状态参数"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-c32fe12f228f81fe1d7acf14"
entity_id: "ve-c32fe12f228f81fe1d7acf14"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：文内称需注册用户；产品模型有对应筛选字段、设置Referer和状态参数

- **适用与权限边界（1）**：前台不等于未授权；注册前提和安装配置影响应入摘要。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **结论使用边界（2）**：状态参数ZXLjbXM与ZXljbXM大小写冲突，真正请求使用后者。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **适用与权限边界（3）**：唯一文本URL无注入载荷；三个参数均可注入未列另两者，sqlmap结果只图；Referer说明不等于认证。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Eyoucms 1.3.9 前台sql注入

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

    http://0-sec.org:8081/eyoucms/?m=home&c=View&a=index&aid=89

![](./.resource/Eyoucms1.3.9前台sql注入/media/rId24.png)

然后开启burp抓包，构建如下的包

需要改两方面的参数一是referer，改成我们访问的页面

然后将get的url构造为如下

![](./.resource/Eyoucms1.3.9前台sql注入/media/rId25.png)

然后放进sqlmap一把梭就行啦

### 代码分析

![](./.resource/Eyoucms1.3.9前台sql注入/media/rId27.png)

\'url\_screen\_var\'这个值=\>\'ZXLjbXM\'，这里它cms也注释说明了这个参数代表了文章状态，在前台使用的。

ZXljbXM

这里使用这个参数是需要注册一个用户权限，正好是可以在前台使用

所以上图的refer就代表我们是从用户权限的那里过来的

根据它 ZXLjbXM 所需求的构造如下url。

    GET /eyoucms/?ZXljbXM=1&a=index&c=Lists&m=home&tid=3&yanse=1

看最后的参数yanse 是它这个的cms的产品评论里的参数。本来是系统自带的

但是这个参数也是属于用户发表的文章里面的构造，所以结合ZXLjbXM
即可构造可以存在注入的url链接

![](./.resource/Eyoucms1.3.9前台sql注入/media/rId28.png)

它这里请求的参数没有做防护

其实它这个文件的三个参数都是可以注入但是构造的请求url不相同。通过更改最后的参数即可

如果安装者是经过调整此点，或者仅用来展示网站的，那利用点可能微乎其微了

这个注入点比较鸡肋。其实没有多少高深的东西，只是笔者运气好，恰好看见这个参数。要不真的发现不了。

因为这个文件属于它cms自带的一处产品编辑的文件，实在不容易被注意到。

四、参考链接
------------

> https://xz.aliyun.com/t/6983
