# 上海迅饶自动化科技有限公司X2Modbus网关未授权访问漏洞

# 一、漏洞简介
X2Modbus是上海迅饶自动化科技有限公司开发的一款功能很强大的协议转换网关， 这里的X代表各家不同的通信协议， 2是To的谐音表示转换， Modbus就是最终支持的标准协议是Modbus协议。用户可以根据现场设备的通信协议进行配置，转成标准的Modbus协议。在PC端仿真运行无误后，上传到硬件协议转换网关。上海迅饶自动化科技有限公司X2Modbus网关未授权访问漏洞，<font style="color:rgba(0, 0, 0, 0.9);">无需登录，直接访问后台管理首页即可获得80%的后台管理权限</font>

# 二、影响版本
+ X2Modbus

# 三、资产测绘
+ fofa`server="SunFull-Webs" || icon_hash="-1384370370"`
+ 特征


# 四、漏洞复现
<font style="color:rgba(0, 0, 0, 0.9);">若是复现不成功，说明增加了部分鉴权，可以在cookie增加username=admin的项也可直接绕过登录界面。</font>

```java
/index.html
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gls8bg23feb5hiu7>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
