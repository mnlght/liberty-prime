FROM node:16.14.0-alpine

ENV LOCALTIME Europe/Moscow

RUN ln -snf /usr/share/zoneinfo/$LOCALTIME /etc/localtime && echo $LOCALTIME > /etc/timezone

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
ARG REDIS_HOST
ARG REDIS_PORT
ARG FILES_DIR
ARG MAX_FILE_SIZE
ARG FILES_KEEP_ALIVE
ARG REDIS_FULL_CONNECT_URL
ARG BACK_UID

RUN set -ex && \
    mkdir -p /app && \
    chown -R node:node /app && \
    chown node:node /app

WORKDIR /app

USER node

COPY --chown=node:node app/. /app/

RUN npm ci

RUN npm run build

EXPOSE 3000

ENTRYPOINT ["npm", "run"]
