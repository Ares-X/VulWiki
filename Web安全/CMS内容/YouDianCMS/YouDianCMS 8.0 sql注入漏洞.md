---
source: "hatch 补库批 20260928"
product: "YouDianCMS8.0"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "YouDianCMS 8.0 sql注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：registeredmember; POSTsaveModify; _checkPostbehaviorunknown; MySQLexpressioninMemberID"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-4d52c3b53afb16a1294f3b57"
entity_id: "ve-4d52c3b53afb16a1294f3b57"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：registeredmember; POSTsaveModify; _checkPostbehaviorunknown; MySQLexpressioninMemberID

- **事实待核（1）**：前言称搜索栏关键字注入但实际源码/PoC是saveModify的MemberID，明确功能/参数错配。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **结论使用边界（2）**：用户归属检查在SQL之后，不能阻止前置注入；这条顺序应保留。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **证据待核（3）**：_checkPost未给实现，需核是否另做类型检查；PoC只有\[SQL\]占位无实际执行证明。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **适用与权限边界（4）**：提供两篇原文来源，需安全版/修复和注册开放条件。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# YouDianCMS 8.0 sql注入漏洞

一、漏洞简介
------------

二、漏洞影响
------------

YouDianCMS 8.0

三、复现过程
------------

### 漏洞分析

需要先登录此漏洞。页面可以注册。

<http://localhost/youdiancms/index.php/public/reg/l/cn>

在这里登录

漏洞位置位于index.php/member/customer/index搜索栏

未筛选搜索的关键字，导致sql注入漏洞

/App/Lib/Action/Member/CustomerAction.class.php：

    function saveModify(){
        header("Content-Type:text/html; charset=utf-8");
        $this->_checkPost( $_POST );
        unset( $_POST['InviterID'], $_POST['IsEnable']);
        $m = D('Admin/Member');
        $inviterID = $m->where("MemberID={$_POST['MemberID']}")->getField('InviterID');
        //检查当前MemberID是否自己的客户
        if( $inviterID == session('MemberID')){
            if( $m->create() ){
                if($m->save() === false){
                    $this->ajaxReturn(null, '修改失败!' , 0);
                }else{
                    $this->ajaxReturn(null, '修改成功!' , 1);
                }
            }else{
                $this->ajaxReturn(null, $m->getError() , 0);
            }
        }else{
            $this->ajaxReturn(null, '数据异常' , 0);
        }
    }

漏洞点在:

        $inviterID = $m->where("MemberID={$_POST['MemberID']}")->getField('InviterID');

上述代码直接将POST带入进了where子查询。

### 复现

POC：

    URL：http://www.0-sec.org/index.php/Member/Customer/saveModify
    POST：MemberName=xxxxx&MemberID=[SQL]

四、参考链接
------------

> <https://blog.csdn.net/qq_36093477/article/details/98035255>
>
> <http://www.f4ckweb.top/index.php/archives/45/>
