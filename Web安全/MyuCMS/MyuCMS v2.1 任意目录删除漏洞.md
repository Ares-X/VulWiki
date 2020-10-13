MyuCMS v2.1 任意目录删除漏洞
============================

一、漏洞简介
------------

二、漏洞影响
------------

MyuCMS v2.1

三、复现过程
------------

因为漏洞描述是任意文件删除，所以先全文搜索 **unlink**
函数，定位到存在文件删除功能的代码段。

定位到 **application/common.php** 中的 **deleteun** 函数

![1.jpg](/Users/aresx/Documents/VulWiki/.resource/MyuCMSv2.1任意目录删除漏洞/media/rId24.jpg)

    function deleteun($dir_name)
    {
        $result = false;
        if (is_dir($dir_name)) { // 判断是否为目录
            if ($handle = opendir($dir_name)) { // 打开目录
                while (false !== ($item = readdir($handle))) { // 通过这个 while 遍历目录中的文件 
                    if ($item != '.' && $item != '..') {
                        if (is_dir($dir_name . DS . $item)) { // 若遍历到的文件为子目录，则递归调用deleteun
                            deleteun($dir_name . DS . $item);
                        } else {
                            unlink($dir_name . DS . $item); // 删除遍历到的文件
                        }
                    }
                }
                closedir($handle); // 关闭文件夹
                if (rmdir($dir_name)) { // 删除该目录
                    $result = true;
                }
            }
        }

        return $result;
    }

根据 **deleteun**
函数的实现代码来看，我们可以看到该函数中对传入的参数无任何限制。

然后在整个项目中搜索，看哪个文件中调用了 **deleteun** 函数。

发现总共三处两个文件调用了该函数，且这三处代码内容相同，只不过是传递给的
**deleteun**
函数的参数不同，我们可以判断出，这三处都可以触发任意目录删除漏洞。

![2.jpg](/Users/aresx/Documents/VulWiki/.resource/MyuCMSv2.1任意目录删除漏洞/media/rId25.jpg)

这三处的不同之处在于。**Muban.php** 继承了 **Common** 类，在 **Common**
类中实现了对于是否已经登录的验证。实现代码如下。

    public function _initialize(){
            if(!session('usermail') || !session('kouling')){
               $this->error('请登录',url('login/index')); 
               print s();
            }

        }

而 **Addons.php** 继承自 **AdminBase** 类，且初始化时执行父类
**AdminBase** 的 **\_initialize()** 方法，在 **AdminBase**
类中调用了父类 **Controller** 的 **\_initialize()** 方法。而父类的
**Controller** 的 **\_initialize();** 方法的实现内容为空。

所以 **Addons.php**
在未登录的情况下也可以访问。这意味我们不需要登录后台也可以触发任意目录删除漏洞。

### Payload

所以给出 Payload 如下，即可删除整个 **install** 目录

    Payload: http://www.0-sec.org/admin/Addons/un?info=../install

参考链接
--------

> https://xz.aliyun.com/t/7271\#toc-0
