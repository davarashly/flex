FROM node:18-alpine

WORKDIR /app

COPY src/package*.json ./
RUN yarn

COPY src/ ./

EXPOSE 3000
CMD ["yarn", "start:dev"]