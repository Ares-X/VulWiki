---
source: "白阁文库 BaizeSec/bylibrary"
product: "YXCMS1.4.7 filesController"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "YXCMS 1.4.7任意文件删除（一）"
prerequisites: "来源所述条件，未列明部分仍待核：backendfilemanager;fnamepassedthroughin;recursive del_dir implementation unknown"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-c471e417e500e625c358eea5"
entity_id: "ve-c471e417e500e625c358eea5"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：backendfilemanager;fnamepassedthroughin;recursive del_dir implementation unknown

- **结论使用边界（1）**：%2C是逗号不是分号，str_replace替换所有逗号不是仅最前面。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（2）**：in()预处理未展开，称无任何过滤不准确，需证明仍保留穿越。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（3）**：有目录del_dir与文件unlink两支，较628独立入口，需保留递归风险差异。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **事实待核（4）**：payload请求只图，缺修复/原始源；小节标题的 Markdown 空格已修正。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# YXCMS 1.4.7任意文件删除（一）

### 1.影响版本 ###
YXcms 1.4.7
### 2. 复现过程 ###
这个漏洞是在后台

看到了这里有一个删除的按钮

![](./.resource/YXCMS1.4.7任意文件删除一/media/Yiuxw6.png)
点击删除，进行抓包：

通过控制fname参数可以实现任意文件删除的功能


![](./.resource/YXCMS1.4.7任意文件删除一/media/YiKk61.png)
**代码分析**

代码位置protected/apps/admin/controller/filesController.php：

    public function del()
    {
       $dirs=in($_GET['fname']);
       $dirs=str_replace(',','/',$dirs);
       $dirs=ROOT_PATH.'upload'.$dirs;
       if(is_dir($dirs)){del_dir($dirs); echo 1;} 
       elseif(file_exists($dirs)){
            if(unlink($dirs)) echo 1;
       }else echo '文件不存在'; 
    }
对fname进行替换操作str_replace(',','/',$dirs);
讲参数最前面的分号(%2C)替换为/

然后完整的拼接路径，看文件是否存在，存在就进行删除
这里没有读传入的参数进行过滤，
可以及逆行上跳目录，从而达到任意文件删除的效果


---

> 来源：白阁文库 BaizeSec/bylibrary
