---
source: "hatch 补库批 20260928"
product: "OKLite2.0.0"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "OKLite v2.0.0 后台更新压缩包导致getshell"
prerequisites: "来源所述条件，未列明部分仍待核：后台升级权限，ZIP写入Web根且PHP执行"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-bf5b38d111416d2d68740fd9"
entity_id: "ve-bf5b38d111416d2d68740fd9"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：后台升级权限，ZIP写入Web根且PHP执行

- **适用与权限边界（1）**：更新功能本就部署代码，需说明越过何种权限/签名边界，不能仅含PHP当漏洞成立。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **证据待核（2）**：源码与完整请求全部图依赖，只说明未匹配文件会解压根；与1.2.25模块/插件不是同入口。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **适用与权限边界（3）**：缺官方补丁/角色授权细节。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# OKLite v2.0.0 后台更新压缩包导致getshell

一、漏洞简介
------------

OKlite
2.0.0管理后台支持压缩包升级，攻击者可以构造包含一句话木马的压缩包文件之后上传到目标服务器，目标服务器在升级过程中会自动解压该压缩包，将一句话木马解压出来，从而导致Getshell。

二、漏洞影响
------------

OKLite v2.0.0

三、复现过程
------------

### 漏洞分析

文件位置：`OKLite_2.0.0\framework\view\update_index.html`逻辑代码：zip压缩包升级时会自动调用update类中的zip函数来构造上传表单：

![1.png](./.resource/OKLitev2.0.0后台更新压缩包导致getshell/media/rId25.png)

文件位置：`OKLite_2.0.0\framework\admin\update_control.php`代码逻辑：调用zip函数来构造zip上传表单

![2.png](./.resource/OKLitev2.0.0后台更新压缩包导致getshell/media/rId26.png)

文件位置：`OKLite_2.0.0\framework\libs\form.php`代码逻辑：格式化表单信息

![3.png](./.resource/OKLitev2.0.0后台更新压缩包导致getshell/media/rId27.png)

文件位置：`OKLite_2.0.0\framework\view\update_zip.html`代码逻辑：使用上传的zip文件进行升级

![4.png](./.resource/OKLitev2.0.0后台更新压缩包导致getshell/media/rId28.png)

文件位置：`OKLite_2.0.0\framework\admin\update_control.php`代码逻辑：解压压缩包进行升级

![5.png](./.resource/OKLitev2.0.0后台更新压缩包导致getshell/media/rId29.png)

文件位置：`OKLite_2.0.0\framework\libs\phpzip.php`代码逻辑：解压缩更新包，在解压时未做任何检查操作

![6.png](./.resource/OKLitev2.0.0后台更新压缩包导致getshell/media/rId30.png)

文件位置：`OKLite_2.0.0\framework\admin\update_control.php`代码逻辑：执行程序升级

![7.png](./.resource/OKLitev2.0.0后台更新压缩包导致getshell/media/rId31.png)

之后会逐一匹配压缩包中的文件，如果未匹配到会直接解压到根目录下面，所以我们这里可以构造一个shell.zip，之后在压缩包中放置包含一句话木马的shell.php文件，之后进行更新，直接可以Getshell\~

### 漏洞复现

构造shell.zip文件如下：

![8.png](./.resource/OKLitev2.0.0后台更新压缩包导致getshell/media/rId33.png)

之后选择压缩包升级，上传压缩包

![9.png](./.resource/OKLitev2.0.0后台更新压缩包导致getshell/media/rId34.png)

![10.png](./.resource/OKLitev2.0.0后台更新压缩包导致getshell/media/rId35.png)

之后点击"开始升级"进行升级：

![11.png](./.resource/OKLitev2.0.0后台更新压缩包导致getshell/media/rId36.png)

之后在网站根目录下可以看到shell.php文件生成：

![12.png](./.resource/OKLitev2.0.0后台更新压缩包导致getshell/media/rId37.png)

之后使用菜刀远程连接：![13.png](./.resource/OKLitev2.0.0后台更新压缩包导致getshell/media/rId38.png)

成功getshell![14.png](./.resource/OKLitev2.0.0后台更新压缩包导致getshell/media/rId39.png)

参考链接
--------

> https://xz.aliyun.com/t/8130\#toc-3
