FROM node:10.9.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# mo port tren docker
EXPOSE 9999

CMD [ "node","index.js" ]