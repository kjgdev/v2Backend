FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY ./BE .

# mo port tren docker
EXPOSE 9999

CMD [ "node","index.js" ]