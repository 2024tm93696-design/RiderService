#!/bin/bash
set -e

echo " Importing seedData.json into riderDB.riders..."
mongoimport --db riderDB --collection riders --file /docker-entrypoint-initdb.d/seedData.json --jsonArray
echo "Data import complete."
