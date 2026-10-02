---
source: "hatch 补库批 20260928"
product: "YCCMS3.4 FileUpload/xhUp"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "YCCMS 3.4 任意文件上传漏洞（二）"
prerequisites: "来源所述条件，未列明部分仍待核：anonymousxhUpclaimed; GETtype,filedata; Imageprocessing; uploadedPHPexecutable"
side_effects: "未执行；本文需注意的操作影响：$_msg字符串拼接示例可能漏连接符，需对原源码恢复；未给真实URL/上传请求/触发代码，只有截图结论"
source_status: "unknown"
id: "vw-58e99b22b88e4aae30566be3"
entity_id: "ve-58e99b22b88e4aae30566be3"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：anonymousxhUpclaimed; GETtype,filedata; Imageprocessing; uploadedPHPexecutable

- **证据待核（1）**：实际PHP落点路径给出，仍需解释Image处理是否保留/报错后残留，与简单伪MIME不同。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **结论使用边界（2）**：$_msg字符串拼接示例可能漏连接符，需对原源码恢复。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **证据待核（3）**：未给真实URL/上传请求/触发代码，只有截图结论。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **结论使用边界（4）**：与621是另一类/参数而非同文；同一xz原文章可整合成多入口分析。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# YCCMS 3.4 任意文件上传漏洞（二）

一、漏洞简介
------------

二、漏洞影响
------------

YCCMS 3.4

三、复现过程
------------

![7.png](./.resource/YCCMS3.4任意文件上传漏洞二/media/rId24.png)/media/rId24.png)在不需要登录的情况下可以看到已经上传成功，上传地址为E:/phpstudy/WWW/yccms/uploads/20200509133351770.php定位漏洞位置为controller\\CallAction.class.php中的xhUp函数

    public function xhUp() {
            if (isset($_GET['type'])) {
                $_fileupload = new FileUpload('filedata',10);
                $_err=$_fileupload->checkError();
                $_path = $_fileupload->getPath();
                $_msg="'..$_path'";
                $_img = new Image($_path);
                $_img->xhImg(650,0);
                $_img->out();
                echo "{'err':'".$_err."','msg':".$_msg."}";
                exit();
            } else {
            Tool::alertBack('警告：由于非法操作导致上传失败！');
            }
        }

跟进到类FileUpload，
位于public\\class\\FileUpload.class.php，然后看到同样也是检查的传入的Content-Type的值

    private function checkType() {
            if (!in_array($this->type,$this->typeArr)) {
                Tool::alertBack('警告：不合法的上传类型！');
            }
        }

    private $typeArr = 
    array('image/jpeg','image/pjpeg','image/png','image/x-png','image/gif');

参考链接
--------

> https://xz.aliyun.com/t/7748\#toc-4
