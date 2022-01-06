FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production
# RUN NODE_ENV=production npm run build
RUN npm run build

# Bundle app source
COPY . .

# ENV NODE_ENV production

EXPOSE 1337
CMD [ "npm", "start" ]