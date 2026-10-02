---
cve: "CVE-2021-34619"
product: "WooCommerce Stock Manager WordPress plugin"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2021-34619"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "WooCommerce 库存管理器插件中的高危漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：victim administrator session and interaction; PHP execution in upload directory; fixed2.6.0 claimed"
side_effects: "未执行；本文需注意的操作影响：上传表单file及hidden输入的name属性缺失，与后端$_POST['upload']/$_FILES['uploadFile']不对应，示例不完整；仅说管理员点击链接，未说明跨站构造multipart文件上传所需浏览器机制和登录Cookie限制"
source_status: "recorded"
source_url: "https://mp.weixin.qq.com/s/60cG_ySte890v09ItNPRAg"
id: "vw-d1920fa1641bee45ffd7de0e"
entity_id: "ve-d1920fa1641bee45ffd7de0e"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：victim administrator session and interaction; PHP execution in upload directory; fixed2.6.0 claimed

- **证据待核（1）**：上传表单file及hidden输入的name属性缺失，与后端$_POST\['upload'\]/$_FILES\['uploadFile'\]不对应，示例不完整。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **凭据与会话边界（2）**：仅说管理员点击链接，未说明跨站构造multipart文件上传所需浏览器机制和登录Cookie限制。抓包中的会话不能视为未认证访问证明；可识别的真实会话值按中段星号遮罩处理，默认演示值和攻击语法保留。需重新取得授权测试会话，不能复用文中值。

- **代码与转录边界（3）**：源码在fgetcsv循环处截断，没有完整响应/触发请求。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

- **事实待核（4）**：总结突然称产品管理器，需统一为库存管理器；Wordfence原始公告链接缺失。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# WooCommerce 库存管理器插件中的高危漏洞

<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/60cG_ySte890v09ItNPRAg)

![](https://mmbiz.qpic.cn/mmbiz_png/OhKLyqyFoP9mJwX65uY3o0wwuMo2eWPeFuDIhxJlAjMcIicKFSYLVZ6fjicY0dNle24gfmiaVpwCcP2PeZuZyaRzw/640?wx_fmt=png)点击上方蓝字关注我们

概述


------

WooCommerce 库存管理器插件是一个 WooCommerce 扩展程序，该插件使网站所有者能够在一个页面上集中管理所有电子商务网站产品的库存和详细信息。该插件的功能之一是能够导出所有产品并导入新产品。

2021 年 5 月 21 日，Wordfence 安全团队发现 WooCommerce 库存管理器插件中存在漏洞，漏洞编号为 CVE-2021-34619，CVSS 评分为 8.8。该漏洞使攻击者可以将任意文件上传到易受攻击的站点，并实现远程代码执行。攻击者只需诱使站点管理员执行诸如单击链接之类的操作即可触发漏洞。

漏洞细节


--------

经过检查发现，该漏洞是由于插件没有正确检查导入造成的。由于插件中缺少对请求来源的验证，使得攻击者可以通过特制的上传请求，诱使网站管理员点击链接，触发漏洞，从而导致网站被入侵，同时对易受攻击的站点进行身份验证。

```
<form method="post" action="" class="setting-form" enctype="multipart/form-data"> 
    <table class="table-bordered">
      <tr>
        <th><?php _e('Upload csv file', 'woocommerce-stock-manager'); ?></th>
        <td>
          <input type="file" >
        </td>
      </tr>
    </table>
    <div class="clear"></div>
  <input type="hidden"  />
  <input type="submit" class="btn btn-info" value="<?php _e('Upload', 'woocommerce-stock-manager'); ?>" />
</form>  
<?php
if(isset($_POST['upload'])){
 
    $target_dir = STOCKDIR.'admin/views/upload/';
    $target_dir = $target_dir . basename( $_FILES["uploadFile"]["name"]);
    $uploadOk   = true;
 
    if (move_uploaded_file($_FILES["uploadFile"]["tmp_name"], $target_dir)) {
 
        echo __('The file '. basename( $_FILES['uploadFile']['name']). ' has been uploaded.','woocommerce-stock-manager');
 
        $row = 1;
        if (($handle = fopen($target_dir, "r")) !== FALSE) {
 
            while (($data = fgetcsv($handle, 1000, ',')) !== FALSE) {
                $num = count($data);
```

此外没有对上传进行验证，以确认它是 CSV 文件，或者至少不是恶意文件。这意味着任意文件类型都可以上传到站点，包括但不限于可用于获取远程代码执行的 PHP 文件。

成功利用此漏洞的攻击者，可以通过使用远程命令将 PHP webshell 上传到站点，从而完全接管易受攻击的 WordPress 网站。

为避免遭受跨站请求伪造攻击，网站所有者在点击来自未知来源的链接或附件时，应保持谨慎，即使这些链接位于自身站点的评论或表单提交中。

总结


------

本文中，披露了 WooCommerce 产品管理器中的一个漏洞，攻击者可以通过诱使站点管理员执行某个操作来触发该漏洞，该漏洞使攻击能够上传恶意文件以实现远程代码执行。该漏洞现已在 2.6.0 版中被修复，建议受影响的用户立即更新到最新版本。

![](https://mmbiz.qpic.cn/mmbiz_png/RQoDdorCu0V5znWFiaMBVWiaibdvAvmGeUvfC5LJ60x1Kq5wiaQ5UtMKEDcwQJ3ibicBdGBKxGs1V2AuZcg3ISoDto1g/640?wx_fmt=png)

  

END

  

![](https://mmbiz.qpic.cn/mmbiz_png/DQk5QiaQiciakarCFnYafgYGpNRiaX2oibtiawYX92ytrKp9MpmQeOqARcreRBybBX1fDbv2guZxExicn7f0wn2dkVwqw/640?wx_fmt=png)

好文！必须在看

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
