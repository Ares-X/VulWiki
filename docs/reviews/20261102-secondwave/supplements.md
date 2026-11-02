# 第二波补漏：Nuclei / Metasploit 真实未读材料

检查日：2026-11-02。交付两篇原创正文 `yeswiki.md`、`siyuan.md`；不修改仓库，不执行任何来源代码。当前本地去重基线 09fb76eca271fb9419cbbc92c527616f8bc2d6a3，PR37 的 Node2Shell 追加材料不重复。

## 本批实际范围
前轮 Nuclei 321 提交、4386 唯一路径和 Metasploit 125 提交、119 路径为完整枚举边界，**不是全部正文审阅量**。本批在该未读池精读四个 Nuclei 模板（116205、116167、116006、59707）并追各自原始公告。新增正文限两项；不能把前轮 nomi 的1550路径或75链接计为有效PoC。

|候选|实际审阅与结论|本批处置|
|---|---|---|
|YesWiki CVE-2026-116205|官方GHSA 10月9日，CNA 10月25日。公开render/raw请求完整；固定旧源码的URL会追加wakka路径，不能误写任意原样URL。固定4.7.0 raw formatter和完整验证器核对。Nuclei是实际OAST请求，不证明内部秘密读取。|正文可收|
|SiYuan CVE-2026-116167|官方GHSA 10月9日，CNA 10月25日；有效登录是必要受害者交互。两固定版本query读取和两处登录成功sink及修复已核对。Nuclei本身仅HTTP源代码指纹；准入依赖公告完整交互步骤。|正文可收|
|Ruoyi-Vue-Pro CVE-2026-116006|模板两POST会发送验证码并签发真实会话，不是无副作用指纹。原作者gist的master-jdk17@7cab3a7241d1342728087b949d83c87edb9193d9报告9月21日、10月21日复查，称尚无修复。11月1日分支head 0b1889a8e88c82890762cceb2ae93abe6b18598e 的application.yaml仍begin-code/end-code=9999；仅配置不能证明当前所有利用前提仍成立。|待查：当前短信生成/消费/登录Java调用链、CNA精确映射与修复公告未完，未入正文；模板“升级最新版”不能当已证实修复|
|LocalAI CVE-2026-59707|原始issue10665为7月3日公开，具体/models/apply JSON及监听服务步骤可见；v3.0.0原作者条件。模板OAST仅证明外连，其4.6.0修复版本未核实。|待查：固定修复与发布映射未完，非最近7天首次披露，不入本批|
|Metasploit SPIP IDOR password reset|再次全文读取f4c423ab52b118f626d07f779e79c803c29dbde3模块210行及文档93行。低权限认证与论坛预览必要，提取签名表单后实际改密；成功判断未另登录验证。披露9月2日，超出本批热门30天补漏窗。|不重复当新发现；辅助库、依赖完整审计未完成，不提交正文|

不重复前轮 MLflow/Flowise/Ahsay/Cisco、Node2Shell；历史暂停项没有重开。未精读的其余Nuclei路径与Metasploit旧模块补丁仍属于未读积压，不宣称无合格项。

## 固定源码和审阅深度

Nuclei模板均固定 ca848f19b9ed1decd4b0ccfe6bc22304158f32fd：`http/cves/2026/CVE-2026-{116205,116167,116006,59707}.yaml`，本批四文件全文读取。无code/headless执行段、安装器、二进制或混淆下载执行。OAST请求和登录签发属于明示验证副作用，不混为针对操作者的窃密。

YesWiki 旧提交4ca3fb710d6d374b7aec5949126b457356b862db、修复标签v4.7.0提交bba4abccdf68476dde3d7119019139121849fb32：raw.php和render.php全文读取，wakka.php全文获取但仅相关raw inclusion完整分支精读。修复SsrfUrlValidator.php全文读取。PHP/cURL、产品全部依赖与工作流不作全审声明；公告仅单独请求材料，没有独立安装脚本或供应链。

SiYuan v3.8.6提交158812497497c6fa8a6d1031bfa2f025a61ee5c2、v3.8.7提交7a7430d8a3cf362e23de004a454ddabe651dc778：两份app/stage/auth.html完整获取，精读query、登录成功HTTP/WebSocket两sink及safeRedirectTarget；未执行页面脚本，不声称完整Go/Electron供应链审计。原始标题修改URL没有安装器、工作流或依赖。

Nuclei同固定版本MIT及两工作流此前本轮已审；文件在../vulwiki-20261102-hot-supplements/nuclei-{tests,template-sign}.yml。本批再次读取这两工作流：使用未固定SHA的GitHub Actions；安装Nuclei、验证、签名及对上游honey.scanme.sh的弱匹配测试，带上游签名/提交凭据的环境引用。未运行、未取得凭据，不把上游CI当本库可信可执行步骤。未逐个审完被调用Actions或引擎依赖。

## 原始资料及访问失败
- https://github.com/YesWiki/yeswiki/security/advisories/GHSA-x9j5-r988-9jcc
- https://github.com/siyuan-note/siyuan/security/advisories/GHSA-fmj3-xc2f-6w4w
- https://gist.github.com/Fulucky0-yuri/1ad8a1f166af7cb85c498473753a8636
- https://github.com/mudler/LocalAI/issues/10665
- CNA完整JSON本地见evidence/cna116205.txt、cna116167.txt（上游main快照，不伪称固定SHA）。

YesWiki不带v的4.7.0引用不可用，随后用v4.7.0成功解析；Ruoyi根recursive tree和错误猜测的yudao-module-system-biz路径未获得内容，随后contents确认模块实际直接src布局；不把错误路径失败算源码不存在。Ruoyi依赖的Java链尚未继续读取，本批按父任务要求保留待查。

正文为原创中文总结，源例字段未脱敏、未替换；不整篇翻译未单列许可GHSA。evidence/保留本批获取的15份原始模板、产品源码与CNA资料；抓取不等于全部逐行审计。没有远端提交或CI结论。

