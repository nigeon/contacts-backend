FROM node:12-alpine

WORKDIR /app

COPY package*.json ./

RUN apk add --no-cache bash make gcc g++ python

RUN npm install

EXPOSE 1337