---
schema_version: "1"
id: "VW-20261102-SVG-HUSH-XMLNS"
title: "svg-hush 与 xml 命名空间再序列化注入及修复版本边界"
product: "svg-hush；Rust xml crate"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "active"
version: "已核对 svg-hush 0.9.6 固定提交搭配锁定 xml 1.2.1；xml 1.3.0 标签中亦保留未转义分支；不推定所有历史版本或 Cloudflare 当前部署"
fixed_version: "已核对 xml 1.4.0 标签包含修复；svg-hush 0.9.7 将依赖下限提升至 xml 1.4；Changelog 对 1.3 的归类与标签源码存在冲突"
prerequisites: "攻击者可控制送入过滤器的 SVG；过滤结果被浏览器作为活动文档处理；完整 XSS 还依赖响应 CSP、浏览器与加载方式"
side_effects: "过滤器 CLI 可写指定输出文件；公开触发样本含 alert(1)，若作为活动 SVG 打开会尝试执行事件代码；完整托管链另涉及网络取图与导航"
source: "Kevin Gervot、Adam Kues / Searchlight Cyber；Cloudflare svg-hush；kornelski/xml-rs"
source_status: "recorded"
source_url: "https://www.slcyber.io/research/cache-me-if-you-can-xss-in-cloudflares-cdn-cgi-image"
verification_source: "https://github.com/kornelski/xml-rs/commit/0f084ec35f0c0f0e4f96bf4a962c38df2f5a3756"
index_category: "Web安全/开发框架"
---

# svg-hush 与 xml 命名空间再序列化注入

## 本文限定范围

2026-10-28，Kevin Gervot 与 Adam Kues 发表[Cloudflare 图像处理链研究](https://www.slcyber.io/research/cache-me-if-you-can-xss-in-cloudflares-cdn-cgi-image)。本文只收录其中可由公开源码、修复差异和完整回归输入对应的命名空间注入环节。它不同于 sanitize-svg 0.4.1 对嵌套根元素的事件检查遗漏，不能合并为同一实体。

披露时间不等于修复时间：下述组件补丁早在 2026-08-06 已提交。没有证据支持把它描述为当前所有 Cloudflare 网站的零日漏洞，也不把组件更新等同于已核实每个托管服务部署。

## 根因与固定源码

[svg-hush 820d3751d686a605a62a773b6f82ced1beed9efa](https://github.com/cloudflare/svg-hush/tree/820d3751d686a605a62a773b6f82ced1beed9efa)的 Cargo.toml 标为 0.9.6，Cargo.lock 固定 `xml` 1.2.1。过滤器验证元素解析后的 namespace 和名称，遍历普通 attributes 做允许列表检查；去除前缀时保留默认 namespace 元数据，再将该元数据交给 XML writer。

[xml 798543db49000767ff4dae131fd2a9ea5fe7310b](https://github.com/kornelski/xml-rs/tree/798543db49000767ff4dae131fd2a9ea5fe7310b)的 parser 把 `xmlns` 放入独立命名空间表，而非普通属性数组。writer 的 `emit_attributes` 使用属性转义器，但 `emit_current_namespace_attributes` 直接格式化 URI。因而实体解码后的引号可在重新输出时逃出 `xmlns` 属性；“普通属性已过滤”不能保证最终序列化结果仍无事件属性。

## 公开的具体触发材料

Cloudflare [2026-08-21 回归测试提交](https://github.com/cloudflare/svg-hush/commit/fba34edcbb9c58d855628a67032b43aed5f2b5bd)给出的完整 SVG 输入如下，保持原值：

```xml
<s:svg xmlns:s="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg&quot; onload=&quot;alert(1)"><rect/></s:svg>
```

该测试把输入字节交给 `Filter::new().filter`，输出写入内存，再检查序列化文本不出现带字面双引号的独立 `onload` 属性。这个判据检查的是属性边界，不能替代完整浏览器链结论。公开测试样本没有窃取数据或外联逻辑；其中事件代码仍属于活动内容，不能把直接打开输出视为只读文本检查。

xml 上游[补丁及 `xmlns_escaping_roundtrip` 测试](https://github.com/kornelski/xml-rs/commit/0f084ec35f0c0f0e4f96bf4a962c38df2f5a3756)另含完整实体编码的脚本插入输入，检查输出不产生脚本标签，并重新解析确认仍只有一个根元素。两份用例分别覆盖事件属性注入与标签注入，具有互补性。

## 修复核对及证据冲突

核对日期：2026-11-02。

1. xml [0f084ec35f0c0f0e4f96bf4a962c38df2f5a3756](https://github.com/kornelski/xml-rs/commit/0f084ec35f0c0f0e4f96bf4a962c38df2f5a3756)将默认及带前缀 namespace URI 的输出统一经过 `Escaped::<AttributeEscapes>::new(uri)`。
2. xml 1.4.0 标签解析至 [41949a759dada9493b29e0661b318f1960d1f849](https://github.com/kornelski/xml-rs/tree/41949a759dada9493b29e0661b318f1960d1f849)，已核对包含这两个转义分支。
3. svg-hush [4657507af38c0cd70be16c8753bc353dfe8c5389](https://github.com/cloudflare/svg-hush/commit/4657507af38c0cd70be16c8753bc353dfe8c5389)把版本提升至 0.9.7，依赖声明改为 `xml = "1.4"`，锁文件更新为 1.4.0。旧的 `xml = "1.2"` 是兼容范围，故不能仅凭 svg-hush 版本号忽略实际解析到的 xml 版本。
4. 上游 Changelog 把 xmlns 转义写在 Version 1.3 下，但 [1.3.0 标签 73c24eac0639a1e085269cf6c7b81b41cf1b9ad3](https://github.com/kornelski/xml-rs/blob/73c24eac0639a1e085269cf6c7b81b41cf1b9ad3/src/writer/emitter.rs)仍直接输出 URI。本文按固定标签源码记录，不把 Changelog 单独当作 1.3.0 已修复依据；亦不猜测未检查的中间补丁版本。

## 完整链与静态检查边界

原研究还结合 Chromium 对指定 `no-cache` 字段的缓存处理、导航行为与 Cloudflare Access 重定向。其 Netlify、对象存储扩展也有具体材料，但不由本文的组件核查推导出当前版本可利用或已修复。服务端部署、浏览器版本范围及该链各环节的修复状态需分别核对；不补造 CVE。

本次静态读取 svg-hush 四个源文件、直接依赖声明与锁文件、测试入口、fuzz 入口和 Makefile、工作流；并核对 xml 的相关 parser、writer、转义器、配置、包声明、工作流及补丁。CLI 的文件写入和 fuzz 的资源消耗是其显式功能，工作流会安装 Semgrep 并获取自动规则；这些不能描述为完全离线。未发现已读代码含与该问题无关的凭据搜集、持久化或外传。第三方依赖完整源码、Actions 实现、xml 所有模块及历史二进制测试资料未逐一审计，不将静态结论称为安全认证。

## 来源与许可

本文为原创中文技术整理，不逐句翻译 Searchlight 长文，不嵌入远程截图。上述单行输入来自 Cloudflare MIT 许可仓库的公开回归测试；代码权利归 Cloudflare, Inc.。xml 仓库声明 MIT 许可。完整原作者链、源码和测试以链接保留；图像证据本次未查看，本文事实依据为文本与固定源码。
