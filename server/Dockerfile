FROM node:18-alpine

WORKDIR /usr/src/app

COPY . .

ARG DATABASE_URL_DOCKER

ENV DATABASE_URL_DOCKER=${DATABASE_URL_DOCKER}

RUN npm install
RUN npx prisma generate
RUN npm run build

EXPOSE 3002

CMD npm run start:dev