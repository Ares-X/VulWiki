XYHCMS 3.6 后台文件上传getshell（一）
=====================================

一、漏洞简介
------------

对后缀过滤不严，未过滤php3-5，phtml（老版本直接未过滤php）

二、漏洞影响
------------

XYHCMS 3.6

三、复现过程
------------

### 漏洞分析

`/App/Manage/Controller/SystemController.class.php` Line 246-255

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

3.  添加类型 `php3`或 `php4`或 `php5` 或 `phtml`

4.  点击下面的
    `水印图片上传`上传以上后缀shell，此时点不点提交都已经传入服务器

5.  之后会在图片部分显示上传路径    ![1.png](/Users/aresx/Documents/VulWiki/.resource/XYHCMS3.6后台文件上传getshell(一)/media/rId26.png){width="5.833333333333333in"
    height="2.686567147856518in"}

6.  访问连接即可，只有网站配置了.htaccess自动解析php3-5与phtml的才能解析。
