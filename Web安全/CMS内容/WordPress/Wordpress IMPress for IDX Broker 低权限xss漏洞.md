---
cve: "CVE-2020-11512"
source: "白阁文库 BaizeSec/bylibrary"
product: "WordPress IMPress for IDX Broker"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2020-11512; CVE-2020-9514"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "Wordpress IMPress for IDX Broker 低权限xss漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：subscriber session;11512adminviewsrecaptcha setting;9514wrapper page identifiers; plugin versions omitted"
side_effects: "未执行；本文需注意的操作影响：frontmatter只有11512，正文9514页面修改/删除是第二主漏洞"
source_status: "unknown"
id: "vw-1f3041d11f00c5eccb29c42c"
entity_id: "ve-1f3041d11f00c5eccb29c42c"
schema_version: "1"
---

## 核对与使用边界

- 凭据处理：本文抓包中的可识别会话/防伪或认证值已仅将中段替换为星号，保留首尾及原长度便于对照；遮罩后的历史值不能作为可用登录凭据。原操作、请求方法和攻击表达式保留。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：subscriber session;11512adminviewsrecaptcha setting;9514wrapper page identifiers; plugin versions omitted

- **操作与副作用边界（1）**：frontmatter只有11512，正文9514页面修改/删除是第二主漏洞。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **证据待核（2）**：wp_protect_special_option被错说成对option名HTML过滤；缺输出转义才是XSS链关键。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **结论使用边界（3）**：说is_user_logged_in只判断用户存在不精确，应说登录状态不检查具体capability。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **凭据与会话边界（4）**：HTTP Content-Length0却带body，编号列表污染报文；Cookie应脱敏。抓包中的会话不能视为未认证访问证明；可识别的真实会话值按中段星号遮罩处理，默认演示值和攻击语法保留。需重新取得授权测试会话，不能复用文中值。

- **事实待核（5）**：大量操作截图内容全丢失，9514仅文字结论无请求；缺版本/原始补丁链接。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Wordpress IMPress for IDX Broker 低权限xss漏洞

	CVE-2020-11512分析

	 首先看到在插件的目录plugins\idx-broker-platinum\idx\initiate-plugin.php文件下的277行的idx_update_recaptcha_key函数中接收了POST参数idx_recaptcha_site_key数据，在279行被update_option函数调用

	注：在当前账户权限下，执行修改初始化信息只可以用这个验证，返回信息只有一个1，如果不是1说明修改失败 在在当前用户全下载通过Wordpress IMPress for IDX Broker可以越权操作IMPress for IDX  Brokerc插件的初始化信息，通过xss漏洞获取管理员敏感信息。



	下面我们看下update_option函数对该数据的操作，该函数是对wordpress中的options参数的进行更新数据，我们看到上面对options的传入参数为idx_recaptcha_site_key，即更新该参数的值


	在390行我们看到执行了update参数，更新了数据库中的数据


 我们在update_option函数中调用了wp_protect_special_option对option参数名进行html过滤，却没有对value进行过滤，引发了xss漏洞


	下面我们看下函数idx_update_recaptcha_key的调用位置，在initiate-plugin.php文件下的34行hook在wp_ajax_idx_update_recaptcha_key tag上，


  我們在admin-ajax.php页面中159行中获取到action参数，使用is_user_logged_in判断了用户权限后，直接将action参数拼接到do_action函数中进行执行，而is_user_logged_in只是判断用户是否存在，没有进行权限判断。



### 	CVE-2020-11512利用

	通过user1用户（订阅者权限）发送数据包：

```

```

```http

1. 		POST /wordpress/wp-admin/admin-ajax.php HTTP/1.1
2. 		Host: localhost
3. 		User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:76.0) Gecko/20100101 Firefox/76.0
4. 		Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
5. 		Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
6. 		Connection: close
7. 		Cookie:  wordpress_bbfa5b726c6b7a9cf3cda9370be3ee91=use*****************************************************************************************************************************239; wordpress_test_cookie=WP+Cookie+check;  wordpress_logged_in_bbfa5b726c6b7a9cf3cda9370be3ee91=use*****************************************************************************************************************************b73; wp-settings-time-2=1590832197
8. 		Upgrade-Insecure-Requests: 1
9. 		Content-Type: application/x-www-form-urlencoded
10. 		Content-Length: 0
11. 		 
12. 		action=idx_update_recaptcha_key&idx_recaptcha_site_key=a22212322123"><svg onload=alert(/~xss~/)>'

```



	此时管理员对该插件进行设置操作：



### 	CVE-2020-9514漏洞分析

	 从\wp-content\plugins\idx-broker-platinum\idx\wrappers.php文件中idx_ajax_create_dynamic_page函数中202行看到函数通过post_title参数中获取到了title数据，211行获取到了wrapper_page_id参数，在214和215行更新了数据库，并在218行针对给定的id进行更新元字段。

	继续看236行的idx_ajax_delete_dynamic_page函数，接收到post参数wrapper_page_id，然后进行删除该数据操作



	我们找一下这两个函数的调用位置：



	好了，可以看到这两个函数全部挂钩在wp_ajax开头的钩子上，利用上面的越权操作即可操作

### 	CVE-2020-9514漏洞利用

	首先添加一个Wrapper页面





	下面使用user1用户进行create操作：

	首先在页面中获取上面创建的id值：6



	操作如下：



	发现该页面数据已改变，并且由user1修改



	同样执行删除操作



	发现已经无了：



## 	防御

	通过查看对比补丁信息，新的版本使用current_user_can函数判断当前用户的权限，并验证nonce机制防御CSRF攻击。






---

> 来源：白阁文库 BaizeSec/bylibrary
