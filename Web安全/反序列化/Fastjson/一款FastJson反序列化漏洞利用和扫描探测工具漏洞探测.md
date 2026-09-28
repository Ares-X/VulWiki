---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  一款FastJson反序列化漏洞利用和扫描探测工具|漏洞探测   
漏洞挖掘  渗透安全HackTwo   2024-04-11 00:01  
  
0x01 工具介绍   
          
fastjson漏洞批量检测工具，根据现有payload，检测目标是否存在fastjson或jackson漏洞（工具仅用于检测漏洞），若存在漏洞，可根据对应payload进行后渗透利用，若出现新的漏洞时，可将最新的payload新增至txt中（需修改格式），工具完全替代手工检测，作为辅助工具使用  
。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/RjOvISzUFq6QfQ4YjEIW66GHjSqQEpYAAnjpvIm0Q1UHtCHv80CykfR7nFfJ45dEGryouC9Mib0wH8CG7AFW4yw/640?wx_fmt=png&from=appmsg "")  
  
**下载地址在末尾**  
  
0x02 功能简介工具特点DNSlog检测自定义地址若出现dnslog回弹，可根据前面的编号去寻找对应的payload自1.4.0版本起，编号由7-9位的随机数字+字母组成随机地址需挂全局代理才能访问并申请资源，使用此功能将对发包速度产生较大影响。若存在dnslog回弹结果，将会生成/result/xxx_dnslog.html文件，没触发dnslog则不会生成该文件。LDAP检测若为内网环境/目标无法DNS解析时，可使用工具在本地/云服务器起一个LDAP服务https://github.com/WhiteHSBG/JNDIExploit将域名换成IP:端口即可（上图中使用的是8090作为LDAP服务端口）此时LDAP服务器可收到路径信息，可根据路径信息来定位触发漏洞的payload请求包检测若使用-req参数进行检测时，需要设置需要检测的变量值位置将请求中需要检测的位置替换为$payload$，其余位置不变，保存为req.txt（文件名任意）格式：POST /xxx HTTP/1.1Host: xxx$payload$然后通过-req指定该文件，根据请求包进行漏洞检测JsonExp -req req.txt -l xxx.xxx.xxx代理设置使用--proxy设置代理，可用于调试信息、绕waf等操作--proxy http://127.0.0.1:8080burpsuite中设置代理将工具的流量代理到burpsuite中（此工具不能适应所有的情况，可通过该方式对payload进行适当调整）0x03更新介绍更新内容如下：新增--dnslog参数，可申请dnslog资源进行检测（需挂全局代理，且对发包速度有影响）为了防止编号冲突，将编号更换为了7-9位随机参数数字+字母若使用--dnslog参数时，触发了dnslog，将输出/result/xxx_dnslog.html文件用于展示结果0x04 使用介绍命令使用参数别名作用例子-u--url指定目标url-u http://www.test.com-uf--urlfile指定目标url文档，每行一个url-uf url.txt-req--request指定请求包-req request.txt-to--timeout指定请求超时时长，默认为5秒-to 8-f--file指定payload文本路径，默认为template/fastjson.txt-f payload.txt-t--type指定HTTP请求类型，默认为post-t get-l--ldap指定ldap地址-l xxx.xxx.xxx:8080-r--rmi指定rmi地址-r xxx.xxx.xxx:8080-c--cookie指定cookie值--cookie "name=xxx;sessionid=xxxxx"-pro--protocol指定请求包所使用的协议，需结合-req参数使用，默认为http协议-req request.txt -pro https-proxy--proxy设置代理--proxy http://127.0.0.1:8080-dnslog--dnslog是否申请dnslog进行检测，默认为false（此功能需挂全局代理）--dnslog truewindows系统在JsonExp.exe目录打开cmd界面检测单个站点:JsonExp -u [目标] -l [LDAP服务地址]根据请求包检测单个站点：JsonExp -req [目标.txt] -l [LDAP服务地址]根据文本检测多个站点:JsonExp -uf [目标.txt] -l [LDAP服务地址]Linux系统添加权限:chmod +x JsonExp_linux检测单个站点:./JsonExp_linux -u [目标] -l [LDAP服务地址]根据请求包检测单个站点：./JsonExp_linux -req [目标.txt] -l [LDAP服务地址]根据文本检测多个站点:./JsonExp_linux -uf [目标.txt] -l [LDAP服务地址]Mac系统检测单个站点:./JsonExp_mac -u [目标] -l [LDAP服务地址]根据请求包检测单个站点：./JsonExp_mac -req [目标.txt] -l [LDAP服务地址]根据文本检测多个站点:./JsonExp_mac -uf [目标.txt] -l [LDAP服务地址]  
0x05 内部星球VIP介绍-V1.3更新啦！  
       学习更多挖洞技巧可加入**内部星球**可获得内部工具和享受内部资源，包含网上一些付费工具。详情直接点击下方链接进入了解，需要加入的直接点击下方链接了解即可，觉得价格高的师傅可后台回复"   
**星球** "有优惠券名额有限先到先得！内部  
包含网上需付费的0day/1day漏洞库，后续资源会更丰富在加入还是低价！  
  
  
**👉点击了解-->>内部VIP知识星球福利介绍V1.3版本-星球介绍**  
  
****  
结尾  
  
# 免责声明  
  
  
# 获取方法  
  
  
**公众号回复20240411获取下载地址******  
  
  
# 最后必看  
  
  
      
文章中的案例或工具仅面向合法授权的企业安全建设行为，如您需要测试内容的可用性，请自行搭建靶机环境，勿用于非法行为。如  
用于其他用途，由使用者承担全部法律及连带责任，与作者和本公众号无关。  
本项目所有收录的poc均为漏洞的理论判断，不存在漏洞利用过程，不会对目标发起真实攻击和漏洞利用。文中所涉及的技术、思路和工具仅供以安全为目的的学习交流使用。  
如您在使用本工具或阅读文章的过程中存在任何非法行为，您需自行承担相应后果，我们将不承担任何法律及连带责任。本工具或文章或来源于网络，若有侵权请联系作者删除，请在24小时内删除，请勿用于商业行为，自行查验是否具有后门，切勿相信软件内的广告！  
  
  
  
  
  
# 往期推荐  
  
  
**1.内部VIP知识星球福利介绍V1.3版本-星球介绍**  
  
**2. 最新BurpSuite2023.12.1专业版中英文版下载**  
  
[3. 最新Nessus2023下载Windows/Linux](http://mp.weixin.qq.com/s?__biz=Mzg3ODE2MjkxMQ==&mid=2247484713&idx=1&sn=0fdab59445d9e0849843077365607b18&chksm=cf16a399f8612a8f6feb8362b1d946ea15ce4ff8a4a4cf0ce2c21f433185c622136b3c5725f3&scene=21#wechat_redirect)  
  
  
[4. 最新xray1.9.11高级版下载Windows/Linux](http://mp.weixin.qq.com/s?__biz=Mzg3ODE2MjkxMQ==&mid=2247483882&idx=1&sn=e1bf597eb73ee7881ae132cc99ac0c8e&chksm=cf16a75af8612e4c73eda9f52218ccfc6de72725eb37aff59e181435de095b71e653b446c521&scene=21#wechat_redirect)  
  
  
[5. 最新HCL AppScan Standard 10.2.128273破解版下载](http://mp.weixin.qq.com/s?__biz=Mzg3ODE2MjkxMQ==&mid=2247483850&idx=1&sn=8fad4ed1e05443dce28f6ee6d89ab920&chksm=cf16a77af8612e6c688c55f7a899fe123b0f71735eb15988321d0bd4d14363690c96537bc1fb&scene=21#wechat_redirect)  
  
  
  
###### 渗透安全HackTwo  
  
  
微信号：关注公众号获取  
  
后台回复星球加入：  
知识星球  
  
扫码关注 了解更多  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/RjOvISzUFq6qFFAxdkV2tgPPqL76yNTw38UJ9vr5QJQE48ff1I4Gichw7adAcHQx8ePBPmwvouAhs4ArJFVdKkw/640?wx_fmt=png "二维码")  
  
  
  
喜欢的朋友可以点赞转发支持一下  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
