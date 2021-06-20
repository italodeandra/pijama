FROM node:14.17.1-alpine

WORKDIR /home/app

COPY package.json /home/app/
COPY package-lock.json /home/app/

RUN npm ci

COPY . /home/app

RUN npm run build

CMD [ "npm", "start" ]
