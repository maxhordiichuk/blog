FROM nginx

RUN apt-get update -qq && apt-get -y install apache2-utils

ARG APP_HOME
ARG HOST_NAME

RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

RUN mkdir log

COPY public public/
COPY docker/web/nginx.conf /tmp/docker.nginx

RUN envsubst '${APP_HOME},${HOST_NAME}' < /tmp/docker.nginx > /etc/nginx/conf.d/default.conf

CMD [ "nginx", "-g", "daemon off;" ]
