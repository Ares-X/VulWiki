---
source: "hatch 补库批 20260928"
product: "CmsEasy"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "CmsEasy 7.3.8 任意文件操作"
prerequisites: "来源所述条件，未列明部分仍待核：7.3.8; backend template editor; read/delete shown; write asserted only"
side_effects: "未执行；本文需注意的操作影响：Three distinct read/delete/write claims should have separate evidence status"
source_status: "unknown"
id: "vw-610b6fd6563083804dc5c772"
entity_id: "ve-610b6fd6563083804dc5c772"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：7.3.8; backend template editor; read/delete shown; write asserted only

- **操作与副作用边界（1）**：Three distinct read/delete/write claims should have separate evidence status。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **证据待核（2）**：No textual endpoints, payloads or deobfuscated source; write explicitly not demonstrated。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **适用与权限边界（3）**：Admin scope implicit, introduction empty; precise original source available。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# CmsEasy 7.3.8 任意文件操作

一、漏洞简介
------------

二、漏洞影响
------------

CmsEasy 7.3.8

三、复现过程
------------

"无需代码，自由拖拽布局，适应所有设备"是这个系统宣传的特色，后台自然地存在自定义网站模板功能，这种功能中如果处理不当很可能造成文件任意读、写或者删除的脆弱性问题，需要着重注意。

![](./.resource/CmsEasy7.3.8任意文件操作/media/rId24.png)

观察模板编辑功能，存在对模板的html文件的读取操作，对应到HTTP请求可以明显看到可控参数

![](./.resource/CmsEasy7.3.8任意文件操作/media/rId25.png)

看到功能不急着看代码，首先想到黑盒测试一下，手动修改id参数后观察发现可以这个接口果然没有做好限制和过滤，可以读取任意传参文件

![](./.resource/CmsEasy7.3.8任意文件操作/media/rId26.png)

观察接口URL中的参数，猜测除了fetch之外应该还有保存和删除的功能，但是功能接口的接收参数就不知道了，因此需要去看源码以进行下一步操作

##### 定位到接口的功能函数文件后，发现经过了加密混淆处理。。。

![](./.resource/CmsEasy7.3.8任意文件操作/media/rId28.png)

经过一番操作后，最终得到了文件删除的接口函数大致内容，很明显地存在文件删除路径可控问题

![](./.resource/CmsEasy7.3.8任意文件操作/media/rId29.png)

![](./.resource/CmsEasy7.3.8任意文件操作/media/rId30.png)

![](./.resource/CmsEasy7.3.8任意文件操作/media/rId31.png)

同理，文件写也存在问题，这里就不详细列出了，感兴趣的朋友可以再看看

参考链接
--------

> https://xz.aliyun.com/t/7273
