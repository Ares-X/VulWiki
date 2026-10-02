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
title: "YXCMS 1.4.7任意文件写入"
prerequisites: "来源所述条件，未列明部分仍待核：admin templatecreatepermission; ifillegalpathcheck; writablePHPtemplate"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-efeb2b1d9ccd531c7bcb6516"
entity_id: "ve-efeb2b1d9ccd531c7bcb6516"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：admin templatecreatepermission; ifillegalpathcheck; writablePHPtemplate

- **结论使用边界（1）**：源码有ifillegal(filepath)路径校验未提供定义，不能断言任意位置文件写。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **适用与权限边界（2）**：管理员模板本来创建.php可能是预期能力，需权限边界/CSRF判断是否独立漏洞。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **结论使用边界（3）**：URL把?与&amp;编码进路径并粘接中文，无法直接路由。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **事实待核（4）**：filename例写shell.php但代码自动追加.php会成为shell.php.php，需对齐；缺修复/来源。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# YXcms 1.4.7 任意文件写入

一、漏洞简介
------------

二、漏洞影响
------------

YXcms 1.4.7

三、复现过程
------------

### 漏洞分析

漏洞文件protected/apps/admin/controller/setController.php的140行，\$tpfile接收到GET传过来的值，如果为空的话就会报非法操作。传过来的URL是admin/set/tpadd&Mname=default，所以\$tpfile就是default。

再来下是检测是否有POST的值，接受到POST过来的filename,用trim去掉两边的空格。接收到POST过来的code，用stripcslashes反转义。

\$filepath=\$templepath.\$filename.\'.php\'这一句是路径和文件的拼接，然后下面检测路径是否存在。

最后没有过滤任何的危险函数就传给file\_put\_contents函数，写入网站的目录。

    public function tpadd()
    {
       $tpfile=$_GET['Mname'];
       if(empty($tpfile)) $this->error('非法操作~');
       $templepath=BASE_PATH . $this->tpath.$tpfile.'/';
       if($this->isPost()){
         $filename=trim($_POST['filename']);
         $code=stripcslashes($_POST['code']);
         if(empty($filename)||empty($code)) $this->error('文件名和内容不能为空');
         $filepath=$templepath.$filename.'.php';
         if($this->ifillegal($filepath)) {$this->error('非法的文件路径~');exit;}
         try{
            file_put_contents($filepath, $code);
          } catch(Exception $e) {
            $this->error('模板文件创建失败！');
          } 
          $this->success('模板文件创建成功！',url('set/tplist',array('Mname'=>$tpfile)));
       }else{
         $this->tpfile=$tpfile;
         $this->display();

       }
    }

### 复现

    http://0-sec.org/index.php%3Fr%3Dadmin/set/tpadd%26Mname%3Ddefault打开我们的文件监控软件FolderChangesView，输入我们的程序路径D:\\phpStudy\\PHPTutorial\\WWW\\YXcms然后写shell.php文件名，写入我们的代码。然后会在\\protected\\apps\\default\\view\\default下面生成我们写入的文件。