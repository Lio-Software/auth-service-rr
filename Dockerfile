FROM node:21.7.2-alpine

RUN mkdir /app

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3001

CMD [ "npm", "run", "start:dev" ]
