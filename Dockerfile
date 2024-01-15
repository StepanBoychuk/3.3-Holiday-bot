FROM node:alpine

RUN npm install -g nodemon

COPY . /app

WORkDIR /app

RUN npm install

CMD ['npm', 'start:dev']