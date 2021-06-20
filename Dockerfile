FROM node:14.17.1-alpine
RUN mkdir -p /usr/src/app
COPY . /usr/src/app
RUN npm install && npm cache clean --force && npm build
CMD [ "npm", "start" ]
