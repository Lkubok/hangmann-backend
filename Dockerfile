FROM node:8.16.1    

WORKDIR /usr/src/app
COPY package.json .
RUN npm install    
COPY . .

CMD [ "npm", "start" ]
