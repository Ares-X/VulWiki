Jizhicms 1.7.1 后台配置文件删除
===============================

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

该漏洞的触发同样也是源于frparam函数没有对传入的文件路径进行必要的过滤在
/A/c/PluginsController.php中的action\_do函数中的483到494行中由于未对目录进行限制导致的目录穿越漏洞，只要文件中包含config.php文件即可触发deldir函数进行文件删除操作Conf文件夹中包含config.php，该文件夹为网站配置信息储存的地方，一旦被删除，网站将无法正常运行![3.png](./.resource/Jizhicms1.7.1后台配置文件删除/media/rId24.png)deldir函数的功能是遍历目标文件下的所有文件进行删除操作

    function deldir($dir) {
        //先删除目录下的文件：
        $dh=opendir($dir);
        while ($file=readdir($dh)) {
            if($file!="." && $file!="..") {
                $fullpath=$dir."/".$file;
                if(!is_dir($fullpath)) {
                    unlink($fullpath);
                } else {
                    deldir($fullpath);
                }
            }
        }
        closedir($dh);

成功删除了Conf文件夹![4.png](./.resource/Jizhicms1.7.1后台配置文件删除/media/rId25.png)

四、参考链接
------------

> https://xz.aliyun.com/t/7775\#toc-3
