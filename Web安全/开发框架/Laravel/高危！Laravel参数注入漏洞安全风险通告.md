---
cve: "CVE-2024-52301"
source: "gelusus/wxvl 公众号漏洞文库"
product: "Laravel/HTTP请求argv环境选择注入"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2024-52301"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "高危！Laravel参数注入漏洞安全风险通告"
prerequisites: "来源所述条件，未列明部分仍待核：<6.20.45、7<7.30.7、8<8.83.28、9<9.52.17、10<10.48.23、11<11.31.0；需register_argc_argv=on"
side_effects: "未执行；本文需注意的操作影响：下游效果需说明；改变框架运行环境不等于直接OS环境变量任意写/RCE，所需.env或环境配置条件未展开"
source_status: "unknown"
id: "vw-920eeb311a28837ae3700fbe"
entity_id: "ve-920eeb311a28837ae3700fbe"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：&lt;6.20.45、7&lt;7.30.7、8&lt;8.83.28、9&lt;9.52.17、10&lt;10.48.23、11&lt;11.31.0；需register_argc_argv=on

代码与实验材料：无内嵌PoC，公告明确未复现，链接外部PoC；技术根因条件化清楚

来源证据范围：Laravel11.31.0官方release、NVD、Nyamort仓库及二手新闻，亚信CERT2024-11-19

- **来源与引用处置（1）**：补丁与商业检测规则应区分；依据：TDA规则号/离线包推广不是Laravel补丁；仅最新主线release未给六分支固定点原公告。保留这部分来源材料并与技术结论分开；其引用或宣传内容不能补足本文漏洞的证据。

- **实验改动边界（2）**：下游效果需说明；依据：改变框架运行环境不等于直接OS环境变量任意写/RCE，所需.env或环境配置条件未展开。以下步骤按原实验条件保留；人工改动后的行为只支持该修改环境，不用于证明未修改发行版默认可利用。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  高危！Laravel参数注入漏洞安全风险通告   
应急响应中心  亚信安全   2024-11-19 09:08  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/iczzp36h0nbHWoZpicH8TsjJaQNemicEFHXNIhjehdYYNl8ibZSSrlicXLNRicLkJ5iapOkGpPf7YzGmhOHj7iacibHA1SA/640?wx_fmt=jpeg "")  
  
  
今日，亚信安全CERT监控到安全社区研究人员发布安全通告，披露了Laravel 参数注入漏洞(CVE-2024-52301)。在受影响的版本中，Application.php 文件的 detectEnvironment 函数直接使用了 $_SERVER['argv']，但没有检查运行环境是否为 CLI。如果 register_argc_argv 设置为 on，即使是 Web 请求 $_SERVER['argv'] 也可会被填充，从而造成危险行为。攻击者可以在 URL 中构造参数从而改变框架运行环境。  
  
  
**亚信安全CERT建议受影响的用户将Laravel 升级至最新版本 。**  
  
  
Laravel 是一个开源的 PHP 框架，用于开发 Web 应用程序。它采用了 MVC设计模式，旨在简化常见的 Web 开发任务，提供易用的工具和功能，使开发人员能够更高效地构建应用程序。  
  
  
**漏洞编号、类型、等级**  
  
  
  
- CVE-2024-52301  
  
- 参数注入漏洞  
  
- 高危  
  
  
  
  
**漏洞状态**  
  
  
  
<table><tbody style="box-sizing: border-box;"><tr opera-tn-ra-comp="_$.pages:0.layers:0.comps:10.classicTable1:0" style="box-sizing: border-box;"><td colspan="1" rowspan="1" opera-tn-ra-cell="_$.pages:0.layers:0.comps:10.classicTable1:0.td@@0" style="border-width: 1px;border-color: rgb(62, 62, 62);border-style: solid;background-color: rgb(145, 145, 145);box-sizing: border-box;padding: 0px;" width="20.0000%"><section style="margin: 5px 0%;box-sizing: border-box;"><section style="text-align: justify;padding: 0px 5px;font-size: 14px;color: rgb(255, 255, 255);box-sizing: border-box;"><p style="text-align: center;white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;">细节</strong></p></section></section></td><td colspan="1" rowspan="1" opera-tn-ra-cell="_$.pages:0.layers:0.comps:10.classicTable1:0.td@@1" style="border-width: 1px;border-color: rgb(62, 62, 62);border-style: solid;background-color: rgb(145, 145, 145);box-sizing: border-box;padding: 0px;" width="20.0000%"><section style="margin: 5px 0%;box-sizing: border-box;"><section style="padding: 0px 5px;font-size: 14px;color: rgb(255, 255, 255);box-sizing: border-box;"><p style="margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;">PoC</strong></p></section></section></td><td colspan="1" rowspan="1" opera-tn-ra-cell="_$.pages:0.layers:0.comps:10.classicTable1:0.td@@2" style="border-width: 1px;border-color: rgb(62, 62, 62);border-style: solid;background-color: rgb(145, 145, 145);box-sizing: border-box;padding: 0px;" width="20.0000%"><section style="margin: 5px 0%;box-sizing: border-box;"><section style="padding: 0px 5px;font-size: 14px;color: rgb(255, 255, 255);box-sizing: border-box;"><p style="margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;">EXP</strong></p></section></section></td><td colspan="1" rowspan="1" opera-tn-ra-cell="_$.pages:0.layers:0.comps:10.classicTable1:0.td@@3" style="border-width: 1px;border-color: rgb(62, 62, 62);border-style: solid;background-color: rgb(145, 145, 145);box-sizing: border-box;padding: 0px;" width="20.0000%"><section style="margin: 5px 0%;box-sizing: border-box;"><section style="padding: 0px 5px;font-size: 14px;color: rgb(255, 255, 255);box-sizing: border-box;"><p style="margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;">在野利用</strong></p></section></section></td><td colspan="1" rowspan="1" opera-tn-ra-cell="_$.pages:0.layers:0.comps:10.classicTable1:0.td@@4" style="border-width: 1px;border-color: rgb(62, 62, 62);border-style: solid;background-color: rgb(145, 145, 145);box-sizing: border-box;padding: 0px;" width="20.0000%"><section style="margin: 5px 0%;box-sizing: border-box;"><section style="padding: 0px 5px;font-size: 14px;color: rgb(255, 255, 255);box-sizing: border-box;"><p style="margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;">复现情况</strong></p></section></section></td></tr><tr opera-tn-ra-comp="_$.pages:0.layers:0.comps:10.classicTable1:1" style="box-sizing: border-box;"><td colspan="1" rowspan="1" opera-tn-ra-cell="_$.pages:0.layers:0.comps:10.classicTable1:1.td@@0" style="border-width: 1px;border-color: rgb(62, 62, 62);border-style: solid;box-sizing: border-box;padding: 0px;" width="20.0000%"><section style="margin: 5px 0%;box-sizing: border-box;"><section style="padding: 0px 5px;font-size: 14px;color: rgb(62, 62, 62);box-sizing: border-box;"><p style="margin: 0px;padding: 0px;box-sizing: border-box;">已公开</p></section></section></td><td colspan="1" rowspan="1" opera-tn-ra-cell="_$.pages:0.layers:0.comps:10.classicTable1:1.td@@1" style="border-width: 1px;border-color: rgb(62, 62, 62);border-style: solid;box-sizing: border-box;padding: 0px;" width="20.0000%"><section style="margin: 5px 0%;box-sizing: border-box;"><section style="padding: 0px 5px;font-size: 14px;color: rgb(62, 62, 62);box-sizing: border-box;"><p style="margin: 0px;padding: 0px;box-sizing: border-box;">已公开</p></section></section></td><td colspan="1" rowspan="1" opera-tn-ra-cell="_$.pages:0.layers:0.comps:10.classicTable1:1.td@@2" style="border-width: 1px;border-color: rgb(62, 62, 62);border-style: solid;box-sizing: border-box;padding: 0px;" width="20.0000%"><section style="margin: 5px 0%;box-sizing: border-box;"><section style="padding: 0px 5px;font-size: 14px;color: rgb(62, 62, 62);box-sizing: border-box;"><p style="margin: 0px;padding: 0px;box-sizing: border-box;">已公开</p></section></section></td><td colspan="1" rowspan="1" opera-tn-ra-cell="_$.pages:0.layers:0.comps:10.classicTable1:1.td@@3" style="border-width: 1px;border-color: rgb(62, 62, 62);border-style: solid;box-sizing: border-box;padding: 0px;" width="20.0000%"><section style="margin: 5px 0%;box-sizing: border-box;"><section style="padding: 0px 5px;font-size: 14px;color: rgb(62, 62, 62);box-sizing: border-box;"><p style="margin: 0px;padding: 0px;box-sizing: border-box;">未发现</p></section></section></td><td colspan="1" rowspan="1" opera-tn-ra-cell="_$.pages:0.layers:0.comps:10.classicTable1:1.td@@4" style="border-width: 1px;border-color: rgb(62, 62, 62);border-style: solid;box-sizing: border-box;padding: 0px;" width="20.0000%"><section style="margin: 5px 0%;box-sizing: border-box;"><section style="padding: 0px 5px;font-size: 14px;color: rgb(62, 62, 62);box-sizing: border-box;"><p style="margin: 0px;padding: 0px;box-sizing: border-box;">未复现</p></section></section></td></tr></tbody></table>  
  
  
**受影响版本**  
  
  
  
- Laravel < 6.20.45  
  
- 7.0.0 <= Laravel < 7.30.7  
  
- 8.0.0 <= Laravel < 8.83.28  
  
- 9.0.0 <= Laravel < 9.52.17  
  
- 10.0.0 <= Laravel < 10.48.23  
  
- 11.0.0 <= Laravel < 11.31.0  
  
  
  
  
**产品解决方案**  
  
  
  
目前亚信安全怒狮引擎已第一时间新增了检测规则，支持CVE-2024-52301漏洞的检测，请及时更新TDA产品的特征库到最新版本。**规则编号：106064056，规则名称：Laravel环境变量注入漏洞(CVE-2024-52301)。**  
  
  
更新方式如下：  
  
  
- TDA产品在线更新方法：登录系统-》系统管理-》系统升级-》特征码更新；  
  
- TDA产品离线升级PTN包下载链接如下：  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/iczzp36h0nbHWoZpicH8TsjJaQNemicEFHXzKzglKI4ds3AibUjCSHl90MzqwTbZHMz4jpiaCibTDwyqWSM0Pwm4PH8g/640?wx_fmt=png "")  
  
（后台私信下载离线升级PTN包）  
  
  
**修复建议**  
  
  
  
目前，官方已发布相关修复公告，建议受影响的用户将Laravel更新到最新版本或者到官网查询具体补丁信息。  
  
  
https://github.com/laravel/framework/releases/tag/v11.31.0  
  
  
**参考链接**  
  
  
  
- https://github.com/laravel/framework  
  
- https://github.com/Nyamort/CVE-2024-52301  
  
- https://nvd.nist.gov/vuln/detail/CVE-2024-52301  
  
- https://cybersecuritynews.com/critical-laravel-vulnerability/  
  
  
  
  
本文发布的补丁下载链接均源自各原厂官方网站。尽管我们努力确保官方资源的安全性，但在互联网环境中，文件下载仍存在潜在风险。为保障您的设备安全与数据隐私，敬请您在点击下载前谨慎核实其安全性和可信度。  
  
  
  
  
了解亚信安全，请点击  
**“阅读原文”**  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
