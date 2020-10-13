Emlog 6.0 数据库备份与导入功能导致后台getshell
==============================================

一、漏洞简介
------------

二、漏洞影响
------------

Emlog\<=6.0

三、复现过程
------------

备份数据库到本地：

![](/Users/aresx/Documents/VulWiki/.resource/Emlog6.0数据库备份与导入功能导致后台getshell/media/rId24.png)

修改数据库文件，将备份的数据库文件进行修改，在最后一段添加上自己构造的SQL语句：

![](/Users/aresx/Documents/VulWiki/.resource/Emlog6.0数据库备份与导入功能导致后台getshell/media/rId25.png)

这一段sql语句主要功能是：首先判断是否存在emlog\_shell数据表，如果存在则删除该表，之后创建一个新的emlog数据表，之后再向该表中添加信息（这里可以填入一句话木马），之后使用select\.....
 into  outfile
 \....将数据表中的表项内容读入到一个shell.php的PHP文件汇总，之后再删除该数据表！

导入数据库：

![](/Users/aresx/Documents/VulWiki/.resource/Emlog6.0数据库备份与导入功能导致后台getshell/media/rId26.png)

之后访问之：

![](/Users/aresx/Documents/VulWiki/.resource/Emlog6.0数据库备份与导入功能导致后台getshell/media/rId27.png)
