#!/usr/bin/expect -f

# connect via scp
echo "${SFTP_KEY}" | base64 --decode >/tmp/sftp_rsa
spawn scp -P ${SFTP_PORT} -i /tmp/sftp_rsa -r dist/demo/* ${SFTP_PORT}@${$SFTP_HOST}:~/public_html/react-virtualized-table-demo/
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