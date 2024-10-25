FROM node:20 as base

WORKDIR /home/node/app

COPY package*.json ./

RUN npm i

COPY . .

FROM base as production

ENV NODE_PATH=./build

# Generate Prisma client
RUN npx prisma generate

# Run migrations
RUN npm run migrate

CMD ["node", "index.js"]