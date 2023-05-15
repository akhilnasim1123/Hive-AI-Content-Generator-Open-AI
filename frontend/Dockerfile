FROM node:18.12.1-alpine

WORKDIR /app/frontend/

COPY package*.json /app/frontend/
RUN npm install
RUN npm i nodemon
RUN npm install http-proxy-middleware --save

COPY . /app/frontend/
CMD ["npm", "start"]