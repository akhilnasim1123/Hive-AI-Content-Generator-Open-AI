FROM node:18.12.1-alpine

WORKDIR /app/frontend/client/

COPY package*.json /app/frontend/client/
RUN npm install
RUN npm install http-proxy-middleware
RUN npm install react-scripts@5.0.1 -g 

COPY . /app/frontend/client/

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]