FROM node:20

WORKDIR /app

# Only install dependencies here; actual code comes from the volume
COPY package*.json ./
RUN npm install

RUN npm install -D nodemon tsx typescript

CMD ["npm", "run", "dev"]