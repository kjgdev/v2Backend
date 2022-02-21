FROM node:10

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY ./src .

# mo port tren docker
EXPOSE 9999

CMD [ "node","index.js" ]