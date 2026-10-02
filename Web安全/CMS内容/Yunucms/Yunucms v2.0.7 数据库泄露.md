---
source: "hatch 补库批 20260928"
product: "Yunucms2.0.7"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Yunucms v2.0.7 数据库泄露"
prerequisites: "来源所述条件，未列明部分仍待核：adminpreviouslycreatesDBbackup;publicdata/ accessible; known/guessabletimestamppluspart/compressionextension"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-5daa90cd18fb7fcbdae3b0ee"
entity_id: "ve-5daa90cd18fb7fcbdae3b0ee"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：adminpreviouslycreatesDBbackup;publicdata/ accessible; known/guessabletimestamppluspart/compressionextension

- **适用与权限边界（1）**：时间可预测不是充分泄漏条件，需HTTP目录权限/完整命名模式与是否压缩分卷。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **适用与权限边界（2）**：后台主动备份是准备条件，匿名攻击者不能据此直接调用export；应区分创建权限与下载权限。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **证据待核（3）**：最后图片引用rId29.shtml扩展异常需查真实媒体类型，目标存在不等于适合作图片，未视查不判坏。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **事实待核（4）**：完整export前半和REQUEST_TIME解释有价值；缺公开下载URL/响应与修复。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Yunucms v2.0.7 数据库泄露

一、漏洞简介
------------

云优CMS是一款基于TP5.0框架为核心开发的一套免费+开源的城市分站内容管理系统。云优CMS前身为远航CMS。云优CMS于2017年9月上线全新版本，二级域名分站，内容分站独立，七牛云存储，自定义字段，自定义表单，自定义栏目权限，自定义管理权限等众多功能深受用户青睐。

二、漏洞影响
------------

Yunucms v2.0.7

三、复现过程
------------

### 漏洞分析

    POST /index.php?s=/admin/data/export HTTP/1.1

    public function export($ids = null, $id = null, $start = null) {
            $Request = Request::instance();
            if ($Request->isPost() && !empty($ids) && is_array($ids)) { //初始化
                $path = config('data_backup_path');
                is_dir($path) || mkdir($path, 755, true);
                //读取备份配置
                $config = [
                    'path' => realpath($path) . DIRECTORY_SEPARATOR,
                    'part' => config('data_backup_part_size'),
                    'compress' => config('data_backup_compress'),
                    'level' => config('data_backup_compress_level'),
                ];

                //检查是否有正在执行的任务
                $lock = "{$config['path']}backup.lock";
                if (is_file($lock)) {
                    return $this->error('检测到有一个备份任务正在执行，请稍后再试，或手动删除"'.$lock.'"后重试！');
                }
                file_put_contents($lock, $Request->time()); //创建锁文件
                //检查备份目录是否可写
                is_writeable($config['path']) || $this->error('备份目录不存在或不可写，请检查后重试！');
                session('backup_config', $config);

                //生成备份文件信息
                $file = [
                    'name' => date('Ymd-His', $Request->time()),
                    'part' => 1,
                ];
                session('backup_file', $file);
                //缓存要备份的表
                session('backup_tables', $ids);

                //创建备份文件
                $Database = new \com\Database($file, $config);
                if (false !== $Database->create()) {
                    $tab = ['id' => 0, 'start' => 0];
                    return $this->success('初始化成功！', '', ['tables' => $ids, 'tab' => $tab]);
                } else {
                    return $this->error('初始化失败，备份文件创建失败！');
                }
            }
    ......

可以看到，备份文件的命名用的time方法，跟进

    public function time($float = false)
        {
            return $float ? $_SERVER['REQUEST_TIME_FLOAT'] : $_SERVER['REQUEST_TIME'];
        }

可以看到利用REQUEST\_TIME进行构造文件名，因此可以直接爆破得到并下载。

### 漏洞复现

在后台系统管理-\>数据库管理模块将所有数据库备份

![](./.resource/Yunucmsv2.0.7数据库泄露/media/rId26.png)

查看本地文件，所有备份保存在data目录下，发现名命是以时间命名，可以直接爆破得到

![](./.resource/Yunucmsv2.0.7数据库泄露/media/rId27.png)

从前台访问并下载

![](./.resource/Yunucmsv2.0.7数据库泄露/media/rId28.png)

下载完成后打开，泄露所有数据库信息

![](./.resource/Yunucmsv2.0.7数据库泄露/media/rId29.shtml)
