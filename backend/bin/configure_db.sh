#!/bin/bash

echo "Configuring itemdb"

export PGPASSWORD='node_password'

dropdb -U node_user itemdb
create -U node_user itemdb 

psql -U node_user itemdb < ./bin/sql/generation.sql
psql -U node_user itemdb < ./bin/sql/item.sql
psql -U node_user itemdb < ./bin/sql/characteristics.sql
psql -U node_user itemdb < ./bin/sql/itemChar.sql
psql -U node_user itemdb < ./bin/sql/account.sql
psql -U node_user itemdb < ./bin/sql/accountItem.sql

node ./bin/insertChars.js

echo "itemdb configured"