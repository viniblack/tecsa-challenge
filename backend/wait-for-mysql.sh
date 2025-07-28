#!/bin/sh
set -e

host="$1"
shift
cmd="$@"

until mysql -h "$host" -u root -p"$DB_PASSWORD" -e 'SELECT 1'; do
  >&2 echo "MySQL ainda não está disponível - aguardando..."
  sleep 2
done

>&2 echo "MySQL está disponível - iniciando aplicação"
exec $cmd
