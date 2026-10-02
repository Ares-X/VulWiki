---
source: "hatch 补库批 20260928"
product: "JizhiCMS1.7.1 / FrPHP"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Jizhicms 1.7.1 从sql注入到任意文件上传"
prerequisites: "来源所述条件，未列明部分仍待核：自定义URL查询注入，DB可UPDATE；后台登录清缓存/上传PHP，目录可执行"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-0e96b3ee49a870ec3506d7d9"
entity_id: "ve-0e96b3ee49a870ec3506d7d9"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：自定义URL查询注入，DB可UPDATE；后台登录清缓存/上传PHP，目录可执行

- **证据待核（1）**：从正文中途回显开头，缺原始SQL注入请求和UPDATE载荷；SELECT注入如何跨到UPDATE未解释。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **适用与权限边界（2）**：明确要登录后台清缓存，不能将最终RCE归无认证前台单步。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **结论使用边界（3）**：保留缓存fileType机制与源码，不能和213/214不同SQL入口直接合并。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Jizhicms 1.7.1 从sql注入到任意文件上传

一、漏洞简介
------------

二、漏洞影响
------------

Jizhicms 1.7.1

三、复现过程
------------

从回显可以明确的看到这是一个报错注入，如果没有回显报错的话，为了查看是否进行了sql语句的拼接可以去查看mysql的log日志,可以通过Navicat的日志功能去查看![1.png](./.resource/Jizhicms1.7.1从sql注入到任意文件上传/media/rId24.png)在对CMS不是很熟悉的情况下可以通过搜索关键字来定位大概的漏洞位置，customurl成功的引起了我的注意，这是表的名字，经过简单判断，定位到函数位置为/Home/c/HomeController.php中342-355行中，用户传入参数url然后进入到find函数中处理![2.png](./.resource/Jizhicms1.7.1从sql注入到任意文件上传/media/rId25.png)跟进到find函数中，位于/FrPHP/lib/Model.php，find函数主要去调用findAll函数去拼接执行sql语句

    public function find($where=null,$order=null,$fields=null,$limit=1)
        {
           if( $record = $this->findAll($where, $order, $fields, 1) ){
                return array_pop($record);
            }else{
                return FALSE;
            }
        }

这里看代码看的头疼，为了直观展示代码的执行过程可以用phpstorm配合xdebug的方式去调试php代码，可以看到将我们传入的参数直接带入查询，然后调用getArray函数去执行![3.png](./.resource/Jizhicms1.7.1从sql注入到任意文件上传/media/rId26.png)

    public function findAll($conditions=null,$order=null,$fields=null,$limit=null)
        {
            .....
            .....
            if(!empty($limit))$where .= " LIMIT {$limit}";
            $fields = empty($fields) ? "*" : $fields;
            $table = self::$table;
            $sql = "SELECT {$fields} FROM {$table} {$where}";
            return $this->db->getArray($sql);
        }

在 /FrPHP/db/DBholder.php中,
getArray函数调用query函数，如果有错误将输出错误信息![4.png](./.resource/Jizhicms1.7.1从sql注入到任意文件上传/media/rId27.png)

在接下来发现该CMS允许上传的文件类型是保存在数据库中的![5.png](./.resource/Jizhicms1.7.1从sql注入到任意文件上传/media/rId28.png)通过数据库写入到缓存文件，在使用时从缓存文件中去看上传的类型是不是缓存文件中允许的，如果是则允许上传。那可以通过SQL注入漏洞更新下数据库，写入允许上传的后缀php,即可实现getshell![6.png](./.resource/Jizhicms1.7.1从sql注入到任意文件上传/media/rId29.png)然后登陆后台清空缓存让网站重新获得新的缓存，然后上传php文件。看到上传成功了![7.png](./.resource/Jizhicms1.7.1从sql注入到任意文件上传/media/rId30.png)既然是Code Auditing，我们也来跟下网站获取上传类型的方式在/A/c/CommonController.php
中uploads函数中是从webconf中获得的fileType的值

    $fileType = $this->webconf['fileType'];
                if(strpos($fileType,strtolower($pix))===false){
                    $data['error'] =  "Error: 文件类型不允许上传！";
                    $data['code'] = 1002;
                    JsonReturn($data);
                }

webconf函数位于/Conf/Functions.php中,通过调用getCache函数来获取相关的值

    function webConf($str=null){
        //v1.3 取消文件存储
        //$web_config = include(APP_PATH.'Conf/webconf.php');
        $webconfig = getCache('webconfig');
    }

getCache函数位于/FrPHP/common/Functions.php

    function getCache($str=false){
        if(!$str){
            return false;
        }
        //获取
        $s = md5($str).'frphp'.md5($str);
        $cache_file_data = APP_PATH.'cache/data/'.$s.'.php';
        if(!file_exists($cache_file_data)){
            return false;
        }
        $last_time = filemtime($cache_file_data);//创建文件时间
        $res = file_get_contents($cache_file_data);
        $res = substr($res,14);
        $data = json_decode($res,true);

        if(($data['frcache_time']+$last_time)<time() && $data['frcache_time']>=0){
            unlink($cache_file_data);
            return false;
        }else{
            return $data['frcache_data'];
        }
    }

getCache从/cache/data/中获取相关的值
缓存文件的名字为md5(webconfig).\'frphp\'.md5(webconfig)可以看到已经成功缓存,php为允许上传的类型![8.png](./.resource/Jizhicms1.7.1从sql注入到任意文件上传/media/rId31.png)

参考链接
--------

> https://xz.aliyun.com/t/7775\#toc-2
