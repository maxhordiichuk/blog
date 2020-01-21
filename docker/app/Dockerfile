FROM ruby:2.7.0

RUN apt-get update -qq \
    && apt-get install -y build-essential libpq-dev \
    # Install nodejs
    && curl -sL https://deb.nodesource.com/setup_10.x | bash - \
    && apt-get install -y nodejs \
    # Install yarn
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update \
    && apt-get install -y yarn

ARG APP_HOME
ENV APP_HOME $APP_HOME

RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

COPY . .

RUN gem install bundler

RUN chmod 755 run_server.sh
