---
source: "hatch 补库批 20260928"
product: "XDCMS3.0 linkadministration"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "XDCMS 3.0 后台友情链接sql注入"
prerequisites: "来源所述条件，未列明部分仍待核：authenticated link-addpermission; legacyPHPhtmlspecialcharsdefaults; vulnerabledb_insertassembly"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-96befa6d6c84beaafd5992d6"
entity_id: "ve-96befa6d6c84beaafd5992d6"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：authenticated link-addpermission; legacyPHPhtmlspecialcharsdefaults; vulnerabledb_insertassembly

- **证据待核（1）**：代码展示title/url拼SQL支持注入风险，但无具体请求/响应，不能把其他后台多处未经列举全部确认。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **证据待核（2）**：声称过滤成功防所有XSS超过当前函数证据，输出上下文不同不能保证。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **证据待核（3）**：图片指后台登录SQLi目录，需核相关性；regex换行/空格匹配细节需原版核。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **适用与权限边界（4）**：应补PHP版本、最低角色、修复/原始源。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# XDCMS 3.0 后台友情链接sql注入

一、漏洞简介
------------

二、漏洞影响
------------

XDCMS 3.0

三、复现过程
------------

![](./.resource/XDCMS3.0后台登录窗sql注入漏洞/media/rId24.jpg)

友链title和url部分过滤函数成功防御了XSS，但对SQL过滤不全，关键代码如下：

    system/modules/link/admin.php
    public function addsave(){
        $title=safe_html($_POST['title']);
        $url=safe_html($_POST['url']);
        if(empty($title)||empty($url)){
            showmsg(C('material_not_complete'),'-1');
        }
        $this->mysql->db_insert('link',"`title`='".$title."',`url`='".$url."',`inputtime`='".datetime()."',`is_lock`=0");
        showmsg(C('add_success'),'index.php?m=link&c=admin');
    }
    safe_html()
    function safe_html($str){
        if(empty($str)){return;}
        $str=preg_replace('/select|insert | update | and | in | on | left | joins | delete |\%|\=|\/\*|\*|\.\.\/|\.\/| union | from | where | group | into |load_file
    |outfile/','',$str);
        return htmlspecialchars($str);
    }

经检测，后台多处存在与上面原理相同SQL注入，不再一一记录。
