---
cve: "CVE-2025-24019"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】YesWiki 存在经过身份验证的任意文件删除漏洞(CVE-2025-24019)   
cexlife  飓风网络安全   2025-01-22 14:42  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu01WLnHSzc55u8G9iaLYpaGqpO2lWcLiag9TpIuT08xT1TgqkhBLic7rVTvicMJHgx9SqMngqm0n446yZA/640?wx_fmt=png&from=appmsg "")  
  
**漏洞描述:**  
  
YesWiki是一个用PHP编写的wiki系统,在包括4.4.5版本在内的早期版本中,任何经过身份验证的用户都可以使用文件管理器删除主机上由运行FastCGI Process Manager（FPM）的用户所拥有的任何文件,而对文件系统范围没有任何限制。  
  
这一漏洞允许任何经过身份验证的用户任意删除Wiki中的内容,导致数据部分丢失和网站被篡改或破坏,在未经修改的容器安装中，`yeswiki`文件（例如.php）的所有者并非运行FPM进程的用户（root）,但在标准安装中,www-data也可能是PHP文件的拥有者,这使得恶意用户可以通过删除所有重要的PHP文件（如index.php或YesWiki的核心文件）来完全切断对wiki的访问版本4.5.0针对这个问题进行了修复。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu01WLnHSzc55u8G9iaLYpaGqpGzl8JgTn8LxA9ibyCnqibJ6VAzlYAosyy80O74sczIrYMTZiaA5Q9tVRw/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu01WLnHSzc55u8G9iaLYpaGqpgOYsdqByia1jLxxlxN5fjFWiaWewsWiah9zsdnLjpdo81uMQ2DoRezZbg/640?wx_fmt=png&from=appmsg "")  
  
**修复方案:**  
  
将组件yeswiki升级至4.5.0及以上版本   
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
