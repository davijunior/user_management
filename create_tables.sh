#!/bin/bash
until mysql -h "mysql" -u "root" "-prootpassword" -e 'SHOW DATABASES;'; do
  echo "Aguardando o MySQL..."
  sleep 2
done

mysql -h "mysql" -u "root" "-prootpassword" user_registration < /docker-entrypoint-initdb.d/init.sql
