FROM node:22.12.0-alpine3.21

WORKDIR /usr/src/app

COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

CMD ["npm", "run", "dev"]
