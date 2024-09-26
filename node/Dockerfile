FROM node:lts-alpine

WORKDIR /chromie

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN chmod +x entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]

CMD ["npm", "run", "start"]