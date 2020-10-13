XDCMS 3.0 数据库备份任意文件夹删除
==================================

一、漏洞简介
------------

二、漏洞影响
------------

XDCMS 3.0

三、复现过程
------------

![](/Users/aresx/Documents/VulWiki/.resource/XDCMS3.0数据库备份任意文件夹删除/media/rId24.jpg)

漏洞点：`system/modules/xdcms/data.php`

    public function delete(){
            $file=trim($_GET["file"]);
            $dir=DATA_PATH.'backup/'.$file;
            if(is_dir($dir)){
                //删除文件夹中的文件
                if (false != ($handle = opendir ( $dir ))) {  
                    while ( false !== ($file = readdir ( $handle )) ) {   
                        if ($file != "." && $file != ".."&&strpos($file,".")) {  
                            @unlink($dir."/".$file);    
                        }  
                    }  
                    closedir ( $handle );  
                }  
            
                @rmdir($dir);//删除目录
            }
            showmsg(C('success'),'-1');
        }

删除数据库备份时候仅判断是否为文件夹，是则删除其中所有的文件；同时未对目录进行过滤，导致可以删除任意文件夹中的文件

![](/Users/aresx/Documents/VulWiki/.resource/XDCMS3.0数据库备份任意文件夹删除/media/rId25.jpg)
