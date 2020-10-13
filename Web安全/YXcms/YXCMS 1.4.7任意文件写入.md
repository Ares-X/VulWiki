YXcms 1.4.7 任意文件写入
========================

一、漏洞简介
------------

二、漏洞影响
------------

YXcms 1.4.7

三、复现过程
------------

### 漏洞分析

漏洞文件protected/apps/admin/controller/setController.php的140行，\$tpfile接收到GET传过来的值，如果为空的话就会报非法操作。传过来的URL是admin/set/tpadd&Mname=default，所以\$tpfile就是default。

再来下是检测是否有POST的值，接受到POST过来的filename,用trim去掉两边的空格。接收到POST过来的code，用stripcslashes反转义。

\$filepath=\$templepath.\$filename.\'.php\'这一句是路径和文件的拼接，然后下面检测路径是否存在。

最后没有过滤任何的危险函数就传给file\_put\_contents函数，写入网站的目录。

    public function tpadd()
    {
       $tpfile=$_GET['Mname'];
       if(empty($tpfile)) $this->error('非法操作~');
       $templepath=BASE_PATH . $this->tpath.$tpfile.'/';
       if($this->isPost()){
         $filename=trim($_POST['filename']);
         $code=stripcslashes($_POST['code']);
         if(empty($filename)||empty($code)) $this->error('文件名和内容不能为空');
         $filepath=$templepath.$filename.'.php';
         if($this->ifillegal($filepath)) {$this->error('非法的文件路径~');exit;}
         try{
            file_put_contents($filepath, $code);
          } catch(Exception $e) {
            $this->error('模板文件创建失败！');
          } 
          $this->success('模板文件创建成功！',url('set/tplist',array('Mname'=>$tpfile)));
       }else{
         $this->tpfile=$tpfile;
         $this->display();

       }
    }

### 复现

    http://0-sec.org/index.php%3Fr%3Dadmin/set/tpadd%26Mname%3Ddefault

![](/Users/aresx/Documents/VulWiki/.resource/YXCMS1.4.7任意文件写入/media/rId26.png)

打开我们的文件监控软件FolderChangesView，输入我们的程序路径D:\\phpStudy\\PHPTutorial\\WWW\\YXcms

![](/Users/aresx/Documents/VulWiki/.resource/YXCMS1.4.7任意文件写入/media/rId27.png)

然后写shell.php文件名，写入我们的代码。

![](/Users/aresx/Documents/VulWiki/.resource/YXCMS1.4.7任意文件写入/media/rId28.png)

然后会在\\protected\\apps\\default\\view\\default下面生成我们写入的文件。

![](/Users/aresx/Documents/VulWiki/.resource/YXCMS1.4.7任意文件写入/media/rId29.shtml)
