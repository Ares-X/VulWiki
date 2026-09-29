---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  BIND 9个安全漏洞允许攻击者绕过安全控制并导致服务器崩溃  
原创 网络安全9527
                    网络安全9527  安全圈的那点事儿   2026-03-29 05:32  
  
互联网系统联盟 (ISC) 发布了重要的安全公告，指出广泛使用的 BIND 9域名系统 (DNS)软件套件中存在三个新的漏洞。  
  
如果不加以修补，远程攻击者可以利用这些漏洞绕过访问控制列表、消耗过多的系统资源，甚至彻底崩溃 DNS 服务器。  
  
网络管理员必须立即应用提供的补丁来保护其基础设施，因为这些问题会影响权威服务器和 DNS 解析器。  
  
这些缺陷由 ISC 于 2026 年 3 月 25 日公开披露，给网络管理员带来了严重风险。  
## CPU负载过高和服务器崩溃  
  
三个漏洞中最严重的是 CVE-2026-1519，这是一个高危漏洞，可能导致拒绝服务 (DoS)攻击。  
  
当 BIND 解析器对恶意构造的区域执行 DNSSEC 验证时，会触发过多的 NSEC3 迭代。  
  
该过程会消耗大量 CPU 资源，并大幅降低服务器可以处理的查询数量。  
  
虽然禁用 DNSSEC 验证可以避免这个问题，但安全专家强烈建议不要使用这种解决方法。  
  
另一个中等严重程度的漏洞（编号为 CVE-2026-3119）会导致 named 服务器进程意外崩溃。  
  
当服务器处理包含 TKEY 记录的已正确签名查询时，就会发生这种情况。要成功利用此漏洞，攻击者必须拥有来自服务器配置中已声明密钥的有效事务签名 (TSIG)。  
  
管理员可以通过识别和删除任何已泄露或不必要的 TSIG 密钥来暂时降低这种风险。  
  
第三个漏洞 CVE-2026-3591 是一个中等严重性的堆栈返回后使用缺陷，该缺陷在 SIG(0) 处理代码中发现。  
  
攻击者通过发送精心构造的 DNS 请求，可以操纵服务器，使其错误地将 IP 地址与其访问控制列表 (ACL)进行匹配。  
  
如果网络依赖于默认允许的访问控制列表 (ACL)，则此漏洞可能导致未经授权的人员访问受限区域。  
  
目前尚无针对此特定漏洞的变通方法，因此直接打补丁是唯一的解决方案。  
  
<table><thead><tr style="box-sizing: border-box;"><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">CVE ID</span></font></font></th><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">CVSS评分</span></font></font></th><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">严重程度</span></font></font></th><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">影响</span></font></font></th><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">受影响版本</span></font></font></th></tr></thead><tbody><tr style="box-sizing: border-box;background-color: rgb(240, 240, 240);"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><strong style="box-sizing: border-box;font-weight: bold;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">CVE-2026-1519</span></font></font></strong></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">7.5</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">高的</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">CPU 负载过高（DoS 攻击）</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">9.11.0 至 9.16.50、9.18.0 至 9.18.46、9.20.0 至 9.20.20、9.21.0 至 9.21.19</span></font></font></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><strong style="box-sizing: border-box;font-weight: bold;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">CVE-2026-3119</span></font></font></strong></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">6.5</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">中等的</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">服务器崩溃（拒绝服务攻击）</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">9.20.0 至 9.20.20、9.21.0 至 9.21.19</span></font></font></td></tr><tr style="box-sizing: border-box;background-color: rgb(240, 240, 240);"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><strong style="box-sizing: border-box;font-weight: bold;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">CVE-2026-3591</span></font></font></strong></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">5.4</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">中等的</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">ACL 旁路</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">9.20.0 至 9.20.20、9.21.0 至 9.21.19</span></font></font></td></tr></tbody></table>  
目前，ISC尚未发现任何针对这些漏洞的活跃攻击。  
  
但是，考虑到这可能对全球 DNS 运营造成影响，各组织应优先将软件升级到最新的补丁版本。  
  
ISC 已在其支持的各个分支机构发布了更新，以彻底解决这些漏洞。  
  
根据当前部署情况，用户应过渡到已修补的版本 9.18.47、9.20.21 或 9.21.20。  
  
此外，使用BIND 支持预览版的合格客户应立即应用相应的 S1 补丁，以维持安全稳定的 DNS 操作。  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
