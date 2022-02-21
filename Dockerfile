FROM node:10

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY package*.json ./

RUN npm install

COPY . /usr/src/app

# mo port tren docker
EXPOSE 9999

CMD [ "node","index.js" ]