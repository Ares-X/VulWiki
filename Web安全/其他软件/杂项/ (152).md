---
cve: "CVE-2022-32230"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【已复现】Windows SMB拒绝服务漏洞(CVE-2022-32230)安全风险通告   
原创 QAX CERT  奇安信 CERT   2022-06-16 18:16  
  
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
  
  
  
  
近日，奇安信CERT监测到Windows SMB 拒绝服务漏洞细节及PoC在互联网公开，Windows SMB在处理请求的过程中存在空指针引用缺陷，未经身份验证的远程攻击者可通过向Microsoft Windows域控制器发送特制请求来利用此漏洞，从而导致目标系统拒绝服务。**目前，此漏洞细节及PoC已在互联网公开，经验证，此漏洞PoC稳定有效，未经身份验证的攻击者可利用此漏洞攻击默认配置的域控制器，攻击普通win10、win11主机用户需要经过身份认证。值得注意的是，微软已于2022年4月份修复了此漏洞，并于6月补丁日公开。**  
  
****  
<table><tbody><tr><td style="word-break: break-all;padding: 5px 10px;border-color: rgb(221, 221, 221);" width="82"><p><span style="font-size: 15px;"><strong>漏洞名称</strong></span></p></td><td colspan="3" style="padding: 5px 10px;border-color: rgb(221, 221, 221);"><p><span style="font-size: 15px;">Windows SMB 拒绝服务漏洞(CVE-2022-32230)</span></p></td></tr><tr><td style="word-break: break-all;padding: 5px 10px;border-color: rgb(221, 221, 221);" width="103"><p><span style="font-size: 15px;"><strong>公开时间</strong></span></p></td><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="231"><p><span style="font-size: 15px;">2022-06-14</span></p></td><td style="word-break: break-all;padding: 5px 10px;border-color: rgb(221, 221, 221);" width="177"><p><span style="font-size: 15px;"><strong>更新时间</strong></span></p></td><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="193"><p><span style="font-size: 15px;">2022-06-16</span></p></td></tr><tr><td style="word-break: break-all;padding: 5px 10px;border-color: rgb(221, 221, 221);" width="121"><p><span style="font-size: 15px;"><strong>CVE编号</strong></span></p></td><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="239"><p><span style="font-size: 15px;">CVE-2022-32230</span></p></td><td style="word-break: break-all;padding: 5px 10px;border-color: rgb(221, 221, 221);" width="187"><p><span style="font-size: 15px;"><strong>其他编号</strong></span></p></td><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="199"><p><span style="font-size: 15px;">QVD-2022-9180</span></p></td></tr><tr><td style="word-break: break-all;padding: 5px 10px;border-color: rgb(221, 221, 221);" width="132"><p><span style="font-size: 15px;"><strong>威胁类型</strong></span></p></td><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="236"><p><span style="font-size: 15px;">拒绝服务</span></p></td><td style="word-break: break-all;padding: 5px 10px;border-color: rgb(221, 221, 221);" width="190"><p><span style="font-size: 15px;"><strong>技术类型</strong></span></p></td><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="200"><p><span style="font-size: 15px;">空指针解引用</span></p></td></tr><tr><td style="word-break: break-all;padding: 5px 10px;border-color: rgb(221, 221, 221);" width="140"><p><span style="font-size: 15px;"><strong>厂商</strong></span></p></td><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="233"><p><span style="font-size: 15px;">Microsoft</span></p></td><td style="word-break: break-all;padding: 5px 10px;border-color: rgb(221, 221, 221);" width="190"><p><span style="font-size: 15px;"><strong>产品</strong></span></p></td><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="199"><p><span style="font-size: 15px;">Windows</span></p></td></tr><tr><td colspan="4" style="word-break: break-all;padding: 5px 10px;border-color: rgb(221, 221, 221);" align="center" valign="middle"><p><span style="font-size: 15px;"><strong>风险等级</strong></span></p></td></tr><tr><td colspan="2" align="center" valign="middle" style="word-break: break-all;padding: 5px 10px;border-color: rgb(221, 221, 221);"><p><span style="font-size: 15px;"><strong>奇安信CERT风险评级</strong></span></p></td><td colspan="2" align="center" valign="middle" style="padding: 5px 10px;border-color: rgb(221, 221, 221);"><p><span style="font-size: 15px;"><strong>风险等级</strong></span></p></td></tr><tr><td colspan="2" align="center" valign="middle" style="padding: 5px 10px;word-break: break-all;border-color: rgb(221, 221, 221);"><p><span style="color: rgb(255, 0, 0);font-size: 15px;">高危</span><span style="color: rgb(255, 0, 0);font-size: 15px;"></span></p></td><td colspan="2" align="center" valign="middle" style="padding: 5px 10px;border-color: rgb(221, 221, 221);"><p><span style="color: rgb(12, 118, 240);font-size: 15px;">蓝色（一般事件）</span></p></td></tr><tr><td colspan="4" align="center" valign="middle" style="word-break: break-all;padding: 5px 10px;border-color: rgb(221, 221, 221);"><p><span style="font-size: 15px;"><strong draggable="true">现时威胁状态</strong></span></p></td></tr><tr><td style="word-break: break-all;padding: 5px 10px;border-color: rgb(221, 221, 221);" align="center" valign="middle" width="146"><p><span style="font-size: 15px;"><strong>POC状态</strong></span></p></td><td align="center" valign="middle" style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="231"><p><span style="font-size: 15px;"><strong>EXP状态</strong></span></p></td><td align="center" valign="middle" style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="188"><p><span style="font-size: 15px;"><strong>在野利用状态</strong></span></p></td><td align="center" valign="middle" style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="197"><p><span style="font-size: 15px;"><strong>技术细节状态</strong></span></p></td></tr><tr><td align="center" valign="middle" style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="150"><p><span style="color: rgb(255, 0, 0);font-size: 15px;">已公开</span></p></td><td align="center" valign="middle" style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="230"><p><span style="color: rgb(255, 0, 0);font-size: 15px;">已公开</span></p></td><td align="center" valign="middle" style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="188"><p><span style="font-size: 15px;">未知</span></p></td><td align="center" valign="middle" style="padding: 5px 10px;border-color: rgb(221, 221, 221);" width="196"><p><span style="color: rgb(255, 0, 0);font-size: 15px;">已公开</span></p></td></tr><tr><td style="word-break: break-all;padding: 5px 10px;border-color: rgb(221, 221, 221);" width="153"><p><span style="font-size: 15px;"><strong>漏洞描述</strong></span></p></td><td colspan="3" style="padding: 5px 10px;border-color: rgb(221, 221, 221);"><p><span style="font-size: 15px;">Windows SMB在处理请求的过程中存在空指针引用缺陷，未经身份验证的远程攻击者可通过向Microsoft Windows域控制器发送特制请求来利用此漏洞，从而导致目标系统拒绝服务</span></p></td></tr><tr><td style="word-break: break-all;padding: 5px 10px;border-color: rgb(221, 221, 221);" width="155"><p><span style="font-size: 15px;"><strong>影响版本</strong></span></p></td><td colspan="3" style="padding: 5px 10px;border-color: rgb(221, 221, 221);"><p><span style="font-size: 15px;">Windows 10 Version 21H2 for x64-based Systems</span></p><p><span style="font-size: 15px;">Windows 10 Version 21H2 for ARM64-based Systems</span></p><p><span style="font-size: 15px;">Windows 10 Version 21H2 for 32-bit Systems</span></p><p><span style="font-size: 15px;">Windows 11 for ARM64-based Systems</span></p><p><span style="font-size: 15px;">Windows 11 for x64-based Systems</span></p><p><span style="font-size: 15px;">Windows 10 Version 20H2 for ARM64-based Systems</span></p><p><span style="font-size: 15px;">Windows 10 Version 20H2 for 32-bit Systems</span></p><p><span style="font-size: 15px;">Windows 10 Version 20H2 for x64-based Systems</span></p><p><span style="font-size: 15px;">Windows 10 Version 21H1 for 32-bit Systems</span></p><p><span style="font-size: 15px;">Windows 10 Version 21H1 for ARM64-based Systems</span></p><p><span style="font-size: 15px;">Windows 10 Version 21H1 for x64-based Systems</span></p><p><span style="font-size: 15px;">Windows Server 2019 (Server Core installation)</span></p><p><span style="font-size: 15px;">Windows Server 2019</span></p><p><span style="font-size: 15px;">Windows 10 Version 1809 for ARM64-based Systems</span></p><p><span style="font-size: 15px;">Windows 10 Version 1809 for x64-based Systems</span></p><p><span style="font-size: 15px;">Windows 10 Version 1809 for 32-bit Systems</span></p></td></tr><tr><td style="word-break: break-all;padding: 5px 10px;border-color: rgb(221, 221, 221);" width="156"><p><span style="font-size: 15px;"><strong>不受影响版本</strong></span></p></td><td colspan="3" style="padding: 5px 10px;border-color: rgb(221, 221, 221);"><br/></td></tr><tr><td style="word-break: break-all;padding: 5px 10px;border-color: rgb(221, 221, 221);" width="157"><p><span style="font-size: 15px;"><strong>其他受影响组件</strong></span></p></td><td colspan="3" style="padding: 5px 10px;border-color: rgb(221, 221, 221);"><p><span style="font-size: 15px;">无</span></p></td></tr></tbody></table>  
奇安信CERT已第一时间复现Windows SMB 拒绝服务漏洞(CVE-2022-32230)，测试版本为Windows Server 2019，攻击者无需身份认证即可导致默认配置的Microsoft Windows域控制器拒绝服务，复现截图如下：  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/EkibxOB3fs4ib03aalcxGtDzlK2NQb0icmV4pHjlQB13f0JiaoBKLXe8NibbCvxYUQcXHK8CSSTyJiaiaKkDIFiaJlYCEw/640?wx_fmt=png "")  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/EkibxOB3fs4ib03aalcxGtDzlK2NQb0icmVfHOgIcWUNh6ibEib7Aj12F9AP9upaKVDZPtse8nOyeZj1DuibgPBYPkWg/640?wx_fmt=png "")  
  
  
风险等级  
  
奇安信 CERT风险评级为：  
高危  
  
风险等级：  
蓝色（一般事件）  
  
  
威胁评估  
  
<table><tbody><tr><td style="word-break: break-all;padding: 5px 10px;border-color: rgb(221, 221, 221);" width="76"><p><span style="font-size: 15px;"><strong><span style="font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;">漏洞名称</span></strong></span></p></td><td colspan="4" style="padding: 5px 10px;border-color: rgb(221, 221, 221);" align="center" valign="middle" width="467"><p><span style="font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;font-size: 15px;">Windows SMB 拒绝服务漏洞(CVE-2022-32230)</span></p></td></tr><tr><td style="word-break: break-all;padding: 5px 10px;border-color: rgb(221, 221, 221);" width="68"><p><span style="font-size: 15px;"><strong><span style="font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;">CVE编号</span></strong></span></p></td><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" align="center" valign="middle" width="99"><p><span style="font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;font-size: 15px;">CVE-2022-32230</span></p></td><td colspan="2" style="word-break: break-all;padding: 5px 10px;border-color: rgb(221, 221, 221);" width="218"><p><span style="font-size: 15px;"><strong><span style="font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;">其他编号</span></strong></span></p></td><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" align="center" valign="middle" width="100"><p><span style="font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;font-size: 15px;">QVD-2022-9180</span></p></td></tr><tr><td style="word-break: break-all;padding: 5px 10px;border-color: rgb(221, 221, 221);" width="76"><p><span style="font-size: 15px;"><strong><span style="font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;">CVSS 3.1评级</span></strong></span></p></td><td style="padding: 5px 10px;border-color: rgb(221, 221, 221);" align="center" valign="middle" width="99"><p><span style="font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;color: rgb(255, 0, 0);font-size: 15px;">高危</span></p></td><td colspan="2" style="word-break: break-all;padding: 5px 10px;border-color: rgb(221, 221, 221);" width="218"><p><span style="font-size: 15px;"><strong><span style="font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;">CVSS 3.1分数</span></strong></span></p></td><td style="word-break: break-all;padding: 5px 10px;border-color: rgb(221, 221, 221);" align="center" valign="middle" width="100"><p><span style="font-size: 15px;"><strong><span style="font-size: 15px;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;">7.5</span></strong></span></p></td></tr><tr><td rowspan="8" style="word-break: break-all;padding: 5px 10px;border-color: rgb(221, 221, 221);" width="76"><p><span style="font-size: 15px;"><strong><span style="font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;">CVSS向量</span></strong></span></p></td><td colspan="2" style="word-break: break-all;padding: 5px 10px;border-color: rgb(221, 221, 221);" align="center" valign="middle" width="232"><p><span style="font-size: 15px;"><strong><span style="font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;">访问途径（AV）</span></strong></span></p></td><td colspan="2" style="padding: 5px 10px;border-color: rgb(221, 221, 221);" align="center" valign="middle"><p><span style="font-size: 15px;"><strong><span style="font-size: 15px;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;">攻击复杂度（AC）</span></strong></span></p></td></tr><tr><td colspan="2" style="padding: 5px 10px;border-color: rgb(221, 221, 221);" align="center" valign="middle" width="254"><p><span style="font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;font-size: 15px;">网络</span></p></td><td colspan="2" style="padding: 5px 10px;border-color: rgb(221, 221, 221);" align="center" valign="middle" width="141"><p><span style="font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;font-size: 15px;">低</span></p></td></tr><tr><td colspan="2" style="word-break: break-all;padding: 5px 10px;border-color: rgb(221, 221, 221);" align="center" valign="middle" width="254"><p><span style="font-size: 15px;"><strong><span style="font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;">所需权限（PR）</span></strong></span></p></td><td colspan="2" style="padding: 5px 10px;border-color: rgb(221, 221, 221);" align="center" valign="middle" width="141"><p><span style="font-size: 15px;"><strong><span style="font-size: 15px;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;">用户交互（UI）</span></strong></span></p></td></tr><tr><td colspan="2" style="padding: 5px 10px;border-color: rgb(221, 221, 221);" align="center" valign="middle" width="254"><p><span style="font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;font-size: 15px;">不需要</span></p></td><td colspan="2" style="padding: 5px 10px;border-color: rgb(221, 221, 221);" align="center" valign="middle" width="141"><p><span style="font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;font-size: 15px;">不需要</span></p></td></tr><tr><td colspan="2" style="word-break: break-all;padding: 5px 10px;border-color: rgb(221, 221, 221);" align="center" valign="middle" width="254"><p><span style="font-size: 15px;"><strong><span style="font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;">影响范围（S）</span></strong></span></p></td><td colspan="2" style="padding: 5px 10px;border-color: rgb(221, 221, 221);" align="center" valign="middle" width="141"><p><span style="font-size: 15px;"><strong><span style="font-size: 15px;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;">机密性影响（C）</span></strong></span></p></td></tr><tr><td colspan="2" style="padding: 5px 10px;border-color: rgb(221, 221, 221);" align="center" valign="middle" width="254"><p><span style="font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;font-size: 15px;">不变</span></p></td><td colspan="2" style="padding: 5px 10px;border-color: rgb(221, 221, 221);" align="center" valign="middle" width="141"><p><span style="font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;font-size: 15px;">无</span></p></td></tr><tr><td colspan="2" style="word-break: break-all;padding: 5px 10px;border-color: rgb(221, 221, 221);" align="center" valign="middle" width="254"><p><span style="font-size: 15px;"><strong><span style="font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;">完整性影响（I）</span></strong></span></p></td><td colspan="2" style="padding: 5px 10px;border-color: rgb(221, 221, 221);" align="center" valign="middle" width="141"><p><span style="font-size: 15px;"><strong><span style="font-size: 15px;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;">可用性影响（A）</span></strong></span></p></td></tr><tr><td colspan="2" style="padding: 5px 10px;border-color: rgb(221, 221, 221);" align="center" valign="middle" width="254"><p><span style="font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;font-size: 15px;">无</span></p></td><td colspan="2" style="padding: 5px 10px;border-color: rgb(221, 221, 221);" align="center" valign="middle" width="141"><p><span style="font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;font-size: 15px;">高</span></p></td></tr><tr><td style="word-break: break-all;padding: 5px 10px;border-color: rgb(221, 221, 221);" width="76"><p><span style="font-size: 15px;"><strong><span style="font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;">危害描述</span></strong></span></p></td><td colspan="4" style="word-break: break-all;padding: 5px 10px;border-color: rgb(221, 221, 221);" width="464"><p><span style="font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;font-size: 15px;">未经身份验证的远程攻击者可通过向Microsoft Windows域控制器发送特制请求来利用此漏洞，从而导致目标系统拒绝服务。攻击普通win10、win11主机用户需要经过身份认证。</span></p></td></tr></tbody></table>  
  
处置建议  
  
微软已于 2022 年 4 月份静默修复CVE-2022-32230漏洞，用户可参考以下方式将系统升级至最新版本（6月版本）：  
  
  
**使用奇安信天擎的客户可以通过奇安信天擎控制台一键更新修补相关漏洞，也可以通过奇安信天擎客户端一键更新修补相关漏洞。**  
  
  
也可以采用以下官方解决方案及缓解方案来防护此漏洞：  
  
**Windows自动更新**  
  
Windows系统默认启用 Microsoft Update，当检测到可用更新时，将会自动下载更新并在下一次启动时安装。还可通过以下步骤快速安装更新：  
  
1、点击“开始菜单”或按Windows快捷键，点击进入“设置”  
  
2、选择“更新和安全”，进入“Windows更新”  
  
3、选择“检查更新”，等待系统将自动检查并下载可用更新  
  
4、重启计算机，安装更新  
  
  
系统重新启动后，可通过进入“Windows更新”->“查看更新历史记录”查看是否成功安装了更新。对于没有成功安装的更新，可以点击该更新名称进入微软官方更新描述链接，点击最新的SSU名称并在新链接中点击“Microsoft 更新目录”，然后在新链接中选择适用于目标系统的补丁进行下载并安装。  
  
  
**手动安装补丁**  
  
另外，对于不能自动更新的系统版本，可参考以下链接下载适用于该系统的6月补丁并安装：  
  
https://msrc.microsoft.com/update-guide/releaseNote/2022-Jun  
  
  
  
产品解决方案  
  
**奇安信天眼检测方案**  
  
奇安信天眼新一代安全感知系统已经能够有效检测针对该漏洞的攻击，请将规则版本升级到3.0.0616.13394或以上版本。规则ID及规则名称：0x5e77，Windows SMB 拒绝服务漏洞(CVE-2022-32230)。奇安信天眼流量探针规则升级方法：系统配置->设备升级->规则升级，选择“网络升级”或“本地升级”。  
  
  
**奇安信网神网络数据传感器系统产品检测方案**  
  
奇安信网神网络数据传感器（NDS5000/7000/9000系列）产品，已具备该漏洞的检测能力。规则ID为：52488，建议用户尽快升级检测规则库至2206161600以后版本并启用该检测规则。  
  
  
参考资料  
  
[1]https://msrc.microsoft.com/update-guide/vulnerability/CVE-2022-32230  
  
  
时间线  
  
2022年6月16日，奇安信 CERT发布安全风险通告  
  
  
点击**阅读原文**  
到奇安信NOX-安全监测平台查询更多漏洞详情  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
