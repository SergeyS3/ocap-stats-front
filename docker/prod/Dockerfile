FROM node:22.12.0-alpine3.21 AS builder

WORKDIR /usr/src/app

COPY . .

RUN npm ci && npm run build 


FROM nginx:1.29.0-alpine3.22

COPY docker/prod/default.conf /etc/nginx/conf.d/
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
