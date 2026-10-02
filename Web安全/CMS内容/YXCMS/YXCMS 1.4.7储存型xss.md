---
source: "hatch 补库批 20260928"
product: "YXCMS1.4.7"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "YXCMS 1.4.7储存型xss"
prerequisites: "来源所述条件，未列明部分仍待核：publicguestbookwrites; admineditrendersrecord; outputescapingunknown"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-ef869c610ba498dfd7900baf"
entity_id: "ve-ef869c610ba498dfd7900baf"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：publicguestbookwrites; admineditrendersrecord; outputescapingunknown

- **证据待核（1）**：所给前台index只分发，后台mesedit展示/修改，并未给匿名留言实际保存和模板输出，链缺关键两端。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **结论使用边界（2）**：文称中间没过滤但代码有in/html_in，需说明输入/输出上下文不足而非否认处理。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **事实待核（3）**：payload与中文步骤连一行，末尾image缺证据；版本明确但无源/修复。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **适用与权限边界（4）**：后台checkConPower是受害浏览/管理权限不是匿名攻击者条件，需区分。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# YXcms 1.4.7 储存型xss

一、漏洞简介
------------

二、漏洞影响
------------

YXcms 1.4.7

三、复现过程
------------

### 漏洞分析

前台的文件源码protected/apps/default/controller/columnController.php

    public function index()
    {
        $ename=in($_GET['col']);
        if(empty($ename)) throw new Exception('栏目名不能为空~', 404);
        $sortinfo=model('sort')->find("ename='{$ename}'",'id,name,ename,path,url,type,deep,method,tplist,keywords,description,extendid');
        $path=$sortinfo['path'].','.$sortinfo['id'];
        $deep=$sortinfo['deep']+1;
        $this->col=$ename;
        switch ($sortinfo['type']) {
            case 1://文章
                $this->newslist($sortinfo,$path,$deep);
                break;
            case 2://图集
                $this->photolist($sortinfo,$path,$deep);
                break;
            case 3://单页
                $this->page($sortinfo,$path,$deep);
                break;
            case 4://应用

                break;
            case 5://自定义

                break;
            case 6://表单
                $this->extend($sortinfo,$path,$deep);
                break;
            default:
                throw new Exception('未知的栏目类型~', 404);
                break;
        }
    }

后台的文件源码protected/apps/admin/controller/extendfieldController.php

    public function mesedit()
    {
        $tableid=intval($_GET['tabid']);
        if(!$this->checkConPower('extend',$tableid)) $this->error('您没有权限管理此独立表内容~');
        $id=intval($_GET['id']);//信息id
        if(empty($tableid) || empty($id) ) $this->error('参数错误~');
        $tableinfo = model('extend')->select("id='{$tableid}' OR pid='{$tableid}'",'id,tableinfo,name,type,defvalue','pid,norder DESC');
        if(empty($tableinfo)) $this->error('自定义表不存在~');
        if (!$this->isPost()) {
           $info=model('extend')->Extfind($tableinfo[0]['tableinfo'],"id='{$id}'");
           $this->info=$info;
           $this->tableid=$tableid;
           $this->id=$id;
           $this->tableinfo=$tableinfo;
           $this->display();
        }else{
           for($i=1;$i<count($tableinfo);$i++){
            if(is_array($_POST[$tableinfo[$i]['tableinfo']]))
              $data[$tableinfo[$i]['tableinfo']]=implode(',',$_POST[$tableinfo[$i]['tableinfo']]);
            else
              $data[$tableinfo[$i]['tableinfo']]=html_in($_POST[$tableinfo[$i]['tableinfo']]);
           }
           if(model('extend')->Extup($tableinfo[0]['tableinfo'],"id='{$id}'",$data)) $this->success('修改成功~',url('extendfield/meslist',array('id'=>$tableid)));
           else $this->error('信息修改失败~');
         }
    }

中间没什么过滤

### 复现

    http://0-sec.org/index.php?r=default/column/index&col=guestbook

payload：

    <svg/onload=alert(1)>然后登陆后台，查看审核点击编辑

image
