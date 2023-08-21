FROM node:14 as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm install -g http-server
EXPOSE 8090
ENTRYPOINT npx http-server -p 8090