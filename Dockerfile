FROM node:14.17.1-alpine

WORKDIR /home/app

COPY package.json /home/app/
COPY package-lock.json /home/app/

RUN npm i -g npm

RUN npm ci

COPY . /home/app

RUN npm run build

ENV NODE_ENV production
ENV PORT 80
EXPOSE 80

CMD [ "npm", "start" ]
