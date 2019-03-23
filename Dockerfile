FROM nikolaik/python-nodejs:python2.7-nodejs11

WORKDIR /myapp

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build


CMD [ "npm", "start" ]