---
cve: "CVE-2020-6828"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【技术分享】CVE-2020-6828：Firefox for Android任意文件覆盖漏洞分析   
原创 fatal0  安全客   2022-08-15 10:00  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/Ok4fxxCpBb6UKXsZjnJkQYKibTcRSZyrWAOhsSOCtOqRI2WzsItZWKw6Wic7RVs2vicJD1VkUHVG3icbsCE72FEfmw/640?wx_fmt=jpeg "")  
  
2020年4月，Mozilla  
安全公告  
披露并修复了我在Firefox 68.5提交的一个漏洞，漏洞编号为CVE-2020-6828。攻击者可利用该漏洞覆盖Firefox私有目录中的文件，从而控制浏览器的任意配置项，如配置代理服务器，关闭同源策略等，造成等同与任意代码执行的危害。  
  
漏洞原理  
##   
  
Firefox允许外部APP调用它打开Content URI。  
```
```  
  
如果传入的URI是Content URI，会调用org.mozilla.gecko.util.FileUtils.resolveContentUri。  
```
```  
  
resolveContentUri会将Content URI转成File URI。  
```
```  
  
重点看getTempFilePathFromContentUri，它调用了getFileNameFromContentUri来从ContentProvider中获取文件名，并将其和Cache目录拼接创建了一个文件，最后调用copy从ContentProvider中读取数据写入到该文件中。  
```
```  
  
再来看getFileNameFromContentUri，它直接从ContentProvider获取_display_name作为文件名返回，没有进行任何处理。  
```
```  
  
当恶意的ContentProvider返回的_display_name为../evil时，即可跳出Cache目录，导致任意文件覆盖。  
## 如何利用  
  
在Firefox的私有目录中有一个文件/data/data/org.mozilla.firefox/files/mozilla/profiles.ini，其中PATH为随机生成的用户目录。  
```
```  
  
在用户目录发现了一个文件prefs.js，内容如下：  
```
```  
  
从文件的内容得知，可以在用户目录中写入一个user.js文件来修改浏览器的配置项。  
  
创建一个恶意的ContentProvider并实现query和openFile方法。  
```
```  
  
然后调用Firefox打开Content URI。  
```
```  
  
第一步，先覆盖/data/data/org.mozilla.firefox/files/mozilla/profiles.ini文件，将用户目录PATH修改为/data/data/org.mozilla.firefox/files/mozilla/。  
```
```  
  
第二步，在/data/data/org.mozilla.firefox/files/mozilla/目录写入一个user.js文件，即可控制浏览器的任意配置项（具体配置可参见about:config），如写入以下内容就可以关闭File下的同源策略。  
```
```  
  
漏洞修复  
##   
  
Firefox 68.7在FileUtils新增了sanitizeFilename方法，通过File.getName来对文件名进行清洗，解决了目录遍历的问题。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/Ok4fxxCpBb6UKXsZjnJkQYKibTcRSZyrW865gVYtYbXiap5vONQoSicUIslBOEGiabaqqdRmo4icfCK0n69vMppffEA/640?wx_fmt=png "")  
  
时间线  
- 2020-02-25 – 漏洞提交  
  
- 2020-03-02 – 漏洞确认  
  
- 2020-03-16 – 漏洞修复&赏金发放  
  
- 2020-04-07 – 发布安全公告和漏洞编号  
  
![](https://mmbiz.qpic.cn/mmbiz_png/Ok4fxxCpBb6OLwHohYU7UjX5anusw3ZzxxUKM0Ert9iaakSvib40glppuwsWytjDfiaFx1T25gsIWL5c8c7kicamxw/640?wx_fmt=png "虚线阴影分割线")  
```
```  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
