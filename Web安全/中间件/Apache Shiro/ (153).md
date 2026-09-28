---
cve: "CVE-2022-32532"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【已复现】Apache Shiro 身份认证绕过漏洞(CVE-2022-32532)安全风险通告   
原创 QAX CERT  奇安信 CERT   2022-06-29 11:45  
  
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
  
  
  
近日，奇安信CERT监测到Apache Shiro身份认证绕过漏洞(CVE-2022-32532)技术细节及PoC在互联网上公开，当Apache Shiro中使用RegExPatternMatcher进行权限配置，且正则表达式中携带"."时，未经授权的远程攻击者可通过构造恶意数据包绕过身份认证，导致配置的权限验证失效。**鉴于此漏洞影响范围较大，建议客户尽快做好自查及防护。**  
  
****  
  
  
<table><tbody><tr><td style="word-break: break-all;padding: 5px 10px;border-color: rgb(221, 221, 221);" width="83"><p><strong><span style="font-size: 14px;">漏洞名称</span></strong></p></td><td colspan="3" style="padding: 5px 10px;word-break: break-all;border-color: rgb(221, 221, 221);"><p><strong><span style="font-size: 14px;">Apache Shiro身份认证绕过漏洞</span></strong><span style="font-size: 14px;"></span></p></td></tr><tr><td style="word-break: break-all;padding: 5px 10px;border-color: rgb(221, 221, 221);" width="104"><p><strong><span style="font-size: 14px;">公开时间</span></strong></p></td><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="226"><p><span style="font-size: 14px;">2022-06-28</span></p></td><td style="word-break: break-all;padding: 5px 10px;border-color: rgb(221, 221, 221);" width="173"><p><strong><span style="font-size: 14px;">更新时间</span></strong></p></td><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="201"><p><span style="font-size: 14px;">2022-06-29</span></p></td></tr><tr><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="122"><p><strong><span style="font-size: 14px;">CVE编号</span></strong></p></td><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="235"><p><span style="font-size: 14px;">CVE-2022-32532</span></p></td><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="183"><p><strong><span style="font-size: 14px;">其他编号</span></strong></p></td><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="206"><p><span style="font-size: 14px;">QVD-2022-10156</span></p></td></tr><tr><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="133"><p><strong><span style="font-size: 14px;">威胁类型</span></strong></p></td><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="233"><p><span style="font-size: 14px;">身份认证绕过</span></p></td><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="186"><p><strong><span style="font-size: 14px;">技术类型</span></strong></p></td><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="206"><p><span style="font-size: 14px;">授权不当</span></p></td></tr><tr><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="141"><p><strong><span style="font-size: 14px;">厂商</span></strong></p></td><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="230"><p><span style="font-size: 14px;">Apache</span></p></td><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="186"><p><strong><span style="font-size: 14px;">产品</span></strong></p></td><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="204"><p><span style="font-size: 14px;">Shiro</span></p></td></tr><tr><td colspan="4" style="word-break: break-all;padding: 5px 10px;border-color: rgb(221, 221, 221);" align="center" valign="middle"><p><strong><span style="font-size: 14px;">风险等级</span></strong></p></td></tr><tr><td colspan="2" align="center" valign="middle" style="padding: 5px 10px;border-color: rgb(221, 221, 221);"><p><strong><span style="font-size: 14px;">奇安信CERT风险评级</span></strong></p></td><td colspan="2" align="center" valign="middle" style="padding: 5px 10px;border-color: rgb(221, 221, 221);"><p><strong><span style="font-size: 14px;">风险等级</span></strong></p></td></tr><tr><td colspan="2" align="center" valign="middle" style="padding: 5px 10px;border-color: rgb(221, 221, 221);"><p><strong><span style="font-size: 14px;">中危</span></strong></p></td><td colspan="2" align="center" valign="middle" style="padding: 5px 10px;border-color: rgb(221, 221, 221);"><p><span style="color: rgb(12, 118, 240);"><strong><span style="color: rgb(12, 118, 240);font-size: 14px;">蓝色（一般事件）</span></strong></span></p></td></tr><tr><td colspan="4" align="center" valign="middle" style="padding: 5px 10px;border-color: rgb(221, 221, 221);"><p><strong><span style="font-size: 14px;">现时威胁状态</span></strong></p></td></tr><tr><td align="center" valign="middle" style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="147"><p><strong><span style="font-size: 14px;">POC状态</span></strong></p></td><td align="center" valign="middle" style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="228"><p><strong><span style="font-size: 14px;">EXP状态</span></strong></p></td><td align="center" valign="middle" style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="185"><p><strong><span style="font-size: 14px;">在野利用状态</span></strong></p></td><td align="center" valign="middle" style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="203"><p><strong><span style="font-size: 14px;">技术细节状态</span></strong></p></td></tr><tr><td align="center" valign="middle" style="padding: 5px 10px;word-break: break-all;border-color: rgb(221, 221, 221);" width="151"><p><strong><span style="font-size: 14px;color: rgb(255, 0, 0);">已发现</span></strong></p></td><td align="center" valign="middle" style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="227"><p><span style="font-size: 14px;">未发现</span></p></td><td align="center" valign="middle" style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="184"><p><span style="font-size: 14px;">未发现</span></p></td><td align="center" valign="middle" style="padding: 5px 10px;word-break: break-all;border-color: rgb(221, 221, 221);" width="202"><p><strong><span style="font-size: 14px;color: rgb(255, 0, 0);">已公开</span></strong></p></td></tr><tr><td style="word-break: break-all;padding: 5px 10px;border-color: rgb(221, 221, 221);" width="154"><p draggable="true"><strong><span style="font-size: 14px;">漏洞描述</span></strong></p></td><td colspan="3" style="padding: 5px 10px;border-color: rgb(221, 221, 221);word-break: break-all;"><p><span style="color: rgb(51, 51, 51);font-family: mp-quote, -apple-system-font, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;PingFang SC&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;font-style: normal;font-variant-ligatures: normal;font-variant-caps: normal;font-weight: 400;letter-spacing: normal;orphans: 2;text-align: left;text-indent: 0px;text-transform: none;widows: 2;word-spacing: 0px;-webkit-text-stroke-width: 0px;text-decoration-thickness: initial;text-decoration-style: initial;text-decoration-color: initial;float: none;font-size: 14px;display: inline !important;">当Apache Shiro中使用RegExPatternMatcher进行权限配置，且正则表达式中携带&#34;.&#34;时，未经授权的远程攻击者可通过构造恶意数据包绕过身份认证，导致配置的权限验证失效。</span></p></td></tr><tr><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="156"><p><strong><span style="font-size: 14px;">影响版本</span></strong></p></td><td colspan="3" style="padding: 5px 10px;border-color: rgb(221, 221, 221);"><p><span style="font-size: 14px;">Apache Shiro &lt; 1.9.1</span></p></td></tr><tr><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="157"><p><strong><span style="font-size: 14px;">不受影响版本</span></strong></p></td><td colspan="3" style="padding: 5px 10px;border-color: rgb(221, 221, 221);"><p><span style="font-size: 14px;">Apache Shiro &gt;= 1.9.1</span></p></td></tr><tr><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="158"><p><strong><span style="font-size: 14px;">其他受影响组件</span></strong></p></td><td colspan="3" style="padding: 5px 10px;border-color: rgb(221, 221, 221);"><p><span style="font-size: 14px;">无</span></p></td></tr></tbody></table>  
  
目前，奇安信CERT已成功复现**Apache Shiro 身份认证绕过漏洞(CVE-2022-32532)**，截图如下：  
  
![](https://mmbiz.qpic.cn/mmbiz_png/EkibxOB3fs48RKtmrmujicWrVS6jawBGD7DEAGbNt6b5uVlrvBkIREm1HAo72nmicG8LOkvcicnHBbibDRdzicI7RxJw/640?wx_fmt=png "")  
  
  
威胁评估  
  
<table><tbody><tr><td style="word-break: break-all;padding: 5px 10px;" width="15"><p><strong><span style="font-size: 14px;">漏洞名称</span></strong></p></td><td colspan="4" style="padding: 5px 10px;" width="479" align="center" valign="middle"><p><span style="font-size: 14px;">Apache Shiro身份认证绕过漏洞</span></p></td></tr><tr><td style="padding: 5px 10px;" width="56"><p><strong><span style="font-size: 14px;">CVE编号</span></strong></p></td><td align="center" valign="middle" style="padding: 5px 10px;" width="112"><p><span style="font-size: 14px;">CVE-2022-32532</span></p></td><td colspan="2" style="word-break: break-all;padding: 5px 10px;" width="221"><p><strong><span style="font-size: 14px;">其他编号</span></strong></p></td><td align="center" valign="middle" style="padding: 5px 10px;" width="104"><p><span style="font-size: 14px;">QVD-2022-10156</span></p></td></tr><tr><td style="padding: 5px 10px;" width="15"><p><strong><span style="font-size: 14px;">CVSS 3.1评级</span></strong></p></td><td align="center" valign="middle" style="padding: 5px 10px;" width="112"><p><span style="font-size: 14px;">高危</span></p></td><td colspan="2" style="padding: 5px 10px;" width="221"><p><strong><span style="font-size: 14px;">CVSS 3.1分数</span></strong></p></td><td align="center" valign="middle" style="padding: 5px 10px;" width="104"><p><span style="font-size: 14px;">8.2</span></p></td></tr><tr><td rowspan="8" style="padding: 5px 10px;" width="15"><p><strong><span style="font-size: 14px;">CVSS向量</span></strong></p></td><td colspan="2" align="center" valign="middle" style="word-break: break-all;padding: 5px 10px;" width="227"><p><strong><span style="font-size: 14px;">访问途径（AV）</span></strong></p></td><td colspan="2" align="center" valign="middle" style="padding: 5px 10px;"><p><strong><span style="font-size: 14px;">攻击复杂度（AC）</span></strong></p></td></tr><tr><td colspan="2" align="center" valign="middle" style="padding: 5px 10px;" width="308"><p><span style="font-size: 14px;">网络</span></p></td><td colspan="2" align="center" valign="middle" style="padding: 5px 10px;" width="105"><p><span style="font-size: 14px;">低</span></p></td></tr><tr><td colspan="2" align="center" valign="middle" style="word-break: break-all;padding: 5px 10px;" width="312"><p><strong><span style="font-size: 14px;">所需权限（PR）</span></strong></p></td><td colspan="2" align="center" valign="middle" style="padding: 5px 10px;" width="105"><p><strong><span style="font-size: 14px;">用户交互（UI）</span></strong></p></td></tr><tr><td colspan="2" align="center" valign="middle" style="padding: 5px 10px;" width="314"><p><span style="font-size: 14px;">不需要</span></p></td><td colspan="2" align="center" valign="middle" style="padding: 5px 10px;" width="105"><p><span style="font-size: 14px;">不需要</span></p></td></tr><tr><td colspan="2" align="center" valign="middle" style="word-break: break-all;padding: 5px 10px;" width="315"><p><strong><span style="font-size: 14px;">影响范围（S）</span></strong></p></td><td colspan="2" align="center" valign="middle" style="padding: 5px 10px;" width="105"><p><strong><span style="font-size: 14px;">机密性影响（C）</span></strong></p></td></tr><tr><td colspan="2" align="center" valign="middle" style="padding: 5px 10px;" width="315"><p><span style="font-size: 14px;">不变</span></p></td><td colspan="2" align="center" valign="middle" style="padding: 5px 10px;" width="105"><p><span style="font-size: 14px;">高</span></p></td></tr><tr><td colspan="2" align="center" valign="middle" style="word-break: break-all;padding: 5px 10px;" width="315"><p><strong><span style="font-size: 14px;">完整性影响（I）</span></strong></p></td><td colspan="2" align="center" valign="middle" style="padding: 5px 10px;" width="105"><p><strong><span style="font-size: 14px;">可用性影响（A）</span></strong></p></td></tr><tr><td colspan="2" align="center" valign="middle" style="padding: 5px 10px;" width="315"><p><span style="font-size: 14px;">低</span></p></td><td colspan="2" align="center" valign="middle" style="padding: 5px 10px;" width="105"><p><span style="font-size: 14px;">无</span></p></td></tr><tr><td style="padding: 5px 10px;" width="15"><p><strong><span style="font-size: 14px;">危害描述</span></strong></p></td><td colspan="4" style="padding: 5px 10px;word-break: break-all;" width="479"><p><span style="color: rgb(51, 51, 51);font-family: mp-quote, -apple-system-font, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;PingFang SC&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;font-style: normal;font-variant-ligatures: normal;font-variant-caps: normal;font-weight: 400;letter-spacing: normal;orphans: 2;text-align: left;text-indent: 0px;text-transform: none;widows: 2;word-spacing: 0px;-webkit-text-stroke-width: 0px;text-decoration-thickness: initial;text-decoration-style: initial;text-decoration-color: initial;float: none;font-size: 14px;display: inline !important;">当Apache Shiro中使用RegexPatternMatcher进行权限配置，且正则表达式中携带&#34;.&#34;时，未经授权的远程攻击者可通过构造恶意数据包绕过身份认证，导致配置的权限验证失效。</span></p></td></tr></tbody></table>  
  
处置建议  
  
目前Apache官方已发布此漏洞修复版本，建议用户尽快升级至Apache Shiro 1.9.1及以上版本。  
  
https://github.com/apache/shiro/releases/tag/shiro-root-1.9.1  
  
  
产品解决方案  
  
**奇安信网站应用安全云防护系统已更新防护特征库**  
  
奇安信网神网站应用安全云防护系统已全面支持对Apache Shiro 身份认证绕过漏洞（CVE-2022-32532）的防护。  
  
  
**奇安信开源卫士已更新**  
  
奇安信开源卫士20220629. 1114版本已支持对Apache Shiro身份认证绕过漏洞（CVE-2022-32532）的检测。  
  
  
参考资料  
  
[1]https://seclists.org/oss-sec/2022/q2/215  
  
[2]https://lists.apache.org/thread/y8260dw8vbm99oq7zv6y3mzn5ovk90xh  
  
  
时间线  
  
2022年6月29日，奇安信 CERT发布安全风险通告  
  
  
点击**阅读原文**  
到奇安信NOX-安全监测平台查询更多漏洞详情  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
