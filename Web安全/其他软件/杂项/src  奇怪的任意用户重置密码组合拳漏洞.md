---
source: "gelusus/wxvl 公众号漏洞文库"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "src  奇怪的任意用户重置密码组合拳漏洞"
product: "两校共享教育业务系统（厂商未明）"
record_type: "vulnerability"
document_type: "匿名跨站权限案例"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "攻击者需B校合法账户、目标学号姓名、可收验证码手机号；A站先验信息泄露+B站绑定越权+正常重置"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/src%20%20%E5%A5%87%E6%80%AA%E7%9A%84%E4%BB%BB%E6%84%8F%E7%94%A8%E6%88%B7%E9%87%8D%E7%BD%AE%E5%AF%86%E7%A0%81%E7%BB%84%E5%90%88%E6%8B%B3%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-e4d3ee196ce56dfa0f5d1707"
entity_id: "ve-e4d3ee196ce56dfa0f5d1707"
schema_version: "1"
---

# src  奇怪的任意用户重置密码组合拳漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：两校共享教育业务系统（厂商未明）
- 文献类型：匿名跨站权限案例
- 版本、权限及部署边界：攻击者需B校合法账户、目标学号姓名、可收验证码手机号；A站先验信息泄露+B站绑定越权+正常重置
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 两个学校同数据库只是推测，应标未证实，userid可跨站识别不必同物理DB；A返回B身份提示租户隔离缺陷
2. 第一步学号姓名却写学号密码正确，明确文字错误；绑定缺对象授权是核心，重置可能按被篡改手机号正常执行
3. 标题任意用户范围需可获userid和B租户权限，不能理解匿名重置任何账户
4. 所有HTTP关键数据仅图未视检，无具名系统版本/修复，匿名适合案例而不是新CVE条目
5. 学生信息/新密码示例和截图应隐私审查脱敏；手机号绑定和密码重置为实质账户变更，不能当只读验证；大量营销图删减

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文参考链接（未重新核验）：<https://aaaaaaaa.cn/user>
- 原文参考链接（未重新核验）：<https://bbbbbbb.cn/user>
- 原文参考链接（未重新核验）：<https://bbbbbbb.cn/user，系统与a学校网站相同。不同的是，b学校的登录步骤只有一步，即输入学生的学号，姓名与密码>
- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

 Z2O安全攻防   2026-01-15 13:55  
  
分享一下之前挖src遇到比较奇怪的任意用户重置密码。该漏洞在是两个不同学校的网站相互配合导致的组合拳漏洞。  
  
  
**一、收集到的信息**  
：  
  
1、学校a:https://aaaaaaaa.cn/user  
  
2、学校b:https://bbbbbbb.cn/user  
  
3、a学校与b学校是同一个系统。  
  
4、b学校的学生：杨**，学号与姓名，但不知道密码  
  
5、b学校的学生：于*，学号，姓名与密码。  
  
  
**二、漏洞复现**  
  
1、打开a学校网站，a学校的登录分为两步。第一步输入学号与姓名。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/fp1zrrz1Uibic25n4Wib6WWHARsYuvXxyNqStpmJB6Cf3GkRAURfBBdFOZSsKU8YgamueAuvYoOXuA8EiaokiapsUnQ/640?wx_fmt=png&from=appmsg "")  
  
当学号与密码正确后再进入第二步输入密码。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/fp1zrrz1Uibic25n4Wib6WWHARsYuvXxyNq94664HkFzrpbNCOY49WPQ9Q9q8NlMgryznPdYb2eZLPkibkODx5yXwQ/640?wx_fmt=png&from=appmsg "")  
  
  
2、在a学校输入信息收集到的b学校的杨**学生学号与姓名。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/fp1zrrz1Uibic25n4Wib6WWHARsYuvXxyNqhmZKcADuknicgUMuKFjVlyIu5kWJAibsWyy6BkUFB2DUYribicpcOhY6qQ/640?wx_fmt=png&from=appmsg "")  
  
下一步显示需要杨**的密码，密码未收集到，但问题不大，从响应包中成功获取到了杨**的userid。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/fp1zrrz1Uibic25n4Wib6WWHARsYuvXxyNqia4UYnz26TZ52BngnRVMNazBPLkzsWT1LA5sNcl2ZzGIbdJsvYoBu5A/640?wx_fmt=png&from=appmsg "")  
  
3、打开b学校网站https://bbbbbbb.cn/user，系统与a学校网站相同。不同的是，b学校的登录步骤只有一步，即输入学生的学号，姓名与密码。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/fp1zrrz1Uibic25n4Wib6WWHARsYuvXxyNq4k7wibOzfuslgibbB9OVGT7JNMqlKPThZdGicjkIozG2GjF9WBhlTMFgA/640?wx_fmt=png&from=appmsg "")  
  
  
输入信息收集到的b学校学生，于**的学号姓名与密码进行登录。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/fp1zrrz1Uibic25n4Wib6WWHARsYuvXxyNqxyU45NuFP38NozHSA75XjfomMxLqL37aXficlH7gP7stLNyq7Bw8ZFQ/640?wx_fmt=png&from=appmsg "")  
  
  
4、在登录后的个人信息设置里，填写好要绑定的手机号验证码信息，抓包。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/fp1zrrz1Uibic25n4Wib6WWHARsYuvXxyNqCqOulZo6iaibvZATOPjmYafJGaTHibMcGuzZM3vSgGVZTkcOuTx0xEjfg/640?wx_fmt=png&from=appmsg "")  
  
修改userid为从a学校中获取到的杨**userid  
  
![](https://mmbiz.qpic.cn/mmbiz_png/fp1zrrz1Uibic25n4Wib6WWHARsYuvXxyNq0tibeMyOaVWC0gD48DuXn12DIQXKSfXVRkxIrcQLoIM9SRw64icAvc4A/640?wx_fmt=png&from=appmsg "")  
  
响应包显示修改成功  
  
![](https://mmbiz.qpic.cn/mmbiz_png/fp1zrrz1Uibic25n4Wib6WWHARsYuvXxyNqhibW5BMfQT9SE4cPhUArC4Fl2gJ2A4OVPdTqIia4VLQgxdjibusp0gxSg/640?wx_fmt=png&from=appmsg "")  
  
5、打开b学校的找回密码功能，输入杨**学生的学号与刚才越权绑定的手机号，获取验证码信息,新密码为Aa123456@  
  
![](https://mmbiz.qpic.cn/mmbiz_png/fp1zrrz1Uibic25n4Wib6WWHARsYuvXxyNqk3XmqFcSibsSCUD7icvicwgAQ63mb50dtvZLh6Dr4zCKgFvNFKwNDiaInQ/640?wx_fmt=png&from=appmsg "")  
  
修改成功  
  
![](https://mmbiz.qpic.cn/mmbiz_png/fp1zrrz1Uibic25n4Wib6WWHARsYuvXxyNqH0hAWQeDtgIpMKiaUpMwmmOSiaoXFl4ziaQ66mdmPLoPz1ZYFesxZaFKA/640?wx_fmt=png&from=appmsg "")  
  
  
6、重新登录b学校，输入杨**的学号与刚才成功修改的新密码Aa123456@。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/fp1zrrz1Uibic25n4Wib6WWHARsYuvXxyNqb7benDYo841EN1zxe2Hm6Xh9mdUg8icBlwLcKY18J6AEs0qibDFSgTtw/640?wx_fmt=png&from=appmsg "")  
  
成功登录杨**账号  
  
![](https://mmbiz.qpic.cn/mmbiz_png/fp1zrrz1Uibic25n4Wib6WWHARsYuvXxyNqXS2meI6JcmGJHUFfmicOKn5T3TqsPAkhOibtcLvSyU6HXZjPqDwmIsgg/640?wx_fmt=png&from=appmsg "")  
  
  
**三、漏洞总结：**  
  
1、a学校登录分为两步，b学校登录只需要一步。且该两个网站疑似共同同一个数据库。  
  
  
2、b学校登录只有一步，无法直接获取到userid，所以可以在a学校中的第一步登录b学校学生，获取到b学校学生的userid。  
  
  
3、通过userid越权绑定手机号，最终实现任意用户修改密码的组合拳漏洞。  
  
建了个  
src专项圈子  
，内容包含**src漏洞知识库**  
、**src挖掘技巧**  
、**src视频教程**  
等，一起学习赚赏金技巧，以及专属微信群一起挖洞  
  
圈子专注于更新src相关：  
  
```
1、维护更新src专项漏洞知识库，包含原理、挖掘技巧、实战案例
2、分享src优质视频课程
3、分享src挖掘技巧tips
4、小群一起挖洞
```  
  
  
![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/h8P1KUHOKuaRqDOYRFjU73rIsVy2ISg41LkR0ezBlmjJY4Lwgg8mr1A5efwqe0yGE9KTQwLPJTe9zyv3wgYnhA/640?wx_fmt=other&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=23 "")  
  
![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/h8P1KUHOKuY813zmiaXibeTuHFXd8WtJAOXg868PqXyjsACp9LhuEeyfB2kTZVOt5Pz48txg7ueRUvDdeefTNKdg/640?wx_fmt=other&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=24 "")  
  
![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/h8P1KUHOKuZDDDv3NsbJDuSicLzBbwVDCPFgbmiaJ4ibf4LRgafQDdYodOgakdpbU1H6XfFQCL81VTudGBv2WniaDA/640?wx_fmt=other&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=25 "null")  
  
  
![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/h8P1KUHOKuY813zmiaXibeTuHFXd8WtJAOApVm8H605qOibxia5DqPHfbWD6lmcweDjGv4DLl45waD068ugw2Iv2vg/640?wx_fmt=other&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=26 "")  
  
  
![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/h8P1KUHOKuadANlnTubvh6Abe7UZLdQWr5g7s0TNF4tBZqNbdewPNswTDOfvN6PkggCqz8j3mib6Vf3z4ia83asg/640?wx_fmt=other&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=27 "")  
  
图片  
  
![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/h8P1KUHOKuaRqDOYRFjU73rIsVy2ISg4Bd1oBmTkA5xlNwZM5fLghYeibMBttWrf57h8sU7xDyTe5udCNicuHo8w/640?wx_fmt=other&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=28 "")  
  
  
![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/h8P1KUHOKuYrUoo5XZpxN9Inq87ic71D6aUeMdaWrKXgYYia2On8nMA7bqWDySa8odAq1a0kkp3WFgf0Zp0Eut0A/640?wx_fmt=other&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=29 "")  
  
图片  
![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/h8P1KUHOKuaRqDOYRFjU73rIsVy2ISg4KKlic4yiafWTpLdejicQe3MllEQc24ypeI3anaK7IjJDVyq1WVQN2yKBA/640?wx_fmt=other&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=30 "")  
  
  
图片  
  
![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/h8P1KUHOKuadANlnTubvh6Abe7UZLdQWHjP3FUnZpXdrOicRWrCf9MibaglQia7WesCVs0ibtBhC4c2XiaT9HibE1Drg/640?wx_fmt=other&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=32 "")  
  
![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/h8P1KUHOKuadANlnTubvh6Abe7UZLdQWXytl9Ioah3X7tw7EMlWV96wWXEHFEM4m6NwlvvkcmEcPqcxcE9MQDg/640?wx_fmt=other&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=33 "")  
  
![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/h8P1KUHOKuaDpuFU7U9TMK5eIpY8iaJcXCicmTB6fsRd8icmH7K1X99YbC07GaJbCRReocORsnDGNU7H7PeqcysIA/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=20 "")  
  
  
  
![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/h8P1KUHOKuaDpuFU7U9TMK5eIpY8iaJcXzeTsials9fwTK9lb0iavN5ya2KJAT9sXIBShtRdfRWHNUpgPKjmEnpsA/640?wx_fmt=other&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=21 "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
