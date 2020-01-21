#!/bin/bash

# Exit on fail
set -e

cd $APP_HOME
export NODE_ENV=${RAILS_ENV}

rm -f tmp/pids/server.pid

# Dependencies
bundle install --jobs 20 --retry 5 --without development test --path=vendor/bundle
yarn install

# App deploy
bundle exec rake db:create
bundle exec rake db:migrate
bundle exec rake assets:precompile

exec bundle exec puma
