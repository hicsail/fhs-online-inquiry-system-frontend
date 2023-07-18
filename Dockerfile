FROM node:18 as build

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

FROM nginx

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

CMD ["nginx -g 'daemon off;'"]