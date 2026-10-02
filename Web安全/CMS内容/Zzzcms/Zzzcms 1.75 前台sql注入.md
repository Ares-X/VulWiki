---
source: "hatch 补库批 20260928"
product: "ZZZCMS1.75 SMSlist"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Zzzcms 1.75 前台sql注入"
prerequisites: "来源所述条件，未列明部分仍待核：sms_list.php reachable/authunknown; POSTid associativearray withoutkey0; DBBENCHMARK support"
side_effects: "未执行；本文需注意的操作影响：入口实际db_delete，验证可删除SMS记录不能当只读时间检测"
source_status: "unknown"
id: "vw-8020a087f8416f670276e493"
entity_id: "ve-8020a087f8416f670276e493"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：sms_list.php reachable/authunknown; POSTid associativearray withoutkey0; DBBENCHMARK support

- **适用与权限边界（1）**：数组键直接拼SQL和缺key0分支是关键条件，需文本完整payload，现在全图。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **证据待核（2）**：作者加SQL回显调试，必须区别改动后的证据与原版仅盲注。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **操作与副作用边界（3）**：入口实际db_delete，验证可删除SMS记录不能当只读时间检测。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **证据待核（4）**：前台标题不足证明无登录，上层鉴权未示；有xz来源/缺补丁。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Zzzcms 1.75 前台sql注入

一、漏洞简介
------------

二、漏洞影响
------------

Zzzcms 1.75

三、复现过程
------------

注入点的入口在plugins\\sms\\sms\_list.php文件中，

![](./.resource/Zzzcms1.75前台sql注入/media/rId24.png)

其中id参数是用户post输入的参数，并且在第7行中调用了db\_delete去删除指定id的数据，进入db\_delete函数后可以看到函数本身并不长，逻辑还是较为清晰的。

在获取到代表着数据库连接的\$d后开始处理传入的\$where条件变量，接着调用db\_cond\_to\_sqladd函数后传入db\_exec进行sql语句的执行过程。

![](./.resource/Zzzcms1.75前台sql注入/media/rId25.png)

这里继续看db\_cond\_to\_sqladd函数部分，该函数代码部分比较长（70行），但只需要着重看其中几个处理分支即可。注入点传入的条件变量是数组，自然进入下面的第一个红框控制流中。接着，假如传入的参数id也是数组并且不存在key为0的元素，那么会进入第二个红框控制流中。

关键点在于第三个红框的控制流中，作为键名key的\$k1直接拼接到了条件语句中。

![](./.resource/Zzzcms1.75前台sql注入/media/rId26.png)

在代码中加入sql语句回显进行测试，当我们传入如下post的id后，返回的sql语句如下所示，已经形成可以利用的SQL注入点了：

![](./.resource/Zzzcms1.75前台sql注入/media/rId27.png)

利用BENCHMARK函数可以直接构造exp利用时间盲注得到数据库信息。

参考链接
--------

> https://xz.aliyun.com/t/7414
