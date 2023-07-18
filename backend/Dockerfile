FROM node:18-alpine

WORKDIR /backend

COPY package*.json ./
COPY prisma ./prisma/
COPY tsconfig.json ./
COPY . .

RUN npm install
RUN npx prisma generate

EXPOSE 3002

CMD npm run start:dev