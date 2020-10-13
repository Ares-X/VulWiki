NewZhan CMS sql注入漏洞
=======================

一、漏洞简介
------------

二、漏洞影响
------------

NewZhan CMS 商业版 2.4.1

NewZhan CMS 个人版 2.6.3

三、复现过程
------------

### 漏洞分析

数据库操作函数对传入的数组仅仅对value进行了转义处理，并没有把key考虑在内，前台控制器可以通过提交POST
控制key进行注入。 db\_mysql.class.php

    public function update($key, $data) {

    list($table, $keyarr, $keystr) = $this->key2arr($key);

    $s = $this->arr2sql($data);

    return $this->query("UPDATE {$this->tablepre}$table SET $s WHERE $keystr LIMIT 1", $this->wlink);

    }

    private function key2arr($key) {

    $arr = explode('-', $key);


    if(empty($arr[0])) {

    throw new Exception('table name is empty.');

    }


    $table = $arr[0];

    $keyarr = array();

    $keystr = '';

    $len = count($arr);

    for($i = 1; $i < $len; $i = $i + 2) {

    if(isset($arr[$i + 1])) {

    $v = $arr[$i + 1];

    $keyarr[$arr[$i]] = is_numeric($v) ? intval($v) : $v;
    // 因为 mongodb 区分数字和字符串


    $keystr .= ($keystr ? ' AND ' : '').$arr[$i]."='".addslashes($v)."'";

    } else {

    $keyarr[$arr[$i]] = NULL;

    }

    }


    if(empty($keystr)) {

    throw new Exception('keystr name is empty.');

    }

    return array($table, $keyarr, $keystr);

    }

审计发现前台商品管理控制器有\$POST 数据传入update(\$data)可以触发SQL
注入

![1.png](/Users/aresx/Documents/VulWiki/.resource/NewZhanCMSsql注入漏洞/media/rId25.png)

### 漏洞复现

![2.png](/Users/aresx/Documents/VulWiki/.resource/NewZhanCMSsql注入漏洞/media/rId27.png)![3.png](/Users/aresx/Documents/VulWiki/.resource/NewZhanCMSsql注入漏洞/media/rId28.png)![4.png](/Users/aresx/Documents/VulWiki/.resource/NewZhanCMSsql注入漏洞/media/rId29.png)
