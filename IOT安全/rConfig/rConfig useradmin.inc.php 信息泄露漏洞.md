---
version: "unknown"
source: "Threekiii/Awesome-POC"
id: "vw-befb4b1dbf1dd600057258ab"
entity_id: "ve-cd969d07bac7e294d4b2e743"
schema_version: "1"
title: "rConfig useradmin.inc.php 信息泄露漏洞"
product: "rConfig网络配置管理软件"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "未认证直接访问声明；数据库/分页依赖可用；版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/rConfig/rConfig%20useradmin.inc.php%20%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
canonical: "Web安全/服务器软件/rConfig/rConfig-useradmin.inc.php-信息泄露漏洞.md"
relation_type: "duplicate_of"
previous_version: "rConfig"
---

# rConfig useradmin.inc.php 信息泄露漏洞

> 版本字段校订（2026-10-04）：误填的版本字段原值逐字保存到对应 `previous_*` 字段。当前值区分正文声称的影响范围、实验环境与尚未知的范围；后文对该元数据误填的旧说明只描述校订前状态，未据此升级来源结论。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：rConfig网络配置管理软件
- 本文讨论：useradmin.inc.php直接暴露用户列表
- 版本、权限与配置前提：未认证直接访问声明；数据库/分页依赖可用；版本未知
- 资料类型：源码审计/信息泄露PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 源码选择username/email/userlevel/timestamp，不是密码泄露
- 鉴权缺失需结合包含文件/服务器路由核验，不能仅看当前片段
- 软件误归IoT；无版本、修复、具体原出处

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 路由/包含文件鉴权与版本待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


## 漏洞描述

rConfig useradmin.inc.php 存在信息泄露漏洞，通过访问文件获取用户邮箱信息和登录名

## 漏洞影响

```
rConfig
```

## 网络测绘

```
app="rConfig"
```

## 漏洞复现

出现漏洞的文件

```php
<?php
/* Includes */
require_once("../classes/db2.class.php");
include_once('../classes/paginator.class.php');

/* Instantiate DB Class */
$db2 = new db2();

// get timezone for later
$db2->query("SELECT timeZone FROM settings");
$result = $db2->resultsetCols();
$timeZone = $result[0];
date_default_timezone_set($timeZone);

/* Get Row count from users where NOT deleted */
$db2->query('SELECT COUNT(*) AS total FROM users WHERE status = 1');
$row = $db2->resultsetCols();
$result["total"] = $row[0];
/* Instantiate Paginator Class */
$pages = new Paginator;
$pages->items_total = $result['total'];
$pages->mid_range = 7; // Number of pages to display. Must be odd and > 3
$pages->paginate();
echo $pages->display_pages();
echo "<span class=\"\">" . $pages->display_jump_menu() . $pages->display_items_per_page() . "</span>";

/* GET all nodes records from DB */
$db2->query("SELECT id, username, userlevel, email, timestamp FROM users WHERE status = 1 $pages->limit");
$resultSelect = $db2->resultset();
// push rows to $itesm array
$items = array();
foreach ($resultSelect as $row) {
    array_push($items, $row);
}
/* Create Multidimensional array for use later */
$result["rows"] = $items;
$i = 0; # row counter  to enable alternate row coloring
?>

<table id="userAddTbl" class="tableSimple">
    <thead>
    <th rowspan="2"><input type="checkbox" disabled="disabled"/></th>
    <th rowspan="2">Username</th>
    <th rowspan="2">E-mail</th>
    <th rowspan="2">User Level</th>
    <th rowspan="2">Last Login</th>
</thead>
<tbody>
    <?php
    foreach ($result['rows'] as $rows):
        $id = $rows['id'];
        /* This bit just updates the class='row' bit with an alternating 1 OR 0 for alternative row coloring */
        echo '<tr class="row' . ($i++ % 2) . '">';
        ?>
    <td align="center"><input type="checkbox" name="tablecheckbox" id="<?php echo $id; ?>"/></td>
    <td align="center"><strong><?php echo $rows['username'] ?></strong></td>
    <td align="center"><?php echo $rows['email'] ?></td>
    <td align="center">
        <?php
        // quick check if userlevel =9 user is admin else, user is a User
        if ($rows['userlevel'] == 9) {
            $userlevel = "Admin";
        } else {
            $userlevel = "User";
        }
        echo $userlevel;
        ?></td>
    <td align="center">
        <?php
        // quick convert unix TimeStamp to normal times
        $lastLogin = date('H:i d-m-Y', $rows['timestamp']);
        echo $lastLogin;
        ?>
    </td>
    </tr>
<?php endforeach; ?>
</tbody>
</table>

<?php
echo $pages->display_pages();
echo "<div class=\"spacer\"></div>";
echo "<p class=\"paginate\">Page: $pages->current_page of $pages->num_pages</p>\n";
```

文件没有设定权限，任何人可以访问泄露信息

漏洞验证的Url为

```plain
/useradmin.inc.php
```

![](./.resource/rConfiguseradmin.inc.php信息泄露漏洞/media/202202162242982.png)

泄露用户信息


---

> 来源：Threekiii/Awesome-POC
