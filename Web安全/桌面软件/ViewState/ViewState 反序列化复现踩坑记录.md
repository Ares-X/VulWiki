---
source: "MrWQ/vulnerability-paper"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "ViewState 反序列化复现踩坑记录"
product: "ASP.NET Web Forms ViewState"
record_type: "analysis"
document_type: "配置教程与复现踩坑"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "需要应用接受攻击者可控ViewState且MAC校验关闭或密钥已知；实际.NET/IIS/补丁与应用池权限未明确"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/ViewState/ViewState%20%E5%8F%8D%E5%BA%8F%E5%88%97%E5%8C%96%E5%A4%8D%E7%8E%B0%E8%B8%A9%E5%9D%91%E8%AE%B0%E5%BD%95.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
version_unverified: "web.config文件中的enableViewStateMac（.NET≤4.5）："
source_url: "https://mp.weixin.qq.com/s/uwnD1CkkhyDd5XcQS_kPZw"
id: "vw-04d3a22857bef32b18df6b4f"
entity_id: "ve-04d3a22857bef32b18df6b4f"
schema_version: "1"
---

# ViewState 反序列化复现踩坑记录

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：ASP.NET Web Forms ViewState
- 文献类型：配置教程与复现踩坑
- 版本、权限及部署边界：需要应用接受攻击者可控ViewState且MAC校验关闭或密钥已知；实际.NET/IIS/补丁与应用池权限未明确
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. frontmatter版本字段实际是配置小标题，不能作为版本范围
2. 示例控件未设置ID，代码却引用TextArea1/Label1，示例不能直接编译；enableViewState=false与仍处理恶意状态的关系没有解释
3. MAC完整性与加密保密性混淆，未加密并不等于可伪造；IIS版本决定自动加密的说法需纠正核验
4. 称Java ysoserial适用于该链混淆平台；伪造高权限令牌、应用池默认高权限及土豆提权并不是ViewState漏洞自动成立的结果
5. 安全建议要求多节点共享显式machineKey，示例却用AutoGenerate,IsolateApps；全局关闭安全校验应限定隔离实验并提供恢复说明
6. 结尾同时改了Base64填充和目标路径后成功，无法归因于等号；需隔离表单编码、路径权限等变量
7. 保留踩坑过程但补精确环境、应用身份、原始响应、工具版本及来源；截图未视检

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://mp.weixin.qq.com/s/uwnD1CkkhyDd5XcQS_kPZw>
- 原文参考链接（未重新核验）：<http://ksria.com/simpread/>
- 原文参考链接（未重新核验）：<http://www.w3.org/1999/xhtml>
- 原文参考链接（未重新核验）：<https://github.com/pwntester/ysoserial.net>
- 原文参考链接（未重新核验）：<https://github.com/MrWQ/vulnerability-paper>

### 归档技术正文

<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/uwnD1CkkhyDd5XcQS_kPZw)<table data-mpa-powered-by="yiban.io"><tbody><tr><td width="557" valign="top" height="62"><section><strong>声明：</strong>该公众号大部分文章来自作者日常学习笔记，也有部分文章是经过作者授权和其他公众号白名单转载，未经授权，严禁转载，如需转载，联系开白。</section><section>请勿利用文章内的相关技术从事非法测试，如因此产生的一切不良后果与文章作者和本公众号无关。</section></td></tr></tbody></table>

现在只对常读和星标的公众号才展示大图推送，建议大家把潇湘信安 “设为星标”，否则可能看不到了！

某师傅遇到的一个 ViewState 反序列化提权遇到些问题，看到他在群里和其他几个师傅在交流就去问了下啥情况，然后我 @尧哥就给我分享了他的这篇笔记，哈哈，感谢分享！！！

图片是我后边本地测试后补的，也记录了遇到的一些坑，大家可作为了解学习之用，仅供参考！！！

**0x00 背景**

在 ASP.NET 应用程序中，`ViewState`是一种用于存储页面状态的机制，常被用于存储用户表单数据、控件状态等信息。然而，`ViewState`中的信息经过序列化后保存在页面上，如果开发者没有对其进行签名或加密，那么攻击者可以通过修改`ViewState`数据来执行恶意代码，甚至提权。

**0x01 环境搭建**

我们先搭建一个简单的`ViewState`反序列化漏洞测试环境，在测试机上安装好 IIS 并选择`.NET`相关选项使其支持. NET 脚本，源码用的网上师傅公开的，copy 到 web 目录下即可。

**hello.aspx**

```
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="hello.aspx.cs" Inherits="hello" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
 <head runat="server">
  <title></title>
 </head>
 <body>
   <form runat="server">
    <asp:TextBox TextMode="multiline" Columns="50" Rows="5" runat="server" />
    <asp:Button runat="server" OnClick="Button1_Click"
    Text="GO"/>
    <br />
    <asp:Label runat="server"></asp:Label>
   </form>
 </body>
</html>

```

**hello.aspx.cs**

```
using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text.RegularExpressions;
using System.Text;
using System.IO;
public partial class hello : System.Web.UI.Page
{
  protected void Page_Load(object sender, EventArgs e)
{
  }
 protected void Button1_Click(object sender, EventArgs e)
{
   Label1.Text = TextArea1.Text.ToString();
  }
}

```

![](https://mmbiz.qpic.cn/sz_mmbiz_png/XOPdGZ2MYOcgCmjt82D0Vsksic8TnUUKEbtHiaicJvOMne1duibJnbWmYV62lIwR7J7n1cZ0WggfHtpsUZXH8pNs4g/640?wx_fmt=png&from=appmsg)

  

然后再禁用下`ViewStateMac`，可通过以下 3 种方式来禁用，不同`.NET`版本的禁用方式不太一样，这里我只是简单记录下，方便复现测试就行。

```
web.config文件中的enableViewStateMac（.NET≤4.5）：
<pages enableViewStateMac="false" />
web.config文件添加一个appSettings配置项（NET≥.4.5.2）:
<appSettings><add key="aspnet:AllowInsecureDeserialization" value="true" /></appSettings>
注册表禁用ViewStateMac（0:禁用，1:启用）（.NET≥.4.5.2）:
reg add "HKLM\SOFTWARE\Microsoft\.NETFramework\v4.0.30319" /v AspNetEnforceViewStateMac /t REG_DWORD /d 0 /f
需在数据包中删除VIEWSTATEENCRYPTED场景：
enableViewStateMac=false，viewStateEncryptionMode=Always

```

![](https://mmbiz.qpic.cn/sz_mmbiz_png/XOPdGZ2MYOcgCmjt82D0Vsksic8TnUUKEOWKAEqMCkS5fIlRPuCPEecpsspBicXjw02GZUnDicSAH8KIKZUN62cvQ/640?wx_fmt=png&from=appmsg)

  

**0x02 攻击准备**

**获取目标网站的 ViewState 信息：**

访问目标网站的一个页面，打开浏览器的开发者工具，查找 HTML 源代码中的`ViewState`字段。通常该字段以`<input type="hidden" >`的形式存在。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/XOPdGZ2MYOcgCmjt82D0Vsksic8TnUUKEVfhCGduFreXyzzx1jGBNm1zxarpibSNg8Phb8wyuSlsYTUG7qmKywPQ/640?wx_fmt=png&from=appmsg)

**ViewState 插件安装：**

viewstate-editor 是一个可查看和编辑`ViewState`的 BurpSuite 插件，低版本 1.7 默认自带该插件，新版 2021 需在`Extender`->`BApp Store`安装（**注：**安装不了时需上墙安装）。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/XOPdGZ2MYOcgCmjt82D0Vsksic8TnUUKEdIiaEb05Dv92OVejMNRI2I9d9j3wPCx8eEyF55QWKLEBw4Fk2cXJOlg/640?wx_fmt=png&from=appmsg)

**ViewState 插件使用：**

BurpSuite 设置好监听并开启抓包，访问测试地址 http://192.168.1.110/hello.aspx 提交数据包，然后点击这插件的`ViewState`，如果是`MAC is not enabled`说明`ViewStateMac`已禁用。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/XOPdGZ2MYOcgCmjt82D0Vsksic8TnUUKEcU3rhE8icJAqmO3ib25W4ODlzcO4w7sDm6Krlq2XGU9QAaGqkCHjdLiaA/640?wx_fmt=png&from=appmsg)

**解码 ViewState 内容：**

ViewState 默认是`Base64`编码的字符串，使用常见的工具（如：BurpSuite 的 Decoder 或 Python 脚本）将其解码，得到序列化后的对象内容，如配置启用加密后则需要 Key 才能解。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/XOPdGZ2MYOcgCmjt82D0Vsksic8TnUUKE2SDgqbqEHdjRYts9YiaDOBGxHE4HMibLmdlDx0icz6WJm4Al7Eer5EpBw/640?wx_fmt=png&from=appmsg)

**0x03 攻击过程**

**第一步：查找不安全的 ViewState 配置**

检查 ASP.NET 应用的`web.config`配置文件，寻找与`ViewState`相关的设置，尤其是`ViewStateEncryptionMode`属性是否为`Auto`或`Never`。

此外，如果应用程序未配置 MAC 签名`EnableViewStateMac="false"`，那么 ViewState 是不安全的，可以被攻击者篡改。

> Always：所有的 ViewState 数据都会被加密
> 
> Never：ViewState 数据永远不会加密
> 
> Auto：默认值，只有部署在 IIS7 或更高版本上且应用程序没有配置任何加密密钥时，ViewState 才会加密

**web.config**

```
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.web>
        <pages enableViewState="false" enableViewStateMac="false" viewStateEncryptionMode="Never" enableEventValidation="false" />
        <!--<machineKey decryption="AES" decryptionKey="DFE6143111640695FE6398BEFE11EE8C250948A3260E19BE" validation="SHA1" validationKey="55539B16C368A79B8DAC4994F6F5B627292EBF3AC940543215EE612EE4FCE1DDB07A2F25144016043D5BE349DA5074F5CA2BDF1DF2EE6BE0E475D2BED6DCE2E3" />-->
    </system.web>
    <!--<appSettings>
        <add key="aspnet:AllowInsecureDeserialization" value="true" />
    </appSettings>-->
</configuration>

```

![](https://mmbiz.qpic.cn/sz_mmbiz_png/XOPdGZ2MYOcgCmjt82D0Vsksic8TnUUKEpdId3Bh9RBibgDbreFg7JbZunZib7LXsQ1uu5vmEA0ic4vNT43JurmiavA/640?wx_fmt=png&from=appmsg)

利用`BurpSuite`或`Postman`工具发出修改后的请求，观察是否可以通过篡改后的`ViewState` 提交数据，并成功反序列化执行。

**第二步：构造恶意 Payload 进行反序列化**

**构造恶意对象：**

使用工具如`ysoserial.net`或`ysoserial`（适用于 Java 的 ViewState 反序列化攻击）来生成恶意的`ViewState`载荷，内置恶意命令或脚本。例如：

*   https://github.com/pwntester/ysoserial.net
    

```
ysoserial.exe -o base64 -g TypeConfuseDelegate -f LosFormatter -c "echo 123 > C:\ProgramData\2\testing.txt"

```

![](https://mmbiz.qpic.cn/sz_mmbiz_png/XOPdGZ2MYOcgCmjt82D0Vsksic8TnUUKEsfYOIquZsjOibONMqicMovrmt2SHbTSjvsnufENeVRqPu0weEiafn3dEQ/640?wx_fmt=png&from=appmsg)

**替换 ViewState：**

将生成的载荷替换原始页面的`ViewState`字段，然后将整个请求通过 HTTP 工具发送给服务器。此时如果服务器的`ViewState`签名和验证不安全，则会执行恶意对象内的代码。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/XOPdGZ2MYOcgCmjt82D0Vsksic8TnUUKEwfCdwvDicPBq22kHsZFIP1mIB4ywQ5cKaNOdicW68aggnPX8jjDWmD7Q/640?wx_fmt=png&from=appmsg)

如果使用生成的恶意`ViewState`载荷成功进行反序列化攻击后会在`C:\ProgramData\2\`这个目录下创建一个`testing.txt`文本文件，其内容为`123`。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/XOPdGZ2MYOcgCmjt82D0Vsksic8TnUUKEKFj0QKcqADTwSZ7hibvLcLZHHgHko9IIDh8FVKXQP6JAXlU5F8S5Pkw/640?wx_fmt=png&from=appmsg)

**第三步：利用提权**

**提升权限：**

由于 ASP.NET 应用通常运行在`NETWORK SERVICE`账户下，攻击者可以使用反序列化的权限扩展漏洞（例如，将`ViewState`中的对象替换为高权限用户的`token`）来尝试执行系统命令，访问敏感文件，或直接获得应用程序的管理权限。  

这里推荐下 @Rcoil 师傅的`SharpViewStateKing`利用工具，已将`ViewState`反序列化的多种场景实现自动化，并且完成了命令执行、文件管理以及. NET 内存执行等常用功能，我们可以使用`Load Assembly`加载`.NET`土豆提升权限。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/XOPdGZ2MYOcgCmjt82D0Vsksic8TnUUKEUCWmp8ia0JbNcrLwkpanKIh5GEwQoycAR6wkTpeXh0jJnvDMxiaaYOkw/640?wx_fmt=png&from=appmsg)

**持久化攻击：**

一旦获得更高权限的`shell`，我们就可以进一步在服务器上创建后门账户，设置持久的`shell`或利用工具进行内网横向移动等。

**0x04 防御措施**

**强制启用 ViewState 签名和加密：**

在`web.config`文件中，确保`ViewStateEncryptionMode` 设置为`Always`，并将`EnableViewStateMac`设置为`true`，这些措施可以阻止未授权的篡改和反序列化攻击。  

**使用 ASP.NET 验证密钥：**

设置一个强大的验证密钥（`validationKey`），并确保`machineKey`配置在 Web 服务器之间共享以防止篡改。  

**限制反序列化的对象：**

尽量避免将敏感对象存储在`ViewState`中，并在应用程序中禁用反序列化不受信任的对象。  

**web.config 示例代码：**

以下代码展示了`ViewState`配置文件中的一些安全设置。

```
<system.web>
    <pages enableViewState="true" viewStateEncryptionMode="Always" enableEventValidation="true" />
    <machineKey validationKey="AutoGenerate,IsolateApps" decryptionKey="AutoGenerate,IsolateApps" validation="SHA1" />
</system.web>

```

**0x05 踩坑记录**

记录下我在本地测试遇到的坑，看了很多文章都是将文件写到`C:\Windows\temp`临时目录下，但我在测试时就死活写不进去，这里坑了我很久，原以为是环境有问题，测试了几台机器都这样，使用原应用池和新建应用池以及修改为`SYSTEM`权限还是写不进去......，`SharpViewStateKing`倒是可以正常连接，不知道大家有没有遇到过这个问题，还是遇到了没人记录这个问题......。

最后我是使用`ysoserial.net`重新生成了一个不带`==`的载荷换了`C:\ProgramData\2`目录才写进去，这里测试只要带`=`也写不进去。这个问题实在没辙放弃挣扎了（不在一个点上浪费太多时间），大家如果遇到以下两种情况时可参考着解决吧，不行别喷我...0.0...！！！

> 1.  当前用户或目录权限问题导致 C:\Windows\Temp 写不进文件，可尝试更好其他可读写目录；
>     
> 2.  ysoserial.net 生成的 base64 反序列化载荷存在 == 时写不进去，可尝试修改写入字符或路径；
>

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
