FROM node:18-14.1 AS build
WORKDIR /home/node/app
COPY . .
RUN yarn install && \
    yarn prisma generate && \
    yarn build

USER node

CMD [ "node", "dist/src/main"]