---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  用友NC存在反序列漏洞  
安全艺术
                    安全艺术  安全艺术   2026-01-16 04:00  
  
先推荐一波圈友写的工具https://github.com/dev-Nie/BetterBurp  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2Op01tICTfcT2HiaeibSXwtJG07eGVC0vm7l5pH6aSQg8CB5k6Uiba3JeGJ9GRZdVJ8plLRRicPBh8KBkw/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2Op01tICTfcT2HiaeibSXwtJG0d4qvBPfOXN1EIicds9X0eWPvmbZ350pWAY5dYvS2tDbOOJvE5jsrUng/640?wx_fmt=png&from=appmsg "")  
  
漏洞复现  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2Op01tICTfcT2HiaeibSXwtJG0vibWDqiamLQyDVxnvXHMSx5BMtrbIN7libqlKH8YS2Wkbfy6Z2aqUmOWg/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2Op01tICTfcT2HiaeibSXwtJG07eGjpbHfsk77P9kqcvQnUbGJwR9uBkeic4FBPs4v6Bpv0Q5pT4GK71Q/640?wx_fmt=png&from=appmsg "")  
#   
# 20260112-20260116 dddd新增POC  
1. 大华智能物联管理平台evo-apigw/evo-arsm/1.0.0/ars/list接口存在SQL注入漏洞  
  
1. 致远OA sursenServlet rce  
  
1. 蓝凌OA前台SQL注入  
  
1. 致远OA信息泄露  
  
1. 致远OA rest.do获取Cookie  
  
1. 用友NC ConfigResourceServlet接口存在反序列漏洞  
  
1. Apache Struts XML外部实体注入漏洞(CVE-2025-68493)  
  
1. Sangfor 运维管理系统任意文件上传漏洞  
  
1. Letta 代码执行漏洞 (CVE-2025-51482)  
  
1. Langflow 远程命令执行漏洞(CVE-2025-3248)  
  
1. vBulletin远程代码执行漏洞复现（CVE-2025-48827）  
  
新圈子上线  
  
圈主介绍：  
  
多年攻防渗透和SRC挖掘经验，分享各种案例实战思路等，dddd优化来源于实战，多次护网中斩获上万分记录。  
  
知识库所有内容全部由圈主独自维护，严禁用于任何未授权扫描测试哈。  
# 1. dddd维护  
  
**选择这个工具的最重要的原因就是支持先识别指纹，然后根据指纹去扫描对应POC，扫描效率很高。**  
## 1.1. 指纹POC  
  
集成指纹、POC和workflow和POC优化（纯体力活，误报太多，陆陆续续维护2年了），目前指纹数据: 11219 条，漏洞POC: 4710 条，workflow：3504条，目前应该是市面上集成力度最大的了。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2Op01tICTfcT2HiaeibSXwtJG01P9xP8jPKguuZKx5HODnYxojK6yibGd0KVw1fvNDvuW8YHoLyQnk6DQ/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2Op01tICTfcT2HiaeibSXwtJG0yeoF92vE20qiauZiahBuKygJV3xOqVkdTjhTZ6lsEf2s2l8F5nCSLibbA/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2Op01tICTfcT2HiaeibSXwtJG0OcgiahZYu3C2Y2NqFKeicPbTy6pLCGnCqzawgInw6NfIRYjaASy14wMw/640?wx_fmt=png&from=appmsg "")  
## 1.2. 目录扫描  
  
这块主要是针对SRC挖掘和HVV项目中碰到的比较多的需要路径信息的指纹进行补充的，新增了很多发现频率非常高的springboot相关的接口信息，并通过指纹信息精准匹配，基本扫到就可以进一步利用。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/X5epWh2K2Op01tICTfcT2HiaeibSXwtJG0AOAd2cWIgJE3J9NHZ3yA41phO3m1FhXcXvL7Jaic1JbXUfc1CoClN3A/640?wx_fmt=other&from=appmsg "")  
## 1.3. 指纹高亮  
  
这是来自师傅们提的需求，网站指纹识别输出，原版是统一输出的，没有任何区别，改版后新增了重点指纹（SRC和HVV漏洞高爆发点）高亮显示。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/X5epWh2K2Op01tICTfcT2HiaeibSXwtJG0AOAd2cWIgJE3J9NHZ3yA41phO3m1FhXcXvL7Jaic1JbXUfc1CoClN3A/640?wx_fmt=other&from=appmsg "")  
## 1.4. 蜜罐排除  
  
思路很简单，指纹识别超过10个默认是蜜罐，不进行任何扫描。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/X5epWh2K2Op01tICTfcT2HiaeibSXwtJG0kASq5HwQ4aqrGLTpZ8vibfpQxAAxqaFQGXFFbJyY0WvP9T4hoVaZfUA/640?wx_fmt=other&from=appmsg "")  
  
其它死锁等bug修复。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/X5epWh2K2Op01tICTfcT2HiaeibSXwtJG0a4X4ozOiaQvfDdxBAWysZJGWODib0zZtVzEQKPKG47hzCE1xek3HrbIQ/640?wx_fmt=other&from=appmsg "")  
# 2. 知识库维护  
## 2.1. JAVA代码审计  
  
自费999元跟班上课学习记录从0到1完整版。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2Op01tICTfcT2HiaeibSXwtJG0NZaXdCUHibVibfLSAE2KLaElR3K8FSukUrkfmttnOxjNPiancOz1FTWtw/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2Op01tICTfcT2HiaeibSXwtJG0YvMwTvzBqcldKTKtr2y4H8lksIswHzNOkKSoYGOBz9SCgoaMof1zMQ/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2Op01tICTfcT2HiaeibSXwtJG0oRaSpjhvCRxaVz5A9y1s5PshEhu0G82vw224ick6WXZD2iaAicibRib90hQ/640?wx_fmt=png&from=appmsg "")  
## 2.2. Nday漏洞POC  
  
各种渠道收集整理的POC，公开的和非公开的等等。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2Op01tICTfcT2HiaeibSXwtJG0fpnYXPPs0SYdKM4nicE3GuYEUq7TPHZmkNXjCKib2ibUXzTnhCBQphdpg/640?wx_fmt=png&from=appmsg "")  
## 2.3. dddd更新记录  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2Op01tICTfcT2HiaeibSXwtJG0aQXQvFBP5L1B5qGj87icfod0Rgp71mKbqB1SRohtiaCCOoc2ibuesqCNg/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2Op01tICTfcT2HiaeibSXwtJG01tMRS59ab8icricibicuxCJ78NRquejyNdrnQA1fz45VXkHnKFM4TjFTrQ/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2Op01tICTfcT2HiaeibSXwtJG04NKLDmeub3L1ViaajTDtRe2ZtTheJjcrIdN909Nbc4kQGibO2AHALFyw/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2Op01tICTfcT2HiaeibSXwtJG0V3OKeXxq2r6tTVy360ug3LIhb6IaOWiaSG48ib25J0eCenAf7tfK49wQ/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2Op01tICTfcT2HiaeibSXwtJG04EstpGu9yZvT3rNN9xz5E7MeNOb6Wx4sOObtbibicWFD4VnUPsAk7jpA/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2Op01tICTfcT2HiaeibSXwtJG0jYYjC5mGicToP2PQxkHUibOoSAqrB3b3JVNEFLu7yKRJt05YCtlJZG5g/640?wx_fmt=png&from=appmsg "")  
## 2.4. SRC实战记录  
  
个人SRC实战案例，案例来源猎聘、蔚来汽车、WPS、自如、龙湖、货拉拉、讯飞等SRC。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2Op01tICTfcT2HiaeibSXwtJG0XhlyDS4BllKvUVNicV10ZT25ORoBlgfNSmYVnuoPsPGv80wGrqHibSxg/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2Op01tICTfcT2HiaeibSXwtJG02aoYEewqjpF3vxBF5gvOx6Z4xLicoGpIiao2wlHdGD1Lg2dqvbqu11Sg/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2Op01tICTfcT2HiaeibSXwtJG00TjYyaH2Mg5mkXTsuP7tCsafQyibQhZQ3LtRnicpp4ibuzSZNKuErB8rA/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2Op01tICTfcT2HiaeibSXwtJG0tIuqrQk3YFaOlJuVom6Iicc3aKo8VX6oxjqCHTduqiaaicKD8h1jL6reg/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2Op01tICTfcT2HiaeibSXwtJG0quicNfB4nnvxCY4hicJ23YI8aVESN0S03oqPqXribO7RRybrc2mTGKnqA/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2Op01tICTfcT2HiaeibSXwtJG0IPsOnIoq81IuMpq4wzuD0hqKPdxgaGLq8DQyhqwKGeoqtuUwTWh0qA/640?wx_fmt=png&from=appmsg "")  
## 2.5. 漏洞利用手册  
  
高频漏洞深入利用方式整理总结，附带工具和案例。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2Op01tICTfcT2HiaeibSXwtJG073M9I9UCZJiaFfDVjbDicIHdYW3icew5tehnpDm0bCdY2EFKLNibetc6Lg/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2Op01tICTfcT2HiaeibSXwtJG0ibmBKXHLxtibe01SnxAKqv3Sc6HGRFlQvLvEOMYKStaia3ywcficSWdIMA/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2Op01tICTfcT2HiaeibSXwtJG0WU9ylXLSLKqaqiae6N20fzWPPKqwu3AwoufgqVukfNxtlvW2MyTZGqA/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2Op01tICTfcT2HiaeibSXwtJG0SbuMEnwz4JtXRjicQ3ZU9SDNz5pjgKT7aZj6ia4ia6XnOa3Tic55cx8vZQ/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2Op01tICTfcT2HiaeibSXwtJG0yoLQ7ic7oDofby8cn3uNgpFlnEAfkYZtvUcga8pKdSq93ibxNkJUg8Mg/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2Op01tICTfcT2HiaeibSXwtJG0HhqCRulkEhQl2icWO5BHylpI66CKHjUAE1GibickbWicvD40IHT1yZic9cQ/640?wx_fmt=png&from=appmsg "")  
## 2.6. 实战技巧总结  
  
SRC、CNVD和HVV快速挖洞思路整理，附带实战案例。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2Op01tICTfcT2HiaeibSXwtJG0U8V9e1hQwlrD1L3jlqeLv80UQrAQjgiafqEicqqibnosdjMNvR7oWDrkw/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2Op01tICTfcT2HiaeibSXwtJG0lMFZzuPzWVt7nbE4Fj6yUaUgDVIk72vNqicicj0ccoAgmz9giaicOib1wibA/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2Op01tICTfcT2HiaeibSXwtJG0yYbfB1tgPP6HAITTQvXpOoY6ldzfmMd4iadVR8A8rctb5Jdgb1jUWPA/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2Op01tICTfcT2HiaeibSXwtJG0bibD53wYts0V1fia2Fe19ia1jPNCyvmg5QVoaHfZqfk4MOJwF7QvicJY1g/640?wx_fmt=png&from=appmsg "")  
## 2.7. 工具插件字典  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2Op01tICTfcT2HiaeibSXwtJG0ZNgv6PwkAVLFzR4wPP7to2T1VJxnzYfvFdziabuCyLCjVSWaoxZ93Bg/640?wx_fmt=png&from=appmsg "")  
# 3. 加入安艺圈  
## 3.1. 微信用户  
  
安艺圈目前提供如下服务：  
  
•套餐一：dddd激活码：一年200；  
  
•套餐二：安艺圈知识库：一年318；  
  
•套餐三：dddd激活码+安艺圈知识库：一年500。  
  
有意向的师傅可以加微信好友购买哈，**加好友需要****备注dddd或者进圈****，否则不允通过哈。**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/X5epWh2K2Op01tICTfcT2HiaeibSXwtJG0tEe35OKklic3ial9TXN5DMsTrn0HSA3XwQ2wJG3bZmlD4cGJic5iaRVfEg/640?wx_fmt=jpeg&from=appmsg "")  
## 3.2. 纷传老用户  
  
登录纷传小程序或者APP中，点击"设置"进入设置界面进行截图，将设置截图和dddd运行截图通过微信发给我获取激活码。（dddd**每人限1个激活码，激活前请选好常用电脑**  
）  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2Op01tICTfcT2HiaeibSXwtJG0CUiaLMN6ea5LdVUuM6xGB9q3AvS3cW6ngfDVuUHrp1fB4uuxamEvbKg/640?wx_fmt=png&from=appmsg "")  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2Op01tICTfcT2HiaeibSXwtJG0uPOmHyvWXb4Kb2HpqBviciaaZibXbbZCn7t2Pn86ibKDBjMMCsNib2TTREA/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2Op01tICTfcT2HiaeibSXwtJG0BgYGicYqnOdkXVcAGMLUIRYickJQfypkJf0icBkP1FY3hGl50Mga3RFMQ/640?wx_fmt=png&from=appmsg "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
