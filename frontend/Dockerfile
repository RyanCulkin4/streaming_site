# syntax=docker/dockerfile:1
FROM node:20-alpine
WORKDIR /app

ENV NODE_ENV=development
# Install deps (includes devDependencies so Next is present)
COPY package*.json ./
RUN npm install

# Optional: copy source so first boot works even before the mount
COPY . .

EXPOSE 3000
CMD ["npm","run","dev"]   # next dev --turbopack in your package.json
