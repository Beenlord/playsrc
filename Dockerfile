FROM nginx:alpine AS nginx

COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

FROM node:20 AS node

RUN npm i pm2 -g

WORKDIR /app

COPY package*.json .

RUN npm ci

FROM node AS app

WORKDIR /app

COPY . .

RUN npm run build

CMD ["pm2-runtime", "ecosystem.config.cjs"]
