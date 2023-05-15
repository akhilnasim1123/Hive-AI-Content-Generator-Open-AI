FROM node:18.12.1-alpine

WORKDIR /app/frontend/
RUN npm install
COPY package*.json /app/frontend/

RUN npm i nodemon
RUN npm install http-proxy-middleware --save

COPY . /app/frontend/

EXPOSE 5000
CMD ["npm", "start"]