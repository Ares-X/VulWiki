---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  横跨数十年的漏洞与新型堆破坏：glibc 重大安全缺陷曝光  
看雪学苑
                    看雪学苑  看雪学苑   2026-01-19 10:03  
  
GNU C 库（glibc）维护团队近日披露了  
两项高危安全漏洞，涵盖堆破坏与信息泄露两类风险，波及绝大多数 Linux 系统。其中一款漏洞的存在时间可追溯至 glibc 2.0 版本，跨度长达数十年。  
  
  
虽然这两个漏洞可能引发堆破坏、地址空间布局随机化（ASLR）绕过等严重后果，但由于利用条件极为苛刻，其在实际攻击场景中的影响范围或受到限制。  
  
  
此次披露的漏洞中，  
危害等级更高的为CVE-2026-0861，其通用漏洞评分系统（CVSS）分值达 8.4 分。  
该漏洞源于 glibc 内存对齐函数 `memalign`、`posix_memalign` 和 `aligned_alloc` 中的整数溢出问题，影响范围覆盖 glibc 2.30 至 2.42 版本。  
  
  
攻击者若能强制应用程序传入特定参数组合，即可利用该溢出漏洞触发堆破坏。  
不过触发漏洞的条件十分严格：攻击者需同时控制尺寸与对齐两个参数，且尺寸参数需接近 `PTRDIFF_MAX` 的极大值。官方安全公告指出，这种参数调用属于“非常规使用模式”，因为对齐参数通常是页面大小这类固定值，而非可由用户操控的输入内容。  
  
  
另一漏洞  
CVE-2026-0915属于信息泄露缺陷，自 glibc 2.0 版本起便存在，影响范围覆盖至 2.42 版本，存续时间横跨数十年。  
该漏洞存在于 `getnetbyaddr` 与 `getnetbyaddr_r` 两个函数中，当系统配置 DNS 后端，且调用这两个函数查询“零值网络”（即 `net == 0x0`）时，函数会意外地将未经过滤的栈内存数据传递给 DNS 解析器。  
  
  
这种栈内容泄露行为会导致主机机密信息外泄，尽管泄露的数据仅限相邻栈空间，但攻击者可利用泄露的指针值，加速实现 ASLR 绕过攻击。与整数溢出漏洞类似，该漏洞的利用门槛同样很高，攻击者需能够监听应用程序与 DNS 服务器之间的通信，以捕获泄露数据，这也导致其攻击复杂度处于较高水平。  
  
  
目前，  
官方已建议系统管理员核查漏洞对自身所用 Linux 发行版的具体影响，并及时安装可用补丁。  
  
  
资讯来源  
：  
securityonline.info  
  
转载请注明出处和本文链接  
  
  
  
﹀  
  
﹀  
  
﹀  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/Uia4617poZXP96fGaMPXib13V1bJ52yHq9ycD9Zv3WhiaRb2rKV6wghrNa4VyFR2wibBVNfZt3M5IuUiauQGHvxhQrA/640?wx_fmt=jpeg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8Fjcl6q2ORwibt8PXPU5bLibE1yC1VFg5b1Fw8RncvZh2CWWiazpL6gPXp0lXED2x1ODLVNicsagibuxRw/640?wx_fmt=gif&from=appmsg "")  
  
**球分享**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8Fjcl6q2ORwibt8PXPU5bLibE1yC1VFg5b1Fw8RncvZh2CWWiazpL6gPXp0lXED2x1ODLVNicsagibuxRw/640?wx_fmt=gif&from=appmsg "")  
  
**球点赞**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8Fjcl6q2ORwibt8PXPU5bLibE1yC1VFg5b1Fw8RncvZh2CWWiazpL6gPXp0lXED2x1ODLVNicsagibuxRw/640?wx_fmt=gif&from=appmsg "")  
  
**球在看**  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
