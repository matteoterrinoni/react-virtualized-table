#!/usr/bin/expect -f

set SFTP_USER [lindex $argv 0]
set SFTP_PASSWORD [lindex $argv 1]
set SFTP_HOST [lindex $argv 2]
set SFTP_PORT [lindex $argv 3]

# connect via scp
spawn scp -P $SFTP_PORT -i /tmp/sftp_rsa -r dist/demo/* $SFTP_USER@$SFTP_HOST:~/public_html/react-virtualized-table-demo/
#######################
expect {
  -re ".*es.*o.*" {
    exp_send "yes\r"
    exp_continue
  }
  -re ".*sword.*" {
    exp_send "${SFTP_PASSWORD}\r"
  }
}
interact