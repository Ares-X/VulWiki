---
cve: "CVE-2022-32223"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【已复现】Nodejs Dll 劫持漏洞(CVE-2022-32223)安全风险通告   
原创 QAX CERT  奇安信 CERT   2022-07-14 10:25  
  
![](https://mmbiz.qpic.cn/mmbiz_png/EkibxOB3fs4icrhoWdKnhTgicSjB9pXdeZwDibNIBAEMegibEdG1vrjOibsq887TUz3ztMkM6Qvibic7r26sqbUIbicOMYg/640?wx_fmt=png "https://image.ipaiban.com/upload-ueditor-image-20201112-1605175807303084927.png")  
  
奇安信CERT  
  
**致力于**  
第一时间  
为企业级用户提供安全风险  
**通告**  
和  
**有效**  
解决方案。  
  
  
**安全通告**  
  
  
  
近日，奇安信CERT监测到 Nodejs Dll 劫持漏洞  
(CVE-2022-32223)  
，在nodejs中存在dll劫持漏洞，攻击者可以通过dll劫持向nodejs内注入恶意dll，从而执行代码。**鉴于该漏洞影响范围极大，建议客户尽快做好自查及防护。**  
  
****  
<table><tbody><tr><td style="word-break: break-all;padding: 5px 10px;border-color: rgb(221, 221, 221);" width="99"><p><strong><span style="font-size: 14px;">漏洞名称</span></strong></p></td><td colspan="3" style="word-break: break-all;padding: 5px 10px;border-color: rgb(221, 221, 221);"><p><strong><span style="font-size: 14px;">Nodejs Dll 劫持漏洞</span></strong></p></td></tr><tr><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="120"><p><strong><span style="font-size: 14px;">公开时间</span></strong></p></td><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="154"><p><span style="font-size: 14px;">2022-07-12</span></p></td><td style="word-break: break-all;padding: 5px 10px;border-color: rgb(221, 221, 221);" width="115"><p><strong><span style="font-size: 14px;">更新时间</span></strong></p></td><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="125"><p><span style="font-size: 14px;">2022-07-13</span></p></td></tr><tr><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="136"><p><strong><span style="font-size: 14px;">CVE编号</span></strong></p></td><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="164"><p><span style="font-size: 14px;">CVE-2022-32223</span></p></td><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="126"><p><strong><span style="font-size: 14px;">其他编号</span></strong></p></td><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="133"><p><span style="font-size: 14px;">QVD-2022-10913</span></p></td></tr><tr><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="141"><p><strong><span style="font-size: 14px;">威胁类型</span></strong></p></td><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="164"><p><span style="font-size: 14px;">代码执行</span></p></td><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="131"><p><strong><span style="font-size: 14px;">技术类型</span></strong></p></td><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="136"><p><span style="font-size: 14px;">Dll劫持</span></p></td></tr><tr><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="143"><p><strong><span style="font-size: 14px;">厂商</span></strong></p></td><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="162"><p><span style="font-size: 14px;">Nodejs</span></p></td><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="134"><p><strong><span style="font-size: 14px;">产品</span></strong></p></td><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="137"><p><span style="font-size: 14px;">Nodejs</span></p></td></tr><tr><td colspan="4" align="center" valign="middle" style="word-break: break-all;padding: 5px 10px;border-color: rgb(221, 221, 221);"><p><strong><span style="font-size: 14px;">风险等级</span></strong></p></td></tr><tr><td colspan="2" align="center" valign="middle" style="padding: 5px 10px;border-color: rgb(221, 221, 221);"><p><strong><span style="font-size: 14px;">奇安信CERT风险评级</span></strong></p></td><td colspan="2" align="center" valign="middle" style="padding: 5px 10px;border-color: rgb(221, 221, 221);"><p><strong><span style="font-size: 14px;">风险等级</span></strong></p></td></tr><tr><td colspan="2" align="center" valign="middle" style="padding: 5px 10px;border-color: rgb(221, 221, 221);"><p><span style="color: rgb(255, 0, 0);"><strong><span style="color: rgb(255, 0, 0);font-size: 14px;">高危</span></strong></span></p></td><td colspan="2" align="center" valign="middle" style="padding: 5px 10px;border-color: rgb(221, 221, 221);"><p><span style="color: rgb(12, 118, 240);"><strong><span style="color: rgb(12, 118, 240);font-size: 14px;">蓝色（一般事件）</span></strong></span></p></td></tr><tr><td colspan="4" align="center" valign="middle" style="padding: 5px 10px;border-color: rgb(221, 221, 221);"><p><strong><span style="font-size: 14px;">现时威胁状态</span></strong></p></td></tr><tr><td align="center" valign="middle" style="word-break: break-all;padding: 5px 10px;border-color: rgb(221, 221, 221);" width="143"><p><strong><span style="font-size: 14px;">POC状态</span></strong></p></td><td align="center" valign="middle" style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="161"><p><strong><span style="font-size: 14px;">EXP状态</span></strong></p></td><td align="center" valign="middle" style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="135"><p><strong><span style="font-size: 14px;">在野利用状态</span></strong></p></td><td align="center" valign="middle" style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="138"><p><strong><span style="font-size: 14px;">技术细节状态</span></strong></p></td></tr><tr><td align="center" valign="middle" style="word-break: break-all;padding: 5px 10px;border-color: rgb(221, 221, 221);" width="143"><p><span style="color: rgb(255, 0, 0);"><strong><span style="color: rgb(255, 0, 0);font-size: 14px;">已发现</span></strong></span></p></td><td align="center" valign="middle" style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="160"><p><span style="font-size: 14px;">未发现</span></p></td><td align="center" valign="middle" style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="136"><p><span style="font-size: 14px;">未发现</span></p></td><td align="center" valign="middle" style="word-break: break-all;padding: 5px 10px;border-color: rgb(221, 221, 221);" width="138"><p><span style="color: rgb(255, 0, 0);"><strong><span style="color: rgb(255, 0, 0);font-size: 14px;">已公开</span></strong></span></p></td></tr><tr><td style="word-break: break-all;padding: 5px 10px;border-color: rgb(221, 221, 221);" width="142"><p><strong><span style="font-size: 14px;">漏洞描述</span></strong></p></td><td colspan="3" style="padding: 5px 10px;border-color: rgb(221, 221, 221);"><p><span style="font-size: 14px;">在nodejs中存在dll劫持漏洞，攻击者可以通过dll劫持向nodejs内注入恶意dll，从而执行代码</span></p></td></tr><tr><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="142"><p><strong><span style="font-size: 14px;">影响版本</span></strong></p></td><td colspan="3" style="padding: 5px 10px;border-color: rgb(221, 221, 221);"><p><span style="font-size: 14px;">Nodejs &lt; 14.20.0</span></p><p><span style="font-size: 14px;">16.0.0 &lt;= Nodejs &lt; 16.16.0</span></p><p><span style="font-size: 14px;">17.0.0 &lt;= Nodejs &lt; 18.5.0</span></p></td></tr><tr><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="142"><p><strong><span style="font-size: 14px;">不受影响版本</span></strong></p></td><td colspan="3" style="padding: 5px 10px;border-color: rgb(221, 221, 221);"><p><span style="font-size: 14px;">Nodejs &gt;= 16.16.0</span></p><p><span style="font-size: 14px;">Nodejs &gt;= 18.5.0</span></p><p><span style="font-size: 14px;">Nodejs &gt;= 14.20.0</span></p></td></tr><tr><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="142"><p><strong><span style="font-size: 14px;">其他受影响组件</span></strong></p></td><td colspan="3" style="padding: 5px 10px;border-color: rgb(221, 221, 221);"><p><span style="font-size: 14px;">无</span></p></td></tr></tbody></table>  
  
目前，奇安信CERT已成功复现该漏洞，截图如下：  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/EkibxOB3fs4ibvPjkVrH2qPymEoy3bEauvDT89SDDdKhX1jicxjGm1hvI7SzsOmgcZJFBiayE2o4arnLR5c5ib7V2icg/640?wx_fmt=png "")  
  
  
威胁评估  
  
<table><tbody><tr><td style="word-break: break-all;padding: 5px 10px;" width="75"><p><strong><span style="font-size: 14px;">漏洞名称</span></strong></p></td><td colspan="4" align="center" valign="middle" style="padding: 5px 10px;" width="460"><p><span style="font-size: 14px;">Nodejs Dll 劫持漏洞</span></p></td></tr><tr><td style="padding: 5px 10px;" width="75"><p><strong><span style="font-size: 14px;">CVE编号</span></strong></p></td><td align="center" valign="middle" style="padding: 5px 10px;" width="106"><p><span style="font-size: 14px;">CVE-2022-32223</span></p></td><td colspan="2" style="word-break: break-all;padding: 5px 10px;" width="206"><p><strong><span style="font-size: 14px;">其他编号</span></strong></p></td><td align="center" valign="middle" style="padding: 5px 10px;" width="106"><p><span style="font-size: 14px;">QVD-2022-10913</span></p></td></tr><tr><td style="padding: 5px 10px;" width="75"><p><strong><span style="font-size: 14px;">CVSS 3.1评级</span></strong></p></td><td align="center" valign="middle" style="padding: 5px 10px;" width="106"><p><span style="font-size: 14px;">高危</span></p></td><td colspan="2" style="padding: 5px 10px;" width="206"><p><strong><span style="font-size: 14px;">CVSS 3.1分数</span></strong></p></td><td align="center" valign="middle" style="padding: 5px 10px;" width="106"><p><span style="font-size: 14px;">8.4</span></p></td></tr><tr><td rowspan="8" style="padding: 5px 10px;" width="75"><p><strong><span style="font-size: 14px;">CVSS向量</span></strong></p></td><td colspan="2" align="center" valign="middle" style="word-break: break-all;padding: 5px 10px;" width="322"><p><strong><span style="font-size: 14px;">访问途径（AV）</span></strong></p></td><td colspan="2" align="center" valign="middle" style="padding: 5px 10px;"><p><strong><span style="font-size: 14px;">攻击复杂度（AC）</span></strong></p></td></tr><tr><td colspan="2" align="center" valign="middle" style="padding: 5px 10px;" width="188"><p><span style="font-size: 14px;">本地</span></p></td><td colspan="2" align="center" valign="middle" style="padding: 5px 10px;" width="109"><p><span style="font-size: 14px;">低</span></p></td></tr><tr><td colspan="2" align="center" valign="middle" style="word-break: break-all;padding: 5px 10px;" width="256"><p><strong><span style="font-size: 14px;">所需权限（PR）</span></strong></p></td><td colspan="2" align="center" valign="middle" style="padding: 5px 10px;" width="109"><p><strong><span style="font-size: 14px;">用户交互（UI）</span></strong></p></td></tr><tr><td colspan="2" align="center" valign="middle" style="padding: 5px 10px;" width="273"><p><span style="font-size: 14px;">无</span></p></td><td colspan="2" align="center" valign="middle" style="padding: 5px 10px;" width="109"><p><span style="font-size: 14px;">不需要</span></p></td></tr><tr><td colspan="2" align="center" valign="middle" style="word-break: break-all;padding: 5px 10px;" width="281"><p><strong><span style="font-size: 14px;">影响范围（S）</span></strong></p></td><td colspan="2" align="center" valign="middle" style="word-break: break-all;padding: 5px 10px;" width="109"><p><strong><span style="font-size: 14px;">机密性影响（C）</span></strong></p></td></tr><tr><td colspan="2" align="center" valign="middle" style="padding: 5px 10px;" width="284"><p><span style="font-size: 14px;">不改变</span></p></td><td colspan="2" align="center" valign="middle" style="padding: 5px 10px;" width="109"><p><span style="font-size: 14px;">高</span></p></td></tr><tr><td colspan="2" align="center" valign="middle" style="word-break: break-all;padding: 5px 10px;" width="286"><p><strong><span style="font-size: 14px;">完整性影响（I）</span></strong></p></td><td colspan="2" align="center" valign="middle" style="padding: 5px 10px;" width="109"><p><strong><span style="font-size: 14px;">可用性影响（A）</span></strong></p></td></tr><tr><td colspan="2" align="center" valign="middle" style="padding: 5px 10px;" width="287"><p><span style="font-size: 14px;">高</span></p></td><td colspan="2" align="center" valign="middle" style="padding: 5px 10px;" width="109"><p><span style="font-size: 14px;">高</span></p></td></tr><tr><td style="padding: 5px 10px;" width="75"><p><strong><span style="font-size: 14px;">危害描述</span></strong></p></td><td colspan="4" style="padding: 5px 10px;" width="460"><p><span style="font-size: 14px;">攻击者可以通过dll劫持向nodejs内注入恶意dll，从而在Nodejs内执行代码，危害业务安全。</span></p></td></tr></tbody></table>  
  
  
处置建议  
  
1.升级版本  
  
升级Nodejs到以下版本  
  
Nodejs
>= 16.16.0  
  
Nodejs
>= 18.5.0  
  
Nodejs
>= 14.20.0  
  
  
参考资料  
  
[1]https://blog.aquasec.com/cve-2022-32223-dll-hijacking  
  
[2]https://security.snyk.io/vuln/SNYK-UPSTREAM-NODE-2946727  
  
  
时间线  
  
2022年7月  
14日，  
奇安信 CERT发布安全风险通告。  
  
  
点击**阅读原文**  
到奇安信NOX-安全监测平台查询更多漏洞详情  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
