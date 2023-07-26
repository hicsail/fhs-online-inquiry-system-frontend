FROM node:18-alpine as build

WORKDIR /app

COPY . .

ARG VITE_BACKEND_URL

ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

RUN npm install
RUN npm run build

FROM nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

CMD nginx -g 'daemon off;'