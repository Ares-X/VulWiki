---
cve: "CVE-2026-6722"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【高危漏洞预警】PHP SOAP扩展内存错误引用漏洞(CVE-2026-6722)  
jufeng
                    jufeng  飓风网络安全   2026-05-12 09:48  
  
![](https://mmbiz.qpic.cn/mmbiz_png/Yd9HAo0qc3qkAtAloibKDFgUhLeSibcx2hUdGuXH7dl9MicFdavxtooUuibYJNDqoXGVqSCUUzTsPHJDGQvACjTKuwRn8nmcd168VL9vMOQlWSw/640?wx_fmt=png&from=appmsg "")  
  
漏洞描述:  
  
PHP是一种广泛使用的开源通用脚本语言特别适合Wеb开发,可嵌入HTML中执行服务器端逻辑。其SOAP扩展使PHP能够创建和访问基于SOAP协议的Wеb服务实现跨平台应用程序之间的通信和复杂数据交换支持对象序列化和XML数据处理在受影响版本中,SOAP扩展的对象去重机制在全局映射中存储PHP对象指针时未正确增加引用计数,当处理包含重复键的арасhе:Mар节点时原始PHP对象被释放但其指针仍保留在映射中导致后续hrеf引用操作访问已释放内存,由于PHP字符串分配可能回收该内存区域,攻击者可通过构造恶意SＯAP请求利用此内存错误引用漏洞实现远程代码执行  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Yd9HAo0qc3ofghicoKRicicnaVNJVUiaSuqZ7tQmnZsBBGUdLq7a2T1ibgwtkRtdLR8FR9m4vqVictpKYTfHbwsfgicqqvJtFqkvEiblAQdFOVJp0ib4/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Yd9HAo0qc3qIm7licqFY45haQ7ylxtXsQYvqfhVW790xIBydRrPibEML9jBRtBvT85h2ylFBuuOoUKkrD8MnqLbC87qVhvA08yUmsHwH4hOcE/640?wx_fmt=png&from=appmsg "")  
  
攻击场景:  
  
攻击者可能利用SOAP扩展中的对象去重机制缺陷对系统进行攻击,具体而言,当处理包含重复键的php:Map 节点时,攻击者可以构造恶意的SOAP请求触发原始PHP对象被错误释放但指针仍保留在全局映射中。随后,后续操作尝试通过href 引用访问该已释放内存,若此时PHP字符串分配机制回收并复用了该内存地址攻击者即可通过精心构造的数据控制内存内容,进而实现远程代码执行或导致服务崩溃  
  
影响产品及版本:  
  
漏洞影响的产品为PHP解释器环境,受影响的特定版本范围包括:  
  
PHP 8.2.x 系列：8.2.0 ≤ PHP < 8.2.31  
  
PHP 8.3.x 系列：8.3.0 ≤ PHP < 8.3.31  
  
PHP 8.4.x 系列：8.4.0 ≤ PHP < 8.4.21  
  
PHP 8.5.x 系列：8.5.0 ≤ PHP < 8.5.6  
  
检测方法:  
  
检查PHP版本号确认是否在受影响范围内,监控SOAP请求日志中异常的apache:Map节点和重复键出现模式,使用AddressSanitizer等内存检测工具扫描PHP进程中的use-after-free异常,审计系统日志中异常的SOAP处理错误。  
  
修复建议:  
  
补丁名称:  
  
PHP SOAP扩展内存错误引用漏洞的补丁—更新至最新版本8.5.6  
  
文件链接:  
  
https://github.com/php/php-src/releases/tag/php-8.5.6  
  
立即升级到PHP 8.2.31、8.3.31、8.4.21或8.5.6及更高版本,若无法立即升级应禁用SOAP扩展或在网络层限制对SOAP服务的访问,仅允许受信任的客户端连接  
  
缓解方案:  
  
在不使用时禁用PHP的SOAP扩展通过防火墙或WAF限制对SOAP端点的网络访问,实施输入验证过滤包含重复键的арасhе:Mар结构,部署内存保护机制如ASLR和PIE增加利用难度  
  
建议措施:  
  
紧急升级补丁：建议所有受影响的用户立即将PHP版本升级至修复版本：PHP 8.2.31+、8.3.31+、8.4.21+ 或 8.5.6+。这是最根本的修复方案。  
  
临时缓解措施：若业务系统暂时无法重启或升级，应立即采取以下措施：  
  
禁用SOAP扩展：在php.ini配置文件中注释掉或移除extension=soap，重启Web服务以彻底消除攻击面。  
  
网络层隔离：如果必须使用SOAP服务，应在防火墙或WAF（Web应用防火墙）层面严格限制对SOAP端点的访问，仅允许受信任的内部IP或特定客户端连接，禁止公网直接访问。  
  
输入验证：在应用层增加对传入SOAP XML数据的深度校验，特别是要过滤或拒绝包含异常嵌套或重复键值的php:Map结构。  
  
监控与检测：  
  
部署IDS/IPS规则，监控HTTP流量中异常的SOAP请求，特别是那些包含大量重复键或特殊编码对象的请求。  
  
启用PHP的错误日志详细记录，关注包含“use-after-free”、“segmentation fault”或异常SOAP解析错误的日志条目。  
  
考虑在生产环境中启用AddressSanitizer（ASan）等内存调试工具进行测试环境的验证，或在关键节点部署内存保护机制（如ASLR、PIE）。  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
