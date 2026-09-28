```python
import sqlite3
import sys
import os
import shutil

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print("sql3 decode for sunfor")
        print("decode.py sql3db outfile_name")
        exit(0)

    db_path = sys.argv[1]
    out_path = sys.argv[2]
    new_db = out_path + ".sql3"
    out_file = out_path + '.txt'

    shutil.copyfile(db_path, new_db)

    conn = sqlite3.connect(db_path)
    conn2 = sqlite3.connect(new_db)
    print("Open database success")

    c = conn.cursor()
    cursor = c.execute("SELECT id, name, passwd from svpnuser;")

    c2 = conn2.cursor()
    print("select success start decode")
    pwd_list = ''
    for row in cursor:
        user_id = row[0]
        name = row[1]
        passwd = row[2]
        if not passwd:
            continue
        fp = os.popen("./a.out %s" % passwd, 'r')
        try:
            passwd = fp.read()
            fp.close()
        except Exception as e:
            print(e)
        pwd_list += name + ":" + passwd + '\n'
        c2.execute('UPDATE svpnuser SET passwd = "%s" where id = %d;'%(passwd, user_id))


    conn2.commit()


    print("decode success")
```

