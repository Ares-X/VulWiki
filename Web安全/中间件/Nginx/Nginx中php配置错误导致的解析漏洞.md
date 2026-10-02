---
source: "白阁文库 BaizeSec/bylibrary"
title: "Nginx中php配置错误导致的解析漏洞"
product: "NGINX FastCGI及PHP-FPM"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "PHP路径修正启用、FastCGI匹配不存在的.php后缀、security.limit_extensions允许非PHP、攻击者能上传PHP内容文件"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-b2bafe28bcec1fe0669a1449"
entity_id: "ve-b2bafe28bcec1fe0669a1449"
schema_version: "1"
---

# Nginx中php配置错误导致的解析漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：PHP路径修正启用、FastCGI匹配不存在的.php后缀、security.limit_extensions允许非PHP、攻击者能上传PHP内容文件
- 证据范围：明确配置原因而非NGINX版本缺陷，较425完整；应合并相关教程并保留两个配置控制点。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- URI不等同物理文件路径，脚本映射取决于fastcgi_param，需给完整server配置
- 步骤URL与4/6序号及修复标题黏连，所有称下图的图片引用都丢失
- PHP5路径与测试PHP版本不对应，默认只.php叙述需按FPM版本核对
- 缺compose来源、上传内容和清理

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

### 影响范围 ###
这一漏洞是由于Nginx中php配置不当而造成的，与Nginx版本无关
### 漏洞详情 ###
Nginx拿到文件路径（更专业的说法是URI）/test.jpg/test.php后，一看后缀是.php，便认为该文件是php文件，转交给php去处理。php一看/test.jpg/test.php不存在，便删去最后的/test.php，又看/test.jpg存在，便把/test.jpg当成要执行的文件了

这其中涉及到php的一个选项：cgi.fix_pathinfo，该值默认为1，表示开启。开启这一选项有什么用呢？看名字就知道是对文件路径进行“修理”。何谓“修理”？举个例子，当php遇到文件路径“/aaa.xxx/bbb.yyy/ccc.zzz”时，若“/aaa.xxx/bbb.yyy/ccc.zzz”不存在，则会去掉最后的“/ccc.zzz”，然后判断“/aaa.xxx/bbb.yyy”是否存在，若存在，则把“/aaa.xxx/bbb.yyy”当做文件“/aaa.xxx/bbb.yyy/ccc.zzz”，若“/aaa.xxx/bbb.yyy”仍不存在，则继续去掉“/bbb.yyy”，以此类推。

该选项在配置文件php.ini中

新版本的php引入了“security.limit_extensions”，限制了可执行文件的后缀，默认只允许执行.php文件

### 复现过程 ###
1、 使用docker搭建漏洞环境

2、 执行如下命令,运行环境

docker-compose up -d

3、 浏览器访问http://192.168.247.129/4.上传一个图片马

5.浏览器访问http://192.168.247.129/uploadfiles/156005c5baf40ff51a327f1c34f2975b.jpg/a.php

下图看到成功执行了php代码,说明存在解析漏洞6.我们用中国蚁剑去连接### 漏洞修复 ###
主要是两个配置文件中配置不当造成的。

1. 修改配置文件vim /etc/php5/fpm/php.ini

 将cgi.fix_pathinfo=1，设置为0

 2.修改配置文件vim /etc/php5/fpm/pool.d/www.conf

 将security.limit_extensions=，设置为：

 security.limit_extensions=.php，只允许php文件解析


---

> 来源：白阁文库 BaizeSec/bylibrary
