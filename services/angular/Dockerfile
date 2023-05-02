FROM node:18-alpine

WORKDIR /app

COPY src/package*.json ./
RUN yarn

COPY src/ ./

RUN npm run build --configuration=production

CMD ["yarn", "start"]