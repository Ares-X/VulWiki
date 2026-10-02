---
source: "hatch 补库批 20260928"
product: "YCCMS3.4 LogoUpload"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "YCCMS 3.4 任意文件上传漏洞（一）"
prerequisites: "来源所述条件，未列明部分仍待核：anonymousCall.upLoadclaimed; send/MAX_FILE_SIZE,picfile; ImageprocessingmustnotremovePHP; PHPsuffixpreserved"
side_effects: "未执行；本文需注意的操作影响：与622不同上传类/字段，不能按相同MIME根因直接去重"
source_status: "unknown"
id: "vw-c43fe6a660f2f68535a7f33e"
entity_id: "ve-c43fe6a660f2f68535a7f33e"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：anonymousCall.upLoadclaimed; send/MAX_FILE_SIZE,picfile; ImageprocessingmustnotremovePHP; PHPsuffixpreserved

- **证据待核（1）**：Content-Type可伪造检查有代码支持，但还经过Image/xhImg/out，需核重编码/失败时文件残留才完整RCE。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **证据待核（2）**：缺完整路由/报文/文件名落点，图片成功不等于代码执行。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **结论使用边界（3）**：与622不同上传类/字段，不能按相同MIME根因直接去重。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **事实待核（4）**：有xz原文，缺安全修复/版本范围。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# YCCMS 3.4 任意文件上传漏洞（一）

一、漏洞简介
------------

二、漏洞影响
------------

YCCMS 3.4

三、复现过程
------------

在不需要登录的情况上传成功![5.png](./.resource/YCCMS3.4任意文件上传漏洞一/media/rId24.png)/media/rId24.png)定位到漏洞位置： controller\\CallAction.class.php

    public function upLoad() {
            if (isset($_POST['send'])) {
                $_logoupload = new LogoUpload('pic',$_POST['MAX_FILE_SIZE']);
                $_path = $_logoupload->getPath();
                $_img = new Image($_path);
                $_img->xhImg(960,0);
                $_img->out();
                //echo $_path;
                $_logoupload->alertOpenerClose('图片上传成功！','..'.$_path);
            } else {
                exit('警告：文件过大或者其他未知错误导致浏览器崩溃！');
            }
        }

然后跟进到类LogoUpload
,位于public\\class\\LogoUpload.class.php，上传首要关注上传是是否允许上传非图片格式的文件

    private function checkType() {
            if (!in_array($this->type,$this->typeArr)) {
                Tool::alertBack('警告：LOGO图片必须是PNG格式！');
            }
        }

    private $typeArr = array('image/png','image/x-png');//类型合集

根据Content-Type的值来判断是否是图片格式，只要Content-Type是这两种类型就可以，那直接伪造Content-Type就可以了![6.png](./.resource/YCCMS3.4任意文件上传漏洞一/media/rId25.png)/media/rId25.png)

参考链接
--------

> https://xz.aliyun.com/t/7748\#toc-4
