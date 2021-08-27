# build environment
FROM node:14.17.1
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
ENV PORT 80
COPY . /usr/src/app
RUN npm i -g npm@7.18.1
RUN npm install
RUN npm run build
EXPOSE 80
CMD ["npm", "start"]
