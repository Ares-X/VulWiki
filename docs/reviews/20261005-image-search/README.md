# 缺图的搜索恢复记录（2026-10-05）

继[离线图片归档](../20261005-offline-images/README.md)之后，对仍缺图的 31 篇文章执行搜索引擎检索。共记录 112 条检索式，按原题、作者、独特正文、原图文件名和 Git 路径寻找官方迁移页面、同文转载及公开归档。

本轮恢复 159 个原图片地址，补回 159 处正文图片和 19 处原图点击链接，涉及 15 篇文章。下载文件合计 36,406,963 字节；共享资源按内容 SHA-256 复用。仍有 101 处正文图片、10 处原图点击链接没有可靠副本，继续保留完整原引用和明确说明。

## 对应依据

- 奇安信 135 个图片地址：官方论坛迁移页保留文章、作者、附件文件名和正文顺序；新图床返回有效附件。[FastJson 系列](https://mdr.skyeye.qianxin.com/forum/share/2858)、[骑士 CMS](https://mdr.skyeye.qianxin.com/forum/share/455)、[Shiro](https://mdr.skyeye.qianxin.com/forum/share/2118)、[金山终端](https://mdr.skyeye.qianxin.com/forum/share/76)。
- GitHub 16 个地址：公开 fork 的[重命名提交](https://github.com/Jeromeyoung/Image/commit/66848dfd77dd3bf50444feba028fe7bd8d5f05bd)明确记录旧路径到新路径的迁移。逐项核对 `previous_filename`、新路径及下载文件的 Git blob SHA。
- MyuCMS 1 个地址、[小米文章](https://www.ol4three.com/2020/09/12/IOT/Exploit/小米/CVE-2019-18371-Xiaomi-Mi-WiFi-R3G-远程命令执行漏洞/) 2 个地址：原作者同文页面中的截图、文件名及相邻正文对应。MyuCMS 的恢复页为[原作者博客园文章](https://www.cnblogs.com/0daybug/p/12371904.html)。
- Cisco 1 个地址：[同文转载](https://www.iotsec-zone.com/article/354)保留 Xinruisec 作者水印，缺图前后正文逐字对应，邻图内容一致。保存转载服务器返回的 WebP 字节。
- Spark 4 个地址：[同文转载](https://blog.ytso.com/safety/222594.html)的相同技术段落和插图顺序对应。保存转载站提供的 JPEG 字节；原 PNG 已失效，无法比较其原始像素。中间另一张位置存在歧义，没有猜配。

近似漏洞分析、其他作者的实验截图、仅引用失效图床的 Markdown、透明懒加载占位图均未用作恢复图片。VMware 的同作者转载虽然保留目标图片文件名，实际位置仍是 1×1 占位 GIF，未采用。

## 记录与验收

- `recovered-images.jsonl.gz`：每项完整原 URL、原引用、恢复来源、下载 URL、本地资源、SHA-256、实际容器、尺寸、帧数及对应证据。
- `search-results.json.gz`：各分片实际检索式、查看的来源、未解决项及理由。压缩为无损 gzip；可以使用 `gzip -dc` 阅读。
- 修改只涉及缺图说明对应的图片引用，以及图片包裹链接的点击目标。逐项逆变换能还原每篇修改前的完整 SHA-256；正文解释、元数据和原有代码不改写，不脱敏。
- 每个新增资源检查原始字节 SHA-256、容器和完整解码；GIF 检查全部帧，排除已知防盗链提示图。图片没有本地缩放、重编码或重绘。
- 运行生成器检查索引、历史质量基线、离线资源检查、维护工具测试及 Docsify 5 静态渲染检查。历史质量警告继续报告，未重建基线。

本轮为公开资料和图片归档维护，没有执行文章中的 PoC、扫描器、载荷或访问示例目标；不是漏洞复现验收。
