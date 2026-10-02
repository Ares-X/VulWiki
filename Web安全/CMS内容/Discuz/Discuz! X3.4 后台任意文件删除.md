---
source: "hatch 补库批 20260928"
product: "Discuz X3.4"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Discuz! X3.4 后台任意文件删除"
prerequisites: "来源所述条件，未列明部分仍待核：Admin forum edit; valid detailsubmit/formhash/session; no multiset; local attachurl path and deletable target"
side_effects: "未执行；本文需注意的操作影响：Distinct admin reply-background deletion from member birthprovince deletion97"
source_status: "unknown"
id: "vw-e062b6966256b69bf228803a"
entity_id: "ve-e062b6966256b69bf228803a"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Admin forum edit; valid detailsubmit/formhash/session; no multiset; local attachurl path and deletable target

- **适用与权限边界（1）**：Admin scope explicit; unlink traversal code and original XZ source clear。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **适用与权限边界（2）**：Intro URL omits detailsubmit/formhash though code requires submitcheck; screenshot-only final request。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **操作与副作用边界（3）**：Distinct admin reply-background deletion from member birthprovince deletion97。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **事实待核（4）**：Exact patched build/version cutoff absent。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Discuz! X3.4 后台任意文件删除

一、漏洞简介
------------

后台任意文件删除，需要有管理员的权限。

二、漏洞影响
------------

Discuz!X V3.4

三、复现过程
------------

### 漏洞分析

分析一下该请求的流程。

请求URL：`/dz/upload/admin.php?action=forums&operation=edit&fid=2&replybgnew=../../../testfile.txt&delreplybg=1`

在`admin.php`中接收了action参数，在第58行经过`admincpfile`函数处理后返回文件路径，并包含该文件。

    if($admincp->allow($action, $operation, $do) || $action == 'index') {
            require $admincp->admincpfile($action);

看一下该函数的处理过程：

    function admincpfile($action) {
            return './source/admincp/admincp_'.$action.'.php';
        }

经过处理返回的内容是：`./source/admincp/admincp_forums.php`，也就来到了漏洞存在的地方。

根据if/else的判断条件，进入else中的代码：

    if(!submitcheck('detailsubmit')) {
      ......
    }
    else{

    }

造成漏洞的代码：

    if(!$multiset) {
      if($_GET['delreplybg']) {
        $valueparse = parse_url($_GET['replybgnew']);
        if(!isset($valueparse['host']) && file_exists($_G['setting']['attachurl'].'common/'.$_GET['replybgnew'])) {
          @unlink($_G['setting']['attachurl'].'common/'.$_GET['replybgnew']);
        }
        $_GET['replybgnew'] = '';
      }

`$multiset`默认为0，只要不给该参数赋值就满足条件进入if语句。

第二个if语句，检查GET参数`delreplybg`有没有内容，然后做了下检测，检测parse\_url函数返回的结果中有没有host这个变量，来确保GET参数`replybgnew`不是url，但是并不影响传入文件路径。

这里`$_G['setting']['attachurl'`的值为`data/attachment/`，再拼接上`common/`和`$_GET['replybgnew']`，这样路径就可控了。通过unlink达到文件删除的目的。

### 漏洞复现

登陆后台，进入论坛-\>模块管理-\>编辑板块，使用burp拦截提交的数据。

![](./.resource/Discuz!X3.4后台任意文件删除/media/rId26.png)

![](./.resource/Discuz!X3.4后台任意文件删除/media/rId27.png)

发送，查看文件发现被删除。

![](./.resource/Discuz!X3.4后台任意文件删除/media/rId28.png)

参考链接
--------

> https://xz.aliyun.com/t/7492\#toc-7
