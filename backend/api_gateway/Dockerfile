FROM node:20-alpine
WORKDIR /app

ENV NODE_ENV=development

COPY package*.json ./
RUN npm install

# copy source (bind mount will overwrite at runtime; this helps first boot)
COPY . .

EXPOSE 3001
CMD ["npm","run","dev"]
