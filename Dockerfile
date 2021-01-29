FROM node:10.15.2 as build-deps
WORKDIR /usr/src/app
ADD package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:stable-alpine

COPY nginx-conf/nginx.conf /etc/nginx/nginx.conf
COPY --from=build-deps /usr/src/app/build /var/www
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
