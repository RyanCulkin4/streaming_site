# syntax=docker/dockerfile:1
FROM node:20

WORKDIR /app
ENV NODE_ENV=development
ENV PORT=3101

# Install deps (dev included) so ts-node/tsc are available
COPY package*.json ./
RUN npm install

# Bring in source for initial build; bind mount will overwrite at runtime
COPY . .

EXPOSE 3101
CMD ["npm","run","dev"]   # ts-node src/index.ts
