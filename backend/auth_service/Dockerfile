FROM node:20

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your code
COPY . .

# Start your service
CMD ["npm", "start"]
