---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  用友NC pkevalset接口存在SQL注入漏洞  
安全艺术
                    安全艺术  安全艺术   2026-01-19 04:01  
  
```
GET /ebvp/expeval/expertschedule;1.jpg?pkevalset=1
```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OoFGicBSlsZpkqZibXHCYEdA5GbtfAQLd3ziblCzAElRo5ajWiayGLYp4CgDu6BebW3Qp8AT4zZcvh8cg/640?wx_fmt=png&from=appmsg "")  
  
然后直接sqlmap一把梭就行  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OoFGicBSlsZpkqZibXHCYEdA5MtfeTIZR0UPTuSDqmX5yCzmUl9R6BgMlVkiafax9J0GpY1qSYNnnozg/640?wx_fmt=png&from=appmsg "")  
  
安艺圈上线，感兴趣的师傅可以了解下哈  
  
圈主介绍：  
  
十年安全行业工作经验，多年攻防渗透和SRC挖掘经验，分享漏洞利用思路、工具和案例等，dddd实战版优化来源于近两年攻防实战，多次护网中斩获上万分记录。  
  
知识库所有内容全部由圈主独自维护，严禁用于任何未授权扫描测试哈。  
# 1. dddd维护  
  
**选择这个工具的最重要的原因就是支持先识别指纹，然后根据指纹去扫描对应POC，扫描效率很高。**  
## 1.1. 指纹POC  
  
集成指纹、POC和workflow和POC优化（纯体力活，误报太多，陆陆续续维护2年了），目前指纹数据: 11219 条，漏洞POC: 4710 条，workflow：3504条，目前应该是市面上集成力度最大的了。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OoFGicBSlsZpkqZibXHCYEdA5jgBNdytrHf7Y6ficQ1lHFb4rRd0j6C1aeNeicRriaePsOXok2z0rkQ8LA/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OoFGicBSlsZpkqZibXHCYEdA5xqLje3BWcHgqKglzE3ic2CIomhBNsQmibibLd4icrdX9svYOMK9yseOeFw/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OoFGicBSlsZpkqZibXHCYEdA58UiaA3lGjlv8VBQBEMApNlwSGvfurbzwSKZtMstVvtMJejRgnJN39KA/640?wx_fmt=png&from=appmsg "")  
## 1.2. 目录扫描  
  
这块主要是针对SRC挖掘和HVV项目中碰到的比较多的需要路径信息的指纹进行补充的，新增了很多发现频率非常高的springboot相关的接口信息，并通过指纹信息精准匹配，基本扫到就可以进一步利用。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/X5epWh2K2OoFGicBSlsZpkqZibXHCYEdA5p0IIUaIOZ41H2X8fOp98CicP7qmKNfPDVPtEPfHYCeBVrbMcnXWuuvw/640?wx_fmt=other&from=appmsg "")  
## 1.3. 指纹高亮  
  
这是来自师傅们提的需求，网站指纹识别输出，原版是统一输出的，没有任何区别，改版后新增了重点指纹（SRC和HVV漏洞高爆发点）高亮显示。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/X5epWh2K2OoFGicBSlsZpkqZibXHCYEdA5p0IIUaIOZ41H2X8fOp98CicP7qmKNfPDVPtEPfHYCeBVrbMcnXWuuvw/640?wx_fmt=other&from=appmsg "")  
## 1.4. 蜜罐排除  
  
思路很简单，指纹识别超过10个默认是蜜罐，不进行任何扫描。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/X5epWh2K2OoFGicBSlsZpkqZibXHCYEdA5A5BibbOYcq91yGibBVCRK547y1xVdjrEbpHgozA5EK1ljlTywKGicMlVQ/640?wx_fmt=other&from=appmsg "")  
  
其它死锁等bug修复。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/X5epWh2K2OoFGicBSlsZpkqZibXHCYEdA5M2KzT30HBGNGE25ibRReRwWYTXKBvvBFnJVmOmwFYg7wibcNwHibiaXZng/640?wx_fmt=other&from=appmsg "")  
# 2. 知识库维护  
## 2.1. JAVA代码审计  
  
自费999元跟班上课学习记录从0到1完整版。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OoFGicBSlsZpkqZibXHCYEdA5YxBfQibNjGXBpugmQxh7WiaSiboKJxfOr8biaia6iaXpyFof5M6FxtBibdBiaw/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OoFGicBSlsZpkqZibXHCYEdA5neLFlNNZUGVDricODFqFCdLUsuD7xVfbdpHsKJplXJMhNniaHZJuovWg/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OoFGicBSlsZpkqZibXHCYEdA5LS0TxTF0ZyUx1iavzpgJJYyfbnfoRjYjM1j6G1R4pmb1Rusf7YUclEg/640?wx_fmt=png&from=appmsg "")  
## 2.2. Nday漏洞POC  
  
各种渠道收集整理的POC，公开的和非公开的等等。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OoFGicBSlsZpkqZibXHCYEdA5Boceq1xiaOiatqqdLj6RuzN5RibuU2lgbF0zlhNb3WLh7XNQ7ysdk3gNg/640?wx_fmt=png&from=appmsg "")  
## 2.3. dddd更新记录  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OoFGicBSlsZpkqZibXHCYEdA5BMv7tOzAB9qMU5S2UHwOGckf4N3vS8CXThkT5d6gBGkQiamxfGJgRew/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OoFGicBSlsZpkqZibXHCYEdA5R2P7xnKeO5qAXk77Ld4hln29g4Gr2xmySYkfD1dggcggWNouhibUBew/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OoFGicBSlsZpkqZibXHCYEdA50Rn9yfXQUpbv70gxWWVia6zLOxmyWnNBtP2q0CEkQB7hJZm5QogrqxQ/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OoFGicBSlsZpkqZibXHCYEdA5LVaZicT2nx6JqGBlI5kyq6zh3vcJaKicRLasnlSMEqeWicsK7z40n00icg/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OoFGicBSlsZpkqZibXHCYEdA5syXgZBo7QkuVSdJicIibzYJdRxiaVcnYxAw4h9CPBqmPRoPvBTPN8gd3g/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OoFGicBSlsZpkqZibXHCYEdA5B9RP9yTDOcDzNVxbG0Wkp6iaC7jo4JU9VZQDfODibSoWnNB26M90V3TQ/640?wx_fmt=png&from=appmsg "")  
## 2.4. SRC实战记录  
  
个人SRC实战案例，案例来源猎聘、蔚来汽车、WPS、自如、龙湖、货拉拉、讯飞等SRC。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OoFGicBSlsZpkqZibXHCYEdA53ZODh8hoic2kxd53Wek1tbZMhFJxictEvb1OOPAiciaaFsdEUN6FG1ANmw/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OoFGicBSlsZpkqZibXHCYEdA59ibsibat5rHFLoPOC7BfnHjtfg4gsiaeseauD5UcVib6JjX1uNlbfQhAAA/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OoFGicBSlsZpkqZibXHCYEdA55POqcbSOOsHPHicbuB9rS8FxMkTVKdJWAViaRVlqhGaOGKGvWaE7d9hg/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OoFGicBSlsZpkqZibXHCYEdA5nib5nVcEibL7ylecEYs5eamAm6s4hfY7rPkZzWibxFjgUDoDODmvQpicUQ/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OoFGicBSlsZpkqZibXHCYEdA5Q5iarxy8hBMnJJ6jW9pLsSknLj4dmo3uv2nic75Trj5GYeFh6aiacnSyQ/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OoFGicBSlsZpkqZibXHCYEdA57ZKMUdPA3MA32r0KspfhL1rQNmDjDgyibZwtltX2wh5fcaGJtJy121Q/640?wx_fmt=png&from=appmsg "")  
## 2.5. 漏洞利用手册  
  
高频漏洞深入利用方式整理总结，附带工具和案例。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OoFGicBSlsZpkqZibXHCYEdA58DOU4QXoKgAB7umFIv7Du2j5yo2kMpKeBmwXm42NQsE6cqMHA527AA/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OoFGicBSlsZpkqZibXHCYEdA5wTqkatAgUdAJUlWlVASfXwwO5uKWRS0AibUxPRN0iaBsQMVgTDcDraKw/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OoFGicBSlsZpkqZibXHCYEdA5bWc4Z9VmygrdCpG1gFeEfyq3XiasSoxia0p8OgeN6gMqKgjOeDGnmrbw/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OoFGicBSlsZpkqZibXHCYEdA5A3vUE9RxzRpe4Qqla6ghR2bmXzoloTUaCvQS7aRDQ0O5L9lf4cEKfg/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OoFGicBSlsZpkqZibXHCYEdA5icUQGOQmr2PUbuvUqcOXjMq5zib8lLGaMXHiaWX0NjicgjqFKJIAhADZhg/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OoFGicBSlsZpkqZibXHCYEdA5BYFyC1ZvspVU2xLR11IpWFt9MgDOSn1Ko51tbPmNjuL6Yia3X6hd8hQ/640?wx_fmt=png&from=appmsg "")  
## 2.6. 实战技巧总结  
  
SRC、CNVD和HVV快速挖洞思路整理，附带实战案例。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OoFGicBSlsZpkqZibXHCYEdA5AB8K9IA3roqdI5EkOXN64BuVeKqzEYByAxLq2Nib4vnSYGRhxuGejBQ/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OoFGicBSlsZpkqZibXHCYEdA5ADpxj8fp2kjvb5jib7UMJ4VJ7w70tBDFVNw7rhozMTNk8mcxr3iaPHibw/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OoFGicBSlsZpkqZibXHCYEdA5eicRgvXBnfhugj4Y8bf72GhgBS1JrEOLBDSKklUfQL8XrycD2yp17pw/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OoFGicBSlsZpkqZibXHCYEdA5JoZsonHnqiayGUYqPBBmiauzhAgAIYvOQa4swl7KW2FnJpwgmoAvrJdw/640?wx_fmt=png&from=appmsg "")  
## 2.7. 工具插件字典  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OoFGicBSlsZpkqZibXHCYEdA56Iqn9MvVjYS3sTGZXmJA5ZiaicZNibg7pxNCWonn3ZOf08qSR5RO4Ejhg/640?wx_fmt=png&from=appmsg "")  
# 3. 加入安艺圈  
## 3.1. 微信用户  
  
安艺圈目前提供如下服务：  
  
•套餐一：dddd实战优化版：一年200（dddd**每人限1个激活码，激活前请选好常用电脑**  
）；  
  
•套餐二：dddd实战优化版+安艺圈知识库：一年500。  
  
有意向的师傅可以加微信购买哈，**加好友需要****备注dddd或者进圈****，否则不允通过哈。**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/X5epWh2K2OoFGicBSlsZpkqZibXHCYEdA5PEibGg2NJ74zCOAAbvYzscib0XcfGUMZ0u0bxEqPQEEn8bcSQhgth43g/640?wx_fmt=jpeg&from=appmsg "")  
## 3.2. 纷传老用户  
  
登录纷传小程序或者APP中，点击"设置"进入设置界面进行截图，将设置截图和dddd运行截图通过微信发给我获取激活码。（dddd**每人限1个激活码，激活前请选好常用电脑**  
）  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OoFGicBSlsZpkqZibXHCYEdA5iayPBA7icX7x53INicVhWOu9d4ZvlrMPm44aiaTLxBUiaajdzxmOWEia6sSQ/640?wx_fmt=png&from=appmsg "")  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OoFGicBSlsZpkqZibXHCYEdA5SwqkG38N5PibqumHH43ZavXT9CmxtNewYk5VjtpvmoKGEic29tS4mPMw/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OoFGicBSlsZpkqZibXHCYEdA5s4JwTzFtGbJXXxZH7OlnGPNy6hEVYicMPKxaRfw3teGMswhdGlFQiajA/640?wx_fmt=png&from=appmsg "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
