Eyoucms 1.3.5 后台getshell
==========================

一、漏洞简介
------------

### 最新版本删除该功能

二、漏洞影响
------------

Eyoucms 1.3.5

三、复现过程
------------

### 漏洞分析

相关功能代码在`application/admin/controller/Tools.php`

     public function restoreUpload()
     {
         $file = request()->file('sqlfile');
         if(empty($file)){
             $this->error('请上传sql文件');
         }
         // 移动到框架应用根目录/data/sqldata/ 目录下
         $path = tpCache('global.web_sqldatapath');
         $path = !empty($path) ? $path : config('DATA_BACKUP_PATH');
         $path = trim($path, '/');
         $image_upload_limit_size = intval(tpCache('basic.file_size') * 1024 * 1024);
         $info = $file->validate(['size'=>$image_upload_limit_size,'ext'=>'sql,gz'])->move($path, $_FILES['sqlfile']['name']);
         if ($info) {
             //上传成功 获取上传文件信息
             $file_path_full = $info->getPathName();
             if (file_exists($file_path_full)) {
                 $sqls = Backup::parseSql($file_path_full);
                 if(Backup::install($sqls)){
                    //array_map("unlink", glob($path));
                     /*清除缓存*/
                     delFile(RUNTIME_PATH);
                     /*--end*/
                     $this->success("执行sql成功", url('Tools/restore'));
                 }else{
                     $this->error('执行sql失败');
                 }
             } else {
                 $this->error('sql文件上传失败');
             }
         } else {
             //上传错误提示错误信息
             $this->error($file->getError());
         }
     }

上传过程中只验证了文件的大小和后缀，之后解析sql语句并执行。解析sql函数不再贴出，但并没有检测文件内容正常的sql语句都能通过解析。install函数直接执行了sql语句。

### 漏洞复现

登陆后台在`高级选项->备份还原->数据还原`可选择上传sql文件并执行

![](/Users/aresx/Documents/VulWiki/.resource/Eyoucms1.3.5后台getshell/media/rId27.png)

上传sql文件内容为（需要知道网站绝对路径）

     select '<?php phpinfo(); ?>' into outfile 'D:\\tools\\phpstudy\\phpstudy_pro\\WWW\\testcms\\1.php';

上传成功后在网站根目录生成webshell。

![](/Users/aresx/Documents/VulWiki/.resource/Eyoucms1.3.5后台getshell/media/rId28.png)
