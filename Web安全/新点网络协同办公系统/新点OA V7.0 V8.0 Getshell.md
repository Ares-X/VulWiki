# 新点OA V7.0 V8.0 Getshell.md



## 漏洞利用



案例：溧阳市住房和城乡建设协同办公系统 8.0
登录地址：
http://58.215.56.61/OA/Login.aspx

[![登录.jpg](.resource/%E6%96%B0%E7%82%B9OA%20V7.0%20V8.0%20Getshell/media/01013610801d2d2008577bddf5757379b3c71cce.jpg)](http://wooyun.laolisafe.com/upload/201508/01013610801d2d2008577bddf5757379b3c71cce.jpg)


获取所有用户列表（厂商没修复）：
http://58.215.56.61/OA/ExcelExport/%E4%BA%BA%E5%91%98%E5%88%97%E8%A1%A8.xls

[![用户.png](.resource/%E6%96%B0%E7%82%B9OA%20V7.0%20V8.0%20Getshell/media/01013700988533cf95ff182144e9ff9a16b97b06.png)](http://wooyun.laolisafe.com/upload/201508/01013700988533cf95ff182144e9ff9a16b97b06.png)


使用burp，可以很轻易的跑出密码。
我们使用用户：lih 密码：11111登录。
然后找到如下上传地址：

[![上传.png](.resource/%E6%96%B0%E7%82%B9OA%20V7.0%20V8.0%20Getshell/media/0101375166edbcb7bca2ff9c8b1e8d3aee3d63c4.png)](http://wooyun.laolisafe.com/upload/201508/0101375166edbcb7bca2ff9c8b1e8d3aee3d63c4.png)


当然，7.0的也是在同样这个地方。
上传jpg后缀的asp一句话马，格式如下（注意看格式）：

[![命名.png](.resource/%E6%96%B0%E7%82%B9OA%20V7.0%20V8.0%20Getshell/media/0101393210e0097fcbff11bb1fbbf0cb7d1260e0.png)](http://wooyun.laolisafe.com/upload/201508/0101393210e0097fcbff11bb1fbbf0cb7d1260e0.png)


因为其他格式上传有可能遭到拦截，如图：

[![文件检查.jpg](.resource/%E6%96%B0%E7%82%B9OA%20V7.0%20V8.0%20Getshell/media/010140061ee7a4ef9182be1349a6ac55a9ef4be4.jpg)](http://wooyun.laolisafe.com/upload/201508/010140061ee7a4ef9182be1349a6ac55a9ef4be4.jpg)


再使用burp抓包，修改后缀为cer（注意，要修改2处地方）：

[![抓包.jpg](.resource/%E6%96%B0%E7%82%B9OA%20V7.0%20V8.0%20Getshell/media/01014116d872c31807a0accc5145dd075d649daf.jpg)](http://wooyun.laolisafe.com/upload/201508/01014116d872c31807a0accc5145dd075d649daf.jpg)


上传成功后，直接打开shell文件，即可看到地址。

[![地址.png](.resource/%E6%96%B0%E7%82%B9OA%20V7.0%20V8.0%20Getshell/media/01014215519a24dec8e5b482d120fce11305147f.png)](http://wooyun.laolisafe.com/upload/201508/01014215519a24dec8e5b482d120fce11305147f.png)


要成功连接shell，需要先用菜刀内置的浏览器登录一下系统，然后在连接，密码前面给过了。

[![内置浏览器.png](.resource/%E6%96%B0%E7%82%B9OA%20V7.0%20V8.0%20Getshell/media/01014409dd6fcb58dc3322197913b65404cff23c.png)](http://wooyun.laolisafe.com/upload/201508/01014409dd6fcb58dc3322197913b65404cff23c.png)



[![菜刀.png](.resource/%E6%96%B0%E7%82%B9OA%20V7.0%20V8.0%20Getshell/media/0101433423d92b926ff9cf8b4f85a789a6109335.png)](http://wooyun.laolisafe.com/upload/201508/0101433423d92b926ff9cf8b4f85a789a6109335.png)


下面的网站可以做验证：
http://61.183.36.24/oa8/ 8.0版本
http://61.132.114.180:8080/mail/login.aspx?loginid=%B0%AE%B5%C4&password=ad+&tj=%B5%C7+%C2%BD 7.0版本

[![客户.png](.resource/%E6%96%B0%E7%82%B9OA%20V7.0%20V8.0%20Getshell/media/010144487305199ba79e822bf79934a03cb3a57e.png)](http://wooyun.laolisafe.com/upload/201508/010144487305199ba79e822bf79934a03cb3a57e.png)