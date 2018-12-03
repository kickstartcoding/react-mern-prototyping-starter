#!/bin/bash

# This is a simple Bash script that will get both the front-end running and the
# backend running simultaneously

# Exit script if we encounter an error
set -e

if [[ -f .env.local ]]; then
  source .env.local
fi

# Get the front-end running in the background
node server.js &

# Go into client directory and get frontend running
cd client/
npm run start

