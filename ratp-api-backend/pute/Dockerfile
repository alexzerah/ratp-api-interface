FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

ENV PORT 8080

EXPOSE 8080

ENV SECRET "kevinLoveU"
ENV DB_URL "mongodb+srv://admin:admin@cluster0-r5sbz.mongodb.net/users?retryWrites=true&w=majority"

CMD [ "npm", "start" ]
