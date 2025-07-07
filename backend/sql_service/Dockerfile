FROM node:20

# Set working directory
WORKDIR /app

# Copy package files first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Install PostgreSQL client (Debian/Ubuntu based)
RUN apt-get update && apt-get install -y postgresql-client && apt-get clean

# Copy the rest of the application
COPY . .

# Generate Prisma client (you can do this during build)
RUN npx prisma generate

# Expose port if needed (optional)
EXPOSE 3000

# Instead of running migrations here, run them at container start-up or manually
CMD ["npm", "start"]
