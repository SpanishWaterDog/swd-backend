#!/bin/bash

set -e

run() {
  echo $'\n######################################################################';
  echo "Deploying api, environment: $1";
  echo $'######################################################################\n';

  echo "\n######### Building... #########";
  yarn build;
  echo "######### Build completed #########\n";

  echo "\n######### Running migrations... #########";
  dotenv -e .env."$1" prisma migrate deploy;
  echo "######### Migrations completed #########\n";

  echo "\n######### Deploying serverless... #########";
  serverless deploy --stage "$1";
  echo "######### Serverless deployed successfully #########\n";
}

run "$@"