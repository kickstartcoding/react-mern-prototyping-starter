#!/bin/bash

# This is a bash script that is run on Heroku after we deploy, and builds the
# React project. It's mentioned in the outer package.json

# Exit script if we encounter an error
set -e

# Go into client directory, install and get frontend building
cd client/
npm install
npm run build
