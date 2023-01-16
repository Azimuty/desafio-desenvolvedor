FROM alpine:latest
LABEL author="Renato"
WORKDIR  /var/www
COPY . .

RUN apk add --update nodejs npm

RUN npm install
RUN npm audit fix --force

ENTRYPOINT npm run server
EXPOSE 8080