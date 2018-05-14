#!/usr/bin/expect -f

set SFTP_PASSWORD [lindex $argv 0]

# connect via scp
spawn ssh-add /tmp/sftp_rsa
#######################
expect {
  -re ".*passphrase.*" {
    exp_send "${SFTP_PASSWORD}\r"
  }
}
interact