---
cve: "CVE-2024-50379"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】Apache Tomcat远程代码执行漏洞(CVE-2024-50379)   
原创 常行安全服务团队  常行科技   2024-12-19 07:13  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/r8QjvJibulhTOnWIicKuMzPL29k5TrgpibicteuAFmEaesQicWMkZCwUn3miateIAVL1Z1QXibDiawnKCdQ1oklSUBRq9A/640?wx_fmt=png&from=appmsg "")  
  
      
Apache Tomcat是一个开源的Java Servlet容器，广泛用于运行Java Web应用程序。  
  
<table><tbody style="outline: 0px;visibility: visible;"><tr style="outline: 0px;visibility: visible;"><td colspan="4" height="27" align="center" valign="middle" style="outline: 0px;word-break: break-all;hyphens: auto;background: rgb(70, 118, 217);visibility: visible;"><p style="outline: 0px;visibility: visible;"><span style="outline: 0px;font-size: 14px;color: rgb(255, 255, 255);visibility: visible;">漏洞概述</span><span style="outline: 0px;font-size: 16px;color: white;font-family: 宋体;visibility: visible;"></span></p></td></tr><tr style="outline: 0px;visibility: visible;"><td style="border-top-width: initial;border-top-style: none;outline: 0px;word-break: break-all;hyphens: auto;visibility: visible;"><p style="outline: 0px;text-align: left;line-height: 16px;visibility: visible;"><strong style="outline: 0px;visibility: visible;"><span style="outline: 0px;font-size: 13px;font-family: 微软雅黑, sans-serif;visibility: visible;">漏洞名称</span></strong></p></td><td colspan="3" style="outline: 0px;word-break: break-all;hyphens: auto;border-top-width: initial;border-top-style: none;border-left-width: initial;border-left-style: none;line-height: 16px;visibility: visible;text-align: left;font-family: system-ui, -apple-system, &#34;system-ui&#34;, &#34;Helvetica Neue&#34;, &#34;PingFang SC&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;letter-spacing: 0.544px;text-wrap: wrap;background-color: rgb(255, 255, 255);margin-bottom: 0px;"><span style="outline: 0px;color: black;font-size: 13px;letter-spacing: 1px;text-decoration-style: solid;text-decoration-color: rgb(0, 0, 0);visibility: visible;">Apache Tomcat远程代码执行漏洞</span></td></tr><tr style="outline: 0px;text-align: left;line-height: 16px;visibility: visible;word-break: break-all;hyphens: auto;border-top-width: initial;border-top-style: none;"><td colspan="1" rowspan="1" style="border-top-width: initial;border-top-style: none;outline: 0px;word-break: break-all;hyphens: auto;line-height: 16px;visibility: visible;"><strong style="outline: 0px;visibility: visible;"><span style="outline: 0px;font-size: 13px;font-family: 微软雅黑, sans-serif;visibility: visible;">漏洞编号</span></strong></td><td colspan="3" rowspan="1" style="border-top-width: initial;border-top-style: none;border-left-width: initial;border-left-style: none;outline: 0px;word-break: break-all;hyphens: auto;line-height: 16px;visibility: visible;"><span style="outline: 0px;color: black;font-size: 13px;letter-spacing: 1px;text-decoration-style: solid;text-decoration-color: rgb(0, 0, 0);visibility: visible;"><span style="color: rgb(0, 0, 0);font-family: system-ui, -apple-system, &#34;system-ui&#34;, &#34;Helvetica Neue&#34;, &#34;PingFang SC&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;font-size: 13px;letter-spacing: 1px;text-align: left;background-color: rgb(255, 255, 255);">CVE-2024-50379</span></span></td></tr><tr style="outline: 0px;text-align: left;line-height: 16px;visibility: visible;word-break: break-all;hyphens: auto;border-top-width: initial;border-top-style: none;"><td style="border-top-width: initial;border-top-style: none;outline: 0px;word-break: break-all;hyphens: auto;line-height: 16px;visibility: visible;"><p style="outline: 0px;line-height: 16px;visibility: visible;word-break: break-all;hyphens: auto;border-top-width: initial;border-top-style: none;"><strong style="outline: 0px;visibility: visible;"><span style="outline: 0px;font-size: 13px;font-family: 微软雅黑, sans-serif;visibility: visible;">公开时间</span></strong></p></td><td style="border-top-width: initial;border-top-style: none;border-left-width: initial;border-left-style: none;outline: 0px;word-break: break-all;hyphens: auto;line-height: 16px;visibility: visible;"><p style="outline: 0px;word-break: break-all;hyphens: auto;border-top-width: initial;border-top-style: none;border-left-width: initial;border-left-style: none;line-height: 16px;visibility: visible;"><span style="outline: 0px;color: black;font-size: 13px;letter-spacing: 1px;text-decoration-style: solid;text-decoration-color: rgb(0, 0, 0);visibility: visible;">2024-12-18</span></p></td><td style="border-top-width: initial;border-top-style: none;outline: 0px;word-break: break-all;hyphens: auto;line-height: 16px;visibility: visible;"><p style="outline: 0px;line-height: 16px;visibility: visible;word-break: break-all;hyphens: auto;border-top-width: initial;border-top-style: none;"><strong style="outline: 0px;visibility: visible;"><span style="outline: 0px;font-size: 13px;font-family: 微软雅黑, sans-serif;visibility: visible;">影响量级</span></strong></p></td><td style="border-top-width: initial;border-top-style: none;border-left-width: initial;border-left-style: none;outline: 0px;word-break: break-all;hyphens: auto;line-height: 16px;visibility: visible;"><p style="outline: 0px;word-break: break-all;hyphens: auto;border-top-width: initial;border-top-style: none;border-left-width: initial;border-left-style: none;line-height: 16px;visibility: visible;"><span style="outline: 0px;color: black;font-size: 13px;letter-spacing: 1px;text-decoration-style: solid;text-decoration-color: rgb(0, 0, 0);visibility: visible;">十万级</span></p></td></tr><tr style="outline: 0px;text-align: left;line-height: 16px;visibility: visible;word-break: break-all;hyphens: auto;border-top-width: initial;border-top-style: none;"><td style="border-top-width: initial;border-top-style: none;outline: 0px;word-break: break-all;hyphens: auto;line-height: 16px;visibility: visible;"><p style="outline: 0px;line-height: 16px;visibility: visible;word-break: break-all;hyphens: auto;border-top-width: initial;border-top-style: none;"><strong style="outline: 0px;visibility: visible;"><span style="outline: 0px;font-size: 13px;font-family: 微软雅黑, sans-serif;visibility: visible;">风险评级</span></strong></p></td><td style="border-top-width: initial;border-top-style: none;border-left-width: initial;border-left-style: none;outline: 0px;word-break: break-all;hyphens: auto;visibility: visible;"><p style="outline: 0px;line-height: 16px;visibility: visible;"><strong style="outline: 0px;visibility: visible;"><span style="outline: 0px;font-size: 13px;color: red;font-family: 微软雅黑, sans-serif;visibility: visible;">高危</span></strong></p></td><td style="border-top-width: initial;border-top-style: none;outline: 0px;word-break: break-all;hyphens: auto;line-height: 16px;visibility: visible;"><p style="outline: 0px;line-height: 16px;visibility: visible;word-break: break-all;hyphens: auto;border-top-width: initial;border-top-style: none;"><strong style="outline: 0px;visibility: visible;"><span style="outline: 0px;font-size: 13px;font-family: 微软雅黑, sans-serif;visibility: visible;">CVSS 3.1分数</span></strong></p></td><td style="border-top-width: initial;border-top-style: none;border-left-width: initial;border-left-style: none;outline: 0px;word-break: break-all;hyphens: auto;visibility: visible;"><p style="outline: 0px;line-height: 16px;visibility: visible;"><strong style="outline: 0px;visibility: visible;"><span style="outline: 0px;font-size: 13px;color: red;font-family: 微软雅黑, sans-serif;visibility: visible;">9.8</span></strong></p></td></tr><tr style="outline: 0px;text-align: left;line-height: 16px;visibility: visible;word-break: break-all;hyphens: auto;border-top-width: initial;border-top-style: none;"><td style="border-top-width: initial;border-top-style: none;outline: 0px;word-break: break-all;hyphens: auto;line-height: 16px;visibility: visible;"><p style="outline: 0px;line-height: 16px;visibility: visible;word-break: break-all;hyphens: auto;border-top-width: initial;border-top-style: none;"><strong style="outline: 0px;visibility: visible;"><span style="outline: 0px;font-size: 13px;font-family: 微软雅黑, sans-serif;visibility: visible;">威胁类型</span></strong></p></td><td style="border-top-width: initial;border-top-style: none;border-left-width: initial;border-left-style: none;outline: 0px;word-break: break-all;hyphens: auto;line-height: 16px;visibility: visible;"><p style="outline: 0px;word-break: break-all;hyphens: auto;border-top-width: initial;border-top-style: none;border-left-width: initial;border-left-style: none;line-height: 16px;visibility: visible;"><span style="outline: 0px;color: black;font-size: 13px;letter-spacing: 1px;text-decoration-style: solid;text-decoration-color: rgb(0, 0, 0);visibility: visible;">代码执行</span></p></td><td style="border-top-width: initial;border-top-style: none;outline: 0px;word-break: break-all;hyphens: auto;line-height: 16px;visibility: visible;"><p style="outline: 0px;line-height: 16px;visibility: visible;word-break: break-all;hyphens: auto;border-top-width: initial;border-top-style: none;"><strong style="outline: 0px;visibility: visible;"><span style="outline: 0px;font-size: 13px;font-family: 微软雅黑, sans-serif;visibility: visible;">利用可能性</span></strong></p></td><td style="outline: 0px;line-height: 16px;visibility: visible;border-top-width: initial;border-top-style: none;border-left-width: initial;border-left-style: none;word-break: break-all;hyphens: auto;text-align: left;font-family: system-ui, -apple-system, &#34;system-ui&#34;, &#34;Helvetica Neue&#34;, &#34;PingFang SC&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;letter-spacing: 0.544px;text-wrap: wrap;background-color: rgb(255, 255, 255);margin-bottom: 0px;"><p style="outline: 0px;line-height: 16px;visibility: visible;border-top-width: initial;border-top-style: none;border-left-width: initial;border-left-style: none;word-break: break-all;hyphens: auto;text-align: left;font-family: system-ui, -apple-system, &#34;system-ui&#34;, &#34;Helvetica Neue&#34;, &#34;PingFang SC&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;letter-spacing: 0.544px;text-wrap: wrap;background-color: rgb(255, 255, 255);margin-bottom: 0px;"><strong style="outline: 0px;visibility: visible;"><span style="outline: 0px;font-size: 13px;color: red;font-family: 微软雅黑, sans-serif;visibility: visible;">高</span></strong></p></td></tr><tr style="outline: 0px;text-align: left;line-height: 16px;visibility: visible;word-break: break-all;hyphens: auto;border-top-width: initial;border-top-style: none;"><td style="border-top-width: initial;border-top-style: none;outline: 0px;word-break: break-all;hyphens: auto;line-height: 16px;visibility: visible;"><p style="outline: 0px;line-height: 16px;visibility: visible;word-break: break-all;hyphens: auto;border-top-width: initial;border-top-style: none;"><strong style="outline: 0px;visibility: visible;"><span style="outline: 0px;font-size: 13px;font-family: 微软雅黑, sans-serif;visibility: visible;">POC状态</span></strong></p></td><td style="border-top-width: initial;border-top-style: none;border-left-width: initial;border-left-style: none;outline: 0px;word-break: break-all;hyphens: auto;visibility: visible;"><p style="outline: 0px;line-height: 16px;visibility: visible;"><span style="outline: 0px;font-size: 13px;font-family: 微软雅黑, sans-serif;visibility: visible;"><strong style="outline: 0px;letter-spacing: 0.578px;visibility: visible;"><span style="outline: 0px;color: red;visibility: visible;">已公开</span></strong></span></p></td><td style="border-top-width: initial;border-top-style: none;outline: 0px;word-break: break-all;hyphens: auto;line-height: 16px;visibility: visible;"><p style="outline: 0px;line-height: 16px;visibility: visible;word-break: break-all;hyphens: auto;border-top-width: initial;border-top-style: none;"><strong style="outline: 0px;visibility: visible;"><span style="outline: 0px;font-size: 13px;font-family: 微软雅黑, sans-serif;visibility: visible;">在野利用状态</span></strong></p></td><td style="border-top-width: initial;border-top-style: none;border-left-width: initial;border-left-style: none;outline: 0px;word-break: break-all;hyphens: auto;line-height: 16px;visibility: visible;"><p style="outline: 0px;word-break: break-all;hyphens: auto;border-top-width: initial;border-top-style: none;border-left-width: initial;border-left-style: none;line-height: 16px;visibility: visible;"><span style="outline: 0px;color: black;font-size: 13px;letter-spacing: 1px;text-decoration-style: solid;text-decoration-color: rgb(0, 0, 0);visibility: visible;">未发现<br/></span></p></td></tr><tr style="outline: 0px;text-align: left;line-height: 16px;visibility: visible;word-break: break-all;hyphens: auto;border-top-width: initial;border-top-style: none;"><td style="border-top-width: initial;border-top-style: none;outline: 0px;word-break: break-all;hyphens: auto;line-height: 16px;visibility: visible;"><p style="outline: 0px;line-height: 16px;visibility: visible;word-break: break-all;hyphens: auto;border-top-width: initial;border-top-style: none;"><strong style="outline: 0px;visibility: visible;"><span style="outline: 0px;font-size: 13px;font-family: 微软雅黑, sans-serif;visibility: visible;">EXP状态</span></strong></p></td><td style="outline: 0px;word-break: break-all;hyphens: auto;border-top-width: initial;border-top-style: none;border-left-width: initial;border-left-style: none;line-height: 16px;visibility: visible;text-align: left;font-family: system-ui, -apple-system, &#34;system-ui&#34;, &#34;Helvetica Neue&#34;, &#34;PingFang SC&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;letter-spacing: 0.544px;text-wrap: wrap;background-color: rgb(255, 255, 255);margin-bottom: 0px;"><p style="outline: 0px;word-break: break-all;hyphens: auto;border-top-width: initial;border-top-style: none;border-left-width: initial;border-left-style: none;line-height: 16px;visibility: visible;text-align: left;font-family: system-ui, -apple-system, &#34;system-ui&#34;, &#34;Helvetica Neue&#34;, &#34;PingFang SC&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;letter-spacing: 0.544px;text-wrap: wrap;background-color: rgb(255, 255, 255);margin-bottom: 0px;"><span style="outline: 0px;color: black;font-size: 13px;letter-spacing: 1px;text-decoration-style: solid;text-decoration-color: rgb(0, 0, 0);visibility: visible;">未公开</span></p></td><td style="border-top-width: initial;border-top-style: none;outline: 0px;word-break: break-all;hyphens: auto;line-height: 16px;visibility: visible;"><p style="outline: 0px;line-height: 16px;visibility: visible;word-break: break-all;hyphens: auto;border-top-width: initial;border-top-style: none;"><strong style="outline: 0px;visibility: visible;"><span style="outline: 0px;font-size: 13px;font-family: 微软雅黑, sans-serif;visibility: visible;">技术细节状态</span></strong></p></td><td style="outline: 0px;word-break: break-all;hyphens: auto;border-top-width: initial;border-top-style: none;border-left-width: initial;border-left-style: none;line-height: 16px;visibility: visible;text-align: left;font-family: system-ui, -apple-system, &#34;system-ui&#34;, &#34;Helvetica Neue&#34;, &#34;PingFang SC&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;letter-spacing: 0.544px;text-wrap: wrap;background-color: rgb(255, 255, 255);margin-bottom: 0px;"><p style="outline: 0px;word-break: break-all;hyphens: auto;border-top-width: initial;border-top-style: none;border-left-width: initial;border-left-style: none;line-height: 16px;visibility: visible;text-align: left;font-family: system-ui, -apple-system, &#34;system-ui&#34;, &#34;Helvetica Neue&#34;, &#34;PingFang SC&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;letter-spacing: 0.544px;text-wrap: wrap;background-color: rgb(255, 255, 255);margin-bottom: 0px;"><span style="outline: 0px;color: black;font-size: 13px;letter-spacing: 1px;text-decoration-style: solid;text-decoration-color: rgb(0, 0, 0);visibility: visible;">已公开</span></p></td></tr></tbody></table>  
  
**漏洞详情**  
  
   
Vulnerability Details   
  
  
  
**0x00**  
  
- **漏洞描述**  
  
  
  
      当Tomcat部署在对大小写不敏感的服务器上（如windows）且使用了非默认配置（在web.xml中将readonly参数的值设为false），同时服务器开启了允许PUT方法，那么攻击者可以利用条件竞争不断上传恶意文件，绕过Tomcat的大小写敏感检查，导致上传的恶意文件被解析，从而导致远程代码执行。  
  
  
**受影响范围**  
  
   
Affected Version   
  
  
  
**0x01**  
  
  
      9.0.0.M1 <= Apache Tomcat <= 9.0.97  
  
      10.1.0-M1 <= Apache Tomcat <= 10.1.33  
  
      11.0.0-M1 <= Apache Tomcat <= 11.0.1  
  
  
  
**修复方案**  
  
   
Solutions   
  
  
  
**0x02**  
- **解决方案**  
      
  
      
    一、临时修复方案  
：  
  
  1.进入Tomca根目录，修改conf目录下的web.xml配置文件，将readonly参数设置为true或直接删除此配置（使用默认配置，默认配置也为true）。  
```
<servlet>
    <servlet-name>default</servlet-name>
    <servlet-class>org.apache.catalina.servlets.DefaultServlet</servlet-class>
    <init-param>
        <param-name>debug</param-name>
        <param-value>0</param-value>
    </init-param>
    <init-param>
        <param-name>listings</param-name>
        <param-value>false</param-value>
    </init-param>
   <!--readonly配置，可直接删除此配置--> 
    <init-param>
        <param-name>readonly</param-name>
        <!--将值设为true-->
        <param-value>true</param-value>
    </init-param>
    <load-on-startup>1</load-on-startup>
</servlet>
```  
  
        2  
.禁用PUT方法并重启Tomcat服务器使配置生效。  
  
      
      
二、升级  
修复方案  
  
        Apache官方已  
发布安全通告并发布了修复版本9.0.98、10.1.34、11.0.2，请尽  
快下载安全版本修复漏洞，链接如下：  
  
        Apache Tomcat 9：https://tomcat.apache.org/download-90.cgi  
  
        Apache Tomcat 10：https://tomcat.apache.org/download-10.cgi  
  
        Apache Tomcat 11：https://tomcat.apache.org/download-11cgi  
  
  
**漏洞复现/验证**  
  
   
Reproduction   
  
  
  
**0x03**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/r8QjvJibulhTOnWIicKuMzPL29k5Trgpibic2ibSVnwFrr4qMiaULv3j1Xr4icbC62nqxvrowke8NRIRCBHibDBpMOCxfw/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/5ibqUx1JicPMtpzBF9mpibjVeab8S0LPppgyJS90BEuqdO07WNt8kmenK1FGaoVBxTSgibfLdUL4SLKy7DCsaYdxxQ/640?wx_fmt=png "")  
  
**the end**  
  
![](https://mmbiz.qpic.cn/mmbiz_png/5ibqUx1JicPMtpzBF9mpibjVeab8S0LPppgQDn95A8w6k7yF4nOjPR3icYcLzQnF22HZl8g3o5VLvKMQJEo4gPS7wQ/640?wx_fmt=png "")  
  
  
  
常行科技是一家专注于**网络安全解决方案和运营服务**  
的“专精特新”企业，粤港澳专精特新标杆企业 TOP100，国家级高新技术企业，国家级科技型中小企业，广东省创新型中小企业，立志深耕于网络安全服务领域，是网络安全运营服务**PTM理论**  
的首创者。  
  
自建网络安全攻防实验室“**大圣·攻防实验室(DS-Lab)**”，专注于最新的网络攻防技术研究、安全人才培养、客户环境模拟、安全产品研发、应急演练模拟、安全技术培训等。与鹏城实验室深入合作，共建**鹏城靶场常行科技分靶场**。大圣·攻防实验室“行者战队”近年来多次参加国内外的实战攻防演练及比赛，并取得优秀战果。  
  
常行科技**三大服务体系、六大场景化解决方案**多维度为客户提供最适合自身需求的高性价比网络安全解决方案，**低成本、高质量**地帮助客户解决网络和数据安全相关问题。  
  
  
**有常行，更安全**  
  
****  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/r8QjvJibulhT9xicZgBkutnwqozGYfW20cxgUzbMVP117Px3xDtnafDiaeY2ToD2ibicnd3SaQE7qHuCMrL0X2ND0Qg/640?wx_fmt=jpeg "")  
  
常为而不置  
  
常行而不休  
  
了解更多咨询请关注公众号  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
