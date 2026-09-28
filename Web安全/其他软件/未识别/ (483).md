---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【原创漏洞】AOSP跨用户资源访问漏洞   
启明星辰  ADLab   2025-05-09 09:29  
  
更多安全资讯和分析文章请关注启明星辰ADLab微信公众号及官方网站（adlab.venustech.com.cn）  
  
  
**一、研究背景**  
  
  
  
Android的多用户机制是指系统支持在同一台设备上创建多个用户账户，每个账户拥有独立的应用环境、数据和设置，主要用于平板设备、共享设备、企业管理设备等场景。启明星辰ADLab通过对多用户模式下隔离机制开展安全研究，聚焦系统跨用户资源访问的输入路径污染问题，挖掘了多个AOSP高危漏洞。此外，还发现国内外主流厂商中也存在同类型高危漏洞CVE-2024-34674、CVE-2024-34672、CVE-2025-20883、CVE-2024-49402等。  
  
  
**二、AOSP多用户系统机制**  
  
  
  
2.1   
基本类型  
  
Android系统定义了多种用户类型：  
- Primary User（主用户）：设备初始化时创建的第一个用户，拥有所有系统权限，唯一可以接收OTA。  
  
- Secondary User（次用户）：类似独立账号，无法接收OTA，不具备设备管理权限。  
  
- Guest User（访客用户）：临时用户，退出后会删除所有数据。  
  
- Profile（配置文件）：Work Profile工作配置文件用于BYOD企业场景，与主用户隔离但共享部分资源；Restricted Profile限制配置文件用于平板多用户模式，限制权限和访问内容。  
  
对应权限隔离安全机制：  
- 各用户权限独立授予。  
  
- 一个用户授予权限不会影响其他用户。  
  
- 跨用户通信需要系统权限，如：INTERACT_ACROSS_USERS或INTERACT_ACROSS_USERS_FULL。  
  
- 普通三方应用无法通过Intent、ContentProvider 等越权访问其他用户的数据或服务。  
  
## 2.2 保护机制  
  
Android系统实施了多种保护机制以防止跨用户的非法资源访问。在Android中，URI的访问权限是由ContentProvider统一管理和控制的。当用户A的应用携带特定URI发起某个动作请求时，系统组件会通过调用链进入queryContentProviders方法来验证该URI的访问权限。  
  
具体代码实现如下：  
  
![](https://mmbiz.qpic.cn/mmbiz_png/VuRGkncX57OVOf3dCbicru9OR8U9z05AeSzIh6QEsSXUvPGrnwetiaFzebOFy2gwsSOvycDEiacwWPzjr6Dw4SYoQ/640?wx_fmt=png&from=appmsg "")  
  
这个函数首先检查应用是否携带了"@userid!=currentuserid"的标记，以此判断是否存在跨用户URI访问的情况。如果确实涉及跨用户访问，则调用checkCrossUserPermission来检验是否有跨用户访问的权限，并同时确认访问是否来源于system/root用户ID。如果不是system/root用户，函数将继续检查该应用是否拥有INTERACT_ACROSS_USERS_FULL或INTERACT_ACROSS_USERS系统权限。若上述条件均未满足，则不允许进行跨用户URI资源的访问。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/VuRGkncX57OVOf3dCbicru9OR8U9z05Ae5yasFclUAR2ykW0l3HhBLNJv88ey4IicbHHiar4rCvwiaKd4JngpdJUWQ/640?wx_fmt=png&from=appmsg "")  
  
如果同时满足以下三个条件，系统可能存在跨用户的资源访问漏洞：  
- 系统应用中存在设置为  
exported=true  
的组件；  
  
- 该组件可以接收三方应用传入的  
URI  
参数，并且未对  
userid  
与当前  
currentUserId  
进行安全校验；  
  
- 系统应用的  
AndroidManifest.xml  
中声明了  
INTERACT_ACROSS_USERS  
或  
INTERACT_ACROSS_USERS_FULL  
权限。  
  
#   
  
**三、漏洞原理分析（Android-337184703）**  
#   
  
漏洞存在于  
deskclock apk  
模块中，此模块为  
AOSP  
通用铃声系统应用，供应用进行拓展铃声自定义设置。  
```
<activity-alias android:name="com.android.deskclock.HandleSetAlarmApiCalls" android:permission="com.android.alarm.permission.SET_ALARM" android:exported="true" android:targetActivity="com.android.deskclock.HandleApiCalls">
<intent-filter>
<action android:name="android.intent.action.SET_ALARM" />
<action android:name="android.intent.action.SET_TIMER" />
```  
  
  
deskclock模块具备INTERACT_ACROSS_USERS*权限。在HandleSetAlarmApiCalls的调用链中，系统将导出组件开放给三方应用，存在安全隐患。具体调用流程如下：  
  
HandleSetAlarmApiCalls/HandleSetAlarm.onCreate  
  
└──> handleSetAlarm(intent)  
  
 └──> updateAlarmFromIntent(intent, alarm)  
  
  └──>alarm.alert=getAlertFromIntent(intent, alarm.alert)  
  
由于  
getAlertFromIntent  
未对传入的  
URI  
参数进行任何校验，便直接设置  
alarm.alert  
，可能导致三方应用传入恶意  
URI  
，从而引发权限绕过或信息泄露等风险。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/VuRGkncX57OVOf3dCbicru9OR8U9z05Ae3S9UOExD5LNm4rN16TLQnNeAibXSydfM51BnE83nR8sZHPdHgjwjHQg/640?wx_fmt=png&from=appmsg "")  
  
攻击者可以构造恶意调用链，通过传入特定的  
URI  
参数并指定目标用户的  
userId  
，进而触发系统组件的处理逻辑。在未进行用户身份校验的情况下，系统会直接使用该  
URI  
设置  
alarm.alert  
字段。由于该  
URI  
可指向其他用户空间下的资源，攻击者可进一步通过遍历  
_id  
字段，达到任意读取并窃取其他用户音频文件的目的。  
  
  
**四、漏洞处置**  
  
  
  
Google Android  
安全团队对启明星辰ADLab提交的漏洞报告进行了评估，确定该漏洞为高危级别。鉴于修复存在的困难，在最新发布的版本中，已弃用了存在漏洞的组件，并在新版本中采用其他组件进行替代。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/VuRGkncX57OVOf3dCbicru9OR8U9z05AeHZjbTq2pEnFbqe9jtWzEIxazoQTUwXGM1WYFGg33DWUSNJD3ttzthg/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/VuRGkncX57OVOf3dCbicru9OR8U9z05AeYZ6C0eKCVfdTQub7YD1m2aYtByRRJL1t82qNbwMW6O51lRBhOBBJlw/640?wx_fmt=png&from=appmsg "")  
  
  
**五、小 结**  
  
  
  
  
为了避免此类问题，建议设置权限最小化，谨慎使用  
INTERACT_ACROSS_USERS*  
这类权限，此外，对开放组件进行  
userid  
是否为  
currentuserid  
的安全校验。  
  
  
**六、漏洞披露时间线**  
  
- 2024  
年  
4  
月  
26  
日 ADLab向  
Goolge  
提交Android  
系统安全报告。  
  
- 2024  
年  
4  
月  
30  
日 ADLab补充细节。  
  
- 2024  
年  
5  
月  
8  
日  
    
Goolge  
确认漏洞评级以及高危奖励。  
  
- 2024  
年  
12  
月  
11  
日 双方沟通修复方案。  
  
- 2024  
年  
12  
月  
24  
日 Google最终停止该功能开发，使用其他组件替代该功能。  
  
启明星辰积极防御实验室（ADLab）  
  
  
  
  
  
ADLab成立于1999年，是中国安全行业最早成立的攻防技术研究实验室之一，微软MAPP计划核心成员，  
“黑雀攻击”概  
念首推者。截至目前，ADLab已通过 CNVD/CNNVD/NVDB/CVE累计发布安全漏洞6500余个，持续保持国际网络安全领域一流水准。实验室研究方向涵盖基础安全研究、数据安全研究、5G安全研究、AI+安全研究、卫星安全研究、运营商基础设施安全研究、移动安全研究、物联网安全研究、车联网安全研究、工控安全研究、信创安全研究、云安全研究、无线安全研究、高级威胁研究、攻防对抗技术研究。研究成果应用于产品核心技术研究、国家重点科技项目攻关、专业安全服务等  
。  
  
  
  
  
![图片](https://mmbiz.qpic.cn/mmbiz_png/VuRGkncX57ONOtW3DSPMEXiaLPqrs8a20KxsFg78IaJzyEf51AIjLGNkDG5tsCH76Qo7PoVz74JGQqKJbCh5PdQ/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
