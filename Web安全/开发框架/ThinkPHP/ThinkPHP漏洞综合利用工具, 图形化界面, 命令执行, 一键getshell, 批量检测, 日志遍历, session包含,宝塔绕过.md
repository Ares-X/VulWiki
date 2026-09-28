---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  ThinkPHP漏洞综合利用工具, 图形化界面, 命令执行, 一键getshell, 批量检测, 日志遍历, session包含,宝塔绕过  
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
