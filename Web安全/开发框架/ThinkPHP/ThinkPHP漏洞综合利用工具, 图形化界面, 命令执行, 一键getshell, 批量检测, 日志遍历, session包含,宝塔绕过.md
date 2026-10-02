---
source: "gelusus/wxvl 公众号漏洞文库"
product: "ThinkPHP / thinkphp_gui_tools"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "ThinkPHP漏洞综合利用工具, 图形化界面, 命令执行, 一键getshell, 批量检测, 日志遍历, session包含,宝塔绕过"
prerequisites: "来源所述条件，未列明部分仍待核：仅JDK8/11运行条件，无工具release或支持漏洞版本矩阵"
side_effects: "未执行；本文需注意的操作影响：应归工具而不是漏洞实体；批量检测/命令执行有外部副作用，应分出检测与利用操作说明"
source_status: "unknown"
id: "vw-519aec48d1a6ccdf8278b628"
entity_id: "ve-519aec48d1a6ccdf8278b628"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：仅JDK8/11运行条件，无工具release或支持漏洞版本矩阵

代码与实验材料：工具功能宣称及截图，无源码/包/测试结果；未获取或运行

来源证据范围：署名bewhale，实际下载需公众号回复，无可验证仓库

- **事实待核（1）**：工具来源与能力不可验证；依据：20多个payload、宝塔绕过、一键getshell无版本清单或原始下载地址。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **操作与副作用边界（2）**：应归工具而不是漏洞实体；依据：批量检测/命令执行有外部副作用，应分出检测与利用操作说明。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **事实待核（3）**：JDK8全版本内置JavaFX表述过宽；依据：不同发行版是否带JavaFX不一，需写支持发行版。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  ThinkPHP漏洞综合利用工具, 图形化界面, 命令执行, 一键getshell, 批量检测, 日志遍历, session包含,宝塔绕过  
原创 bewhale
                    bewhale  W小哥   2026-02-06 03:33  
  
**免责声明**  
****  
    
  
    文章内容**仅限授权测试**  
或  
**学习使用**  
请**勿进行非法的测试**  
或攻击，  
利用本账号所发文章进行直接或间接的非法行为，均由**操作者本人负全责**  
，W小哥及文章对应作者将不为此承担任何责任。  
  
    文章来自互联网或原创，  
如有侵权可联系我方进行删除，深感抱歉  
。  
  
  
# thinkphp_gui_tools  
  
   
  
本项目是采用 JDK8 + javafx 开发的 ThinkPHP 图形化综合利用工具， 参考了其他大佬项目的部分代码。 JDK8可以直接运行，JDK11 因为去除了javafx这个依赖，需要自己再加上参数加入模块  
```
java -Dfile.encoding="UTF-8" --module-path "C:\Program Files\Java\javafx-sdk-11.0.2\lib" --add-modules "javafx.controls,javafx.fxml,javafx.web" -jar "xxx.jar"
```  
  
·  
  
支持大部分ThinkPHP漏洞检测,整合20多个payload  
  
·  
  
支持部分漏洞执行命令  
  
·  
  
支持单一漏洞批量检测  
  
·  
  
支持TP3和TP5自定义路径日志遍历  
  
·  
  
支持部分漏洞一键GetShell  
  
·  
  
支持设置代理和UA  
  
![](https://mmbiz.qpic.cn/mmbiz_png/XZByrJJ6uUyicAiabxwFNa6VJyIAEyIeCsibXfeiaUAp6HggqiaqNbcuPQeA9GZKhb0WLa3IIU6JzrTLqWRXkjicjEkA/640?wx_fmt=png "")  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/XZByrJJ6uUyicAiabxwFNa6VJyIAEyIeCsaPbnBMibnSjmSBPficrTyderyibUcgq274QouM7Dm2kpViaC2icvr1jC4vQ/640?wx_fmt=png "")  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/XZByrJJ6uUyicAiabxwFNa6VJyIAEyIeCsAibk8VMN7drRkrR2m06MMuBtjb5GFQPyaHdfEjZ6hBuum56FLOFKEeQ/640?wx_fmt=png "")  
  
  
  
关注公众号回复“  
20260206  
”获取工具地址  
。  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
