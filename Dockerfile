FROM node:10

ARG userId=1000
ARG groupId=1000

ENV DEBIAN_FRONTEND noninteractive
ENV HOME /src/node_modules/.home
RUN npm -g install npm \
  && mkdir -p /src/node_modules \
  && chown -R ${userId}:${groupId} /src

WORKDIR /src
