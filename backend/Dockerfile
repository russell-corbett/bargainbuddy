FROM node:20

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3001

CMD ["node", "index.js"]