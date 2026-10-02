---
source: "hatch 补库批 20260928"
product: "XDCMS3.0"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "XDCMS 3.0 数据库备份任意文件夹删除"
prerequisites: "来源所述条件，未列明部分仍待核：backendbackupdeletepermission unspecified; traversed directory writable; only directfileswithdotatnonzeropositiondeleted"
side_effects: "未执行；本文需注意的操作影响：明确更正：代码 `strpos($file,\".\")` 排除无点文件和点开头的隐藏文件，unlink 只处理该层文件而不递归进入子目录，rmdir 只会删除空目录。原文“所有文件/任意文件夹删除”范围过大。；showmsg 输出 success 不检查各次 unlink/rmdir 返回，不能确认删除成功；备份管理权限和进程写权限仍需核。删除实验应在独立临时目录，事前备份，失败也须检查部分删除。"
source_status: "unknown"
id: "vw-af75808bfe9f09da57da6f41"
entity_id: "ve-af75808bfe9f09da57da6f41"
schema_version: "1"
---

## 核对与使用边界

- 明确更正：代码 `strpos($file,".")` 排除无点文件和点开头的隐藏文件，unlink 只处理该层文件而不递归进入子目录，rmdir 只会删除空目录。原文“所有文件/任意文件夹删除”范围过大。
- showmsg 输出 success 不检查各次 unlink/rmdir 返回，不能确认删除成功；备份管理权限和进程写权限仍需核。删除实验应在独立临时目录，事前备份，失败也须检查部分删除。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：backendbackupdeletepermission unspecified; traversed directory writable; only directfileswithdotatnonzeropositiondeleted

- **结论使用边界（1）**：正文所有文件/任意文件夹过宽：strpos($file,'.')排除无点文件和点开头隐藏文件，unlink不递归删子目录，rmdir仅空目录成功。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **证据待核（2）**：没有参数URL/请求/响应，第一图误借后台登录SQLi目录需核。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **操作与副作用边界（3）**：showmsg总success不检查每个unlink/rmdir返回，不能据成功提示确认全部删除。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **操作与副作用边界（4）**：缺修复/原始源，删除副作用高。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# XDCMS 3.0 数据库备份任意文件夹删除

一、漏洞简介
------------

二、漏洞影响
------------

XDCMS 3.0

三、复现过程
------------

![](./.resource/XDCMS3.0后台登录窗sql注入漏洞/media/rId24.jpg)

漏洞点：`system/modules/xdcms/data.php`

    public function delete(){
            $file=trim($_GET["file"]);
            $dir=DATA_PATH.'backup/'.$file;
            if(is_dir($dir)){
                //删除文件夹中的文件
                if (false != ($handle = opendir ( $dir ))) {  
                    while ( false !== ($file = readdir ( $handle )) ) {   
                        if ($file != "." && $file != ".."&&strpos($file,".")) {  
                            @unlink($dir."/".$file);    
                        }  
                    }  
                    closedir ( $handle );  
                }  
            
                @rmdir($dir);//删除目录
            }
            showmsg(C('success'),'-1');
        }

删除数据库备份时候仅判断是否为文件夹，是则删除其中所有的文件；同时未对目录进行过滤，导致可以删除任意文件夹中的文件

![](./.resource/XDCMS3.0数据库备份任意文件夹删除/media/rId25.jpg)
