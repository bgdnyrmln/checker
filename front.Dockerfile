FROM node:20-alpine

WORKDIR /app

COPY front/package*.json ./
RUN npm ci

COPY front/ ./

RUN npm run build

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
