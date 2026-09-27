XYHCMS 3.6 后台文件上传getshell（二）仅限Windows
================================================

一、漏洞简介
------------

windows系统特性，windows会将 `::$DATA`忽略

二、漏洞影响
------------

XYHCMS 3.6

三、复现过程
------------

### 漏洞分析

`/App/Manage/Controller/SystemController.class.php`

    if (!empty($data['CFG_UPLOAD_FILE_EXT'])) {
                    $data['CFG_UPLOAD_FILE_EXT'] = strtolower($data['CFG_UPLOAD_FILE_EXT']);
                    $_file_exts = explode(',', $data['CFG_UPLOAD_FILE_EXT']);
                    $_no_exts = array('php', 'asp', 'aspx', 'jsp');
                    foreach ($_file_exts as $ext) {
                        if (in_array($ext, $_no_exts)) {
                            $this->error('允许附件类型错误！不允许后缀为：php,asp,aspx,jsp！');
                        }
                    }
                }

### 漏洞复现

1.  进入后台
2.  系统设置-\>网站设置-\>上传配置-\>允许附件类型
3.  添加类型 `shell.php::$DATA`
4.  点击下面的
    `水印图片上传`上传以上后缀shell，此时点不点提交都已经传入服务器
5.  之后会在图片部分显示上传路径，在windows下面，会自动忽略后面的。
6.  用蚁剑访问 `http://www.0-sec.org/路径去掉::$DATA`
