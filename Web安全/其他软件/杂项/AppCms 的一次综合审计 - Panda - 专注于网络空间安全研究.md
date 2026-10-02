---
source: "MrWQ/vulnerability-paper"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "AppCms 的一次综合审计 - Panda - 专注于网络空间安全研究"
product: "AppCMS PHP应用"
record_type: "roundup"
document_type: "CMS多漏洞综合审计"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "本地PHP5.2.17且magic_quotes_gpc关闭用于NUL截断；匿名上传与模板包含组合，具体CMS版本缺失"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/AppCms%20%E7%9A%84%E4%B8%80%E6%AC%A1%E7%BB%BC%E5%90%88%E5%AE%A1%E8%AE%A1%20-%20Panda%20-%20%E4%B8%93%E6%B3%A8%E4%BA%8E%E7%BD%91%E7%BB%9C%E7%A9%BA%E9%97%B4%E5%AE%89%E5%85%A8%E7%A0%94%E7%A9%B6.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
source_url: "https://www.cnpanda.net/codeaudit/3.html"
id: "vw-5448f36fa122ce49961911fd"
entity_id: "ve-5448f36fa122ce49961911fd"
schema_version: "1"
---

# AppCms 的一次综合审计 - Panda - 专注于网络空间安全研究

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：AppCMS PHP应用
- 文献类型：CMS多漏洞综合审计
- 版本、权限及部署边界：本地PHP5.2.17且magic_quotes_gpc关闭用于NUL截断；匿名上传与模板包含组合，具体CMS版本缺失
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. pic.php使用readfile而不是include/require，不能执行PHP木马；正文把读取当文件包含RCE是核心技术错误
2. 所示代码Base64解码后未再次URL解码，percent编码绕php/NUL过滤并自动变文件名的推断缺中间处理；Base64不是加密
3. Content-Type image/php只影响客户端解释，不会让PHP解释器输出自身源码，所谓修改type直接下载源文件因果错误
4. 真实index.php模板require链受.php后缀/NUL版本约束，作者创建phpinfo后成功不能证明任意敏感文件读取；上传随机名是明确前提
5. 过滤对象为url尾扩展名，正文却称type限制四格式；代码和说明正则损坏且大量转义下划线/方括号不可运行
6. 两个XSS来自同一模板链且重复同图，需区分sink与可直接访问入口；输入过滤不是所有HTML上下文的充分修复
7. 保留原作者链接与失败SQLi观察，补精确版本/补丁；open_basedir不是通用修复，移除支付二维码

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://www.cnpanda.net/codeaudit/3.html>
- 原文参考链接（未重新核验）：<http://ksria.com/simpread/>
- 原文参考链接（未重新核验）：<https://github.com/MrWQ/vulnerability-paper>

### 归档技术正文

<meta name="referrer" content="no-referrer"/>
\> 本文由 \[简悦 SimpRead\](http://ksria.com/simpread/) 转码， 原文地址 \[www.cnpanda.net\](https://www.cnpanda.net/codeaudit/3.html)

进入六月以后，自己的时间也就充裕很多了。很多比赛结束、绿盟那边暂时也没有什么任务，就等着 7 月份去入职了。所以沉下心准备学点东西。于是就选择一位老哥审计过的源码，自己来审计一遍，看看自己的差距，也给自己增加点经验。再就是上次土司聚会就说会在土司发表一篇文章…… 所以潜水很多年的我来了。本文章是审计的一个 CMS 系统，比较乱，希望别介意。

我的审计思路一般是：-> 看目录摸清大体的框架 -> 找具体功能审计 -> 选择漏洞类型进行审计。

![](https://www.cnpanda.net/usr/uploads/2017/12/2359394904.png)  
图 1 主要目录 Tree

看目录很明显，有后台目录、缓存目录、数据储存目录、安装目录、插件目录以及手机版的目录。大体的目录了解了后，就开始正式的审计了。  
首先看下入口文件 index.php，发现很有趣，按照常规的入口文件，一般是引入核心文件什么的，而他直接就是将一些过滤代码写到了入口文件。

```
foreach ($\_GET as $k => $v) {
    $\_GET\[$k\] = htmlspecialchars($v);
}
$dbm = new db\_mysql();

if (isset($\_GET\['q'\])) {
    if (isset($\_GET\['act'\]) && $\_GET\['act'\] == 'hot') {
        if (trim($\_GET\['q'\]) == '') {
            $sql = "SELECT id,q,qnum FROM " . TB\_PREFIX . "search\_keyword LIMIT 15";
            $res = $dbm->query($sql);
            if (empty($res\['error'\]) && is\_array($res\['list'\])) {
                foreach ($res\['list'\] as $k => $v) {
                    $res\['list'\]\[$k\]\['q'\] = helper :: utf8\_substr($v\['q'\], 0, 20);
                }
                echo json\_encode($res\['list'\]);
                exit;
            } else {
                die();
            }
        }
    }
    
    if (strlen($\_GET\['q'\]) > 20) {
        $\_GET\['q'\] = helper :: utf8\_substr($\_GET\['q'\], 0, 20);
    }

    if (trim($\_GET\['q'\]) == '0' || trim($\_GET\['q'\]) == '') die('搜索词不能为0或空，请重新输入。点此 <a href ="' . SITE\_PATH . '">回到首页</a>');
    if (!preg\_match("/^\[{4e00}-{9fa5}{0}\]+$/u", $\_GET\['q'\])) {
        die('搜索词只允许下划线，数字，字母，汉字和空格，请重新输入。点此<a href ="' . SITE\_PATH . '">回到首页</a>');
    }


```

可以看出，系统做了两个过滤。一个是 htmlspecialchars($v)，另一个是 /^\[\\x{4e00}-\\x{9fa5}\\w {0}\]+$/u。前一个过滤是把预定义的字符 "<" 和 ">" 转换为 HTML 实体，后一个是用正则处理参数，使其只能输入下划线、数字、字母、汉字和空格。

继续看，下面的代码主要是加载分类板块，本以为没有什么希望在这个文件寻找出什么漏洞的时候，最后几段代码让我眼前一亮。

```
if (substr($tpl, strlen($tpl) - 4, 4) == '.php') {
    $tmp\_file = '/templates/' . $from\_mobile . '/' . $tpl;
} else {
    $tmp\_file = '/templates/' . $from\_mobile . '/' . $tpl . '.php';
}
if (!file\_exists(dirname(\_\_FILE\_\_) . $tmp\_file)) die('模板页面不存在' . $tmp\_file);
require(dirname(\_\_FILE\_\_) . $tmp\_file);


```

首先构建 php 文件，然后判断该 php 文件是否存在，如果不存在，直接 die，如果存在，引入该文件。没有任何过滤或者判断，很明显的文件包含漏洞！！于是测试查看 phpinfo 的信息。在根目录下创建了一个 phpinfo 文件。

![](https://www.cnpanda.net/usr/uploads/2017/12/3463860796.png)  
图 2 phpinfo 文件

然后根据代码，来构建 playload。

> [http://localhost/app/index.php?tpl=../../phpinfo&id=1](http://localhost/app/index.php?tpl=../../phpinfo&id=1)

![](https://www.cnpanda.net/usr/uploads/2017/12/3226718175.png)  
图 3 包含结果

成功读取。  
到这里有两个利用的思路。一是读取相关敏感信息，二是利用该漏洞上传文件带有一句话的文件，通过该包含漏洞进行链接菜刀。第一个尝试了一下，没有发现什么有效的敏感信息。后台什么的，都是 js 文件和 php 文件操作，这个包含也看不了什么信息，于是就把目光转向了第二个。既然是上传，肯定要找上传点，发现前台并没有什么上传点，于是尝试着后台，发现一个神奇的地方。

![](https://www.cnpanda.net/usr/uploads/2017/12/616036572.png)  
图 4 上传点

> app/upload/upload\_form.php?params=%7B%22inner\_box%22%3A%22%23ff1%22%2C%22func%22%3A%22callback\_upload\_resource%22%2C%22id%22%3A%221%22%2C%22thumb%22%3A%7B%22width%22%3A%22300%22%2C%22height%22%3A%22300%22%7D%2C%22domain%22%3A%22localhost%22%7D

这个上传点竟然没有上传权限限制，就是说只要知道这个地址，可以传任何图片、APK 文件到服务器上。然后查看了下 upload\_form.php 文件。果然如此，只是一个上传文件的格式判断以及传入参数判断，如果参数正确，就可以上传，没有验证访问者的权限。

```
 $upload\_server= SITE\_PATH."upload/";
    //上传安全验证字符串
    $verify=helper::encrypt(UPLOAD\_CODE.strtotime(date('Y-m-d H:i:s')),UPLOAD\_KEY);
    $params=$\_GET\['params'\];
    $params=preg\_replace('~(\\)~','"',$params);
$json=json\_decode($params);    


```

这就有意思了。  
于是结合上面的那个文件包含漏洞，上传一个含有一句话的图片，尝试获取 shell。

![](https://www.cnpanda.net/usr/uploads/2017/12/2394515347.png)  
图 5 一句话木马图片上传

PS：这里有个问题，就是图片上传后，文件名是随机的，实际操作的时候，可能要扫目录或者其他方法获取文件名。  
因为在服务器上储存的是 jpg 文件，如果直接访问的话，肯定是显示不存在模板，如下：

![](https://www.cnpanda.net/usr/uploads/2017/12/3253823070.png)  
图 6 尝试读取

随即自然的想起了 %00 截断。由于本地环境的 php 版本是 5.2.17<5.3.4，而且并没有开启 magic\_quotes\_gpc 所以是可以截断成功的。如下：

![](https://www.cnpanda.net/usr/uploads/2017/12/4027778262.png)  
图 7 %00 截断

> [http://localhost/app/index.php?tpl=../../upload/img/2017/06/11/](http://localhost/app/index.php?tpl=../../upload/img/2017/06/11/)  
> 593cc2106fd93.jpg%00&id=1

菜刀成功连接之。

![](https://www.cnpanda.net/usr/uploads/2017/12/865450976.png)  
图 8 菜刀连接

看完了入口文件，开始审计其他内容，首先从安装开始，很遗憾，并没有发现什么漏洞，想从注册和登陆这块审计，无奈这套系统又不存在这个功能，所以就开始了针对于漏洞的审计。发现根目录下的 pic.php 存在问题。代码如下：

```
if(isset($\_GET\['url'\]) && trim($\_GET\['url'\]) != '' && isset($\_GET\['type'\])) {
    $img\_url=trim($\_GET\['url'\]);
    $img\_url = base64\_decode($img\_url);
    $img\_url=strtolower(trim($img\_url));
    $\_GET\['type'\]=strtolower(trim($\_GET\['type'\]));
    
    $urls=explode('.',$img\_url);
    if(count($urls)<=1) die('image type forbidden 0');
    $file\_type=$urls\[count($urls)-1\]; 
    
    if(in\_array($file\_type,array('jpg','gif','png','jpeg'))){}else{ die('image type foridden 1');}

    if(strstr($img\_url,'php')) die('image type forbidden 2');

    if(strstr($img\_url,chr(0)))die('image type forbidden 3');
    if(strlen($img\_url)>256)die('url too length forbidden 4');

    header("Content-Type: image/{$\_GET\['type'\]}");
    readfile($img\_url);
    
} else {
    die('image not find£¡');
}


```

以 GET 的请求方式，传入两个参数：url 和 type，要求 url 参数必须是 base64 格式，然后系统经过转变成小写后进行判断验证。判断有很多，主要是判断 url 传入参数的长度、内容，如果长度大于 256 和小于等于 1，包含关键字 php、非标准化路径统统报错，并且 type 类型只能是 jpg/gif/png/jpeg。

程序编写者明显是有安全意识的。但是这里还是存在两个漏洞的，一个是文件包含漏洞，一个是文件下载漏洞。

上面的确是对 url 参数的做了几次验证，但是开发者忽略了编码转换。就是说，如果我们讲 %00、php 等类似的字符进行 url 编码转换以后，再进行 base64 加密，传入参数后，这几个验证是可以绕过的！

我们根据上面的文件包含漏洞来构建 playload。

> [http://localhost/app/pic.php?url=dXBsb2FkL2ltZy8yMDE3LzA2LzEwLzU5M2NjMjEwNmZkOTMlMmUlNzAlNjglNzAlMjUlMzAlMzAuanBn&type=jpg](http://localhost/app/pic.php?url=dXBsb2FkL2ltZy8yMDE3LzA2LzEwLzU5M2NjMjEwNmZkOTMlMmUlNzAlNjglNzAlMjUlMzAlMzAuanBn&type=jpg)

其中 dXBsb2FkL2ltZy8yMDE3LzA2LzEwLzU5M2NjMjEwNmZkOTMlMmUlNzAlNjglNzAlMjUlMzAlMzAuanBn 解密后是 upload/img/2017/06/10/593cc2106fd93%2e%70%68%70%25%30%30.jpg  
这里的 %2e%70%68%70%25%30%30 是. php%00。然后菜刀连接之。

![](https://www.cnpanda.net/usr/uploads/2017/12/1845191152.png)  
图 9 连接地址

![](https://www.cnpanda.net/usr/uploads/2017/12/3863456210.png)  
图 10 成功连接

还有一个漏洞就是 **header("Content-Type: image/{$\_GET\['type'\]}");**

这里我们只要构造 type 的类型不等于 in\_array() 中的任何一个条件，Content-Type：image/tpye 就会因为头文件错误导致无法正确解析源文件，造成直接下载源文件的现象。（大家可尝试在 php 的文件里加上 header("Content-Type: image/php"); 看看效果

继续看文件，发现了很多 XSS 漏洞，不过都是反射型的，这里就找两个说吧。

第一处：/templates/m/inc\_head.php

```
<input type="text" id="abc" class="search-txt" value="<?php if(isset($\_GET\['q'\])) echo $\_GET\['q'\];?>" />


```

很明显的 xss 漏洞，直接判断参数 q 是否存在，然后输出。

直接构建 playload：

> [http://localhost/app/templates/m/search.php?q](http://localhost/app/templates/m/search.php?q)\="/>&lt;script&gt;alert('xss')&lt;/script&gt;

成功触发漏洞。

![](https://www.cnpanda.net/usr/uploads/2017/12/3411965198.png)  
图 11 XSS 漏洞（1）

第二处：/templates/m/search.php

```
<title>ËÑË÷ <?php if(isset($\_GET\['q'\])) echo $\_GET\['q'\];?> - <?php echo SITE\_NAME;?></title>


```

同上，直接构造 playload：

> [http://localhost/app/templates/m/search.php?q=a<](http://localhost/app/templates/m/search.php?q=a%3C);/title>&lt;script&gt;alert('xss')&lt;/script&gt;

成功触发漏洞。

![](https://www.cnpanda.net/usr/uploads/2017/12/3411965198.png)  
图 12 XSS 漏洞（2）

最尴尬的是，inc\_head.php 这个文件是存在 xss 漏洞的，但是很多文件都引入了这个文件，也就导致了很多地方存在了此漏洞。

对于文件包含漏洞，可以设置类似白名单的方法，通过筛选固定文件名方法。这样一方面不必切断这个业务，另一方面又不会被轻易绕过，当然，也可以采用设置 open\_basedir 的方法来防御。

对于 XSS 漏洞，没什么好说的，本套系统之所以出现 XSS 漏洞，是因为没有类似于 PC 端那种直接使用正则进行参数验证，所以只要使用 Index.php 的那种过滤，是可以的。

这次审计对于自己算是一次进步和总结吧，最遗憾的是没有审计到 sql 注入漏洞，因为入口的那个正则过滤以及始终无法闭合双引号（双引号被转义成实体），所以始终没有注入成功。

有兴趣的可以下载这套系统审计看看，就当练手。最后，有不足的地方欢迎指出，我会听取各位大佬的意见。轻喷哈~

使用微信扫描二维码完成支付

![](https://www.cnpanda.net/usr/themes/sec/img/alipay-2.jpg)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
