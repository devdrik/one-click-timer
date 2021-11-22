FROM node:16.3.0-alpine as builder
WORKDIR /app
COPY package.json ./
RUN npm config set registry http://registry.npmjs.org/ && npm install
# RUN npm install
COPY . ./
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 81

ENTRYPOINT ["nginx", "-g", "daemon off;"]