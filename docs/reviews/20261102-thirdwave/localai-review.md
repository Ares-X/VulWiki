# LocalAI CVE-2026-59707 待查关闭记录

2026-11-02 05:23 UTC；建议准入 localai.md（历史补档1篇）。只读研究，无仓库写入、远端提交或CI结果。原披露2026-07-03，不计本周新漏洞。

已闭环：原始HTTP触发实际材料；旧构建空id队列至GET及错误message链；真修复2cbb3c96b34df1ca7b630c39cec2bb1a825d173f；v4.6.0发布说明和38350d363e8ee05872cad1cc3a0311fe55bf5b8b含修复，compare merge_base为修复commit/ahead5；v4.5.6固定02b007a31ee5c4ae849a1947f1ab63cd0fa75d90的gallery函数未含guard，固定raw与先取tagraw字节相同。

纠错：CNA Patch Commit f9b968e实际只改GPU文档、是受影响测试版本；CNA<=4.3.1不是完整安全边界。旧版本函数名prepareModel/GetGalleryConfigFromURL，与原issue引用的新版installModelFromRemoteConfig/GetGalleryConfigFromURLWithContext分开。Nuclei仅DNS+入队条件，而修复guard也DNS解析，不能作为可信修复判别器。

未做/未覆盖：不执行代码或访问示例IP；未全审产品构建脚本、所有Go模块/模型后端/发布二进制。PoC自身只有标准库监听和curl，没有独立安装依赖工作流。Nuclei同固定ca848模板和前轮工作流审阅适用，但不认证引擎全依赖。未创建新绕过EXP或确认新CVE，重定向/DNS固定边界仅静态提示。

原始证据evidence/完整保存；获取整文件不等于整文件精读：gallery及uri仅对应读取/URL解析/客户端函数精读；旧endpoint/services/models、utils/urlfetch、httpclient、修复diff/tests全文读取。原issue API全文亦保留。CNA为main抓取快照，非固定SHA；compare仅用于祖先关系，不称完整5commit文件审计。猜测pkg/utils/ssrf.go返回404，后通过contents找到urlfetch.go，未把错误路径当修复缺失。

去重：本地09fb76eca271fb9419cbbc92c527616f8bc2d6a3三个内容目录精确CVE检索无正文命中；最终父任务需在最新远端master/开放PR复核。Ruoyi未顺带扩展，保持上一批待查；不冒称补完4386路径。
