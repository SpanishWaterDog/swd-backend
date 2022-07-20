#!/bin/bash

DBNAME="swd-test"

set -e

run() {
  echo $'\n######################################################################';
  echo 'Test database recreation';
  echo $'######################################################################\n';

  echo $'Removing db...';
  mysql -udeveloper -pdeveloper -h 127.0.0.1 -e "DROP SCHEMA IF EXISTS \`$DBNAME\`;"

  echo $'Creating db...';
  mysql -udeveloper -pdeveloper -h 127.0.0.1 -e "CREATE SCHEMA \`$DBNAME\` DEFAULT CHARACTER SET utf8;"

  echo 'Migrating...';
  ./node_modules/.bin/dotenv -e .env.test npx prisma migrate reset;

  echo $'\n';
  echo 'Migration OK!'
}

run "$@"