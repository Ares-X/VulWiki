DedeCMS V5.7.118前台存储型XSS劫持后台采集致代码执行漏洞
=====================================

一、漏洞简介
------------

DedeCMS V5.7.118 的组合利用链（来源：安全研究博客 xvshifu/xvsf《DedeCMS-V5.7.118 漏洞复现》原文，标题原话"xss+后台rce组合拳 0click 劫持 导致的前台 rce getshell"）：前台会员中心 `/member/article_add.php` 发表文章处存在存储型 XSS，攻击者注册普通账号即可植入 payload；随后利用后台无 CSRF 防护的缺陷，构造恶意页面诱导已登录管理员访问（0click 劫持思路），间接向后台**采集功能**注入恶意 PHP 代码，在下次采集任务执行时触发任意命令执行。来源原文对该链条的描述为："虽然需要后台管理员权限，但由于无 CSRF 防护，攻击者可构造恶意页面诱导已登录管理员访问，间接注入恶意 PHP 代码，在下次采集执行时触发任意命令执行。"

来源可信度说明：个人安全研究博客（GitHub Pages），含复现截图与抓包报文，可信度中等；与 CVE-2025-6335（SaveCache 模板缓存注入的后台命令执行）是不同利用点，本条不重复收录后者。

二、漏洞影响
------------

-   产品：DedeCMS（织梦 CMS）
-   版本：**V5.7.118**（来源原文复现版本）
-   组件/攻击向量：前台 `/member/article_add.php`（存储型 XSS 植入点）→ 后台采集功能（PHP 代码注入执行点）
-   前提条件：攻击者需先注册一个前台会员账号；最终命令执行发生在后台采集任务运行时，需诱导已登录管理员访问恶意页面（利用无 CSRF 防护）
-   影响：前台存储型 XSS → 劫持管理员会话 → 后台采集注入恶意 PHP → 任意命令执行（getshell）

三、复现过程
------------

### 漏洞分析

来源原文的链条（忠实转述，不做实质改写）：

1.  前台植入：注册普通会员账号，进入"发表文章"（`/member/article_add.php`），随意填写内容并抓包，对数据包进行修改，**在内容处插入 payload**，形成存储型 XSS；
2.  0click 劫持：DedeCMS 后台无 CSRF 防护，攻击者构造恶意页面，诱导已登录状态的管理员访问；
3.  采集注入：借管理员身份向后台采集功能注入恶意 PHP 代码；
4.  触发执行：下次采集任务执行时，注入的 PHP 代码被执行，达成任意命令执行。

### PoC（来源：https://github.com/xvshifu/xvsf/blob/HEAD/content/posts/DedeCMS-V5.7.118%20漏洞复现.md，原文照录，仅限授权测试）

来源原文的抓包报文（发表文章植入 payload 的请求模板）：

```http
POST /member/article_add.php HTTP/1.1
Host: dedecms:9876
Upgrade-Insecure-Requests: 1
Accept-Language: zh-CN,zh;q=0.9
Origin: http://dedecms:9876
Cache-Control: max-age=0
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryVkolGBB9b1qYBTzr
Cookie: PHPSESSID=ul9tip0bsccgfh7o1bbptnmn24; last_vtime=1772843080; last_vtime1BH21ANI1AGD297L1FF21LN02BGE1DNG=f041b308abf3db0b; last_vid=test5; last_vid1BH21ANI1AGD297L1FF21LN02BGE1DNG=b46b29d071147f62; DedeUserID=5; DedeUserID1BH21ANI1AGD297L1FF21LN02BGE1DNG=0094c7a94e5c063a; DedeLoginTime=1772843088; DedeLoginTime1BH21ANI1AGD297L1FF21LN02BGE1DNG=080132e7d52f0730; ENV_GOBACK_URL=%2Fmember%2Fcontent_list.php%3Fchannelid%3D1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Referer: http://dedecms:9876/member/article_add.php
Accept-Encoding: gzip, deflate
Content-Length: 1298

------WebKitFormBoundaryVkolGBB9b1qYBTzr
Content-Disposition: form-data; name="dopost"

save
------WebKitFormBoundaryVkolGBB9b1qYBTzr
Content-Disposition: form-data; name="channelid"

1
------WebKitFormBoundaryVkolGBB9b1qYBTzr
Content-Disposition: form-data; name="title"

test555
------WebKitFormBoundaryVkolGBB9b1qYBTzr
Content-Disposition: form-data; name="tags"
```

（注：原文在此报文的正文内容字段处插入 XSS payload，截图展示；报文其余字段照录原文。payload 具体内容与后台采集注入的 PHP 代码细节以来源原文截图为准，本文不编造。）

*图片说明：来源原文的复现截图托管于 jsdelivr 图床（cdn.jsdelivr.net/gh/XVSHIFU/Picture-bed@img），经多次尝试无法下载（返回空文件），本条目无本地配图；原图链接见上方来源地址。*

四、修复建议
------------

1.  升级到 DedeCMS 官方最新版本；
2.  后台关键操作补齐 CSRF Token 校验；
3.  前台会员发表内容做严格的 XSS 过滤与输出编码；
4.  采集功能的内容/规则录入做代码注入过滤，采集任务以最小权限账户运行；
5.  排查是否已被利用：检查会员发表内容中的异常脚本、采集规则中的可疑 PHP 代码。

### 附录

参考链接：

-   复现原文：https://github.com/xvshifu/xvsf/blob/HEAD/content/posts/DedeCMS-V5.7.118%20漏洞复现.md
