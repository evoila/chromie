# Stage 1: Build the application
FROM node:lts AS builder

WORKDIR /ideal-train

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:lts

ENV NODE_ENV=production

WORKDIR /ideal-train

COPY package*.json ./

RUN npm install --omit=dev

COPY --from=builder /ideal-train/.next ./.next
COPY --from=builder /ideal-train/public ./public
COPY --from=builder /ideal-train/next.config.mjs ./

EXPOSE 3000

CMD ["npm", "run", "start"]