---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  新鲜出炉，Shiro 反序列化漏洞一站式综合利用工具  
 进击的HACK   2026-01-22 23:51  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/DuibU3GqmxVmRsdItbBVRKegNHicHQvAHDdZsGpLVU7touSU1AU1twHTfRjG3Vu5aUh0RnPPllfVUhs4qdWF5QYQ/640?wx_fmt=png&wxfrom=13 "")  
  
声明：  
文中所涉及的技术、思路和工具仅供以安全为目的的学习交流使用，任何人不得将其用于非法用途给予盈利等目的，否则后果自行承担！  
如有侵权烦请告知，我会立即删除并致歉。谢谢  
！  
  
文章有疑问的，可以公众号发消息问我，或者留言。我每天都会看的。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/9zYJrD2VibHmqgf4y9Bqh9nDynW5fHvgbgkSGAfRboFPuCGjVoC3qMl6wlFucsx3Y3jt4gibQgZ6LxpoozE0Tdow/640?wx_fmt=png&wxfrom=13 "")  
  
  
  
   
  
> 字数 468，阅读大约需 3 分钟  
  
## 介绍  
  
项目地址：https://github.com/FightingLzn9/ShiroExploit  
  
shiro key 校验  
![ba66c0ddf520b10a68e3bfee9bb3b0b8.png](https://mmbiz.qpic.cn/sz_mmbiz_png/a1BOUvqnbrjvsg7icjzmicoLvmOXb9h8Xlb1kho6tibrJJyKXf7y53rZ7jXooy03715k1hvwNw0W9ckrAos3CoC2g/640?from=appmsg "null")  
  
ba66c0ddf520b10a68e3bfee9bb3b0b8.png  
  
工具功能思维导图  
![fc33f0cbe148d575c9eeb699734155c7.png](https://mmbiz.qpic.cn/sz_mmbiz_png/a1BOUvqnbrjvsg7icjzmicoLvmOXb9h8XlOJ1LvpibSaqjwswcPO6ndFJYBYsTUIYfHvnwhyEpcL9uj57gKPtUueA/640?from=appmsg "null")  
  
fc33f0cbe148d575c9eeb699734155c7.png  
## 命令执行  
  
![2cff7a920f8a678fd95a711be8bc0717.png](https://mmbiz.qpic.cn/sz_mmbiz_png/a1BOUvqnbrjvsg7icjzmicoLvmOXb9h8Xl2aVia8gSRnK4szPxeE0XQ23mmnTBf4alM9BiaatuLtTa4dzpsK9uqIDQ/640?from=appmsg "null")  
  
2cff7a920f8a678fd95a711be8bc0717.png  
## 小工具  
  
更改目标 shiro 密钥  
![7c1c676e937d0088c556b4ba6b516768.png](https://mmbiz.qpic.cn/sz_mmbiz_png/a1BOUvqnbrjvsg7icjzmicoLvmOXb9h8XlxyYDHpqC13nY47732DCADPic8KE7sevZa9wvfdRyYb6Y6sKdhlhH4YQ/640?from=appmsg "null")  
  
7c1c676e937d0088c556b4ba6b516768.png  
  
**这个功能有什么用？**  
  
高版本的 shiro 密钥是每次服务启动时随机生成的，也就是每次启动都会改变。  
  
查看 shiro key  
![35bc0f81165f4a4d01d9d7eb21817a67.png](https://mmbiz.qpic.cn/sz_mmbiz_png/a1BOUvqnbrjvsg7icjzmicoLvmOXb9h8XlmHxDrRZEqsFpBaiaHRZA55gvTKR8tnFc9eWMG7gvnicpmoWcPGdjfkmw/640?from=appmsg "null")  
  
35bc0f81165f4a4d01d9d7eb21817a67.png  
  
![150a47635ae15abe016dde00c9201b57.png](https://mmbiz.qpic.cn/sz_mmbiz_png/a1BOUvqnbrjvsg7icjzmicoLvmOXb9h8XlcMOURdupOwue2NBV22EQibTiaCaOibBmMqia9gDhgZR3gOPjl7FBTh2ucg/640?from=appmsg "null")  
  
150a47635ae15abe016dde00c9201b57.png  
  
在攻防演练中，多个攻击队测试一家企业的资产，难免攻击路径会重合。有的攻击队就想到了个注意，把 shiro key 给修改成随机的，这样自己先拿下系统后，稍后发现 shiro key 的队伍就进不去了。  
> 前提是出现 shiro key 泄露的问题，而不是可以通过 rce/代码注入的形式，从内存里获取当前的 key  
  
  
虽然显示超时，我们重新看 key  
![375a5360bce87b33b3639aca5c21b256.png](https://mmbiz.qpic.cn/sz_mmbiz_png/a1BOUvqnbrjvsg7icjzmicoLvmOXb9h8XlzNAY50S1pokCzUHgeLbsiawHNEvFrkuRVtvZDIoOkQZWaRZFjWk6bqw/640?from=appmsg "null")  
  
375a5360bce87b33b3639aca5c21b256.png  
  
内存里的 shiro key 修改成功  
![3e62b70d853aa2052f143c8a0a459322.png](https://mmbiz.qpic.cn/sz_mmbiz_png/a1BOUvqnbrjvsg7icjzmicoLvmOXb9h8XlWQdibScyffyz1l3zDlYVbH45duu7JLbAibzcfyiaxnDl4O3mGuDIxZ3hA/640?from=appmsg "null")  
  
3e62b70d853aa2052f143c8a0a459322.png  
  
当然，非必要还是建议大家不用改 key。  
## 内存马  
  
![65ecad902c9caaaa022f7941a5225ad2.png](https://mmbiz.qpic.cn/sz_mmbiz_png/a1BOUvqnbrjvsg7icjzmicoLvmOXb9h8Xlw5J834UhUicPvVmHzsiaSqFB3gkxVgc0Mq6MFDmsvDbt9CvDWYpgRZYA/640?from=appmsg "null")  
  
65ecad902c9caaaa022f7941a5225ad2.png  
## 总结  
  
项目地址：https://github.com/FightingLzn9/ShiroExploit  
  
基本概述如下：  
  
1、区分 ShiroAttack2，采用分块传输内存马，每块大小不超过 4000。  
  
2、可打 JDK 高版本的 shiro，确保有 key、有 gadget 就能 rce。  
  
3、依托 JavaChains 动态生成 gadget，实现多条利用链，如 CB、CC、Fastjson、Jackson。  
  
4、通过魔改 MemshellParty 的内存马模板，使其回显马通信加密，去除一些典型的特征。  
  
5、借助 JMG 的注入器，加以魔改，实现无侵入性，同一个容器可同时兼容多种类型的内存马。  
  
6、对内存马和注入器类名进行随机化和 Lambda 化处理，规避内存马主动扫描设备的检测。  
  
7、可以更改目标配置，如改 Key、改 TomcatHeaderMaxSize。  
  
8、采用 URLDNS 链和反序列化炸弹的方式来探测指定类实现利用链的探测。  
  
9、缺点是流量相对大一些。  
  
   
  
  
  
欢迎加入知识星球，星球内容主要有：  
  
1、公众号文章备份、工具分享。  
  
2、常见问题的答疑、解决方案汇总在知识星球，作为便于搜索的知识库。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/a1BOUvqnbriac4rcXic5DYPcicY8wjnZribzlTicb8LYBx4m54uoUx7eUbvaa04H7pa8MulbaZdlcEYEMRN0NwQ41bw/640?wx_fmt=jpeg "")  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
