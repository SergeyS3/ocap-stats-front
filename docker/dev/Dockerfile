FROM node:22.12.0-alpine3.21

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci

CMD ["npm", "run", "dev"]
