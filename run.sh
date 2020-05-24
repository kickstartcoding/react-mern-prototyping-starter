#!/bin/bash

# This is a simple Bash script that will get both the front-end running and the
# backend running simultaneously

# Exit script if we encounter an error
set -e

# Include the .env.local file if it exists
if [[ -f .env.local ]]; then
  source .env.local
else
  echo ".env.local not found! Refer to README.md on how to"
  echo "create this file and include the connection info"
  echo "for MongoDB.    Exiting."
  exit 1
fi

# Kill all processes if exit (stackoverflow.com/questions/360201)
trap "trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT

# Get the back-end running in the background
./node_modules/.bin/nodemon server.js &

# Go into client directory and get frontend running
cd client/
npm run start

